import Dice from "#backgammon/dice/Dice";
import {randomUUID} from "crypto";

function Player(player)
{
	this.timer = player.timer;
	this.color = player.color;
	this.dice = new Dice();

	this.id = randomUUID();

}

const COLOR = {
	WHITE: 'white',
	BLACK: 'black'
}

Player.prototype.id = undefined;
Player.prototype.timer = undefined;
Player.prototype.color = undefined;
Player.prototype.dice = undefined;

Player.prototype.create = function(player) {
}

export default Player
export {COLOR as PLAYER_COLOR}