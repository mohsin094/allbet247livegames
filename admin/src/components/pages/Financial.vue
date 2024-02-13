<template>
<h4>Financial</h4>
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
						<span class="fw-medium">{{fin.user.email}}</span>
					</td>
					<td>{{fin.amount}}</td>
					<td>
						{{fin.type}}
					</td>
					<td>
						{{fin.description}}
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
		},
		methods: {
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
