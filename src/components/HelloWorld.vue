<script setup lang="ts">
import { ref, onMounted, onUpdated, onRenderTracked, onRenderTriggered } from 'vue'
import Modal from './Modal.vue';

const str: string = 'aaa3'
const count = ref(0)

onMounted(() => {
  console.log(str);
});
console.log(count)
console.log(count.value)

onUpdated(() => {
  console.log('update')
})

onRenderTracked((e) => {
  console.log(e);
})

onRenderTriggered((e) => {
  console.log(e, '状态触发组件')
})
</script>

<template>
  <modal
  />
  <p>
    Recommended IDE setup:
    <a href="https://code.visualstudio.com/" target="_blank">VS Code</a>
    +
    <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
  </p>

  <p>
    <a href="https://vitejs.dev/guide/features.html" target="_blank">
      Vite Documentation
    </a>
    |
    <a href="https://v3.vuejs.org/" target="_blank">Vue 3 Documentation</a>
  </p>

  <button type="button" @click="count++">count is: {{ count }}</button>
  <p>

    Edit
    <code>components/HelloWorld.vue</code> to test hot module replacement.
  </p>
</template>

<style scoped>
a {
  color: #42b983;
}
</style>
