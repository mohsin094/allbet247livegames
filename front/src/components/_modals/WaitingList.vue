<template>
	<div ref="wListModal" class="modal fade" id="wList" tabindex="-1" aria-labelledby="listLabel" aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered modal-lg">
		    <div class="modal-content">
		        <div class="modal-header w-list-modal-header position-relative">
		          <button type="button" class="btn-close position-absolute" data-bs-dismiss="modal" aria-label="Close"></button>
		        </div>
		        <div v-if="match != undefined" class="modal-body px-3">
		        	<div class="modal-body-header">
		        		<div class="col">
		  					<div class="border-golden card-profile">
			  					<div class="position-relative profile-bg bg-purple">
			  						<img style="width: 50px;" :src="frontUrl+'/assets/images/avatars/'+ match.home.avatar +'.png'" class="position-absolute"/>
			  					</div>
			  					<span class="position-absolute modal-profile-name-left card-profile-name small-card-profile-name">{{match.home.public_name}}</span>
			  				</div>
						</div>
						<div class="col text-end position-relative">
							<span class="position-absolute modal-header-level text-center">
								<span class="text-golden-gradient ">
									LVL.{{match.home.lvl}}
								</span>
							</span>
						</div>
		        	</div>
		        	<div class="row mt-3">
		        		<div class="col-4 text-center">Stake:<span class="text-golden-gradient">{{match.stake}}</span></div>
		        		<div class="col-4 text-center">Speed:<span class="text-golden-gradient">{{match.timeframe}}</span></div>
		        		<div class="col-4 text-center">Rounds:<span class="text-golden-gradient">{{match.round}}</span></div>
		        		
		        		
		        	</div>
		        	<div class="row justify-content-center mt-3">
		        		<div class="position-relative btn-bg btn-bg-larg" style="margin-right:10px">
		        			<a href="#" class="btn-outline text-golden-gradient" @click="closeModal()">
		        				<span>Cancle</span>
		        			</a>
		        		</div>
		        		<div class="position-relative golden-gradient-border btn-bg btn-bg-larg">
		        			<a @click="join" href="#" class="btn-outline text-golden-gradient" >
		        				<span>Join</span>
		        			</a>
		        		</div>
		        	</div>
		        </div>
		    </div>
		</div>
	</div>
</template>
<script>
	import { Modal } from 'bootstrap';
	export default {
		props: ['match'],
		data: function() {
			return {

				frontUrl: import.meta.env.VITE_BASE_URL
			}
		},
		methods: {
			join: function() {
				this.$axios.get(import.meta.env.VITE_BACKEND_BASE_URL+"/game/default/join", {params: {matchId: this.match.id}}).then((res) => {
					res = res.data;

					if(res.result) {
						this.$router.push({name: 'backgammon', params: {matchId: this.match.id}});
					}
				});
				this.closeModal();
			},
		    closeModal:function(){
		    	var modalEl = document.getElementById('wList');
	            var modal = Modal.getInstance(modalEl)
	            modal.hide();
		    }
		}
	};
</script>