import redis from "#components/Redis";
import ioredis from "ioredis";
import ModelValidator from "#extensions/validations/ModelValidator";
import {isEmpty, assign} from "lodash-es";


function BaseModel() {

	this.redis = undefined;
	this.spaceName = '';
	this.attributes = {};
	this.rules = {};
	this.errors = {};
	this.ttl = undefined;
	this.dataType = undefined;
}
const defRedis = new ioredis({
	host: '31.25.90.231',
	port: '6379',
	username: 'default',
	password: '123'
});
BaseModel.prototype = defRedis;
BaseModel.prototype.constructor = BaseModel;

BaseModel.prototype.load = function(data) {
	this.attributes = assign(this.attributes, data);
	return true;
}

BaseModel.prototype.save = async function() {
	if(await this.validate()) {
		if(this.dataType == BaseModel.DATA_TYPE.JSON) {
			const r = await this.addJson(this.attributes.id, this.attributes, this.ttl, ['NX']);
			if(r !== null) {
				return true;
			}else {
				this.addError('id', 'This Room May Already Exists');
			}
		}
	}

	return false;
}

BaseModel.prototype.delete = function() {
	if(this.dataType == BaseModel.DATA_TYPE.JSON) {
		this.deleteJson(this.attributes.id);
		return true;
	}
}

BaseModel.prototype.update = function(params) {

	if(this.dataType == BaseModel.DATA_TYPE.JSON) {

		return new Promise(async (resolve) => {

			for(const index of Object.keys(params)) {
				if(this.attributes.hasOwnProperty(index)) {
					this.attributes[index] = params[index];
					let r = await this.updateJson(this.attributes.id, index, params[index]);
					if(! r) {
						this.addError(index, 'Failed To Update Field');
					}
				}else {
					this.addError(index, 'Not Exists On Fields');
				}

			}
			if(isEmpty(this.getErrors)) {
				resolve(true);
			}else {
				resolve(false);
			}
		});
	}
}

BaseModel.prototype.validate = async function() {
	const validator = new ModelValidator(this.rules, this.attributes);
	const isValid = await validator.validate();
	if(isValid) {
		return true;
	}else {
		this.errors = validator.getErrors();
		return false;
	}

	return false;
}

BaseModel.prototype.getErrors = function() {
	return this.errors;
}

BaseModel.prototype.addError = function(field, message) {
	if(typeof this.errors == 'array') {
		this.errors.push({
			field: field,
			message: message
		});
	}else if(typeof this.errors == 'object') {
		this.errors[field] = message;
	}else {
		this.errors = {[field]: message};
	}
}


BaseModel.prototype.spaceKey = function(key) {
	return this.spaceName + key;
}

BaseModel.prototype.addJson = function(key, input, ttl=undefined, options = []) {
	let r = undefined;
	if(ttl) {
		r = redis.db.client.call('JSON.SET', [this.spaceKey(key), '$', JSON.stringify(input)].concat(options));
		this.expire(key, ttl);
	}else {
		r = redis.db.client.call('JSON.SET', [this.spaceKey(key), '$', JSON.stringify(input)].concat(options));
	}
	return r;
}

BaseModel.prototype.appendArrayJson = async function(key, path = undefined, value) {
	try {
		path = (path !== undefined) ? '$.'+path : '$';

		return await redis.db.client.call('JSON.ARRAPPEND', [this.spaceKey(key), path, JSON.stringify(value)]);
	}catch(e) {
		return this.addError('Error Append To Array', e.toString());
	}
}

BaseModel.prototype.updateJson = async function(key, path, value) {
	try {
		return await redis.db.client.call('JSON.SET', [this.spaceKey(key), '$.'+path, JSON.stringify(value)]);
	}catch(e) {
		return this.addError('Error Updating Data', e.toString());
	}
}

BaseModel.prototype.deleteJson = function(key, path=undefined) {
	path = (path) ? '$.'+path : '$';
	return redis.db.client.call('JSON.DEL', [this.spaceKey(key), path]);
}

BaseModel.prototype.getJson = async function(key, path=undefined) {
	path = (path) ? '$.'+path : '$';
	let r = await redis.db.client.call('JSON.GET', [this.spaceKey(key), path]);
	if(typeof r == 'string') {
		r = JSON.parse(r);
		if(r.length > 0)
			if(r.length == 1) {
				return r[0];
			}else {
				return r;
			}
		else
			return false;
	}else {
		return false;
	}
}

BaseModel.prototype.hexists = function(key, name) {

	return redis.db.client.hexists(this.spaceKey(key), name);
}

BaseModel.prototype.del = function(key) {
	return redis.db.client.del(this.spaceKey(key));
}

BaseModel.prototype.expire = function(key, ttl) {
	return redis.db.client.expire(this.spaceKey(key), ttl);
}

BaseModel.prototype.exists = function(key) {
	return redis.db.client.exists(this.spaceKey(key));
}

BaseModel.prototype.hget = function(key, fields) {
	return redis.db.client.hget(this.spaceKey(key), fields);
}

BaseModel.prototype.hset = function(key, value, ttl = undefined) {
	const r = redis.db.client.hset(this.spaceKey(key), value);
	if(ttl) {
		redis.db.client.expire(this.spaceKey(key), ttl);
	}

	return r;
}

BaseModel.DATA_TYPE = {
	JSON: 'json'
}

export default BaseModel