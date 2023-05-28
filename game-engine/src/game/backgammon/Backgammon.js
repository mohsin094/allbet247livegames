import Timer from "#backgammon/timer/Timer";
import Dice from "#backgammon/dice/Dice";
import {Player, PLAYER_COLOR} from "#backgammon/player/Player";

function backgammon(params)
{

	this.timer = new Timer(params.timer);
	this.playerBlack = new Player();
}


backgammon.prototype.game = undefined;


backgammon.prototype.playerWhite = undefined;
backgammon.prototype.playerBlack = undefined;

backgammon.prototype.create = function(params) {
	this.playerBlack = new Player({
		color: PLAYER_COLOR.BLACK,
		timer: new Timer(params.timer);
	});

	this.playerWhite = new Player({
		color: PLAYER_COLOR.WHITE,
		timer: new Timer(params.timer);
	});
}