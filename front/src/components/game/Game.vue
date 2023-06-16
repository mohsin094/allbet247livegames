<template>
			<board-header v-if="match != undefined" :match="match" :player-black="blackPlayerInfo" :player-white="whitePlayerInfo"/>
			<button @click="throwDice">Dice</button>
			<button @click="move">Move</button>
			<p>System Message: {{systemMessage}}</p>
			<div id="game" class="col-12">
				<div id="board">
					<template v-if="game != undefined" >
					<div v-if="showDice" class="dices">
						<ul>
							<li v-if="game.dice.first != undefined"><img :style="{'max-width': game.global.checkerSize+'px'}" :src="baseUrl+'/assets/game/img/dice-'+game.dice.first+'.png'" /></li>
							<li v-if="game.dice.second != undefined"><img :style="{'max-width': game.global.checkerSize+'px'}" :src="baseUrl+'/assets/game/img/dice-'+game.dice.second+'.png'" /></li>
						</ul>
					</div>
					<div v-if="doubleActive" id="double-dice">
						<img :style="{'max-width': game.global.checkerSize+'px'}" src="@/assets/game/img/double-dice.png" />
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
					<column @touch="touch" :global-vars="game.global" :data="game.board.getColumnAt(24)" />
					<column @touch="touch" :global-vars="game.global" :data="game.board.getColumnAt(25)" />

					</template>
					<div v-show="boardText != undefined" id="board-text">
						{{boardText}}
					</div>
				</div>
			</div>

</template>

<script>
import Column from "./Column.vue";
import Game from "@/extensions/backgammon/Game.js";
import Global from "@/extensions/backgammon/Global";
import {io} from "socket.io-client";
import BoardHeader from '@/components/BoardHeader.vue';
import {PLAYER_COLOR} from "@/extensions/backgammon/Player.js";

export default {
	components: {
		Column,
		BoardHeader
	},
	// props: ['match'],
	data() {
		return {
			game: undefined,
			showDice: false,
			doubleActive: false,
			io: undefined,
			systemMessage: '',
			timer: 0,
			baseUrl: import.meta.env.VITE_BASE_URL,
			boardText: undefined,
			match: undefined,
			whitePlayerInfo: undefined,
			blackPlayerInfo: undefined
		}
	},
	methods: {
		getPlayerInfo() {
			this.$axios.get(import.meta.env.VITE_BACKEND_BASE_URL+"/game/default/player-public-info", {params: {
				playerId: this.match.home_id
			}}).then((res) => {
				this.whitePlayerInfo = res.data.params
			});

			if(this.match.away_id != undefined) {
				this.$axios.get(import.meta.env.VITE_BACKEND_BASE_URL+"/game/default/player-public-info", {params: {
					playerId: this.match.away_id
				}}).then((res) => {
					this.blackPlayerInfo = res.data.params
				});
			}
		},
		throwDice() {
			 this.io.emit('game/throwDice', {id: this.game.activePlayer.id, gameId: this.game.id});
		},
		move() {
			// this.io.emit('game/throwDice', {id: this.game.activePlayer.id, gameId: this.game.id});
		},
		dice() {
			this.game.dice.throw();
			this.showDice = true;
		},
		touch(checker) {
			if(this.game.activePlayer.allowMove) {
				this.game.touchChecker(checker);
			}
		}
	},
	created() {
		this.$axios.get(import.meta.env.VITE_BACKEND_BASE_URL+"/game/default/get-match", {params: {
			id: this.$route.params.matchId
		}}).then((data) => {
			data = data.data;
			if(data.result) {

				this.match = data.params;

				this.getPlayerInfo();
				this.io = io("localhost:3002", {
					path: "/game",
					auth: {
						token: this.$user.data.sessionId
					}
				});
				this.io.on("connect", () => {
					console.log('socket connected')
					this.io.on('player-join',(param) => {
						this.match.away_id = param.id;
						this.getPlayerInfo();
					});

				  this.io.emit('game/join', {id: this.match.id});

				  this.io.on('system-message', (msg) => {
				  	this.systemMessage = msg;
				  });

			  	this.io.on('system-clock', (clock) => {
						this.timer = clock;
					});

					this.io.on('board-text', (text) => {
						this.boardText = text;
					});

					this.io.on('turn-dice', (dice) => {
					
						if(dice.black != undefined && this.game.activePlayer.color == PLAYER_COLOR.BLACK) {
							this.game.dice.throwOne(dice.black);
							this.showDice = true;
						}

						if(dice.white != undefined && this.game.activePlayer.color == PLAYER_COLOR.WHITE) {
							this.game.dice.throwOne(dice.white);
							this.showDice = true;
						}
					});
					
					this.game = new Game(this);
					this.game.id = this.match.id;
					this.game.init();

					if(this.match.home_id == this.$user.data.id) {
						this.game.activePlayer = this.game.playerWhite;
					}else {
						this.game.activePlayer = this.game.playerBlack;
					}

				  this.game.socketInit(this.io);
					this.doubleActive = this.game.doubleActive;

				});
			}
		})


	},
	mounted() {

	},
	unmounted() {
		if(this.io != undefined)
			this.io.close();
	}
}
</script>
<style scoped>
#game {
	width: 100%;
/*	max-width: 1117px;*/

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

#double-dice {
	position: absolute;
	z-index: 1;
	top: 48%;
	right: 2%;
}

#board-text {
	width: 100%;
	height: 100%;
	position: absolute;
	text-align: center;
	font-size: 2em;
	color: #fff;
	background: #000000cf;
	font-weight: bold;
	padding-top: 25%;
}

.dices {
  position: absolute;
  z-index: 1;
  top: 48%;
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