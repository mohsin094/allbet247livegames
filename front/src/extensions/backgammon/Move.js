import {PLAYER_COLOR} from "@/extensions/backgammon/Player";

function Move(columnHolder, player, dice) {
	this.player = player;
	this.dice = dice;
	this.columnHolder = columnHolder;
}

Move.prototype.isPossible = undefined;
Move.prototype.columnHolder = undefined;
Move.prototype.originColumns = undefined;

Move.prototype.dice = undefined;
Move.prototype.player = undefined;

Move.prototype.calculateDestinations = function() {
	const diffColor = (this.player.color == PLAYER_COLOR.WHITE) ? PLAYER_COLOR.WHITE : PLAYER_COLOR.BLACK;
	const keys = Object.keys(this.originColumns);
	for(let i=0; i< keys.length; i++) {
		const col = this.columnHolder.get(keys[i]);
		
		let colDest = undefined;
		if(this.player.color == PLAYER_COLOR.WHITE) {

			colDest = this.columnHolder.get(col.index + this.dice);

			if(colDest != undefined) {
				if(colDest.index > 24 && this.player.isHome()) {
					this.originColumns[keys[i]].push(24);
				
				}
				else if(colDest.index == 24 && this.player.isHome()) {
					this.originColumns[keys[i]].push(colDest.index);
					
				}else if(colDest.index < 24 && this.columnHolder.isOccupied(colDest.index, PLAYER_COLOR.BLACK) == false) {
					this.originColumns[keys[i]].push(colDest.index);
				
				}

			}
		}else if(this.PLAYER_COLOR.BLACK) {

			colDest = this.columnHolder.get(col.index - this.dice);

			if(colDest != undefined) {

				if(colDest.index < 0 && this.player.isHome()) {
					this.originColumns[keys[i]].push(0);
				
				}
				else if(colDest.index == 0 && this.player.isHome()) {
					this.originColumns[keys[i]].push(colDest.index);
				
				}else if(colDest.index > 0 && this.columnHolder.isOccupied(colDest.index, PLAYER_COLOR.WHITE) == false) {
					this.originColumns[keys[i]].push(colDest.index);
					
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

Move.prototype.init = function() {
	// setup originColumns
	this.isPossible = false;
	this.setupOrigins();
	this.calculateDestinations();
}

export default Move