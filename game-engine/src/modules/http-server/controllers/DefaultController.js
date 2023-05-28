import Timer from "#backgammon/timer/Timer";

function DefaultController() {
	
	this.accessRules = [
		{
			allow: true
		}
	];

	this.index = function()
	{
		const t = new Timer({
			time: 60,
			timeBank: 100
		});
		t.onTick = function() {
			console.log('tick:'+t.tickCounter);
		}

		t.onTimeBankTick = function() {
			console.log('time back tick'+ t.tickCounter);
		}

		t.onEnd = function() {
			console.log('on time end'+ t.tickCounter);
		}

		t.onTimeBankEnd = function() {
			console.log('on time bank end'+ t.tickCounter);
		}

		t.start();
	}
}



export default DefaultController

