<template>
<h4>Settings</h4>
<div class="card">
	<div class="table-responsive text-nowrap">
		<table class="table">
			<thead>
				<tr>
					<th>Name</th>
					<th>Value</th>
					<th>DESC.</th>
				</tr>
			</thead>
			<tbody class="table-border-bottom-0">
				<tr v-for="setting in Object.keys(settings)">
					<td>
						{{settings[setting].name}}
					</td>
					<td>
						<input @focusout="update(setting)" type="text" v-model="settings[setting].value" class="form-control"/>
					</td>
					<td>
						{{settings[setting].description}}
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
				settings: {}
			}
		},
		mounted()
		{
			this.fetchSettings();
		},
		methods: {
			update(id)
			{
				
				const data = {
					value: this.settings[id].value
				}

				this.$axios.post(import.meta.env.VITE_BACKEND_BASE_URL + "/admin-setting/update?id="+this.settings[id]._id, data).then((res) => {
					res = res.data;
					if(res.result) {
						this.$notif.show('Updated!', 'success');
					}
				});
			},
			fetchSettings()
			{
				this.$axios.get(import.meta.env.VITE_BACKEND_BASE_URL + "/admin-setting/get").then((res) => {
					res = res.data;
					if(res.result) {
						this.settings = res.params;
					}
				});
			}
		}
	}
</script>