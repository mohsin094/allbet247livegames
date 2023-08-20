import Global from "@/extensions/backgammon/Global";
import Board from "@/extensions/backgammon/Board";
import Dice from "@/extensions/backgammon/Dice";


import Player,
{
	PLAYER_COLOR
}
from "@/extensions/backgammon/Player";
import State from "@/extensions/backgammon/State";

const STAGE = {
	INIT: 0,
	START: 1,
	TURN: 2,
	THROW_DOUBLE_DICE: 3,
	MOVE_FIRST_DICE: 3.1,
	MOVE_SECOND_DICE: 3.2,
	MOVE_DICES: 4,
	END: 5
}

function Game(vue, socket)
{
	this.vue = vue;
	this.socket = socket;

	this.global = new Global;
	this.global.init(vue);
}

Game.prototype.vue = undefined;
Game.prototype.socket = undefined;
Game.prototype.global = undefined;
Game.prototype.board = undefined;

Game.prototype.playerWhite = undefined;
Game.prototype.playerBlack = undefined;
Game.prototype.doubleActive = undefined;
Game.prototype.activePlayer = undefined;
Game.prototype.isFreeze = undefined;
Game.prototype.id = undefined;
Game.prototype.stage = undefined;
Game.prototype.timer = undefined;


Game.prototype.socketInit = function(socket) {
	this.socket = socket;

 // make game
	this.socket.on('make-game', (params) => {
		
		this.activePlayer = (params.playerColor == PLAYER_COLOR.BLACK) ? this.playerBlack : this.playerWhite;
		this.activePlayer.id = params.id;
		
		switch(this.activePlayer.color) {
		case PLAYER_COLOR.BLACK:
			document.getElementById("board").style.transform = 'rotate(180deg)';
			break;
		case PLAYER_COLOR.WHITE:

			break;
		}
	});



	this.socket.on('player-prefer', (player) => {
		this.activePlayer.freeze = (player.freeze != undefined) ? player.freeze : this.activePlayer.freeze;
		this.activePlayer.allowMove = (player.allowMove != undefined) ? player.allowMove : this.activePlayer.allowMove;
	});
}

Game.prototype.stateManager = function(params)
{
	State.manage(this, params);
}

Game.prototype.touchCol = function(col)
{
	const checker = this.activePlayer.getActiveChecker();
	const opositeColor = (this.activePlayer.color == PLAYER_COLOR.WHITE) ? PLAYER_COLOR.BLACK : PLAYER_COLOR.WHITE;
	const opositePlayer = (this.activePlayer.color == PLAYER_COLOR.WHITE) ? this.playerBlack : this.playerWhite;
	

	if(checker != undefined 
		&& checker.position != col.index
		&& this.board.columnHolder.isOccupied(col.id, opositeColor) == false) {
		
		const diceFirst = this.activePlayer.getMove(this.activePlayer.dice.first);
		const diceSecond = this.activePlayer.getMove(this.activePlayer.dice.second); 
		
		const opositeOut = (this.activePlayer.color == PLAYER_COLOR.WHITE) ? -1 : 26;
		let move = undefined;
		let opositeSingleChecker = undefined;
		move = diceFirst;
		let originCol = (move != undefined) ? move.getOriginColumn(checker.position) : undefined;
		
		if(diceFirst != undefined
			&& diceFirst.isPossible
			&& originCol != undefined
			&& originCol.length > 0
			&& originCol[0] == col.id
			&& move.isPossible
			&& move.moved == false) {
			opositeSingleChecker = opositePlayer.hasSingleChecker(originCol[0]);
			
			if(opositeSingleChecker != false) {
				this.move(opositeSingleChecker, opositeOut);
				this.vue.move(opositeSingleChecker.index, opositeOut);					
			}
			this.move(checker, originCol[0]);
			this.activePlayer.delMove(move.id);
			this.vue.move(checker.index, originCol[0]);
			this.board.removeOffer();
			
		}else if(diceSecond != undefined && diceSecond.isPossible) {
			move = diceSecond;
		
			originCol = (move != undefined) ? move.getOriginColumn(checker.position) : undefined;

			if(originCol != undefined
				&& originCol.length > 0
				&& originCol[0] == col.id
				&& move.isPossible
				&& move.moved == false) {
				opositeSingleChecker = opositePlayer.hasSingleChecker(originCol[0]);
				
				if(opositeSingleChecker != false) {
					this.move(opositeSingleChecker, opositeOut);
					this.vue.move(opositeSingleChecker.index, opositeOut);					
				}
				this.move(checker, originCol[0]);
				this.activePlayer.delMove(move.id);
				this.vue.move(checker.index, originCol[0]);
				this.board.removeOffer();
			}
			
		}

		if(this.activePlayer.hasMove() == false) {
			this.stage.id = STAGE.MOVE_DICES;
		} 
	}

}

Game.prototype.checkMovement = function()
{

}

Game.prototype.touchChecker = function(checker)
{
	
	this.activePlayer.removeCheckerSelection();
	if(this.activePlayer.color == checker.color && this.stage.id !== STAGE.MOVE_DICES) {
		
		const index = this.activePlayer.getChecker(checker.index);

		this.board.removeOffer();
		this.activePlayer.toggleTouchChecker(index);
		
		if(this.activePlayer.checkers[index].selected) {
			
			this.board.offerMove(this.activePlayer.checkers[index], this.activePlayer.checkers[index].position, this.activePlayer, this.stage);
		}
	}
}

Game.prototype.move = function(checker, to)
{
	this.activePlayer.moveChecker(checker, to);
}

Game.prototype.setActivePlayer = function() {
	this.activePlayer = this.playerWhite;
}

/**
 * @params params - (Object) {
 * 	width: '',
 * 	height: ''
 * }
 **/
Game.prototype.init = function()
{

	this.stage = {};
	this.doubleActive = true;
	this.isFreeze = false;



	this.board = new Board(this.global);

	this.board.create();

	this.playerWhite = new Player(this.board, this.global);
	this.playerBlack = new Player(this.board, this.global);

	this.playerBlack.create(
	{
		color: PLAYER_COLOR.BLACK,
		id: 0, // get from socket
	});

	this.playerWhite.create(
	{
		color: PLAYER_COLOR.WHITE,
		id: 1, // get from socket
	});

	// this.playerBlack.setupCheckers();
	// this.playerWhite.setupCheckers();


	this.vue.$nextTick(() =>
	{

		
		document.getElementById("board")
			.style.width = this.global.boardWidth + "px"
		document.getElementById("board")
			.style.height = this.global.boardHeight + "px"
		document.getElementById("board-bg")
			.style.width = this.global.boardWidth + "px"
		document.getElementById("board-bg")
			.style.height = this.global.boardHeight + "px"
	});

}







export default Game
export {STAGE}