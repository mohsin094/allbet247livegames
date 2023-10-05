let Response = function(res) {
	this.original = res;
}


Response.FORMAT = {
	JSON: 'json',
	PLAIN: 'plain',
	FILE: 'file'
}

Response.HTTP_STATUS = {
	NOT_FOUND: 404,
	UNAUTHORIZE: 401,
	ACCESS_DENIED: 403,
	METHOD_NOT_ALLOWED: 405,
	INTERNAL_SERVER_ERROR: 500
}

Response.HTTP_STATUS_MESSAGE = {
	[Response.HTTP_STATUS.NOT_FOUND]: 'Not Found',
	[Response.HTTP_STATUS.UNAUTHORIZE]: 'Unauthorized',
	[Response.HTTP_STATUS.ACCESS_DENIED]: 'Access Denied',
	[Response.HTTP_STATUS.METHOD_NOT_ALLOWED]: 'Method Not Allowed',
	[Response.HTTP_STATUS.INTERNAL_SERVER_ERROR]: 'Internal Server Error'
}

Response.prototype.sendFile = function(path, attachmentName = undefined, options = []) {

}

Response.prototype.send = function(input) {

	switch(this.format) {
		case Response.FORMAT.JSON:
			return this.original.json(input);
			break;
		case Response.FORMAT.PLAIN:
			return this.original.send(input);
			break;
		case Response.FORMAT.FILE:
			return this.original.download(input);
			break;
		default:
			return this.original.send(input);
	}
}

Response.prototype.setStatus = function(statusCode) {
	this.original.status(parseInt(statusCode));
}

export default Response