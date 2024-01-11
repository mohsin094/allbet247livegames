<template>
  <main>
  	<MyGames v-if="!$user.data.isGuest"/>
  	<Tabs/>
  </main>
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