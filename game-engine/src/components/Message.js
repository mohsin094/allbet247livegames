

function Message(id = undefined, message = undefined, sender = undefined, type = 1, replyTo = undefined, date = undefined, status = 0, pinned = false, testOptions = undefined) {

	this.fields = {
		id: id,
		message: message,
		sender: sender,
		type: type,
		reply_to: replyTo,
		date: date,
		status: status,
		pinned: pinned,
		test_options: testOptions
	}
}

Message.prototype.privateAttributes = function() {
	return {
		id: this.fields.id,
		message: this.fields.message,
		type: this.fields.type,
		reply_to: this.fields.reply_to,
		date: this.fields.date,
		status: this.fields.status,
		pinned: this.fields.pinned,
		sender: this.fields.sender,
		test_options: this.fields.test_options
	};
}

Message.prototype.publicAttributes = function() {
	return {
		id: this.fields.id,
		message: this.fields.message,
		type: this.fields.type,
		reply_to: this.fields.reply_to,
		date: this.fields.date,
		status: this.fields.status,
		pinned: this.fields.pinned,
		sender: {
			id: this.fields.sender.id
		},
		test_options: this.fields.test_options
	};
}

Message.prototype.toString = function() {
	return this.fields;
}

Message.STATUS = {
	VERIFIED: 1,
	NOT_VERIFIED: 0,
	DELETED: 2,
	TEST_END: 3
};

Message.TYPE = {
	MESSAGE: 1,
	TEST: 2
};

export default Message


