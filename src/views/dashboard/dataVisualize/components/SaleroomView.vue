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
      title: {},
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985',
          },
        },
      },
      legend: {
        right: '6%',
        top: '8%',
        data: ['Current Month Sales', 'Average Monthly Sales'],
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: true,
          data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        },
      ],
      yAxis: [
        {
          name: 'Unit: Yuan',
          type: 'value',
          max: 1500,
          min: 0,
          interval: 300,
        },
      ],
      series: [
        {
          name: 'Average Monthly Sales',
          type: 'line',
          areaStyle: {
            color: '#77c9ff',
          },
          emphasis: {
            focus: 'series',
          },
          data: [720, 832, 801, 934, 890, 930, 1260, 1176, 1232, 1261, 1304, 1353],
        },
        {
          name: 'Current Month Sales',
          type: 'line',
          areaStyle: {
            color: '#78d8d8',
          },
          emphasis: {
            focus: 'series',
          },
          data: [620, 632, 701, 634, 790, 830, 860, 876, 932, 951, 1104, 1135],
        },
      ],
    };
    useEcharts(myChart, option);
  });
</script>

<style scoped lang="less"></style>
