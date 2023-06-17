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
Backgammon.prototype.dice = undefined;

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
		board: this.board
	});
	this.playerWhite.setupCheckers();

	this.board.create();
	this.state = {
		game: {},
		board: {},
		playerBlack: {
			checkers: this.playerBlack.checkers
		},
		playerWhite: {
			checkers: this.playerWhite.checkers
		},
		stage: {
			id: 0
		},
	};


}




Backgammon.prototype.turn = function() {
	this.state.stage.id = 2;

	this.updateBothPlayer({
		allowDice: false,
		allowMove: false,
	});
	this.setStateBothPlayer({
		allowDice: false,
		allowMove: false,
	});
	
	this.updatePlayer(this.activePlayer.color, {
		allowDice: true
	});
	this.setStateActivePlayer({
		allowDice: true
	});
	
	this.activePlayer.timer.onTick = () => {
		
		this.updatePlayer(this.activePlayer.color, {
			time: this.activePlayer.timer.roundTickCouner
		});
		this.setStateActivePlayer({
			time: this.activePlayer.timer.roundTickCouner
		});
	};

	this.activePlayer.timer.start();

}

Backgammon.prototype.move = function(move) {
	this.activePlayer.move(move.checkerId, move.toPosition);
}

Backgammon.prototype.throwDoubleDice = function() {
	console.log(this.state.stage.id)
	if(this.state.stage.id === 2) {
		this.state.stage.id = 3;
		const dice = this.activePlayer.diceManager.throwTwo();

		this.state.game.dice = dice;
		
		this.updatePlayer(this.activePlayer.color, {
			dice: dice,
			allowMove: true,
			allowDice: false
		});
		this.setStateActivePlayer({
			dice: dice,
			allowMove: true,
			allowDice: false
		});
	}

}



Backgammon.prototype.start123 = function() {

	this.state.stage.id = 1;

	this.state.playerWhite.id = this.playerWhite.id;
	this.state.playerBlack.id = this.playerBlack.id;


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
		this.timer = timer.roundTickCouner;
		this.state.game.timer = timer.roundTickCouner;
	}

	timer.onEnd = () => {
		this.activePlayer = this.throwTurnDice();
		this.state.game.timer = undefined;
		this.turn();
		
	}

	timer.start();
}


Backgammon.prototype.throwTurnDice = function() {
	const b = this.playerBlack.diceManager.throwOne();
	const w = this.playerWhite.diceManager.throwOne();


	
	this.updatePlayer(this.playerBlack.color, {
		dice: b
	});
	this.setStatePlayer(this.playerBlack.color, {
		dice: b
	});

	this.updatePlayer(this.playerWhite.color, {
		dice: w
	});
	this.setStatePlayer(this.playerWhite.color, {
		dice: w
	});


	let turn = undefined;
	if(w[0] > b[0]) {
		turn = this.playerWhite;
	}else if(w[0] < b[0]) {
		turn = this.playerBlack;
	}else {
		turn = this.throwTurnDice();
	}
	return turn;
}

Backgammon.prototype.setStateActivePlayer = function(params) {
	let keys = [];

	switch(this.activePlayer.color) {
	case PLAYER_COLOR.BLACK:
		keys = Object.keys(params);
		for(let i = 0; i < keys.length; i++) {
			this.state.playerBlack[keys[i]] = (params[keys[i]] != undefined) ? params[keys[i]] : undefined;
		}
		break;
	case PLAYER_COLOR.WHITE:
		keys = Object.keys(params);

		for(let i = 0; i < keys.length; i++) {
			this.state.playerWhite[keys[i]] = (params[keys[i]] != undefined) ? params[keys[i]] : undefined;
		}
		break;
	}
}

Backgammon.prototype.setStatePlayer = function(color, params) {
	let keys = [];

	switch(color) {
	case PLAYER_COLOR.BLACK:
		keys = Object.keys(params);
		for(let i = 0; i < keys.length; i++) {
			this.state.playerBlack[keys[i]] = (params[keys[i]] != undefined) ? params[keys[i]] : undefined;
		}
		break;
	case PLAYER_COLOR.WHITE:
		keys = Object.keys(params);

		for(let i = 0; i < keys.length; i++) {
			this.state.playerWhite[keys[i]] = (params[keys[i]] != undefined) ? params[keys[i]] : undefined;
		}
		break;
	}
}

Backgammon.prototype.setStateBothPlayer = function(params) {

	let keys = Object.keys(params);
	for(let i = 0; i < keys.length; i++) {
	
		this.state.playerWhite[keys[i]] = (params[keys[i]] != undefined) ? params[keys[i]] : undefined;
	}

	keys = Object.keys(params);
	for(let i = 0; i < keys.length; i++) {

		this.state.playerBlack[keys[i]] = (params[keys[i]] != undefined) ? params[keys[i]] : undefined;
	}

}

Backgammon.prototype.updateBothPlayer = function(params)
{
	let keys = Object.keys(params);
	for(let i = 0; i < keys.length; i++) {
	
		this.playerWhite[keys[i]] = (params[keys[i]] != undefined) ? params[keys[i]] : undefined;
	}

	keys = Object.keys(params);
	for(let i = 0; i < keys.length; i++) {

		this.playerBlack[keys[i]] = (params[keys[i]] != undefined) ? params[keys[i]] : undefined;
	}
}

Backgammon.prototype.updatePlayer = function(color, params) {
	let keys = [];

	switch(color) {
	case PLAYER_COLOR.BLACK:
		keys = Object.keys(params);
		for(let i = 0; i < keys.length; i++) {
			this.playerBlack[keys[i]] = (params[keys[i]] != undefined) ? params[keys[i]] : undefined;
		}
		break;
	case PLAYER_COLOR.WHITE:
		keys = Object.keys(params);

		for(let i = 0; i < keys.length; i++) {
			this.playerWhite[keys[i]] = (params[keys[i]] != undefined) ? params[keys[i]] : undefined;
		}
		break;
	}
}


export default Backgammon

export {EMIT}