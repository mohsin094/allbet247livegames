<template>
	<div class="row d-none">
		<div class="col-md-12 bg-dark-gradient px-3 mt-5" style="padding-top:20px">
			<div class="row">
				<div class="col-md-5">
					<div :class="!this.isMobile ? 'position-relative' : ''">
		              <span class="input-icon input-icon-left position-absolute" v-if="!this.isMobile">
		                <span class=" material-symbols-outlined">attach_money</span>
		              </span>
		              <FormKit class="position-absolute"
		              		v-model="amount"
		                  type="text"
		                  name="amount"
		                  placeholder="Amount"
		                  validation="required"
		                />
            		</div>
				</div>
				<div class="col-md-5">
					<div :class="!this.isMobile ? 'position-relative' : ''">
		              <span class="input-icon input-icon-left position-absolute" v-if="!this.isMobile">
		                <span class=" material-symbols-outlined">send_money</span>
		              </span>
						<FormKit
						v-model="from"
						  placeholder="Select Option"
						  type="select"
						  :options="options"
						/>
					</div>
				</div>
				<div class="col-md-2">
					<button @click="transfer" type="button" class="btn btn-golden text-dark login-btn">Transfer</button>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default{
		data(){
			return{
				amount: '',
				from: '',
				options:[
					{label:'From Main Account To Poker Account',value:'main'},
					{label:'From Poker Account To Main Account',value:'poker'},
				],
			}
		},
		methods: {
			transfer() {
				if(this.from != '' && this.amount != '') {
					const url = import.meta.env.VITE_BACKEND_BASE_URL+'/financial/default/transfer?from='+this.from+'&amount='+this.amount;
					this.$axios.get(url).then(res => {
						res = res.data;
						this.$emit('update-balance');
						this.amount = '';
						this.from = '';
					});
				}
			}
		}
	}
</script>