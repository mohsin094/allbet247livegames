<template>
	
	<p v-if="game && game.stage.id == stage.end">END, Winner IS: {{game.winner}}</p>
	<p v-if="game && game.stage.id == stage.cancel">Game stopped by admin, stake amount returned to your balance</p>
	<div class="row">
		<div class="col-md-10 col-xl-10 px-sm-2 px-0 ">
			<div id="game" class="col-12 main-wrapper" style="padding:20px 0">
				<board-header v-if="match != undefined" :match="match" :player-black="blackPlayerInfo" :player-white="whitePlayerInfo" />
				<div id="board">
					<template v-if="game != undefined">
						<!-- dice black -->
						<div v-if="game.playerBlack.dice && game.playerBlack.showDice" class="dices dice-black">
							<ul>
								<li v-if="game.playerBlack.dice.first != undefined"><img :style="{'max-width': game.global.checkerSize+'px', opacity: (game.stage.id == stage.move_dices) ? '0.5' : '1'}" :src="baseUrl+'/assets/game/img/dice-black-'+game.playerBlack.dice.first+'.png'" /></li>
								<li v-if="game.playerBlack.dice.second != undefined"><img :style="{'max-width': game.global.checkerSize+'px', opacity: (game.stage.id == stage.move_dices) ? '0.5' : '1'}" :src="baseUrl+'/assets/game/img/dice-black-'+game.playerBlack.dice.second+'.png'" /></li>
							</ul>
						</div>
						<!-- dice white -->
						<div v-if="game.playerWhite.dice && game.playerWhite.showDice" class="dices dice-white">
							<ul>
								<li v-if="game.playerWhite.dice.first != undefined"><img :style="{'max-width': game.global.checkerSize+'px', opacity: (game.stage.id == stage.move_dices) ? '0.5' : '1'}" :src="baseUrl+'/assets/game/img/dice-white-'+game.playerWhite.dice.first+'.png'" /></li>
								<li v-if="game.playerWhite.dice.second != undefined"><img :style="{'max-width': game.global.checkerSize+'px', opacity: (game.stage.id == stage.move_dices) ? '0.5' : '1'}" :src="baseUrl+'/assets/game/img/dice-white-'+game.playerWhite.dice.second+'.png'" /></li>
							</ul>
						</div>
						<div v-if="doubleActive" id="double-dice">
							<img :style="{'max-width': game.global.checkerSize+'px'}" src="@/assets/game/img/double-dice.png" />
						</div>
						<img id="board-bg" class="img-fluid" src="./../../assets/game/img/board.png" />
						<column id="column-1" @touch="touch" @touch-column="touchCol" :global-vars="game.global" :data="game.board.getColumnAt(-1)" />
						<column id="column0" @touch-column="touchCol" :show-side="true" :global-vars="game.global" :data="game.board.getColumnAt(0)" />
						<column id="column1" @touch="touch" @touch-column="touchCol" :global-vars="game.global" :data="game.board.getColumnAt(1)" />
						<column id="column2" @touch="touch" @touch-column="touchCol" :global-vars="game.global" :data="game.board.getColumnAt(2)" />
						<column id="column3" @touch="touch" @touch-column="touchCol" :global-vars="game.global" :data="game.board.getColumnAt(3)" />
						<column id="column4" @touch="touch" @touch-column="touchCol" :global-vars="game.global" :data="game.board.getColumnAt(4)" />
						<column id="column5" @touch="touch" @touch-column="touchCol" :global-vars="game.global" :data="game.board.getColumnAt(5)" />
						<column id="column6" @touch="touch" @touch-column="touchCol" :global-vars="game.global" :data="game.board.getColumnAt(6)" />
						<column id="column7" @touch="touch" @touch-column="touchCol" :global-vars="game.global" :data="game.board.getColumnAt(7)" />
						<column id="column8" @touch="touch" @touch-column="touchCol" :global-vars="game.global" :data="game.board.getColumnAt(8)" />
						<column id="column9" @touch="touch" @touch-column="touchCol" :global-vars="game.global" :data="game.board.getColumnAt(9)" />
						<column id="column10" @touch="touch" @touch-column="touchCol" :global-vars="game.global" :data="game.board.getColumnAt(10)" />
						<column id="column11" @touch="touch" @touch-column="touchCol" :global-vars="game.global" :data="game.board.getColumnAt(11)" />
						<column id="column12" @touch="touch" @touch-column="touchCol" :global-vars="game.global" :data="game.board.getColumnAt(12)" />
						<column id="column13" @touch="touch" @touch-column="touchCol" :global-vars="game.global" :data="game.board.getColumnAt(13)" />
						<column id="column14" @touch="touch" @touch-column="touchCol" :global-vars="game.global" :data="game.board.getColumnAt(14)" />
						<column id="column15" @touch="touch" @touch-column="touchCol" :global-vars="game.global" :data="game.board.getColumnAt(15)" />
						<column id="column16" @touch="touch" @touch-column="touchCol" :global-vars="game.global" :data="game.board.getColumnAt(16)" />
						<column id="column17" @touch="touch" @touch-column="touchCol" :global-vars="game.global" :data="game.board.getColumnAt(17)" />
						<column id="column18" @touch="touch" @touch-column="touchCol" :global-vars="game.global" :data="game.board.getColumnAt(18)" />
						<column id="column19" @touch="touch" @touch-column="touchCol" :global-vars="game.global" :data="game.board.getColumnAt(19)" />
						<column id="column20" @touch="touch" @touch-column="touchCol" :global-vars="game.global" :data="game.board.getColumnAt(20)" />
						<column id="column21" @touch="touch" @touch-column="touchCol" :global-vars="game.global" :data="game.board.getColumnAt(21)" />
						<column id="column22" @touch="touch" @touch-column="touchCol" :global-vars="game.global" :data="game.board.getColumnAt(22)" />
						<column id="column23" @touch="touch" @touch-column="touchCol" :global-vars="game.global" :data="game.board.getColumnAt(23)" />
						<column id="column24" @touch="touch" @touch-column="touchCol" :global-vars="game.global" :data="game.board.getColumnAt(24)" />
						<column id="column25" @touch-column="touchCol" :show-side="true" :global-vars="game.global" :data="game.board.getColumnAt(25)" />
						<column id="column26" @touch="touch" @touch-column="touchCol" :global-vars="game.global" :data="game.board.getColumnAt(26)" />
					</template>
					<div v-show="boardText != undefined" class="board-text">
						{{boardText}}
					</div>
					<div v-if="game != undefined" v-show="game.playerWhite.text != undefined || game.playerBlack.text != undefined" class="board-text">
						{{(game.playerWhite.text != undefined) ? game.playerWhite.text : ''}}
						{{(game.playerBlack.text != undefined) ? game.playerBlack.text : ''}}
					</div>
				</div>
			</div>
		</div>
		<div class="col-md-2 col-xl-2 col-sm-2 px-0" id="right-sidebar">
	        <div id="chat-box" class="sidebar-box" style="height:85%"></div>
	        <div class="sidebar-box right-sidebar-footer">
	        	<button  @click="throwDice" class="float-end me-2 ms-3 btn btn-golden text-dark">
	        		<!-- v-if="game && game.activePlayer" v-show="(game.activePlayer.allowDice != undefined && game.activePlayer.allowDice)" -->
				Roll Dice
				</button>
				<div class="float-end mt-2">  
					<input class="form-check-input" type="checkbox" value="" id="auto-dice">
					<label class="form-check-label ms-1 text-golden-gradient" for="auto-dice">
					    <strong>Auto Roll</strong>
					</label>
				</div>
	        </div>
	    </div>
    </div>

