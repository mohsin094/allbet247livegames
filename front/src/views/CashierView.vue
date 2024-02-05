<template>
	<div class="row" v-if="this.isMobile">
		<div class="btn-group mr-2" role="group" aria-label="First group">
	    <button type="button" class="btn bg-dark-gradient" id="deposit" @click="getDepositMethods()">
	    	<span class="text-golden-gradient" id="text-deposit">
				Deposit
			</span>
	    </button>
	    <button type="button" class="btn bg-dark-gradient" id="transfer" @click="transferMoney()">
	    	<span class="text-gray" id="text-transfer">
				Transfer
			</span>
	    </button>
	    <button type="button" class="btn bg-dark-gradient" id="withdraw" @click="getWithdrawalMethods()">
	    	<span class="text-gray" id="text-withdraw">
				Withdrawal
			</span>
	    </button>
	  	</div>
	</div>
	<div v-else class="row">
		<!--  <Dialog v-if="this.$environment = 'demo'" v-model:visible="visible" header="Please note!" :style="{ width: '50rem' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }" position="topleft" :modal="true" :draggable="false">
            <p class="m-0">
               This section does not function in the demo version,and it is only provided for demonstration purposes.
            </p>
            <template #footer>
                <Button label="Ok" icon="pi pi-check" @click="visible = false" autofocus />
            </template>
        </Dialog> -->
      <div class="col-md-4">
      	<div class="bg-dark-gradient py-3 text-center rounded-3">
	      	<button class="btn-thin btn-active bg-dark-gradient" id="deposit" @click="getDepositMethods()">
					<span class="text-golden-gradient" id="text-deposit">
						<!-- <img src="@/assets/icons/deposit.svg" style="margin-top:-6px;margin-right:4px"/> -->
						Deposit
					</span>
				</button>
      	</div>
      </div>
      <div class="col-md-4">
      	<div class="bg-dark-gradient py-3 text-center rounded-3">
	      	<button class="btn-thin bg-dark-gradient" id="transfer" @click="transferMoney()">
					<span class="text-gray" id="text-transfer">
						<!-- <img src="@/assets/icons/withdrawal.svg" style="margin-top:-6px;margin-right:4px"/> -->
						Transfer
					</span>
				</button>
      	</div>
      </div>  
      <div class="col-md-4">
      	<div class="bg-dark-gradient py-3 text-center rounded-3">
	      	<button class="btn-thin bg-dark-gradient" id="withdrawal" @click="getWithdrawalMethods()">
					<span class="text-gray" id="text-withdraw">
						<!-- <img src="@/assets/icons/withdrawal.svg" style="margin-top:-6px;margin-right:4px"/> -->
						Withdrawal
					</span>
				</button>
      	</div>
      </div>
	</div>
	<div class="row mt-5">
			<div class="col-md-3 col-sm-12 mb-2">
				<div class="credit-card-active position-relative">
					<div class="credit-card bg-balance">
						<h2 class="text-center text-golden-gradient" style="padding-top: 90px">$ {{$user.data.balance.toLocaleString()}}</h2>
						<h6 class="text-center">Poker Balance: $ {{pokerBalance.toLocaleString()}}</h6>
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
	<Deposit @update-balance="fetchPokerBalance" id="deposit-block"/>
	<Transfer @update-balance="fetchPokerBalance" id="transfer-block"/>
	<Withdraw @update-balance="fetchPokerBalance" id="Withdraw-block" />
	<Transactions/>

</template>
<script>
	import Dialog from 'primevue/dialog';
	import Button from 'primevue/button';
	import 'primeicons/primeicons.css';
	import Deposit from '@/components/Deposit.vue';
	import Transactions from '@/components/Transactions.vue';
	import Transfer from '@/components/Transfer.vue';
	import Withdraw from '@/components/Withdraw.vue';
	export default{
		name:'cashier',
		components:{
			Dialog,
			Button,
			Deposit,
			Transactions,
			Transfer,
			Withdraw
		},
		data(){
			return{
				payment:'',
            	visible: false,
            	pokerBalance: 0,
			}

		},
		created(){
            this.visible = true;
		},
		mounted() {
			this.fetchPokerBalance();
		},
		methods:{
			fetchPokerBalance() {
				const url = import.meta.env.VITE_BACKEND_BASE_URL+'/poker/default/get-balance';
				this.$axios.get(url).then(res => {
					res = res.data;
					this.pokerBalance = res.params.balance;
				});
			},
			getPaymentMethod(name){

			},
			getWithdrawalMethods(){
				document.getElementById("text-transfer").setAttribute("class",'text-gray');
				document.getElementById("text-deposit").setAttribute("class",'text-gray');
				document.getElementById("text-withdraw").setAttribute("class",'text-golden-gradient');

				document.getElementById("transfer-block").setAttribute("class",'d-none')
				document.getElementById("deposit-block").setAttribute("class",'d-none')
				document.getElementById("Withdraw-block").setAttribute("class",'d-block')

				document.getElementById("withdrawal").classList.add("btn-active");
				document.getElementById("deposit").classList.remove("btn-active");
				document.getElementById("transfer").classList.remove("btn-active");
				this.payment = 'withdraw'
			},
			getDepositMethods(){
				document.getElementById("text-transfer").setAttribute("class",'text-gray');
				document.getElementById("text-deposit").setAttribute("class",'text-golden-gradient');
				document.getElementById("text-withdraw").setAttribute("class",'text-gray');

				document.getElementById("transfer-block").setAttribute("class",'d-none')
				document.getElementById("deposit-block").setAttribute("class",'d-block')
				document.getElementById("Withdraw-block").setAttribute("class",'d-none')

				document.getElementById("withdrawal").classList.remove("btn-active");
				document.getElementById("deposit").classList.add("btn-active");
				document.getElementById("transfer").classList.remove("btn-active");
				this.payment= 'deposit'
			},
			transferMoney(){
				document.getElementById("text-transfer").setAttribute("class",'text-golden-gradient');
				document.getElementById("text-deposit").setAttribute("class",'text-gray');
				document.getElementById("text-withdraw").setAttribute("class",'text-gray');

				document.getElementById("transfer-block").setAttribute("class",'d-block')
				document.getElementById("deposit-block").setAttribute("class",'d-none')
				document.getElementById("Withdraw-block").setAttribute("class",'d-none')

				document.getElementById("withdrawal").classList.remove("btn-active");
				document.getElementById("deposit").classList.remove("btn-active");
				document.getElementById("transfer").classList.add("btn-active");
				
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