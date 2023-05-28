import conf from '#components/ConfProvider'
export default function(req, res, next) {
	res.setHeader('Origin', conf.getParam('host'));
	res.setHeader('Access-Control-Allow-Origin', conf.getParam('host'));
}