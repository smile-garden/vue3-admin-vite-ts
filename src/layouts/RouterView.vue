<template>
  <router-view v-slot="{ Component }">
    <keep-alive v-if="$route.meta.keepAlive">
      <component :is="Component" :key="$route.path" />
    </keep-alive>
    <component
      :is="Component"
      v-else
      :key="$route.path"
    />
  </router-view>
</template>

<script setup lang='ts'>

</script>

<style lang='less' scoped>
</style>
