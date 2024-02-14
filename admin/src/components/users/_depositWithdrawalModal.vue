<template>
<!-- Edit User Modal -->
  <div class="modal" id="depositWithdrawalUserModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-lg modal-simple modal-edit-user">
      <div class="modal-content p-3 p-md-5">
        <div class="modal-body">
          
          <div class="text-center mb-4">
            <h3 class="mb-2">Deposit/Withdrawal</h3>
          </div>
          <form id="editUserForm" class="row g-3" onsubmit="return false">
            <div class="col-12">
              <label class="form-label">Amount</label>
              <input v-model="amount" type="text" class="form-control" />
            </div>
            
            <div class="col-12 text-center">
              <button @click="deposit" type="button" class="btn btn-primary me-sm-3 me-1">Deposit</button>
              <button @click="withdrawal" type="button" class="btn btn-primary me-sm-3 me-1">Withdrawal</button>
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
	},
  data() {
    return {
      amount: 0
    }
  },
	methods: {
		closeModal() {
	
			const modal = new bootstrap.Modal('#depositWithdrawalUserModal');
			modal.hide();
		},
		deposit() {
			this.$axios
			.get(import.meta.env.VITE_BACKEND_BASE_URL + "/financial/admin/deposit-into-account?userId=" + this.user._id + "&amount=" + this.amount)
			.then((res) => {
				res = res.data;
				if(res.result) {
					// close modal
					const modal = new bootstrap.Modal('#depositWithdrawalUserModal');
					this.$notif.show('Updated!', 'success');
					this.closeModal();
					this.$emit('updated');
				}
			})
		},
    withdrawal() {
      this.$axios
      .get(import.meta.env.VITE_BACKEND_BASE_URL + "/financial/admin/withdrawal-from-account?userId=" + this.user._id + "&amount=" + this.amount)
      .then((res) => {
        res = res.data;
        if(res.result) {
          // close modal
          const modal = new bootstrap.Modal('#depositWithdrawalUserModal');
          this.$notif.show('Updated!', 'success');
          this.closeModal();
          this.$emit('updated');
        }
      })
    }
	}
}
</script>