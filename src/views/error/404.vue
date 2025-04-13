<template>
  <div class="error-container">
    <div class="error-content">
      <h1 class="error-title">404</h1>
      <p class="error-message">Sorry, the page you visited does not exist.</p>
      <a-button type="primary" @click="$router.push('/')">Back Home</a-button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { Button as AButton } from 'ant-design-vue';
</script>

<style scoped>
  .error-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f0f2f5;
  }

  .error-content {
    text-align: center;
  }

  .error-image {
    width: 300px;
    margin-bottom: 20px;
  }

  .error-title {
    font-size: 48px;
    color: #1890ff;
    margin-bottom: 16px;
  }

  .error-message {
    font-size: 16px;
    color: rgba(0, 0, 0, 0.45);
    margin-bottom: 24px;
  }
</style>
