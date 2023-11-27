<template>
  <main>
  	<MyGames v-if="!$user.data.isGuest"/>
  	<Tabs/>
  	<DTabs/>
  </main>
</template>
<script>
	import MyGames from '@/components/MyGames.vue';
	import Tabs from '@/components/Tabs.vue';
	import DTabs from '@/components/DTabs.vue';
	import Sidebar from '@/components/Sidebar.vue';
	export default {
		components: {
		    MyGames,
		    Tabs,DTabs,
		    Sidebar
	  	},
	};
</script>