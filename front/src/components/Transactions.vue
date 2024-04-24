<template>
	<div class="row mt-5">
		<div class="col px-3">
			<h4>Transactions History</h4>
		</div>
		<div class="col px-3 text-end">
			<button class="btn-control btn-filter" type="button">
				<span class="material-symbols-rounded text-golden-gradient"> tune </span>
			</button>
		</div>
	</div>
	<div class="row mt-5">
			<div class="col-6 px-3">
				<div class="dropdown">
				  <button class="btn btn-dark dropdown-toggle" type="button" id="dropdown" data-bs-toggle="dropdown" aria-expanded="false">
				    10
				  </button>
				  <ul class="dropdown-menu" aria-labelledby="draopdown">
				    <li><a class="dropdown-item" href="#">10</a></li>
				    <li><a class="dropdown-item" href="#">20</a></li>
				    <li><a class="dropdown-item" href="#">30</a></li>
				  </ul>
				</div>
			</div>
			<div class="col-6 px-3 position-relative">
				<div class="input-group search-game float-end">
					<input type="text" class="form-control" placeholder="Search..." aria-label="" aria-describedby="button-addon2"><button class="btn btn-outline-secondary" type="button" id="search-addon">
						<i class="material-symbols-rounded">search</i>
					</button>
				</div>
			</div>
		</div>
		<div class="row mt-3">
			<div class="table-scrollable mt-3">
				<table class="table table-responsive dark-tbl text-center">
					<thead>
						<th>ID</th>
						<th>Amount</th>
						<th>Type</th>
						<th>Desc.</th>
						
					</thead>
					<tbody>
						<tr v-for="trans in transactions">
							<td>
								{{trans._id}}
							</td>
							<td>{{trans.amount.toLocaleString()}}</td>
							<td>{{trans.type}}</td>
							<td>{{trans.description}}</td>
						</tr>
						
					</tbody>
				</table>
			</div>
		</div>
</template>
<script>
export default {
	mounted() {
		this.fetchTransactions();
	},
	data() {
		return {
			transactions: []
		}
	},
	methods: {
		fetchTransactions() {
			const url = import.meta.env.VITE_BACKEND_BASE_URL+'/financial/default/list';
			this.$axios.get(url).then(res => {
				res = res.data;
				this.transactions = res.params;
			});
		}
	}
}
</script>