<template>
<h4>Financial</h4>
<div class="col-md-6 col-12 mb-4">
	<label class="form-label">Date Range</label>
	<div class="input-group input-daterange">
		<input @blur="fetchFinancialByDate" class="form-control custom-date-picker" id="date-from" placeholder="MM/DD/YYYY" type="text"> <span class="input-group-text">to</span> <input id="date-to" @blur="fetchFinancialByDate" class="form-control custom-date-picker" placeholder="MM/DD/YYYY" type="text">
	</div>
</div>
<div class="card">
	<div class="card-header header-elements">
      <div class="card-header-elements ms-auto">
        <input @keyup.enter="fetchFinancial" @focusout="fetchFinancial" v-model="search" type="text" class="form-control form-control-sm" placeholder="Search id,user_id,user email,user public_name" />
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
				<tr v-for="fin in financialList">
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
</div>
</template>
<script>
	export default {
		data()
		{
			return {				
				search: '',
				financialList: [],
				baseUrl: import.meta.env.VITE_FRONT_BASE_URL,
			}
		},
		mounted()
		{
			this.fetchFinancial();

			$('.custom-date-picker').datepicker();
		},
		methods: {
			fetchFinancialByDate()
			{
				const from = $("#date-from").val();
				const to = $("#date-to").val();
				
				if(from != '' && to != '') {
					let query = "";
					if(this.search != "") {
						query = "?query=" + this.search + "&date=" + from + "&toDate=" + to;
					}else {
						query = "?date=" + from + "&toDate=" + to;
					}

					this.$axios.get(import.meta.env.VITE_BACKEND_BASE_URL + "/financial/admin/list"+query).then((res) => {
						res = res.data;
						if(res.result) {
							this.financialList = res.params;
						}
					})
				}else {
					this.fetchFinancial();
				}
			},
			fetchFinancial()
			{
				let query = "";
				if(this.search != "") {
					query = "?query=" + this.search;
				}
				this.$axios.get(import.meta.env.VITE_BACKEND_BASE_URL + "/financial/admin/list"+query).then((res) => {
					res = res.data;
					if(res.result) {
						this.financialList = res.params;
					}
				})
			}
		}
	}
</script>
