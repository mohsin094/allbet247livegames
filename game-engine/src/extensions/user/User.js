import {default as Role, ROLES, ROLES_GROUP} from '#extensions/permissions/Role'
import ConfProvider from "#components/ConfProvider";
import UserModel from "#models/UserModel";
import RoomUserModel from "#models/RoomUserModel";

function User() {
	this.role = new Role();
	this.guest = true;
	this.id = undefined;
	this.credentials = {}
}


User.prototype.isAdmin = function() {
	return (ROLES_GROUP.ADMIN.indexOf(this.getRole()) > -1) ? true : false;
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
User.prototype.login = function(session, token) {
	if(ConfProvider.getParam('adminWebServiceToken') == token) {
		this.guest = false;
		this.role.setRole(ROLES.SYSTEM);
		session.set('role', ROLES.SYSTEM);
		return true;
	}

	return false;
}

User.prototype.loginToRoom = async function(session, token, userId, roomId) {
	const model = new RoomUserModel();
	model.attributes.room_id = roomId;

	const user = await model.get(roomId, userId);

	if(user && user.access_token === token) {
		this.role.setRole(user.role);
		this.credentials = user;
		this.id = user.id;
		this.guest = false;
		session.set('role', user.role);
		return true;
	}


	return false;
}

export default User