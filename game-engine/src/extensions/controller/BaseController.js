import Request from '#extensions/http-com/Request'
import Response from '#extensions/http-com/Response'
import AccessControl from '#extensions/permissions/AccessControl'
import HttpSchemaValidator from "#extensions/validations/HttpSchemaValidator";

function BaseController () {


}

BaseController.prototype.controller = {
	id: undefined
}

BaseController.prototype.method = {
	id: undefined
}

BaseController.prototype.app = undefined;


BaseController.prototype.init = async function(app, req, res, controllerName, methodName) {

	this.request = new Request(req);
	this.response = new Response(res);
	this.app = app;
	this.method.id = methodName;
	this.controller.id = controllerName;


}

BaseController.prototype.run = async function(controllerInstance) {
	const bef = this.beforeMethod();
	if(bef !== true) {
		return bef;
	}else {
		this.response.send(await controllerInstance[this.method.id].apply(controllerInstance, Object.values(this.request.params)));
	}
}

BaseController.prototype.send = function(data) {


	return data;
}


BaseController.prototype.httpErrorHandler = function(statusCode, message = null) {
	this.response.setStatus(statusCode);
	return this.response.send((message) ? message : Response.HTTP_STATUS_MESSAGE[statusCode]);
}

BaseController.prototype.accessCheck = function() {
	const ac = new AccessControl(this.accessRules, this.method.id, this.app.user.getRole(), this.request.method);
	return ac.accessCheck();
}

BaseController.prototype.httpMethodCheck = function() {
	const validator = new HttpSchemaValidator(this.accessRules, this.method.id, this.request.method);
	return validator.validateHttpMethod();
}

BaseController.prototype.beforeMethod = function() {

	if(! this.httpMethodCheck()) {
		return this.httpErrorHandler(Response.HTTP_STATUS.METHOD_NOT_ALLOWED);
	}

	if(! this.accessCheck()) {
		return this.httpErrorHandler(Response.HTTP_STATUS.ACCESS_DENIED);
	}

	return true;
}

BaseController.prototype.afterMethod = function() {

}


export default BaseController