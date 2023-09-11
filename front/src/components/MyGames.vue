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
		  			<div @click="join(game._id.$oid)" v-for="game in myGames" class="waiting-game-item col-md-6 col-sm-12 col-xl-3 mb-5">
			  			<div class="frame colorfull-border colorfull-border-active">
				  			<div class="position-relative card">
				  				<!-- profile right -->
				  				<span class="position-absolute card-profile-name-right card-profile-name">
				  					{{ (game.awayUser != undefined) ? game.awayUser.public_name : ' ? ' }}
				  				</span>
				  				<span class="position-absolute card-user-level">LVL.22</span>
				  				<div class="border-golden card-profile card-profile-right position-absolute">
				  					<div class="position-absolute profile-bg bg-red bg-red-shadow" style="">
				  						<img class="img-fluid" v-if="game.awayUser != undefined" :src="frontUrl+'/assets/images/avatars/'+ game.awayUser.avatar +'.png'"/>
				  					</div>
				  				</div>
				  				<!-- profile right end -->
				  				<img class="vs" src="@/assets/icons/vs.svg" />
				  				<!-- profile left -->
				  				<span class="position-absolute card-profile-name-left card-profile-name">Me</span>
				  				<div class="border-golden card-profile card-profile-left position-absolute">
				  					<div class="position-absolute profile-bg bg-blue bg-blue-shadow">
				  						<img class="img-fluid" :src="frontUrl+'/assets/images/avatars/'+ $user.data.avatar +'.png'"/>
				  					</div>
				  				</div>
				  				<!-- profile left end -->
				  				
				  				<div class="stake position-absolute">
				  					<i class="material-symbols-sharp float-start">monetization_on</i>
				  					<span class="float-start">Stake: {{game.stake.stake}}</span>
				  				</div>
				  				<div v-if="game.awayUser == undefined" class="cancel-match position-absolute">
					  				<a @click.prevent.stop="cancelMatch(game._id.$oid)" class="btn-outline text-golden-gradient">
		  								<span>Cancel</span>
		  							</a>
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
				myGames: [],
				frontUrl: import.meta.env.VITE_BASE_URL
			}
		},
		created() {
			this.fetchGames();
		},
		unmounted() {
			clearInterval(this.fetchGamesInterval);
		},
		methods: {
			join(matchId) {
				this.$axios.get(import.meta.env.VITE_BACKEND_BASE_URL+"/game/default/join", {params: {matchId: matchId}}).then((res) => {
					res = res.data;

					if(res.result) {
						this.$router.push({name: 'backgammon', params: {matchId: matchId}});
					}
				});
			},
			cancelMatch(matchId) {
				const url = import.meta.env.VITE_BACKEND_BASE_URL+'/game/default/cancel?matchId=' + matchId;
				this.$axios.get(url).then((res) => {
					
				});
			},
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

<style scoped>
.cancel-match {
	bottom: 10px;
	left: 45%;
}

.waiting-game-item {
	cursor: pointer;
}

</style>