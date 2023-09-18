import SocketBaseController from '#extensions/controller/SocketBaseController'
import Response from "#extensions/socket-com/Response";

function MainController() {

}


MainController.prototype = Object.create(SocketBaseController.prototype);
MainController.prototype.constructor = MainController;


MainController.prototype.init = function(app, req, controllerName, methodName, params = undefined, callback = undefined) {
	SocketBaseController.prototype.init.call(this, app, req, controllerName, methodName, params, callback);
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
	return SocketBaseController.prototype.beforeMethod.call(this);
}

MainController.prototype.setStatus = function(statusCode) {
	this.response.setStatus(statusCode);
	return this;
}


MainController.prototype.send = function(data) {

	if(data) {
		let res = {
			result: this.result
		}
		res.data = data;
		if(this.errors.length > 0) {
			res.errors = this.errors;
		}

		return res;
	}
	return undefined;
}



export default MainController

