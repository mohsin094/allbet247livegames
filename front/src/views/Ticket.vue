<template>
	<div>
		<div class="row">
					<div class="col">
						<button class="btn btn-golden text-dark mt-3" data-bs-toggle="modal" data-bs-target="#newTicket">
							New ticket
						</button>
					</div>
				</div>
				<div class="row mt-3">
					<div class="col-md-6">
						<div class="sticky-header bg-dark-gradient text-center p-1 simple-page">
							<h4 class=" mt-3 mb-3">Ticket list</h4>
						</div>
						<div class="bg-dark-gradient text-center p-4 simple-page overflow-box position-relative mb-3" style="height:350px;overflow-y:scroll;">
							<table v-if="tickets.length > 0" class="table table-responsive">
							   <thead>
								   	<tr>
								   		<th>Title</th>
									   	<th>Date</th>
									   	<th>Status</th>
								   	</tr>
							   </thead>
							   <tbody>
								    <tr v-for="ticket in tickets" @click="getTicket(ticket._id)">
								    	<td class="text-golden">{{ticket.title}}</td>
								    	<td>{{this.convertDate(Number(ticket.udate))}}</td>
								    	<td>
								    		<strong :class="[{ 'text-grass': (ticket.status == 'open') },{'text-red' : (ticket.status == 'closed')},{'text-golden-light' : (ticket.status == 'user_pending')}]">
								    			{{ticket.status}}
								    		</strong>
								    	</td>
								    </tr>
								</tbody>
							</table>
							<p  v-else class="vertical-center notif-text">There is no ticket yet</p>
						</div>
					</div>
					<div class="col-md-6">
						<div class="sticky-header bg-dark-gradient text-center p-1 simple-page">
							<h4 class="mt-3 mb-3">Messages</h4>
						</div>
						<div class="bg-dark-gradient p-4 simple-page overflow-box position-relative msgs-wrapper">
							<div v-if="messages.length > 0">
								<p v-for="message in messages">{{message.message}}</p>
							</div>
							<p v-else class="vertical-center notif-text">Select a ticket to start messaging</p>

						</div>
						<div class="input-group" style="height:50px">
						  <input v-model="rplyTxt" :disabled="messages.length == 0 ? 'disabled' : false"  @keyup.enter="sendMsg()" type="text" class="form-control msg-input" id="input-msg" placeholder="Write here..." aria-describedby="basic-addon2">
						  <div class="input-group-append">
						    <button @click="sendMsg()" :disabled="messages.length == 0 ? 'disabled' : false" class="btn btn-outline-secondary msg-input" id="send-msg" type="button" style="height: 50px">
						    	<img src="@/assets/icons/send.svg" />
						    </button>
						  </div>
						</div>
					</div>
				</div>
	
	<TicketModal />
	</div>
</template>
<script>
	import Sidebar from '@/components/Sidebar.vue';
	import TicketModal from '@/components/_modals/TicketModal.vue';
	import { Modal } from 'bootstrap';
	export default{
		components:{
			Sidebar,
			TicketModal
		},
		data(){
			return{
				tickets: [],
				messages: [],
				rplyTxt:'',
				title:'',
				message:'',
				newTicket:{},
				selectedTicket:''
			}
		},
		mounted(){
			this.getTicketList()
		},
		methods:{
			sendMsg(){
				const url = import.meta.env.VITE_BACKEND_BASE_URL+'/ticket/default/reply?id='+this.selectedTicket
				let instance = this
				this.$axios.post(url,{
		          message:instance.rplyTxt
		        }).then(function(response){
		        	console.log(instance.messages)
		        	const now = new Date(); const day = now.getHours()+":"+now.getMinutes();
		        	instance.messages.push({id:"",message:instance.rplyTxt,cdate:day})
		        	instance.rplyTxt = ""
		        })
			},
			convertDate($time){
				const dateObj = new Date($time);
				let year = dateObj.getFullYear();
				let month = dateObj.getMonth();
				month = ('0' + (month + 1)).slice(-2);
				let date = dateObj.getDate();
				date = ('0' + date).slice(-2);
				let hour = dateObj.getHours();
				hour = ('0' + hour).slice(-2);
				let minute = dateObj.getMinutes();
				minute = ('0' + minute).slice(-2);
				let second = dateObj.getSeconds();
				second = ('0' + second).slice(-2);
				const time = `${year}/${month}/${date} ${hour}:${minute}:${second}`;
				return time;
			},
			getTicketList(){
				const url = import.meta.env.VITE_BACKEND_BASE_URL+'/ticket/default/list'
				let instance = this
				this.$axios.get(url).then(function(response){
					let data = response.data.params
					if(data.length > 0){
						instance.tickets = data
					}
				})
			},
			getTicket($id){
				this.selectedTicket = $id
				const url = import.meta.env.VITE_BACKEND_BASE_URL+'/ticket/default/get'
				let instance = this
				this.$axios.get(url, {
					params: {
						id: $id
					}}).then(function(response){
					let data = response.data.params
					console.log(data)
					instance.messages = data.messages
					instance.newTicket = data
				})
				
			},
			createTicket(){
				const url = import.meta.env.VITE_BACKEND_BASE_URL+'/ticket/default/new'
				let instance = this
				this.$axios.post(url,{
		          title: instance.title,
		          message: instance.message
		        }).then(function(response){
		        	let data = response.data
		        	if(data.result){
		        		var modalEl = document.getElementById('newTicket');
			            var modal = Modal.getInstance(modalEl)
			            modal.hide();
		        		instance.getTicketList()
		        		// console.log(instance.tickets)
		        	}else{
		        		// failed notification
		        	}
		        })
			}
		}
	}
</script>
<style scoped>
	.less-padding{
		pdding:0 15px !important;
	}
	.msgs-wrapper{
		border-bottom-left-radius: 0;
		border-bottom-right-radius:0;
		height:300px;
		overflow-y:scroll;
	}
	.msg-input{
		border-top-right-radius: 0;
		border-top-left-radius:0;
	}
</style>