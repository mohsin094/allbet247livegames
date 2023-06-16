import {randIntBetween} from "@/utils/Number.js";

function Dice() {
	
}

Dice.prototype.first = undefined;
Dice.prototype.second = undefined;
Dice.prototype.interval = undefined;
Dice.prototype.throw = function(first, second) {
	let i = 0;
	
	const interval = setInterval(() => {
		this.first = randIntBetween(1, 7);
		this.second = randIntBetween(1, 7);
		if(i == 6) {
			this.first = first;
			this.second = second;
			clearInterval(interval);
		}
		i++;
	},70);
}

Dice.prototype.throwOne = function(first) {
	let i = 0;
	console.log('hh'+first)
	const interval = setInterval(() => {
		this.first = randIntBetween(1, 7);
		if(i == 6) {
			this.first = first;
			console.log(first)
			clearInterval(interval);
		}
		i++;
	},70);
}

export default Dice