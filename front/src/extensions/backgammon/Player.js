import CheckersUtil from "@/extensions/backgammon/CheckersUtil";
import Checker from "@/extensions/backgammon/Checker";


function Player(board, globalValues)
{

	this.global = globalValues;
	this.board = board;
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
Player.prototype.allowMove = undefined;
Player.prototype.freeze = undefined;

Player.prototype.global = undefined;

Player.prototype.getChecker = function(index) {
	return this.checkers[index];
}

Player.prototype.toggleTouchChecker = function(index) {
	this.checkers[index].selected = !this.checkers[index].selected;
}

Player.prototype.moveChecker = function(index, toPosition)
{
	// console.log(this.checkers)
	const oldPosition = this.checkers[index].position;

	if(oldPosition != toPosition) {

		this.board.position(this.checkers[index], toPosition, oldPosition);
	}
	// this.checkers[index].position = toPosition;
	// CheckersUtil.fixPosition(this.board, this.checkers);
}

Player.prototype.setupCheckers = function() {

	CheckersUtil.initPosition(this.board, this.color, this.checkers);
}

Player.prototype.create = function(player) {
	
	this.allowMove = false;
	this.freeze = true;
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