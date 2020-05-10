<template>
  <div class="box">
    <h1>{{ value }}</h1>
    <p>
      {{ question }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'ClueBox',
  data () {
    return {
      info: null
    }
  },
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
