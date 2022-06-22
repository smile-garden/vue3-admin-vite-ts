<template>
  <div class="login-container">
    <div class="login-head">Smile Admin System</div>
    <a-form
      :model="formState"
      :rules="rules"
      name="login"
      autocomplete="off"
      validate-on-rule-change
      @finish="onFinish"
      @finish-failed="onFinishFailed"
    >
      <a-form-item name="username">
        <a-input
          v-model:value.trim="formState.username"
          :placeholder="$t('account.userName')">
          <template #prefix>
            <user-outlined style="color: #bbb;" />
          </template>
        </a-input>
      </a-form-item>

      <a-form-item name="password">
        <a-input-password
          v-model:value.trim="formState.password"
          :placeholder="$t('account.password')">
          <template #prefix>
            <lock-outlined style="color: #bbb;" />
          </template>
        </a-input-password>
      </a-form-item>

      <a-form-item name="remember">
        <a-checkbox
          v-model:checked="formState.remember"
          @change="changeFlag">{{ $t('account.remember') }}</a-checkbox>
      </a-form-item>

      <a-form-item>
        <a-button
          class="login-submit"
          :disabled="disabled"
          :loading="formState.loading"
          type="primary"
          html-type="submit"
        >{{ $t('action.login') }}</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue';
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
import { useI18n } from 'vue-i18n/index';
import { useRouter } from 'vue-router';
import { login } from '@/api';

interface FormState {
  username: string,
  password: string,
  remember: boolean,
  loading: boolean,
}

const formState = reactive<FormState>({
  username: '',
  password: '',
  remember: false,
  loading: false,
});
const disabled = computed(() => !(formState.username && formState.password));
const { t } = useI18n();
const rules = computed(() => ({
  username: { required: true, message: t('account.pleaseInputAccount') },
  password: { required: true, message: t('account.pleaseInputPassword') },
}));

const changeFlag = (e) => {
  const { checked } = e.target;
  console.log(checked);
};

const router = useRouter();
const onFinish = () => {
  login(formState)
    .then((res) => {
      router.push('/');
      console.log(res);
    });
};

const onFinishFailed = (errInfo) => {
  console.log(errInfo);
};
</script>

<style lang="less" scoped>
.login {
  &-head {
    padding-bottom: 20px;
    text-align: center;
    font-size: 28px;
    font-weight: 600;
  }

  &-container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -60%);
    width: 360px;
  }

  &-submit {
    width: 100%;
  }
}
</style>
