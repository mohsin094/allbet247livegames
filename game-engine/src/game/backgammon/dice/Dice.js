import {randBetween} from "#utils/Random";

function Dice()
{

}

const doubleDice = [2,4,8,16,32,64];

Dice.prototype.throwOne = function() {
	return [randBetween(1,6)];
}

Dice.prototype.throwTwo = function() {
	// return [randBetween(1,6), randBetween(1,6)];
	return [randBetween(1,3), randBetween(1,3)];
}

Dice.prototype.throwDouble = function() {
	return doubleDice[randBetween(0, 5)];
}

export default Dice