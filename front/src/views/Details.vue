<script setup>
import { useRoute } from "vue-router";
import { data } from "../data/data";
import { onMounted } from "vue";
const route = useRoute();

function scrollBehavior() {
  window.scroll({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
}

onMounted(() => {
  scrollBehavior();
});
</script>

<template>
  <div class="programroulette">
    <div class="container">
      <div v-html="data[route.params.title]"></div>
    </div>
  </div>
</template>

<style scoped>
@import url(/src/assets/home/css/layout1_style.css);
@import url(/src/assets/home/css/base_style.css);
/* p {
  color: #0a0a0a;
  margin-top: 5px;
  margin-right: 0in;
  margin-bottom: 18.75pt;
  margin-left: 0in;
  line-height: 116%;
  font-size: 16px;
  font-family: "Aptos", sans-serif;
  background: white;
} */
</style>
