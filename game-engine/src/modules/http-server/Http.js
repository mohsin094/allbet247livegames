import express from 'express'
import {createServer} from 'http'
import {createServer as createHttpsServer} from 'https'
import Router from '#extensions/router/Router'
import Middlewares from '#extensions/router/middlewares/Middlewares'
import cookieParse from 'cookie-parser';
import ConfProvider, {SERVER} from "#components/ConfProvider";
import fs from "fs";

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
		const serverConfig = ConfProvider.getServer(SERVER.HTTP);
		if(serverConfig.https.active) {
			let privateKey = fs.readFileSync(serverConfig.https.key);
			let certificate = fs.readFileSync(serverConfig.https.cert);
			let caCertificate = fs.readFileSync(serverConfig.https.ca);
			this.server = createHttpsServer({
				key: privateKey,
				cert: certificate,
				//ca: caCertificate,
				requestCert: true,
				rejectUnauthorized: false 
			},this.express);
		}else {
			this.server = createServer(this.express);
		}
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