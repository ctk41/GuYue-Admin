<template>
  <a-select
    v-bind="$attrs"
    :loading="isLoading"
    :options="roleList"
    allowClear
    @focus="getRoleList"
    placeholder="Please select a role type"
    class="roleSelect"
  ></a-select>
</template>

<script setup lang="ts">
  import { ref, watchEffect } from 'vue';
  import { getRolesListApi } from '@/services/modules/role';
  import { createCacheStorage } from '@/utils/cache/storageCache';
  import { CacheConfig } from '@/utils/cache/config';
  import { message } from 'ant-design-vue';
  import type { SelectProps } from 'ant-design-vue';
  import type { Role } from '@/services/interface/index';

  const props = withDefaults(
    defineProps<{
      isImmediately?: boolean;
    }>(),
    {
      isImmediately: false,
    },
  );

  const isLoading = ref(false);
  const roleList = ref<SelectProps['options']>([]);

  const handleRoleData = (filterData: Role.RoleList[]) => {
    return filterData.map(item => {
      return { label: item.name, value: item.id };
    });
  };

  const getRoleList = async () => {
    try {
      isLoading.value = true;
      const useRoleList = createCacheStorage(CacheConfig.RoleSelect);
      const oldRoleListData = useRoleList.get();
      if (!oldRoleListData) {
        let { data } = await getRolesListApi();
        if (data && data.length > 0) {
          roleList.value = handleRoleData(data);
          useRoleList.set(data);
        }
      } else {
        roleList.value = handleRoleData(oldRoleListData);
      }
    } catch (error) {
      console.log('error', error);
      message.error('Failed to get role list');
    } finally {
      isLoading.value = false;
    }
  };

  const refresh = () => {
    const useRoleList = createCacheStorage(CacheConfig.RoleSelect);
    useRoleList.remove();
    getRoleList();
  };

  const getData = () => {
    return roleList.value;
  };

  watchEffect(() => {
    if (props.isImmediately) {
      getRoleList();
    }
  });

  defineExpose({
    refresh,
    getData,
  });
</script>

<style scoped lang="less">
  .roleSelect {
    min-width: 200px;
  }
</style>
