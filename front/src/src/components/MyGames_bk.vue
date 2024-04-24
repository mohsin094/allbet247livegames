<template>
	<div class="row gx-5">
	    <div class="col px-0">
	     <div class="p-3">
	     	<div class="relative position-relative mb-5 main-title">
				<i class="material-symbols-rounded position-absolute">circle</i>
				<span class="title position-absolute">My Games</span>
			</div>
	     </div>
	    </div>
	    <!-- <div class="col px-2">
	      <div class="p-3 text-end">
	      	<button class="btn-control btn-control-prev mr-3" type="button" data-bs-target="#carousel" data-bs-slide="prev">
		        <span class="material-symbols-rounded">
				chevron_left
				</span>
		    </button>
		    <button class="btn-control btn-control-next" type="button" data-bs-target="#carousel" data-bs-slide="next">
		       <span class="material-symbols-rounded">
				chevron_right
				</span>
		    </button>
		    <button class="btn-control px-2" type="button">
		       See all
		    </button>
	  	  </div>
	    </div> -->
  	</div>
  	<div id="carousel" class="carousel" data-bs-interval="false">
	    <div class="carousel-inner">
	        <div class="carousel-item active">
	        	<div class="row">	
				  	<div class="col-md-6 col-sm-12 col-xl-3 mb-5">
				  		<div class="frame colorfull-border bg-gray">
				  			<div class="position-relative card">
				  				<!-- profile right -->
				  				<span class="position-absolute card-profile-name-right card-profile-name">Me</span>
				  				<div class="border-golden card-profile card-profile-right position-absolute">
				  					<div class="position-absolute profile-bg bg-red bg-red-shadow bg-red bg-red-shadow-shadow" style="">
				  						<img src="@/assets/profiles/gazal.svg"/>
				  					</div>
				  				</div>
				  				<span class="position-absolute card-profile-name-left card-profile-name">Maya</span>
				  				<span class="position-absolute card-user-level">LVL.22</span>
				  				<!-- profile right end -->
				  				<img class="vs" src="@/assets/icons/vs.svg" />
				  				<!-- profile left -->
				  				<div class="border-golden card-profile card-profile-left position-absolute">
				  					<div class="position-absolute profile-bg bg-blue bg-blue-shadow bg-blue bg-blue-shadow-shadow">
				  						<img src="@/assets/profiles/gazal.svg"/>
				  					</div>
				  				</div>
				  				<!-- profile left end -->
				  				<ul class="list-group-horizontal position-absolute card-star text-center">
				  					<li><i class="material-symbols-rounded text-grass">star</i></li>
				  					<li><i class="material-symbols-rounded text-grass">star</i></li>
				  					<li><i class="material-symbols-rounded text-red">star</i></li>
				  					<li><i class="material-symbols-rounded text-disabled">star</i></li>
				  					<li><i class="material-symbols-rounded text-disabled">star</i></li>
				  					<li><i class="material-symbols-rounded text-disabled">star</i></li>
				  					<li><i class="material-symbols-rounded text-disabled">star</i></li>
				  				</ul>
				  				<div class="position-absolute card-timelapse">
				  					<div class="position-absolute card-timelapse-wrapper">
				  						<div class="position-absolute card-timer-icon">
				  							<i class="material-symbols-sharp"><span>timelapse</span></i>
				  						</div>
				  						<div class="time position-absolute">
				  							03:24
				  						</div>
				  					</div>
				  				</div>
				  				<div class="stake position-absolute">
				  					<i class="material-symbols-sharp float-start">monetization_on</i>
				  					<span class="float-start">Stake:1000</span>
				  				</div>
				  				<div class="prize position-absolute">
				  					<i class="material-symbols-sharp float-start">workspace_premium</i>
				  					<span class="float-start">Prize:1400</span>
				  				</div>
				  			</div>
				  		</div>
		  			</div>
		  			<div class="col-md-6 col-sm-12 col-xl-3 mb-5">
				  		<div class="frame colorfull-border bg-gray">
				  			<div class="position-relative card">
				  				<!-- profile right -->
				  				<span class="position-absolute card-profile-name-right card-profile-name">Me</span>
				  				<div class="border-golden card-profile card-profile-right position-absolute">
				  					<div class="position-absolute profile-bg bg-red bg-red-shadow" style="">
				  						<img src="@/assets/profiles/gazal.svg"/>
				  					</div>
				  				</div>
				  				<span class="position-absolute card-profile-name-left card-profile-name">Maya</span>
				  				<span class="position-absolute card-user-level">LVL.22</span>
				  				<!-- profile right end -->
				  				<img class="vs" src="@/assets/icons/vs.svg" />
				  				<!-- profile left -->
				  				<div class="border-golden card-profile card-profile-left position-absolute">
				  					<div class="position-absolute profile-bg bg-blue bg-blue-shadow">
				  						<img src="@/assets/profiles/gazal.svg"/>
				  					</div>
				  				</div>
				  				<!-- profile left end -->
				  				<ul class="list-group-horizontal position-absolute card-star text-center">
				  					<li><i class="material-symbols-rounded text-grass">star</i></li>
				  					<li><i class="material-symbols-rounded text-grass">star</i></li>
				  					<li><i class="material-symbols-rounded text-red">star</i></li>
				  					<li><i class="material-symbols-rounded text-disabled">star</i></li>
				  					<li><i class="material-symbols-rounded text-disabled">star</i></li>
				  					<li><i class="material-symbols-rounded text-disabled">star</i></li>
				  					<li><i class="material-symbols-rounded text-disabled">star</i></li>
				  				</ul>
				  				<div class="position-absolute card-timelapse">
				  					<div class="position-absolute card-timelapse-wrapper">
				  						<div class="position-absolute card-timer-icon">
				  							<i class="material-symbols-sharp"><span>timelapse</span></i>
				  						</div>
				  						<div class="time position-absolute">
				  							03:24
				  						</div>
				  					</div>
				  				</div>
				  				<div class="stake position-absolute">
				  					<i class="material-symbols-sharp float-start">monetization_on</i>
				  					<span class="float-start">Stake:1000</span>
				  				</div>
				  				<div class="prize position-absolute">
				  					<i class="material-symbols-sharp float-start">workspace_premium</i>
				  					<span class="float-start">Prize:1400</span>
				  				</div>
				  			</div>
				  		</div>
		  			</div>
		  			<div class="col-md-6 col-sm-12 col-xl-3 mb-5">
				  		<div class="frame colorfull-border bg-gray">
				  			<div class="position-relative card">
				  				<!-- profile right -->
				  				<span class="position-absolute card-profile-name-right card-profile-name">Me</span>
				  				<div class="border-golden card-profile card-profile-right position-absolute">
				  					<div class="position-absolute profile-bg bg-red bg-red-shadow" style="">
				  						<img src="@/assets/profiles/gazal.svg"/>
				  					</div>
				  				</div>
				  				<span class="position-absolute card-profile-name-left card-profile-name">Maya</span>
				  				<span class="position-absolute card-user-level">LVL.22</span>
				  				<!-- profile right end -->
				  				<img class="vs" src="@/assets/icons/vs.svg" />
				  				<!-- profile left -->
				  				<div class="border-golden card-profile card-profile-left position-absolute">
				  					<div class="position-absolute profile-bg bg-blue bg-blue-shadow">
				  						<img src="@/assets/profiles/gazal.svg"/>
				  					</div>
				  				</div>
				  				<!-- profile left end -->
				  				<ul class="list-group-horizontal position-absolute card-star text-center">
				  					<li><i class="material-symbols-rounded text-grass">star</i></li>
				  					<li><i class="material-symbols-rounded text-grass">star</i></li>
				  					<li><i class="material-symbols-rounded text-red">star</i></li>
				  					<li><i class="material-symbols-rounded text-disabled">star</i></li>
				  					<li><i class="material-symbols-rounded text-disabled">star</i></li>
				  					<li><i class="material-symbols-rounded text-disabled">star</i></li>
				  					<li><i class="material-symbols-rounded text-disabled">star</i></li>
				  				</ul>
				  				<div class="position-absolute card-timelapse">
				  					<div class="position-absolute card-timelapse-wrapper">
				  						<div class="position-absolute card-timer-icon">
				  							<i class="material-symbols-sharp"><span>timelapse</span></i>
				  						</div>
				  						<div class="time position-absolute">
				  							03:24
				  						</div>
				  					</div>
				  				</div>
				  				<div class="stake position-absolute">
				  					<i class="material-symbols-sharp float-start">monetization_on</i>
				  					<span class="float-start">Stake:1000</span>
				  				</div>
				  				<div class="prize position-absolute">
				  					<i class="material-symbols-sharp float-start">workspace_premium</i>
				  					<span class="float-start">Prize:1400</span>
				  				</div>
				  			</div>
				  		</div>
		  			</div>
		  			<div class="col-md-6 col-sm-12 col-xl-3 mb-5">
			  			<div class="frame colorfull-border colorfull-border-active">
				  			<div class="position-relative card">
				  				<!-- profile right -->
				  				<span class="position-absolute card-profile-name-right card-profile-name">Me</span>
				  				<div class="border-golden card-profile card-profile-right position-absolute">
				  					<div class="position-absolute profile-bg bg-red bg-red-shadow" style="">
				  						<img src="@/assets/profiles/gazal.svg"/>
				  					</div>
				  				</div>
				  				<span class="position-absolute card-profile-name-left card-profile-name">Maya</span>
				  				<span class="position-absolute card-user-level">LVL.22</span>
				  				<!-- profile right end -->
				  				<img class="vs" src="@/assets/icons/vs.svg" />
				  				<!-- profile left -->
				  				<div class="border-golden card-profile card-profile-left position-absolute">
				  					<div class="position-absolute profile-bg bg-blue bg-blue-shadow">
				  						<img src="@/assets/profiles/gazal.svg"/>
				  					</div>
				  				</div>
				  				<!-- profile left end -->
				  				<ul class="list-group-horizontal position-absolute card-star text-center">
				  					<li><i class="material-symbols-rounded text-grass">star</i></li>
				  					<li><i class="material-symbols-rounded text-grass">star</i></li>
				  					<li><i class="material-symbols-rounded text-red">star</i></li>
				  					<li><i class="material-symbols-rounded text-disabled">star</i></li>
				  					<li><i class="material-symbols-rounded text-disabled">star</i></li>
				  					<li><i class="material-symbols-rounded text-disabled">star</i></li>
				  					<li><i class="material-symbols-rounded text-disabled">star</i></li>
				  				</ul>
				  				<div class="position-absolute card-timelapse">
				  					<div class="position-absolute card-timelapse-wrapper">
				  						<div class="position-absolute card-timer-icon">
				  							<i class="material-symbols-sharp"><span>timelapse</span></i>
				  						</div>
				  						<div class="time position-absolute text-danger">
				  							00:09
				  						</div>
				  					</div>
				  				</div>
				  				<div class="stake position-absolute">
				  					<i class="material-symbols-sharp float-start">monetization_on</i>
				  					<span class="float-start">Stake:1000</span>
				  				</div>
				  				<div class="prize position-absolute">
				  					<i class="material-symbols-sharp float-start">workspace_premium</i>
				  					<span class="float-start">Prize:1400</span>
				  				</div>
				  			</div> 
				  		</div>
	  				</div>
	        	</div>
	        </div>
	        <div class="carousel-item">
	        	<div class="row">
		  			<div class="col-md-6 col-sm-12 col-xl-3 mb-5">
			  			<div class="frame colorfull-border colorfull-border-active">
				  			<div class="position-relative card">
				  				<!-- profile right -->
				  				<span class="position-absolute card-profile-name-right card-profile-name">Me</span>
				  				<div class="border-golden card-profile card-profile-right position-absolute">
				  					<div class="position-absolute profile-bg bg-red bg-red-shadow" style="">
				  						<img src="@/assets/profiles/gazal.svg"/>
				  					</div>
				  				</div>
				  				<span class="position-absolute card-profile-name-left card-profile-name">Maya</span>
				  				<span class="position-absolute card-user-level">LVL.22</span>
				  				<!-- profile right end -->
				  				<img class="vs" src="@/assets/icons/vs.svg" />
				  				<!-- profile left -->
				  				<div class="border-golden card-profile card-profile-left position-absolute">
				  					<div class="position-absolute profile-bg bg-blue bg-blue-shadow">
				  						<img src="@/assets/profiles/gazal.svg"/>
				  					</div>
				  				</div>
				  				<!-- profile left end -->
				  				<ul class="list-group-horizontal position-absolute card-star text-center">
				  					<li><i class="material-symbols-rounded text-grass">star</i></li>
				  					<li><i class="material-symbols-rounded text-grass">star</i></li>
				  					<li><i class="material-symbols-rounded text-red">star</i></li>
				  					<li><i class="material-symbols-rounded text-disabled">star</i></li>
				  					<li><i class="material-symbols-rounded text-disabled">star</i></li>
				  					<li><i class="material-symbols-rounded text-disabled">star</i></li>
				  					<li><i class="material-symbols-rounded text-disabled">star</i></li>
				  				</ul>
				  				<div class="position-absolute card-timelapse">
				  					<div class="position-absolute card-timelapse-wrapper">
				  						<div class="position-absolute card-timer-icon">
				  							<i class="material-symbols-sharp"><span>timelapse</span></i>
				  						</div>
				  						<div class="time position-absolute text-danger">
				  							00:09
				  						</div>
				  					</div>
				  				</div>
				  				<div class="stake position-absolute">
				  					<i class="material-symbols-sharp float-start">monetization_on</i>
				  					<span class="float-start">Stake:1000</span>
				  				</div>
				  				<div class="prize position-absolute">
				  					<i class="material-symbols-sharp float-start">workspace_premium</i>
				  					<span class="float-start">Prize:1400</span>
				  				</div>
				  			</div> 
				  		</div>
	  				</div>
	        	</div>
	        </div>
	    </div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				fetchGamesInterval: undefined,
				myGames: []
			}
		},
		created() {
			this.fetchGames();
		},
		methods: {
			fetchGames() {
				let url = import.meta.env.VITE_BACKEND_BASE_URL+'/game/default/my-games'
				this.fetchGamesInterval = setInterval(() => {
					this.$axios.get(url).then((res) => {
						res = res.data;
						if(res.result) {
							this.myGames = res.params;
						}
					});
				}, 2000);
			}
		},

	}
</script>