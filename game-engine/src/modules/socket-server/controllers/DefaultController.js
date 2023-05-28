import {ROLES, ROLES_GROUP} from "#extensions/permissions/Role";
import RoomMessageModel from "#models/RoomMessageModel";
import RoomTestModel from "#models/RoomTestModel";
import Log from "#components/Log";
import Joi from "joi";
import RedisJsonPagination from "#components/RedisJsonPagination";
import Socket, {EMITEVENTS} from "#extensions/socket-com/Socket";
import Response from "#extensions/socket-com/Response";
import Events from "#extensions/socket-com/Events";
import EventObj from "#extensions/socket-com/EventObj";
import Message from "#components/Message";
import App from "#components/App";

function DefaultController() {
	
}

export default DefaultController