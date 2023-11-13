<template>
  <div class="row">
  	<Sidebar v-if="!this.isMobile"/>
  	<div class="col-md-10 col-xl-10 px-sm-2 px-0"  :style="this.isMobile ? 'padding-top:120px' : ''">
	  <div class="main-wrapper min-vh-100">
		  <main v-if="!isGuest">
		  	<MyGames v-if="!$user.data.isGuest"/>
		  	<Tabs/>
		  </main>
	  </div>
	</div>
</div>
</template>
<script>
	import MyGames from '@/components/MyGames.vue';
	import Tabs from '@/components/Tabs.vue';
	import Sidebar from '@/components/Sidebar.vue';
	export default {
		components: {
		    MyGames,
		    Tabs,
		    Sidebar
	  	},
	};
</script>