<template>
  <div id="app">
    <SelectGame  v-on:login="addUser" v-on:create-game="createGame" v-on:join-game="joinGame" />
    <hr />
    <GameBoard :user="user" v-if="activeGame" :gameId="activeGame" />
  </div>
</template>

<script>
import { database } from 'firebase'
import uuid from 'uuid'
import board from './board'
import GameBoard from '@/components/GameBoard'
// import Login from "@/components/Login";
import SelectGame from '@/components/SelectGame'

export default {
  name: 'App',
  components: { GameBoard, SelectGame },
  data: () => ({
    user: null,
    allUsers: [],
    activeGame: null
  }),
  methods: {
    addUser (name) {
      const userObject = this.allUsers.find(u => u.name === name)

      if (userObject) {
        this.user = userObject
        return
      }

      const newUser = { name, games: [] }

      database()
        .ref('users')
        .set([...this.allUsers, newUser])

      this.user = newUser
    },
    createGame (name) {
      const id = uuid()
      const newGame = { creator: this.user.name, name, id, board }
      database()
        .ref(`/games/${id}`)
        .set(newGame)
      this.activeGame = id
    },
    joinGame (id) {
      this.activeGame = id
    }
  },
  created () {
    database()
      .ref('users')
      .on('value', snapshot => {
        if (snapshot.val()) {
          this.allUsers = snapshot.val()
        }
      })
  }
}
</script>

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
