<template>
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
				  v-model="title"
				/>
				<FormKit style="min-height: 150px"
				  type="textarea"
				  label="Your message"
				  rows="20"
				  v-model="message"
				/>
		      </div>
		      <div class="modal-footer">
		      	<button @click="createTicket()" class="btn btn-golden text-dark">Add new ticket</button>
		      </div>
		  	</div>
		</div>
	</div>
</template>