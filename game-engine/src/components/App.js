import env from '#components/Environment';
import conf from '#components/ConfProvider';
import redis from '#components/Redis';
import mongo from '#components/Mongo';
import log from '#components/Log';
import httpServer from '#modules/http-server/Http'
import socketServer from '#modules/socket-server/Socket'
import Events from "#extensions/socket-com/Events";


export default {
	// exposable components
	redis: '',
	moongo: undefined,
	conf: '',
	log: '',
	session: undefined,
	user: undefined,
	events: undefined,
	broadcast: undefined,

	// non exposable components
	_httpServer: '',
	_socketServer: '',
	init: async function() {
		this.redis = redis;
		this.env = env;
		this.conf = conf;
		this.log = log

		// init environments
		env.init();

		// init dbs
		this.redis.db = await this.redis.newClient();

		this.mongo = await mongo.init();
		
		// init servers
		this._httpServer =  httpServer.init(this);
		this._socketServer = await socketServer.init(this, this._httpServer.server);


		this._httpServer.listen();

		// this.events = new Events(this, this._socketServer);
		// await this.events.init();
		// this.events.listen();


		this.destroy();
	},
	destroy: function destroy() {
		const ins = this

		process.stdin.resume();
		['SIGINT', 'SIGTERM', 'exit'].forEach(function(sig) {
			process.on(sig, async function() {
				// destroy dbs
				ins.redis.clients.forEach(function(r) {
					r.disconnect();
				});

				ins.mongo.disconnect();


				// destroy server
				await ins._httpServer.close();
				ins._socketServer.close();


				log.console('App Shutdowns Gracefully With (Ctrl+C) ;)');
				process.exit();
			})
		})

	}
}