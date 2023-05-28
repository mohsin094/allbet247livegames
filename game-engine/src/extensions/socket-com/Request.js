import {reverse} from "lodash-es";
function Request(req, params) {
	let nsp = req.nsp.name.split('/');
	nsp = nsp.length > 1 ? reverse(nsp)[0] : nsp[0];

	this.data = params;
	this.namespace = nsp;
	this.socket = req;
}

export default Request