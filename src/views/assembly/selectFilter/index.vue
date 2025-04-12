<template>
  <div class="card content-box">
    <a-alert class="mb-20 w-100" message="分类筛选器 🍓🍇🍓🍇" type="info" />
    <SelectFilter :data="filterData" @change="changeFilter" :default-values="filterResult" />
    <span class="result">返回值: {{ filterResult }}</span>
    <a-descriptions title="配置项 📚" :column="1" bordered class="w-100" size="small">
      <a-descriptions-item label="data"> 需要筛选的数据列表，详情请查看代码 </a-descriptions-item>
      <a-descriptions-item label="defaultValues"> 默认选中的值 </a-descriptions-item>
    </a-descriptions>
  </div>
</template>

<script setup lang="ts" name="selectFilter">
  import { ref } from 'vue';
  import SelectFilter from '@/components/SelectFilter/index.vue';

  const filterResult = ref({ state: '1', type: ['1', '3'] });

  const changeFilter = (val: typeof filterResult.value) => {
    filterResult.value = val;
  };

  const filterData = [
    {
      title: '物流状态(单)',
      key: 'state',
      options: [
        {
          label: '全部',
          value: '',
        },
        {
          label: '已下单',
          value: '1',
          icon: 'ShoppingCartOutlined',
        },
        {
          label: '已发货',
          value: '2',
          icon: 'carOutlined',
        },
        {
          label: '已签收',
          value: '3',
          icon: 'formOutlined',
        },
        {
          label: '已退回',
          value: '4',
          icon: 'delivered-procedureOutlined',
        },
        {
          label: '已完成',
          value: '5',
          icon: 'check-circleOutlined',
        },
      ],
    },
    {
      title: '商品类型(多)',
      key: 'type',
      multiple: true,
      options: [
        {
          label: '全部',
          value: '',
        },
        {
          label: '食品类',
          value: '1',
        },
        {
          label: '服装类',
          value: '2',
        },
        {
          label: '家具类',
          value: '3',
        },
        {
          label: '日用品类',
          value: '4',
        },
      ],
    },
  ];
</script>
<style scoped lang="less">
  @import url('./index.less');
</style>
