<template>
<!-- Edit User Modal -->
  <div class="modal fade" id="editUserModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-lg modal-simple modal-edit-user">
      <div class="modal-content p-3 p-md-5">
        <div class="modal-body">
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          <div class="text-center mb-4">
            <h3 class="mb-2">Edit User Information</h3>
            <p class="text-muted">Updating user details will receive a privacy audit.</p>
          </div>
          <form id="editUserForm" class="row g-3" onsubmit="return false">
            <div class="col-12">
              <label class="form-label" for="modalEditUserName">Username</label>
              <input v-model="user.public_name" type="text" class="form-control" />
            </div>
            
            <div class="col-12 text-center">
              <button @click="update" type="button" class="btn btn-primary me-sm-3 me-1">Update</button>
              <button
                type="reset"
                class="btn btn-label-secondary"
                data-bs-dismiss="modal"
                aria-label="Close">
                Cancel
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
		}
	},
	methods: {
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
					console.log(modal);
					modal.toggle();
					this.$emit('updated');
				}
			})
		}
	}
}
</script>