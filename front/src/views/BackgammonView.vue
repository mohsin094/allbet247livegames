<template>
    
    <Board/>
</template>
<script>
	
	import Board from '@/components/Board.vue';
	export default{
		components: {

        Board
      },
		beforeRouteEnter(to,from,next){
		    next(vm => {
		     var sidebar = document.getElementById('nav-content')
		     var header = document.getElementById('main-header')
		     var bHeader = document.getElementById('backgammon-header')
		     var chatBox = document.getElementById('chat-box')
		      sidebar.style.display = 'none'
		      header.style.display = 'none'
		      bHeader.style.display = 'block'
		      chatBox.style.display = 'block'
		    })
		  },
		beforeRouteLeave(to,from,next){
		    var sidebar = document.getElementById('nav-content')
		    var header = document.getElementById('main-header')
		    var bHeader = document.getElementById('backgammon-header')
		    var chatBox = document.getElementById('chat-box')
			sidebar.style.display = 'block'
			 header.style.display = 'block'
			 bHeader.style.display = 'none'
			 chatBox.style.display = 'none'
		    next()
		  },
	}
</script>
<style>
	.main-wrapper{
		border-top: 1.5px solid;	
		background: linear-gradient(271.91deg, #784242 6.76%, #1A1F27 25.34%, #676D75 53.35%, #1A1F27 80.27%, #7B828C 92.89%, #427861 92.9%);
	}
</style>