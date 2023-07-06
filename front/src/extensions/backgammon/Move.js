import ColumnHolder from "@/extensions/backgammon/ColumnHolder";

function Move(player, dice) {
	this.player = player;
	this.dice = dice;
}

Move.prototype.isPossible = undefined;
Move.prototype.destination = undefined;
Move.prototype.dice = undefined;
Move.prototype.originColumns = undefined;
Move.prototype.player = undefined;

Move.prototype.calculateDestinations = function() {

}

Move.prototype.init = function() {
	// setup originColumns
}

export default Move