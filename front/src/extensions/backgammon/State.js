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
				game.playerBlack.dice = (state.playerBlack.dice != undefined && state.playerBlack.dice === true) ? true : false;
				
				break;
			case 'playerWhite':
				game.playerWhite.checkers = (state.playerWhite.checkers != undefined) ? state.playerWhite.checkers: undefined;
				game.playerWhite.allowDice = (state.playerWhite.allowDice != undefined && state.playerWhite.allowDice === true) ? true : false;
				game.playerWhite.dice = (state.playerWhite.dice != undefined && state.playerWhite.dice === true) ? true : false;
		
				break;
			}
		}

	}
}