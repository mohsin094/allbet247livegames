import {init, default as mainMiddlewares} from '#extensions/router/middlewares/Middlewares'
import Web from '#extensions/http-com/Web'


export default {
	invokeInitMiddlewares: function(app) {
		for(const index in init) {
			app.use(init[index]());
		}
	},
	invokeMiddlewares: function(req, res, next) {
		for(const index in mainMiddlewares) {
			mainMiddlewares[index](req, res, next);
		}
	},
	invokeRoutes: function(app) {

		app.route('/*').all((req, res) => {

			const web = new Web();
			return web.requestMaker(req, res);

		})
	}
}

