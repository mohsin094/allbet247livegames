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

const STAGE = {
	INIT: 0,
	START: 1,
	TURN: 2,
	THROW_DOUBLE_DICE: 3,
	MOVE_DICES: 4,
	END: 5
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
Backgammon.prototype._nextTick = undefined;
Backgammon.prototype.dice = undefined;
Backgammon.prototype.stage = undefined;
Backgammon.prototype.initParams = undefined;

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
	this.initParams = params;
	this.id = params.id;
	this.board = new Board();
	this._nextTick = [];

	//setub board
	this.board.create();
	
	// setup black
	this.playerBlack = new Player()
	this.playerBlack.create({
		color: PLAYER_COLOR.BLACK,
		timer: (new Timer()).create(params.timer),
		board: this.board
	});
	this.playerBlack.setupCheckers();

	//setup white
	this.playerWhite = new Player();
	this.playerWhite.create({
		color: PLAYER_COLOR.WHITE,
		timer: (new Timer()).create(params.timer),
		board: this.board
	});
	this.playerWhite.setupCheckers();


	//setup state
	this.state = {
		game: {},
		board: {},
		playerBlack: {},
		playerWhite: {},
		stage: {
			id: STAGE.INIT
		},
	};

	this.setStage(STAGE.INIT);
}




