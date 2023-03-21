<script >
import CategoryBox from './components/CategoryBox.vue'
export default {
  components: {
    CategoryBox
  }
}
</script>

<template>
    <CategoryBox />
    <CategoryBox />
    <CategoryBox />
    <CategoryBox />
    <CategoryBox />
    <CategoryBox />
</template>



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
