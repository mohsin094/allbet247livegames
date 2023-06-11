<template>
	<div ref="wListModal" class="modal fade" id="wList" tabindex="-1" aria-labelledby="listLabel" aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered modal-lg">
		    <div class="modal-content">
		        <div class="modal-header w-list-modal-header position-relative">
		          <button type="button" class="btn-close position-absolute" data-bs-dismiss="modal" aria-label="Close"></button>
		        </div>
		        <div class="modal-body px-3">
		        	<div class="modal-body-header">
		        		<div class="col">
		  					<div class="border-golden card-profile">
			  					<div class="position-relative profile-bg bg-purple">
			  						<img src="@/assets/profiles/gazal.svg" class="position-absolute"/>
			  					</div>
			  					<span class="position-absolute modal-profile-name-left card-profile-name small-card-profile-name">Maya</span>
			  				</div>
						</div>
						<div class="col text-end position-relative">
							<span class="position-absolute modal-header-level text-center">
								<span class="text-golden-gradient ">
									LVL.22
								</span>
							</span>
						</div>
		        	</div>
		        	<div class="row mt-3">
		        		<div class="col-4 text-start">Stake:<span class="text-golden-gradient">10087630</span></div>
		        		<div class="col-4 text-start">Stake:<span class="text-golden-gradient">100p25i19</span></div>
		        		<div class="col-4 text-start">Prize:<span class="text-golden-gradient">1400</span></div>
		        	</div>
		        	<div class="row mt-3">
		        		<div class="col-4 text-start">Prize:<span class="text-golden-gradient">1400</span></div>
		        		<div class="col-4 text-start">Prize:<span class="text-golden-gradient">1400</span></div>
		        		<div class="col-4 text-start">Rounds:<span class="text-golden-gradient">3</span></div>
		        	</div>
		        	<div class="row mt-3">
		        		<div class="col-4 text-start">Rounds:<span class="text-golden-gradient">3</span></div>
		        		<div class="col-4 text-start">Stake:<span class="text-golden-gradient">1008900</span></div>
		        		<div class="col-4 text-start">Stake:<span class="text-golden-gradient">100239u0810</span></div>
		        	</div>
		        	<div class="row justify-content-center mt-3">
		        		<div class="position-relative btn-bg btn-bg-larg" style="margin-right:10px">
		        			<a href="#" class="btn-outline text-golden-gradient" @click="closeModal()">
		        				<span>Cancle</span>
		        			</a>
		        		</div>
		        		<div class="position-relative golden-gradient-border btn-bg btn-bg-larg">
		        			<a href="#" class="btn-outline text-golden-gradient" >
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
		methods: {
		    closeModal:function(){
		    	var modalEl = document.getElementById('wList');
	            var modal = Modal.getInstance(modalEl)
	            modal.hide();
		    }
		}
	};
</script>