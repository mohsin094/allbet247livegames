<template>
<h4>Dashboard</h4>
<div class="row">
<div class="col-sm-6 col-md-4 col-xl-2">
	<div class="card text-center">
		<!---->
		<!---->
		<div class="card-body">
			
			<div class="truncate">
				<h2 class="mb-25 font-weight-bolder"> {{daily}} </h2><span>Daily Income</span>
			</div>
		</div>
		<!---->
		<!---->
	</div>
</div>

<div class="col-sm-6 col-md-4 col-xl-2">
	<div class="card text-center">
		<!---->
		<!---->
		<div class="card-body">
			
			<div class="truncate">
				<h2 class="mb-25 font-weight-bolder"> {{monthly}} </h2><span>Monthly Income</span>
			</div>
		</div>
		<!---->
		<!---->
	</div>
</div>

<div class="col-sm-6 col-md-4 col-xl-2">
	<div class="card text-center">
		<!---->
		<!---->
		<div class="card-body">
			
			<div class="truncate">
				<h2 class="mb-25 font-weight-bolder"> {{weekly}} </h2><span>Weekly Income</span>
			</div>
		</div>
		<!---->
		<!---->
	</div>
</div>
</div>
</template>
<script>
export default {
	data() {
		return {
			daily: 0,
			monthly: 0,
			weekly: 0
		}
	},
	methods: {
		fetchIncomes() {
			this.$axios.get(import.meta.env.VITE_BACKEND_BASE_URL + "/financial/admin/get-income?period=daily").then((res) => {
				res = res.data;
				if(res.result) {
					this.daily = res.params;
				}
			});

			this.$axios.get(import.meta.env.VITE_BACKEND_BASE_URL + "/financial/admin/get-income?period=weekly").then((res) => {
				res = res.data;
				if(res.result) {
					this.weekly = res.params;
				}
			});

			this.$axios.get(import.meta.env.VITE_BACKEND_BASE_URL + "/financial/admin/get-income?period=monthly").then((res) => {
				res = res.data;
				if(res.result) {
					this.monthly = res.params;
				}
			});
		}
	},
	mounted() {
		this.fetchIncomes();
	}
}
</script>