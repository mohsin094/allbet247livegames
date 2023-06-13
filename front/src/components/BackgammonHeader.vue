<template>
	<header id="backgammon-header" style="display:none">
	  <!-- Navbar -->
	  <!-- Button trigger modal -->
	  <nav id="main-navbar" class="navbar navbar-expand-lg">
	    <!-- Container wrapper -->
	    <div class="container-fluid">
	      <!-- Brand -->
	     <div class="col-md-3 col-xl-2 px-sm-2 px-0 brand">
	        <a class="navbar-brand" href="#">
	          <img src="@/assets/logo.svg" class="d-inline-block align-top" alt="">
	        </a>
	     </div>
	     <div class="col-md-6" id="bheader-mob-links" v-if="this.$isMobile">
	     	<ul class="navbar-nav  flex-row b-header-links bheader-mob-links">
	     		<li>
	     			<a href="#">Lobby</a>
	     		</li>
	     		<!-- <li>
	     			<a href="#">Tournoments</a>
	     		</li>
	     		<li>
	     			<a href="#">Other Games</a>
	     		</li>
	     		<li>
	     			<a href="#">Bonuses</a>
	     		</li> -->
	     	</ul>
	     </div>
	     <div v-if="!this.$isMobile" class="container d-flex align-items-center justify-content-center" id="b-header-links">
	     	<ul class="navbar-nav d-flex flex-row b-header-links">
	     		<li>
	     			<router-link to="/"><span class="material-symbols-sharp">home</span>Lobby</router-link>
	     		</li>
	     		<!-- <li>
	     			<a href="#"><span class="material-symbols-sharp">emoji_events</span>Tournoments</a>
	     		</li>
	     		<li>
	     			<a href="#"><span class="material-symbols-sharp">stadia_controller</span>Other Games</a>
	     		</li>
	     		<li>
	     			<a href="#"><span class="material-symbols-sharp">redeem</span>Bonuses</a>
	     		</li> -->
	     	</ul>
	     </div>
	     <div class="col-md-3 float-end">
	     	 <!-- Right links -->
	      <ul class="navbar-nav d-flex flex-row header-right">
	        <li class="nav-item">
	          <div class="header-box">
	            <i class="material-symbols-rounded">
	              attach_money
	            </i>
	            <strong><span class="text-golden-light" style="margin-left:-15px">26.004039</span></strong>
	          </div>
	        </li>
	        <li class="nav-item">
	          <div class="header-box">
	            <i class="material-symbols-rounded">add</i>
	          </div>
	        </li>
	        
	         <li class="nav-item d-block d-sm-none">
	         <div class="">
	            <div class="dropdown">
	              <a href="#" class="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
	               <div class="border-golden card-profile card-profile-right">
  					<div class="profile-bg bg-blue" style="">
  						<img src="@/assets/profiles/gazal.svg"/>
  					</div>
  				</div>
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
	                <li><a class="dropdown-item" href="#">Sign out</a></li>
	              </ul>
	            </div>
	         </div>
	        </li>
	        <li class="nav-item d-none d-sm-inline">
	          	<div class="border-golden card-profile card-profile-right">
  					<div class="profile-bg bg-blue" style="">
  						<img src="@/assets/profiles/gazal.svg"/>
  					</div>
  				</div>
	        </li>
	      </ul>
	     </div>
	     
	    </div>
	    <!-- Container wrapper -->
	  </nav>
	  <!-- Navbar -->
	</header>
</template>