<template>
  <a-result status="success" title="操作成功!" sub-title="预计两小时内到账">
    <template #extra>
      <a-descriptions :column="1" class="bill-container w-60 mb-20">
        <a-descriptions-item label="付款账户">{{ payment_account }}</a-descriptions-item>
        <a-descriptions-item label="收款账户">{{ credited_account }}</a-descriptions-item>
        <a-descriptions-item label="收款人姓名">{{ credited_name }}</a-descriptions-item>
        <a-descriptions-item label="转账金额">￥{{ transfer_amount }} 元</a-descriptions-item>
      </a-descriptions>
      <a-button type="primary" @click="props.changeCurrent(0)">再转一笔</a-button>
      <a-button @click="props.prev">查看账单</a-button>
    </template>
  </a-result>
</template>

<script setup lang="ts">
  import { toRefs } from 'vue';

  interface Steps {
    stepOne: any;
    stepTwo: any;
    stepThree: any;
  }
  interface SubstepProps {
    changeCurrent: (val: number) => void;
    next: (params: object) => void;
    prev: () => void;
    stepsData: Steps;
  }
  const props = defineProps<SubstepProps>();
  const { payment_account, credited_account, credited_name, transfer_amount } = toRefs(props.stepsData.stepOne);
</script>

<style scoped lang="less">
  .bill-container {
    padding-top: 10px;
    padding-left: 20px;
    margin: auto;
    background-color: #fafafa;
  }
</style>
