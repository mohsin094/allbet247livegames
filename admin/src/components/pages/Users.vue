<template>
	<h4>Users</h4>
	<div class="card">
		<div v-if="$user.data.role == 'admin'" class="card-header header-elements">
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
						<th>Role</th>
						<th>Status</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody class="table-border-bottom-0">
					<tr v-for="user in users">
						<td v-if="$user.data.role == 'admin'">
							<router-link :to="{name: 'userProfile', query: {userId: user._id}}">
								<div class="avatar avatar-md me-2">
		                          <img :src="baseUrl + '/assets/images/avatars/'+user.avatar+'.png'" alt="Avatar" class="rounded-circle">
		                        </div>
								<span class="fw-medium">{{user.public_name}}</span>
							</router-link>
						</td>
						<td v-else>
							<div class="avatar avatar-md me-2">
	                          <img :src="baseUrl + '/assets/images/avatars/'+user.avatar+'.png'" alt="Avatar" class="rounded-circle">
	                        </div>
							<span class="fw-medium">{{user.public_name}}</span>
						</td>
						<td>{{user.email}}</td>
						<td>
							{{user.balance}}
						</td>
						<td>
							{{user.role}}
						</td>
						<td><span :class="'bg-label-'+getStatusClass(user.status)" class="badge me-1">{{user.status}}</span></td>
						<td>
							<div class="dropdown">
								<button type="button" class="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
									<i class="ti ti-dots-vertical"></i>
								</button>
								<div class="dropdown-menu">
									<a v-if="$user.data.role == 'admin'" @click.prevent="editUser(user)" class="dropdown-item"><i class="ti ti-pencil me-1"></i> Edit</a>
									<a @click.prevent="depositWithdrawal(user)" class="dropdown-item"><i class="ti ti-pencil me-1"></i> Deposit/Withdrawal</a>
								</div>
							</div>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
	<edit-modal @updated="fetchUsers()" :user="userForEdit" :status-list="statusList" :role-list="roleList" />
	<deposit-withdrawal-modal @updated="fetchUsers()" :user="userForDepositWithdrawal" />
</template>
<script>
import EditModal from './../users/_editModal.vue';
import DepositWithdrawalModal from './../users/_depositWithdrawalModal.vue';
export default {
	components: {
		EditModal,
		DepositWithdrawalModal
	},
	data() {
		return {
			users: [],
			search: '',
			baseUrl: import.meta.env.VITE_FRONT_BASE_URL,
			roleList: [],
			statusList: [],
			userForEdit: {},
			userForDepositWithdrawal: {}
		}
	},
	mounted() {
		this.fetchUsers();
		this.fetchInitials();
	},

	methods: {
		depositWithdrawal(user)
		{
			// open modal
			const modal = new bootstrap.Modal('#depositWithdrawalUserModal')
			modal.show();

			this.userForDepositWithdrawal = user;
		},
		editUser(user)
		{
			// open modal
			const modal = new bootstrap.Modal('#editUserModal')
			modal.show();

			this.userForEdit = user;
		},

		//fetch role list and status list for editing user
		fetchInitials()
		{
			this.$axios.get(import.meta.env.VITE_BACKEND_BASE_URL + "/user/admin/get-roles-list").then((res) => {
				res = res.data;
				if(res.result) {
					this.roleList = res.params;
				}
			});

			this.$axios.get(import.meta.env.VITE_BACKEND_BASE_URL + "/user/admin/get-status-list").then((res) => {
				res = res.data;
				if(res.result) {
					this.statusList = res.params;
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

			return htmlClass;
		},
		fetchUsers()
		{
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