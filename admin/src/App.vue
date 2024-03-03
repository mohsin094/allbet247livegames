<template>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Public+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap" rel="stylesheet">
  <div class="light-style layout-navbar-fixed layout-menu-fixed layout-compact">

    <!-- notification section -->
    <div v-show="$notif.data.show" style="z-index: 10000;" :class="$notif.data.class" class="alert alert-dismissible" role="alert">
      {{$notif.data.text}}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
    <!-- Layout wrapper -->
    <div class="layout-wrapper layout-content-navbar">
      <div class="layout-container">
        <Menu />
        <!-- Layout container -->
        <div class="layout-page">
          <Navbar />
          <!-- Content wrapper -->
          <div class="content-wrapper">
            <!-- Content -->
            <div class="container-xxl flex-grow-1 container-p-y">
              <RouterView />
            </div>
            <!-- / Content -->
            <!-- <Footer /> -->
            <div class="content-backdrop fade"></div>
          </div>
          <!-- Content wrapper -->
        </div>
        <!-- / Layout page -->
      </div>
      <!-- Overlay -->
      <div class="layout-overlay layout-menu-toggle"></div>
      <!-- Drag Target Area To SlideIn Menu On Small Screens -->
      <div class="drag-target"></div>
    </div>
    <!-- / Layout wrapper -->
  </div>
</template>
<script>
import "./assets/vendor/fonts/tabler-icons.css";
import "./assets/vendor/css/rtl/core.css";
import "./assets/vendor/css/rtl/theme-default.css";
import "./assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.css";
import "./assets/vendor/libs/bootstrap-datepicker/bootstrap-datepicker.css";
import "./assets/css/demo.css";
import "./assets/vendor/js/helpers.js";
import "./assets/css/custom.css";
// import "./assets/vendor/js/template-customizer.js";
// import "./assets/js/config.js";
import "./assets/vendor/libs/jquery/jquery.js";
import "./assets/vendor/libs/popper/popper.js";
import "./assets/vendor/js/bootstrap.js";
import "./assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.js";
import "./assets/vendor/libs/bootstrap-datepicker/bootstrap-datepicker.js";
import "./assets/vendor/libs/hammer/hammer.js";
import "./assets/vendor/js/menu.js";

import
{
  RouterLink,
  RouterView
}
from 'vue-router';

import Menu from './templates/Menu.vue';
import Footer from './templates/Footer.vue';
import Navbar from './templates/Navbar.vue';
export default
{
  components: {
    Menu,
    Footer,
    Navbar
  },
  created()
  {
    if(this.$storage.getItem("data") != null)
    {
      let data = JSON.parse(this.$storage.getItem("data"));
      this.$user.doLogin(data);
      console.log(this.$user.data);
      console.log(data);
    }
  }
}
</script>