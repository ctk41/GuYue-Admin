<template>
  <a-tooltip
    v-if="isShowTooltip"
    placement="top"
    trigger="hover"
    overlayClassName="table-tooltip"
    v-model:visible="isShow"
  >
    <template #title>
      <span>{{ content }}</span>
    </template>
    <div class="content" @mouseleave="mouseleave">
      <span ref="contentRef">
        <slot></slot>
      </span>
    </div>
  </a-tooltip>
  <div v-else class="content" @mouseenter="mouseenter">
    <span ref="contentRef">
      <slot></slot>
    </span>
  </div>
</template>

<script setup lang="ts" name="tableTooltip">
  import { ref } from 'vue';
  interface TableTooltipProps {
    content: string;
  }
  withDefaults(defineProps<TableTooltipProps>(), {
    content: '',
  });

  const isShow = ref(true);
  const contentRef = ref();
  const isShowTooltip = ref(false);
  const mouseleave = () => {};
  const mouseenter = () => {
    const tooltipWidth = contentRef.value.parentNode.offsetWidth;
    const contentWidth = contentRef.value.offsetWidth;
    isShowTooltip.value = tooltipWidth > contentWidth ? false : true;
  };
</script>

<style scoped lang="less">
  .content {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>
