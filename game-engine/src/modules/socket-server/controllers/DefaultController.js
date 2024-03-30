import {ROLES} from "#extensions/permissions/Role";
import Log from "#components/Log";
import Joi from "joi";
import RedisJsonPagination from "#components/RedisJsonPagination";
import Socket from "#extensions/socket-com/Socket";
import Response from "#extensions/socket-com/Response";
import Events from "#extensions/socket-com/Events";
import EventObj from "#extensions/socket-com/EventObj";
import Message from "#components/Message";
import App from "#components/App";

function DefaultController() {
	this.accessRules = [
		{
			methods: ['index'],
			callback: () => (true)
		}
	];
	this.index = function() {

	}
}


export default DefaultController