<template>
<h4>Game Stakes</h4>
<div class="card">
	<div class="card-header header-elements">
      <div class="card-header-elements ms-auto">
        <button @click="openNewStakeModal" type="button" class="btn btn-xs btn-primary waves-effect waves-light">
          <span class="tf-icon ti ti-plus ti-xs me-1"></span>Add New
        </button>
      </div>
    </div>
	<div class="table-responsive text-nowrap">
		<table class="table">
			<thead>
				<tr>
					<th>Stake</th>
					<th>Status</th>
					<th>Actions</th>
				</tr>
			</thead>
			<tbody class="table-border-bottom-0">
				<tr v-for="stake in stakeList">
					<td>
						{{stake.stake}}
					</td>
					<td>
						{{stake.status}}
					</td>
					<td>
						<div class="dropdown">
							<button type="button" class="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
								<i class="ti ti-dots-vertical"></i>
							</button>
							<div class="dropdown-menu">
								<a @click.prevent="deleteStake(stake)" class="dropdown-item"><i class="ti ti-trash me-1"></i> Delete</a>
							</div>
						</div>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</div>
<new-stake-modal @added="fetchStakes()" />
</template>
<script>
import NewStakeModal from './../game-stakes/_newStakeModal.vue';
export default {
	components: {
		NewStakeModal
	},
	data()
	{
		return {
			stakeList: []
		}
	},
	mounted()
	{
		this.fetchStakes();
	},
	methods: {
		openNewStakeModal()
		{
			// open modal
			const modal = new bootstrap.Modal('#addStakeModal')
			modal.show();

		},
		deleteStake(stake)
		{
			this.$axios.get(import.meta.env.VITE_BACKEND_BASE_URL + '/game/admin/delete-stake?id=' + stake._id)
			.then((res) => {
				res = res.data;
				if(res.result) {
					this.$notif.show('Deleted!', 'success');
					this.fetchStakes();
				}
			});
		},
		fetchStakes()
		{
			this.$axios.get(import.meta.env.VITE_BACKEND_BASE_URL + '/game/admin/get-stakes-list')
			.then((res) => {
				res = res.data;
				if(res.result) {
					this.stakeList = res.params;
				}
			});
		}
	},
}
</script>