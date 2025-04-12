import { onDeactivated, onBeforeUnmount } from 'vue';
import * as echarts from 'echarts';

/**
 * @description Use Echarts (only to add chart responsiveness)
 * @param {Element} myChart Echarts instance (required)
 * @param {Object} options Parameters for drawing Echarts (required)
 * */
export const useEcharts = (myChart: echarts.ECharts, options: echarts.EChartsCoreOption) => {
  if (options && typeof options === 'object') {
    myChart.setOption(options);
  }
  const echartsResize = () => {
    myChart && myChart.resize();
  };
  window.addEventListener('resize', echartsResize);

  onDeactivated(() => {
    window.removeEventListener('resize', echartsResize);
  });

  onBeforeUnmount(() => {
    window.removeEventListener('resize', echartsResize);
  });
};
