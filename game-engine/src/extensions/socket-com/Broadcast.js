import Pool from "#extensions/socket-com/Pool";

function Broadcast(socket = undefined) {
	this.socket = socket;
}

Broadcast.prototype.toAll = function(event, data) {

	this.socket.server.of(this.socket.nsp.name).emit(event, data);
}

Broadcast.prototype.toOne = function(params) {
	Pool.getSocketByUserId(params.userId).emit(params.event, params.data);
}

Broadcast.prototype.toAllExcept = function(params) {
	const sockets = Pool.getAll();
	for(let socket in sockets) {
		socket = sockets[socket]

		if(params.ids.indexOf(socket.userId) === -1) {
			socket.socket.emit(params.event, params.data);
		}
	}
}

export default Broadcast