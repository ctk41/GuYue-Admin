<template>
  <div class="card content-box">
    <a-alert class="w-100 mb-20" message="引导页 🍓🍓🍓🍇🍇🍇" type="info" />
    <a-alert
      class="mb-20 w-100"
      message="引导页对于一些第一次进入项目的人很有用，你可以简单介绍下项目的功能。本 Demo 是基于 driver.js."
      type="info"
    />
    <div id="GuYue">
      <a-button type="primary" @click.prevent.stop="guide">打开引导页 🤹‍♂️</a-button>
    </div>
  </div>
</template>

<script setup lang="ts" name="guide">
  import Driver from 'driver.js';
  import 'driver.js/dist/driver.min.css';

  const guide = () => {
    const driver: Driver = new Driver({
      allowClose: false,
      doneBtnText: '结束',
      closeBtnText: '关闭',
      nextBtnText: '下一步',
      prevBtnText: '上一步',
    });
    driver.defineSteps(steps);
    driver.start();
  };

  const steps = [
    {
      element: '#collapseIconGuide',
      popover: {
        title: '折叠菜单',
        description: '打开 && 关闭侧边栏',
        position: 'right',
      },
    },
    {
      element: '#breadcrumbGuide',
      popover: {
        title: '面包屑导航',
        description: '指示当前页面位置',
        position: 'right',
      },
    },
    {
      element: '#assemblySizeGuide',
      popover: {
        title: '切换大小',
        description: '调整组件大小',
        position: 'left',
      },
    },
    {
      element: '#languageGuide',
      popover: {
        title: '国际化',
        description: '切换系统语言',
        position: 'left',
      },
    },
    {
      element: '#searchMenuGuide',
      popover: {
        title: '页面搜索',
        description: '页面搜索，快速导航',
        position: 'left',
      },
    },
    {
      element: '#themeSettingGuide',
      popover: {
        title: '主题设定',
        description: '自定义设置主题',
        position: 'left',
      },
    },
    {
      element: '#messageGuide',
      popover: {
        title: '信息识别',
        description: '接收公司信息',
        position: 'left',
      },
    },
    {
      element: '#fullscreenGuide',
      popover: {
        title: '全屏',
        description: '全屏，退出全屏页面',
        position: 'left',
      },
    },
  ];
</script>

<style scoped lang="less"></style>
