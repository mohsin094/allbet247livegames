import Log from "#components/Log";
import Middlewares from "#extensions/socket-router/middlewares/Middlewares";
import Socket from "#extensions/socket-com/Socket";

export default {
	server: undefined,


	init: function(server) {
		this.server = server;

		this.server.on('connection', async socket => {
			for(const index in Middlewares) {
				Middlewares[index](socket, next);
			}


			const soc = new Socket();
			await soc.init(this.server, socket);



			socket.onAny((eventName, args, callback) => {
				
				soc.requestMaker(eventName, args, callback);
			});


		})
	},

	// addSpace: function(namespace) {

	// 	if(this.server._nsps.has(namespace) === false) {

	// 		let space = this.server.of(namespace);
	// 		Log.info(`Room ${namespace} Created And Ready To Use`);
	// 		space.on('connection', async socket => {
	// 			for(const index in Middlewares) {
	// 				Middlewares[index](socket, next);
	// 			}


	// 			const soc = new Socket(namespace.split('/')[2]);
	// 			await soc.init(this.server, socket);



	// 			socket.onAny((eventName, args, callback) => {
	// 				soc.requestMaker(eventName, args, callback);
	// 			});


	// 		})
	// 	}
	// },
	// removeSpace: async function(namespace) {
	// 	const nsp = this.server.of(namespace);
	// 	await nsp.disconnectSockets(true);
	// 	this.server._nsps.delete(namespace)


	// }
}
