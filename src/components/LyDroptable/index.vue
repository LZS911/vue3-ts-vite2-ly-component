<template>
  <div
    class="ly-drop-table"
    :style="inputStyle"
    ref="wrapperRef"
    @mouseover="wrapperHovering=true"
    @mouseleave="wrapperHovering=false"
    >
    <div
      class="ly-input"
      @click="toggleState"
      :class="{'ly-drop-table__show':visibility, 'ly-drop-table__disable':disable}"
    >
      <input
        :placeholder="currentPlaceholder"
        @keyup.enter="setRow"
        @keydown.esc.stop.prevent="visibility = false"
        @keydown.tab="visibility = false"
        @keydown.down.stop.prevent="navigateOptions(SwitchEnum.next)"
        @keydown.up.stop.prevent="navigateOptions(SwitchEnum.prev)"
        @input="filterMethod"
        :readonly="readonly"
        ref="inputRef"
        v-model="dropLabel"
        :class="{'ly-input__readonly':readonly}"
      />
      <div :class="visibility ? 'arrow-up' : 'arrow-down'">
        <i v-show='showClose' :class="clearIcon" @click="clearValue"></i>
        <i v-show='!showClose' :class="arrowIcon"></i>
      </div>
    </div>
    <teleport to="body">
      <transition :name="transitionName">
        <div
          :style="tableStyle"
          ref="tableRef"
          class="ly-table"
          v-show="visibility"
          v-clickoutside:[wrapperRef]="hide"
          :class="[{'ly-table__show':visibility}, tableClass]"
        >
          <el-table
            ref="elRef"
            :data="filterList"
            border
            height="100%"
            highlight-current-row
            :header-cell-style="headerCellStyle"
            @row-click="currentRowClick"
            :row-class-name="setMultipleBack"
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
import { defineComponent, ref } from 'vue';
import { ILyDropTableProps } from './type';
import useDropTable from './hooks';
import { clickOutSide } from '../../directives';
import { defaultProps } from './hooks/index.data.ts';

export default defineComponent({
  directives: { clickoutside: clickOutSide },
  components: {},
  props: defaultProps,
  setup(props, ctx) {
    const wrapperRef = ref<HTMLElement>(null as any);
    const tableRef = ref<HTMLElement>(null as any);
    const elRef = ref<HTMLElement>(null as any);
    const inputRef = ref<HTMLElement>(null as any);
    return {
      ...useDropTable(props as ILyDropTableProps, ctx as any, wrapperRef, tableRef, elRef, inputRef)
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
  .ly-drop-table__show {
    border: $input-focus-border;
  }
  .ly-drop-table__disable {
    background: #f5f7fa !important;
    input {
      background: #f5f7fa !important;
    }
  }
  .ly-input__disable{
    background:#fff !important;
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
