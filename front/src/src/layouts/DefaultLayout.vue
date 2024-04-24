<template>
  <Header />
  <Auth />
  <div class="container-fluid">
    <div class="row">
      <Sidebar v-if="!this.isMobile" />
      <div
        class="col-md-10 col-xl-10 px-sm-2 px-0"
        :style="this.isMobile ? 'padding-top:120px;width:100%' : ''"
      >
        <div class="main-wrapper">
          <RouterView />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Sidebar from "@/components/Sidebar.vue";
import Header from "@/components/Header.vue";
import Auth from "@/components/Auth.vue";

export default {
  components: {
    Sidebar,
    Header,
    Auth,
  },
  mounted() {
    const callerId = this.$route.query.callerId;
    if (callerId != undefined) {
      let data = JSON.stringify({
        callerId: callerId,
      });
      this.$storage.setItem("callerId", data);
    }

    let isloginUrl =
      import.meta.env.VITE_BACKEND_BASE_URL + "/user/auth/is-login";
    const instance = this;
    setInterval(function () {
      instance.$axios.get(isloginUrl).then(function (res) {
        res = res.data;
        if (res.result) {
          instance.$user.update(res.params);
        } else {
          instance.$user.doLogout();
        }
      });
    }, 3000);
  },
};
</script>
