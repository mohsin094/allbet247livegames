import Global from "@/extensions/backgammon/Global";
import Board from "@/extensions/backgammon/Board";
import Dice from "@/extensions/backgammon/Dice";
import Player,
{
	PLAYER_COLOR
}
from "@/extensions/backgammon/Player";

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
Game.prototype.dice = undefined;
Game.prototype.playerWhite = undefined;
Game.prototype.playerBlack = undefined;
Game.prototype.doubleActive = undefined;
Game.prototype.activePlayer = undefined;
Game.prototype.isFreeze = undefined;
Game.prototype.id = undefined;

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

 // throw dice

	this.socket.on('throw-dice', (params) => {
	
		this.dice.throw(params[0], params[1]);
	});



	this.socket.on('player-prefer', (player) => {
		this.activePlayer.freeze = (player.freeze != undefined) ? player.freeze : this.activePlayer.freeze;
		this.activePlayer.allowMove = (player.allowMove != undefined) ? player.allowMove : this.activePlayer.allowMove;
	});


}

Game.prototype.touchChecker = function(checker)
{
	const index = checker.index;
	this.activePlayer.removeCheckerSelection();
	if(this.activePlayer.color == checker.color) {
		this.board.removeOffer();
		this.activePlayer.toggleTouchChecker(index);
		if(this.activePlayer.getChecker(checker.index).selected) {
			this.board.offerMove(this.activePlayer.checkers[index], this.activePlayer.checkers[index].position, this.dice, this.activePlayer);
		}
	}
}

Game.prototype.move = function()
{
	this.activePlayer.moveChecker(12, 0);
	// this.playerBlack.moveChecker(13, 8);
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

	this.doubleActive = true;
	this.isFreeze = false;

	this.dice = new Dice();

	this.board = new Board(this.global);
	this.board.create();

	this.playerWhite = new Player(this.board, this.global);
	this.playerBlack = new Player(this.board, this.global);

	this.playerBlack.create(
	{
		color: PLAYER_COLOR.BLACK,
		id: 0, // get from socket
	}, this.board.getColumns());

	this.playerWhite.create(
	{
		color: PLAYER_COLOR.WHITE,
		id: 1, // get from socket
	}, this.board.getColumns());

	this.playerBlack.setupCheckers();
	this.playerWhite.setupCheckers();


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