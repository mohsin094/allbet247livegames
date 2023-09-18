import rawBody from 'raw-body'
import contentType from 'content-type'
import conf from '#components/ConfProvider'
import log from '#components/Log'

export default function(req, res, next) {

	// rawBody(req, {
	// 	length: req.headers['content-length'],
	// 	limit: conf.getParam('httpRequestSizeLimit'),
	// 	encoding: contentType.parse(req).parameters.charset
	// }, (err, string) => {
	// 	if(err) {
	// 		log.error(`Request Reaches Raw Body Limits For ${conf.getParam('httpRequestSizeLimit')}`, err);
	// 		next(err);
	// 	}else {
	// 		req.text = string;
	// 		next();
	// 	}
	// });

	next();
}