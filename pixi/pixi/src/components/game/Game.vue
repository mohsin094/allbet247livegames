<template>
	<div class="container-fluid">
		<div class="row">
			
			<div id="game" class="col-12">
				<img id="board-bg" class="img-fluid" src="./../../assets/game/img/board.png" />
				<column  />
				<column  />
				<column  />
				<column  />
				<column  />
				<column  />
				<column  />
				<column  />
				<column  />
				<column  />
				<column  />
				<column  />
				<column  />
				<column  />
				<column  />
				<column  />
				<column  />
				<column  />
				<column  />
				<column  />
				<column  />
				<column  />
				<column  />
				<column  />
			</div>
		</div>
	</div>
</template>

<script>
import Column from "./Column.vue";
import Game from "@/extensions/backgammon/Game.js";

export default {
	components: {
		Column
	},
	data() {
		return {

		}
	},
	methods: {

	},
	mounted() {

	}
}
</script>
<style scoped>
#game {
	width: 100%;
	max-width: 1117px;
	max-height: 100vh;
	text-align: center;
	margin: auto;
}

#board-bg {
	height: 100%;
}
</style>