Backgammon.prototype.turn = function() {
	this.setStage(STAGE.TURN);

	this.updatePlayer(this.playerBlack.color, {
		dice: undefined
	});
	this.setStatePlayer(this.playerBlack.color, {
		dice: undefined
	});

	this.updatePlayer(this.playerWhite.color, {
		dice: undefined
	});
	this.setStatePlayer(this.playerWhite.color, {
		dice: undefined
	});

	this.setStateBothPlayer({
		showDice: false
	});

	this.setStateActivePlayer({
		text: this.activePlayer.color+' Turn'
	});
	this.nextTick(() => {
		setTimeout(() => {
			this.setStateActivePlayer({
				text: undefined
			});
		},2000);
		
	});

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

Backgammon.prototype.move = function(userMove) {
	const diceFirst = this.activePlayer.getMove(this.activePlayer.dice[0]);
	const diceSecond = this.activePlayer.getMove(this.activePlayer.dice[1]); 
	const checker = this.activePlayer.getChecker(userMove.checkerId);
	const opositePlayer = (this.activePlayer.color == PLAYER_COLOR.WHITE) ? this.playerBlack : this.playerWhite;
	const out = (this.activePlayer.color == PLAYER_COLOR.WHITE) ? -1 : 26;
	let opositeSingleChecker = undefined;


	if(checker != undefined) {

		let move = undefined;
		move = diceFirst;
		
		let originCol = (move != undefined) ? move.getOriginColumn(checker.position) : undefined;
		if(diceFirst != undefined
			&& diceFirst.isPossible
			&& originCol != undefined
			&& originCol.length > 0
			&& originCol[0] == userMove.toPosition
			&& move.isPossible
			&& move.moved == false) {

			opositeSingleChecker = opositePlayer.hasSingleChecker(originCol[0]);
			
			if(opositeSingleChecker != false) {
				opositePlayer.move(opositeSingleChecker.index, out);				
			}

			this.activePlayer.move(checker.index, originCol[0]);
			this.activePlayer.delMove(move.id);
			
		}else if(diceSecond != undefined && diceSecond.isPossible) {
			move = diceSecond;
			
			originCol = (move != undefined) ? move.getOriginColumn(checker.position) : undefined;

			if(originCol != undefined
				&& originCol.length > 0
				&& originCol[0] == userMove.toPosition
				&& move.isPossible
				&& move.moved == false) {

				opositeSingleChecker = opositePlayer.hasSingleChecker(originCol[0]);
				if(opositeSingleChecker != false) {
					opositePlayer.move(opositeSingleChecker.index, out);				
				}

				this.activePlayer.move(checker.index, originCol[0]);
				this.activePlayer.delMove(move.id);
			}
			
		}
		console.log(this.activePlayer.moves);
		// if(this.activePlayer.color == PLAYER_COLOR.BLACK) {

		// 	this.setStatePlayer(PLAYER_COLOR.WHITE, {
		// 		checkers: this.playerBlack.checkers
		// 	});

		// 	this.nextTick(() => {
		// 		this.setStatePlayer(PLAYER_COLOR.WHITE, {
		// 			checkers: undefined
		// 		});
		// 	});
		// }else {

		// 	this.setStatePlayer(PLAYER_COLOR.BLACK, {
		// 		checkers: this.playerBlack.checkers
		// 	});

		// 	this.nextTick(() => {
		// 		this.setStatePlayer(PLAYER_COLOR.BLACK, {
		// 			checkers: undefined
		// 		});
		// 	});
		// }

		if(this.activePlayer.hasMove() == false) {
			this.setStage(STAGE.MOVE_DICES);
			if(!this.isWinner()) {
				this.nextTurn();
			}else {
				this.setState(STAGE.END);
				this.setStateBothPlayer({
					state: STAGE.END
				});
			}
		}
	}
	
}

Backgammon.prototype.nextTurn = function() {


	this.activePlayer = (this.activePlayer.color == PLAYER_COLOR.BLACK) ? this.playerWhite : this.playerBlack;
	this.state.game.timer = undefined;
	this.activePlayer.timer = (new Timer()).create(this.initParams.timer);
	this.turn();
}

Backgammon.prototype.isWinner = function() {
	switch(this.activePlayer.color) {
	case PLAYER_COLOR.BLACK:
		if(this.activePlayer.isEndOfCheckers() && !this.playerWhite.isEndOfCheckers()) {
			return true;
		}
		break;
	case PLAYER_COLOR.WHITE:
		if(this.activePlayer.isEndOfCheckers() && !this.playerBlack.isEndOfCheckers()) {
			return true;
		}
		break;
	}
	return false;
}

Backgammon.prototype.throwDoubleDice = function() {
	
	if(this.stage === STAGE.TURN) {
		this.setStage(STAGE.THROW_DOUBLE_DICE);
		const dice = this.activePlayer.diceManager.throwTwo();

		this.state.game.dice = dice;
		
		this.updatePlayer(this.activePlayer.color, {
			dice: dice,
			allowMove: true,
			allowDice: false,
			showDice: true,
		});
		this.setStateActivePlayer({
			dice: dice,
			allowMove: true,
			allowDice: false,
			showDice: true,
		});

		this.setStatePlayer(this.activePlayer.color, {
			
				dice: dice,
				allowMove: true,
				allowDice: false,
				showDice: true,
			
		});

		this.activePlayer.setupMovements(this.board.column);

		if(! this.activePlayer.hasMove()) {
			this.nextTurn();
		}

		// this.nextTick(() => {
		// 	this.setStateActivePlayer({
		// 		dice: undefined
		// 	});
		// })

	}

}



Backgammon.prototype.start123 = function() {

	this.setStage(STAGE.START);

	this.state.playerWhite.id = this.playerWhite.id;
	this.state.playerBlack.id = this.playerBlack.id;


	this.playerWhite.socket.emit(EMIT.PLAYER_JOIN, {
		id: this.playerBlack.id
	});
	
	this.stateInterval = setInterval(() => {
		this.setStatePlayer(PLAYER_COLOR.BLACK, {
			moves: this.playerBlack.getMovesDice()
		});

		this.setStatePlayer(PLAYER_COLOR.WHITE, {
			moves: this.playerWhite.getMovesDice()
		});
		if(typeof this.playerWhite.socket == 'object') {
			this.playerWhite.socket.emit(EMIT.GAME_STATE, this.state);
		}
		if(typeof this.playerBlack.socket == 'object') {
			this.playerBlack.socket.emit(EMIT.GAME_STATE, this.state);
		}

		this.setStatePlayer(PLAYER_COLOR.WHITE, {
			checkers: this.playerWhite.checkers
		});

		this.setStatePlayer(PLAYER_COLOR.BLACK, {
			checkers: this.playerBlack.checkers
		});


		if(this._nextTick.length > 0) {
			this._nextTick.forEach((item) => {
				item();
			})
			this._nextTick = [];
		}
	}, 1000);





	// this.nextTick(() => {
	// 	this.setStatePlayer(PLAYER_COLOR.WHITE, {
	// 		checkers: undefined
	// 	});

	// 	this.setStatePlayer(PLAYER_COLOR.BLACK, {
	// 		checkers: undefined
	// 	});
	// });


	const timer = (new Timer()).create({
		time: 3,
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
	this.setStateBothPlayer({
		showDice: true
	});

	// this.nextTick(() => {
	// 	setTimeout(() => {
	// 		this.setStateBothPlayer({
	// 			showDice: false
	// 		});
			
	// 	}, 5000);
	// });

	// this.nextTick(() => {
	// 	this.updatePlayer(this.playerBlack.color, {
	// 		dice: undefined
	// 	});
	// 	this.setStatePlayer(this.playerBlack.color, {
	// 		dice: undefined
	// 	});

	// 	this.updatePlayer(this.playerWhite.color, {
	// 		dice: undefined
	// 	});
	// 	this.setStatePlayer(this.playerWhite.color, {
	// 		dice: undefined
	// 	});
	// });


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

Backgammon.prototype.setStage = function(stage)
{
	this.stage = stage;
	this.state.stage.id = this.stage;
}

Backgammon.prototype.nextTick = function(func)
{
	this._nextTick.push(func);
}


export default Backgammon

export {EMIT}