<template>
  <div class="card content-box">
    <a-alert class="w-100 mb-20" message="I am the ProTable details page, a subset of ProTable 🍓🍇🍈🍉" type="info" />
    <span class="text">params:{{ route.params }}</span>
    <span class="text">query:{{ route.query }}</span>
  </div>
</template>

<script setup lang="ts" name="useProTableDetail">
  import { useRoute } from 'vue-router';
  const route = useRoute();
</script>

<style scoped lang="less"></style>
