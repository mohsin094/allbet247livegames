<template>
	<h4>User Profile</h4>
	<div class="row">
	<div class="col-xl-4 col-lg-5 col-md-5 order-1 order-md-0">
		<!-- User Card -->
		<div v-if="user != undefined" class="card mb-4">
			<div class="card-body">
				<div class="user-avatar-section">
					<div class="d-flex align-items-center flex-column">
						<img alt="User avatar" class="img-fluid rounded mb-3 pt-1 mt-4" height="100" :src="baseUrl + '/assets/images/avatars/'+user.avatar+'.png'" width="100">
						<div class="user-info text-center">
							<h4 class="mb-2">{{user.public_name}}</h4><span class="badge bg-label-secondary mt-1">{{user.role}}</span>
						</div>
					</div>
				</div>
				
				<p class="mt-4 small text-uppercase text-muted">Details</p>
				<div class="info-container">
					<ul class="list-unstyled">
						<li class="mb-2"><span class="fw-medium me-1">Public Name:</span> <span>{{user.public_name}}</span></li>
						<li class="mb-2 pt-1"><span class="fw-medium me-1">Email:</span> <span>{{user.email}}</span></li>
						<li class="mb-2 pt-1"><span class="fw-medium me-1">Status:</span> <span class="badge" :class="getStatusClass(user.status)">{{user.status}}</span></li>
						<li class="mb-2 pt-1"><span class="fw-medium me-1">Role:</span> <span>{{user.role}}</span></li>
						<li class="mb-2 pt-1"><span class="fw-medium me-1">Balance:</span> <span>{{user.balance}}</span></li>
						<li class="mb-2 pt-1"><span class="fw-medium me-1">Level:</span> <span>{{user.lvl}}</span></li>
						<li v-if="user.agent != undefined" class="mb-2 pt-1"><span class="fw-medium me-1">Agent:</span> <span>{{user.agent.public_name}}</span></li>
						
					</ul>
					
				</div>
			</div>
		</div><!-- /User Card -->
	</div>
	<div class="col-xl-8 col-lg-7 col-md-7 order-0 order-md-1">
		<!-- Project table -->
		<div v-if="user != undefined && (user.role == 'agent' || user.role == 'admin') && agentTransactions != undefined" class="card mb-4">
			<h5 class="card-header">Daily Revenue Share</h5>
			<div class="col-md-6 col-12 mb-4">
				<label class="form-label">Date Range</label>
				<div class="input-group input-daterange">
					<input @blur="fetchAgentTransactionsByDate" class="form-control custom-date-picker" id="date-from-revenue" placeholder="MM/DD/YYYY" type="text"> <span class="input-group-text">to</span> <input id="date-to-revenue" @blur="fetchAgentTransactionsByDate" class="form-control custom-date-picker" placeholder="MM/DD/YYYY" type="text">
				</div>
			</div>
			<div class="table-responsive text-nowrap">
				<table class="table">
					<thead>
						<tr>
							<th>ID</th>
							<th>Amount</th>
							<th>Match ID</th>
						</tr>
					</thead>
					<tbody class="table-border-bottom-0">
						<tr v-for="fin in agentTransactions.daily.transactions">
							<td>
								{{fin._id}}
							</td>
							<td>{{fin.amount}}</td>
							<td>
								{{(fin.source == 'game-engine-match-end') ? fin.source_id : ''}}
							</td>
						</tr>
					</tbody>
				</table>
				<table class="table">
					<tbody class="table-border-bottom-0">
						<tr class="bg-success">
							<td>Total Revenue Share</td>
							<td>{{agentTransactions.daily.totalRevenue}}</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
		<div v-if="user != undefined && (user.role == 'agent' || user.role == 'admin') && agentTransactions != undefined" class="card mb-4">
			<h5 class="card-header">Weekly Revenue Share</h5>
			<div class="table-responsive text-nowrap">
				<table class="table">
					<thead>
						<tr>
							<th>ID</th>
							<th>Amount</th>
							<th>Match ID</th>
						</tr>
					</thead>
					<tbody class="table-border-bottom-0">
						<tr v-for="fin in agentTransactions.weekly.transactions">
							<td>
								{{fin._id}}
							</td>
							<td>{{fin.amount}}</td>
							<td>
								{{(fin.source == 'game-engine-match-end') ? fin.source_id : ''}}
							</td>
						</tr>
					</tbody>
				</table>
				<table class="table">
					<tbody class="table-border-bottom-0">
						<tr class="bg-success">
							<td>Total Revenue Share</td>
							<td>{{agentTransactions.weekly.totalRevenue}}</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
		<div v-if="user != undefined && (user.role == 'agent' || user.role == 'admin') && agentTransactions != undefined" class="card mb-4">
			<h5 class="card-header">Monthly Revenue Share</h5>
			<div class="table-responsive text-nowrap">
				<table class="table">
					<thead>
						<tr>
							<th>ID</th>
							<th>Amount</th>
							<th>Match ID</th>
						</tr>
					</thead>
					<tbody class="table-border-bottom-0">
						<tr v-for="fin in agentTransactions.monthly.transactions">
							<td>
								{{fin._id}}
							</td>
							<td>{{fin.amount}}</td>
							<td>
								{{(fin.source == 'game-engine-match-end') ? fin.source_id : ''}}
							</td>
						</tr>
					</tbody>
				</table>
				<table class="table">
					<tbody class="table-border-bottom-0">
						<tr class="bg-success">
							<td>Total Revenue Share</td>
							<td>{{agentTransactions.monthly.totalRevenue}}</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
		<div v-if="user != undefined && user.role != 'agent'" class="card mb-4">
			<h5 class="card-header">Last 50 Transactions</h5>
			<div class="col-md-6 col-12 mb-4">
				<label class="form-label">Date Range</label>
				<div class="input-group input-daterange">
					<input @blur="fetchTransactionsByDate" class="form-control custom-date-picker" id="date-from-trans" placeholder="MM/DD/YYYY" type="text"> <span class="input-group-text">to</span> <input id="date-to-trans" @blur="fetchTransactionsByDate" class="form-control custom-date-picker" placeholder="MM/DD/YYYY" type="text">
				</div>
			</div>
			<div class="table-responsive text-nowrap">
				<table class="table">
					<thead>
						<tr>
							<th>ID</th>
							<th>User</th>
							<th>Amount</th>
							<th>Type</th>
							<th>Desc.</th>
							<th>Match ID</th>
						</tr>
					</thead>
					<tbody class="table-border-bottom-0">
						<tr v-for="fin in transactions">
							<td>
								{{fin._id.$oid}}
							</td>
							<td v-if="fin.user != null || fin.user != undefined">
								<div class="avatar avatar-md me-2">
		                          <img :src="baseUrl + '/assets/images/avatars/'+fin.user.avatar+'.png'" alt="Avatar" class="rounded-circle">
		                        </div>
								<span class="fw-medium">{{fin.user.public_name}}</span>
							</td>
							<td>{{fin.amount}}</td>
							<td>
								{{fin.type}}
							</td>
							<td>
								{{fin.description}}
								<div v-if="fin.operator != null" class="avatar avatar-md me-2">
		                          <img :src="baseUrl + '/assets/images/avatars/'+fin.operator.avatar+'.png'" alt="Avatar" class="rounded-circle">
		                        </div>
								<span v-if="fin.operator != null" class="fw-medium">{{fin.operator.public_name}}</span>
							</td>
							<td>
								{{(fin.source == 'backend\\modules\\game\\models\\MatchesRepo') ? fin.source_id : ''}}
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div><!-- /Project table -->
		
	</div>
