<template>
	<div class="modal fade" ref="fModal" id="looser-modal" tabindex="-1" aria-labelledby="" aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered modal-md">
		    <div class="modal-content">
			    <div class="modal-header">
		        	<button type="button" class="btn-close ms-0" data-bs-dismiss="modal" aria-label="Close"></button>
			        <ul class="list-group-horizontal card-star text-center">
						<li v-for = "event in events">
							<i :class="['material-symbols-rounded', { 'text-grass': (event.winner == $user.data.id) },{'text-red' : (event.winner != $user.data.id)},{'text-disabled' : (event.status != 'finished')}]">star</i>
						</li>
					</ul>
			    </div>
		        <div class="modal-body text-center">
		        	<span class="material-symbols-outlined large-icon text-danger">
						sentiment_dissatisfied
					</span>
					<h2>Sorry!</h2>
					<h4>You'll do better next time!</h4>
		        </div>
		        <div class="modal-footer continue-game text-center" style="display:none">
			        <button type="button" class="btn btn-golden text-dark">Join to next game</button>
			    </div>
		    </div>
		</div>
	</div>
</template>
<script>
export default {
  props: ['events']
}
</script>