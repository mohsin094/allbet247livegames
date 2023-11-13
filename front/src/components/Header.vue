<template>
	<MobileHeader :announcements="arrayLength"/>
	<header id="main-header" v-if="!this.isMobile">
	  <!-- Navbar -->
	  <!-- Button trigger modal -->
	  <nav id="main-navbar" class="navbar navbar-expand-lg">
	    <!-- Container wrapper -->
	    <div class="container-fluid">
	      <!-- Toggle button -->
	      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav-content" aria-controls="nav-content" aria-expanded="false" aria-label="Toggle navigation">
	        <span class="navbar-toggler-icon"></span>
	      </button>

	      <!-- Brand -->
	     <div class="col-md-3 col-xl-2 px-sm-2 px-0 brand">
	        <router-link to="/" class="navbar-brand">
	          <img src="@/assets/logo.svg" class="d-inline-block align-top" alt="">
	        </router-link>
	     </div>
	      <!-- Search form -->
	      <form class="form-inline search-form">
	        <div class="input-group">
	          <div class="input-group-prepend">
	            <span class="input-group-text" id="addon">
	              <i class="material-symbols-rounded">search</i>
	            </span>
	          </div>
	          <input type="text" id="search-input" class="form-control" placeholder="Enter Player Name-ID" aria-describedby="addon">
	        </div>
	      </form>

	      <!-- Right links -->
	      <ul  v-if="$user.data.isGuest" class="navbar-nav ms-auto d-flex flex-row navbar-header">
	      	<!-- <li class="nav-item">
	         <div class="header-box" @click="openNotifies()">
	            <i class="material-symbols-rounded">
	              notifications
	            </i>
	            <div class="notif-wrapper position-absolute d-none">
		           <ul class="notif-list">
		           	<li>
		           		<router-link to="/">
		           			<i class="material-symbols-rounded float-start text-golden-dark">
				              notifications
				            </i>
			            Test Notification 1
		           		</router-link>
			            <hr class="hr-text" style="margin:0" />
		           	</li>
		           	<li>
		           		<router-link to="/">
		           			<i class="material-symbols-rounded float-start text-golden-dark">
				              notifications
				            </i>
			            Test Notification 2
		           		</router-link>
			            <hr class="hr-text" style="margin:0" />
		           	</li>
		           	<li>
		           		<router-link to="/">
		           			<i class="material-symbols-rounded float-start text-golden-dark">
				              notifications
				            </i>
			            Test Notification 3
		           		</router-link>
			            <hr class="hr-text" style="margin:0" />
		           	</li>
		           </ul>

	            </div>
	          </div>
	        </li> -->
	        <li class="nav-item">
	          <div class="header-box">
	            <i class="material-symbols-outlined">smart_toy</i>
	          </div>
	        </li>
	        <li class="nav-item">
		        <button type="button" class="btn btn-default btn-dark" data-bs-toggle="modal" data-bs-target="#login">
				  Login
				</button>
	        </li>
	         <li class="nav-item">
		        <button type="button" class="btn btn-default btn-golden" data-bs-toggle="modal" data-bs-target="#signup">
				  Register
				</button>
	        </li>
	      </ul>
	      <ul v-if="!$user.data.isGuest" class="navbar-nav ms-auto d-flex flex-row navbar-header">
	        <li class="nav-item">
		        <div class="header-box position-relative" @click="openNotifies()">
					<span v-if="announcements.length > 0" class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-light-gray">
						{{announcements.length}}
					    <span class="visually-hidden">unread messages</span>
					</span>
		            <i class="material-symbols-rounded">
		              notifications
		            </i>
		            <div id="notif-wrapper" class="notif-wrapper position-absolute d-none" v-if="announcements.length > 0">
			           <ul class="notif-list">
			           	<li v-for="announcement in announcements">
			           		<router-link to="/notifications">
			           			<i class="material-symbols-rounded float-start text-golden-dark">
					              notifications
					            </i>
				            	{{announcement.title}}
			           		</router-link>
				            <hr class="hr-text" style="margin:0" />
			           	</li>
			           </ul>
		            </div>
		        </div>
	        </li>
	        <li class="nav-item">
	          <div class="header-box" @click="goToTicket()">
	            <i class="material-symbols-rounded">forum</i>
	          </div>
	        </li>
	        <li class="nav-item">
	          <div class="header-box" @click="goToCashier()">
	            <i class="material-symbols-rounded">
	              currency_bitcoin
	            </i>
	            <span>0.0037</span>
	            <i class="material-symbols-rounded">
	              add_box
	            </i>
	          </div>
	        </li>
	         <li class="nav-item d-block d-sm-none">
	         <div class="header-box">
	            <div class="dropdown">
	              <a href="#" class="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
	                <img :src="'/assets/images/avatars/'+$user.data.avatar+'.png'" class="avatar"/>
	              </a>
	              <ul class="dropdown-menu dropdown-menu-dark text-small shadow">
	              	
	                <li>
	                  <a href="#" class="dropdown-item fullname">
	                    {{$user.data.email}}
	                    <span class="user-level text-golden-gradient">LVL.12</span>
	                  </a>
	                </li>
	                <li>
	                    <hr class="dropdown-divider">
	                </li>
	                <li><a class="dropdown-item" href="#" @click="doLogout()">Sign out</a></li>
	              </ul>
	            </div>
	         </div>
	        </li>
	        <li class="nav-item d-none d-sm-inline">
	          <div class="header-box">
	            <div class="profile-wrapper text-center position-absolute">
	              <img class="avatar" :src="'/assets/images/avatars/'+$user.data.avatar+'.png'"/>
	            </div>
	           
	            <a href="#" class="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
	            	<i class="material-symbols-outlined position-absolute" style="left:2px;top:5px">
							expand_more
					</i>
	                <span class="position-absolute fullname">
	              		{{$user.data.email}}
	            	</span>
	              </a>
	              <ul class="dropdown-menu dropdown-menu-dark text-small shadow">
	                <li><a class="dropdown-item" href="#" @click="doLogout()">Sign out</a></li>
	              </ul>
	            <span class="position-absolute user-level text-golden-gradient">LVL.12</span>
	          </div>
	        </li>
	      </ul>
	      
	    </div>
	    <!-- Container wrapper -->
	  </nav>
	  <!-- Navbar -->
	</header>
</template>
<script>
	import MobileHeader from '@/components/MobileHeader.vue';
	export default{
	   components:{
	   	MobileHeader
	   },	
	   data(){
	   	return{
	   		announcements:[],
	   		arrayLength:''
	   	}
	   },
	   mounted(){
	   	this.getAnnouncements()
	   },
	   methods:{
		    getAnnouncements(){
		      const url = import.meta.env.VITE_BACKEND_BASE_URL+'/announcement/default/list'
	          let instance = this
	          this.$axios.get(url).then(function(response){
	            let data = response.data.params
	            if(data.length > 0){
	              instance.announcements = data
	              instance.arrayLength = data.length
	            }
          })
		    },
		    doLogout:function(){
		      	this.$user.doLogout()
		        this.$storage.removeItem("data")
		        
		    },
		    goToCashier:function(){
		      	this.$router.push({path:'/cashier'})
		    },
		    goToTicket:function(){
		      	this.$router.push({path:'/ticket'})
		    },
		    openNotifies:function(){
		      	var element = document.getElementById("notif-wrapper")
		      	if(element.classList.contains('d-none')){
		      		element.classList.remove("d-none");
		      	}else{
		      		element.classList.add("d-none");
		      	}
		      	
		    }
	    }
  	}
</script>
