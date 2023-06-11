<template>
	<div class="row">
		<div class="col px-3">
			<button class="btn-thin bg-dark-gradient">
			<span class="text-golden-gradient">
				<img src="@/assets/icons/deposit.svg" style="margin-top:-6px;margin-right:4px"/>
				Deposit
			</span>
			</button>
		</div>
		<div class="col px-3 text-end">
			<button class="btn-thin bg-dark-gradient">
				<span class="text-gray">
					<img src="@/assets/icons/withdrawal.svg" style="margin-top:-6px;margin-right:4px"/>
					Withdrawal
				</span>
			</button>
		</div>
	</div>
	<div class="row mt-5">
		<div class="col-md-3">
			<div class="credit-card-active position-relative">
				<div class="credit-card position-absolute bg-balance">
					<h2 class="text-center text-golden-gradient" style="padding-top: 90px">$ 3398.2</h2>
					<h6 class="text-center">8% Growth last week</h6>
				</div>
			</div>
			
		</div>
		<div class="col-md-3">
			<div class="position-relative">
				<div class="credit-card position-absolute">
					<img src="@/assets/images/paypal.png" width="100%" height="100%">
				</div>
			</div>
		</div>
		<div class="col-md-3">
			<div class="position-relative">
				<div class="credit-card position-absolute">
					<img src="@/assets/images/binance.png" width="100%" height="100%">
				</div>
			</div>
		</div>
		<div class="col-md-3">
			<div class="position-relative">
				<div class="credit-card position-absolute">
					<img src="@/assets/images/creditcard.png" width="100%" height="100%">
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
		<div class="col px-3">
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
		<div class="col px-3 position-relative">
			<div class="input-group search-game position-absolute" style="right:15px;">
				<input type="text" class="form-control" placeholder="Search..." aria-label="" aria-describedby="button-addon2"><button class="btn btn-outline-secondary" type="button" id="search-addon">
					<i class="material-symbols-rounded">search</i>
				</button>
			</div>
		</div>
	</div>
	<div class="row mt-3">
		<div class="table-scrollable">
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
	export default{
		name:'cashier'
	}
</script>