<template>
	<div class="row">
		<!--  <Dialog v-if="this.$environment = 'demo'" v-model:visible="visible" header="Please note!" :style="{ width: '50rem' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }" position="topleft" :modal="true" :draggable="false">
            <p class="m-0">
               This section does not function in the demo version,and it is only provided for demonstration purposes.
            </p>
            <template #footer>
                <Button label="Ok" icon="pi pi-check" @click="visible = false" autofocus />
            </template>
        </Dialog> -->
		<div :class="['col px-3',this.isMobile ? 'text-center mb-2' : '']">
			<button class="btn-thin btn-active bg-dark-gradient" id="deposit" @click="getDepositMethods()">
				<span class="text-golden-gradient" id="text-deposit">
					<!-- <img src="@/assets/icons/deposit.svg" style="margin-top:-6px;margin-right:4px"/> -->
					Deposit
				</span>
			</button>
		</div>
		<div :class="['col px-3',this.isMobile ? 'text-center' : 'text-end']">
			<button class="btn-thin bg-dark-gradient" id="withdrawal" @click="getWithdrawalMethods()">
				<span class="text-gray" id="text-withdraw">
					<!-- <img src="@/assets/icons/withdrawal.svg" style="margin-top:-6px;margin-right:4px"/> -->
					Withdrawal
				</span>
			</button>
		</div>
	</div>
	<div class="row mt-5">
		<div class="col-md-3 col-sm-12 mb-2">
			<div class="credit-card-active position-relative">
				<div class="credit-card bg-balance">
					<h2 class="text-center text-golden-gradient" style="padding-top: 90px">$ 3398.2</h2>
					<h6 class="text-center">8% Growth last week</h6>
				</div>
			</div>
			
		</div>
		<div class="col-md-3 col-sm-12 mb-2">
			<div class="position-relative" >
				<div class="credit-card">
					<img src="@/assets/images/paypal.png" width="100%" height="100%">
				</div>
			</div>
		</div>
		<div class="col-md-3 col-sm-12 mb-2">
			<div class="position-relative">
				<div class="credit-card">
					<img src="@/assets/images/binance.png" width="100%" height="100%">
				</div>
			</div>
		</div>
		<div class="col-md-3 col-sm-12 mb-2">
			<div class="position-relative">
				<div class="credit-card">
					<img src="@/assets/images/creditcard.png" width="100%" height="100%">
				</div>
			</div>
		</div>
	</div>
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
			                  validation="required|"
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
	<div class="row mt-5">
		<div class="col px-3">
			<h4>Transactions History</h4>
		</div>
		<div class="col px-3 text-end">
			<button class="btn-control btn-filter" type="button">
				<span class="material-symbols-rounded text-golden-gradient"> tune </span>
			</button>
		</div>
	</div>
	<div class="row mt-5">
		<div class="col-6 px-3">
			<div class="dropdown">
			  <button class="btn btn-dark dropdown-toggle" type="button" id="dropdown" data-bs-toggle="dropdown" aria-expanded="false">
			    10
			  </button>
			  <ul class="dropdown-menu" aria-labelledby="draopdown">
			    <li><a class="dropdown-item" href="#">10</a></li>
			    <li><a class="dropdown-item" href="#">20</a></li>
			    <li><a class="dropdown-item" href="#">30</a></li>
			  </ul>
			</div>
		</div>
		<div class="col-6 px-3 position-relative">
			<div class="input-group search-game float-end">
				<input type="text" class="form-control" placeholder="Search..." aria-label="" aria-describedby="button-addon2"><button class="btn btn-outline-secondary" type="button" id="search-addon">
					<i class="material-symbols-rounded">search</i>
				</button>
			</div>
		</div>
	</div>
	<div class="row mt-3">
		<div class="table-scrollable mt-3">
			<table class="table table-responsive dark-tbl text-center">
				<thead>
					<th>Payment Method</th>
					<th>Amount</th>
					<th>Status</th>
					<th>Date Time</th>
					<th>Payment Type</th>
				</thead>
				<tbody>
					<tr>
						<td>
							<img src="@/assets/icons/arrow-down.svg"/>
							Deposit
						</td>
						<td>1000</td>
						<td><button class="btn btn-def btn-danger">Cancle</button></td>
						<td>15 Des.12 pm</td>
						<td><img src="@/assets/icons/tether.svg"/></td>
					</tr>
					<tr>
						<td>
							<img src="@/assets/icons/arrow-up.svg"/>
							Widthrawal
						</td>
						<td>1000</td>
						<td><button class="btn btn-def btn-info">Waiting</button></td>
						<td>15 Des.12 pm</td>
						<td><img src="@/assets/icons/btc.svg"/></td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>
<script>
	import Dialog from 'primevue/dialog';
	import Button from 'primevue/button';
	import 'primeicons/primeicons.css'
	export default{
		name:'cashier',
		components:{
			Dialog,
			Button
		},
		data(){
			return{
				payment:'',
				methods:[
					{label:'Paypal',value:'paypal'},
					{label:'Binance',value:'binance'},
					{label:'Credit card',value:'creditcard'},
				],
            	visible: false
			}

		},
		created(){
            this.visible = true;
		},
		methods:{
			getPaymentMethod(name){

			},
			getWithdrawalMethods(){
				document.getElementById("withdrawal").classList.add("btn-active");
				document.getElementById("deposit").classList.remove("btn-active");
				document.getElementById("text-deposit").classList.remove("text-golden-gradient");
				document.getElementById("text-deposit").classList.add("text-gray");
				document.getElementById("text-withdraw").classList.add("text-golden-gradient");
				document.getElementById("text-withdraw").classList.remove("text-gray");
				this.payment = 'withdraw'
			},
			getDepositMethods(){
				document.getElementById("deposit").classList.add("btn-active");
				document.getElementById("withdrawal").classList.remove("btn-active");
				document.getElementById("text-deposit").classList.add("text-golden-gradient");
				document.getElementById("text-deposit").classList.remove("text-gray");
				document.getElementById("text-withdraw").classList.remove("text-golden-gradient");
				document.getElementById("text-withdraw").classList.add("text-gray");
				this.payment= 'deposit'
			}
		}
	}
</script>
<style scope>
	.p-dialog{
		border:2px solid #BF5656;
	}
	.p-dialog .p-dialog-header .p-dialog-title{
		color:#BF5656;
	}
	.p-button {
	  color: #fff;
	  background: #202930 !important;
	  border: none !important;
	  border-radius: 5px;
	}
	.p-button:focus{
		box-shadow: none;
	}
</style>