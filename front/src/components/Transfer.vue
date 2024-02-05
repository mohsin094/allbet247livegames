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
						  placeholder="Select Option"
						  type="select"
						  :options="options"
						/>
					</div>
				</div>
				<div class="col-md-2">
					<button type="button" class="btn btn-golden text-dark login-btn">Transfer</button>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default{
		data(){
			return{
				options:[
					{label:'From',value:'from'},
					{label:'To',value:'to'},
				],
			}
		}
	}
</script>