function Response(ack) {
	this.status = Response.SOCKET_STATUS.OK;
	this.data = undefined;

	//ack is function
	this.ack = ack;
}



Response.FORMAT = {
	JSON: 'json',
	PLAIN: 'plain',
	FILE: 'file'
}

Response.SOCKET_STATUS = {
	NOT_FOUND: 404,
	UNAUTHORIZE: 401,
	ACCESS_DENIED: 403,
	INTERNAL_SERVER_ERROR: 500,
	OK: 200
}

Response.SOCKET_STATUS_MESSAGE = {
	[Response.SOCKET_STATUS.NOT_FOUND]: 'Not Found',
	[Response.SOCKET_STATUS.UNAUTHORIZE]: 'Unauthorized',
	[Response.SOCKET_STATUS.ACCESS_DENIED]: 'Access Denied',
	[Response.SOCKET_STATUS.METHOD_NOT_ALLOWED]: 'Method Not Allowed',
	[Response.SOCKET_STATUS.INTERNAL_SERVER_ERROR]: 'Internal Server Error',
	[Response.SOCKET_STATUS.OK]: 'OK'
}

Response.prototype.setStatus = function(status) {
	this.status = status;
	return this;
}

Response.prototype.send = function(input = undefined) {

	if((input || this.status != Response.SOCKET_STATUS.OK) && typeof this.ack == 'function') {
		if(input === undefined) {
			input = {};
		}
		input.socketStatus = this.status;
		this.ack(input);
	}
	return;
}

export default Response