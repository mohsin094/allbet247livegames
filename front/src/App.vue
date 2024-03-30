<template>
  <!-- <Auth /> -->
  <component :is="layout" />
  <!-- <RouterView /> -->
  <!-- <div class="container-fluid">
    <div class="row flex-nowrap">
        <Sidebar/>
        <div>
            
         </div>
    </div>
  </div> -->
</template>
<script>
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import AppLayout from "@/layouts/AppLayout.vue";
import HomeLayout from "./layouts/HomeLayout.vue";

export default {
  components: {
    DefaultLayout,
    AppLayout,
    HomeLayout,
  },
  data() {
    return {
      layout: null,
      socket: undefined,
    };
  },
  watch: {
    $route(to) {
      // set layout by route meta
      if (to.meta.layout !== undefined) {
        this.layout = to.meta.layout;
      } else {
        this.layout = "DefaultLayout"; // this is default layout if route meta is not set
      }
    },
  },
  created() {
    if (this.$storage.getItem("data") != null) {
      let data = JSON.parse(this.$storage.getItem("data"));
      this.$user.doLogin(data);
    }
  },
};
</script>
<style></style>
