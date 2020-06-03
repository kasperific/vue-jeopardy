<template>

    <div class="clue-container">
      <div class="clue-value" v-if="clue.nothingVisible === false" @click="showModal(clue)">
        <p>
          ${{ clue.value }}
        </p>
      </div>
      <modal v-show="clue.isModalVisible" @close="closeModal">
        <div class="clue-content" @click="showAnswer(clue)" v-if="clue.questionVisible === true && clue.answerVisible === false">
          <p class="clue-content">
            {{ clue.question }}
          </p>
        </div>
        <div class="clue-content" v-if="clue.answerVisible === true && clue.nothingVisible === false" @click="closeModal(clue)">
          <p v-cloak>
            {{ clue.answer }}
          </p>
        </div>
      </modal>

      <div class="clue-content" v-if="clue.nothingVisible === true"></div>
    </div>

</template>

<script>
import Modal from '@/components/Modal'

export default {
  name: 'ClueBox',
  components: {
    Modal
  },
  props: [
    'clue'
  ],

  methods: {
    showAnswer (clue) {
      clue.answerVisible = true
      this.$forceUpdate()
    },
    showModal (clue) {
      clue.isModalVisible = true
      clue.questionVisible = true
      this.$forceUpdate()
    },
    closeModal (clue) {
      clue.isModalVisible = false
      clue.nothingVisible = true
      this.$forceUpdate()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.clue-container {
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
}
.clue-value {
  font-weight: 900;
  color: #d69f4c;
  font-size: 3rem;
  text-shadow: 7px 7px 2px rgb(3, 3, 3);
  cursor: pointer;
}
.clue-content {
  font-family: 'Libre Baskerville', serif;
  font-weight: 700;
  font-size: 4rem;
  text-transform: uppercase;
  text-shadow: 3px 3px 2px rgb(3, 3, 3);
  cursor: pointer;
}
</style>
