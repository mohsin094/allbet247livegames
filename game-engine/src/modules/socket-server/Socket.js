import {Server} from 'socket.io'
import {SERVER} from '#components/ConfProvider'
import { createAdapter } from "@socket.io/redis-adapter"
import Router from "#extensions/socket-router/Router";
import Broadcast from "#extensions/socket-com/Broadcast";

export default {
	server: '',
	app: '',

	init: async function(app, httpServer) {
		this.app = app;
		this.server = new Server(httpServer, {
			path: this.app.conf.getServer(SERVER.SOCKET).path
		});


		if(process.env.SOCKET_USE_ADAPTER == 'true') {

			const pubClient = await this.app.redis.newClient();
			const subClient = await this.app.redis.newClient();

			this.server.adapter(createAdapter(pubClient.client, subClient.client));
		}


		this.app.broadcast = new Broadcast(this.server);
		Router.init(this.app, this.server);

		this.server.on('connection', () => this.app.log.info('Socket Server Started'))
		this.server.on('connect', () => this.app.log.info('Socket Server Connected'))
		
		return this;
	},
	close: function() {
		if(this.server != '' && this.server != undefined)
			this.server.close(() => this.app.log.info('Socket Server Closed'));
	}
}