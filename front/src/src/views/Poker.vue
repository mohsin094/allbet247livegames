<template>
	<div class="row">
		<div class="ratio ratio-16x9">
		  <iframe :src="url" allowfullscreen></iframe>
		</div>
	</div>
</template>
<script>
	import { Modal } from 'bootstrap';
	export default{
		data() {
			return {
				url: ''
			}
		},
		mounted(){
	   	if(this.$user.data.isGuest){
	   		var modalEl = document.getElementById('login');
            var modal = new Modal(modalEl)
            modal.show();
	   	}

	   	this.fetchUrl();
	   },
	   methods: {
	   	fetchUrl() {
	   		const url = import.meta.env.VITE_BACKEND_BASE_URL+'/poker/default/get-session';
			this.$axios.get(url).then(res => {
				res = res.data;
				this.url = res.params.url;
			});
	   	}
	   }
	}
</script>