<template>
	<div class="row">
	    <div class="col-md-12 col-xl-12 position-relative">
		    <TabView class="tabview-custom" :scrollable="true">
			    <TabPanel>
			        <template #header>
			            <div class="flex align-items-center gap-2">
			            	<div class="icon-border float-start">
					            <div class="icon-bg">
					                <span class="material-symbols-outlined text-golden-gradient">
									hourglass_bottom
									</span>
					            </div>
			        		</div>
			                <span class="font-bold white-space-nowrap text-golden-shine ms-1 me-1 mt-2 float-start ">Waiting list
			                </span>
					        <Badge :value="Object.values(waiting).length" class="p-overlay-badge golden-gradient-border"/>    
			            </div>
			        </template>
			        <div class="row mb-5">
				  		<div v-if="Object.values(waiting).length > 0" v-for="wkey in Object.keys(waiting)" ref="waitingRef" class="col-md-4 col-sm-6 col-lg-2 px-2 mb-3">
				  			<div :class="['frame small-frame' ,getAvatarColor(waiting[wkey].home.avatar+'.png')]">
					  			<div class="position-relative card">
					  				<div class="row gx-6 small-card-header">
					  					<div class="col">
						  					<div :class="[getAvatarColor(waiting[wkey].home.avatar+'.png'),'card-profile']">
							  					<div class="position-relative profile-bg bg-purple">
							  						<img style="width: 50px;" :src="frontUrl+'/assets/images/avatars/'+ waiting[wkey].home.avatar +'.png'" class="position-absolute"/>
							  					</div>
							  					<span class="position-absolute card-profile-name-left card-profile-name small-card-profile-name">{{waiting[wkey].home.public_name}}</span>
							  				</div>
					  					</div>
					  					<div v-if="waiting[wkey].home.lvl != undefined" class="col text-end position-relative">
					  					<span class="text-golden-gradient position-absolute card-header-level">LVL.{{waiting[wkey].home.lvl}}</span>
					  					</div>
					  				</div>
					  				<div class="row mt-3">
					  					<div class="col-4 text-start">
											<small>Stake:<span class="text-golden-gradient">{{waiting[wkey].stake}}</span></small>
										</div>
									    <div class="col-4 text-center p-0">
									    	<small>Time:<span class="text-golden-gradient">{{waiting[wkey].timeframe}}</span></small>
									    </div>
									    <div class="col-4 text-end">
									    	<small>Rounds:<span class="text-golden-gradient">{{waiting[wkey].round}}</span></small>
									    </div>
					  				</div>
					  				<div class="row mt-3 justify-content-center">
					  					<div class="col-6 text-center">
					  						<div class="position-relative golden-gradient-border btn-bg">
					  							<a @click="joinMatch(waiting[wkey].id)" href="#" class="btn-outline text-golden-gradient" data-bs-toggle="modal" data-bs-target="#wList">
					  								<span>Join</span>
					  							</a>
					  						</div>
					  					</div>
					  				</div>
					  			</div> 
					  		</div>
	  					</div>
		  				<div v-else>
		  					<p class="text-danger">
		  						There is no game. Click the "Play Now" button to start a new game
		  					</p>
		  				</div>
			  		</div>
			    </TabPanel>
			</TabView>
			<div v-if="!this.$isMobile" class="animated-border"  style="top:20px;right: 25px;z-index:1">
		      <button class="animated-border btn default-btn position-absolute" data-bs-toggle="modal" :data-bs-target="$user.data.isGuest ? '#login' : '#newGame'">
		      	<span class="text-golden-gradient">
		      		Play Now
		      	</span>
		      	<span class="material-symbols-outlined float-end text-golden-gradient">stadia_controller</span>
		      </button>
		  	</div>
	    </div>
    </div>
    <WaitingList :match="joinMatchModal" />
    <NewGame />
</template>
<script>
	import { Tab } from 'bootstrap';
	import TabView from 'primevue/tabview';
	import TabPanel from 'primevue/tabpanel';
	import Avatar from 'primevue/avatar';
	import Badge from 'primevue/badge';
	import WaitingList from '@/components/_modals/WaitingList.vue';
	import NewGame from '@/components/_modals/NewGame.vue';
	import avatarColor from '@/composables/avatarColor.js'
	import "primevue/resources/themes/viva-dark/theme.css"; //theme
	import "primevue/resources/primevue.min.css"; //core CSS
	import '@/assets/scss/primevue.scss'
	import Message from 'primevue/message';
	export default{
		setup(){
			const getAvatarColor = avatarColor
			return {getAvatarColor}
		},
		components: {
        	WaitingList,
        	NewGame,
        	TabView,
        	TabPanel,
        	Avatar,
        	Badge,
        	Message
       },
		data() {
		    return {
		      waiting: {},
		      isLoaded: false,
		      joinMatchModal: undefined,
		      baseUrl: import.meta.env.VITE_BACKEND_BASE_URL,
		      frontUrl: import.meta.env.VITE_BASE_URL,
		      // waitingInterval: undefined,
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
			    		res = res.data;
						this.waiting = res.params;
			    	});
		    	},	2000);
		    }
		},
		created() {
			this.fetchWaiting();
		},
		unmounted() {
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