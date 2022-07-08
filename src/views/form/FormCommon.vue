<template>
  <a-form
    ref="formRef"
    :model="state"
    v-bind="formItemLayout">
    <a-form-item label="common1" required>
      <a-input
        v-model:value.trim="state.common1"
        placeholder="请输入common1"
      />
    </a-form-item>
    <a-form-item label="common2" required>
      <a-input
        v-model:value.trim="state.common2"
        placeholder="请输入common2"
      />
    </a-form-item>
    <a-form-item label="common3" required>
      <a-input
        v-model:value.trim="state.common3"
        placeholder="请输入common3"
      />
    </a-form-item>
    <!-- <a-form-item>
      <a-button @click="submit">submit</a-button>
      <a-button @click="resetFields">reset</a-button>
    </a-form-item> -->
  </a-form>
</template>

<script setup lang='ts'>
import { reactive } from 'vue';
import { Form } from 'ant-design-vue';

defineProps({
  formItemLayout: {
    type: Object,
    required: true,
  },
});

const { useForm } = Form;

const state = reactive({
  common1: '',
  common2: '',
  common3: '',
});
const rules = reactive({
  common1: [{ required: true, message: '请输入common1' }],
  common2: [{ required: true, message: '请输入common2' }],
  common3: [{ required: true, message: '请输入common3' }],
});

const {
  resetFields,
  validate,
  validateInfos,
} = useForm(state, rules);

/* const submit = () => {
  validate()
    .then((res) => {
      console.log('pass', res);
    })
    .catch((err) => {
      console.log('err', err);
    });
}; */

defineExpose({
  resetFields,
  validate,
  validateInfos,
});
</script>
