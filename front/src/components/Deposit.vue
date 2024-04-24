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
							<div v-show="method == 'paypal'" id="paypal-button-container"></div>
							<button  v-show="method != 'paypal'" @click="deposit" type="button" class="btn btn-golden text-dark login-btn">Continue</button>
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
				paypalClientId: '',
			}
		},
		watch: {
			method() {
				if(this.method == 'paypal' && this.paypalClientId == '') {
					const url = import.meta.env.VITE_BACKEND_BASE_URL+'/payment/paypal/get-client-id';
					this.$axios.get(url).then(res => {
						res = res.data;
						this.paypalClientId = res.params.id;
						let recaptchaScript = document.createElement('script')
				      	recaptchaScript.setAttribute('src', 'https://www.paypal.com/sdk/js?client-id='+ this.paypalClientId +'&currency=USD&components=buttons&disable-funding=card,sepa,giropay,paylater,sofort');
				      	document.head.appendChild(recaptchaScript);

				      	setTimeout(function(){

				      	window.paypal

						  .Buttons({

						    style: {

						      shape: "rect",

						      layout: "vertical",

						    },

						    async createOrder() {

						      try {

						        const response = await fetch("/api/orders", {

						          method: "POST",

						          headers: {

						            "Content-Type": "application/json",

						          },

						          // use the "body" param to optionally pass additional order information

						          // like product ids and quantities

						          body: JSON.stringify({

						            amount: this.amount

						          }),

						        });


						        const orderData = await response.json();


						        if (orderData.id) {

						          return orderData.id;

						        } else {

						          const errorDetail = orderData?.details?.[0];

						          const errorMessage = errorDetail

						            ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`

						            : JSON.stringify(orderData);


						          throw new Error(errorMessage);

						        }

						      } catch (error) {

						        console.error(error);

						        resultMessage(`Could not initiate PayPal Checkout...<br><br>${error}`);

						      }

						    },

						    async onApprove(data, actions) {

						      try {

						        const response = await fetch(`/api/orders/${data.orderID}/capture`, {

						          method: "POST",

						          headers: {

						            "Content-Type": "application/json",

						          },

						        });


						        const orderData = await response.json();

						        // Three cases to handle:

						        //   (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()

						        //   (2) Other non-recoverable errors -> Show a failure message

						        //   (3) Successful transaction -> Show confirmation or thank you message


						        const errorDetail = orderData?.details?.[0];


						        if (errorDetail?.issue === "INSTRUMENT_DECLINED") {

						          // (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()

						          // recoverable state, per https://developer.paypal.com/docs/checkout/standard/customize/handle-funding-failures/

						          return actions.restart();

						        } else if (errorDetail) {

						          // (2) Other non-recoverable errors -> Show a failure message

						          throw new Error(`${errorDetail.description} (${orderData.debug_id})`);

						        } else if (!orderData.purchase_units) {

						          throw new Error(JSON.stringify(orderData));

						        } else {

						          // (3) Successful transaction -> Show confirmation or thank you message

						          // Or go to another URL:  actions.redirect('thank_you.html');

						          const transaction =

						            orderData?.purchase_units?.[0]?.payments?.captures?.[0] ||

						            orderData?.purchase_units?.[0]?.payments?.authorizations?.[0];

						          resultMessage(

						            `Transaction ${transaction.status}: ${transaction.id}<br><br>See console for all available details`,

						          );

						          console.log(

						            "Capture result",

						            orderData,

						            JSON.stringify(orderData, null, 2),

						          );

						        }

						      } catch (error) {

						        console.error(error);

						        resultMessage(

						          `Sorry, your transaction could not be processed...<br><br>${error}`,

						        );

						      }

						    },

						  })

						  .render("#paypal-button-container");
				      	}, 5000);
					});
				}
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