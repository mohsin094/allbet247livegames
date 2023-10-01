import
{
	ROLES
}
from "#extensions/permissions/Role";
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
import MatchEventsModel from "#models/MatchEvents";
import GameTimeframesModel from "#models/GameTimeframes";
import GameHolder from "#backgammon/GameHolder";
import Game from "#backgammon/Backgammon";
import
{
	ObjectId
}
from "mongodb";
import
{
	EMIT
}
from "#backgammon/Backgammon";
import
{
	PLAYER_COLOR
}
from "#backgammon/player/Player";

function GameController()
{
	this.accessRules = [
		{
			methods: ['join', 'move', 'throwdice', 'sendchat'],
			roles: [ROLES.MEMBER],
			allow: true
		}
	];

	this._getEvent = async function(eventId)
	{

		const event = await mongo.db.collection(MatchEventsModel.name)
			.findOne(
			{
				_id: new ObjectId(eventId),
				$or: [
					{
						status: MatchEventsModel.status.PLAYING
					},
					{
						status: MatchEventsModel.status.WAITING
					},
			]
			});

		return event;
	}

	this._createGame = async function(event, time)
	{


		
		return game;

	}

	this.sendchat = function()
	{
		const gameId = this.request.data.id;
		const text = this.request.data.text;
		const userId = this.app.user.id;
		const game = GameHolder.get(gameId);
		if(gameId && game)
		{
			const player = (game.playerWhite.id == userId) ? game.playerWhite : game.playerBlack;
			const opponent = (player.color == PLAYER_COLOR.WHITE) ? game.playerBlack : game.playerWhite;

			if(typeof opponent.socket === 'object') {
				opponent.socket.emit(EMIT.SEND_CHAT, text);
			}
		}
	}

	this.move = function()
	{
		const gameId = this.request.data.id;
		const userId = this.app.user.id;
		const game = GameHolder.get(gameId);
		if(gameId && game)
		{
			if(game.activePlayer.id == userId)
			{
				game.move(this.request.data);
			}
		}
	}

	this.throwdice = function()
	{
		const gameId = this.request.data.gameId;
		const userId = this.app.user.id;
		const game = GameHolder.get(gameId);

		if(gameId && game)
		{
			if(game.activePlayer != undefined &&
				game.activePlayer.id == userId &&
				game.activePlayer.allowDice == true)
			{

				game.throwDoubleDice();
			}
			else
			{
				// this log may seen in log history, that's because players click fast on throw dice when they are not allow to throw dice
				Log.debug("gameController.js:101");
				Log.debug(userId);
				Log.debug(game);
			}
		}
		else
		{
			Log.debug("gameController.js:100");
			Log.debug(gameId, game);
		}
	}

	this.join = async function()
	{

		const gameId = this.request.data.id;
		const event = await this._getEvent(gameId);
		if(event)
		{

			const match = await mongo.db.collection(MatchesModel.name)
				.findOne(
				{
					_id: new ObjectId(event.match_id)
				});


			const gameTime = await mongo.db.collection(GameTimeframesModel.name)
				.findOne(
				{
					_id: new ObjectId(match.timeframe_id)
				});
			let time = 60;
			switch (gameTime.timeframe)
			{
				case GameTimeframesModel.timeframe.SLOW:
					time = 60;
					break;
				case GameTimeframesModel.timeframe.NORMAL:
					time = 30;
					break;
				case GameTimeframesModel.timeframe.FAST:
					time = 20;
					break;
			}

			let game = GameHolder.get(event._id.toString());

			if(game == false)
			{
				game = new Game();
				game.create(
				{
					id: event._id.toString(),
					timer:
					{
						time: time,
						// timeBank: 10
					},
					onEnd: async (winnerId) =>
					{
						await mongo.db.collection(MatchEventsModel.name)
							.updateOne(
							{
								_id: new ObjectId(event._id.toString()),
								status: MatchEventsModel.status.PLAYING
							},
							{
								$set:
								{
									status: MatchEventsModel.status.FINISHED,
									winner: winnerId
								}
							});

						//check if last event
						const events = await mongo.db.collection(MatchEventsModel.name)
						.find({
							match_id: event.match_id
						}).toArray();

						const match = await	mongo.db.collection(MatchesModel.name)
						.findOne({
							_id: ObjectId(event.match_id)
						});
						
						let winner = 0;
						let notDone = false;
						for(let i=0; i<events.length; i++) {
							if(events[i].status !== MatchEventsModel.status.FINISHED) {
								notDone = true;
								break;
							}
						}

						//count wins
						for(let i=0; i<events.length; i++) {
							if(events[i].status == MatchEventsModel.status.FINISHED) {
								if(events[i].winner != undefined && events[i].winner == match.away_id) {
									winner--;
								}else if(events[i].winner != undefined && events[i].winner == match.home_id) {
									winner++;
								}
							}
						}

						if((notDone == false || Math.abs(winner) > events.length/2) && events.length > 0) {
							
							
							await mongo.db.collection(MatchesModel.name)
							.updateOne(
							{
								_id: new ObjectId(match._id.toString()),
								status: MatchesModel.status.PLAYING
							},
							{
								$set:
								{
									status: MatchesModel.status.FINISHED,
									winner: (winner > 0) ? match.home_id : match.away_id
								}
							});


						}
						if(typeof game.playerWhite.socket === 'object') {
							game.playerWhite.socket.emit(EMIT.GAME_ENDS, {});
						}
						if(typeof game.playerBlack.socket === 'object') {
							game.playerBlack.socket.emit(EMIT.GAME_ENDS, {});
						}
						game.nextTick(() =>
						{
							GameHolder.remove(event._id.toString());
						});
					}
				});
				GameHolder.set(event._id, game);
			}

			
			
			if(this.app.user.id == match.home_id)
			{
				game.playerWhite.id = this.app.user.id;

				game.playerWhite.socket = this.request.socket;
				game.playerWhite.socket.emit(EMIT.MAKE_GAME,
				{
					playerColor: PLAYER_COLOR.WHITE,
					id: game.playerWhite.id
				});
			}
			else if(this.app.user.id == match.away_id)
			{

				game.playerBlack.id = this.app.user.id;

				game.playerBlack.socket = this.request.socket;
				game.playerBlack.socket.emit(EMIT.MAKE_GAME,
				{
					playerColor: PLAYER_COLOR.BLACK,
					id: game.playerBlack.id
				});
			}

	
			if(typeof game.playerBlack.socket == 'object' && typeof game.playerWhite.socket == 'object')
			{
				if(game.stage == 0)
				{
				
					game.start123();
				}
			}

			if(game.stage > 1)
			{

				game.setStatePlayer(PLAYER_COLOR.BLACK,
				{
					checkers: game.playerBlack.checkers
				});

				game.nextTick(() =>
				{
					game.setStatePlayer(PLAYER_COLOR.BLACK,
					{
						checkers: undefined
					});
				});
			}

			if(game.stage > 1)
			{

				game.setStatePlayer(PLAYER_COLOR.WHITE,
				{
					checkers: game.playerWhite.checkers
				});



				game.nextTick(() =>
				{
					game.setStatePlayer(PLAYER_COLOR.WHITE,
					{
						checkers: undefined
					});
				});
			}

		}
	}
}


export default GameController