<template>
  <div class="col-md-2 col-xl-2 col-sm-2 px-sm-2 px-0 collapse main-menu-collapse" id="nav-content">
    <div class="d-flex flex-column align-items-center align-items-sm-start pt-2 position-relative">
        <a href="/" class="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none px-3">
            <span class="fs-6 menu-header">Lobby</span>
        </a>
        <ul class="nav nav-pills flex-column mb-0 align-items-center align-items-sm-start" id="menu">
            <li class="nav-item">
              <router-link to="/">
                <span class="material-symbols-rounded menu-icon">home</span>
                <span class="ms-1  menu-link">Lobby</span>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link :to="{name: 'poker'}">
                <span class="material-symbols-rounded menu-icon">playing_cards</span>
                <span class="ms-1  menu-link">Play Poker</span>
              </router-link>
            </li>
            <li v-if="!$user.data.isGuest" class="nav-item">
              <router-link :to="{name: 'invitation'}">
                <span class="material-symbols-rounded menu-icon">share</span>
                <span class="ms-1  menu-link">Invite Your Friend!</span>
              </router-link>
            </li>
        </ul>
        <div class="sidebar-footer">
          <p>Help & support</p>
          <ul class="nav nav-pills flex-column mb-0 align-items-center align-items-sm-start" id="sidebar-footer-menu">
            <li class="nav-item">
              <router-link to="/terms" class="nav-link align-middle">
                <span class="material-symbols-outlined sidebar-footer-icon">workspace_premium</span>
                <span class="ms-1">Terms & policy</span>
              </router-link>
            </li>
            <li class="nav-item">
              <a href="#" class="nav-link align-middle">
                <span class="material-symbols-outlined sidebar-footer-icon">thumb_up</span>
                <span class="ms-1  ">Feedback</span>
              </a>
            </li>
            <li class="nav-item">
              <router-link to="/settings" class="nav-link align-middle">
                <span class="material-symbols-outlined sidebar-footer-icon">settings</span>
                <span class="ms-1">Settings</span>
              </router-link>
            </li>
          </ul>
          <div class="ms-2 mb-5 box">
            <div class="box-header">
              <i class="material-symbols-outlined float-start">currency_exchange</i>
              <span class="ms-2">Cashier</span>
              <i class="material-symbols-outlined float-end">keyboard_arrow_up</i>
            </div>
            <form class="mt-3">
              <div class="form-control" contenteditable="true" v-if="!$user.data.isGuest">
                <span class="material-symbols-outlined">
                monetization_on
                </span>
                {{$user.data.balance}}
              </div>
              <button v-if="$user.data.isGuest" type="button" class="btn btn-golden text-dark btn-block mt-3"            data-bs-toggle="modal" data-bs-target="#login">Cashier</button>
              <router-link to="/cashier" class="btn btn-golden text-dark btn-block mt-3" v-if="!$user.data.isGuest">Cashier</router-link>
            </form>
          </div>
        </div>
      </div>
  </div>
	<!--Main Navigation-->

</template>