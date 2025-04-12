<template>
  <a-popover v-model:visible="visible" placement="bottom" trigger="click">
    <template #content>
      <a-image-preview-group v-if="props.type === 'image'">
        <a-image v-for="src in srcList" @click="hide" :key="src" :width="80" :height="80" :src="src" />
      </a-image-preview-group>
      <template v-if="props.type === 'video'">
        <video v-for="src in srcList" :key="src" :src="src" controls width="260"></video>
      </template>
    </template>
    <a-tag :color="primary" style="cursor: pointer">查看{{ srcList.length }}个文件</a-tag>
  </a-popover>
</template>

<script setup lang="ts" name="TablePreview">
  import { ref, computed, watchEffect } from 'vue';
  import { useGlobalStore } from '@/stores/modules/global';
  import { isArray, isString } from '@/utils/is';

  export interface TablePreviewProps {
    src: string[] | string;
    type?: 'image' | 'video';
  }
  const globalStore = useGlobalStore();
  const primary = computed(() => globalStore.primary);
  const props = withDefaults(defineProps<TablePreviewProps>(), {
    type: 'image',
  });
  const visible = ref<boolean>(false);
  const hide = () => {
    visible.value = false;
  };
  const srcList = ref<string[]>([]);
  watchEffect(() => {
    if (isArray(props.src)) srcList.value = props.src;
    if (isString(props.src)) srcList.value = [props.src];
  });
</script>
