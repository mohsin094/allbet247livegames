<script setup>
  import { RouterLink, RouterView } from 'vue-router'
</script>
<template>
  <Header/>
  <BackgammonHeader/>
  <Auth/>
  <div class="container-fluid">
    <div class="row flex-nowrap">
        <Sidebar/>
        <div class="col-md-10 col-xl-10 px-sm-2 px-0">
          <div class="main-wrapper min-vh-100">
            <RouterView />
          </div>
         </div>
         <div class="col-md-2 col-xl-2 col-sm-2 min-vh-100" id="chat-box" style="display:none">
        <!-- <div class="d-flex flex-column align-items-center align-items-sm-start pt-2">
        </div> -->
    </div>

    </div>
</div>
 
</template>
<script>
  import Header from '@/components/Header.vue';
  import Sidebar from '@/components/Sidebar.vue';
  import Auth from '@/components/Auth.vue';
  import BackgammonHeader from '@/components/BackgammonHeader.vue';
  export default {
    components: {
        Header,
        Sidebar,
        BackgammonHeader
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
