import { filterListByValue, findListByIndex, isNumber } from '../../../utils/index';

import { calcTableCount, setTableScrollIntoView } from '../../../utils/dom';

import { VISIBLE_EVENT, EMPTY_STR, FOCUS_EVENT, BLUR_EVENT, CHANGE_EVENT, UPDATE_MODEL_EVENT } from '../../../utils/constants';
import { $, isEmpty, isArray, useSize, useWidthOrHeight, findIndexListByKey, findListByKey, arrRemove } from '../../../utils';

import { ISizeMap, defaultTableHeight, defaultTableWidth, TSizeMap } from '../index.data';

import { SetupContext, ref, Ref, computed, watch, nextTick, onMounted } from 'vue';
import { ILyDropTableProps, EmitType } from '../index.d';
import { ITable } from '../../../utils/types';
import _ from 'lodash';

const lineHeight = 36;

enum SwitchEnum {
  next = 'next',
  prev = 'prev'
}

export default function useDropTable(props: ILyDropTableProps, { emit }: SetupContext<EmitType[]>) {
  const visibility = ref(false);
  const inputRef = ref<Ref<HTMLElement>>(null as any);
  const tableRef = ref<Ref<any>>(null as any);
  const columnList = computed(() => props.columnList.filter((item) => !item.hide));

  const filterList = ref<any[]>([]);
  const currentRow = ref<ITable>(null as any)!;
  const currentRowIndex = ref<number>(-1);
  const currentRowIndexSet = ref<Set<number>>(new Set());
  const sourceMap = new Map<number | string, string>();
  const dropLabel = ref(EMPTY_STR);
  const isMultiple = computed(() => isArray<any>(props.modelValue) && !!props.multiple);

  onMounted(() => {
    watchModelValue(props.modelValue);
  });

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

  const inputStyle = useSize(props.inputWidth, ISizeMap, props.size);
  const tableStyle = useSize(props.tableWidth ?? props.inputWidth, TSizeMap, props.size);
  const tHeight = useWidthOrHeight($(tableStyle).height, defaultTableHeight);
  const tWidth = useWidthOrHeight($(tableStyle).width, defaultTableWidth);
  /** size  position and init show =================================================================================== */

  const currentPlaceholder = ref<string>(props.placeholder ?? EMPTY_STR);
  const dropDisable = computed(() => !!props.disable);

  const show = () => {
    visibility.value = true;
    showEvent();
  };
  const hide = () => {
    visibility.value = false;
    hideEvent();
  };
  const showOrHideEvent = (show: boolean) => {
    if (show) {
      showEvent();
    } else {
      hideEvent();
    }
  };

  const showEvent = () => {
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

  const hideEvent = () => {
    if (isEmpty(props.modelValue)) {
      currentRowIndexSet.value = new Set();
      currentRowIndex.value = -1;
      $(tableRef)?.setCurrentRow($(currentRow) ?? {});
    }
    if ($(isMultiple)) {
      currentRow.value = {};
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
        currentRowIndexSet.value.add(findIndexListByKey($(filterList), item, props.valueKey));
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
      currentRow.value = row;
      if ($(isMultiple) && !isEmpty(row[props.valueKey]) && isArray(props.modelValue)) {
        if (props.modelValue.includes(row[props.valueKey])) {
          watchModelValue(arrRemove(props.modelValue, row[props.valueKey]));
        } else {
          watchModelValue(Array.from(new Set([...props.modelValue, row[props.valueKey]])));
        }
        return;
      }
      watchModelValue(row[props.valueKey] ?? EMPTY_STR);
      hide();
    }
  };

  watch(
    () => $(currentRow),
    () => {
      if (!!$(currentRow)) {
        currentRowIndex.value = findIndexListByKey($(filterList), $(currentRow)?.[props.valueKey], props.valueKey);
      }
    },
    { immediate: true }
  );
  watch(
    () => $(currentRowIndex),
    (val) => {
      nextTick(() => {
        if (isNumber(val) && val > -1) {
          $(tableRef).setCurrentRow($(filterList)[val] ?? {});
          setTableScrollIntoView(
            val,
            lineHeight,
            $(tableRef),
            calcTableCount(useWidthOrHeight($(tableStyle).height, defaultTableHeight), lineHeight)
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
      visibility.value ? hide() : show();
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
    visibility,
    inputRef,
    inputStyle,
    clearValue,
    showClose,
    readonly,
    focus,
    blur,
    tableStyle,
    tHeight,
    tWidth,
    currentPlaceholder,
    showEvent,
    setMultipleBack,
    navigateOptions,
    setRow,
    currentRowClick,
    columnList,
    filterList,
    filterMethod,
    tableRef,
    dropLabel,
    showOrHideEvent,
    SwitchEnum,
    wrapperHovering
  };
}
