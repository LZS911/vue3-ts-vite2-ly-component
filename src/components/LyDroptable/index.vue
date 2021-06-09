<template>
  <div class="ly-drop-table" :style="inputStyle" ref="wrapperRef">
    <div
      class="ly-input"
      @click="toggleState"
      :class="{'input-focus':visibility, 'input-disable':disable}"
    >
      <input :disabled="disable" ref="inputRef" :value="labelValue" />
      <div :class="visibility ? 'arrow-up' : 'arrow-down'">
        <i :class="icon"></i>
      </div>
    </div>
    <teleport to="body">
      <transition :name="transition">
        <div
          :style="tableStyle"
          ref="tableRef"
          class="ly-table"
          v-show="visibility"
          v-clickoutside:[wrapperRef]="hide"
          :class="{'ly-table__show':visibility}"
        >
          <el-table
            :data="tableList"
            border
            height="100%"
            highlight-current-row
            :header-cell-style="headerCellStyle"
            @current-change='currentRowChange'
          >
            <el-table-column
              v-for="column in columnList"
              :key="column.prop"
              :prop="column.prop"
              :label="column.label"
            />
          </el-table>
        </div>
      </transition>
    </teleport>
  </div>
</template>

<script lang='ts'>
import { defineComponent, PropType, ref } from 'vue';
import { ITableColumn, ILyDropTableProps } from './type';
import useDropTable from './hooks';
import { SizeEnum } from '../../utils/enum';
import { clickOutSide } from '../../directives';

export default defineComponent({
  directives: { clickoutside: clickOutSide },
  components: {},
  props: {
    modelValue: {},
    valueKey: {
      type: String,
      required: true
    },
    labelKey: {
      type: String,
      required: true
    },
    inputWidth: {
      type: [String, Number],
      required: true
    },
    tableWidth: {
      type: [String, Number]
    },
    size: {
      type: Object as PropType<SizeEnum>
    },
    tableList: {
      type: Object as PropType<Object[]>,
      required: true
    },
    columnList: {
      type: Object as PropType<ITableColumn[]>,
      required: true
    },
    disable: {
      type: Boolean
    },
    transition: {
      type: String,
      default: 'el-fade-in-linear'
    },
    icon: {
      type: String,
      default: 'el-icon-arrow-down'
    },
    headerCellStyle: {
      type: Object,
      default: () => ({ backgroundColor: 'rgba(244, 245, 250, 1)' })
    }
  },
  setup(props, ctx) {
    const wrapperRef = ref<HTMLElement>(null as any);
    const tableRef = ref<HTMLElement>(null as any);

    return {
      ...useDropTable(props as ILyDropTableProps, ctx as any, wrapperRef, tableRef)
    };
  }
});
</script>

<style lang='scss' scoped>
@import '../../styles/mixin.scss';
.ly-drop-table {
  display: inline-block;
  .ly-input {
    box-sizing: border-box;
    @include fontstes;
    width: 100%;
    height: 100%;
    border: $input-border;
    border-radius: $border-radius;
    padding: 4px 10px;
    cursor: pointer !important;
    display: flex;
    justify-content: space-between;
    align-items: center;
    input {
      @include fontstes;
      cursor: pointer !important;
      width: 100%;
      height: 100%;
      border: 0;
      outline: none;
      padding: 0;
    }

    .arrow-up {
      transform: scaleY(-1);
      transition: transform 0.5s;
    }
    .arrow-down {
      transform: scaleY(1);
      transition: transform 0.5s;
    }
  }
  .input-focus {
    border: $input-focus-border;
  }
  .input-disable {
    background: #f5f7fa !important;
    input {
      background: #f5f7fa !important;
    }
  }
}
.ly-table {
  box-sizing: border-box;
  position: absolute;
  z-index: 2002;
  background: #fff;
  border-radius: $border-radius;
  border: $div-border;
  padding: 6px;
  box-shadow: $box-shadow;
}
</style>
