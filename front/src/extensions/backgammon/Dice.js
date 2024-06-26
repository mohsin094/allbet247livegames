import {randIntBetween} from "@/utils/Number.js";

function Dice() {
	
}

Dice.prototype.first = undefined;
Dice.prototype.second = undefined
Dice.prototype.privateFirst = undefined;
Dice.prototype.privateSecond = undefined;
Dice.prototype.interval = undefined;
Dice.prototype.throwTwo = function(first, second) {
	let i = 0;
	this.privateSecond = second;
	this.privateFirst = first;
	const interval = setInterval(() => {
		this.first = randIntBetween(1, 7);
		this.second = randIntBetween(1, 7);
		if(i == 6) {
			this.first = first;
			this.second = second;
			clearInterval(interval);
		}
		i++;
	},100);
}

Dice.prototype.throwOne = function(first) {
	let i = 0;
	this.privateFirst = first;
	const interval = setInterval(() => {
		this.first = randIntBetween(1, 7);
		if(i == 6) {
			this.first = first;
		
			clearInterval(interval);
		}
		i++;
	},100);
}

export default Dice