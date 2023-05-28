let Request = function(req) {
	this.original = req;

	this.data = req.body;
	this.params = req.query;
	this.headers = req.headers;
	this.isPost = (req.method == 'POST') ? true : false;
	this.isGet = (req.method == 'GET') ? true : false;
	this.isDELETE = (req.method == 'DELETE') ? true : false;
	this.isPut = (req.method == 'PUT') ? true : false;
	this.dataType = (req.headers['content-type'] !== undefined) ? req.headers['content-type'] : false;
	this.method = req.method;

	this.posts = req.body;
	this.puts = req.puts;

}

Request.prototype.FORMAT = {
	JSON: 'json',
	PLAIN: 'plain',
	FILE: 'file'
}

// Request.prototype.original = undefined;
// Request.prototype.content = '';
// Request.prototype.data = '';
// Request.prototype.params = undefined;
// Request.prototype.headers = {}
// Request.prototype.isPost = undefined;
// Request.prototype.isGet = undefined;
// Request.prototype.isDelete = undefined;
// Request.prototype.isPut = undefined;
// Request.prototype.dataType = undefined;
// Request.prototype.method = undefined;
//
// Request.prototype.posts = undefined;
// Request.prototype.puts = undefined;

Request.prototype.posts = function() {
	return this.posts;
}

Request.prototype.puts = function() {
	return this.puts;
}

Request.prototype.params = function() {
	return this.params;
}

export default Request