<template>
  <div id="app">
    <router-view v-slot="{ Component }">
      <keep-alive include="Home">
        <component :is="Component" />
      </keep-alive>
    </router-view>
    <main-tab-bar></main-tab-bar>
  </div>
</template>

<script>
import MainTabBar from "components/content/mainTabBar/mainTabBar"

export default {
  name: 'App',
  components: {
    MainTabBar,
  },
}
</script>

<style>
@import "assets/css/base.css";
</style>
