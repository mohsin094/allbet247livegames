<template>
	<div class="modal" ref="sModal" id="winner-modal" tabindex="-1" aria-labelledby="" data-bs-backdrop="static" data-bs-dismiss="modal">
		<div class="modal-dialog modal-dialog-centered modal-md">
		    <div class="modal-content">
		        <div class="modal-header">
			        <ul class="list-group-horizontal card-star text-center">
						<li v-for = "event in events">
							<i :class="['material-symbols-rounded', { 'text-grass': (event.winner == $user.data.id) },{'text-red' : (event.winner != $user.data.id)},{'text-disabled' : (event.status != 'finished')}]">star</i>
						</li>
					</ul>
			    </div>
		        <div class="modal-body text-center">
		        	<span class="material-symbols-outlined large-icon text-grass">
						mood
					</span>
					<h2>Congratulations!</h2>
					<h4>You're Winner</h4>
		        </div>
		        <div class="modal-footer continue-game text-center">
			        <button @click="$emit('next')" type="button" class="btn btn-golden text-dark" v-show="inProgress">Join to next game</button>
			        <router-link to="/" class="btn btn-golden text-dark" v-show="!inProgress">Back to lobby</router-link>

			    </div>
		    </div>
		</div>
	</div>
</template>
<script>
export default {
  props: ['events', 'inProgress']
}
</script>