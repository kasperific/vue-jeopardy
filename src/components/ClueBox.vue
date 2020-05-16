<template>
<!-- <section v-if="errored">
    <p>Oh dear. That's not good.</p>
  </section>

  <section v-else> -->
  <section v-cloak>
    <h1>{{ categories.title }}</h1>
    <div class="box" v-for="clue in uniqueClues" :key="clue.id">
      <p >
        {{ clue.value }}
      </p>
      <p @click="showAnswer(clue)">
        {{ clue.question }}
      </p>
      <div v-if="clue.questionAnswered">
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
      categories: [],
      questionAnswered: false
    }
  },
  computed: {
    uniqueClues: function () {
      var self = this
      // The date of clue value increase due to inflation was Nov 26, 2001. All clue values before that should be doubled.
      self.categories.clues.map(function (clue) {
        var increaseDate = new Date('2001-11-26T12:00:00.000Z')
        var airdate = new Date(clue.airdate)
        if (airdate < increaseDate) {
          clue.value = clue.value * 2
        } else {
          return clue.value
        }
      })
      // remove duplicate values
      var uClues =
       self.categories.clues.reduce((acc, current) => {
         const x = acc.find(item => item.value === current.value)
         if (!x) {
           return acc.concat([current])
         } else {
           return acc
         }
       }, [])
       // remove clues with empty or invalid values
      var filteredClues =
            uClues
              .filter(item => item.value !== null)
              .filter(item => item.value !== 0)
              .filter(item => item.question !== '')
              .filter(item => item.invalid_count !== 1)
      // sort by value, least to highest
      var sortedClues =
            filteredClues
              .sort((a, b) => a.value - b.value)

      return sortedClues
    }
  },
  created () {
    this.getCategories()
  },
  beforeUpdate () {
    if (this.uniqueClues.length !== 5) {
      this.getCategories()
    }
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
