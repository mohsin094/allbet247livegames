function Timer(timer)
{

}

Timer.prototype.time = undefined;
Timer.prototype.timeBank = undefined;
Timer.prototype.presentTime = undefined;
Timer.prototype.presentTimeBank = undefined;

Timer.prototype.onTick = undefined;
Timer.prototype.onTimeBankTick = undefined;
Timer.prototype.onEnd = undefined;
Timer.prototype.onTimeBankEnd = undefined;

Timer.prototype.tickCounter = undefined;
Timer.prototype.roundTickCouner = undefined;

Timer.prototype.create = function(timer) {
	this.onTick = () => {};
	this.onTimeBankTick = () => {};
	this.onEnd = () => {};
	this.onTimeBankEnd = () => {};
	this.tickCounter = 0;
	this.roundTickCouner = 0;
	this.time = (timer.time == undefined) ? 60 : timer.time;
	this.timeBank = (timer.timeBank == undefined) ? 0 : timer.timeBank;
	return this;
}


Timer.prototype.start = function() {
	this.roundTickCouner = 0;
	this.presentTime = setInterval(() => {
		if(this.tickCounter < this.time) {
			this.onTick();
			this.roundTickCouner++;
		}else if(this.tickCounter >= this.time && this.tickCounter < this.timeBank + this.time) {
			this.onTimeBankTick();
		}else if(this.tickCounter >= this.timeBank ) {
			this.onTimeBankEnd();
			this.onEnd();
			this.clear();
		}

		this.tickCounter++;
	}, 1000);
}

Timer.prototype.clear = function()
{
	clearTimeout(this.presentTime);
}


export default Timer;