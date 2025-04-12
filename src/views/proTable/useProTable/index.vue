<template>
  <div class="table-box">
    <ProTable ref="proTable" table-key="user-information" :request-api="getTableList" :columns="columns" multiple>
      <template #searchForm="scope">
        <a-col :span="6">
          <a-form-item name="name" label="Name">
            <a-input placeholder="placeholder" v-model="scope.formState['name']"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="6">
          <a-form-item name="role" label="Role Type">
            <GRoleSelect v-model="scope.formState['role']" />
          </a-form-item>
        </a-col>
        <a-col :span="6">
          <a-form-item name="gender" label="Gender">
            <a-select v-model="scope.formState['gender']">
              <a-select-option :value="1">Male</a-select-option>
              <a-select-option :value="2">Female</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="6">
          <a-form-item name="status" label="User Status">
            <a-select v-model="scope.formState['status']">
              <a-select-option :value="0">Disabled</a-select-option>
              <a-select-option :value="1">Enabled</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="6" v-show="scope.expand">
          <a-form-item name="createTime" label="Creation Time">
            <a-range-picker v-model="scope.formState['createTime']" value-format="YYYY-MM-DD" />
          </a-form-item>
        </a-col>
      </template>
      <template #tableHeader="scope">
        <a-button type="primary">
          <template #icon>
            <plus-circle-outlined />
          </template>
          Add User
        </a-button>
        <a-button type="primary" @click="batchAdd">
          <template #icon>
            <upload-outlined />
          </template>
          Batch Add Users
        </a-button>
        <a-button type="primary" @click="downloadFile">
          <template #icon>
            <download-outlined />
          </template>
          Export User Data
        </a-button>
        <a-button type="primary" @click="toDetail(scope.selectedListIds)"> User Details Page </a-button>
      </template>
      <template #footer-btn="scope">
        <a-button danger @click="batchDelete(scope.selectedListIds)">
          <template #icon>
            <delete-outlined />
          </template>
          Batch Delete
        </a-button>
        <a-button type="primary"> Assign Role </a-button>
      </template>
      <template #headerCell="{ column }">
        <template v-if="column.key === 'rolename'">
          <TableFilter v-model="rolenameValue" :options="options" :title="'Role Type'" />
        </template>
      </template>
      <template #expandedRowRender="{ record }">
        {{ record }}
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'operation'">
          <a-button type="link" size="small">
            <template #icon>
              <eye-outlined />
            </template>
            View
          </a-button>
          <a-button type="link" size="small">
            <template #icon>
              <form-outlined />
            </template>
            Edit
          </a-button>
          <a-button type="link" size="small" @click="resetPass(record)">
            <template #icon>
              <sync-outlined />
            </template>
            Reset Password
          </a-button>
          <a-button type="link" size="small">
            <template #icon>
              <exception-outlined />
            </template>
            Delete
          </a-button>
        </template>
      </template>
    </ProTable>
    <ImportExcel ref="importRef" />
  </div>
</template>

