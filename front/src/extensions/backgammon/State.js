import CheckersUtil from "@/extensions/backgammon/CheckersUtil.js";
import {PLAYER_COLOR} from "@/extensions/backgammon/Player";
export default {
	manage: function(game, state) {
	
		const stateKeys = Object.keys(state);

		for(let index=0; index < stateKeys.length; index++) {
			switch(stateKeys[index]) {
			case 'stage':
				game.stage.id = state[stateKeys[index]].id;
				break;
			case 'board':

				break;
			case 'game':
				game.timer =  (state.game.timer != undefined) ? state.game.timer : undefined;
				break;
			case 'playerBlack':
				
				game.playerBlack.text = (state.playerBlack.text != undefined) ? state.playerBlack.text : undefined;
				game.playerBlack.checkers = (state.playerBlack.checkers != undefined) ? state.playerBlack.checkers : game.playerBlack.checkers;
				game.playerBlack.allowDice = (state.playerBlack.allowDice != undefined && state.playerBlack.allowDice === true) ? true : false;
				game.playerBlack.showDice = (state.playerBlack.showDice != undefined && state.playerBlack.showDice === true) ? true : false;
				game.playerBlack.allowMove = (state.playerBlack.allowMove != undefined && state.playerBlack.allowMove === true) ? true : false;

				if(state.playerBlack.checkers != undefined) {
				
					
					CheckersUtil.setPosition(game.board, state.playerBlack.checkers, PLAYER_COLOR.BLACK);
				}

				if(state.playerBlack.dice != undefined) {
					if(state.playerBlack.dice[0] !== undefined && state.playerBlack.dice[1] != undefined) {
						game.playerBlack.dice.throwTwo(state.playerBlack.dice[0], state.playerBlack.dice[1]);
					}else if(state.playerBlack.dice[0] != undefined) {
						game.playerBlack.dice.throwOne(state.playerBlack.dice[0]);
					}
				}
				break;
			case 'playerWhite':
				game.playerWhite.text = (state.playerWhite.text != undefined) ? state.playerWhite.text: undefined;
				game.playerWhite.checkers = (state.playerWhite.checkers != undefined) ? state.playerWhite.checkers: game.playerWhite.checkers;
				game.playerWhite.allowDice = (state.playerWhite.allowDice != undefined && state.playerWhite.allowDice === true) ? true : false;
				game.playerWhite.showDice = (state.playerWhite.showDice != undefined && state.playerWhite.showDice === true) ? true : false;
				game.playerWhite.allowMove = (state.playerWhite.allowMove != undefined && state.playerWhite.allowMove === true) ? true : false;

				if(state.playerWhite.checkers != undefined) {
					
					CheckersUtil.setPosition(game.board, state.playerWhite.checkers, PLAYER_COLOR.WHITE);
				}

				if(state.playerWhite.dice != undefined) {
					if(state.playerWhite.dice[0] !== undefined && state.playerWhite.dice[1] != undefined) {
						game.playerWhite.dice.throwTwo(state.playerWhite.dice[0], state.playerWhite.dice[1]);
					}else if(state.playerWhite.dice[0] != undefined) {
						
						game.playerWhite.dice.throwOne(state.playerWhite.dice[0]);
					}
						
					
				}
				break;
			}
		}

	}
}