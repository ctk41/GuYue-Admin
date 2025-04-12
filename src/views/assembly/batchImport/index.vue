<template>
  <div class="card content-box">
    <a-alert class="w-100 mb-20" message="批量添加数据" description="支持Excel数据上传" type="info" />
    <a-button type="primary" @click="batchAdd">
      <template #icon><upload-outlined /></template>
      批量添加数据
    </a-button>
    <ImportExcel ref="importRef" />
    <a-descriptions title="配置项（通过 ref 传递） 📚" :column="1" bordered class="w-100" size="small">
      <a-descriptions-item label="title"> 组件显示标题 && 上传成功之后提示信息 </a-descriptions-item>
      <a-descriptions-item label="fileSize"> 上传文件大小，默认为 5M </a-descriptions-item>
      <a-descriptions-item label="fileType">
        上传文件类型限制，默认类型为 ["application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"]
      </a-descriptions-item>
      <a-descriptions-item label="tempApi"> 下载模板的 Api </a-descriptions-item>
      <a-descriptions-item label="importApi"> 上传数据的 Api </a-descriptions-item>
      <a-descriptions-item label="getTableList"> 上传数据成功之后，刷新表格数据的 Api </a-descriptions-item>
    </a-descriptions>
  </div>
</template>

<script setup lang="ts" name="batchImport">
import { ref } from 'vue';
import { exportUserInfo, BatchAddUser } from '@/api/modules/user';
import ImportExcel from '@/components/ImportExcel/index.vue';

const importRef = ref();
const batchAdd = () => {
  let params = {
    title: '数据',
    tempApi: exportUserInfo,
    importApi: BatchAddUser,
  };
  importRef.value.acceptParams(params);
};
</script>

<style scoped lang="less">
@import url('./index.less');
</style>
