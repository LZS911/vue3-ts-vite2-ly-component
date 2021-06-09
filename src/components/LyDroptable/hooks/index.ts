import { setPositionByParent } from '../../../utils/dom';
import { getWidthOrHeight, getSize } from '../../../utils/index';

import { ISizeCorrespondHeight, defaultTableHeight, defaultTableWidth, TSizeCorrespondHeight } from './index.data';

import { ILyDropTableProps, EmitType } from '../type';
import { ref, Ref, SetupContext, onMounted, computed, watch, watchEffect } from 'vue';
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

  const visibility = ref(false);
  const _show = () => {
    if (!props.disable) {
      visibility.value = true;
    }
  };

  const _hide = () => {
    visibility.value = false;
  };

  const show = () => {
    _show();
  };

  const hide = () => {
    _hide();
  };

  const toggleState = () => {
    if ($(visibility)) {
      hide();
    } else {
      show();
    }
  };

  const currentRow = ref(null)!;
  const columnList = computed(() => props.columnList.filter((item) => !item.hide));

  const listIndexMap = new Map<unknown, unknown>();
  watch(
    () => props.tableList,
    () => {
      props.tableList.forEach((item) => {
        listIndexMap.set(item[props.valueKey], item[props.labelKey]);
      });
    },
    { immediate: true }
  );
  const currentRowChange = (row: any) => {
    if (row) {
      currentRow.value = row;
      emit('update:modelValue', $(currentRow) ? $(currentRow)![props.valueKey] : '');
      hide();
    }
  };

  watch(
    () => props.modelValue,
    (val) => {
      emit('change', val);
    },
    { immediate: true }
  );
  const labelValue = computed(() => listIndexMap.get(props.modelValue));
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
    labelValue
  };
}
