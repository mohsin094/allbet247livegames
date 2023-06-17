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
				game.playerBlack.checkers = (state.playerBlack.checkers != undefined) ? state.playerBlack.checkers: undefined;
				game.playerBlack.allowDice = (state.playerBlack.allowDice != undefined && state.playerBlack.allowDice === true) ? true : false;

				if(state.playerBlack.dice != undefined && state.playerBlack.allowDice === true) {
					if(state.playerBlack.dice[0] !== undefined && state.playerBlack.dice[1] != undefined) {
						game.playerBlack.dice.throwTwo(state.playerBlack.dice[0], state.playerBlack.dice[1]);
					}else if(state.playerBlack.dice[0] != undefined) {
						game.playerBlack.dice.throwOne(state.playerBlack.dice[0]);
					}
				}
				break;
			case 'playerWhite':
				game.playerWhite.checkers = (state.playerWhite.checkers != undefined) ? state.playerWhite.checkers: undefined;
				game.playerWhite.allowDice = (state.playerWhite.allowDice != undefined && state.playerWhite.allowDice === true) ? true : false;

				if(state.playerWhite.dice != undefined && state.playerWhite.allowDice === true) {
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