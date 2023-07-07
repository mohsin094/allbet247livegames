import ColumnHolder from "@/extensions/backgammon/ColumnHolder";
import {PLAYER_COLOR} from "@/extensions/backgammon/Player";

function Move(player, dice) {
	this.player = player;
	this.dice = dice;
}

Move.prototype.isPossible = undefined;
Move.prototype.originColumns = undefined;

Move.prototype.dice = undefined;
Move.prototype.player = undefined;

Move.prototype.calculateDestinations = function() {
	const diffColor = (this.player.color == PLAYER_COLOR.WHITE) ? PLAYER_COLOR.WHITE : PLAYER_COLOR.BLACK;
	const keys = Object.keys(this.originColumns);
	for(let i=0; i< keys.legth, i++) {
		const col = ColumnHolder.get(this.originColumns[i]);
		switch(this.player.color) {
		case PLAYER_COLOR.WHITE:
			let colDest = this.ColumnHolder.get(col.index + this.dice);

			if(col.index + this.dice == 24 && this.player.isHome()) {
				this.originColumns[keys[i]].push(col.index + this.dice);
			}else if(colDest.isOccupied(colDest.index, PLAYER_COLOR.BLACK) == false) {
				this.originColumns[keys[i]].push(col.index + this.dice);
			}

			break;
		case PLAYER_COLOR.BLACK:
			let colDest = this.ColumnHolder.get(col.index - this.dice);

			if(col.index - this.dice == 0 && this.player.isHome()) {
				this.originColumns[keys[i]].push(col.index - this.dice);
			}else if(colDest.isOccupied(colDest.index, PLAYER_COLOR.WHITE) == false) {
				this.originColumns[keys[i]].push(col.index - this.dice);
			}
			break;
		}
	}
}

Move.prototype.setupOrigins = function() {
	this.originColumns = new Set();
	for(let i=0; i<this.player.checkers.length; i++) {
		this.originColumns.add(this.player.checkers[i].position);
	}

	this.originColumns = Object.assign({}, [...this.originColumns]);
}

Move.prototype.init = function() {
	// setup originColumns
	this.setupOrigins();
}

export default Move