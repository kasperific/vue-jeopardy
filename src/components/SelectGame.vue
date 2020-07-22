<template>
  <div>
    <!-- Do you have a group to play with?  Yes  No -->
    <!-- If yes, Do you want to be Alex, or a contestant?  -->
    <input type="radio" v-model="playerType" v-bind:value="alex" placeholder="Join as Alex">
    <input type="radio" v-model="playerType" v-bind:value="player" placeholder="Join as a contestant">
      <p>Join as Alex to create a new game. You'll then share a game id with the friends you want to play with.</p>
      <p>You'll need a game id to play! Play as Alex if you don't have a game id yet. If you'd rather play the game, and don't have an id, enlist a friend to start a game as Alex!</p>
    <section v-if="alex" v-cloak>
      <p>Create a Game</p>
      <input v-model="gameName" />
      <button v-on:click="$emit('create-game', gameName)">Create Game</button>
    </section>
    <section v-if="player" v-cloak>
      <h1>Join a Game</h1>
      <input v-model="playerName" />
      <input v-model="gameId" placeholder="Enter an existing game id" />
      <button v-on:click="login">Join</button>
    </section>
    <!-- If no, send to demo -->
  </div>
</template>

<script>
export default {
  data: () => ({
    playerName: '',
    gameName: '',
    gameId: '',
    alex: false,
    player: false
  }),
  methods: {
    login () {
      if (this.playerName) {
        this.$emit('login', this.playerName)
      }
      this.$emit('join-game', this.gameId)
    }
  }
}
</script>

<style scoped>
div {
  display: flex;
}

p {
  margin: 4px;
}

section {
  padding: 16px;
  background-color: whitesmoke;
  margin: 16px;
}
</style>
