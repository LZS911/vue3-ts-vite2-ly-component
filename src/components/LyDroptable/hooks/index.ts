import { findListByKey, getWidthOrHeight, getSize } from '../../../utils/index';
import { on, setPositionByParent } from '../../../utils/dom';

import { ISizeCorrespondHeight, defaultTableHeight, defaultTableWidth, TSizeCorrespondHeight } from './index.data';

import { ILyDropTableProps, EmitType, ITable } from '../type';
import { ref, Ref, SetupContext, onMounted, computed, watch, watchEffect, nextTick } from 'vue';
import { $ } from '../../../utils';

export default function useDropTable(
  props: ILyDropTableProps,
  { emit }: SetupContext<EmitType[]>,
  wrapperRef: Ref<HTMLElement>,
  tableRef: Ref<HTMLElement>
) {
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
      visibility.value = true;
    }
  };

  const hide = () => {
    visibility.value = false;
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
  const columnList = computed(() => props.columnList.filter((item) => !item.hide));

  const listIndexMap = new Map<number | string, number | string>();
  const tableValue = ref<string | number>(null as any);
  const labelValue = computed({
    get() {
      return listIndexMap.get($(tableValue));
    },
    set() {}
  });

  watch(
    () => props.tableList,
    () => {
      props.tableList.forEach((item) => {
        listIndexMap.set(item[props.valueKey], item[props.labelKey]);
      });
      listIndexMap.set('', '');
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
      emit('change', val);
      emit('update:modelValue', val);
      /**
       * issus: table currentRow show bug
       */
      nextTick(() => {
        currentRow.value = findListByKey(props.tableList, $(tableValue), props.valueKey);
      });
    },
    { immediate: true }
  );

  /** v-model and emit change =================================================================================== */

  const isWarpperHover = ref(false);
  const wrapperMouseOver = () => {
    isWarpperHover.value = true;
  };
  const wrapperMouseLeave = () => {
    isWarpperHover.value = false;
  };

  const clearValue = (e: MouseEvent) => {
    e.stopPropagation();
    tableValue.value = '';
  };

  /** clearable =================================================================================== */

  /** filterable =================================================================================== */

  return {
    inputStyle,
    tableStyle,
    visibility,
    toggleState,
    wrapperRef,
    tableRef,
    show,
    hide,
    columnList,
    currentRow,
    currentRowChange,
    labelValue,
    isWarpperHover,
    wrapperMouseOver,
    wrapperMouseLeave,
    clearValue
  };
}