</div>
</template>
<script>
export default {
	data() {
		return {
			user: undefined,
			userId: '',
			baseUrl: import.meta.env.VITE_FRONT_BASE_URL,
			transactions: undefined,
			agentTransactions: undefined
		}
	},
	mounted()
	{
		this.userId = this.$route.query.userId;
		this.fetchUser();
		this.fetchTransactions();
		this.fetchAgentTransactions();

		$('.custom-date-picker').datepicker();
	},
	methods: {
		fetchTransactionsByDate(event)
		{
			const from = $("#date-from-trans").val();
			const to = $("#date-to-trans").val();
			
			if(from != '' && to != '') {
				this.$axios.get(import.meta.env.VITE_BACKEND_BASE_URL + "/financial/admin/list?query="+ this.userId + "&date=" + from + "&toDate=" + to).then((res) => {
					res = res.data;
					if(res.result) {
						this.transactions = res.params;
						setTimeout(() => {
								$('.custom-date-picker').datepicker();
							},
							100);
					}
				});
			}else {
				this.fetchTransactions();
			}
		},
		fetchTransactions()
		{
			this.$axios.get(import.meta.env.VITE_BACKEND_BASE_URL + "/financial/admin/list?query="+ this.userId).then((res) => {
				res = res.data;
				if(res.result) {
					this.transactions = res.params;
					setTimeout(() => {
							$('.custom-date-picker').datepicker();
						},
						100);
				}
			})
		},
		fetchAgentTransactions()
		{
			this.$axios.get(import.meta.env.VITE_BACKEND_BASE_URL + "/financial/admin/get-agent-transactions?agentId=" + this.userId).then((res) => {
				res = res.data;
				if(res.result) {
					this.agentTransactions = res.params;
					setTimeout(() => {
							$('.custom-date-picker').datepicker();
						},
						100);
						
					
				}
			})
		},
		fetchAgentTransactionsByDate()
		{

			const from = $("#date-from-revenue").val();
			const to = $("#date-to-revenue").val();
			
			if(from != '' && to != '') {
				this.$axios.get(import.meta.env.VITE_BACKEND_BASE_URL + "/financial/admin/get-agent-transactions-by-date?agentId=" + this.userId + "&date=" + from + "&toDate=" + to).then((res) => {
					res = res.data;
					if(res.result) {
						this.agentTransactions.daily = res.params;
					}
				})
			}else {
				this.fetchAgentTransactions();
			}
		},
		fetchUser()
		{
			this.$axios.get(import.meta.env.VITE_BACKEND_BASE_URL + "/user/admin/get?userId="+this.userId).then((res) => {
				res = res.data;
				if(res.result) {
					this.user = res.params;
				}
			});
		},
		getStatusClass(status)
		{
			let htmlClass = '';
			switch(status) {
			case 'active':
				htmlClass = 'success';
				break;
			case 'waiting_confirmation':
				htmlClass = 'warning';
				break;
			case 'block':
				htmlClass = 'danger';
			break;
			}

			return 'bg-label-'+htmlClass;
		},
	}
}
</script>