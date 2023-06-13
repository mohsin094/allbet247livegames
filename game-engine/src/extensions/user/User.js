import {default as Role, ROLES} from '#extensions/permissions/Role'
import ConfProvider from "#components/ConfProvider";
import session from "#components/Session";
import mongo from "#components/Mongo";
import {ObjectId} from "mongodb";

function User() {
	this.role = new Role();
	this.guest = true;
	this.id = undefined;
	this.credentials = {}
}

User.prototype.can = function(action) {
	return Role.can.call(this, action);
}

User.prototype.getRole = function() {
	return this.role.getRole();
}

User.prototype.setRole = function(role) {
	return this.role.setRole(role);
}

User.prototype.setIsGuest = function(isGuest) {
	this.guest = isGuest;
}

User.prototype.isGuest = function() {
	return this.guest;
}

/*
only use for system login
 */
User.prototype.login = async function(session, token) {
	const sess = session;
	
	if(sess.has('user_id')) {
		let user = await mongo.db.collection('users').findOne({_id:new ObjectId(sess.get('user_id'))});
		
		user = user;
		if(user) {
			this.credentials = user;
			this.role.name = ROLES.MEMBER
			return true;
		}
	}
	return false;
}


export default User