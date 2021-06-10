import { filterListByKey, findListByKey, getWidthOrHeight, getSize } from '../../../utils/index';
import { setPositionByParent } from '../../../utils/dom';
import { ISizeCorrespondHeight, defaultTableHeight, defaultTableWidth, TSizeCorrespondHeight } from './index.data';
import { ILyDropTableProps, EmitType, ITable } from '../type';
import { ref, Ref, SetupContext, onMounted, computed, watch, watchEffect, nextTick } from 'vue';
import { $ } from '../../../utils';

export default function useDropTable(
  props: ILyDropTableProps,
  { emit }: SetupContext<EmitType[]>,
  wrapperRef: Ref<HTMLElement>,
  tableRef: Ref<HTMLElement>,
  elRef: Ref<any>,
  inputRef: Ref<HTMLElement>
) {
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

  const visibility = ref(false);
  const show = () => {
    if (!props.disable) {
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

  /**  hide or show =================================================================================== */

  const currentRow = ref<ITable>(null as any)!;
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
      tableValue.value = $(currentRow) ? $(currentRow)![props.valueKey] : '';
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
      nextTick(() => {
        $(elRef).setCurrentRow($(currentRow) ?? {});
      });
    },
    { immediate: true }
  );

  /** v-model and emit change =================================================================================== */

  const isWrapperHover = ref(false);
  const wrapperMouseOver = () => {
    isWrapperHover.value = true;
  };
  const wrapperMouseLeave = () => {
    isWrapperHover.value = false;
  };

  const clearValue = (e: MouseEvent) => {
    e.stopPropagation();
    tableValue.value = '';
  };

  /** clearable =================================================================================== */

  /**
   * issus: inputValue reduction after hover leave
   */
  const filterMethod = (e: any) => {
    const query = e.target.value;
    if (!!props.filterMethod) {
      filterList.value = props.filterMethod(query);
      return;
    }
    filterList.value = filterListByKey(props.tableList, query);
  };

  const setFirstRow = (e: any) => {
    if ($(visibility)) {
      tableValue.value = '';
      tableValue.value = $(filterList).length ? $(filterList)[0][props.valueKey] : '';
    }
  };

  /** filterable and default-first-row keyboard-switch=================================================================================== */

  const focus = () => {
    $(inputRef).focus();
  };
  const blur = () => {
    $(inputRef).blur();
  };
  /** focus =================================================================================== */
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
    isWrapperHover,
    wrapperMouseOver,
    wrapperMouseLeave,
    clearValue,
    filterMethod,
    filterList,
    setFirstRow,
    focus,
    blur
  };
}
