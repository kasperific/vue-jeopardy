<template>
  <div id="app">
    <CategoryBox />
    <CategoryBox />
    <CategoryBox />
    <CategoryBox />
    <CategoryBox />
    <CategoryBox />
  </div>
</template>

<script>
import CategoryBox from '@/components/CategoryBox'

export default {
  name: 'App',
  components: {
    CategoryBox
  }
}
</script>

<style>
[v-cloak] {
  display: none;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #fff;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-column-gap: 5px;
  background: black;
}
</style>
