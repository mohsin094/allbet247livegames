import AccessControl from '#extensions/router/middlewares/AccessControl'
import RequestSanitizer from '#extensions/router/middlewares/RequestSanitizer'
import Cookie from '#extensions/router/middlewares/Cookie'
import Cors from '#extensions/router/middlewares/Cors'

import express from 'express'

export const init = {
	Cookie: Cookie,
	JsonParser: express.json,
	UrlEncodedParser: () => { return express.urlencoded({extended: true})}
}
export default {
	RequestSanitizer: RequestSanitizer,
	Cors: Cors
}