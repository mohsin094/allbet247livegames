<template>
	
</template>
<script>
	export default {
		created() {

			this.$router.push({name: 'backgammon', params: {matchId: this.$route.params.matchId}});
		}
	}
</script>