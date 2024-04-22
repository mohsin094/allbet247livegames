<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import Loader from "./Loader.vue";

const email = ref("");
const password = ref("");
const loader = ref(false);
const errors = ref([]);
const router = useRouter();
// const baseUrl = import.meta.env.VITE_BASE_URL;

function doLogin() {
  loader.value = true;
  let url = import.meta.env.VITE_BACKEND_BASE_URL + "/user/auth/login";
  axios
    .post(url, {
      username: email.value,
      password: password.value,
    })
    .then((response) => {
      loader.value = false;
      const res = response.data;
      if (res.result) {
        let data = JSON.stringify(res.params);
        localStorage.setItem("data", data);
        location.href = "/dashboard";
        // router.push("/dashboard");
      } else {
        loader.value = false;
        errors.value = res.error;
      }
    });
}
</script>

<template>
  <Loader v-if="loader" />
  <div class="container-menu">
    <div class="container content-menu">
      <div @click="router.push('/')" class="logo">
        <img src="../../assets/logo.png" alt="log" />
      </div>
      <!-- mega menu -->
      <ul
        id="navmenu"
        class="poker-mega-menu poker-mega-menu-anim-scale poker-mega-menu-response-to-icons"
      >
        <li class="menu-first-li">
          <a class="link_onepage" href="#section-1"
            ><i class="fa fa-single fa-home"></i
          ></a>
          <!-- <div class="grid-container2">
            <ul>
              <li>
                <a href=""><i class="fa fa-globe"></i>Home Page 1</a>
              </li>
            </ul>
          </div> -->
        </li>
        <li>
          <a href="#texas"><i class="fa fa-eye"></i>Game</a>
          <div class="grid-container3">
            <ul>
              <li>
                <a class="link_onepage" href="#texas"
                  ><i class="fa fa-check"></i>Texas Hold 'em</a
                >
              </li>
              <li>
                <a class="link_onepage" href="#game"
                  ><i class="fa fa-check"></i>Other Games</a
                >
              </li>
            </ul>
          </div>
        </li>
        <li>
          <a class="link_onepage" href="#tournaments"
            ><i class="fa fa-briefcase"></i>Tournaments</a
          >
        </li>
        <li aria-haspopup="true">
          <a class="link_onepage" href="#section-3"
            ><i class="fa fa-star"></i>About us</a
          >
          <!-- <div cs -->
        </li>
        <!-- <li>
          <a class="link_onepage" href="#section-4"
            ><i class="fa fa-bullhorn"></i>Events</a
          >
        </li> -->
        <li>
          <a class="link_onepage" href="#section-6"
            ><i class="fa fa-single fa-envelope"></i
          ></a>
        </li>
        <li aria-haspopup="true" class="right ps-5">
          <a href="#"><i class="fa fa-lock"></i>Register</a>
          <div class="grid-container5">
            <form action="#">
              <fieldset>
                <section>
                  <label class="input"
                    ><i class="fa fa-append fa-envelope-o"></i
                    ><input type="text" placeholder="Email address"
                  /></label>
                </section>
                <div class="row">
                  <section class="col col-6">
                    <label class="input"
                      ><i class="fa fa-append fa-user"></i
                      ><input type="text" placeholder="First Name"
                    /></label>
                  </section>
                  <section class="col col-6">
                    <label class="input"
                      ><i class="fa fa-append fa-user"></i
                      ><input type="text" placeholder="Last Name"
                    /></label>
                  </section>
                </div>
                <section>
                  <label class="input"
                    ><i class="fa fa-append fa-lock"></i
                    ><input type="password" placeholder="Password"
                  /></label>
                </section>
                <section>
                  <label class="input"
                    ><i class="fa fa-append fa-lock"></i
                    ><input type="password" placeholder="Confirm password"
                  /></label>
                </section>
                <button type="submit" class="button">Register</button>
              </fieldset>
            </form>
          </div>
        </li>
        <li aria-haspopup="true" class="right last">
          <a href="#"><i class="fa fa-sign-in"></i>Login</a>
          <div class="grid-container4">
            <form @submit.prevent="doLogin">
              <fieldset>
                <div>
                  <ul>
                    <li v-for="error in errors">
                      <span class="text-danger">
                        <b>{{ error[0] }}</b>
                      </span>
                    </li>
                  </ul>
                </div>
                <section>
                  <label class="input"
                    ><i class="fa fa-append fa-user"></i
                    ><input v-model="email" type="email" placeholder="Email"
                  /></label>
                </section>
                <section>
                  <label class="input"
                    ><i class="fa fa-append fa-lock"></i
                    ><input
                      v-model="password"
                      type="password"
                      placeholder="Password"
                  /></label>
                </section>
                <button class="button">Login</button>
              </fieldset>
            </form>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
@import url(../../assets/home/css/layout1_style.css);
@import url(../../assets/home/css/menu.css);
@import url(../../assets/home/css/layout2_style.css);
@import url(../../assets/home/css/font-awesome-4.0.1/css/font-awesome.min.css);
::placeholder {
  color: black !important;
}
</style>
