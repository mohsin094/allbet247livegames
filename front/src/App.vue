<script setup>
  import { RouterLink, RouterView } from 'vue-router'
</script>
<template>
  <Header/>
  <BackgammonHeader/>
  <Auth/>
  <div class="container-fluid">
    <div class="row flex-nowrap">
        <!-- <Sidebar/> -->
        <div>
            <RouterView />
         </div>
    </div>
  </div>
 
</template>
<script>
  import Header from '@/components/Header.vue';
  // import Sidebar from '@/components/Sidebar.vue';
  import Auth from '@/components/Auth.vue';
  import BackgammonHeader from '@/components/BackgammonHeader.vue';
  import io from "socket.io-client"
  export default {
    components: {
        Header,
        // Sidebar,
        BackgammonHeader
      },
      data() {
        return {
          socket: undefined
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
