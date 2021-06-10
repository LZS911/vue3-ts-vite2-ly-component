import { isEmpty, filterListByKey, findListByKey, getWidthOrHeight, getSize } from '../../../utils/index';
import { ElFormContext, ElFormItemContext } from '../type/index.d';

import { setPositionByParent } from '../../../utils/dom';
import { ISizeCorrespondHeight, defaultTableHeight, defaultTableWidth, TSizeCorrespondHeight } from './index.data';
import { ILyDropTableProps, EmitType, ITable } from '../type';
import { ref, Ref, SetupContext, onMounted, computed, watch, watchEffect, nextTick, inject, InjectionKey } from 'vue';
import { $ } from '../../../utils';
import _ from 'lodash';

enum SwitchEnum {
  next = 'next',
  prev = 'prev'
}

// TODO: change it to symbol
export const elFormKey: InjectionKey<ElFormContext> = 'elForm' as any;

export const elFormItemKey: InjectionKey<ElFormItemContext> = 'elFormItem' as any;

export const elFormEvents = {
  addField: 'el.form.addField',
  removeField: 'el.form.removeField'
} as const;

export default function useDropTable(
  props: ILyDropTableProps,
  { emit }: SetupContext<EmitType[]>,
  wrapperRef: Ref<HTMLElement>,
  tableRef: Ref<HTMLElement>,
  elRef: Ref<any>,
  inputRef: Ref<HTMLElement>
) {
  const elForm = inject(elFormKey, {} as ElFormContext);
  const elFormItem = inject(elFormItemKey, {} as ElFormItemContext);

  const filterList = ref<any[]>([]);
  const inputStyle = getSize(props.inputWidth, ISizeCorrespondHeight, props.size);
  const tableStyle = getSize(props.tableWidth ?? props.inputWidth, TSizeCorrespondHeight, props.size);
  onMounted(() => {
    setPositionByParent(
      wrapperRef,
      tableRef,
      getWidthOrHeight($(tableStyle).height, defaultTableHeight),
      getWidthOrHeight($(tableStyle).width, defaultTableWidth)
    );
  });

  /** size and position =================================================================================== */

  const dropDisable = !!props.disable || !!elForm.disabled;
  const visibility = ref(false);
  const show = () => {
    if (!dropDisable) {
      if ($(filterList).length !== props.tableList.length) {
        filterList.value = props.tableList;
      }
      visibility.value = true;
      emit('visible-change', true);
    }
  };

  const hide = () => {
    visibility.value = false;
    emit('visible-change', false);
  };

  const toggleState = () => {
    if ($(visibility)) {
      hide();
    } else {
      show();
    }
  };

  /**  disabled  visibility  hide or show =================================================================================== */

  // type T = props.multiple ? [] : number | string;
  const currentRow = ref<ITable>(null as any)!;
  const currentRowIndex = ref<number>(-1);
  const sourceMap = new Map<number | string, number | string>();
  const tableValue = ref<string | number>(null as any);
  const inputValue = computed(() => sourceMap.get($(tableValue)));
  const columnList = computed(() => props.columnList.filter((item) => !item.hide));

  watch(
    () => props.tableList,
    () => {
      filterList.value = props.tableList;
      props.tableList.forEach((item) => {
        sourceMap.set(item[props.valueKey], item[props.labelKey]);
      });
      sourceMap.set('', '');
    },
    { immediate: true }
  );
  watchEffect(() => {
    tableValue.value = props.modelValue;
  });

  const currentRowChange = (row: any) => {
    if (row) {
      currentRow.value = row;
      tableValue.value = !_.isEmpty($(currentRow)) ? $(currentRow)![props.valueKey] : '';
      hide();
    }
  };

  watch(
    () => $(tableValue),
    (val) => {
      /**
       * issus: change => onChange because input change default emit change
       */
      emit('onChange', val);
      emit('update:modelValue', val);
      currentRow.value = findListByKey($(filterList), $(tableValue), props.valueKey);
    },
    { immediate: true }
  );

  watch(
    () => $(currentRow),
    () => {
      currentRowIndex.value = $(filterList).findIndex((item) => item === $(currentRow));
    },
    { immediate: true }
  );
  watch(
    () => $(currentRowIndex),
    (val) => {
      nextTick(() => {
        $(elRef).setCurrentRow($(filterList)[val] ?? {});
      });
    },
    { immediate: true }
  );

  /** v-model and emit change =================================================================================== */

  const wrapperHovering = ref(false);

  const clearValue = (e: MouseEvent) => {
    e.stopPropagation();
    tableValue.value = '';
    $(inputRef).focus();
  };

  const showClose = computed(() => {
    const hasValue = !isEmpty($(tableValue));
    const criteria = hasValue && props.clearable && $(wrapperHovering);
    return criteria;
  });

  const readonly = computed(() => props.disable || !props.filterable || props.multiple);

  /** clearable readonly =================================================================================== */

  /**
   * issus: inputValue reduction after hover leave
   */
  const filterMethod = (e: any) => {
    const query = e.target.value;
    if (!!props.filterMethod && _.isFunction(props.filterMethod)) {
      filterList.value = props.filterMethod(query);
      return;
    }
    filterList.value = filterListByKey(props.tableList, query);
  };

  const setFirstRow = (e: any) => {
    if ($(visibility)) {
      tableValue.value = '';
      if (!!props.defaultFirstRow) {
        tableValue.value = $(filterList).length ? $(filterList)[0][props.valueKey] : '';
      } else {
        tableValue.value = $(currentRow)[props.valueKey] ?? '';
      }
      hide();
    }
  };

  const navigateOptions = (type: SwitchEnum) => {
    if (type === SwitchEnum.next && $(currentRowIndex) !== $(filterList).length - 1) {
      currentRowIndex.value = $(currentRowIndex) + 1;
    } else if (type === SwitchEnum.prev && $(currentRowIndex) !== 0) {
      currentRowIndex.value = $(currentRowIndex) - 1;
    }
  };

  /** filterable and default-first-row keyboard-switch=================================================================================== */

  const focus = () => {
    $(inputRef).focus();
  };
  const blur = () => {
    $(inputRef).blur();
  };

  /** focus  blur =================================================================================== */
  return {
    inputStyle,
    tableStyle,
    visibility,
    toggleState,
    wrapperRef,
    tableRef,
    inputRef,
    elRef,
    show,
    hide,
    columnList,
    currentRow,
    currentRowChange,
    inputValue,
    showClose,
    wrapperHovering,
    clearValue,
    filterMethod,
    filterList,
    setFirstRow,
    focus,
    blur,
    readonly,
    dropDisable,
    navigateOptions,
    SwitchEnum
  };
}
