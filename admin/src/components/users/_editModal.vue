<template>
<!-- Edit User Modal -->
  <div class="modal" id="editUserModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-lg modal-simple modal-edit-user">
      <div class="modal-content p-3 p-md-5">
        <div class="modal-body">
          
          <div class="text-center mb-4">
            <h3 class="mb-2">Edit User Information</h3>
          </div>
          <form id="editUserForm" class="row g-3" onsubmit="return false">
            <div class="col-12">
              <label class="form-label">Public Name</label>
              <input v-model="user.public_name" type="text" class="form-control" />
            </div>

            <div class="col-12">
              <label class="form-label">Balance</label>
              <input v-model="user.balance" type="text" class="form-control" />
            </div>

            <div class="col-12">
              <label class="form-label">LVL</label>
              <input v-model="user.lvl" type="text" class="form-control" />
            </div>

            <div class="col-12">
              <label class="form-label">Username</label>
              <input v-model="user.public_name" type="text" class="form-control" />
            </div>

            <div class="col-12">
              <label class="form-label">Role</label>
              <input v-model="user.public_name" type="text" class="form-control" />
            </div>

            <div class="col-12">
              <label class="form-label">Status</label>
              <select v-model="user.status" type="text" class="form-control">
              	<option v-for="status in Object.keys(statusList)" :value="status">{{status}}</option>
              </select>
            </div>

            <div class="col-12">
              <label class="form-label">Role</label>
              <select v-model="user.role" type="text" class="form-control">
              	<option v-for="role in Object.keys(roleList)" :value="role">{{role}}</option>
              </select>
            </div>
            
            <div class="col-12 text-center">
              <button @click="update" type="button" class="btn btn-primary me-sm-3 me-1">Update</button>
              <button
                type="button"
                class="btn btn-label-secondary"
                data-bs-dismiss="modal"
                aria-label="Close">
                close
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  <!--/ Edit User Modal -->
</template>
<script>
export default {
	props: {
		user: {
			default: {}
		},
		statusList: {
			default: {}
		},
		roleList: {
			default: {}
		},
	},
	methods: {
		closeModal() {
	
			const modal = new bootstrap.Modal('#editUserModal');
			modal.hide();
		},
		update() {
			
			const data = {
				avatar: this.user.avatar,
				lvl: this.user.lvl,
				role: this.user.role,
				public_name: this.user.public_name,
				balance: this.user.balance,
				status: this.user.status
			}

			this.$axios
			.post(import.meta.env.VITE_BACKEND_BASE_URL + "/user/admin/update?userId=" + this.user._id, data)
			.then((res) => {
				res = res.data;
				if(res.result) {
					// close modal
					const modal = new bootstrap.Modal('#editUserModal');
					
					this.closeModal();
					this.$emit('updated');
				}
			})
		}
	}
}
</script>