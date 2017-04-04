<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
    require("muse-ui/dist/muse-ui.css");
    require("./assets/css/icon.css");
    require("./assets/css/style.css");
export default {
  name: 'app'
}
</script>

<style>
#app {
  margin-top: 10px;
}
</style>
