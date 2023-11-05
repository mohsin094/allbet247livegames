<template>
<h4>Games <small>(last 100)</small></h4>
<div class="card">
	<div class="table-responsive text-nowrap">
		<table class="table">
			<thead>
				<tr>
					<th>ID</th>
					<th>Type</th>
					<th>Home</th>
					<th>Away</th>
					<th>Stake</th>
					<th>Winner</th>
					<th>Date</th>
				</tr>
			</thead>
			<tbody class="table-border-bottom-0">
				<tr v-for="match in matchesList">
					<td>
						{{match._id.$oid}}
					</td>
					<td>
						{{match.type}}
					</td>
					<td>
						<div class="avatar avatar-md me-2">
                          <img :src="baseUrl + '/assets/images/avatars/'+match.homeUser.avatar+'.png'" alt="Avatar" class="rounded-circle">
                        </div>
						<span class="fw-medium">{{match.homeUser.public_name}}</span>
					</td>
					<td>
						<div class="avatar avatar-md me-2">
                          <img v-if="match.awayUser.avatar != undefined" :src="baseUrl + '/assets/images/avatars/'+match.awayUser.avatar+'.png'" alt="Avatar" class="rounded-circle">
                        </div>
						<span v-if="match.awayUser.public_name != undefined" class="fw-medium">{{match.awayUser.public_name}}</span>
					</td>
					<td>{{match.stake.stake}}</td>
					<td>
						{{(match.home_id == match.winner) ? 'Home' : ''}}
						{{(match.away_id != '' && match.away_id == match.winner) ? 'Away' : ''}}
					</td>
					<td>
						{{(new Date(match.cdate * 1000).toLocaleString())}}
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
			matchStatusList: {},
			matchesList: []
		}
	},
	mounted()
	{
		this.initialize();
		this.fetchMatchesList();
	},
	methods: {
		initialize()
		{
			this.$axios.get(import.meta.env.VITE_BACKEND_BASE_URL + '/game/admin/match-status-list')
			.then((res) => {
				res = res.data;
				if(res.result) {
					this.matchStatusList = res.params;
				}
			});
		},
		fetchMatchesList()
		{
			this.$axios.get(import.meta.env.VITE_BACKEND_BASE_URL + '/game/admin/matches-list')
			.then((res) => {
				res = res.data;
				if(res.result) {
					this.matchesList = res.params;
				}
			});
		}
	}
}
</script>