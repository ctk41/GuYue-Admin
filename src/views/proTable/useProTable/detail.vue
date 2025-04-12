<template>
  <div class="card content-box">
    <a-alert class="w-100 mb-20" message="我是 ProTable 详情页，属于 ProTable 下面的子集 🍓🍇🍈🍉" type="info" />
    <span class="text">params:{{ route.params }}</span>
    <span class="text">query:{{ route.query }}</span>
  </div>
</template>

<script setup lang="ts" name="useProTableDetail">
import { useRoute } from 'vue-router';
const route = useRoute();
</script>

<style scoped lang="less"></style>
