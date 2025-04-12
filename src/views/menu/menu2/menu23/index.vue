<template>
  <div class="card content-box">
    <a-alert class="w-100 mb-20" message="我是menu2-3 🍓🍇🍈🍉" type="info" />
    <a-input v-model:value="value" placeholder="测试缓存"></a-input>
  </div>
</template>

<script setup lang="ts" name="menu23">
import { ref } from 'vue';
const value = ref('');
</script>

<style scoped lang="less"></style>
