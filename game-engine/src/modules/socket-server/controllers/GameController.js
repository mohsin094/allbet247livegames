import {ROLES} from "#extensions/permissions/Role";
import Log from "#components/Log";
import Joi from "joi";
import Socket from "#extensions/socket-com/Socket";
import Response from "#extensions/socket-com/Response";
import Events from "#extensions/socket-com/Events";
import EventObj from "#extensions/socket-com/EventObj";
import Message from "#components/Message";
import App from "#components/App";
import mongo from "#components/Mongo";
import MatchesModel from "#models/Matches";
import GameHolder from "#backgammon/GameHolder";
import Game from "#backgammon/Backgammon";
import {ObjectId} from "mongodb";

function GameController() {
	this.accessRules = [
		{
			methods: ['join'],
			roles: [ROLES.MEMBER],
			allow: true
		}
	];

	this.move = function() {
		const gameId = this.request.data.id;
		const userId = this.app.user.id;
		const game = GameHolder.get(gameId);
		if(gameId && game) {
			if(game.activePlayer.id == userId) {
				game.move(this.request.data.move);
			}
		}
	}

	this.throwDice = function() {
		const gameId = this.request.data.id;
		const userId = this.app.user.id;
		const game = GameHolder.get(gameId);
		if(gameId && game) {
			if(game.activePlayer.id == userId) {
				game.throwDoubleDice();
			}
		}
	}

	this.join = async function() {

		const gameId = this.request.data.id;

		if(gameId) {
			const match = await mongo.db.collection(MatchesModel.name).findOne({_id: new ObjectId(gameId)});
		
			if(match != null && GameHolder.get(gameId)) {
				
				GameHolder.get(match._id).playerBlack.id = this.app.user.id;
				GameHolder.get(match._id).playerBlack.socket = this.request.socket;

				GameHolder.get(match._id).start123();
			}else {
				const game = new Game();
				game.create({
					id: match._id,
					playerWhite: {
						id: match.home_id
					},
					timer: {
						time: 60,
						timeBank: 100
					},
				})
				GameHolder.set(match._id, game);
			
				if(match.home_id == this.app.user.id) {
					GameHolder.get(match._id).playerWhite.socket = this.request.socket;
				}
				// GameHolder.get(match._id).start123();

			}
		}
	}
}


export default GameController