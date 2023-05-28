function Timer(timer)
{

	this.timeBank = (timer.timeBank == undefined) ? this.timeBank : timer.timeBank;
	this.rounds = (timer.rounds == undefined) ? this.rounds : timer.rounds;
}

Timer.prototype.timeBank = 60;
Timer.prototype.rounds = 1;

Timer.prototype.create = function(timer)
{
}

export default Timer;