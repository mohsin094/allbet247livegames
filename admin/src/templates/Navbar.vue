<template>
<!-- Navbar -->
<nav class="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme" id="layout-navbar">
<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#layout-menu" aria-controls="layout-menu" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

<div class="navbar-nav-right d-flex align-items-center" id="navbar-collapse">
  <ul class="navbar-nav flex-row align-items-center ms-auto">
    <!-- User -->
    <li class="nav-item" style="margin-right: 10px;">
      <a href="javascript:void(0)" @click.prevent="backToSite">Back To Website</a>    
    </li>
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
    },
    backToSite() {
      window.location = import.meta.env.VITE_FRONT_BASE_URL;
    }
  }
}
</script>