<template>
  <div>about page 测试 {{ testStr }}</div>
  <div>{{ countVal }}</div>
  <a-button @click="handleChange">变变变</a-button>
</template>

<script setup lang='ts'>
import { computed } from 'vue';
import { useStore } from '@/store';

const store = useStore();
const testStr = computed(() => store.state.test);
const countVal = computed(() => store.state.accountModule.count);
const handleChange = () => {
  store.commit('CHANGE_TEST', 'test 2022 06 21');
  store.commit('ADD_COUNT');
};
</script>

<style lang='less' scoped>
</style>
