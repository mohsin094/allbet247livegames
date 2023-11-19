<template>
	<BackgammonHeader v-if="!this.isMobile"/>
	<div class="container-fluid">
		<div class="row">
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