<script setup lang="tsx">
  import { ref, createVNode, watch } from 'vue';
  import { useRouter } from 'vue-router';
  import { User } from '@/api/interface';
  import ProTable from '@/components/ProTable/index.vue';
  import type { TableColumnsType } from 'ant-design-vue';
  import ImportExcel from '@/components/ImportExcel/index.vue';
  import GRoleSelect from '@/components/GSelect/GRoleSelect.vue';
  import { useDownload } from '@/hooks/useDownload';
  import { useHandleData } from '@/hooks/useHandleData';
  import { Modal, message } from 'ant-design-vue';
  import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
  import {
    getUserList,
    exportUserInfo,
    BatchAddUser,
    deleteUser,
    resetUserPassWord,
    changeUserStatus,
  } from '@/api/modules/user';
  import TableFilter from '@/components/TableFilter/index.vue';
  import TablePreview from '@/components/TablePreview/index.vue';
  import CopyOptBtn from '@/components/CopyOptBtn/index.vue';

  const options = [
    { label: 'Administrator', value: 0 },
    { label: 'Project Manager', value: 1 },
    { label: 'Department Manager', value: 2 },
    { label: 'HR Manager', value: 3 },
    { label: 'Sales Manager', value: 4 },
  ];
  const rolenameValue = ref();
  const getTableList = (params: any) => {
    let newParams = JSON.parse(JSON.stringify(params));
    newParams.createTime && (newParams.startTime = newParams.createTime[0]);
    newParams.createTime && (newParams.endTime = newParams.createTime[1]);
    delete newParams.createTime;
    newParams['rolename'] = rolenameValue.value;
    return getUserList(newParams);
  };
  const columns = ref<TableColumnsType>([
    {
      title: '#',
      fixed: 'left',
      key: 'index',
      dataIndex: 'index',
      align: 'center',
      width: 80,
    },
    {
      title: 'Username',
      resizable: true,
      dataIndex: 'username',
      fixed: 'left',
      key: 'username',
      align: 'center',
      width: 100,
      minWidth: 100,
      maxWidth: 150,
    },
    {
      title: 'User Album',
      dataIndex: 'avatar',
      key: 'avatar',
      align: 'center',
      width: 160,
      customRender: ({ text }) => {
        return <TablePreview src={text} />;
      },
    },
    {
      title: 'User Introduction',
      dataIndex: 'introduction',
      key: 'introduction',
      align: 'center',
      width: 160,
      customRender: ({ text }) => {
        return <TablePreview src={text} type='video' />;
      },
    },
    {
      title: 'Video Link',
      dataIndex: 'introduction',
      key: 'introduction',
      align: 'center',
      width: 120,
      customRender: ({ text }) => {
        return <CopyOptBtn value={text} label='Copy Button' />;
      },
    },
    {
      title: 'Role Type',
      dataIndex: 'rolename',
      resizable: true,
      key: 'rolename',
      align: 'center',
      width: 150,
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
      align: 'center',
      customRender: ({ text }) => {
        return text == 1 ? 'Male' : 'Female';
      },
    },
    {
      title: 'Age',
      dataIndex: ['user', 'detail', 'age'],
      key: 'age',
      align: 'center',
    },
    {
      title: 'ID Card',
      key: 'idCard',
      dataIndex: 'idCard',
      resizable: true,
      ellipsis: true,
      align: 'center',
      width: 150,
    },
    {
      title: 'Email',
      key: 'email',
      dataIndex: 'email',
      resizable: true,
      ellipsis: true,
      align: 'center',
      width: 150,
    },
    {
      title: 'Residential Address',
      key: 'address',
      dataIndex: 'address',
      ellipsis: true,
      align: 'center',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      width: 120,
      customRender: ({ record }: { record: User.ResUserList }) => {
        return (
          <div class='status'>
            <a-switch
              checked={record.status}
              checkedChildren='Enabled'
              unCheckedChildren='Disabled'
              onChange={() => changeStatus(record)}
            />
            <a-tag color={record.status ? 'success' : 'error'}>{record.status ? 'Enabled' : 'Disabled'}</a-tag>
          </div>
        );
      },
    },
    {
      title: 'Creation Time',
      key: 'createTime',
      dataIndex: 'createTime',
      ellipsis: true,
      align: 'center',
    },
    {
      title: 'Operations',
      key: 'operation',
      dataIndex: 'operation',
      align: 'center',
      fixed: 'right',
      width: 320,
    },
  ]);
  const proTable = ref();
  const router = useRouter();

  const toDetail = (ids: Key[]) => {
    if (ids.length === 0 || ids.length > 1) {
      message.warning('Please select one user');
      return;
    }
    router.push(`/proTable/useProTable/detail/${ids[0]}?params=detail-page`);
  };

  const resetPass = async (params: User.ResUserList) => {
    await useHandleData(resetUserPassWord, { id: params.id }, `Reset password for user [${params.username}]`);
    proTable.value.getTableList();
  };

  const downloadFile = () => {
    Modal.confirm({
      title: 'Friendly Reminder',
      icon: createVNode(ExclamationCircleOutlined),
      content: 'Confirm export of user data?',
      onOk: async () => {
        await useDownload(exportUserInfo, 'User List', {});
      },
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      onCancel() {},
    });
  };
  const importRef = ref<InstanceType<typeof ImportExcel> | null>(null);

  const batchAdd = () => {
    const params = {
      title: 'User',
      tempApi: exportUserInfo,
      importApi: BatchAddUser,
      getTableList: proTable.value.getTableList,
    };
    importRef.value?.acceptParams(params);
  };

  const batchDelete = async (id: Key[]) => {
    await useHandleData(deleteUser, { id }, 'Delete selected user information');
    proTable.value.clearSelection();
    proTable.value.getTableList();
  };

  const changeStatus = async (row: User.ResUserList) => {
    await useHandleData(
      changeUserStatus,
      { id: row.id, status: row.status == 1 ? 0 : 1 },
      `Toggle status for user [${row.username}]`,
    );
    proTable.value.getTableList();
  };

  watch(
    () => rolenameValue.value,
    () => {
      proTable.value.getTableList();
    },
  );
</script>

<style scoped lang="less"></style>
