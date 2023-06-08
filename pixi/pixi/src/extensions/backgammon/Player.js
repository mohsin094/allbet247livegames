import CheckersUtil from "@/extensions/backgammon/CheckersUtil";
import Checker from "@/extensions/backgammon/Checker";


function Player(app, board, globalValues)
{
	this.app = app;
	this.global = globalValues;
}

const COLOR = {
	WHITE: 'white',
	BLACK: 'black'
}

Player.prototype.id = undefined;
Player.prototype.color = undefined;
// Player.prototype.dice = undefined;
Player.prototype.board = undefined;
Player.prototype.checkers = undefined;
Player.prototype.app = undefined;
Player.prototype.global = undefined;

Player.prototype.setupCheckers = function(board) {

	CheckersUtil.initPosition(board, this.color, this.checkers);
}

Player.prototype.create = function(player) {
	
	this.color = player.color;
	// this.dice = new Dice();
	this.id = player.id;

	this.checkers = [];
	for(let i=0; i<15; i++) {
		let c = new Checker(this.global);
		c.create(this.color, undefined, i);
		this.checkers.push(c);
	}

}

export default Player
export {COLOR as PLAYER_COLOR}