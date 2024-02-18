<template>
<h4>Agents Activities Report</h4>
<div class="card mb-4">
	<div class="card-body">
		<h5 class="card-title">Daily</h5>
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
		<h5 class="card-title">Weekly</h5>
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
		<h5 class="card-title">Monthly</h5>
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
				monthly: []
			}
		},
		mounted()
		{
			this.fetchReport();
		},
		methods: {
			fetchReport()
			{
				this.$axios.get(import.meta.env.VITE_BACKEND_BASE_URL + "/financial/admin/get-agent-activity-amount").then((res) => {
					res = res.data;
					if(res.result) {
						this.weekly = res.params.weekly;
						this.monthly = res.params.monthly;
						this.daily = res.params.daily;
					}
				})
			}
		}
	}
</script>
