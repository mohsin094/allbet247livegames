export default {
	games: {},
	get: function(id) {
		return (this.games[id] != undefined) ? this.games[id] : false;
	},
	set: function(id, game) {
		this.games[id] = game;
	},

	remove: function(id) {
		delete this.games[id];
	}
}