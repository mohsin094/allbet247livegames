import bg from "#backgammon/Backgammon";
import {ROLES} from "#extensions/permissions/Role";
import GameHolder from "#backgammon/GameHolder";

function SystemController() {
	
	this.accessRules = [
		{
			methods: ['cancel'],
			httpMethods: ['GET', 'POST'],
			roles: [ROLES.SYSTEM],
			allow: true
		}
	];



	this.cancel = async function() {
		const gameId = this.request.query.gameId;
		const game = GameHolder.get(gameId);
		
		console.log(gameId);
		if(gameId && game) {
			game.setStage(6);
			setTimeout(() => {
				GameHolder.remove(gameId);
			}, 10000);
			return this.send({result: true});
		}

		if(gameId == undefined) {
			return this.send({result: false, errors: {gameId: 'game not found'}});
		}

		return this.send({result: false});
	}

	
}



export default SystemController

