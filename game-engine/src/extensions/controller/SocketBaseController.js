import Request from '#extensions/socket-com/Request'
import Response from '#extensions/socket-com/Response'
import AccessControl from '#extensions/permissions/AccessControl'
import Log from "#components/Log";

function SocketBaseController () {


}

SocketBaseController.prototype.controller = {
	id: undefined
}

SocketBaseController.prototype.method = {
	id: undefined
}

SocketBaseController.prototype.app = undefined;


SocketBaseController.prototype.init = async function(app, req, controllerName, methodName, params = undefined, callback = undefined) {

	this.request = new Request(req, params);
	this.response = new Response(callback);
	this.app = app;
	this.method.id = methodName;
	this.controller.id = controllerName;
}

SocketBaseController.prototype.run = async function(controllerInstance) {
	const bef = this.beforeMethod();
	if(bef !== true) {
		return bef;
	}else {
		this.response.send(await controllerInstance[this.method.id].call(controllerInstance));
	}
}

SocketBaseController.prototype.send = function(data) {
	return data;
}


SocketBaseController.prototype.socketErrorHandler = function(statusCode, message = undefined) {
	Log.warning(`Socket Error: "${statusCode} ${Response.SOCKET_STATUS_MESSAGE[statusCode]}" With Message: "${message}" `);
	this.response.setStatus(statusCode);
	this.response.send();
}

SocketBaseController.prototype.accessCheck = function() {
	const ac = new AccessControl(this.accessRules, this.method.id, this.app.user.getRole(), this.request.method);
	return ac.accessCheck();
}


SocketBaseController.prototype.beforeMethod = function() {
	if(! this.accessCheck()) {
		return this.socketErrorHandler(Response.SOCKET_STATUS.ACCESS_DENIED, `Controller: "${this.controller.id}" And Method: "${this.method.id}" With Role: "${this.app.user.getRole()}"`);
	}
	return true;
}

SocketBaseController.prototype.afterMethod = function() {

}


export default SocketBaseController