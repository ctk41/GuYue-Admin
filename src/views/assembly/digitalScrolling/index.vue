<template>
  <div class="card content-box">
    <a-alert class="w-100 mb-20" message="数字滚动 🍓🍓🍓🍇🍇🍇" type="info" />
    <a-alert class="mb-20 w-100" message="【Vue3 TS】 基于 countUp.js 实现数字滚动的插件。" type="info" />
    <a-alert
      class="mb-20 w-100"
      message="【插件使用】 <CountUp ref='countUpRef' :end='2023' :options='{ prefix: '￥' }'></CountUp>"
      type="info"
    />
    <div>
      <a-typography-title :level="2">
        <CountUp ref="countUpRef" :end="2023" :options="{ prefix: '￥' }"></CountUp>
      </a-typography-title>
    </div>
    <div class="flex">
      <a-button type="primary" @click="countUpRef.initCount()" class="mr-12">开始</a-button>
      <a-button type="primary" @click="countUpRef.updateCount(3202)">更新至 3202</a-button>
    </div>
    <a-descriptions title="countUp.js配置项 📚" :column="1" bordered class="w-100" size="small">
      <a-descriptions-item label="dom节点">
        <span class="countUp-text">HTMLElement</span>
      </a-descriptions-item>
      <a-descriptions-item label="endVal">
        <span class="countUp-text">目标值（number）</span>
      </a-descriptions-item>
      <a-descriptions-item label="options">
        <span class="countUp-text">startVal: 0, // 开始的数字 一般设置0开始</span> <br />
        <span class="countUp-text">decimalPlaces: 2, // number类型 小数位，整数自动添.00</span>
        <br />
        <span class="countUp-text">duration: 2, // number类型 动画延迟秒数，默认值是2</span> <br />
        <span class="countUp-text">useGrouping: true, // boolean类型 是否开启逗号，默认true(1,000)false(1000)</span>
        <br />
        <span class="countUp-text">useEasing: true, // booleanl类型 动画缓动效果(ease),默认true</span>
        <br />
        <span class="countUp-text">smartEasingThreshold: 500, // numberl类型 大于这个数值的值开启平滑缓动</span>
        <br />
        <span class="countUp-text">smartEasingAmount: 300, // numberl类型</span> <br />
        <span class="countUp-text">separator: ',',// string 类型 分割用的符号</span> <br />
        <span class="countUp-text">decimal: '.', // string 类型 小数分割符合</span> <br />
        <span class="countUp-text">prefix: '￥', // sttring 类型 数字开头添加固定字符</span> <br />
        <span class="countUp-text">suffix: '元', // sttring类型 数字末尾添加固定字符 </span><br />
        <span class="countUp-text">numerals: [] // Array类型 替换从0到9对应的字，也就是自定数字字符了,数组存储</span>
        <br />
      </a-descriptions-item>
      <a-descriptions-item label="countUp类">
        <span class="countUp-text">new CountUp(dom节点, endVal, options)</span>
      </a-descriptions-item>
    </a-descriptions>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import CountUp from '@/components/CountUp/index.vue';

  const countUpRef = ref();
</script>

<style scoped lang="less">
  @import url('./index.less');
</style>
