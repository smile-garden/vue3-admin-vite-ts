<template>
  <a-card :bordered="false">
    <a-form
      ref="formRef"
      v-bind="layout"
      :model="infoState"
      :rules="rules"
      autocomplete="off"
      :scroll-to-first-error="{ block: 'end' }"
      @finish="handleFinish"
      @validate="handleValidate"
      @finish-failed="handleFinishFailed"
    >
      <a-form-item label="公司名称" name="companyName">
        <a-input
          v-model:value.trim="infoState.companyName"
          placeholder="请输入公司名称"
          :maxlength="10"
        />
      </a-form-item>
      <a-form-item label="公司类型" name="type">
        <a-radio-group
          v-model:value="infoState.type"
          placeholder="请输入公司类型">
          <a-radio :value="1">个体工商户</a-radio>
          <a-radio :value="3">独资企业</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="员工数量" name="number">
        <a-input-number
          v-model:value="infoState.number"
          placeholder="请输入"
          :precision="0"
          :min="0"
          :max="999999"
        />
      </a-form-item>
      <a-form-item label="法人" name="legalPerson">
        <a-input
          v-model:value.trim="infoState.legalPerson"
          placeholder="请输入法人"
        />
      </a-form-item>
      <a-form-item label="身份证号" name="idcard">
        <a-input
          v-model:value.trim="infoState.idcard"
          placeholder="请输入身份证号"
        />
      </a-form-item>
      <a-form-item label="申请时间" name="applyTime">
        <a-date-picker
          v-model:value="infoState.applyTime"
          value-format="YYYY-MM-DD"
          placeholder="请输入申请时间"
        />
      </a-form-item>
      <a-form-item label="电话" name="phone">
        <a-input
          v-model:value.trim="infoState.phone"
          placeholder="请输入电话"
        />
      </a-form-item>
      <a-form-item label="邮箱" name="email">
        <a-input
          v-model:value.trim="infoState.email"
          placeholder="请输入邮箱"
        />
      </a-form-item>
      <a-form-item label="办公地址" name="address">
        <a-textarea
          v-model:value.trim="infoState.address"
          placeholder="请输入办公地址"
          :maxlength="100"
        />
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 24 }" style="text-align: center;">
        <a-button type="primary" html-type="submit">注册公司</a-button>
        <a-button class="ml10" @click="resetForm">reset</a-button>
      </a-form-item>
    </a-form>
  </a-card>
</template>

<script setup lang='ts'>
import { ref, reactive } from 'vue';
import type { FormInstance } from 'ant-design-vue';

const formRef = ref<FormInstance>();
const layout = {
  labelCol: {
    lg: { span: 9 },
    sm: { span: 7 },
  },
  wrapperCol: {
    lg: { span: 7 },
    sm: { span: 17 },
  },
};
interface InfoState {
  companyName: string,
  type: number,
  number: number | null,
  legalPerson: string,
  idcard: string,
  applyTime: string,
  phone: string,
  email: string,
  address: string,
}

const infoState = reactive<InfoState>({
  companyName: '',
  type: 1,
  number: null,
  legalPerson: '',
  idcard: '',
  applyTime: '',
  phone: '',
  email: '',
  address: '',
});
const rules = {
  companyName: [{ required: true, message: '请输入公司名称', trigger: 'blur' }],
  type: [{ required: true, message: '请选择公司类型', trigger: 'change' }],
  number: [{ required: true, message: '请输入员工数量', trigger: 'blur' }],
  legalPerson: [{ required: true, message: '请输入法人', trigger: 'blur' }],
  idcard: [{ required: true, message: '请输入身份证号', trigger: 'blur' }],
  applyTime: [{ required: true, message: '请选择申请时间', trigger: ['blur', 'change'] }],
  phone: [{ required: true, message: '请输入电话', trigger: 'blur' }],
  email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }],
  address: [{ required: true, message: '请输入办公地址', trigger: 'blur' }],
};

const handleFinish = (values: any) => {
  console.log(values);
};

const handleFinishFailed = (errors: any) => {
  console.log(errors);
};

const resetForm = () => {
  formRef.value.resetFields();
};

const handleValidate = (...args: any) => {
  console.log(args);
};
</script>
