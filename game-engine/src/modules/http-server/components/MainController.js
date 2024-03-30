import BaseController from '#extensions/controller/BaseController'
import Response from "#extensions/http-com/Response";

function MainController() {

}


MainController.prototype = Object.create(BaseController.prototype);
MainController.prototype.constructor = MainController;


MainController.prototype.init = function(app, req, res, controllerName, methodName) {
	BaseController.prototype.init.call(this, app, req, res, controllerName, methodName);
	this.result = true;
	this.errors = [];
	this.response.format = Response.FORMAT.JSON;
}

MainController.prototype.setResult = function(res) {
	this.result = res;
	return this;
}

MainController.prototype.addError = function(error, data = undefined) {
	this.errors.push({
		desc: error,
		data: data == undefined ? null : data
	});

	return this;
}

MainController.prototype.beforeMethod = function() {
	return BaseController.prototype.beforeMethod.call(this);
}

MainController.prototype.setStatus = function(statusCode) {
	this.response.setStatus(statusCode);
	return this;
}


MainController.prototype.send = function(data) {
	let res = {
		result: this.result
	}

	if(data) {
		res.data = data;
	}
	if(this.errors.length > 0) {
		res.errors = this.errors;
	}
	return res;
}



export default MainController

