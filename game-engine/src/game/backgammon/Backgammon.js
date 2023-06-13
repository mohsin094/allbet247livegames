import Timer from "#backgammon/timer/Timer";
import Board from "#backgammon/board/Board";
import {randomUUID} from "crypto";
import Player, {PLAYER_COLOR} from "#backgammon/player/Player";

function Backgammon()
{

}



Backgammon.prototype.borad = undefined;


Backgammon.prototype.playerWhite = undefined;
Backgammon.prototype.playerBlack = undefined;
Backgammon.prototype.turn = undefined;
Backgammon.prototype.id = undefined;

/**
 * @param params example:
 *	{
 * 		id: '',
 *		timer: {
 *			time: 60, secs
 *			timeBank: 100, secs
 *		}
 *	}
*/

Backgammon.prototype.create = function(params) {
	this.id = params.id;
	this.board = new Board();

	this.playerBlack = new Player()
	this.playerBlack.create({
		color: PLAYER_COLOR.BLACK,
		timer: (new Timer()).create(params.timer),
		board: this.board
	});
	this.playerBlack.setupCheckers();
	this.playerWhite = new Player();
	this.playerWhite.create({
		color: PLAYER_COLOR.WHITE,
		timer: (new Timer()).create(params.timer),
		board: this.board,
		id: params.playerWhite.id
	});
	this.playerWhite.setupCheckers();

	this.board.create();




}

Backgammon.prototype.start123 = function() {
	const timer = (new Timer()).create({
		time: 3,
	});

	timer.onTick = () => {
	
		// this.playerBlack.socket.emit('system-message', timer.roundTickCouner);
		this.playerWhite.socket.emit('system-message', timer.roundTickCouner);
	}

	timer.onEnd = () => {
		this.turn = this.throwTurnDice();
		this.playing();
	}

	timer.start();
}

Backgammon.prototype.playing = function() {
	this.turn.timer.onTick = function() {
		console.log(this.turn.timer.roundTickCouner);
	}

	this.turn.timer.onEnd = function() {

	}

	this.turn.timer.onTimeBankEnd = function() {

	}

	this.turn.timer.start();
}

Backgammon.prototype.throwDoubleDice = function() {
	const dice = this.turn.dice.throwTwo();
}

Backgammon.prototype.throwTurnDice = function() {
	const b = this.playerBlack.dice.throwOne();
	const w =this.playerWhite.dice.throwOne();


	let turn = undefined;
	if(w > b) {
		turn = this.playerWhite;
	}else if(w < b) {
		turn = this.playerBlack;
	}else {
		return this.throwTurnDice();
	}

	return turn;
}

export default Backgammon