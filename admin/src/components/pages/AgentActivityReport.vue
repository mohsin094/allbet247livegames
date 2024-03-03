<template>
<h4>Agents Activities Report</h4>

<div class="card mb-4">
	<div class="card-body">
		<h5 class="card-title">Daily Revenue</h5>
		<div class="col-md-6 col-12 mb-4">
	        <label class="form-label">Pick a Date</label>
	        <input  @focusout="fetchDailyRevenue" type="text" placeholder="MM/DD/YYYY" class="form-control custom-date-picker" />
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
	        <label class="form-label">Pick a Date</label>
	        <input @focusout="fetchDailyReport" type="text" placeholder="MM/DD/YYYY" class="form-control custom-date-picker" />
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
			fetchDailyReport(event)
			{
				if(event.target.value != '') {
					this.$axios.get(import.meta.env.VITE_BACKEND_BASE_URL + "/financial/admin/get-agent-activity-amount-by-date?date="+event.target.value).then((res) => {
						res = res.data;
						if(res.result) {
							this.daily = res.params;
						}
					});
				}else {
					this.fetchReport();
				}
				
				
			},
			fetchDailyRevenue(event)
			{
				if(event.target.value != '') {
					this.$axios.get(import.meta.env.VITE_BACKEND_BASE_URL + "/financial/admin/get-agent-activity-revenue-by-date?date="+event.target.value).then((res) => {
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
