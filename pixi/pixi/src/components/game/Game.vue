<template>
	<div class="container-fluid">
		<div class="row">
			
			<div id="game" class="col-12">
				<div id="board">
					<template v-if="game != undefined" >
					<div v-if="showDice" class="dices">
						<ul>
							<li><img :src="'./../../assets/game/img/dice-'+game.dice.first+'.png'" /></li>
							<li><img :src="'./../../assets/game/img/dice-'+game.dice.second+'.png'" /></li>
						</ul>
					</div>
					<img id="board-bg" class="img-fluid" src="./../../assets/game/img/board.png" />
					<column @touch="touch" :global-vars="game.global" :data="game.board.getColumnAt(0)" />
					<column @touch="touch" :global-vars="game.global" :data="game.board.getColumnAt(1)"/>
					<column @touch="touch" :global-vars="game.global" :data="game.board.getColumnAt(2)" />
					<column @touch="touch" :global-vars="game.global" :data="game.board.getColumnAt(3)" />
					<column @touch="touch" :global-vars="game.global" :data="game.board.getColumnAt(4)" />
					<column @touch="touch" :global-vars="game.global" :data="game.board.getColumnAt(5)" />
					<column @touch="touch" :global-vars="game.global" :data="game.board.getColumnAt(6)" />
					<column @touch="touch" :global-vars="game.global" :data="game.board.getColumnAt(7)" />
					<column @touch="touch" :global-vars="game.global" :data="game.board.getColumnAt(8)" />
					<column @touch="touch" :global-vars="game.global" :data="game.board.getColumnAt(9)" />
					<column @touch="touch" :global-vars="game.global" :data="game.board.getColumnAt(10)" />
					<column @touch="touch" :global-vars="game.global" :data="game.board.getColumnAt(11)" />
					<column @touch="touch" :global-vars="game.global" :data="game.board.getColumnAt(12)" />
					<column @touch="touch" :global-vars="game.global" :data="game.board.getColumnAt(13)" />
					<column @touch="touch" :global-vars="game.global" :data="game.board.getColumnAt(14)" />
					<column @touch="touch" :global-vars="game.global" :data="game.board.getColumnAt(15)" />
					<column @touch="touch" :global-vars="game.global" :data="game.board.getColumnAt(16)" />
					<column @touch="touch" :global-vars="game.global" :data="game.board.getColumnAt(17)" />
					<column @touch="touch" :global-vars="game.global" :data="game.board.getColumnAt(18)" />
					<column @touch="touch" :global-vars="game.global" :data="game.board.getColumnAt(19)" />
					<column @touch="touch" :global-vars="game.global" :data="game.board.getColumnAt(20)" />
					<column @touch="touch" :global-vars="game.global" :data="game.board.getColumnAt(21)" />
					<column @touch="touch" :global-vars="game.global" :data="game.board.getColumnAt(22)" />
					<column @touch="touch" :global-vars="game.global" :data="game.board.getColumnAt(23)" />
					</template>
				</div>
			</div>

		</div>
		<button @click="move">Move</button>
		<button @click="dice">Dice</button>
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
			showDice: false,
		}
	},
	methods: {
		move() {
			this.game.move();
		},
		dice() {
			this.game.dice.throw();
			this.showDice = true;
		},
		touch(checkerIndex) {
			
			this.game.touchChecker(checkerIndex);
		}
	},
	created() {
	},
	mounted() {
		
		this.game = new Game(this);
		this.game.init();
		


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

.dices {
  position: absolute;
  z-index: 1;
  top: 50%;
  right: 25%;
}

.dices ul {
	list-style: none;
	margin: 0;
	padding: 0;
}

.dices ul li {
	display: inline;
	margin-right: 5px;
}
</style>