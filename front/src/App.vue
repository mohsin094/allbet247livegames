<script setup>
  import { RouterLink, RouterView } from 'vue-router'
</script>
<template>
  <Auth/>
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
  import MainLayout from '@/layout/MainLayout.vue';
  import GameLayout from '@/layout/GameLayout.vue';
  // import Sidebar from '@/components/Sidebar.vue';
  import Auth from '@/components/Auth.vue';
  
  import io from "socket.io-client"
  
  export default {
    components: {
        // Sidebar,
        MainLayout,
        GameLayout
      },
      data() {
        return {
          layout:null,
          socket: undefined
        }
      },
      watch: {
        $route(to) {
          // set layout by route meta
          if (to.meta.layout !== undefined) {
            this.layout = to.meta.layout
          } else {
            this.layout = "MainLayout" // this is default layout if route meta is not set
          }
        }
        },
      created(){
        if(this.$storage.getItem("data") != null){
          let data = JSON.parse(this.$storage.getItem("data"));
          this.$user.doLogin(data)
        }
      }
  };
</script>
<style>

</style>
