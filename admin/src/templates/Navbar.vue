<template>
<!-- Navbar -->
<nav class="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme" id="layout-navbar">

<div class="navbar-nav-right d-flex align-items-center" id="navbar-collapse">
  <ul class="navbar-nav flex-row align-items-center ms-auto">
    <!-- User -->
    <li class="nav-item navbar-dropdown dropdown-user dropdown">
      <a href="javascript:void(0)" @click.prevent="logout">Logout</a>    
    </li>
    <!--/ User -->
  </ul>
</div>
</nav>
<!-- / Navbar -->
</template>
<script>
export default {
  methods: {
    logout() {
      this.$user.doLogout();
      this.$storage.removeItem("data");
      window.location = import.meta.env.VITE_FRONT_BASE_URL;
    }
  }
}
</script>