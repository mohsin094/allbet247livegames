import Timer from "#backgammon/timer/Timer";
import Board from "#backgammon/board/Board";

import Player, {PLAYER_COLOR} from "#backgammon/player/Player";

function Backgammon()
{

}


Backgammon.prototype.borad = undefined;


Backgammon.prototype.playerWhite = undefined;
Backgammon.prototype.playerBlack = undefined;

/**
 * @param params example:
 *	{
 *		timer: {
 *			time: 60, secs
 *			timeBank: 100, secs
 *		}
 *	}
*/

Backgammon.prototype.create = function(params) {
	this.board = new Board();


	this.playerBlack = new Player()
	this.playerBlack.create({
		color: PLAYER_COLOR.BLACK,
		timer: new Timer(params.timer),
		board: this.board	
	});
	this.playerBlack.setupCheckers();

	this.playerWhite = new Player();
	this.playerWhite.create({
		color: PLAYER_COLOR.WHITE,
		timer: new Timer(params.timer),
		board: this.board
	});
	this.playerWhite.setupCheckers();

	this.board.create();

	console.log(this.playerWhite.checkers);
	console.log(this.playerBlack.checkers);

}

export default Backgammon