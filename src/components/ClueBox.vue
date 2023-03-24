<template>

    <div class="clue-container">
      <div class="clue-value" v-if="clue.nothingVisible === false" @click="showModal(clue)">
        <p>
          ${{ clue.value }}
        </p>
      </div>
      <modal v-show="clue.isModalVisible" @close="closeModal">
        <div class="clue-content" v-if="clue.questionVisible === true && clue.answerVisible === false">
          <p class="clue-content" v-html="clue.question"></p>
          <Button @wasClicked="showAnswer(clue)">Reveal answer</Button>
        </div>
        <div class="clue-content" v-if="clue.answerVisible === true && clue.nothingVisible === false">
          <p v-cloak v-html="clue.answer"></p>
          <Button @wasClicked="closeModal(clue)">Return to board</Button>
        </div>
      </modal>

      <div class="clue-content" v-if="clue.nothingVisible === true"></div>
    </div>

</template>

<script>
import Modal from './Modal.vue'
import Button from './Button.vue'

export default {
  name: 'ClueBox',
  components: {
    Modal, 
    Button
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
  height: 100%;
}
.clue-value {
  font-weight: 900;
  color: #d69f4c;
  font-size: 3rem;
  text-shadow: 3px 3px 0px rgb(3, 3, 3);
  cursor: pointer;
}
.clue-content {
  font-family: 'ITC Korinna', serif;
  font-size: 4rem;
  text-transform: uppercase;
  letter-spacing: .05em;
  text-shadow: 3px 3px 0px rgb(3, 3, 3);
}
</style>
