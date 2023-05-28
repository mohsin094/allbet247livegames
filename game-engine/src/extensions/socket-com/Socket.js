import {reverse, toLower, trimStart, upperFirst} from "lodash-es";
import path from "#components/Path";
import log from "#components/Log";
import Response from "#extensions/socket-com/Response";
import {existsSync} from "fs";
import conf from "#components/ConfProvider";
import Session from "#components/Session";
import User from "#extensions/user/User";
import Log from "#components/Log";
import {ROLES_GROUP} from "#extensions/permissions/Role";
import Pool from "#extensions/socket-com/Pool";
import Broadcast from "#extensions/socket-com/Broadcast";


function Socket(argRoomId = undefined) {
	this.socket = undefined;
	this.server = undefined;
	this.eventName = undefined;
	this.session = undefined;
	this.user = undefined;
	this.controller = '';
	this.module = '';
	this.method = '';
	this.args = undefined;
	this.roomId = argRoomId;
	this.callback = undefined;
	this.broadcast = undefined;
	this.app = {
		user: undefined,
		session: undefined,
		broadcast: undefined
	};
}

Socket.prototype.controllerExists = function(name) {
	return existsSync(name);
}

Socket.prototype.init = async function(server, socket) {

	this.socket = socket;
	this.server = server;

	this.broadcast = new Broadcast(socket);

	await this.initSession();
	if(await this.initUser() !== true) {
		Log.error(`Wrong User Token For Class "${this.roomId}" UserId: "${this.socket.handshake.auth.userId}" Token: "${this.socket.handshake.auth[conf.getParam('sessionHttpHeader')]}"`)
			return;
	}else {
		this.socket.client.userId = this.socket.handshake.auth.userId;
		if(this.user.isAdmin()) {
			this.socket.join(nameSpaceRooms.ADMIN);
		}else {
			this.socket.join(nameSpaceRooms.NON_ADMIN);
		}

		Pool.add(this.socket);
	}
	this.appendToApp();
}

Socket.prototype.requestMaker = async function(eventName, args, callback = undefined) {
	this.eventName = eventName;
	this.args = args;
	this.callback = callback;


	await this.initController(this.eventName, this.args, this.callback);
}

Socket.prototype.appendToApp = function() {
	this.app.user = this.user;
	this.app.session = this.session;
	this.app.broadcast = this.broadcast;
}

Socket.prototype.initUser = async function() {
	this.user = new User();
	const r = await this.user.loginToRoom(this.session, this.session.id, this.socket.handshake.auth.userId, this.roomId);
	return (r) ? r : (new Response()).setStatus(Response.SOCKET_STATUS.UNAUTHORIZE).send();
}

Socket.prototype.initSession = async function() {
	const prom = new Promise(async (resolve) => {

		let sessionId = this.socket.handshake.auth[conf.getParam('sessionHttpHeader')] ? this.socket.handshake.auth[conf.getParam('sessionHttpHeader')] : undefined;
		if(sessionId == undefined) {
			Log.error(`Session Not Found For Class "${this.roomId}" UserId: "${this.socket.handshake.auth.userId}" Token: "${this.socket.handshake.auth[conf.getParam('sessionHttpHeader')]}"`)

		}else {
			this.session = new Session();
			await this.session.generate(sessionId);
		}
		resolve(true);
	})

	return prom;
}

Socket.prototype.initController = async function(eventName, args, callback = undefined) {

	const rPath = reverse(trimStart(eventName, '/').split('/'));
	let controllerName = '';
	rPath[1] ? rPath[1].split('-').forEach((cname) => {
		controllerName += upperFirst(cname)
	}) : '';

	let methodName = '';
	let c = 0;
	rPath[0] ? rPath[0].split('-').forEach((cname) => {
		methodName += (c == 0) ? toLower(cname) : upperFirst(cname);
		c++;
	}) : '';


	this.method = methodName != '' ? methodName : 'index';
	this.controller = controllerName != '' ? controllerName+'Controller' : 'DefaultController';
	this.module = rPath[2] ? rPath[2] : '';

	const filePath = path.join(path.basePath, 'src', 'modules', 'socket-server', `/${this.module}/controllers/${this.controller}.js`);
	if(this.controllerExists(filePath)) {
		let {default: controller} = await import(filePath);
		let {default: mainController} = await import(path.join(path.basePath, 'src', 'modules', 'socket-server', 'components', 'MainController.js'));


		if(typeof controller == 'function') {
			controller.prototype = Object.create(mainController.prototype);
			controller.constructor = controller;



			const finalController = new controller();
			finalController.init(this.app, this.socket, this.controller, methodName, this.args, callback);

			if(finalController.hasOwnProperty(this.method)) {
				return finalController.run(finalController);
			}else {
				log.error(`Couldn't Find Method ${this.method} In Socket Controller ${filePath}`);
				return finalController.socketErrorHandler(Response.SOCKET_STATUS.NOT_FOUND);
			}
		}else {
			log.error(`Socket Controller File May Not Exported Function, Socket Controller ${this.controller} Is Not Function`);
			// return res.sendStatus(Response.HTTP_STATUS.INTERNAL_SERVER_ERROR);
		}

	}else {
		log.error(`Couldn't Find ${filePath}`);
		// return res.sendStatus(Response.HTTP_STATUS.NOT_FOUND);
	}

}

const socketEvents = {
};

const socketEmitEvents = {
	MESSAGE: 'message',
	MESSAGE_TO_VERIFY: 'message_to_verify',
	MESSAGE_TO_DELETE: 'message_to_delete',
	MESSAGE_TO_PIN: 'message_to_pin',
	MESSAGE_TO_UNPIN: 'message_to_unpin',
	TEST: 'test',
	TEST_START: 'test_start',
	TEST_END: 'test_end'

};

const nameSpaceRooms = {
	ADMIN: 'admin',
	NON_ADMIN: 'non-admin'
};

export default Socket
export {socketEmitEvents as EMITEVENTS}
export {nameSpaceRooms as NAMESPACEROOMS}