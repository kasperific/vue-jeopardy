<template>
  <div id="app">
    <ClueBox />
  </div>
</template>

<script>
import ClueBox from './components/ClueBox.vue'

export default {
  name: 'App',
  components: {
    ClueBox
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
