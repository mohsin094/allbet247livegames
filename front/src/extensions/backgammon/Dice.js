import {randIntBetween} from "@/utils/Number.js";

function Dice() {
	
}

Dice.prototype.first = undefined;
Dice.prototype.second = undefined;
Dice.prototype.interval = undefined;
Dice.prototype.throw = function() {
	let i = 0;
	this.first = randIntBetween(1,7);
	this.second = randIntBetween(1,7);
	this.interval = setInterval(() => {
		this.first = randIntBetween(1, 7);
		this.second = randIntBetween(1, 7);
		if(i == 6) {
			clearInterval(this.interval);
		}
		i++;
	},70);
}

export default Dice