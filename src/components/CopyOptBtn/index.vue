<template>
  <a-tooltip placement="bottom">
    <template #title>
      <span>{{ value }}</span>
    </template>
    <a-button :type="type" :size="size" :ghost="isGhost" v-copy="value">{{ label }}</a-button>
  </a-tooltip>
</template>

<script setup lang="ts" name="copyOptBtn">
  import { toRefs } from 'vue';

  interface copyOptBtnProps {
    value: string; // Value to copy --> required
    label?: string; // Button label --> optional, default value is "Copy"
    type?: 'primary' | 'ghost' | 'dashed' | 'link' | 'text' | 'default'; // Button type --> optional, default value is primary
    size?: 'large' | 'middle' | 'small'; // Button size --> optional, default value is small
    isGhost?: boolean; // Ghost property, makes button background transparent --> optional, default value is true
  }
  /* Props */
  const props = withDefaults(defineProps<copyOptBtnProps>(), {
    label: 'Copy',
    type: 'primary',
    size: 'small',
    isGhost: true,
  });
  const { value, label, type, size, isGhost } = toRefs(props);
</script>
