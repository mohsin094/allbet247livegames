import * as PIXI from "pixi.js";
import Global from "@/extensions/backgammon/Global";
import Board from "@/extensions/backgammon/Board";
import Player, {PLAYER_COLOR} from "@/extensions/backgammon/Player";

function Game(vue, socket) {
	this.vue = vue;
	this.socket = socket;
	this.app = new PIXI.Application({ background: '#0c0d0f', width: 1024, height: 868});
	this.app.sortableChildren = true;
	document.getElementById("pixi").append(this.app.view);
	globalThis.__PIXI_APP__ = this.app;
	this.global = new Global;
	this.global.init(this.app);
}

Game.prototype.vue = undefined;
Game.prototype.socket = undefined;
Game.prototype.app = undefined;
Game.prototype.global = undefined;
Game.prototype.board = undefined;

/**
* @params params - (Object) {
* 	width: '',
* 	height: ''
* }
**/
Game.prototype.init = function() {

	this.board = new Board(this.global);
	this.board.create(this.app);
	
	const playerWhite = new Player(this.app, this.board, this.global);
	const playerBlack = new Player(this.app, this.board, this.global);

	playerBlack.create({
		color: PLAYER_COLOR.BLACK,
		id: 0, // get from socket
	}, this.board.getColumns());

	playerWhite.create({
		color: PLAYER_COLOR.WHITE,
		id: 1, // get from socket
	}, this.board.getColumns());

	playerBlack.setupCheckers(this.board);
	playerWhite.setupCheckers(this.board);



	this.app.stage.sortChildren();
	// Add a ticker callback to scroll the text up and down
	let elapsed = 0.0;
	this.app.ticker.add((delta) => {
		// Update the text's y coordinate to scroll it
		elapsed += delta;
	});
}







export default Game