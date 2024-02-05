<template>
	<div class="row">
		<div class="ratio ratio-16x9">
		  <iframe :src="$user.data.mavensUrl" allowfullscreen></iframe>
		</div>
	</div>
</template>
<script>
	import { Modal } from 'bootstrap';
	export default{
		mounted(){
	   	if(this.$user.data.isGuest){
	   		var modalEl = document.getElementById('login');
            var modal = new Modal(modalEl)
            modal.show();
	   	}
	   },
	}
</script>