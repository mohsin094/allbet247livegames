import {trimStart, reverse, upperFirst, toLower} from 'lodash-es'
import {existsSync} from 'fs'
import path from '#components/Path'
import log from '#components/Log'
import conf from '#components/ConfProvider'
import {getName, NAME} from '#components/Cookie'
import Session from '#components/Session'
import App from '#components/App'
import User from '#extensions/user/User'
import Response from "#extensions/http-com/Response";
import {ROLES} from "#extensions/permissions/Role";

let Web = function() {
	let controller = '';
	let module = '';
	let method = '';
	let query = '';
	this.session = undefined;
}



Web.prototype.requestMaker = async function(req, res) {

	// await this.initSession(req, res);
	await this.initUser(req);
	this.appendToApp();
	return await this.initController(req, res);
}

Web.prototype.appendToApp = function() {
	App.user = this.user;
	App.session = this.session;
}

Web.prototype.responseMaker = function(res) {

}

Web.prototype.initUser = async function(req) {
	this.user = new User();
	if(req.get('x-sess-id') === conf.getParam('adminWebServiceToken')) {
		this.user.setRole(ROLES.SYSTEM);
		this.user.setIsGuest(false);
	}

	// if(await this.session.has('role')) {
	// 	this.user.setRole(await this.session.get('role'));
	// 	this.user.setIsGuest(false);
	// }
}

Web.prototype.initSession =  function(req, res) {
	const prom = new Promise(async (resolve) => {

		let sessionId = req.get(conf.getParam('sessionHttpHeader')) ? req.get(conf.getParam('sessionHttpHeader')) : undefined;
		if(sessionId == undefined) {
			sessionId = req.cookies[getName(NAME.SESSION_ID)] ? req.cookies[getName(NAME.SESSION_ID)] : undefined;
		}


		/*
		@todo if sessionId is undefined 403 must returned
		 */
		if(sessionId == undefined) {
			this.session = new Session();
			await this.session.generate();
		}else {
			this.session = new Session(sessionId);
		}

		if(await this.session.exists(sessionId)) {
			(sessionId !== undefined) ? await this.session.extend() : '';
		}else {
			this.session = new Session();
			await this.session.generate();
		}

		/*
		@todo expire date not set
		 */
		if(this.session.isNew) {
			res.cookie(getName(NAME.SESSION_ID), this.session.id, {expire: new Date(Date.now() + this.session.ttl)});
		}



		resolve(true);
	})

	return prom;
}



Web.prototype.controllerExists = function(name) {
	return existsSync(name);
}

Web.prototype.initController = async function(req, res) {

		const rPath = reverse(trimStart(req.path, '/').split('/'));
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


		this.query = req.query;


		const filePath = path.join(path.basePath, 'src', 'modules', 'http-server', `/${this.module}/controllers/${this.controller}.js`);
		if(this.controllerExists(filePath)) {
			let {default: controller} = await import(filePath);
			let {default: mainController} = await import(path.join(path.basePath, 'src', 'modules', 'http-server', 'components', 'MainController.js'));


			if(typeof controller == 'function') {
				controller.prototype = Object.create(mainController.prototype);
				controller.constructor = controller;

				const finalController = new controller();



				finalController.init.call(finalController, App, req, res, controllerName, methodName);


				if(finalController.hasOwnProperty(this.method)) {
					return finalController.run(finalController);
				}else {
					log.error(`Couldn't Find Method ${this.method} In Controller ${filePath}`);
					return finalController.httpErrorHandler(Response.HTTP_STATUS.NOT_FOUND);
				}
			}else {
				log.error(`Controller File May Not Exported Function, Controller ${this.controller} Is Not Function`);
				return res.sendStatus(Response.HTTP_STATUS.INTERNAL_SERVER_ERROR);
			}

		}else {
			log.error(`Couldn't Find ${filePath}`);
			return res.sendStatus(Response.HTTP_STATUS.NOT_FOUND);
		}


}

export default Web