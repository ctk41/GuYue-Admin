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
      color: ['#59A2FE', '#FFB717', '#FC8F6B', '#70E07B', '#FBDA3D', '#11E5F1', '#E3A0FF'],
      title: {
        text: 'Traffic Sources',
        subtext: 'Site-wide source statistics',
        left: 'center',
      },
      tooltip: {
        trigger: 'item',
        backgroundColor: '#ffffff',
        formatter: function (params: any) {
          let str =
            'Traffic Source' +
            '</br>' +
            params.marker +
            '' +
            params.name +
            '</br>' +
            'Count: ' +
            params.data.value +
            '</br>' +
            'Percentage: ' +
            params.percent +
            '%';
          return str;
        },
      },
      legend: {
        orient: 'vertical',
        itemWidth: 25,
        itemHeight: 15,
        left: '2%',
        align: 'left',
        top: '2%',
        textStyle: {
          fontSize: 12,
          fontFamily: 'PingFangSC-Regular, PingFang SC',
          fontWeight: 400,
          color: '#0D1134',
          lineHeight: 17,
        },
      },
      series: [
        {
          type: 'pie',
          radius: [0, 100],
          labelLine: {
            length: 20,
            length2: 30,
          },

          label: {
            formatter: '{a|{b}}\n{per|{d}%}',
            rich: {
              a: {
                fontSize: 12,
                lineHeight: 16,
                align: 'center',
              },
              per: {
                color: '#545454',
                align: 'center',
                fontSize: 12,
                lineHeight: 16,
              },
            },
          },

          data: [
            { value: 5920, name: 'TikTok' },
            { value: 2640, name: 'Kuaishou' },
            { value: 2125, name: 'Weibo' },
            { value: 1925, name: 'Huya' },
            { value: 1220, name: 'Douyu' },
            { value: 635, name: "People's Daily" },
            { value: 4638, name: 'WeChat' },
          ],
        },
      ],
    };
    useEcharts(myChart, option);
  });
</script>

<style scoped lang="less"></style>
