<template>
  <div class="card content-box">
    <a-alert
      class="mb-20 w-100"
      message="右键菜单🍇🍇"
      description="右键菜单示例，指定元素右键显示操作菜单"
      type="info"
    />
    <div class="w-100">
      <a-alert message="右键展示菜单" type="success" class="mb-20">
        <template #description>
          <a-button type="primary" class="mt-6" @click.right="showContextMenu($event, '右键菜单')">右键试试</a-button>
        </template>
      </a-alert>
      <a-alert message="头像组件右键展示菜单" type="success">
        <template #description>
          <a-avatar :size="60" class="mt-6" @click.right="showContextMenu($event, '右键菜单')">
            <template #icon>
              <img alt="avatar" src="@/assets/images/avatar.jpg" />
            </template>
          </a-avatar>
        </template>
      </a-alert>
    </div>
  </div>
</template>

<script setup lang="ts">
import ContextMenu from '@/components/ContextMenu';
import MenuContext from './components/rightMenu.vue';

// 右键菜单
const showContextMenu = (e: MouseEvent, value: string) => {
  e.preventDefault();
  ContextMenu(e, value, MenuContext);
};
</script>

<style scoped lang="less"></style>
