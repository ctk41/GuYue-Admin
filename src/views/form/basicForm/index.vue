<template>
  <div class="card content-box">
    <a-alert
      class="w-100 mb-20"
      message="Basic Form 🍓🍓🍓🍇🍇🍇"
      description="Form pages are used to collect or verify information from users. Basic forms are common in scenarios with fewer data items."
      type="info"
    />
    <a-form ref="formRef" :model="formState" v-bind="formItemLayout" :colon="false" :rules="rules" class="w-60">
      <a-form-item label="Name" name="appointment_name">
        <a-input v-model:value="formState.appointment_name" placeholder="Please enter your name" />
      </a-form-item>
      <a-form-item label="Phone Number" name="appointment_phone">
        <a-input v-model:value="formState.appointment_phone" placeholder="Phone number" />
      </a-form-item>
      <a-form-item label="Appointment Date" name="appointment_date">
        <a-date-picker v-model:value="formState.appointment_date" value-format="YYYY-MM-DD" />
      </a-form-item>
      <a-form-item label="Doctor" name="appointment_doctor">
        <a-select v-model:value="formState.appointment_doctor" placeholder="Please select a doctor">
          <a-select-option value="Doctor Li">Doctor Li</a-select-option>
          <a-select-option value="Doctor Yang">Doctor Yang</a-select-option>
          <a-select-option value="Doctor Zhang">Doctor Zhang</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="Services" name="appointment_item">
        <a-select v-model:value="formState.appointment_item" placeholder="Please select services" mode="multiple">
          <a-select-option value="fillTooth">Filling</a-select-option>
          <a-select-option value="implantTeeth">Implant</a-select-option>
          <a-select-option value="toothwash">Cleaning</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="Gender" name="appointment_gender">
        <a-radio-group v-model:value="formState.appointment_gender">
          <a-radio value="1">Male</a-radio>
          <a-radio value="2">Female</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="Notes" name="appointment_comment">
        <a-textarea
          v-model:value="formState.appointment_comment"
          placeholder="Please enter appointment notes"
          :rows="4"
        />
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 14, offset: 6 }" class="mt-20">
        <a-button type="primary" @click="onFinish">Submit</a-button>
        <a-button class="ml-20" @click="() => formRef!.resetFields()">Reset</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts" name="basicForm">
  import { ref } from 'vue';
  import type { Rule } from 'ant-design-vue/es/form';
  import type { FormInstance } from 'ant-design-vue';
  import { message } from 'ant-design-vue';

  const formRef = ref<FormInstance>();
  const rules: Record<string, Rule[]> = {
    appointment_name: [
      { type: 'string', required: true, message: 'Please enter your name', trigger: ['change', 'blur'] },
    ],
    appointment_phone: [
      { type: 'string', required: true, message: 'Please enter your phone number', trigger: 'change' },
    ],
    appointment_date: [
      {
        type: 'string' as const,
        required: true,
        message: 'Please select an appointment date',
        trigger: ['change', 'blur'],
      },
    ],
    appointment_doctor: [
      {
        type: 'string' as const,
        required: true,
        message: 'Please select a doctor',
        trigger: ['change', 'blur'],
      },
    ],
    appointment_comment: [
      {
        type: 'string' as const,
        required: true,
        message: 'Please enter appointment notes',
        trigger: ['change', 'blur'],
      },
    ],
  };
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  };
  const formState = ref<Record<string, any>>({
    appointment_name: '',
    appointment_phone: '',
    appointment_gender: '1',
    appointment_comment: '',
  });
  const onFinish = async () => {
    try {
      const values = await formRef.value!.validateFields();
      message.success('Submitted data: ' + JSON.stringify(values));
    } catch (errorInfo) {
      message.error('Validation failed, please complete all required fields');
    }
  };
</script>

<style scoped lang="less"></style>
