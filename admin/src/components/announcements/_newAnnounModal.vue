<template>
<!-- Edit User Modal -->
  <div class="modal" id="addAnnounModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-lg modal-simple modal-edit-user">
      <div class="modal-content p-3 p-md-5">
        <div class="modal-body">
          
          <div class="text-center mb-4">
            <h3 class="mb-2">Add New Announcement</h3>
          </div>
          <form id="editUserForm" class="row g-3" onsubmit="return false">
            <div class="col-12">
              <label class="form-label">Title</label>
              <input v-model="title" type="text" class="form-control" />
            </div>

            <div class="col-12">
              <label class="form-label">Body</label>
              <textarea v-model="textBody" type="text" class="form-control"></textarea>
            </div>

            <div class="col-12">
              <label class="form-label">Type</label>
              <select v-model="type" class="form-control">
              	<option v-for="t in Object.keys(typeList)" :value="t">{{t}}</option>
              </select>
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
		props: {
			typeList: {
			default: {}
			}
		},
		data()
		{
			return {
				title: '',
				textBody: '',
				type: ''
			}
		},
		methods: {
			add()
			{
				const data = {
					title: this.title,
					text_body: this.textBody,
					type: this.type,
					to: "all"
				}

				this.$axios.post(import.meta.env.VITE_BACKEND_BASE_URL + "/announcement/admin/add", data).then((res) => {
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
				const modal = new bootstrap.Modal('#addAnnounModal');
				modal.hide();
			}
		}
	}
</script>