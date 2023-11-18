<template>
	<BackgammonHeader/>
	<div class="container-fluid">
		<div class="row flex-nowrap">
		  <router-view></router-view>
		</div>	
	</div>
</template>
<script>
	import BackgammonHeader from '@/components/BackgammonHeader.vue';
	export default{
		components:{
			BackgammonHeader
		}
	}
</script>