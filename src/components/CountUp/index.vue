<template>
  <span ref="countupRef"></span>
</template>

<script setup lang="ts">
  import { CountUp } from 'countup.js';
  import type { CountUpOptions } from 'countup.js';
  import { onMounted, ref } from 'vue';

  let numAnim = ref(null) as any;
  const countupRef = ref();
  const props = defineProps({
    end: {
      type: Number,
      default: 0,
    },
    options: {
      type: Object,
      validator(option: Object) {
        let keys = [
          'startVal',
          'decimalPlaces',
          'duration',
          'useGrouping',
          'useEasing',
          'smartEasingThreshold',
          'smartEasingAmount',
          'separator',
          'decimal',
          'prefix',
          'suffix',
          'numerals',
        ];
        for (const key in option) {
          if (!keys.includes(key)) {
            console.error('CountUp options value does not match CountUpOptions');
            return false;
          }
        }
        return true;
      },
      default() {
        let options: CountUpOptions = {
          startVal: 0,
          decimalPlaces: 2,
          duration: 2,
          useGrouping: true,
          useEasing: true,
          smartEasingThreshold: 500,
          smartEasingAmount: 300,
          separator: ',',
          decimal: '.',
          prefix: '',
          suffix: '',
          numerals: [],
        };
        return options;
      },
    },
  });

  onMounted(() => {
    initCount();
  });

  const initCount = () => {
    numAnim = new CountUp(countupRef.value, props.end, props.options);
    numAnim.start();
  };

  const updateCount = (num: number) => {
    numAnim.update(num);
  };

  defineExpose({
    initCount,
    updateCount,
  });
</script>

<style scoped lang="less"></style>
