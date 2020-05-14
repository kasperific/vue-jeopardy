<template>
<!-- <section v-if="errored">
    <p>Oh dear. That's not good.</p>
  </section>

  <section v-else> -->
  <section>
    <h1>{{ categories.title }}</h1>
    <div class="box" v-for="clue in uniqueClues" :key="clue.id">
      <p v-if="clue.airdate < 6467">
        {{ clue.value * 2 }}
      </p>
      <p v-else>
        {{ clue.value }}
      </p>
      <p @click="showAnswer(clue)">
        {{ clue.question }}
      </p>
      <div v-if="questionAnswered">
        <p v-cloak @click="hideAnswer(clue)">
          {{ clue.answer }}
        </p>
      </div>
    </div>

  </section>
</template>

<script>
import axios from 'axios'
export default {
  name: 'ClueBox',
  data () {
    return {
      categories: []
    }
  },
  computed: {
    uniqueClues: function () {
      // remove duplicate values
      var uClues =
       this.categories.clues.reduce((acc, current) => {
         const x = acc.find(item => item.value === current.value)
         if (!x) {
           return acc.concat([current])
         } else {
           return acc
         }
       }, [])
       // remove clues with empty values
      var filteredClues =
            uClues.filter(function (item) {
              return item.value !== 0 || item.value !== null || item.question !== '' || item.invalid_count !== 1
            })
      var slicedClues =
        filteredClues.slice(0, 5)
      return slicedClues
    }
  },
  mounted () {
    this.getCategories()
  },
  methods: {
    getCategories () {
      var self = this
      // category id's range from 1 to 18417
      var randomId = Math.round(Math.random() * 18417)
      const url = 'https://jservice.io//api/category.json'
      axios
        .get(url + '?id=' + randomId)
        .then(response => (self.categories = response.data))
        // .catch(error => {
        //   console.log(error)
        //   this.errored = true
        // })
      // .finally(() => this.loading = false)
    },
    showAnswer (clue) {
      clue.questionAnswered = true
    },
    hideAnswer (clue) {
      clue.questionAnswered = false
    }
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
