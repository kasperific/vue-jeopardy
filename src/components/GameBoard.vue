<template>
  <div>
    <section>
      <p>Your friend can use the following id to join the game!</p>
      <code>{{ gameId }}</code>
    </section>
    <section v-if="game" class="board">
        <CategoryBox />
        <CategoryBox />
        <CategoryBox />
        <CategoryBox />
        <CategoryBox />
        <CategoryBox />
    </section>
  </div>
</template>

<script>
import { database } from 'firebase'

export default {
  props: ['gameId', 'playerName'],
  data: () => ({
    game: null
  }),
  methods: {
    updateTile () {
      const newGame = { ...this.game }

      newGame.board
      // .find(row => row.id === rowId)
      // .tiles.find(tile => tile.pos === pos).value = this.unit

      database()
        .ref(`/games/${this.gameId}`)
        .set(newGame)
    }
  },
  // Lifecycle hook, runs right after injection.
  created () {
    database()
      .ref(`/games/${this.gameId}`)
      .on('value', snapshot => {
        this.game = snapshot.val()
      })
  }
}
</script>
