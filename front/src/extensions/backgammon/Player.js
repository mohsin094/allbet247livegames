import CheckersUtil from "@/extensions/backgammon/CheckersUtil";
import Checker from "@/extensions/backgammon/Checker";
import Dice from "@/extensions/backgammon/Dice";
import {find, findIndex} from "lodash";
import Move from "@/extensions/backgammon/Move";

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
Player.prototype.dice = undefined;
Player.prototype.showDice = undefined;

Player.prototype.board = undefined;
Player.prototype.checkers = undefined;
Player.prototype.allowMove = undefined;
Player.prototype.allowDice = undefined;
Player.prototype.freeze = undefined;
Player.prototype.text = undefined;
Player.prototype.moves = undefined;

Player.prototype.global = undefined;

Player.prototype.setupMovements = function() {

	const keys = Object.keys(this.dice);
	if(this.dice.first == this.dice.second) {
		for(let c=0; c<4; c++) {
			const move = new Move(this, this.dice.first);
			move.init();
			this.moves.push(move);
		}
	}else {
		let move = new Move(this, this.dice.first);
		move.init();
		this.moves.push(move);

		move = new Move(this, this.dice.second);
		move.init();
		this.moves.push(move);
	}
}

Player.prototype.getActiveChecker = function() {
	for(let i=0; i< this.checkers.length; i++) {
		if(this.checkers[i].selected) {
			return this.checkers[i];
		}
	}
	return undefined;
}

Player.prototype.getChecker = function(index) {
	return findIndex(this.checkers, (e) => (e.index == index));
}

Player.prototype.isAllCheckersHome = function() {
	switch(this.color) {
	case COLOR.BLACK:
		for(let i=0; i<this.checkers.length; i++) {
			if(this.checkers[i].position < 18) {
				return false;
			}
		}
		break;
	case COLOR.WHITE:
		for(let i=0; i<this.checkers.length; i++) {
			if(this.checkers[i].position > 6) {
				return false;
			}
		}
		break;
	}

	return true;
}

Player.prototype.removeCheckerSelection = function() {
	for(let i=0; i<this.checkers.length; i++) {
		this.checkers[i].selected = false;
	}

}

Player.prototype.toggleTouchChecker = function(index) {
	const checker = this.getChecker(index);
	this.checkers[checker].selected = !this.checkers[checker].selected;
}

Player.prototype.moveChecker = function(checker, toPosition)
{
	const oldPosition = checker.position;

	if(oldPosition != toPosition) {
		this.board.position(checker, toPosition, oldPosition);
	}
	this.checkers[this.getChecker(checker.index)].position = toPosition;
	// CheckersUtil.fixPosition(this.board, this.checkers);
}

Player.prototype.setupCheckers = function() {

	// CheckersUtil.initPosition(this.board, this.color, this.checkers);
}

Player.prototype.create = function(player) {
	
	this.allowMove = false;
	this.allowDice = false;
	this.freeze = true;
	this.color = player.color;
	this.dice = new Dice();
	this.showDice = false;
	this.id = player.id;
	this.text = undefined;

	this.checkers = [];
	for(let i=0; i<15; i++) {
		let c = new Checker(this.global);
		c.create(this.color, undefined, i);
		this.checkers.push(c);
	}

}

export default Player
export {COLOR as PLAYER_COLOR}