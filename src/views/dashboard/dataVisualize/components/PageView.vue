<template>
  <div ref="echartsRef" class="w-100" style="height: 350px"></div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import * as echarts from 'echarts';
  import { useEcharts } from '@/hooks/useEcharts';

  const echartsRef = ref<HTMLElement>();
  onMounted(() => {
    let myChart: echarts.ECharts = echarts.init(echartsRef.value as HTMLElement);
    let option: echarts.EChartsOption = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      grid: {
        left: '2%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: [
        {
          type: 'category',
          axisTick: { show: true },
          axisLabel: {
            interval: 'auto',
            lineHeight: 22,
            fontSize: 14,
            color: '#6E7079',
            margin: 10,
          },
          axisLine: {
            // axis line
            lineStyle: {
              color: '#e0e0e0',
            },
          },
          data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        },
      ],
      yAxis: [
        {
          type: 'value',
          max: 15000,
          min: 0,
          interval: 3000,
          splitLine: {
            lineStyle: {
              color: '#e6e6e6',
              type: 'dashed',
            },
          },
        },
      ],
      series: [
        {
          type: 'bar',
          barWidth: 35,
          emphasis: {
            focus: 'series',
          },
          data: [10250, 8600, 9420, 7250, 6860, 8420, 13250, 8950, 4920, 11850, 9680, 5620],
          itemStyle: {
            color: '#0091ff',
          },
        },
      ],
    };
    useEcharts(myChart, option);
  });
</script>

<style scoped lang="less"></style>
