<template>
	<div class="d-block">
		<div class="row mt-3" >
			<div class="container">
				<div class="col-md-12 bg-dark-gradient px-3" style="padding-top:20px">
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
				                <span class=" material-symbols-outlined">payments</span>
				              </span>
								<FormKit
								v-model="method"
								  placeholder="Select Method"
								  type="select"
								  :options="methods"
								/>
							</div>
						</div>
						<div class="col-md-2">
							<button @click="deposit" type="button" class="btn btn-golden text-dark login-btn">Continue</button>
						</div>
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
				amount: '',
				method: '',
				methods:[
					{label:'Paypal',value:'paypal'},
					// {label:'Binance',value:'binance'},
					{label:'Credit Card & Debit Card',value:'creditcard'},
				],
			}
		},
		methods: {
			deposit() {
				if(this.method != '' && this.amount != '') {
					let url = '';
					switch(this.method) {
						case 'paypal':

						break;
						case 'creditcard':

							url = import.meta.env.VITE_BACKEND_BASE_URL+'/payment/stripe/new-transaction?amount='+this.amount;

						break;
					} 
					this.$axios.get(url).then(res => {
						res = res.data;

						switch(this.method) {
						case 'paypal':

						break;
						case 'creditcard':
							window.location = res.params.url;
						break;
					} 
					});
				}
			}
		}
	}
</script>