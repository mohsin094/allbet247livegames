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
import {EMIT} from "#backgammon/Backgammon";
import {PLAYER_COLOR} from "#backgammon/player/Player";

function GameController() {
	this.accessRules = [
		{
			methods: ['join', 'join', 'throwdice'],
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

	this.throwdice = function() {
		const gameId = this.request.data.gameId;
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
			
			if(match) {

				let game = GameHolder.get(gameId);

				if(game == false) {
					game = new Game();
					game.create({
						id: match._id,
						timer: {
							time: 60,
							timeBank: 100
						},
					})
					GameHolder.set(match._id, game);
				}

				if(this.app.user.id == match.home_id) {
					game.playerWhite.id = this.app.user.id;
					game.playerWhite.socket = this.request.socket;
					game.playerWhite.socket.emit(EMIT.MAKE_GAME, {
						playerColor: PLAYER_COLOR.WHITE,
						id: game.playerWhite.id
					});
				}else if(this.app.user.id == match.away_id) {

					game.playerBlack.id = this.app.user.id;
					game.playerBlack.socket = this.request.socket;
					game.playerBlack.socket.emit(EMIT.MAKE_GAME, {
						playerColor: PLAYER_COLOR.BLACK,
						id: game.playerBlack.id
					});
				}

				if(typeof game.playerBlack.socket == 'object' && typeof game.playerWhite.socket == 'object') {
					GameHolder.get(match._id).start123();
				}
			
			}
		}
	}
}


export default GameController