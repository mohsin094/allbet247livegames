import Dice from "#backgammon/dice/Dice";
import CheckersUtil from "#backgammon/utils/Checkers";
import Checker from "#backgammon/player/Checker";
import {randomUUID} from "crypto";

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

Player.prototype.move = function(checkerId, toPosition) {
	
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