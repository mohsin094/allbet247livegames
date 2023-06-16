export default {
	manage: function(game, state) {

		const stateKeys = Object.keys(state);

		for(let index=0; stateKeys.length; index++) {
			switch(state[stateKeys[index]]) {
			case 'stage':
				game.stage.id = state[stateKeys[index]].id;
				break;
			case 'board':

				break;
			case 'game':
				game.timer =  (state.game.timer != undefined) ? state.game.timer : undefined;
				break;
			case 'playerBlack':
				game.playerBlack.checkers = (game.playerBlack.checkers != undefined) ? game.playerBlack.checkers: undefined;
				break;
			case 'playerWhite':
				game.playerWhite.checkers = (game.playerWhite.checkers != undefined) ? game.playerWhite.checkers: undefined;
				break;
			}
		}
	}
}