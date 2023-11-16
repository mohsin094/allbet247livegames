<template>
	<header id="backgammon-header">
	  <!-- Navbar -->
	  <!-- Button trigger modal -->
	  <nav id="main-navbar" class="navbar navbar-expand-lg py-1">
	    <!-- Container wrapper -->
	    <div class="container-fluid">
	      <!-- Brand -->
	     <div class="col-md-3 col-xl-2 px-sm-2 px-0 brand">
	        <router-link to="/" class="navbar-brand">
	          <img src="@/assets/logo.svg" class="d-inline-block align-top" alt="" style="width:150px">
	        </router-link>
	     </div>
	     <!-- <div class="col-md-6" id="bheader-mob-links" v-if="this.$isMobile">
	     	<ul class="navbar-nav  flex-row b-header-links bheader-mob-links">
	     		<li>
	     			<a href="#">Lobby</a>
	     		</li>
	     		
	     	</ul>
	     </div> -->
	  
	     <div class="col-md-3 float-end px-1">
	     	 <!-- Right links -->
	      	<router-link to="/" class="float-end btn btn-golden">
	     		<span class="material-symbols-outlined text-dark float-start">Home</span>
				<p class="float-start text-dark ms-2">Lobby</p>
	     	</router-link>
	     </div>
	     
	    </div>
	    <!-- Container wrapper -->
	  </nav>
	  <!-- Navbar -->
	</header>
</template>