<template>
  <svg :style="iconStyle" aria-hidden="true">
    <use :xlink:href="symbolId" />
  </svg>
</template>

<script setup lang="ts" name="SvgIcon">
  import { CSSProperties, computed } from 'vue';
  import { withDefaults, defineProps } from 'vue';

  interface SvgProps {
    name: string;
    prefix?: string;
    iconStyle?: CSSProperties;
  }

  const props = withDefaults(defineProps<SvgProps>(), {
    prefix: 'icon',
    iconStyle: () => ({ width: '16px', height: '16px' }),
  });

  const symbolId = computed(() => `#${props.prefix}-${props.name}`);
</script>

<script lang="ts">
  export default {
    name: 'SvgIcon',
  };
</script>
