<template>
<header id="main-header">
	<nav class="navbar navbar-dark bg-dark mb-2 fixed-top p-2">
		<div class="container-fluid">
		    <router-link to="/" class="navbar-brand">
		      <img src="@/assets/logo.svg" class="d-inline-block align-top" alt="">
		    </router-link>
		    <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar">
		      <span class="navbar-toggler-icon"></span>
		    </button>
		    <div class="offcanvas offcanvas-start text-bg-dark" tabindex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
			    <div class="offcanvas-header">
			      	<router-link to="/" class="navbar-brand">
				        <img src="@/assets/logo.svg" class="d-inline-block align-top" alt="" data-bs-dismiss="offcanvas">
				    </router-link>
			        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
			    </div>
			    <div class="offcanvas-body">
			    	<div v-if="!$user.data.isGuest">
		            <div class="position-relative">
						<div class="row">
							<div class="col-6 float-start">
								<div class="border-golden card-profile card-profile-left">
									<img class="avatar" :src="'/assets/images/avatars/'+$user.data.avatar+'.png'"/>
								</div>
								<span class="position-absolute mobHeader-profile-name">{{$user.data.publicName}}</span>
								<span class="position-absolute mobHeader-user-level">LVL.12</span>
							</div>
							<div class="col-6 float-end text-end header-box mobHeader-box">
				            	<i class="material-symbols-rounded">
				              	monetization_on
				            	</i>
				            	<span>{{$user.data.param}}</span>
				            	<i class="material-symbols-rounded">
					              add_box
					            </i>
				            </div>
						</div>
						<hr class="hr-text">
					</div>
		    		<form class="form-inline search-form mt-2">
				        <div class="input-group">
					        <div class="input-group-prepend">
					            <span class="input-group-text" id="addon">
					              <i class="material-symbols-rounded">search</i>
					            </span>
					        </div>
				          <input type="text" id="search-input" class="form-control" placeholder="Enter Player Name-ID" aria-describedby="addon">
				        </div>
				    </form>
				    <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
			          	<li class="nav-item">
				          <router-link to="/" @click="hideThisCanvas()" aria-controls="offcanvasExample">
					          <span class="material-symbols-rounded menu-icon">home</span>
					          <span class="ms-1  menu-link">Lobby</span>
				          </router-link>
			          	</li>
			          	<li class="nav-item">
			          		<router-link @click="hideThisCanvas()" to="/notifications" class="position-relative">
				            	<span class="material-symbols-rounded menu-icon">
				              		notifications
				            	</span>
				            	<span class="ms-1  menu-link">Announcements</span>
				            	<span v-if="announcements > 0" class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-light-gray">
									{{announcements}}
								    <span class="visually-hidden">unread messages</span>
								</span>
				            </router-link>
			          	</li>
			          	<li class="nav-item">
				          <router-link to="/ticket" @click="hideThisCanvas()" aria-controls="offcanvasExample">
					          <span class="material-symbols-rounded menu-icon">mail</span>
					          <span class="ms-1  menu-link">Ticket</span>
				          </router-link>
			          	</li>
			        </ul>
			    </div>
				    <ul v-else class="navbar-nav justify-content-end flex-grow-1 pe-3">
				        <li class="nav-item">
					        <a href="#" @click="hideThisCanvas()" data-bs-toggle="modal" data-bs-target="#login">
								<span class="material-symbols-rounded menu-icon">
									login
								</span>
								<span class="ms-1  menu-link">Login</span>
							</a>
				        </li>
				        <li class="nav-item">
					        <a href="#" @click="hideThisCanvas()" data-bs-toggle="modal" data-bs-target="#signup">
								<span class="material-symbols-rounded menu-icon">
									app_registration
								</span>
								<span class="ms-1  menu-link">Register</span>
							</a>
				        </li>
				    	<li class="nav-item">
					    	<router-link to="/" data-bs-toggle="offcanvas" aria-controls="offcanvasExample">
					            <span class="material-symbols-outlined menu-icon">smart_toy</span>
					            <span class="ms-1  menu-link">Chat</span>
					        </router-link>
				        </li>
				    </ul> 
		            <div class="sidebar-footer mt-4">
		            	<p>Help & support</p>
			            <ul class="nav nav-pills flex-column mb-0 align-items-center align-items-sm-start" id="sidebar-footer-menu">
			                <li class="nav-item">
			                    <router-link @click="hideThisCanvas()" to="/terms" class="nav-link align-middle" aria-controls="offcanvasDarkNavbar">
			                      <span class="material-symbols-outlined sidebar-footer-icon">workspace_premium</span>
			                      <span class="ms-1">Terms & policy</span>
			                    </router-link>
			                </li>
			                <li class="nav-item">
			                    <a href="#" @click="hideThisCanvas()" class="nav-link align-middle" data-bs-dismiss="offcanvas">
			                      <span class="material-symbols-outlined sidebar-footer-icon">thumb_up</span>
			                      <span class="ms-1  ">Feedback</span>
			                    </a>
			                </li>
			                <li class="nav-item">
			                    <router-link @click="hideThisCanvas()" to="/settings" class="nav-link align-middle" data-bs-dismiss="offcanvas">
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
			                    <!-- <span class="material-symbols-outlined">attach_money</span> -->
			                    <span class="material-symbols-outlined">
								monetization_on
								</span>
			                    {{$user.data.balance}}
			                  </div>
			                  <button v-if="$user.data.isGuest" @click="hideThisCanvas()" type="button" class="btn btn-golden text-dark btn-block mt-3" data-bs-toggle="modal" data-bs-target="#login">Cashier</button>
			                  <router-link @click="hideThisCanvas()" to="/cashier" class="btn btn-golden text-dark btn-block mt-3" v-if="!$user.data.isGuest">Cashier
			                  </router-link>
			                </form>
			            </div>
		            </div>
			   	</div>
			</div>
		</div>
	</nav>
</header>
</template>
<script>
	import { Offcanvas } from 'bootstrap';
	export default{
		props:['announcements'],
		mounted(){
			// console.log(this.announcements)
		},
		methods:{
			hideThisCanvas(){
			    let myOffcanvas = document.getElementById('offcanvasDarkNavbar')
			    let bsOffcanvas = Offcanvas.getInstance(myOffcanvas);
			    bsOffcanvas.hide();
  			}
		}
	}
</script>