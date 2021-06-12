import { ElFormContext, ElFormItemContext } from '../type/index.d';
import {
  isArray,
  isEmpty,
  isNumber,
  filterListByValue,
  findListByKey,
  getWidthOrHeight,
  getSize,
  $,
  arrRemove,
  findListByIndex
} from '../../../utils';

import { calcTableCount, setPositionByParent, setTableScrollIntoView } from '../../../utils/dom';

import {
  VISIBLE_EVENT,
  EMPTY_STR,
  CHANGE_EVENT,
  UPDATE_MODEL_EVENT,
  FOCUS_EVENT,
  BLUR_EVENT
} from '../../../utils/constants';

import { ISizeMap, defaultTableHeight, defaultTableWidth, TSizeMap } from './index.data';
import { ILyDropTableProps, EmitType, ITable } from '../type';
import { ref, Ref, SetupContext, onMounted, computed, watch, nextTick, inject, InjectionKey } from 'vue';

import _ from 'lodash';

enum SwitchEnum {
  next = 'next',
  prev = 'prev'
}

export const elFormKey: InjectionKey<ElFormContext> = 'elForm' as any;

export const elFormItemKey: InjectionKey<ElFormItemContext> = 'elFormItem' as any;

export const lineHeight = 36;

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
  const columnList = computed(() => props.columnList.filter((item) => !item.hide));

  const filterList = ref<any[]>([]);
  const currentRow = ref<ITable>(null as any)!;
  const currentRowIndex = ref<number>(-1);
  const currentRowIndexSet = ref<Set<number>>(new Set());
  const sourceMap = new Map<number | string, string>();
  const dropLabel = ref(EMPTY_STR);
  const isMultiple = computed(() => isArray<any>(props.modelValue) && !!props.multiple);

  /** main data =================================================================================== */

  const focus = () => {
    $(inputRef).focus();
    emit(FOCUS_EVENT);
  };
  const blur = () => {
    $(inputRef).blur();
    emit(BLUR_EVENT);
  };

  /** focus  blur =================================================================================== */

  const inputStyle = getSize(props.inputWidth, ISizeMap, props.size ?? elForm.size);
  const tableStyle = getSize(props.tableWidth ?? props.inputWidth, TSizeMap, props.size ?? elForm.size);

  onMounted(() => {
    setPositionByParent(
      wrapperRef,
      tableRef,
      getWidthOrHeight($(tableStyle).height, defaultTableHeight),
      getWidthOrHeight($(tableStyle).width, defaultTableWidth)
    );

    // eslint-disable-next-line no-use-before-define
    watchModelValue(props.modelValue);
  });

  /** size  position and init show =================================================================================== */

  const currentPlaceholder = ref<string>(props.placeholder ?? EMPTY_STR);
  const dropDisable = computed(() => !!props.disable || !!elForm.disabled);
  const visibility = ref(false);
  const _show = () => {
    visibility.value = true;
  };
  const _hide = () => {
    visibility.value = false;
  };

  const show = () => {
    if ($(dropDisable)) {
      return;
    }
    _show();
    focus();
    if ($(filterList).length !== props.tableList.length) {
      filterList.value = props.tableList;
    }
    if (!!props.filterable && !$(isMultiple)) {
      currentPlaceholder.value = $(dropLabel) ?? EMPTY_STR;
      dropLabel.value = EMPTY_STR;
    }
    emit(VISIBLE_EVENT, true);
  };

  const hide = () => {
    _hide();
    if (isEmpty(props.modelValue)) {
      currentRowIndexSet.value = new Set();
      currentRowIndex.value = -1;
      $(elRef).setCurrentRow($(currentRow) ?? {});
    }
    if (!!props.filterable) {
      if ($(isMultiple)) {
        dropLabel.value = props.modelValue.map((item: number | string) => sourceMap.get(item)).toString();
      } else {
        dropLabel.value = sourceMap.get(props.modelValue) ?? EMPTY_STR;
      }
    }
    emit(VISIBLE_EVENT, false);
  };

  const toggleState = () => {
    if ($(visibility)) {
      hide();
    } else {
      show();
    }
  };

  /**  disabled  visibility  hide or show  placeholder =================================================================================== */

  watch(
    () => props.tableList,
    () => {
      filterList.value = props.tableList;
      props.tableList.forEach((item) => {
        sourceMap.set(item[props.valueKey], item[props.labelKey] as string);
      });
      sourceMap.set(EMPTY_STR, EMPTY_STR);
    },
    { immediate: true }
  );

  function watchModelValue(val: any) {
    if (!_.isEqual(val, props.modelValue)) {
      emit(CHANGE_EVENT, val);
      emit(UPDATE_MODEL_EVENT, val);
    }
    if ($(isMultiple)) {
      currentRowIndexSet.value = new Set();
      val.forEach((item: any) => {
        currentRowIndexSet.value.add($(filterList).findIndex((t) => t[props.valueKey] === item));
      });
    } else {
      currentRow.value = findListByKey($(filterList), val as string | number, props.valueKey);
    }
    nextTick(() => {
      if ($(isMultiple)) {
        dropLabel.value = val.map((item: number | string) => sourceMap.get(item)).toString();
      } else {
        dropLabel.value = sourceMap.get(val) ?? EMPTY_STR;
      }
    });
  }

  const currentRowClick = (row: any) => {
    if (row) {
      if ($(isMultiple) && !isEmpty(row[props.valueKey]) && isArray(props.modelValue)) {
        if (props.modelValue.includes(row[props.valueKey])) {
          watchModelValue(arrRemove(props.modelValue, row[props.valueKey]));
        } else {
          watchModelValue(Array.from(new Set([...props.modelValue, row[props.valueKey]])));
        }
        return;
      }
      currentRow.value = row;
      watchModelValue(row[props.valueKey] ?? EMPTY_STR);
      hide();
    }
  };

  watch(
    () => $(currentRow),
    () => {
      currentRowIndex.value = $(filterList).findIndex(
        (item) => item[props.valueKey] === $(currentRow)?.[props.valueKey]
      );
    },
    { immediate: true }
  );
  watch(
    () => $(currentRowIndex),
    (val) => {
      nextTick(() => {
        if (isNumber(val)) {
          $(elRef).setCurrentRow($(filterList)[val] ?? {});
          val > -1 &&
            setTableScrollIntoView(
              val,
              lineHeight,
              $(elRef),
              calcTableCount(getWidthOrHeight($(tableStyle).height, defaultTableHeight), lineHeight)
            );
        }
      });
    },
    { immediate: true }
  );

  /** v-model currentRow =================================================================================== */

  const wrapperHovering = ref(false);

  const clearValue = (e: MouseEvent) => {
    e.stopPropagation();
    currentPlaceholder.value = EMPTY_STR;
    $(isMultiple) ? watchModelValue([]) : watchModelValue(EMPTY_STR);
    focus();
  };

  const showClose = computed(() => {
    const hasValue = !isEmpty(props.modelValue);
    const criteria = hasValue && props.clearable && $(wrapperHovering);
    return criteria;
  });

  const readonly = computed(() => $(dropDisable) || !props.filterable || props.multiple);

  /** clearable readonly =================================================================================== */

  const filterMethod = (e: any) => {
    const query = e.target.value;
    if (!!props.filterMethod && _.isFunction(props.filterMethod)) {
      filterList.value = props.filterMethod(query);
      return;
    }
    filterList.value = filterListByValue(props.tableList, query);
    if ($(isMultiple)) {
      currentRowIndexSet.value = new Set();
    } else {
      currentRowIndex.value = -1;
    }
  };

  const setRow = () => {
    if ($(currentRowIndex) < 0 && !props.defaultFirstRow) {
      return;
    }
    if (!$(visibility)) {
      show();
      return;
    }
    let currentValue;
    if ($(currentRowIndex) < 0) {
      currentValue = findListByIndex($(filterList), 0, props.valueKey);
      currentRowIndex.value = 0;
    } else {
      currentValue = findListByIndex($(filterList), $(currentRowIndex), props.valueKey);
    }
    if (isEmpty(currentValue)) return;

    if ($(isMultiple)) {
      if (props.modelValue.includes(currentValue)) {
        watchModelValue(arrRemove(props.modelValue, currentValue));
      } else {
        watchModelValue([...props.modelValue, currentValue]);
      }
    } else {
      watchModelValue(currentValue);
      toggleState();
    }
  };

  const navigateOptions = (type: SwitchEnum) => {
    if (type === SwitchEnum.next) {
      if ($(currentRowIndex) === $(filterList).length - 1) {
        currentRowIndex.value = 0;
      } else {
        currentRowIndex.value = $(currentRowIndex) + 1;
      }
    } else if (type === SwitchEnum.prev) {
      if ($(currentRowIndex) === 0) {
        currentRowIndex.value = $(filterList).length - 1;
      } else {
        currentRowIndex.value = $(currentRowIndex) - 1;
      }
    }
  };

  /** filterable and default-first-row keyboard-switch=================================================================================== */

  const setMultipleBack = ({ rowIndex }: { row: any; rowIndex: number }) => {
    if ($(currentRowIndexSet).has(rowIndex)) {
      return 'multiple-row';
    }
  };
  /** multiple ================================================================================================== */
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
    currentRowClick,
    dropLabel,
    showClose,
    wrapperHovering,
    clearValue,
    filterMethod,
    filterList,
    setRow,
    focus,
    blur,
    readonly,
    dropDisable,
    navigateOptions,
    SwitchEnum,
    currentPlaceholder,
    currentRowIndexSet,
    setMultipleBack,
    isMultiple
  };
}
