<template>
	<div class="row">
      <div class="col-md-12 col-xl-12 position-relative">
	      <ul class="nav nav-pills tabs">
	        <li class="nav-item ">
	          <button @click="setTitle('Waiting list')" type="button" class="nav-link active btn tab-btn position-relative" data-bs-toggle="pill" data-bs-target="#pills-waiting-list">
	              <div class="icon-border">
	              <div class="icon-bg">
	                <img src="@/assets/icons/hourglass.svg" width="20px" />
	              </div>
	            </div>
	              <a href="#" class="tab-link">
	                Waiting list
	              </a>
	               <span class="diamond-badge position-absolute top-0 start-100 translate-middle badge rounded-pill">
	                <span class="badge-text">17</span>
	              </span>
	            </button>
	        </li>
	       <!--  <li class="nav-item ">
	          <button @click="setTitle('Tournaments')" type="button" class="nav-link btn tab-btn position-relative" data-bs-toggle="pill" data-bs-target="#pills-tournaments">
	              <div class="icon-border">
	              <div class="icon-bg">
	                <img src="@/assets/icons/cup.svg" width="20px" />
	              </div>
	            </div>
	              <a href="#" class="tab-link">
	                Tournaments
	              </a>
	               <span class="diamond-badge position-absolute top-0 start-100 translate-middle badge rounded-pill">
	                <span class="badge-text">12</span>
	              </span>
	            </button>
	        </li>
	        <li class="nav-item ">
	          <button @click="setTitle('Bonuses')" type="button" class="nav-link btn tab-btn position-relative" data-bs-toggle="pill" data-bs-target="#pills-bonuses">
	              <div class="icon-border">
	              <div class="icon-bg">
	                <img src="@/assets/icons/gift.svg" width="20px" />
	              </div>
	            </div>
	              <a href="#" class="tab-link" id="bonuses">
	                Bonuses
	              </a>
	               <span class="diamond-badge position-absolute top-0 start-100 translate-middle badge rounded-pill">
	                <span class="badge-text">15</span>
	              </span>
	            </button>
	        </li> -->
	         <!-- <li class="nav-item ">
	          <button @click="setTitle('Other games')" type="button" class="nav-link btn tab-btn position-relative" data-bs-toggle="pill" data-bs-target="#pills-others">
	              <div class="icon-border">
	              <div class="icon-bg">
	                <img src="@/assets/icons/games.svg" width="20px" />
	              </div>
	            </div>
	              <a href="#" class="tab-link">
	                Other games
	              </a>
	               <span class="diamond-badge position-absolute top-0 start-100 translate-middle badge rounded-pill">
	                <span class="badge-text">12</span>
	              </span>
	            </button>
	        </li> -->
	      </ul>
	      <button v-if="!$user.data.isGuest" class="btn default-btn btn-purple-border position-absolute" style="top:20px;right: 25px"  data-bs-toggle="modal" data-bs-target="#newGame">
	      	<span class="text-golden-gradient">
	      		Play Now
	      	</span>
	      	<span class="material-symbols-outlined float-end text-golden-gradient">stadia_controller</span>
	      </button>
	      <button v-if="$user.data.isGuest" class="btn default-btn btn-purple-border position-absolute" style="top:20px;right: 25px"  data-bs-toggle="modal" data-bs-target="#login">
	      	<span class="text-golden-gradient">
	      		Play Now
	      	</span>
	      	<span class="material-symbols-outlined float-end text-golden-gradient">stadia_controller</span>
	      </button>
      </div>
    </div>
     <div class="row">
    	<div class="col-md-12 col-xl-12">
    		<div class="row gx-5">
			    <div class="col px-2">
			     <div class="p-3 px-4">
			     	<h4>{{title}}</h4>
			     </div>
			    </div>
			   <!--  <div class="col px-2">
			      <div class="p-3 text-end">
			      	<button class="btn-control btn-filter" type="button">
				        <span class="material-symbols-outlined">
						filter_alt
						</span>
				    </button>
				    <button class="btn-control btn-filter" type="button">
				       <span class="material-symbols-rounded">
						tune
						</span>
				    </button>
			  	  </div>
			    </div> -->
  			</div>
	      	<div class="tab-content" id="pills-tabContent">
	      		<!-- waiting list start -->
			  <div class="tab-pane fade show active" id="pills-waiting-list" role="tabpanel">
			  	<div class="row mb-5">
				  	<div v-if="Object.values(waiting).length > 0" v-for="wait in waiting" class="col-md-4 col-sm-6 col-lg-2 px-2 mb-3">
			  			<div :class="['frame small-frame' ,getAvatarColor(wait.home.avatar+'.png')]">
				  			<div class="position-relative card">
				  				<div class="row gx-6 small-card-header">
				  					<div class="col">
					  					<div :class="[getAvatarColor(wait.home.avatar+'.png'),'card-profile']">
						  					<div class="position-relative profile-bg bg-purple">
						  						<img style="width: 50px;" :src="frontUrl+'/assets/images/avatars/'+ wait.home.avatar +'.png'" class="position-absolute"/>
						  					</div>
						  					<span class="position-absolute card-profile-name-left card-profile-name small-card-profile-name">{{wait.home.public_name}}</span>
						  				</div>
				  					</div>
				  					<div v-if="wait.home.lvl != undefined" class="col text-end position-relative">
				  						<span class="text-golden-gradient position-absolute card-header-level">LVL.{{wait.home.lvl}}</span>
				  					</div>
				  				</div>
				  				<div class="row mt-3">
				  					<div class="col-4 text-start">
										<small>Stake:<span class="text-golden-gradient">{{wait.stake}}</span></small>
									</div>
								    <div class="col-4 text-center">
								    	<small>Time:<span class="text-golden-gradient">{{wait.timeframe}}</span></small>
								    </div>
								    <div class="col-4 text-end">
								    	<small>Rounds:<span class="text-golden-gradient">{{wait.round}}</span></small>
								    </div>
				  				</div>
				  				<div class="row mt-3 justify-content-center">
				  					<div class="col-6 text-center">
				  						<div class="position-relative golden-gradient-border btn-bg">
				  							<a @click="joinMatch(wait.id)" href="#" class="btn-outline text-golden-gradient" data-bs-toggle="modal" data-bs-target="#wList">
				  								<span>Join</span>
				  							</a>
				  						</div>
				  					</div>
				  				</div>
				  			</div> 
				  		</div>
	  				</div>
	  				<div v-else>
	  					<strong class="text-red">There is no game. Click the "Play Now" button to start a new game</strong>
	  				</div>
	  				<!-- <div class="col-md-4 col-sm-6 col-lg-2 px-2 mb-3">
			  			<div class="frame small-frame border-red">
				  			<div class="position-relative card">
				  				<div class="row gx-6 small-card-header">
				  					<div class="col">
					  					<div class="border-golden card-profile">
						  					<div class="position-relative profile-bg bg-dark-red">
						  						<img src="@/assets/profiles/gazal.svg" class="position-absolute"/>
						  					</div>
						  					<span class="position-absolute card-profile-name-left card-profile-name small-card-profile-name">Maya</span>
						  				</div>
				  					</div>
				  					<div class="col text-end position-relative">
				  						<span class="text-golden-gradient position-absolute card-header-level">LVL.22</span>
				  					</div>
				  				</div>
				  				<div class="row mt-3">
				  					<div class="col-4 text-start">
										<small>Stake:<span class="text-golden-gradient">1000</span></small>
									</div>
								    <div class="col-4 text-center">
								    	<small>Prize:<span class="text-golden-gradient">1400</span></small>
								    </div>
								    <div class="col-4 text-end">
								    	<small>Rounds:<span class="text-golden-gradient">3</span></small>
								    </div>
				  				</div>
				  				<div class="row mt-3 justify-content-center">
				  					<div class="col-6 text-center">
				  						<div class="position-relative golden-gradient-border btn-bg">
				  							<a href="#" class="btn-outline text-golden-gradient"  data-bs-toggle="modal" data-bs-target="#wList">
				  								<span>Join</span>
				  							</a>
				  						</div>
				  					</div>
				  				</div>
				  			</div> 
				  		</div>
	  				</div> -->
	  				<!-- <div class="col-md-4 col-sm-6 col-lg-2 px-2 mb-3">
			  			<div class="frame small-frame border-light-green">
				  			<div class="position-relative card">
				  				<div class="row gx-6 small-card-header">
				  					<div class="col">
					  					<div class="border-golden card-profile">
						  					<div class="position-relative profile-bg bg-light-green">
						  						<img src="@/assets/profiles/gazal.svg" class="position-absolute"/>
						  					</div>
						  					<span class="position-absolute card-profile-name-left card-profile-name small-card-profile-name">Maya</span>
						  				</div>
				  					</div>
				  					<div class="col text-end position-relative">
				  						<span class="text-golden-gradient position-absolute card-header-level">LVL.22</span>
				  					</div>
				  				</div>
				  				<div class="row mt-3">
				  					<div class="col-4 text-start">
										<small>Stake:<span class="text-golden-gradient">1000</span></small>
									</div>
								    <div class="col-4 text-center">
								    	<small>Prize:<span class="text-golden-gradient">1400</span></small>
								    </div>
								    <div class="col-4 text-end">
								    	<small>Rounds:<span class="text-golden-gradient">3</span></small>
								    </div>
				  				</div>
				  				<div class="row mt-3 justify-content-center">
				  					<div class="col-6 text-center">
				  						<div class="position-relative golden-gradient-border btn-bg">
				  							<a href="#" class="btn-outline text-golden-gradient"  data-bs-toggle="modal" data-bs-target="#wList">
				  								<span>Join</span>
				  							</a>
				  						</div>
				  					</div>
				  				</div>
				  			</div> 
				  		</div>
	  				</div>
	  				<div class="col-md-4 col-sm-6 col-lg-2 px-2 mb-3">
			  			<div class="frame small-frame border-sky-blue">
				  			<div class="position-relative card">
				  				<div class="row gx-6 small-card-header">
				  					<div class="col">
					  					<div class="border-golden card-profile">
						  					<div class="position-relative profile-bg bg-sky-blue">
						  						<img src="@/assets/profiles/gazal.svg" class="position-absolute"/>
						  					</div>
						  					<span class="position-absolute card-profile-name-left card-profile-name small-card-profile-name">Maya</span>
						  				</div>
				  					</div>
				  					<div class="col text-end position-relative">
				  						<span class="text-golden-gradient position-absolute card-header-level">LVL.22</span>
				  					</div>
				  				</div>
				  				<div class="row mt-3">
				  					<div class="col-4 text-start">
										<small>Stake:<span class="text-golden-gradient">1000</span></small>
									</div>
								    <div class="col-4 text-center">
								    	<small>Prize:<span class="text-golden-gradient">1400</span></small>
								    </div>
								    <div class="col-4 text-end">
								    	<small>Rounds:<span class="text-golden-gradient">3</span></small>
								    </div>
				  				</div>
				  				<div class="row mt-3 justify-content-center">
				  					<div class="col-6 text-center">
				  						<div class="position-relative golden-gradient-border btn-bg">
				  							<a href="#" class="btn-outline text-golden-gradient"  data-bs-toggle="modal" data-bs-target="#wList">
				  								<span>Join</span>
				  							</a>
				  						</div>
				  					</div>
				  				</div>
				  			</div> 
				  		</div>
	  				</div> -->
	  				<!-- <div class="col-md-4 col-sm-6 col-lg-2 px-2 mb-3">
			  			<div class="frame small-frame border-brown">
				  			<div class="position-relative card">
				  				<div class="row gx-6 small-card-header">
				  					<div class="col">
					  					<div class="border-golden card-profile">
						  					<div class="position-relative profile-bg bg-brown">
						  						<img src="@/assets/profiles/gazal.svg" class="position-absolute"/>
						  					</div>
						  					<span class="position-absolute card-profile-name-left card-profile-name small-card-profile-name">Maya</span>
						  				</div>
				  					</div>
				  					<div class="col text-end position-relative">
				  						<span class="text-golden-gradient position-absolute card-header-level">LVL.22</span>
				  					</div>
				  				</div>
				  				<div class="row mt-3">
				  					<div class="col-4 text-start">
										<small>Stake:<span class="text-golden-gradient">1000</span></small>
									</div>
								    <div class="col-4 text-center">
								    	<small>Prize:<span class="text-golden-gradient">1400</span></small>
								    </div>
								    <div class="col-4 text-end">
								    	<small>Rounds:<span class="text-golden-gradient">3</span></small>
								    </div>
				  				</div>
				  				<div class="row mt-3 justify-content-center">
				  					<div class="col-6 text-center">
				  						<div class="position-relative golden-gradient-border btn-bg">
				  							<a href="#" class="btn-outline text-golden-gradient"  data-bs-toggle="modal" data-bs-target="#wList">
				  								<span>Join</span>
				  							</a>
				  						</div>
				  					</div>
				  				</div>
				  			</div> 
				  		</div>
	  				</div> -->
			  	</div>
			  </div>
			  <!-- waiting list end -->
			  <div class="tab-pane fade" id="pills-tournaments" role="tabpanel">
			  	<!-- tpurnaments start -->
			  	<div class="row">
				  	<div class="col-md-4 col-sm-6 col-lg-2 px-2 mb-3">
			  			<div class="frame small-frame border-brown">
				  			<div class="position-relative card tournament">
				  				<div class="position-absolute tournament-detail text-center">
				  					<p><span class="text-golden-gradient">3</span> Numbers</p>
				  					<p>Start:<span class="text-golden-gradient">Soon</span></p>
				  					<p>Prize:<span class="text-golden-gradient">1400</span></p>
				  					<p>60 100</p>
				  					<div class="position-relative golden-gradient-border btn-bg">
			  							<a href="#" class="btn-outline text-golden-gradient">
			  								<span>Join</span>
			  							</a>
			  						</div>
				  				</div>
				  			</div> 
				  		</div>
	  				</div>
	  				<div class="col-md-4 col-sm-6 col-lg-2 px-2 mb-3">
			  			<div class="frame small-frame border-brown">
				  			<div class="position-relative card tournament">
				  				<div class="position-absolute tournament-detail text-center">
				  					<p><span class="text-golden-gradient">3</span> Numbers</p>
				  					<p>Start:<span class="text-golden-gradient">Soon</span></p>
				  					<p>Prize:<span class="text-golden-gradient">1400</span></p>
				  					<p>60 100</p>
				  					<div class="position-relative golden-gradient-border btn-bg">
			  							<a href="#" class="btn-outline text-golden-gradient">
			  								<span>Join</span>
			  							</a>
			  						</div>
				  				</div>
				  			</div> 
				  		</div>
	  				</div>
	  				<div class="col-md-4 col-sm-6 col-lg-2 px-2 mb-3">
			  			<div class="frame small-frame border-brown">
				  			<div class="position-relative card tournament">
				  				<div class="position-absolute tournament-detail text-center">
				  					<p><span class="text-golden-gradient">3</span> Numbers</p>
				  					<p>Start:<span class="text-golden-gradient">Soon</span></p>
				  					<p>Prize:<span class="text-golden-gradient">1400</span></p>
				  					<p>60 100</p>
				  					<div class="position-relative golden-gradient-border btn-bg">
			  							<a href="#" class="btn-outline text-golden-gradient">
			  								<span>Join</span>
			  							</a>
			  						</div>
				  				</div>
				  			</div> 
				  		</div>
	  				</div>
			  	</div>
			  	<!-- tournaments end -->
			  </div>
			  <div class="tab-pane fade" id="pills-bonuses" role="tabpanel">
			  	<div class="row">
			  		<!-- bonus start -->
			  		<div class="col-md-4 col-sm-6 col-lg-2 px-2 mb-3 bonus-card mini-frame">
			  			<div class="frame small-frame border-gray">
				  			<div class="position-relative card">
				  				<div class="row justify-content-center">
				  					<div class="bonus-icon-wrapper position-relative">
				  						<img src="@/assets/images/golden-gift.png" class="position-absolute"/>
				  					</div>
				  					<p class="text-center mb-2"><strong>Gold</strong></p>
				  					<div class="progress bonus-progress mb-3">
									  <div class="progress-bar bg-success" role="progressbar" style="width: 100%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
									</div>
									<div class="position-relative golden-gradient-border btn-bg text-center bonus-btn">
			  							<a href="#" class="btn-outline text-golden-gradient">
			  								<span>Claim</span>
			  							</a>
			  						</div>
				  				</div>
				  			</div> 
				  		</div>
	  				</div>
	  				<div class="col-md-4 col-sm-6 col-lg-2 px-2 mb-3 bonus-card mini-frame">
			  			<div class="frame small-frame border-gray">
				  			<div class="position-relative card">
				  				<div class="row justify-content-center">
				  					<div class="bonus-icon-wrapper position-relative">
				  						<img src="@/assets/images/silver-gift.png" class="position-absolute"/>
				  					</div>
				  					<p class="text-center mb-2"><strong>Silver</strong></p>
				  					<div class="progress bonus-progress mb-3">
									  <div class="progress-bar bg-danger" role="progressbar" style="width: 80%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
									</div>
									<div class="position-relative silver-gradient-border btn-bg text-center bonus-btn">
			  							<a href="#" class="btn-outline text-silver-gradient">
			  								<span>Claim</span>
			  							</a>
			  						</div>
				  				</div>
				  			</div> 
				  		</div>
	  				</div>
	  				<!-- bonus end -->
			  	</div>
			  </div>
			  <!-- other games start -->
			  <div class="tab-pane fade" id="pills-others" role="tabpanel">
			  	<div class="table-scrollable">
					<table class="table table-responsive">
					   <tbody>
						    <tr>
						      <td class="position-relative" style="width:250px">
					      		<div class="col position-relative">
					      			<div class="border-golden td-profile float-start">
					  					<div class="position-relative profile-bg bg-deep-blue">
					  						<img src="@/assets/profiles/gazal.svg" class="position-absolute"/>
					  					</div>
					  					<span class="position-absolute td-profile-name-left td-profile-name">Alexander</span>
					  				</div>
					      		</div>
					      		<img class="td-vs vs" src="@/assets/icons/vs.svg" />
					      		<div class="col position-relative">
					      			<div class="border-golden td-profile float-end">
					  					<div class="position-relative profile-bg bg-dark-red td-profile-bg">
					  						<img src="@/assets/profiles/gazal.svg" class="position-absolute"/>
					  					</div>
					  					<span class="position-absolute td-profile-name-right td-profile-name">Maya</span>
					  				</div>
					      		</div>
						      </td>
						      <td>
						      	<ul class="list-group-horizontal td-stars text-center">
				  					<li><i class="material-symbols-rounded text-grass">star</i></li>
				  					<li><i class="material-symbols-rounded text-grass">star</i></li>
				  					<li><i class="material-symbols-rounded text-red">star</i></li>
				  					<li><i class="material-symbols-rounded text-disabled">star</i></li>
				  					<li><i class="material-symbols-rounded text-disabled">star</i></li>
				  					<li><i class="material-symbols-rounded text-disabled">star</i></li>
				  					<li><i class="material-symbols-rounded text-disabled">star</i></li>
				  				</ul>
						      </td>
						      <td>
						      	<i class="material-symbols-outlined text-golden-gradient float-start">workspace_premium</i>
						      	<span class="float-start">Prize:1400</span>
						      </td>
						      <td>
						      	<i class="material-symbols-outlined text-golden-gradient float-start mr-2">currency_exchange</i>
						      	<span class="float-start ml-2"> Stake:1000</span>
						      </td>
						      <td>
						      	<i class="material-symbols-outlined text-golden-gradient float-start">
									refresh
								</i>
								<span class="float-start">Rounds:36</span>
						      </td>
						      <td>
						      	<i class="material-symbols-outlined text-golden-gradient float-start">
								timelapse
								</i>
								<span class="float-start">6 Min.</span>
						      </td>
						      <td>
						      	<button class="btn-control btn-filter" type="button">
							        <span class="material-symbols-sharp">
									visibility
									</span>
							    </button>
						      </td>
						    </tr>
						</tbody>
					</table> 
				</div>          
			  </div>
			  <!-- other games end -->
			</div>
    	</div>
    </div>
    <WaitingList :match="joinMatchModal" />
    <NewGame />
