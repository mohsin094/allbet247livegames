<template>
	<div class="row">
		<div class="col">
			<button class="btn btn-golden text-dark mt-3" data-bs-toggle="modal" data-bs-target="#newTicket">
				New ticket
			</button>
		</div>
	</div>
	<div class="row mt-3">
		<div class="col-md-6">
			<div class="bg-dark-gradient text-center p-4 simple-page">
				<h6>Ticket list</h6>
				<hr class="hr-text"/>
				<table class="table table-responsive">
				   <thead>
					   	<tr>
					   		<th>Title</th>
						   	<th>Date</th>
						   	<th>Status</th>
						   	<th>Action</th>
					   	</tr>
				   </thead>
				   <tbody>
					    <tr>
					    	<td></td>
					    </tr>
					</tbody>
				</table>
			</div>
			
		</div>
	</div>
	<div class="modal fade" id="newTicket" tabindex="-1" aria-hidden="true">
	  	<div class="modal-dialog">
		    <div class="modal-content">
		      <div class="modal-header">
		        <h5 class="modal-title">New Ticket</h5>
		        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
		      </div>
		      <div class="modal-body" style="text-align: left">
		      	<FormKit class="less-padding"
				  type="text"
				  label="Title"
				/>
				<FormKit style="min-height: 150px"
				  type="textarea"
				  label="Your message"
				   rows="20"
				/>
		      </div>
		  	</div>
		</div>
	</div>
</template>
<script>
	export default{
		data(){
			tickets:[]
		},
		methods:{
			getTicketList(){
				const url = import.meta.env.VITE_BACKEND_BASE_URL+'/ticket/default/list'
				this.$axios.get(url).then(function(response))
			}
		}
	}
</script>
<style scoped>
	.less-padding{
		pdding:0 15px !important;
	}
</style>