import {findKey} from "lodash-es";

export default {
	_pool: {},

	getAll: function() {
		return this._pool;
	},

	getSocketByUserId: function(id) {

		let r = (this._pool.hasOwnProperty(id)) ? this._pool[id] : undefined;
		if(r == undefined) {
			r = findKey(this._pool, (o) => o.userId === id);
			if(r !== undefined) {
				return this._pool[r].socket;
			}else {
				r = undefined;
			}
		}


		return r;
	},

	add: function(socket) {

		const r = findKey(this._pool, (o) => o.userId === socket.userId);
		if(r !== undefined) {
			delete this.remove(r);
		}

		this._pool[socket.id] = {
			userId: socket.client.userId,
			socket: socket
		};
	},

	remove: function(id) {
		delete this._pool[id];
		delete this._pool[findKey(this._pool, (o) => o.userId === id)];
	},
}