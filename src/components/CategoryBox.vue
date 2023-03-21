<template>

  <section>
    <h1>{{ categories.title }}</h1>
    <div class="clue" v-for="clue in uniqueClues" :clue="clue" :key="clue.id">
      <ClueBox :clue="clue" />
    </div>

  </section>
</template>

<script>
import axios from 'axios'
import ClueBox from './ClueBox.vue'
export default {
  name: 'CategoryBox',
  components: {
    ClueBox
  },
  data: () => ({
      clue: {},
      categories: []
  }),
  computed: {
    uniqueClues: function () {
      // The date of clue value increase due to inflation was Nov 26, 2001. All clue values before that should be doubled.
      this.categories?.clues?.map(function (clue) {
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
       this.categories?.clues?.reduce((acc, current) => {
         const x = acc.find(item => item.value === current.value)
         if (!x) {
           return acc.concat([current])
         } else {
           return acc
         }
       }, [])
       // remove clues with empty or invalid values
      var filteredClues =
            uClues?.filter(item => item.value !== null)
              .filter(item => item.value !== 0)
              .filter(item => item.question !== '')
              .filter(item => item.invalid_count !== 1)
      // sort by value, least to highest
      var sortedClues =
            filteredClues?.sort((a, b) => a.value - b.value)
      var addVisible =
            sortedClues?.map(item => ({ ...item, answerVisible: false, questionVisible: false, nothingVisible: false, isModalVisible: false }))
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
      // category id's range from 1 to 28163
      var randomId = Math.round(Math.random() * 28163)
      // todo: to get new clues, increment top # by 1 each week when new episodes air (btw start and end dates of new broadcasts)
      const url = 'https://jservice.io/api/category.json'
      axios
        .get(url + '?id=' + randomId)
        .then(response => (self.categories = response.data))
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
section {
  display: grid;
  grid-template-rows: repeat(6, 1fr);
  grid-row-gap: 5px;
  background: black;
}
h1 {
  background: #031174;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
  text-transform: uppercase;
  margin: 0;
  margin-bottom: 10px;
  padding: 1rem;
  text-shadow: 2px 2px 1px rgb(3, 3, 3);
}
.clue {
  background: #031174;
}
</style>
