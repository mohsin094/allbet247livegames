<template>
	<header id="backgammon-header" style="height:5vh">
	  <!-- Navbar -->
	  <!-- Button trigger modal -->
		<nav id="main-navbar" class="navbar navbar-expand-lg py-1">
		    <!-- Container wrapper -->
		    <div class="container-fluid">
		      <!-- Brand -->
			    <div class="col-md-3 col-xl-2 px-sm-2 px-0 brand">
			    	<img src="@/assets/logo.svg" class="d-inline-block align-top logo" @click="goHome()" alt="" style="width:150px">
			    </div>
		      	<router-link to="/" class="float-end btn btn-golden">
		     		<span class="material-symbols-outlined text-dark float-start">Home</span>
					<p class="float-start text-dark ms-2">Lobby</p>
		     	</router-link>
		     <!-- </div> -->
		    </div>
		    <!-- Container wrapper -->
		</nav>
	  <!-- Navbar -->
	</header>
</template>
<script>
	export default{
		methods:{
			goHome:function(){
		    	this.$router.push({path:'/'})
		    },
		}
	}
</script>