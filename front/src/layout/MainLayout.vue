<template>
  <Header/>
  <Auth/>
  <div class="row">
    <Sidebar v-if="!this.isMobile"/>
    <div class="col-md-10 col-xl-10 px-sm-2 px-0" :style="this.isMobile ? 'padding-top:120px' : ''">
      <div class="main-wrapper min-vh-100">
          <RouterView />
      </div>
    </div>
  </div>
</template>
<script>
  import Sidebar from '@/components/Sidebar.vue';
  import Header from '@/components/Header.vue';
  export default{
    components:{
      Sidebar,
      Header
    }
  }
</script>