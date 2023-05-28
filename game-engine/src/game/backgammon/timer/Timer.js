function Timer(timer)
{
	this.time = (timer.time == undefined) ? this.time : timer.time;
	this.timeBank = (timer.timeBank == undefined) ? this.timeBank : timer.timeBank;
}

Timer.prototype.time = 60;
Timer.prototype.timeBank = 10;
Timer.prototype.presentTime = undefined;
Timer.prototype.presentTimeBank = undefined;

Timer.prototype.onTick = undefined;
Timer.prototype.onTimeBankTick = undefined;
Timer.prototype.onEnd = undefined;
Timer.prototype.onTimeBankEnd = undefined;

Timer.prototype.tickCounter = 0;

Timer.prototype.start = function() {
	this.presentTime = setInterval(() => {
		if(this.tickCounter < this.time) {
			this.onTick();
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