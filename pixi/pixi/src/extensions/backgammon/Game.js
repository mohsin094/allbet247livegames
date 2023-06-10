import * as PIXI from "pixi.js";
import Global from "@/extensions/backgammon/Global";
import Board from "@/extensions/backgammon/Board";
import Player, {PLAYER_COLOR} from "@/extensions/backgammon/Player";

function Game(vue, socket) {
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

Game.prototype.move = function() {
	this.playerBlack.moveChecker(12, 8);
	// this.playerBlack.moveChecker(13, 8);
}

/**
* @params params - (Object) {
* 	width: '',
* 	height: ''
* }
**/
Game.prototype.init = function() {

	this.board = new Board(this.global);
	this.board.create();
	
	this.playerWhite = new Player(this.board, this.global);
	this.playerBlack = new Player(this.board, this.global);

	this.playerBlack.create({
		color: PLAYER_COLOR.BLACK,
		id: 0, // get from socket
	}, this.board.getColumns());

	this.playerWhite.create({
		color: PLAYER_COLOR.WHITE,
		id: 1, // get from socket
	}, this.board.getColumns());

	this.playerBlack.setupCheckers();
	this.playerWhite.setupCheckers();

}







export default Game