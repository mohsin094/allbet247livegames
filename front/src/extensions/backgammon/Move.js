import {PLAYER_COLOR} from "@/extensions/backgammon/Player";

function Move(columnHolder, player, dice) {
	this.player = player;
	this.dice = dice;
	this.columnHolder = columnHolder;
}

Move.prototype.isPossible = undefined;
Move.prototype.columnHolder = undefined;
Move.prototype.originColumns = undefined;
Move.prototype.moved = undefined;
Move.prototype.id = undefined;
Move.prototype.dice = undefined;
Move.prototype.player = undefined;


Move.prototype.getOriginColumn = function(origColIndex) {
	if(this.originColumns[origColIndex] !== undefined) {
		return this.originColumns[origColIndex];
	}

	return undefined;
}

Move.prototype.setNotPossible = function() {
	this.isPossible = false;
}

Move.prototype.calculateDestinations = function() {
	const diffColor = (this.player.color == PLAYER_COLOR.WHITE) ? PLAYER_COLOR.BLACK : PLAYER_COLOR.WHITE;
	const keys = Object.keys(this.originColumns);
	for(let i=0; i< keys.length; i++) {
		const col = this.columnHolder.get(keys[i]);
		
		let colDest = undefined;
		if(this.player.color == PLAYER_COLOR.WHITE) {

			colDest = this.columnHolder.get(col.index + this.dice);
			if(colDest != undefined) {
				if(colDest.index > 24 && this.player.isHome()) {
					this.originColumns[keys[i]].push(25);
					this.isPossible = true;
				}
				else if(colDest.index == 24) {
					this.originColumns[keys[i]].push(colDest.index);
					this.isPossible = true;
				}else if(colDest.index < 24 && this.columnHolder.isOccupied(colDest.index, diffColor) == false) {
					this.originColumns[keys[i]].push(colDest.index);
					this.isPossible = true;
				}

			}
		}else if(PLAYER_COLOR.BLACK) {

			colDest = this.columnHolder.get(col.index - this.dice);

			if(colDest != undefined) {

				if(colDest.index < 0 && this.player.isHome()) {
					this.originColumns[keys[i]].push(0);
					this.isPossible = true;
				}
				else if(colDest.index == 0 && this.player.isHome()) {
					this.originColumns[keys[i]].push(colDest.index);
					this.isPossible = true;
				}else if(colDest.index > 0 && this.columnHolder.isOccupied(colDest.index, diffColor) == false) {
					this.originColumns[keys[i]].push(colDest.index);
					this.isPossible = true;
				}
			}
		}
		
	}
}

Move.prototype.setupOrigins = function() {
	this.originColumns = new Set();
	for(let i=0; i<this.player.checkers.length; i++) {
		this.originColumns.add(this.player.checkers[i].position);
	}
	const final = {};
	this.originColumns = [...this.originColumns];

	this.originColumns.forEach((element, index) => {
	  final[element] = [];
	});
	this.originColumns = final;
}

Move.prototype.init = function(moved) {
	// setup originColumns
	this.isPossible = false;
	this.moved = false;
	this.id = Math.random();

	if(moved) {
		this.moved = true;
	}else {
		this.setupOrigins();
		this.calculateDestinations();
	}
}

export default Move