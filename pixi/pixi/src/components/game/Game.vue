<template>
	<div class="container-fluid">
		<div class="row">
			
			<div id="game" class="col-12">
				<div id="board">
					<template v-if="game != undefined" >
					<img id="board-bg" class="img-fluid" src="./../../assets/game/img/board.png" />
					<column :data="game.board.getColumnAt(0)" />
					<column :data="game.board.getColumnAt(1)"/>
					<column :data="game.board.getColumnAt(2)" />
					<column :data="game.board.getColumnAt(3)" />
					<column :data="game.board.getColumnAt(4)" />
					<column :data="game.board.getColumnAt(5)" />
					<column :data="game.board.getColumnAt(6)" />
					<column :data="game.board.getColumnAt(7)" />
					<column :data="game.board.getColumnAt(8)" />
					<column :data="game.board.getColumnAt(9)" />
					<column :data="game.board.getColumnAt(10)" />
					<column :data="game.board.getColumnAt(11)" />
					<column :data="game.board.getColumnAt(12)" />
					<column :data="game.board.getColumnAt(13)" />
					<column :data="game.board.getColumnAt(14)" />
					<column :data="game.board.getColumnAt(15)" />
					<column :data="game.board.getColumnAt(16)" />
					<column :data="game.board.getColumnAt(17)" />
					<column :data="game.board.getColumnAt(18)" />
					<column :data="game.board.getColumnAt(19)" />
					<column :data="game.board.getColumnAt(20)" />
					<column :data="game.board.getColumnAt(21)" />
					<column :data="game.board.getColumnAt(22)" />
					<column :data="game.board.getColumnAt(23)" />
					</template>
				</div>
			</div>

		</div>
		<button @click="move">Move</button>
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
		move() {
			this.game.move();
		}
	},
	created() {
	},
	mounted() {
		
		this.game = new Game();
		this.game.init();
		
		this.$nextTick(() => {
			document.getElementById("board").style.width = this.game.global.boardWidth+"px"
			document.getElementById("board").style.height = this.game.global.boardHeight+"px"
			document.getElementById("board-bg").style.width = this.game.global.boardWidth+"px"

			// const checkers = document.getElementsByClassName("checker");
			
			// for(let i = 0; i < checkers.length; i++) {
				
			// 	checkers[i].style.width = this.game.global.checkerSize+"px"
			// }

		})

		// document.getElementBy/Id("board").style.width = document.getElementById("board-bg").style.width
	},
}
</script>
<style scoped>
#game {
	width: 100%;
/*	max-width: 1117px;*/
/*	max-height: 100vh;*/
	text-align: center;
	margin: auto;
	position: relative;
}

#board {
	position: relative;
	display: block;
	margin: 0 auto;
/*	max-width: 1117px;*/
}

#board-bg {
/*	max-height: 100vh;*/
	position: absolute;
	display: block;
	right: 0;
	margin-left: auto;
	margin-right: auto;
	left: 0;
}
</style>