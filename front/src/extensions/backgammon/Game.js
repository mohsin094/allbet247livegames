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

Game.prototype.touchChecker = function(index)
{
	this.board.removeOffer();
	this.playerWhite.toggleTouchChecker(index);
	if(this.playerWhite.getChecker(index).selected) {
		this.board.offerMove(this.playerWhite.checkers[index], this.playerWhite.checkers[index].position, this.dice);
	}
}

Game.prototype.move = function()
{
	this.playerWhite.moveChecker(12, 24);
	// this.playerBlack.moveChecker(13, 8);
}

/**
 * @params params - (Object) {
 * 	width: '',
 * 	height: ''
 * }
 **/
Game.prototype.init = function()
{

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