import CheckersUtil from "@/extensions/backgammon/CheckersUtil.js";
import {PLAYER_COLOR} from "@/extensions/backgammon/Player";
import Checker from "@/extensions/backgammon/Checker";
import {STAGE} from "@/extensions/backgammon/Game";
export default {
	_nextTick: [],
	nextTick: function(func) {
		this._nextTick.push(func);
	},
	manage: function(game, state) {
		
		const stateKeys = Object.keys(state);
		for(let index=0; index < stateKeys.length; index++) {
			let checkers = undefined;
			let moves = undefined;
			switch(stateKeys[index]) {
			case 'stage':
				if(game.stage.id !== STAGE.MOVE_FIRST_DICE && game.stage.id !== STAGE.MOVE_SECOND_DICE) {
					game.stage.id = state[stateKeys[index]].id;
					if(game.stage.id == STAGE.END) {
						game.endGame();
					}
				}
				break;
			case 'board':

				break;
			case 'game':
				game.timer =  (state.game.timer != undefined) ? state.game.timer : undefined;
				game.winner =  (state.game.winner != undefined) ? state.game.winner : undefined;
				break;
			case 'playerBlack':
				game.playerBlack.text = (state.playerBlack.text != undefined) ? state.playerBlack.text : undefined;
				checkers = (state.playerBlack.checkers != undefined) ? state.playerBlack.checkers : game.playerBlack.checkers;
				game.playerBlack.allowDice = (state.playerBlack.allowDice != undefined && state.playerBlack.allowDice === true) ? true : false;
				game.playerBlack.showDice = (state.playerBlack.showDice != undefined && state.playerBlack.showDice === true) ? true : false;
				game.playerBlack.allowMove = (state.playerBlack.allowMove != undefined && state.playerBlack.allowMove === true) ? true : false;
				moves = (state.playerBlack.moves != undefined) ? state.playerBlack.moves : undefined;

				if(moves != undefined) {
					game.playerBlack.convertObjectToMove(moves);
				}
				
				if(state.playerBlack.checkers != undefined) {
					const oldCheckers = game.playerBlack.checkers;
					game.playerBlack.checkers = [];
					for(let i=0; i<checkers.length; i++) {
						const checker = new Checker(game.global);
						checker.create(checkers[i].color,checkers[i].position,checkers[i].index);
						if(checker.index == oldCheckers[i].index) {
							checker.selected = oldCheckers[i].selected;
						}
						game.playerBlack.checkers.push(checker);
					}
				}

				if(state.playerBlack.checkers != undefined) {

					CheckersUtil.setPosition(game, game.board, game.playerBlack.checkers, PLAYER_COLOR.BLACK);
				}

				if(state.playerBlack.dice != undefined) {
					if(state.playerBlack.dice[0] !== undefined 
						&& state.playerBlack.dice[1] != undefined
						&& (state.playerBlack.dice[0] != game.playerBlack.dice.first || state.playerBlack.dice[1] != game.playerBlack.dice.second)
						) {
						game.playerBlack.dice.throwTwo(state.playerBlack.dice[0], state.playerBlack.dice[1]);
						// game.playerBlack.setupMovements(game.board.columnHolder);
						if(game.playerBlack.hasMove() == false) {
							game.stage.id = STAGE.MOVE_DICES;
						}
					}else if(state.playerBlack.dice[0] != undefined
						&& state.playerBlack.dice[1] == undefined
						&& state.playerBlack.dice[0] != game.playerBlack.dice.first) {
						game.playerBlack.dice.throwOne(state.playerBlack.dice[0]);
					
					}
				}
				break;
			case 'playerWhite':
				game.playerWhite.text = (state.playerWhite.text != undefined) ? state.playerWhite.text: undefined;
				checkers = (state.playerWhite.checkers != undefined) ? state.playerWhite.checkers: game.playerWhite.checkers;
				game.playerWhite.allowDice = (state.playerWhite.allowDice != undefined && state.playerWhite.allowDice === true) ? true : false;
				game.playerWhite.showDice = (state.playerWhite.showDice != undefined && state.playerWhite.showDice === true) ? true : false;
				game.playerWhite.allowMove = (state.playerWhite.allowMove != undefined && state.playerWhite.allowMove === true) ? true : false;
				
				moves = (state.playerWhite.moves != undefined) ? state.playerWhite.moves : undefined;

				if(moves != undefined) {
					game.playerWhite.convertObjectToMove(moves);

				}

				if(state.playerWhite.checkers != undefined) {
					const oldCheckers = game.playerWhite.checkers;
					game.playerWhite.checkers = [];
					for(let i=0; i<checkers.length; i++) {
						const checker = new Checker(game.global);
						checker.create(checkers[i].color,checkers[i].position,checkers[i].index);
						if(checker.index == oldCheckers[i].index) {
							checker.selected = oldCheckers[i].selected;
						}
						game.playerWhite.checkers.push(checker);
					}
				}

				if(state.playerWhite.checkers != undefined) {
					CheckersUtil.setPosition(game, game.board, game.playerWhite.checkers, PLAYER_COLOR.WHITE);
				}

				if(state.playerWhite.dice != undefined) {
					if(state.playerWhite.dice[0] !== undefined 
						&& state.playerWhite.dice[1] != undefined
						&& (state.playerWhite.dice[0] != game.playerWhite.dice.first || state.playerWhite.dice[1] != game.playerWhite.dice.second)
						) {
						game.playerWhite.dice.throwTwo(state.playerWhite.dice[0], state.playerWhite.dice[1]);
						// game.playerWhite.setupMovements(game.board.columnHolder);
						if(game.playerWhite.hasMove() == false) {
							game.stage.id = STAGE.MOVE_DICES;
						}
					}else if(state.playerWhite.dice[0] !== undefined
						&& state.playerWhite.dice[1] == undefined
						&& state.playerWhite.dice[0] != game.playerWhite.dice.first) {
						game.playerWhite.dice.throwOne(state.playerWhite.dice[0]);

					}
				}
				break;
			}
		}

		this._nextTick.forEach((elm, index) => {
			elm();
			this._nextTick.splice(index, 1);
		});

	}
}