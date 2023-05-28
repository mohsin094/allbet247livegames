import {indexOf} from "lodash-es";

function HttpSchemaValidator(accessRules = [], methodName = undefined, httpMethod = '') {
	this.errors = [];
	this.accessRules = accessRules;
	this.methodName = methodName;
	this.httpMethod = httpMethod;
}

HttpSchemaValidator.prototype.validateHttpMethod = function() {
	let isValid = true;
	for(const rule of this.accessRules) {

		let hasHttpMethods = false;
		let matchMethods = false;
		let matchHttpMethod = false;

		for(const index of Object.keys(rule)) {
			const value = rule[index];

			switch(index) {
				case 'methods':
					matchMethods = indexOf(value, this.methodName) > -1 ? true : false;
					break;
				case 'httpMethods':
					hasHttpMethods = true;
					if(value.indexOf(this.httpMethod) > -1) {
						matchHttpMethod = true;
					}
					break;
			}
		}

		if(! rule.hasOwnProperty('methods')) {
			matchMethods = true;
		}


		if(matchMethods && hasHttpMethods) {
			isValid = matchHttpMethod;
		}
	}

	return isValid;
}


export default HttpSchemaValidator