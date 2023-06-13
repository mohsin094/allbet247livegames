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


function GameController() {
	this.accessRules = [
		{
			methods: ['join'],
			roles: [ROLES.MEMBER],
			allow: true
		}
	];
	this.join = function() {
		const gameId = this.request.data.id;
		if(gameId) {
			mongo.collection(MatchesModel.name).findOne({id: new ObjectId(gameId)});
		}
	}
}


export default GameController