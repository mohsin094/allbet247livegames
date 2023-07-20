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


Player.prototype.hasMove = function() {
	return (findIndex(this.moves, o => o.moved == false) > -1) ? true : false;
}

Player.prototype.delMove = function(moveId)
{
	const moveIndex = findIndex(this.moves, (o) => (o.id == moveId));
	if(moveIndex != undefined) {
		const moveKeys = Object.keys(this.moves);
		for(let i=0; i<moveKeys.length; i++) {
			if(this.moves[i].id == moveId || this.moves[i].moved) {
				this.moves[i].init(true);
			}else {
				this.moves[i].init();
			}
		}
	}
	
}

Player.prototype.appendMoves = function(moves) {
	let final = [];
	for(let i=0; i<moves.length; i++) {
		for(let c; c<this.moves.length; c++) {
			if(this.moves[c].dice == moves[i]) {
				final.push(this.moves[c]);
			}
		}
	}
}

Player.prototype.getMove = function(diceNum)
{
	return find(this.moves, (o) => (o.dice == diceNum && o.moved == false));
}

Player.prototype.setupMovements = function(columnHolder) {
	this.moves = [];
	if(this.dice.privateFirst == this.dice.privateSecond) {
		for(let c=0; c<4; c++) {
			const move = new Move(columnHolder, this, this.dice.privateFirst);
			move.init();
			this.moves.push(move);
		}
	}else {
		let move = new Move(columnHolder, this, this.dice.privateFirst);
		move.init();
		this.moves.push(move);

		move = new Move(columnHolder, this, this.dice.privateSecond);
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

Player.prototype.isHome = function() {
	for(let i=0; i<this.checkers.length; i++) {
		if(this.color == COLOR.WHITE) {
			if(this.checkers[i].position < 19) {
				return false;
			}
		}else if(this.color == COLOR.BLACK) {
			if(this.checkers[i].position > 6) {
				return false;
			}
		}
	}

	return true;
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
	this.moves = [];

	this.checkers = [];
	for(let i=0; i<15; i++) {
		let c = new Checker(this.global);
		c.create(this.color, undefined, i);
		this.checkers.push(c);
	}

}

export default Player
export {COLOR as PLAYER_COLOR}