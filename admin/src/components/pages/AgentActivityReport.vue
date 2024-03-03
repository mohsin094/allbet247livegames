<template>
<h4>Agents Activities Report</h4>

<div class="card mb-4">
	<div class="card-body">
		<h5 class="card-title">Daily Revenue</h5>
		<div class="col-md-6 col-12 mb-4">
			<label class="form-label">Date Range</label>
			<div class="input-group input-daterange">
				<input class="form-control custom-date-picker" id="date-from-revenue" placeholder="MM/DD/YYYY" type="text"> <span class="input-group-text">to</span> <input id="date-to-revenue" class="form-control custom-date-picker" placeholder="MM/DD/YYYY" type="text">
				<button class="btn btn-outline-primary waves-effect" @click="fetchDailyRevenue" type="button" id="button-addon2">Apply</button>
			</div>
		</div>
		<div class="table-responsive text-nowrap">
			<table class="table">
				<thead>
					<tr>
						
						<th>User</th>
						
						<th>Total Revenue</th>
						
					</tr>
				</thead>
				<tbody class="table-border-bottom-0">
					<tr v-for="rep in dailyRevenue">
						<td>
							{{rep.user.public_name}}
						</td>
						<td>
							{{rep.totalRevenue}}
						</td>
						
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</div>

<div class="card mb-4">
	<div class="card-body">
		<h5 class="card-title">Weekly Revenue</h5>
		<div class="table-responsive text-nowrap">
			<table class="table">
				<thead>
					<tr>
						<th>User</th>
						<th>Total Revenue</th>
					</tr>
				</thead>
				<tbody class="table-border-bottom-0">
					<tr v-for="rep in weeklyRevenue">
						<td>
							{{rep.user.public_name}}
						</td>
						<td>
							{{rep.totalRevenue}}
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</div>

<div class="card mb-4">
	<div class="card-body">
		<h5 class="card-title">Monthly Revenue</h5>
		<div class="table-responsive text-nowrap">
			<table class="table">
				<thead>
					<tr>
						
						<th>User</th>
						
						<th>Total Revenue</th>
						
					</tr>
				</thead>
				<tbody class="table-border-bottom-0">
					<tr v-for="rep in monthlyRevenue">
						<td>
							{{rep.user.public_name}}
						</td>
						<td>
							{{rep.totalRevenue}}
						</td>
						
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</div>


<div class="card mb-4">
	<div class="card-body">
		<h5 class="card-title">Daily Deposit/Withdrawal</h5>
		<div class="col-md-6 col-12 mb-4">
			<label class="form-label">Date Range</label>
			<div class="input-group input-daterange">
				<input class="form-control custom-date-picker" id="date-from-report" placeholder="MM/DD/YYYY" type="text"> <span class="input-group-text">to</span> <input id="date-to-report" class="form-control custom-date-picker" placeholder="MM/DD/YYYY" type="text">
				<button class="btn btn-outline-primary waves-effect" @click="fetchDailyReport" type="button" id="button-addon2">Apply</button>
			</div>
		</div>

		<div class="table-responsive text-nowrap">
			<table class="table">
				<thead>
					<tr>
						
						<th>User</th>
						
						<th>Deposit</th>
						<th>Withdrawal</th>
						
					</tr>
				</thead>
				<tbody class="table-border-bottom-0">
					<tr v-for="rep in daily">
						<td>
							{{rep.operator.public_name}}
						</td>
						<td>
							{{rep.deposit}}
						</td>
						<td>{{rep.withdrawal}}</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</div>

<div class="card mb-4">
	<div class="card-body">
		<h5 class="card-title">Weekly Deposit/Withdrawal</h5>
		<div class="table-responsive text-nowrap">
			<table class="table">
				<thead>
					<tr>
						
						<th>User</th>
						<th>Deposit</th>
						<th>Withdrawal</th>
						
					</tr>
				</thead>
				<tbody class="table-border-bottom-0">
					<tr v-for="rep in weekly">
						<td>
							{{rep.operator.public_name}}
						</td>
						<td>
							{{rep.deposit}}
						</td>
						<td>{{rep.withdrawal}}</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</div>

<div class="card">
	<div class="card-body">
		<h5 class="card-title">Monthly Deposit/Withdrawal</h5>
		<div class="table-responsive text-nowrap">
			<table class="table">
				<thead>
					<tr>
						
						<th>User</th>
						
						<th>Deposit</th>
						<th>Withdrawal</th>
						
					</tr>
				</thead>
				<tbody class="table-border-bottom-0">
					<tr v-for="rep in monthly">
						<td>
							{{rep.operator.public_name}}
						</td>
						<td>
							{{rep.deposit}}
						</td>
						<td>{{rep.withdrawal}}</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</div>

</template>
<script>
	export default {
		data()
		{
			return {				
				weekly: [],
				daily: [],
				monthly: [],
				dailyRevenue: [],
				weeklyRevenue: [],
				monthlyRevenue: [],
				depositWithdrawalDate: ''
			}
		},
		mounted()
		{
			this.fetchReport();
			this.fetchRevenue();

			$('.custom-date-picker').datepicker();
		},
		methods: {
			fetchDailyReport()
			{
				const from = $("#date-from-report").val();
				const to = $("#date-to-report").val();
				if(from != '' && to != '') {
					this.$axios.get(import.meta.env.VITE_BACKEND_BASE_URL + "/financial/admin/get-agent-activity-amount-by-date?date="+from+"&toDate="+to).then((res) => {
						res = res.data;
						if(res.result) {
							this.daily = res.params;
						}
					});
				}else {
					this.fetchReport();
				}
				
				
			},
			fetchDailyRevenue()
			{
				const from = $("#date-from-revenue").val();
				const to = $("#date-to-revenue").val();
				if(from != '' && to != '') {
					this.$axios.get(import.meta.env.VITE_BACKEND_BASE_URL + "/financial/admin/get-agent-activity-revenue-by-date?date="+from+"&toDate="+to).then((res) => {
						res = res.data;
						if(res.result) {
							this.dailyRevenue = res.params;
						}
					});
				}else {
					this.fetchRevenue();
				}
				
				
			},
			fetchReport()
			{
				this.$axios.get(import.meta.env.VITE_BACKEND_BASE_URL + "/financial/admin/get-agent-activity-amount").then((res) => {
					res = res.data;
					if(res.result) {
						this.weekly = res.params.weekly;
						this.monthly = res.params.monthly;
						this.daily = res.params.daily;
					}
				});
			},
			fetchRevenue()
			{
				this.$axios.get(import.meta.env.VITE_BACKEND_BASE_URL + "/financial/admin/get-agent-activity-revenue").then((res) => {
					res = res.data;
					if(res.result) {
						this.weeklyRevenue = res.params.weekly;
						this.monthlyRevenue = res.params.monthly;
						this.dailyRevenue = res.params.daily;
					}
				})
			}
			
		}
	}
</script>
