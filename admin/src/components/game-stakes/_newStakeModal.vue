<template>
<!-- Edit User Modal -->
  <div class="modal" id="addStakeModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-lg modal-simple modal-edit-user">
      <div class="modal-content p-3 p-md-5">
        <div class="modal-body">
          
          <div class="text-center mb-4">
            <h3 class="mb-2">Add New Stake</h3>
          </div>
          <form id="editUserForm" class="row g-3" onsubmit="return false">
            <div class="col-12">
              <label class="form-label">Stake</label>
              <input v-model="stake" type="text" class="form-control" />
            </div>
            <div class="col-12 text-center">
              <button @click="add" type="button" class="btn btn-primary me-sm-3 me-1">Add</button>
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
		data()
		{
			return {
				stake: ''
			}
		},
		methods: {
			add()
			{
				const data = {
					stake: this.stake,
					status: "active"
				}

				this.$axios.post(import.meta.env.VITE_BACKEND_BASE_URL + "/game/admin/add-stake", data).then((res) => {
					res = res.data;
					if(res.result) {
						this.$notif.show('Added!', 'success');
					}

					this.closeModal();
					this.$emit('added');
				});
			},
			closeModal()
			{
				const modal = new bootstrap.Modal('#addStakeModal');
				modal.hide();
			}
		}
	}
</script>