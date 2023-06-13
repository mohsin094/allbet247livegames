import {indexOf} from 'lodash-es'
function Role() {
	this.name = roles.GUEST;
}

const roles = {
	GUEST: '?',
	MEMBER: '@',
	SYSTEM: 'system',
}



const perms = {
	VIEW_INDEX: 'view_index'
}

const access = {
	'?': [
		perms.VIEW_INDEX
	],
	'@': []
}



Role.prototype.can = function(action) {
	return (indexOf(access[this.name][action]) !== -1);
}

Role.prototype.getRole = function() {
	return this.name;
}

Role.prototype.setRole = function(role) {
	this.name = role;
}

export default Role
export const ROLES = roles
export const PERMS = perms
export const ACCESS = access