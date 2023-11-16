<template>
	<Game />

</template>
<script>
	import Game from "@/components/game/Game.vue";
	export default {
		components: {
			Game
		},
		mounted() {
			console.log(import.meta.env.VITE_BASE_URL);
		}
	}
</script>