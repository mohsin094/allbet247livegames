import {PLAYER_COLOR} from "#backgammon/player/Player";

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

	if(this.originColumns[origColIndex] != undefined) {
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
		let colDestNumb = undefined;
		if(this.player.color == PLAYER_COLOR.WHITE) {

			if(col.index == 26) {
				colDest = this.columnHolder.get(this.dice);
				colDestNumb = this.dice;
			}else {
				colDest = this.columnHolder.get(col.index + this.dice);
				colDestNumb = col.index + this.dice;
			}
			
			if(col.index == 26 && this.columnHolder.isOccupied(colDest.index, diffColor) == false) {
				this.originColumns[keys[i]].push(colDest.index);
				this.isPossible = true;
			}else if(colDestNumb > 24 && this.player.isHome()) {
				this.originColumns[keys[i]].push(25);
				this.isPossible = true;
			}else if(colDestNumb < 25 && this.columnHolder.isOccupied(colDest.index, diffColor) == false) {
				this.originColumns[keys[i]].push(colDest.index);
				this.isPossible = true;
			}
			
		}else if(PLAYER_COLOR.BLACK) {

			if(col.index == -1) {
				colDest = this.columnHolder.get(25 - this.dice);
				colDestNumb = (25 - this.dice);
			}else {
				colDest = this.columnHolder.get(col.index - this.dice);
				colDestNumb = col.index - this.dice;
			}
			
			
			if(col.index == -1 && this.columnHolder.isOccupied(colDest.index, diffColor) == false) {
				this.originColumns[keys[i]].push(colDest.index);
				this.isPossible = true;
			}else if(colDestNumb < 1 && this.player.isHome()) {
				this.originColumns[keys[i]].push(0);
				this.isPossible = true;
			}else if(colDestNumb > 0 && this.columnHolder.isOccupied(colDest.index, diffColor) == false) {
				this.originColumns[keys[i]].push(colDest.index);
				this.isPossible = true;
			}

		}
		
	}

	//check all of them
	if(this.player.isHome()) {
		if(this.player.color == PLAYER_COLOR.WHITE) {
			let isLessThan = false;
			for(const [key, value] of Object.entries(this.originColumns)) {
				if(parseInt(key) + this.dice < 26) {
					isLessThan = true;
					break;
				}
			}
			
			if(isLessThan) {
				for(const [key, value] of Object.entries(this.originColumns)) {
					if(parseInt(key) + this.dice > 25) {
						console.log(key)
						delete this.originColumns[key];
					}
				}	
			}

		}else {

			let isMoreThan = false;
			for(const [key, value] of Object.entries(this.originColumns)) {
				if(parseInt(key) - this.dice < -1) {
					isMoreThan = true;
					break;
				}
			}
			if(isMoreThan) {
				for(const [key, value] of Object.entries(this.originColumns)) {
					if(parseInt(key) - this.dice < 0) {
						delete this.originColumns[key];
					}
				}	
			}

		}
	}
}

Move.prototype.setupOrigins = function() {
	this.originColumns = new Set();
	const outCheckers = this.player.getOutCheckers();

	if(outCheckers.length > 0) {
		for(let i=0; i<outCheckers.length; i++) {
			this.originColumns.add(outCheckers[i].position);
		}	
	}else {
		for(let i=0; i<this.player.checkers.length; i++) {
			this.originColumns.add(this.player.checkers[i].position);
		}
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