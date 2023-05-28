import Log from "#components/Log";

function Debug() {

}

Debug.obj = function(obj) {
	Log.debug('type:'+ typeof obj);
	Log.debug('this:');
	Log.debug(obj);
	Log.debug('prototype:');
	Log.debug(obj.prototype);
	Log.debug('__proto__:');
	Log.debug(obj.__proto__);
	Log.debug('this properties:');
	Log.debug(Object.keys(obj));

	Log.debug('__proto__ properties:');
	Log.debug(Object.keys(obj.__proto__));


}

export default Debug