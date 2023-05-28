import redis from "#components/Redis";
import Log from "#components/Log";


function Events(app) {
	this.subscriber = undefined;
	this.publisher = undefined;
	this.subscribers = {};
	this.app = app;
}

Events.prototype.trigger = function(eventObj) {
	this.publisher.publish(eventObj.eventName, JSON.stringify(eventObj.data));
}

Events.prototype.on = function(event, callback) {
	this.subscriber.subscribe(event, (err, count) => {

		if(err) {
			Log.error(`Cannot Listen To Event ${event} Due To Error: ${err.toString()}`);
		}else {
			Log.info(`Successfully Listen to ${event}`);
		}
	});

	this.subscribers[event].push(callback);
}

Events.prototype.listen = function() {

	this.on(Events.ON.BROADCAST_TO_ONE, this.app.broadcast.toOne);
	this.on(Events.ON.BROADCAST_TO_ALL_EXCEPT, this.app.broadcast.toAllExcept);

	this.subscriber.on("message", (event, message) => {

		this.subscribers[event].forEach((cb) => {
			cb(JSON.parse(message));
		});
	});
}

Events.prototype.init = async function() {
	this.publisher = (await redis.newClient()).client;
	this.subscriber = (await redis.newClient()).client;
	this.subscribers = {
		[Events.ON.BROADCAST_TO_ALL_EXCEPT]: [],
		[Events.ON.BROADCAST_TO_ONE]: []
	};
}

Events.ON = {
	BROADCAST_TO_ONE: 'broadcast_to_one',
	BROADCAST_TO_ALL_EXCEPT: 'broadcast_to_all_except'
}

export default Events