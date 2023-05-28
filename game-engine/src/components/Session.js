import {randomBytes} from 'crypto'
import conf from '#components/ConfProvider'

function Session(sessionId = undefined) {
	this.id = sessionId;
	this.ttl = conf.session.ttl;
}

Session.prototype.isNew = false;

Session.prototype.set = function(name, value) {

	return this.model.update(this.id, name, value);
}

Session.prototype.get = function(name) {

	return this.model.get(this.id, name);
}

Session.prototype.has = function(name) {
	return this.model.has(this.id, name);
}

Session.prototype.exists =  async function() {
	return (await this.model.getJson(this.id) != false) ? true : false;
}

Session.prototype.destroy = function() {
	return this.model.deleteJson(this.id);
}

Session.prototype.extend = async function() {
	return this.model.expire(this.id, this.ttl);
}

Session.prototype.generate = function(customSessionId = undefined) {
	let sessionId = (customSessionId !== undefined) ? customSessionId : randomBytes(32).toString('hex');
	this.id = sessionId;
	this.isNew = true;

	const session = new SessionModel();
	this.model = session;
	return session.addJson(sessionId, Object.assign({}, schema), this.ttl);
}

Session.prototype.id = undefined;
Session.prototype.ttl = undefined;

export default Session