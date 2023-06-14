import Timer from "#backgammon/timer/Timer";
import Board from "#backgammon/board/Board";
import {randomUUID} from "crypto";
import Player, {PLAYER_COLOR} from "#backgammon/player/Player";

const EMIT = {
	SYSTEM_CLOCK: 'system-clock',
	SYSTEM_MESSAGE: 'system-message',
	PLAYER_PREFER: 'player-prefer',
	TURN_DICE: 'turn-dice',
	THROW_DICE: 'throw-dice',
	BOARD_TEXT: 'board-text',
	MAKE_GAME: 'make-game'
}

function Backgammon()
{

}



Backgammon.prototype.borad = undefined;


Backgammon.prototype.playerWhite = undefined;
Backgammon.prototype.playerBlack = undefined;

Backgammon.prototype.id = undefined;
Backgammon.prototype.activePlayer = undefined;

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




Backgammon.prototype.turn = function() {
	this.activePlayer.socket.emit(EMIT.PLAYER_PREFER, {
		id: this.activePlayer.id,
		freeze: false
	});
	this.activePlayer.timer.onTick = () => {
		this.activePlayer.socket.emit(EMIT.SYSTEM_CLOCK, this.activePlayer.timer.roundTickCouner);
	};

	this.activePlayer.timer.start();
}

Backgammon.prototype.move = function(move) {
	this.activePlayer.move(move.checkerId, move.toPosition);
}

Backgammon.prototype.throwDoubleDice = function() {
	const dice = this.activePlayer.dice.throwTwo();
	this.playerBlack.socket.emit(EMIT.THROW_DICE, dice);
	this.playerWhite.socket.emit(EMIT.THROW_DICE, dice);

	this.activePlayer.socket.emit(EMIT.PLAYER_PREFER, {
		id: this.activePlayer.id,
		freeze: true,
		allowMove: true
	});
}



Backgammon.prototype.start123 = function() {
	const timer = (new Timer()).create({
		time: 4,
	});

	timer.onTick = () => {
		this.playerBlack.socket.emit(EMIT.BOARD_TEXT, timer.roundTickCouner);
		this.playerWhite.socket.emit(EMIT.BOARD_TEXT, timer.roundTickCouner);
	}

	timer.onEnd = () => {
		this.activePlayer = this.throwTurnDice();
		this.playerWhite.socket.emit(EMIT.BOARD_TEXT, undefined);
		this.playerBlack.socket.emit(EMIT.BOARD_TEXT, undefined);

		this.turn();
	}

	timer.start();
}


Backgammon.prototype.throwTurnDice = function() {
	const b = this.playerBlack.dice.throwOne();
	const w =this.playerWhite.dice.throwOne();


	this.playerBlack.socket.emit(EMIT.TURN_DICE, {
		black: b[0]
	});

	this.playerWhite.socket.emit(EMIT.TURN_DICE, {
		white: w[0]
	});

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

export {EMIT}