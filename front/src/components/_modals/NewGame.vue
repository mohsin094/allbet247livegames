<template>
	<div ref="newGame" class="modal fade" id="newGame" tabindex="-1" aria-labelledby="gameLabel" aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered">
		    <div class="modal-content">
		        <div class="modal-header">
			        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
			    </div>
		        <div class="modal-body text-start">
		        	<div class="position-relative input-wrapper">
		              	<span class="select-input-icon input-icon-left position-absolute">
		                	<span class="material-symbols-outlined">currency_exchange</span>
		              	</span>
			        	<FormKit v-if="data != undefined"
			        	  v-model="stake"
			        	  placeholder="Select stake"	
						  type="select"
						  label="Stake"
						  :options="stakes"
						/>
					</div>
					<div class="position-relative input-wrapper">
		              	<span class="select-input-icon input-icon-left position-absolute">
		                	<span class="material-symbols-outlined">refresh</span>
		              	</span>
						<FormKit v-if="data != undefined"
						  v-model="round"
						  placeholder="Select round"
						  type="select"
						  label="Rounds"
						  :options="rounds"
						/>
					</div>
					<div class="position-relative input-wrapper">
		              	<span class="select-input-icon input-icon-left position-absolute">
		                	<span class="material-symbols-outlined">timelapse</span>
		              	</span>
						<FormKit v-if="data != undefined"
						  v-model="timeframe"
						  placeholder="Select timeframe"
						  type="select"
						  label="Timeframes"
						  :options="timeframes"
						/>
					</div>
					<p class="text-danger">{{error}}</p>
					<div class="row justify-content-center">
						<button type="button" class="btn btn-golden text-dark login-btn" @click="addGame()">Add Game</button>
					</div>

		        </div>
		    </div>
		</div>
	</div>
</template>
<script>
	export default{
		data(){
			return{
				data:undefined,
				stakes:[],
				rounds:[],
				timeframes:[],
				stake:'',
				round:'',
				timeframe:'',
				error:''
			}
		},
		created(){
			this.getConfigs()
		},
		methods:{
			getConfigs:function(){
				let instance = this
				let url = import.meta.env.VITE_BACKEND_BASE_URL+'/game/default/get-configs'
				this.$axios.get(url).then((response) => {
					response = response.data
					if(response.result){
						this.data = response.params
						this.data.stakes.forEach(function(item,index){
							instance.stakes.push({label:item.stake,value:item._id})
						});
						this.data.rounds.forEach(function(item,index){
							instance.rounds.push({label:item.round,value:item._id})
						});
						this.data.timeframes.forEach(function(item,index){
							instance.timeframes.push({label:item.timeframe,value:item._id})
						});
					}
				})
			},
			addGame:function(){
				let instance = this
				let url = import.meta.env.VITE_BACKEND_BASE_URL+'/game/default/new'
				this.$axios.post(url,{
					round_id:this.round,
					stake_id:this.stake,
					timeframe_id:this.timeframe
				}).then((response) => {
					response = response.data
					if(response.result){

					}else{
						this.error = response.error
					}
				})
			}
		}
	}
</script>