<template>
	<header id="main-header">
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
	        <a class="navbar-brand" href="#">
	          <img src="@/assets/logo.svg" class="d-inline-block align-top" alt="">
	        </a>
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
	      	<li class="nav-item">
	          <div class="header-box">
	            <i class="material-symbols-rounded">
	              notifications
	            </i>
	          </div>
	        </li>
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
	          <div class="header-box">
	            <i class="material-symbols-rounded">
	              notifications
	            </i>
	          </div>
	        </li>
	        <li class="nav-item">
	          <div class="header-box">
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
	                    Hana Peterson
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
	              		Hana Peterson
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
  export default{
   
    methods:{
      doLogout:function(){
      	this.$user.doLogout()
        this.$storage.removeItem("data")
        console.log(this.$user.data.isGuest)
      },
      goToCashier:function(){
      	this.$router.push({path:'/cashier'})
      }
    }
  }
</script>
