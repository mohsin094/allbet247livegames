import {reverse, toLower, trimStart, upperFirst} from "lodash-es";
import path from "#components/Path";
import log from "#components/Log";
import Response from "#extensions/socket-com/Response";
import {existsSync} from "fs";
import conf from "#components/ConfProvider";
import Session from "#components/Session";
import User from "#extensions/user/User";
import Log from "#components/Log";
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

	// this.broadcast = new Broadcast(socket);

	this.session = new Session(this.socket.handshake.auth[conf.getParam('sessionHttpHeader')]);
	await this.session.begin();

	if(!this.session) {
		this.server.close();
	}

	if(await this.initUser() !== true) {
		Log.error(`Wrong User Session Token: "${this.socket.handshake.auth[conf.getParam('sessionHttpHeader')]}"`)
			return;
	}else {
		this.socket.client.userId = this.session.get('user_id');
		
		Pool.add(this.socket);
	}
	this.appendToApp();
	return true;
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
	// this.app.broadcast = this.broadcast;
}

Socket.prototype.initUser = async function() {
	this.user = new User();
	

	const r = await this.user.login(this.session, this.socket.handshake.auth[conf.getParam('sessionHttpHeader')]);
	return (r) ? r : (new Response()).setStatus(Response.SOCKET_STATUS.UNAUTHORIZE).send();
}

Socket.prototype.initSession = async function() {
	const prom = new Promise(async (resolve) => {

		let sessionId = this.socket.handshake.auth[conf.getParam('sessionHttpHeader')] ? this.socket.handshake.auth[conf.getParam('sessionHttpHeader')] : undefined;
		if(sessionId == undefined) {
			Log.error(`Session Not Found For Class "${this.roomId}" UserId: "${this.socket.handshake.auth.userId}" Token: "${this.socket.handshake.auth[conf.getParam('sessionHttpHeader')]}"`)
			resolve(false);
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
export default Socket