<template>
	<div class="d-none">
		<div class="row mt-3" >
			<div class="container">
				<div class="col-md-12 bg-dark-gradient px-3" style="padding-top:20px">
					<div class="row">
						<div class="col-md-3">
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
						<div class="col-md-3">
							<div :class="!this.isMobile ? 'position-relative' : ''">
				              <span class="input-icon input-icon-left position-absolute" v-if="!this.isMobile">
				                <span class=" material-symbols-outlined">payments</span>
				              </span>
								<FormKit
								  placeholder="Select Gateway"
								  type="select"
								  :options="gateways"
								/>
							</div>
						</div>
						<div class="col-md-4">
							<div :class="!this.isMobile ? 'position-relative' : ''">
				              <span class="input-icon input-icon-left position-absolute" v-if="!this.isMobile">
				                <span class=" material-symbols-outlined">person</span>
				              </span>
				              <FormKit class="position-absolute" v-model="account"
				                  type="text"
				                  name="acntcount"
				                  placeholder="Account Number/Email"
				                  validation="required"
				                />
		            		</div>
						</div>
						<div class="col-md-2">
							<button type="button" class="btn btn-golden text-dark login-btn">Withdraw</button>
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
				amount:'',
				gateway:'',
				account:'',
				gateways:[
					{label:'Credit Card',value:'creditcard'},
					{label:'Paypal',value:'paypal'},
				],
			}
		}
	}
</script>