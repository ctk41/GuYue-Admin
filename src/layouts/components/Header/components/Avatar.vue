<template>
  <a-dropdown :trigger="['click']" placement="bottom">
    <div class="avatar">
      <img src="@/assets/images/avatar.jpg" alt="avatar" />
    </div>
    <template #overlay>
      <a-menu>
        <a-menu-item @click="openPwdOrInfoModal('infoRef')">
          <div class="item-choice">
            <user-outlined />
            <span class="title">{{ $t('header.personalData') }}</span>
          </div>
        </a-menu-item>
        <a-menu-item @click="openPwdOrInfoModal('passwordRef')">
          <div class="item-choice">
            <form-outlined />
            <span class="title">{{ $t('header.changePassword') }}</span>
          </div>
        </a-menu-item>
        <a-menu-divider />
        <a-menu-item @click="logout">
          <div class="item-choice">
            <poweroff-outlined />
            <span class="title">{{ $t('header.logout') }}</span>
          </div>
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
  <InfoDialog ref="infoRef" />
  <PasswordDialog ref="passwordRef" />
</template>

<script setup lang="ts">
  import { ref, createVNode } from 'vue';
  import { useUserStore } from '@/stores/modules/user';
  import { LOGIN_URL } from '@/config';
  import { logoutApi } from '@/api/modules/login';
  import { useRouter } from 'vue-router';
  import { Modal, message } from 'ant-design-vue';
  import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
  import InfoDialog from './InfoDialog.vue';
  import PasswordDialog from './PasswordDialog.vue';

  const router = useRouter();
  const userStore = useUserStore();

  const logout = () => {
    Modal.confirm({
      title: '温馨提示',
      icon: createVNode(ExclamationCircleOutlined),
      content: '您是否确认退出登录？',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      async onOk() {
        try {
          await logoutApi();
          userStore.setToken('');
          router.replace(LOGIN_URL);
          message.success('退出登录成功！');
        } catch {
          message.success('退出登录失败！');
        }
      },
      onCancel() {},
    });
  };

  interface ModalExpose {
    openModal: () => void;
  }
  const infoRef = ref<null | ModalExpose>();
  const passwordRef = ref<null | ModalExpose>();
  const openPwdOrInfoModal = (refName: string) => {
    if (refName == 'infoRef') {
      infoRef.value?.openModal();
    } else {
      passwordRef.value?.openModal();
    }
  };
</script>

<style scoped lang="less">
  .avatar {
    width: 40px;
    height: 40px;
    overflow: hidden;
    cursor: pointer;
    border-radius: 50%;
    img {
      float: left;
      width: 100%;
      height: 100%;
    }
  }
  .item-choice {
    display: flex;
    align-items: center;
    height: 28px;
    .title {
      margin-left: 5px;
    }
  }
</style>
