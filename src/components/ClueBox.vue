<template>
<!-- <section v-if="errored">
    <p>Oh dear. That's not good.</p>
  </section>

  <section v-else> -->
  <section v-cloak>
    <h1 class="clue">{{ categories.title }}</h1>

    <div class="clue" v-for="clue in uniqueClues" :key="clue.id">
      <div class="clue-value" @click="showQuestion(clue)" v-if="clue.questionVisible === false">
        <p>
          ${{ clue.value }}
        </p>
      </div>
      <div class="clue-value" @click="showAnswer(clue)" v-if="clue.questionVisible === true && clue.answerVisible === false">
        <p class="clue-content" >
          {{ clue.question }}
        </p>
      </div>
      <div class="clue-content" v-if="clue.answerVisible === true && clue.nothingVisible === false">
        <p v-cloak @click="hideEverything(clue)">
          {{ clue.answer }}
        </p>
      </div>
      <div class="clue-content" v-if="clue.nothingVisible === true"></div>
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
      // The date of clue value increase due to inflation was Nov 26, 2001. All clue values before that should be doubled.
      this.categories.clues.map(function (clue) {
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
       this.categories.clues.reduce((acc, current) => {
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
      var addVisible =
            sortedClues.map(item => ({ ...item, answerVisible: false, questionVisible: false, nothingVisible: false }))
      return addVisible
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
      clue.answerVisible = true
      this.$forceUpdate()
    },
    hideAnswer (clue) {
      clue.answerVisible = false
      this.$forceUpdate()
    },
    showQuestion (clue) {
      clue.questionVisible = true
      this.$forceUpdate()
    },
    hideQuestion (clue) {
      clue.questionVisible = false
      this.$forceUpdate()
    },
    hideEverything (clue) {
      clue.nothingVisible = true
      this.$forceUpdate()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  font-family: Helvetica, sans-serif;
  text-transform: uppercase;
  background: blue;
  margin: 0;
  margin-bottom: 10px;
  padding: 1rem;
  text-shadow: 2px 2px 1px rgb(3, 3, 3);
}
section {
  display: grid;
  grid-template-rows: repeat(6, 1fr);
  grid-row-gap: 5px;
  background: black;
}
.clue {
  background: blue;
  display: flex;
  justify-content: center;
  align-items: center;
}
.clue-value {
  font-weight: 900;
  color: yellow;
  font-size: 3rem;
  text-shadow: 3px 3px 2px rgb(3, 3, 3);
}
.clue-content {
  font-family: 'Libre Baskerville', serif;
  font-weight: 700;
  text-transform: uppercase;
  text-shadow: 3px 3px 2px rgb(3, 3, 3);
}
</style>
