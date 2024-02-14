<template>
<header id="main-header">
	<nav class="navbar navbar-dark bg-dark mb-2 fixed-top p-2">
		<div class="container-fluid">
		    <a @click="$router.push({path:'/'}); hideThisCanvas()" class="navbar-brand">
		      <img src="@/assets/logo.png" class="d-inline-block align-top" alt="">
		    </a>
		    <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar">
		      <span class="navbar-toggler-icon"></span>
		    </button>
		    <div class="offcanvas offcanvas-start text-bg-dark" tabindex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
			    <div class="offcanvas-header">
			      	<a @click="$router.push({path:'/'}); hideThisCanvas()" class="navbar-brand">
				        <img src="@/assets/logo.png" class="d-inline-block align-top" alt="" data-bs-dismiss="offcanvas">
				    </a>
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
								<span class="position-absolute mobHeader-profile-name mobHeader-profile-name-left">{{$user.data.publicName}}</span>
								<span class="position-absolute mobHeader-user-level mobUser-level-left">LVL.{{$user.data.lvl}}</span>
							</div>
							<div class="col-6 float-end text-end header-box mobHeader-box">
				            	<i class="material-symbols-rounded">
				              	monetization_on
				            	</i>
				            	<span>{{$user.data.balance}}</span>
				            	<i class="material-symbols-rounded">
					              add_box
					            </i>
				            </div>
						</div>
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
				    	<li v-if="$user.data.role == 'admin' || $user.data.role == 'agent'" class="nav-item">
				        	<a @click="redirectAdmin"  aria-controls="offcanvasExample">
					          <span class="material-symbols-rounded menu-icon">admin_panel_settings</span>
					          <span class="ms-1  menu-link">Admin panel</span>
				          	</a>
				        </li>
			          	<li class="nav-item">
				          <a @click="$router.push({path:'/'}); hideThisCanvas()"  aria-controls="offcanvasExample">
					          <span class="material-symbols-rounded menu-icon">home</span>
					          <span class="ms-1  menu-link">Lobby</span>
				          </a>
			          	</li>
			          	<li class="nav-item">
			          		<a @click="$router.push({path:'/notifications'}); hideThisCanvas()"  class="position-relative">
				            	<span class="material-symbols-rounded menu-icon">
				              		notifications
				            	</span>
				            	<span class="ms-1  menu-link">Announcements</span>
				            	<span v-if="announcements > 0" class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-light-gray">
									{{announcements}}
								    <span class="visually-hidden">unread messages</span>
								</span>
				            </a>
			          	</li>
			          	<li class="nav-item">
				          <a @click="$router.push({path:'/ticket'})"  aria-controls="offcanvasExample">
					          <span class="material-symbols-rounded menu-icon">mail</span>
					          <span class="ms-1  menu-link">Ticket</span>
				          </a>
			          	</li>
			        </ul>
			    </div>
				    <ul v-else class="navbar-nav justify-content-end flex-grow-1 pe-3">
				        <li class="nav-item">
					        <a href="#"  data-bs-toggle="modal" data-bs-target="#login">
								<span class="material-symbols-rounded menu-icon">
									login
								</span>
								<span class="ms-1  menu-link">Login</span>
							</a>
				        </li>
				        <li class="nav-item">
					        <a href="#"  data-bs-toggle="modal" data-bs-target="#signup">
								<span class="material-symbols-rounded menu-icon">
									app_registration
								</span>
								<span class="ms-1  menu-link">Register</span>
							</a>
				        </li>
				    	<li class="nav-item">
					    	<a @click="$router.push({path:'/'}); hideThisCanvas()" data-bs-toggle="offcanvas" aria-controls="offcanvasExample">
					            <span class="material-symbols-outlined menu-icon">smart_toy</span>
					            <span class="ms-1  menu-link">Chat</span>
					        </a>
				        </li>
				    </ul> 
		            <div class="sidebar-footer mt-4">
		            	<p>Help & support</p>
			            <ul class="nav nav-pills flex-column mb-0 align-items-center align-items-sm-start" id="sidebar-footer-menu">
			                <li class="nav-item">
			                    <a @click="$router.push({path:'/terms'}); hideThisCanvas()"  class="nav-link align-middle" aria-controls="offcanvasDarkNavbar">
			                      <span class="material-symbols-outlined sidebar-footer-icon">workspace_premium</span>
			                      <span class="ms-1">Terms & policy</span>
			                    </a>
			                </li>
			                <li class="nav-item">
			                    <a href="#"  class="nav-link align-middle" data-bs-dismiss="offcanvas">
			                      <span class="material-symbols-outlined sidebar-footer-icon">thumb_up</span>
			                      <span class="ms-1  ">Feedback</span>
			                    </a>
			                </li>
			                <li class="nav-item">
			                    <a @click="$router.push({path:'/settings'}); hideThisCanvas()" class="nav-link align-middle" data-bs-dismiss="offcanvas">
			                      <span class="material-symbols-outlined sidebar-footer-icon">settings</span>
			                      <span class="ms-1">Settings</span>
			                    </a>
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
			                  <button v-if="$user.data.isGuest"  type="button" class="btn btn-golden text-dark btn-block mt-3" data-bs-toggle="modal" data-bs-target="#login">Cashier</button>
			                  <a @click="$router.push({path:'/cashier'}); hideThisCanvas()"  class="btn btn-golden text-dark btn-block mt-3" v-if="!$user.data.isGuest">Cashier
			                  </a>
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
			redirectAdmin() {
	   			window.location = import.meta.env.VITE_ADMIN_BASE_URL;
	   		},
			beforeRouteLeave(to, from) {
    			this.hideThisCanvas()
  			},
			hideThisCanvas(){
			    let myOffcanvas = document.getElementById('offcanvasDarkNavbar')
			    let bsOffcanvas = Offcanvas.getInstance(myOffcanvas);
			    bsOffcanvas.hide();
  			}
		}
	}
</script>