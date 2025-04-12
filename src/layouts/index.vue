<template>
  <component :is="LayoutComponents[layout]"></component>
  <ThemeDrawer />
</template>

<script setup lang="ts" name="layout">
  import { computed, type Component } from 'vue';
  import { useGlobalStore } from '@/stores/modules/global';
  import ThemeDrawer from './components/ThemeDrawer/index.vue';
  import LayoutVertical from './LayoutVertical/index.vue';
  import LayoutTransverse from './LayoutTransverse/index.vue';

  const LayoutComponents: { [key: string]: Component } = {
    vertical: LayoutVertical,
    transverse: LayoutTransverse,
  };

  const globalStore = useGlobalStore();
  const layout = computed(() => globalStore.layout);
</script>

<style scoped lang="less"></style>
