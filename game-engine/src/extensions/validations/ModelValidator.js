import Joi from "joi";

function ModelValidator(schema, data) {
	this.errors = [];
	this.hasError = false;
	this.schema = schema;
	this.data = data;
}

ModelValidator.prototype.validate = async function() {
	const valid = Joi.object(this.schema);


	try {
		await valid.validateAsync(this.data, {
			abortEarly: false
		});
		return true;
	}catch(err) {
		this.hasError = true;
		this.errors = this.removeFromErrors(err);
		return false;
	}
}

ModelValidator.prototype.removeFromErrors = function(errors) {
	let final = [];
	for(const err in errors.details) {
		final.push({
			field: errors.details[err].path[0],
			message: errors.details[err].message,
			type: errors.details[err].type
		});
	}

	return final;
}

ModelValidator.prototype.getErrors = function() {
	return this.errors;
}

export default ModelValidator