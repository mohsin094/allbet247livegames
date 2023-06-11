<template>
	<div class="row">
		{{this.$user.data.email}}
	</div>
</template>
<script>
	export default {
		mounted() {
			console.log(import.meta.env.VITE_BASE_URL);
		}
	}
</script>