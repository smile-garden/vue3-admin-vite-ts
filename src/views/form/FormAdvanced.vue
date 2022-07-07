<template>
  <a-card :bordered="false">
    <a-form
      v-bind="layout"
      autocomplete="off"
      :scroll-to-first-error="{ block: 'end', }"
    >
      <a-form-item label="公司名称" required>
        <a-input
          v-model:value.trim="infoRef.companyName"
          placeholder="请输入公司名称"
          :maxlength="10"
        />
      </a-form-item>
      <a-form-item label="公司类型" required>
        <a-radio-group
          v-model:value="infoRef.type"
          placeholder="请输入公司类型">
          <a-radio :value="1">个体工商户</a-radio>
          <a-radio :value="3">独资企业</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="员工数量" required>
        <a-input-number
          v-model:value="infoRef.number"
          placeholder="请输入"
          :precision="0"
          :min="0"
          :max="999999"
        />
      </a-form-item>
      <a-form-item label="法人" required>
        <a-input
          v-model:value.trim="infoRef.legalPerson"
          placeholder="请输入法人"
        />
      </a-form-item>
      <a-form-item label="身份证号" required>
        <a-input
          v-model:value.trim="infoRef.idcard"
          placeholder="请输入身份证号"
        />
      </a-form-item>
      <a-form-item label="申请时间" required>
        <a-date-picker
          v-model:value="infoRef.applyTime"
          placeholder="请输入申请时间"
          value-format="YYYY-MM-DD"
        />
      </a-form-item>
      <a-form-item label="电话" required>
        <a-input
          v-model:value.trim="infoRef.phone"
          placeholder="请输入电话"
        />
      </a-form-item>
      <a-form-item label="邮箱" required>
        <a-input
          v-model:value.trim="infoRef.email"
          placeholder="请输入邮箱"
        />
      </a-form-item>
      <a-form-item label="办公地址" required>
        <a-textarea
          v-model:value.trim="infoRef.address"
          placeholder="请输入办公地址"
          :maxlength="100"
        />
      </a-form-item>
    </a-form>
  </a-card>

  <a-card :bordered="false">
    <form-field
      ref="contactRef"
    />
  </a-card>

  <a-card :bordered="false">
    <form-field
      ref="websiteRef"
      label-name="网址"
    />
  </a-card>

  <a-card :bordered="false">
    <a-form-item
      :wrapper-col="{ span: 24 }"
      style="text-align: center;"
      v-bind="errorInfos">
      <a-button type="primary" @click.prevent="onSubmit">注册公司</a-button>
      <a-button class="ml10" @click="resetFields">重置</a-button>
    </a-form-item>
  </a-card>
</template>

<script setup lang='ts'>
import { ref, reactive, computed } from 'vue';
import { toArray } from 'lodash-es';
import { Form } from 'ant-design-vue';
import FormField from './FormField.vue';

const useFormHandle = Form.useForm;
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
const infoRef = reactive({
  companyName: '',
  type: '',
  number: '',
  legalPerson: '',
  idcard: '',
  applyTime: '',
  phone: '',
  email: '',
  address: '',
});
const rules = reactive({
  companyName: [{ required: true, message: '请输入公司名称' }],
  type: [{ required: true, message: '请选择公司类型' }],
  number: [{ required: true, message: '请输入员工数量' }],
  legalPerson: [{ required: true, message: '请输入法人' }],
  idcard: [{ required: true, message: '请输入身份证号' }],
  applyTime: [{ required: true, message: '请选择申请时间' }],
  phone: [{ required: true, message: '请输入电话' }],
  email: [{ required: true, message: '请输入邮箱' }],
  address: [{ required: true, message: '请输入办公地址' }],
});
const {
  resetFields,
  validate,
  validateInfos,
  mergeValidateInfo,
} = useFormHandle(infoRef, rules);

const contactRef = ref();
const websiteRef = ref();
const onSubmit = () => {
  const basicInfo = new Promise((resolve, reject) => {
    validate()
      .then((res) => {
        console.log(res, infoRef);
        resolve(infoRef);
      })
      .catch((err) => {
        reject(err);
      });
  });
  const contactInfo = new Promise((resolve, reject) => {
    contactRef.value.submit()
      .then((res: any) => {
        resolve(res);
      })
      .catch((err: any) => {
        reject(err);
      });
  });
  const websiteInfo = new Promise((resolve, reject) => {
    websiteRef.value.submit()
      .then((res: any) => {
        resolve(res);
      })
      .catch((err: any) => {
        reject(err);
      });
  });
  Promise.all([basicInfo, contactInfo, websiteInfo])
    .then((values) => {
      console.log(values);
    })
    .catch((err) => {
      console.log(err);
    });
};
const errorInfos = computed(() => mergeValidateInfo(toArray(validateInfos)));
</script>
