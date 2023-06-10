<script setup>
import HelloWorld from './components/HelloWorld.vue'
import TheWelcome from './components/TheWelcome.vue'
</script>

<template>

    <game></game>


</template>

<script>
  import Game from "./components/game/Game.vue";

  export default {
    components: {
      Game
    },
    data() {
      return {
        msg: 'click',
        game: undefined
      }
    },
    methods: {
      move() {
        this.game.move();
      }
    },
    mounted() {
 
    }
  }
</script>

<style scoped>
  #app {
    width: 100%;
  }
</style>
