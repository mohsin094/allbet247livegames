<template>
  <div class="row">
  	<Sidebar/>
  	<div class="col-md-10 col-xl-10 px-sm-2 px-0">
	  <div class="main-wrapper min-vh-100" :style="this.isMobile ? 'padding-top:100px' : ''">
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