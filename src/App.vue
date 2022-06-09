<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import HelloWorldContent from '@/components/HelloWorldContent.vue';
import ShowImg from '@/components/ShowImg.vue';
</script>

<template>
  <HelloWorld-content />

  <Suspense>
    <template #default>
      <show-img />
    </template>
    <template #fallback>loading...</template>
  </Suspense>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #1a2025;
  margin-top: 60px;
}
</style>