</template>
<script>
	import Avatar from 'primevue/avatar';
	import Badge from 'primevue/badge';
	import WaitingList from '@/components/_modals/WaitingList.vue';
	import NewGame from '@/components/_modals/NewGame.vue';
	import avatarColor from '@/composables/avatarColor.js'
	export default{
		setup(){
			const getAvatarColor = avatarColor
			return {getAvatarColor}
		},
		components: {
        	WaitingList,
        	NewGame,
        	Avatar,
        	Badge
       },
		data() {
		    return {
		      waiting: [],
		      isLoaded: false,
		      joinMatchModal: undefined,
		      baseUrl: import.meta.env.VITE_BACKEND_BASE_URL,
		      frontUrl: import.meta.env.VITE_BASE_URL,
		      waitingInterval: undefined,
		      classes:[]
		    }
		},
		methods: {
		    setTitle(title) {
		      this.title = title
		    },
		    joinMatch(id) {
		    	this.joinMatchModal = this.waiting[id];
		    },
			fetchWaiting(){
			    this.waitingInterval = setInterval(() => {
			    	this.$axios.get(this.baseUrl+"/game/default/get-waiting").then((res) => {
			    		res = res.data.params;
			    		this.waiting = res
			    	});
		    	},	2000);
			  }
			},
			created() {
				this.fetchWaiting();
				// console.log(this.classes)
			},
			unmounted(){
				clearInterval(this.waitingInterval);
			}
	};
</script>
<style scoped>
	.profile-bg img {
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
	}
</style>