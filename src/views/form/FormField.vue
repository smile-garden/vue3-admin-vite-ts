<template>
  <a-form ref="formRef">
    <!-- 表单 -->
    <a-form-item>
      <a-input />
    </a-form-item>
  </a-form>
</template>

<script setup lang='ts'>
import { ref } from 'vue';
import { FormInstance } from 'ant-design-vue';

const formRef = ref<FormInstance>();
const submit = () => formRef.value.validate();

defineExpose({
  submit,
});
</script>

<style lang='less' scoped>
</style>
