import {randomBytes} from 'crypto'
import conf from '#components/ConfProvider';
import mongo from "#components/Mongo";
import sessionCol from "#models/Sessions";
import {forEach} from "lodash-es";

function Session(sessionId = undefined) {
	this.id = sessionId;
}

Session.prototype.begin = async function() {

	const sessions = await mongo.db.collection(sessionCol.name).find({token: this.id}).toArray();
	
	this.records = {};
	forEach(sessions, (r) => this.records[r.session_key] = r);
}

Session.prototype.set = async function(name, value) {
	if(this.has(name)) {
		await mongo.db.collection(sessionCol.name).updateOne({token: this.id, session_key: name}, {$set: {session_value: value}});
	}else {
		const token = randomBytes(32).toString("hex");
		await mongo.db.collection(sessionCol.name).insertOne({
			token: (this.id != undefined) ? this.id : token,
			session_key: name,
			session_value: value,
		});
		this.id = (this.id != undefined) ? this.id : token;
	}
	await this.begin();
}

Session.prototype.get = function(name) {

	return (this.records[name] != undefined) ? this.records[name].session_value : null;
}

Session.prototype.has = function(name) {
	return (this.records != undefined && this.records[name] != undefined) ? true : false;
}

Session.prototype.del = async function(name) {
	await mongo.db.collection(sessionCol.name).deleteOne({token: this.id, session_key: name});
	await this.begin();
}

Session.prototype.destroy = async function() {
	await mongo.db.collection(sessionCol.name).deleteMany({token: this.id});
	this.begin();
}


Session.prototype.id = undefined;
Session.prototype.records = undefined;


export default Session