<template>
<h4>Announcements</h4>
<div class="card">
	<div class="card-header header-elements">
      <div class="card-header-elements ms-auto">
        <button @click="openNewAnnounModal" type="button" class="btn btn-xs btn-primary waves-effect waves-light">
          <span class="tf-icon ti ti-plus ti-xs me-1"></span>Add New
        </button>
      </div>
    </div>
	<div class="table-responsive text-nowrap">
		<table class="table">
			<thead>
				<tr>
					<th>Title</th>
					<th>Body</th>
					<th>Type</th>
					<th>Date</th>
					<th>Actions</th>
				</tr>
			</thead>
			<tbody class="table-border-bottom-0">
				<tr v-for="ann in announList">
					<td>
						{{ann.title}}
					</td>
					<td>
						{{ann.text_body}}
					</td>
					<td>
						{{ann.type}}
					</td>
					<td>
						{{(new Date(ann.cdate * 1000).toLocaleString())}}
					</td>
					<td>
						<div class="dropdown">
							<button type="button" class="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
								<i class="ti ti-dots-vertical"></i>
							</button>
							<div class="dropdown-menu">
								<a @click.prevent="deleteAnnoun(ann)" class="dropdown-item"><i class="ti ti-trash me-1"></i> Delete</a>
							</div>
						</div>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</div>
<new-announ-modal @added="fetchAnnoun()" :type-list="typeList" />
</template>
<script>
import NewAnnounModal from './../announcements/_newAnnounModal.vue';
export default {
	components: {
		NewAnnounModal
	},
	data()
	{
		return {
			typeList: [],
			announList: [],
		}
	},
	mounted()
	{
		this.fetchAnnoun();
		this.fetchTypeList();
	},
	methods: {
		deleteAnnoun(ann)
		{
			this.$axios.get(import.meta.env.VITE_BACKEND_BASE_URL + '/announcement/admin/delete?id=' + ann._id)
			.then((res) => {
				res = res.data;
				if(res.result) {
					this.$notif.show('Deleted!', 'success');
				}
				this.fetchAnnoun();
			});
		},
		openNewAnnounModal()
		{
			// open modal
			const modal = new bootstrap.Modal('#addAnnounModal')
			modal.show();
		},
		fetchTypeList()
		{
			this.$axios.get(import.meta.env.VITE_BACKEND_BASE_URL + '/announcement/admin/type-list')
			.then((res) => {
				res = res.data;
				if(res.result) {
					this.typeList = res.params;
				}
			});
		},
		fetchAnnoun()
		{
			this.$axios.get(import.meta.env.VITE_BACKEND_BASE_URL + '/announcement/admin/list')
			.then((res) => {
				res = res.data;
				if(res.result) {
					this.announList = res.params;
				}
			});
		}
	}
}
</script>