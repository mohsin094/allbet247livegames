<template>
	<div v-if="myGames.length > 0" class="row gx-5">
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
  	<div class="" v-if="myGames.length > 0" style="background:none">
  	<Carousel :value="myGames" :numVisible="4" :numScroll="1" :responsiveOptions="responsiveOptions">
            <template #item="game">
            	 <div class="text-center px-3">
                	<div @click="join(game.data._id.$oid)" class="waiting-game-item mb-5">
			  			<div class="frame colorfull-border colorfull-border-active">
				  			<div class="position-relative card">
				  				<!-- profile right -->
				  				<span class="position-absolute card-profile-name-right card-profile-name">
				  					{{ (game.data.awayUser != undefined) ? game.data.awayUser.public_name : ' ? ' }}
				  				</span>
				  				<span class="position-absolute card-user-level">LVL.{{(game.data.awayUser != undefined && game.data.awayUser.lvl != undefined) ? game.data.awayUser.lvl : ' ? '}}</span>
				  				<div class="border-golden card-profile card-profile-right position-absolute">
				  					<div class="position-absolute profile-bg bg-red bg-red-shadow" style="">
				  						<img class="img-fluid" v-if="game.data.awayUser != undefined" :src="frontUrl+'/assets/images/avatars/'+ game.data.awayUser.avatar +'.png'"/>
				  					</div>
				  				</div>
				  				<!-- profile right end -->
				  				<img class="vs" src="@/assets/icons/vs.svg" />
				  				<!-- profile left -->
				  				<span class="position-absolute card-profile-name-left card-profile-name">{{ game.data.homeUser.public_name }}</span>
				  				<span class="position-absolute card-user-level">LVL.{{(game.data.homeUser != undefined && game.data.homeUser.lvl != undefined) ? game.data.homeUser.lvl : ' ? '}}</span>
				  				<div class="border-golden card-profile card-profile-left position-absolute">
				  					<div class="position-absolute profile-bg bg-blue bg-blue-shadow">
				  						<img class="img-fluid" :src="frontUrl+'/assets/images/avatars/'+ game.data.homeUser.avatar +'.png'"/>
				  					</div>
				  				</div>
				  				<!-- profile left end -->
				  				
				  				<div class="stake position-absolute">
				  					<i class="material-symbols-sharp float-start">monetization_on</i>
				  					<span class="float-start">Stake: {{game.data.stake.stake}}</span>
				  				</div>
				  				<div v-if="game.data.awayUser == undefined" class="cancel-match position-absolute">
					  				<a @click.prevent.stop="cancelMatch(game.data._id.$oid)" class="btn-outline text-golden-gradient">
		  								<span>Cancel</span>
		  							</a>
	  							</div>
				  				
				  			</div> 
				  		</div>
	  				</div>
	  			</div>
            </template>
        </Carousel>
  	</div>
</template>

<script>
	import Carousel from 'primevue/carousel';
	export default {
		components:{
			Carousel
		},
		data() {
			return {
				fetchGamesInterval: undefined,
				myGames: [],
				frontUrl: import.meta.env.VITE_BASE_URL,
				responsiveOptions: [
                {
                    breakpoint: '1400px',
                    numVisible: 2,
                    numScroll: 1
                },
                {
                    breakpoint: '1199px',
                    numVisible: 3,
                    numScroll: 1
                },
                {
                    breakpoint: '767px',
                    numVisible: 2,
                    numScroll: 1
                },
                {
                    breakpoint: '575px',
                    numVisible: 1,
                    numScroll: 1
                }
            ],
			}
		},
		created() {
			if(!this.$user.isGuest){
				this.fetchGames();
			}
		},
		unmounted() {
			clearInterval(this.fetchGamesInterval);
		},
		methods: {
			join(matchId) {
				this.$axios.get(import.meta.env.VITE_BACKEND_BASE_URL+"/game/default/join", {params: {matchId: matchId}}).then((res) => {
					res = res.data;
					
					if(res.result && res.params.match_id) {
						this.$router.push({name: 'backgammon', params: {matchId: res.params.match_id}});
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