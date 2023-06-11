<template>
  <main v-if="!isGuest">
  	<MyGames v-if="!$user.data.isGuest"/>
  	<Tabs/>
  </main>
</template>
<script>
	import MyGames from '@/components/MyGames.vue';
	import Tabs from '@/components/Tabs.vue';
	export default {
		components: {
		    MyGames,
		    Tabs
	  	},
	};
</script>