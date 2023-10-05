import {indexOf} from 'lodash-es'

function AccessControl(accessRules = [], methodName = undefined, role = undefined, httpMethod = undefined) {
	this.role = role;
	this.httpMethod = httpMethod;
	this.methodName = methodName;
	this.accessRules = accessRules;
}

AccessControl.prototype.accessCheck = function() {

	let hasAccess = false;
	for(const rule of this.accessRules) {


		let matchMethods = false;
		let matchRoles = false;
		let matchHttpMethod = false;

		for(const index of Object.keys(rule)) {
			const value = rule[index];

			switch(index) {
				case 'methods':
					matchMethods = indexOf(value, this.methodName) !== -1 ? true : false;
					break;
				case 'roles':
					matchRoles = (indexOf(value, '?') !== -1 || indexOf(value, this.role) !== -1) ?  true : false;

					break;
				case 'httpMethods':
					matchHttpMethod = (indexOf(value, this.httpMethod) !== -1) ?  true : false;
					break;
			}
		}

		if(! rule.hasOwnProperty('methods')) {
			matchMethods = true;
		}

		if(! rule.hasOwnProperty('roles')) {
			matchRoles = true;
		}

		if(! rule.hasOwnProperty('httpMethods')) {
			matchHttpMethod = true;
		}

		if(matchMethods && matchRoles && matchHttpMethod) {
			if(rule.hasOwnProperty('callback') && rule.hasOwnProperty('allow')) {
				hasAccess = (rule.allow && rule.callback());
			}else if(rule.hasOwnProperty('callback')) {
				hasAccess = rule.callback();
			}else if(rule.hasOwnProperty('allow')) {
				hasAccess = rule.allow;
			}else {
				hasAccess = false;
			}
			break;
		}
	}

	return hasAccess;
}

export default AccessControl