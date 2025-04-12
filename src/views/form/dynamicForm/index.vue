<template>
  <div class="card content-box">
    <a-alert
      class="w-100 mb-20"
      message="动态表单 🍓🍓🍓🍇🍇🍇"
      description="表单页用于向用户动态收集信息。"
      type="info"
    />
    <a-form ref="formRef" name="dynamic_form_nest_item" :model="dynamicValidateForm" @finish="onFinish">
      <a-space
        v-for="(item, index) in dynamicValidateForm.filters"
        :key="item.id"
        style="display: flex"
        align="baseline"
      >
        <!-- 控制 -->
        <a-form-item :name="['filters', index, 'condition']" label="筛选条件">
          <a-select
            v-model:value="item.condition"
            style="width: 120px"
            :options="SelectLeftData"
            @change="handleChange(item.id)"
          />
        </a-form-item>
        <!-- 匹配 -->
        <a-form-item :name="['filters', index, 'matching']">
          <a-select v-model:value="item.matching" style="width: 120px" :options="options" />
        </a-form-item>
        <!-- 值 -->
        <a-form-item :name="['filters', index, 'conditionValue']">
          <a-select
            v-model:value="item.conditionValue"
            allow-clear
            :options="(SelectRightData[item.condition] || []).map((a: string) => ({ value: a }))"
            style="width: 130px"
          ></a-select>
        </a-form-item>
        <!-- 删除 -->
        <template v-if="dynamicValidateForm.filters.length > 1">
          <CloseOutlined @click="removeScreening(item)" />
        </template>
      </a-space>
      <!-- 添加 -->
      <a-form-item>
        <a-button type="dashed" block @click="addScreening" :disabled="dynamicValidateForm.filters.length >= 4">
          <PlusOutlined />
          添加条件
        </a-button>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit">搜索</a-button>
        <a-button class="ml-20" @click="() => formRef!.resetFields()">重置</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts" name="dynamicForm">
import { reactive, ref } from 'vue';
import { CloseOutlined, PlusOutlined } from '@ant-design/icons-vue';
import type { FormInstance, SelectProps } from 'ant-design-vue';
import { message } from 'ant-design-vue';
/* 接口 */
interface FilterItem {
  condition: string;
  matching: string;
  conditionValue: string;
  id: number;
}
/* 下拉框数据 */
const SelectLeftData = [
  {
    label: '站点',
    value: 'station',
  },
  {
    label: '行业',
    value: 'industry',
  },
  {
    label: '渠道来源',
    value: 'channel',
  },
  {
    label: '银行',
    value: 'bank',
  },
];
/* 右侧值 */
const SelectRightData: any = {
  station: ['芳华路9号', '紫瑾园区', '嘉年华苑', '中山万博国际中心', '北京顾和园国际酒店'],
  industry: ['金融', '销售', '军人', '教师', '演员', '律师', '学生'],
  channel: ['抖音', '快手', '虎牙', '斗鱼', '微博', '微信公众号', '小红书', '哔哩哔哩'],
  bank: ['招商银行', '浦发银行', '中信银行', '光大银行', '华夏银行', '民生银行', '广发银行', '兴业银行', '平安银行'],
};
/* 表单实例 */
const formRef = ref<FormInstance>();
const dynamicValidateForm = reactive<{ filters: FilterItem[] }>({
  filters: [{ condition: 'station', matching: 'equal', conditionValue: '', id: Date.now() }],
});
/* 范围 */
const options = ref<SelectProps['options']>([
  { label: '等于', value: 'equal' },
  { label: '不等于', value: 'unequal' },
]);
/* 移除筛选条件 */
const removeScreening = (item: FilterItem) => {
  let index = dynamicValidateForm.filters.indexOf(item);
  if (index !== -1) {
    dynamicValidateForm.filters.splice(index, 1);
  }
};
/* 添加筛选条件 */
const addScreening = () => {
  dynamicValidateForm.filters.push({
    condition: 'station',
    matching: 'equal',
    conditionValue: '',
    id: Date.now(),
  });
};
/* 下拉筛选初始化值 */
const handleChange = (id: number) => {
  dynamicValidateForm.filters.forEach(item => {
    if (item.id === id) {
      item.conditionValue = '';
    }
  });
};

const onFinish = (values: Object) => {
  message.success('提交的数据为 : ' + JSON.stringify(values));
};
</script>

<style scoped lang="less"></style>
