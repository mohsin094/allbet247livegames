<template>
	<h4>Users</h4>
	<div class="card">
		<div class="card-header header-elements">
          <div class="card-header-elements ms-auto">
            <input @keyup.enter="fetchUsers" @focusout="fetchUsers" v-model="search" type="text" class="form-control form-control-sm" placeholder="Search" />
          </div>
        </div>
		<div class="table-responsive text-nowrap">
			<table class="table">
				<thead>
					<tr>
						<th>Public Name</th>
						<th>Email</th>
						<th>Balance</th>
						<th>Status</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody class="table-border-bottom-0">
					<tr v-for="user in users">
						<td>
							<div class="avatar avatar-md me-2">
	                          <img :src="baseUrl + '/assets/images/avatars/'+user.avatar+'.png'" alt="Avatar" class="rounded-circle">
	                        </div>
							<span class="fw-medium">{{user.public_name}}</span>
						</td>
						<td>{{user.email}}</td>
						<td>
							{{user.balance}}
						</td>
						<td><span :class="'bg-label-'+getStatusClass(user.status)" class="badge me-1">{{user.status}}</span></td>
						<td>
							<div class="dropdown">
								<button type="button" class="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
									<i class="ti ti-dots-vertical"></i>
								</button>
								<div class="dropdown-menu">
									<a class="dropdown-item" href="javascript:void(0);"><i class="ti ti-pencil me-1"></i> Edit</a>
									<a class="dropdown-item" href="javascript:void(0);"><i class="ti ti-trash me-1"></i> Delete</a>
								</div>
							</div>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {
			users: [],
			search: '',
			baseUrl: import.meta.env.VITE_FRONT_BASE_URL
		}
	},
	mounted() {
		this.fetchUsers();
	},

	methods: {
		getStatusClass(status) {
			let htmlClass = '';
			switch(status) {
			case 'active':
				htmlClass = 'success';
				break;
			case 'waiting_confirmation':
				htmlClass = 'warning';
				break;
			}

			return htmlClass;
		},
		fetchUsers() {
			let query = "";
			if(this.search != "") {
				query = "?query=" + this.search;
			}
			this.$axios.get(import.meta.env.VITE_BACKEND_BASE_URL + "/user/admin/list"+query).then((res) => {
				res = res.data;
				if(res.result) {
					this.users = res.params;
				}
			})
		}
	}
}
</script>