</template>
<script>
import Column from "./Column.vue";
import Game,
{
	STAGE
}
from "@/extensions/backgammon/Game.js";
import Global from "@/extensions/backgammon/Global";
import
{
	io
}
from "socket.io-client";
import BoardHeader from '@/components/BoardHeader.vue';
import
{
	PLAYER_COLOR
}
from "@/extensions/backgammon/Player.js";

export default
{
	components:
	{
		Column,
		BoardHeader
	},
	// props: ['match'],
	data()
	{
		return {
			game: undefined,
			stage:
			{
				init: STAGE.INIT,
				start: STAGE.START,
				turn: STAGE.TURN,
				throw_double_dice: STAGE.THROW_DOUBLE_DICE,
				move_first_dice: STAGE.MOVE_FIRST_DICE,
				move_second_dice: STAGE.MOVE_SECOND_DICE,
				move_dices: STAGE.MOVE_DICES,
				end: STAGE.END,
				cancel: STAGE.CANCEL
			},
			showDice: false,
			doubleActive: false,
			io: undefined,
			systemMessage: '',
			timer: 0,
			baseUrl: import.meta.env.VITE_BASE_URL,
			boardText: undefined,
			match: undefined,
			whitePlayerInfo: undefined,
			blackPlayerInfo: undefined,
			audio: {
				dice: new Audio(import.meta.env.VITE_BASE_URL + "/assets/game/audio/dice.aac"),
				checker: new Audio(import.meta.env.VITE_BASE_URL + "/assets/game/audio/checker.aac"),
			}
		}
	},
	methods:
	{
		move(checkerId, toPositionId)
		{
			this.io.emit('game/move',
			{
				checkerId: checkerId,
				toPosition: toPositionId,
				id: this.game.id
			});
		},
		getPlayerInfo(callback)
		{
			this.$axios.get(
					import.meta.env.VITE_BACKEND_BASE_URL + "/game/default/player-public-info",
					{
						params:
						{
							playerId: this.match.home_id
						}
					})
				.then((res) =>
				{
					this.whitePlayerInfo = res.data.params;
					if(callback != undefined) {
						callback();
					}
				});

			if(this.match.away_id != undefined)
			{
				this.$axios.get(
						import.meta.env.VITE_BACKEND_BASE_URL + "/game/default/player-public-info",
						{
							params:
							{
								playerId: this.match.away_id
							}
						})
					.then((res) =>
					{
						this.blackPlayerInfo = res.data.params
					});
			}
		},
		throwDice()
		{
			this.audio.dice.play();
			this.io.emit('game/throwDice',
			{
				id: this.game.activePlayer.id,
				gameId: this.game.id
			});
		},

		dice()
		{
			
			if(this.game.activePlayer.allowDice)
			{

				this.game.dice.throw();
				this.showDice = true;
			}
		},
		touchCol(col)
		{

			if(this.game.activePlayer.allowMove)
			{
				this.game.touchCol(col);
			}
		},
		touch(checker)
		{
			if(this.game.activePlayer.allowMove)
			{
				this.game.touchChecker(checker);
			}
		},
		animateCheckerPosition(from, to) {
			const toElm = this.getColumnElmFromId(to);
			toElm.classList.add("column-border");
			setTimeout(() => {
				toElm.classList.remove("column-border");
			}, 500);
			this.audio.checker.play();
		},
		getColumnElmFromId(id) {
			return document.getElementById("column"+id);
		}
	},
	created()
	{
		this.$axios.get(
				import.meta.env.VITE_BACKEND_BASE_URL + "/game/default/get-match",
				{
					params:
					{
						id: this.$route.params.matchId
					}
				})
			.then((data) =>
			{
				data = data.data;
				if(data.result)
				{

					this.match = data.params;

					this.getPlayerInfo(() =>
					{
						this.io = io(
							import.meta.env.VITE_BACKEND_SOCKET_URL,
							{
								path: "/game",
								auth:
								{
									token: this.$user.data.sessionId
								}
							});

						this.game = new Game(this);
						this.game.id = this.match.id;
						this.game.init();

						if(this.match.home_id == this.$user.data.id)
						{
							this.game.activePlayer = this.game.playerWhite;
						}
						else
						{
							this.game.activePlayer = this.game.playerBlack;
						}

						this.game.socketInit(this.io);
						this.doubleActive = this.game.doubleActive;

						this.io.on("connect", () =>
						{
							console.log('socket connected')

							this.io.on('game-state', (params) =>
							{
								if(this.game != undefined)
								{

									this.game.stateManager(params);

									this.boardText = (this.game.timer != undefined) ? this.game.timer : undefined;

									if(this.blackPlayerInfo != undefined && this.whitePlayerInfo != undefined)
									{

										this.blackPlayerInfo.time = (params.playerBlack.time != undefined) ? params.playerBlack.time : undefined;
										this.whitePlayerInfo.time = (params.playerWhite.time != undefined) ? params.playerWhite.time : undefined;

										// this.blackPlayerInfo.text = (params.playerBlack.text != undefined) ? params.playerBlack.text : undefined;
										// this.whitePlayerInfo.text = (params.playerWhite.text != undefined) ? params.playerWhite.text : undefined;
									}
								}

							});

							this.io.on('player-join', (param) =>
							{
								if(this.game != undefined)
								{

									this.match.away_id = param.id;
									this.getPlayerInfo();
								}
							});
							this.io.on('system-message', (msg) =>
							{
								this.systemMessage = msg;
							});

							this.io.on('system-clock', (clock) =>
							{
								this.timer = clock;
							});

							this.io.on('board-text', (text) =>
							{
								this.boardText = text;
							});

							this.io.on('moved-from-to', (position) => {

								this.animateCheckerPosition(position[0], position[1]);
							});

							this.io.on('turn-dice', (dice) =>
							{
								if(this.game != undefined)
								{

									if(dice.black != undefined && this.game.activePlayer.color == PLAYER_COLOR.BLACK)
									{
										this.game.dice.throwOne(dice.black);
										this.showDice = true;
									}

									if(dice.white != undefined && this.game.activePlayer.color == PLAYER_COLOR.WHITE)
									{
										this.game.dice.throwOne(dice.white);
										this.showDice = true;
									}
								}
							});


							if(this.game != undefined)
							{
								this.io.emit('game/join',
								{
									id: this.match.id
								});
							}
						});
					});
				}

			})


	},
	mounted()
	{

	},
	unmounted()
	{
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
-webkit-touch-callout: none; /* iOS Safari */
-webkit-user-select: none; /* Safari */
-khtml-user-select: none; /* Konqueror HTML */
-moz-user-select: none; /* Firefox */
-ms-user-select: none; /* Internet Explorer/Edge */
user-select: none;

}

.column-border {
	border: 2px solid rgb(176, 150, 84);
	border-radius: 31px;
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

.board-text {
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

}

.dice-black {
	left: 25%;
}

.dice-white {
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