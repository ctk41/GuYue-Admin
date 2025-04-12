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
  import { useTabsStore } from '@/stores/modules/tabs';
  import { useKeepAliveStore } from '@/stores/modules/keepAlive';
  import { useAuthStore } from '@/stores/modules/auth';
  import { useGlobalStore } from '@/stores/modules/global';

  const router = useRouter();
  const userStore = useUserStore();

  const logout = () => {
    Modal.confirm({
      title: 'Friendly Reminder',
      icon: createVNode(ExclamationCircleOutlined),
      content: 'Are you sure you want to log out?',
      okText: 'Confirm',
      okType: 'danger',
      cancelText: 'Cancel',
      async onOk() {
        try {
          await logoutApi();
          userStore.setToken('');
          userStore.setUserInfo({ name: '' });

          const tabsStore = useTabsStore();
          tabsStore.closeMultipleTab();

          const keepAliveStore = useKeepAliveStore();
          keepAliveStore.setKeepAliveName();

          const authStore = useAuthStore();
          authStore.setRouteName('');

          const globalStore = useGlobalStore();
          globalStore.setGlobalState('refreshPage', true);

          router.replace(LOGIN_URL);
          message.success('Logged out successfully!');
        } catch (error) {
          message.error('Failed to log out!');
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
