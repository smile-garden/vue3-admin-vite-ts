<template>
  <a-form
    ref="formRef"
    :model="state"
    v-bind="formItemLayoutWithOutLabel">
    <a-form-item
      v-for="(item , index) in state.fieldList"
      :key="item.key"
      v-bind="index === 0 ? formItemLayout : {}"
      :label="index === 0 ? labelName : ''"
      :name="['fieldList', index, 'valueName']"
      :rules="{
        required: true,
        message: 'please input field',
        trigger: 'change',
      }"
    >
      <div class="box-item">
        <a-input
          v-model:value="item.valueName"
          placeholder="请输入"
        />
        <minus-circle-outlined
          v-if="state.fieldList.length > 1"
          class="box-action"
          @click="removeContacts(item)"
        />
      </div>
    </a-form-item>
    <a-form-item>
      <a-button
        type="dashed"
        style="width: 100%;"
        @click="addContacts">
        <plus-outlined
        />
        新增
      </a-button>
    </a-form-item>
    <a-form-item v-if="showSubmit">
      <a-space>
        <a-button type="primary" @click="save">Submit</a-button>
        <a-button @click="resetForm">Reset</a-button>
      </a-space>
    </a-form-item>
  </a-form>
</template>

<script setup lang='ts'>
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons-vue';
import { ref, reactive } from 'vue';
import { FormInstance } from 'ant-design-vue';

/* defineProps<{
  labelName: {
    type: String,
    default: '联系人',
  },
  showSubmit: {
    type: Boolean,
    default: false,
  },
}>(); */

interface Props {
  labelName?: string,
  showSubmit?: boolean,
}

withDefaults(defineProps<Props>(), {
  labelName: '联系人',
  showSubmit: false,
});

const formItemLayoutWithOutLabel = {
  wrapperCol: {
    lg: {
      offset: 9,
      span: 7,
    },
    sm: {
      offset: 7,
      span: 17,
    },
  },
};
const formItemLayout = {
  labelCol: {
    lg: { span: 9 },
    sm: { span: 7 },
  },
  wrapperCol: {
    lg: { span: 7 },
    sm: { span: 17 },
  },
};

const formRef = ref<FormInstance>();

interface Field {
  key: number,
  valueName: string,
}
const state = reactive<{ fieldList: Field[] }>({
  fieldList: [
    { key: 1, valueName: '' },
  ],
});

const removeContacts = (item: Field) => {
  const index = state.fieldList.indexOf(item);
  if (index !== -1) {
    state.fieldList.splice(index, 1);
  }
};

const addContacts = () => {
  state.fieldList.push({
    valueName: '',
    key: Date.now(),
  });
};

const submit = () => formRef.value!.validate();
const resetForm = () => formRef.value!.resetFields();

const save = () => {
  submit()
    .then((res) => {
      console.log('vlaue', res, state.fieldList);
    })
    .catch((err) => {
      console.log('err', err);
    });
};

defineExpose({
  submit,
  resetForm,
});
</script>

<style lang="less" scoped>
.box {
  &-item {
    display: flex;
    align-items: center;
  }

  &-action {
    margin-left: 10px;
    font-size: 24px;
    color: #999;
  }
}
</style>
