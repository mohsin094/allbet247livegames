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
	MAKE_GAME: 'make-game',
	GAME_STATE: 'game-state',
	PLAYER_JOIN: 'player-join'
}

function Backgammon()
{

}



Backgammon.prototype.borad = undefined;


Backgammon.prototype.playerWhite = undefined;
Backgammon.prototype.playerBlack = undefined;

Backgammon.prototype.id = undefined;
Backgammon.prototype.activePlayer = undefined;
Backgammon.prototype.state = undefined;
Backgammon.prototype.stateInterval = undefined;

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
	this.state = {
		board: {},
		playerBlack: {},
		playerWhite: {},
		stage: {},
	};
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
		board: this.board
	});
	this.playerWhite.setupCheckers();

	this.board.create();


}

Backgammon.prototype.setStatePlayer = function(params) {
	switch this.activePlayer.color {
	case PLAYER_COLOR.BLACK:
		
		break;
	case PLAYER_COLOR.WHITE:

		break;
	}
}


Backgammon.prototype.turn = function() {
	this.state.stage.id = 2;
	this.state.
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

	this.state.stage.id: 1;

	this.playerWhite.socket.emit(EMIT.PLAYER_JOIN, {
		id: this.playerBlack.id
	});
	
	this.stateInterval = setInterval(() => {
		if(typeof this.playerWhite.socket == 'object') {
			this.playerWhite.socket.emit(EMIT.GAME_STATE, this.state);
		}
		if(typeof this.playerBlack.socket == 'object') {
			this.playerBlack.socket.emit(EMIT.GAME_STATE, this.state);
		}
	}, 1000);


	const timer = (new Timer()).create({
		time: 4,
	});

	timer.onTick = () => {
		this.state.timer = timer.roundTickCouner;
	}

	timer.onEnd = () => {
		this.activePlayer = this.throwTurnDice();
		this.state.timer = undefined;

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