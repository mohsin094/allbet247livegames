<template>
	
</template>
<script>
	export default {
		created() {

			this.$router.push({name: 'backgammon', params: {matchId: this.$route.params.matchId}});
		},
		beforeRouteEnter(to,from,next){
		    next(vm => {
		     var header = document.getElementById('main-header')
		     var bHeader = document.getElementById('backgammon-header')
		      header.style.display = 'none'
		      bHeader.style.display = 'block'
		    })
		  },
		beforeRouteLeave(to,from,next){
		    var header = document.getElementById('main-header')
		    var bHeader = document.getElementById('backgammon-header')
			 header.style.display = 'block'
			 bHeader.style.display = 'none'
		    next()
		  },
	}
</script>