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
								  placeholder="Select Method"
								  type="select"
								  :options="methods"
								/>
							</div>
						</div>
						<div class="col-md-2">
							<button type="button" class="btn btn-golden text-dark login-btn">Continue</button>
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
				methods:[
					{label:'Paypal',value:'paypal'},
					{label:'Binance',value:'binance'},
					{label:'Credit card',value:'creditcard'},
				],
			}
		}
	}
</script>