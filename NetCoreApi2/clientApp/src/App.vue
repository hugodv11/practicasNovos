<template>
  <router-view/>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import NavigationBar from "@/components/navigation-bar/index.vue";

@Options({
  components: {
    NavigationBar
  }
})
export default class App extends Vue {}
</script>

// style:"display: flex; flex-direction: column; height: 100vh; overflow: auto"
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: auto;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
