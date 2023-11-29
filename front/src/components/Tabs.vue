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
			                <span class="font-bold white-space-nowrap text-golden-shine ms-1 me-1 mt-2 float-start ">Waiting listt</span>
					        <Badge value="2" class="p-overlay-badge golden-gradient-border"/>    
			            </div>
			        </template>
			        <p class="m-0">
			            ;j;sf;jsLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
			            consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
			        </p>
			    </TabPanel>
			    <TabPanel>
			        <template #header>
			            <div class="flex align-items-center gap-2">
			            	<div class="icon-border float-start">
					            <div class="icon-bg">
					                <span class="material-symbols-outlined text-golden-shine">
									other_admission
									</span>
					            </div>
			        		</div>
			                <span class="font-bold white-space-nowrap text-golden-shine ms-1 me-1 mt-2 float-start ">Other games</span>
					        <Badge value="5" class="p-overlay-badge bg-golden-gradient"/>    
			            </div>
			        </template>
			        <p class="m-0">
			            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
			            consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
			        </p>
			    </TabPanel>
			</TabView>
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
        	Badge
       },
		data() {
		    return {
		      title: "Waiting list",
		      waiting: [],
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
		    fetchWaiting() {
		    	this.waitingInterval = setInterval(() => {
			    	this.$axios.get(this.baseUrl+"/game/default/get-waiting").then((res) => {
			    		res = res.data.params;
			    		// console.log(res)
			    		this.waiting = res;
			    		// console.log(this.waiting)
			    	});
		    	},	2000);
		    }
		},
		created() {
			this.fetchWaiting();
			// console.log(this.classes)
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