<template>
	<div class="container-fluid">
		<div class="row">
			
			<div id="game" class="col-12">
				<div id="board">
					<template v-if="game != undefined" >
					<img id="board-bg" class="img-fluid" src="./../../assets/game/img/board.png" />
					<column :global="this.game.global" :data="game.board.getColumnAt(0)" />
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
					</template>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Column from "./Column.vue";
import Game from "@/extensions/backgammon/Game.js";
import Global from "@/extensions/backgammon/Global";

export default {
	components: {
		Column
	},
	data() {
		return {
			game: undefined,
		}
	},
	methods: {
	},
	created() {
	},
	mounted() {
		
		this.game = new Game();
		this.game.init();
		
		this.$nextTick(() => {
			document.getElementById("board").style.width = this.game.global.boardWidth+"px"

			const checkers = document.getElementsByClassName("checker");
			console.log(checkers)
			for(let i = 0; i < checkers.length; i++) {
				console.log(checkers[i])
				checkers[i].style.width = this.game.global.checkerSize+"px"
			}

		})

		// document.getElementBy/Id("board").style.width = document.getElementById("board-bg").style.width
	},
}
</script>
<style scoped>
#game {
	width: 100%;
	max-width: 1117px;
	max-height: 100vh;
	text-align: center;
	margin: auto;
	position: relative;
}

#board {
	position: relative;
	display: block;
	margin: 0 auto;

}

#board-bg {
	max-height: 100vh;
	position: absolute;
	display: block;
	right: 0;
	margin-left: auto;
	margin-right: auto;
	left: 0;
}
</style>