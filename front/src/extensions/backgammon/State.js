import CheckersUtil from "@/extensions/backgammon/CheckersUtil.js";
import {PLAYER_COLOR} from "@/extensions/backgammon/Player";
import Checker from "@/extensions/backgammon/Checker";
import {STAGE} from "@/extensions/backgammon/Game";
export default {
	manage: function(game, state) {
		
		const stateKeys = Object.keys(state);
		for(let index=0; index < stateKeys.length; index++) {
			let checkers = undefined;
			switch(stateKeys[index]) {
			case 'stage':
				if(game.stage.id !== STAGE.MOVE_FIRST_DICE && game.stage.id !== STAGE.MOVE_SECOND_DICE) {
					game.stage.id = state[stateKeys[index]].id;
				}
				break;
			case 'board':

				break;
			case 'game':
				game.timer =  (state.game.timer != undefined) ? state.game.timer : undefined;
				break;
			case 'playerBlack':
				
				game.playerBlack.text = (state.playerBlack.text != undefined) ? state.playerBlack.text : undefined;
				checkers = (state.playerBlack.checkers != undefined) ? state.playerBlack.checkers : game.playerBlack.checkers;
				game.playerBlack.allowDice = (state.playerBlack.allowDice != undefined && state.playerBlack.allowDice === true) ? true : false;
				game.playerBlack.showDice = (state.playerBlack.showDice != undefined && state.playerBlack.showDice === true) ? true : false;
				game.playerBlack.allowMove = (state.playerBlack.allowMove != undefined && state.playerBlack.allowMove === true) ? true : false;

				
				if(state.playerBlack.checkers != undefined) {
					game.playerBlack.checkers = [];
					for(let i=0; i<checkers.length; i++) {
						const checker = new Checker(game.global);
						checker.create(checkers[i].color,checkers[i].position,checkers[i].index);
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
						game.playerBlack.setupMovements(game.board.columnHolder);
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

				if(state.playerWhite.checkers != undefined) {
					game.playerWhite.checkers = [];
					for(let i=0; i<checkers.length; i++) {
						const checker = new Checker(game.global);
						checker.create(checkers[i].color,checkers[i].position,checkers[i].index);
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
						game.playerWhite.setupMovements(game.board.columnHolder);
					}else if(state.playerWhite.dice[0] !== undefined
						&& state.playerWhite.dice[1] == undefined
						&& state.playerWhite.dice[0] != game.playerWhite.dice.first) {
						game.playerWhite.dice.throwOne(state.playerWhite.dice[0]);

					}
				}
				break;
			}
		}

	}
}