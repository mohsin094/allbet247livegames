import Dice from "#backgammon/dice/Dice";
import CheckersUtil from "#backgammon/utils/Checkers";
import Checker from "#backgammon/player/Checker";
import {randomUUID} from "crypto";
import {find, findIndex} from "lodash-es";
import Move from "#backgammon/player/Move";

function Player()
{
}

const COLOR = {
	WHITE: 'white',
	BLACK: 'black'
}

Player.prototype.id = undefined;
Player.prototype.timer = undefined;
Player.prototype.time = undefined;
Player.prototype.color = undefined;
Player.prototype.dice = undefined;
Player.prototype.showDice = undefined;
Player.prototype.diceManager = undefined;
Player.prototype.board = undefined;
Player.prototype.checkers = undefined;
Player.prototype.socket = undefined;
Player.prototype.text = undefined;
Player.prototype.moves = undefined;


Player.prototype.getOutCheckers = function() {
	let result = [];
	for(let i=0; i<this.checkers.length; i++) {
		switch(this.color) {
		case COLOR.WHITE:
			if(this.checkers[i].position == 26) {
				result.push(this.checkers[i]);				
			}
			break;
		case COLOR.BLACK:
			if(this.checkers[i].position == -1) {
				result.push(this.checkers[i]);
			}
			break;
		}
	}

	return result;
}

Player.prototype.hasSingleChecker = function(colId) {
	let i = 0;
	for(let c=0; c<this.checkers.length; c++) {
		if(this.checkers[c].position == colId) {
			i++;
		}
	}

	return (i == 1) ? this.getCheckerInCol(colId) : false;
}

Player.prototype.getCheckerInCol = function(index) {
	return find(this.checkers, (e) => (e.position == index));
}

Player.prototype.getMovesDice = function() {
	let final = [];
	for(let i=0; i<this.moves.length; i++) {
		if(this.moves[i].moved == false) {
			final.push(this.moves[i].dice);
		}
	}

	return final;
}

Player.prototype.hasMove = function() {
	
	return (findIndex(this.moves, o => (o.moved == false && o.isPossible == true)) > -1) ? true : false;
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

Player.prototype.getMove = function(diceNum)
{
	return find(this.moves, (o) => (o.dice == diceNum && o.moved == false));
}

Player.prototype.isEndOfCheckers = function() {
	for(let i=0; i<this.checkers.length; i++) {
		if(this.color == COLOR.WHITE) {
			if(this.checkers[i].position != 25) {
				return false;
			}
		}else if(this.color == COLOR.BLACK) {
			if(this.checkers[i].position != 0) {
				return false;
			}
		}
	}

	return true;
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

Player.prototype.move = function(checkerId, toPosition) {
	const checker = this.getChecker(checkerId);
	const oldPosition = checker.position;
	if(oldPosition != toPosition) {
		this.board.position(checker, toPosition, oldPosition);
	}
	checker.position = toPosition;
}

Player.prototype.getChecker = function(index) {
	return find(this.checkers, (e) => (e.index == index));
}

Player.prototype.setupMovements = function(columnHolder) {
	this.moves = [];
	
	if(this.dice[0] == this.dice[1]) {
		for(let c=0; c<4; c++) {
			const move = new Move(columnHolder, this, this.dice[0]);
			move.init();
			this.moves.push(move);
		}
	}else {
		let move = new Move(columnHolder, this, this.dice[0]);
		move.init();
		this.moves.push(move);

		move = new Move(columnHolder, this, this.dice[1]);
		move.init();
		this.moves.push(move);
	}
}

Player.prototype.setupCheckers = function() {

	CheckersUtil.initPosition(this.board, this.color, this.checkers);
}

Player.prototype.startTimer = function() {
	this.timer.start();
}

Player.prototype.create = function(player) {
	this.timer = player.timer;
	this.color = player.color;
	this.diceManager = new Dice();
	this.board = player.board;
	this.dice = undefined;
	this.showDice = undefined;
	this.text = undefined;
	this.moves = [];


	this.checkers = [];
	for(let i=0; i<15; i++) {
		let c = new Checker();
		c.create(this.color);
		switch(this.color) {
		case COLOR.WHITE:
			// c.position = i+1;
			break;
		case COLOR.BLACK:
			// c.position = i+1;
			break;
		}
		this.checkers.push(c);
	}

}

export default Player
export {COLOR as PLAYER_COLOR}