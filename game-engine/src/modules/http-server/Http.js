import express from 'express'
import {SERVER} from '#components/ConfProvider'
import {createServer} from 'http'
import Router from '#extensions/router/Router'
import Middlewares from '#extensions/router/middlewares/Middlewares'
import cookieParse from 'cookie-parser'

export default {
	app: '',
	express: '',
	server: '',
	init: function(app) {
		this.app = app;
		this.express = express();

		Router.invokeInitMiddlewares(this.express);
		if(Object.keys(Middlewares).length > 0) {
			this.express.use(Router.invokeMiddlewares);
		}

		Router.invokeRoutes(this.express);
		this.server = createServer(this.express);
		return this;
	},
	listen: function() {

		this.server.listen(this.app.conf.getServer(SERVER.HTTP).port, () => this.app.log.info(`Http Server Runs Over Port: ${this.app.conf.getServer(SERVER.HTTP).port}`));
		this.server.on('close', () => this.app.log.info('Http Server Closed'));

	},
	close: function() {
		if(this.server !== '' && this.server != undefined)
			this.server.close()
	}
}