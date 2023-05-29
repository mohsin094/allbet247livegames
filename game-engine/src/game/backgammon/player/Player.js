import Dice from "#backgammon/dice/Dice";
import {randomUUID} from "crypto";

function Player(player)
{
	this.timer = player.timer;
	this.color = player.color;
	this.dice = new Dice();
	this.board = player.board;

	this.id = randomUUID();
	for(int i=0; i<15; i++) {
		this.checkers.push(new Cheker(this.color));
	}
}

const COLOR = {
	WHITE: 'white',
	BLACK: 'black'
}

Player.prototype.id = undefined;
Player.prototype.timer = undefined;
Player.prototype.color = undefined;
Player.prototype.dice = undefined;
Player.prototype.checkers = [];

Player.prototype.setupCheckers = function() {
	
}

Player.prototype.startTimer = function() {
	this.timer.start();
}

Player.prototype.create = function(player) {
}

export default Player
export {COLOR as PLAYER_COLOR}