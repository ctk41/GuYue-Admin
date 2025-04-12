<template>
  <!-- Project Introduction -->
  <div class="card mb-10">
    <h4 class="title">Project Introduction</h4>
    <span class="text">
      <a data-v-cf7f3571="" class="guyue-link" href="https://juejin.cn/user/4068638047082029/posts" target="_blank">
        <span class="guyue-link_title">ProTable Component</span>
      </a>
      An open-source admin framework based on Vue3.2, TypeScript, Vite3, Pinia, and Ant Design Vue, developed using the
      latest technology stack. Additionally, this project encapsulates some commonly used components, Hooks, directives,
      dynamic routing, button-level permission control, and other features.
    </span>
  </div>
  <!-- Project Information -->
  <div class="card mb-10">
    <h4 class="title">Project Information</h4>
    <a-descriptions :column="2" bordered>
      <!-- Version -->
      <a-descriptions-item label="Version">
        <a-tag color="var(--ant-primary-4)">{{ version }}</a-tag>
      </a-descriptions-item>
      <!-- Release Time -->
      <a-descriptions-item label="Release Time">
        <a-tag color="var(--ant-primary-4)">{{ lastBuildTime }}</a-tag>
      </a-descriptions-item>
      <!-- Gitee -->
      <a-descriptions-item label="Gitee">
        <a data-v-cf7f3571="" class="guyue-link" href="https://gitee.com/Y_lao/VTI CORP" target="_blank">
          <span class="guyue-link_title">Gitee</span>
        </a>
      </a-descriptions-item>
      <!-- Github -->
      <a-descriptions-item label="Github">
        <a data-v-cf7f3571="" class="guyue-link" href="https://github.com/Y-Lao" target="_blank">
          <span class="guyue-link_title">Github</span>
        </a>
      </a-descriptions-item>
      <!-- Documentation -->
      <a-descriptions-item label="Documentation">
        <a data-v-cf7f3571="" class="guyue-link" href="#" target="_blank">
          <span class="guyue-link_title">Documentation</span>
        </a>
      </a-descriptions-item>
      <!-- Preview Link -->
      <a-descriptions-item label="Preview Link">
        <a data-v-cf7f3571="" class="guyue-link" href="#" target="_blank">
          <span class="guyue-link_title">Preview Link</span>
        </a>
      </a-descriptions-item>
    </a-descriptions>
  </div>
  <!-- Production Dependencies -->
  <div class="card mb-10">
    <h4 class="title">Production Dependencies</h4>
    <a-descriptions :column="3" bordered>
      <a-descriptions-item v-for="(value, key) in dependencies" :key="key" :label="key">
        <a-tag>{{ value }}</a-tag>
      </a-descriptions-item>
    </a-descriptions>
  </div>
  <!-- Development Dependencies -->
  <div class="card">
    <h4 class="title">Development Dependencies</h4>
    <a-descriptions :column="3" bordered>
      <a-descriptions-item v-for="(value, key) in devDependencies" :key="key" :label="key">
        <a-tag>{{ value }}</a-tag>
      </a-descriptions-item>
    </a-descriptions>
  </div>
</template>

<script setup lang="ts" name="projectAbout">
  const { pkg, lastBuildTime } = __APP_INFO__;
  const { dependencies, devDependencies, version } = pkg;
</script>

<style scoped lang="less">
  .card {
    .title {
      margin: 0 0 15px;
      font-size: 18px;
      font-weight: bold;
      color: @primary-text-color;
    }
    .text {
      font-size: 15px;
      line-height: 25px;
      color: @primary-text-color;
    }
    .guyue-link {
      position: relative;
      font-size: 15px;
      color: var(--ant-primary-color);
      &:hover {
        color: var(--ant-primary-color-hover);
        &::after {
          position: absolute;
          right: 0;
          bottom: 0;
          left: 0;
          height: 0;
          content: '';
          border-bottom: 1px solid var(--ant-primary-color-hover);
        }
      }
    }
  }
</style>
