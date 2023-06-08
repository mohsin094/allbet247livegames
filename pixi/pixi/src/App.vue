<script setup>
import HelloWorld from './components/HelloWorld.vue'
import TheWelcome from './components/TheWelcome.vue'
</script>

<template>
  <header>
  </header>

  <main>
    <div id="pixi" v-once>

    </div>
  </main>
</template>

<script>
  import Game from "@backgammon/Game";

  export default {
    data() {
      return {
        msg: 'click',
      }
    },
    methods: {
      click() {
        this.msg += '2';
        console.log('clicked');
      }
    },
    mounted() {
        const g = new Game(this, undefined);
        g.init();
    }
  }
</script>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
