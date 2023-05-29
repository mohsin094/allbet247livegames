import Timer from "#backgammon/timer/Timer";
import Board from "#backgammon/board/Board";

import {Player, PLAYER_COLOR} from "#backgammon/player/Player";

function backgammon(params)
{

	this.timer = new Timer(params.timer);
	this.playerBlack = new Player();
}


backgammon.prototype.borad = undefined;


backgammon.prototype.playerWhite = undefined;
backgammon.prototype.playerBlack = undefined;

/**
 * @param params example:
 *	{
 *		timer: {
 *			time: 60, secs
 *			timeBank: 100, secs
 *		}
 *	}
*/

backgammon.prototype.create = function(params) {
	this.board = new Board();

	this.playerBlack = new Player({
		color: PLAYER_COLOR.BLACK,
		timer: new Timer(params.timer),
		borad: this.borad	
	});

	this.playerWhite = new Player({
		color: PLAYER_COLOR.WHITE,
		timer: new Timer(params.timer),
		borad: this.board
	});

	borad.create();

}