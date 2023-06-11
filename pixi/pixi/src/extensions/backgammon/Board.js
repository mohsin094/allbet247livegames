import ColumnHolder from "@/extensions/backgammon/ColumnHolder";
import {remove} from "lodash-es";
import {PLAYER_COLOR} from "@/extensions/backgammon/Player.js";

function Board(globalValues) {
	this.global = globalValues;
}

Board.prototype.global = undefined;
Board.prototype.columnHolder = undefined;
Board.prototype.afterPosition = function(){}

Board.prototype.removeOffer = function() {
	this.columnHolder.removeOffer();
}

Board.prototype.offerMove = function(checker, fromPosition, dice) {

	switch(checker.color) {
	case PLAYER_COLOR.WHITE:
		
		for(let i=0; i<this.columnHolder.columns.length; i++) {
			
					
			if(fromPosition < this.columnHolder.columns[i].index) {
			
				
				if(this.columnHolder.columns[i].occupied != PLAYER_COLOR.BLACK || this.columnHolder.columns[i].container.length > 1) {
					if(fromPosition + dice.first == this.columnHolder.columns[i].index || fromPosition + dice.second == this.columnHolder.columns[i].index) {
						this.columnHolder.columns[i].focus = true;
					}
				}
			}
		}
		break;
	case PLAYER_COLOR.BLACK:

		break;
	}
}

Board.prototype.position = function(checker, index, oldPosition) {
	const column = this.columnHolder.get(index);
	let container = column.container;
	// if(checker.position != index) {
		if(oldPosition) {
			let oldContainer = this.columnHolder.get(oldPosition).container;
			remove(oldContainer, (o) => o.index == checker.index);
		}

		container.push(checker);
		checker.position = index;
		column.occupied = checker.color;
	// }

}

Board.prototype.getColumns = function() {
	return this.columnHolder;
}

Board.prototype.getColumnAt = function(index) {
	return this.columnHolder.get(index)
}

Board.prototype.create = function() {

	this.columnHolder = new ColumnHolder;
	for(let i=23; i > 11; i--) {
		this.columnHolder.add({
			index: i
		});

		if(i == 23) {
			this.columnHolder.get(i).x = (this.global.boardWidth - this.global.boardSidePadding - this.global.checkerSize - this.global.checkerMargin);
			this.columnHolder.get(i).y = 2;
		}else if(i == 22) {
			this.columnHolder.get(i).x = ((this.global.boardWidth) - this.global.boardSidePadding - ((i-11) * this.global.checkerSize) - ((i) * this.global.checkerMargin));
			this.columnHolder.get(i).y = 2;
		}else if(i == 21) {
			this.columnHolder.get(i).x = ((this.global.boardWidth) - this.global.boardSidePadding - ((i-11) * this.global.checkerSize) - ((i) * this.global.checkerMargin));
			this.columnHolder.get(i).y = 2;
		}else if(i == 20) {
			this.columnHolder.get(i).x = ((this.global.boardWidth) - this.global.boardSidePadding - ((i-11) * this.global.checkerSize) - ((i) * this.global.checkerMargin));
			this.columnHolder.get(i).y = 2;
		}else if(i == 19) {
			this.columnHolder.get(i).x = ((this.global.boardWidth) - this.global.boardSidePadding - ((i-11) * this.global.checkerSize) - ((i) * this.global.checkerMargin));
			this.columnHolder.get(i).y = 2;
		}else if(i == 18) {
			this.columnHolder.get(i).x = ((this.global.boardWidth) - this.global.boardSidePadding - ((i-11) * this.global.checkerSize) - ((i) * this.global.checkerMargin));
			this.columnHolder.get(i).y = 2;
		}else if(i == 17) {
			this.columnHolder.get(i).x = ((this.global.boardWidth) - this.global.boardSidePadding - ((i-11) * this.global.checkerSize) - ((i) * this.global.checkerMargin));
			this.columnHolder.get(i).y = 2;
		}else if(i == 16) {
			this.columnHolder.get(i).x = ((this.global.boardWidth) - this.global.boardSidePadding - ((i-11) * this.global.checkerSize) - ((i) * this.global.checkerMargin))- this.global.boardCenterPadding;
			this.columnHolder.get(i).y = 2;
		}else if(i == 15) {
			this.columnHolder.get(i).x = ((this.global.boardWidth) - this.global.boardSidePadding - ((i-11) * this.global.checkerSize) - ((i) * this.global.checkerMargin))- this.global.boardCenterPadding;
			this.columnHolder.get(i).y = 2;
		}else if(i == 14) {
			this.columnHolder.get(i).x = ((this.global.boardWidth) - this.global.boardSidePadding - ((i-11) * this.global.checkerSize) - ((i-1) * this.global.checkerMargin))- this.global.boardCenterPadding;
			this.columnHolder.get(i).y = 2;
		}else if(i == 13) {
			this.columnHolder.get(i).x = ((this.global.boardWidth) - this.global.boardSidePadding - ((i-11) * this.global.checkerSize) - ((i-1) * this.global.checkerMargin))- this.global.boardCenterPadding;
			this.columnHolder.get(i).y = 2;
		}else if(i == 12) {
			this.columnHolder.get(i).x = ((this.global.boardWidth) - this.global.boardSidePadding - ((i) * this.global.checkerSize) - ((i-1) * this.global.checkerMargin))- this.global.boardCenterPadding;;
			this.columnHolder.get(i).y = 2;
		}
	}

	for(let i=0; i < 12; i++) {

		this.columnHolder.add({
			index: i
		});
		
		if(i == 0) {
			this.columnHolder.get(i).x = (this.global.boardWidth - this.global.boardSidePadding - this.global.checkerSize - this.global.checkerMargin);
			this.columnHolder.get(i).y = 2;
		}else if(i == 1) {
			this.columnHolder.get(i).x = ((this.global.boardWidth) - this.global.boardSidePadding - ((i+1) * this.global.checkerSize) - ((i) * this.global.checkerMargin));
			this.columnHolder.get(i).y = 2;
		}else if(i == 2) {
			this.columnHolder.get(i).x = ((this.global.boardWidth) - this.global.boardSidePadding - ((i+1) * this.global.checkerSize) - ((i) * this.global.checkerMargin));
			this.columnHolder.get(i).y = 2;
		}else if(i == 3) {
			this.columnHolder.get(i).x = ((this.global.boardWidth) - this.global.boardSidePadding - ((i+1) * this.global.checkerSize) - ((i) * this.global.checkerMargin));
			this.columnHolder.get(i).y = 2;
		}else if(i == 4) {
			this.columnHolder.get(i).x = ((this.global.boardWidth) - this.global.boardSidePadding - ((i+1) * this.global.checkerSize) - ((i) * this.global.checkerMargin));
			this.columnHolder.get(i).y = 2;
		}else if(i == 5) {
			this.columnHolder.get(i).x = ((this.global.boardWidth) - this.global.boardSidePadding - ((i+1) * this.global.checkerSize) - ((i) * this.global.checkerMargin));
			this.columnHolder.get(i).y = 2;
		}else if(i == 6) {
			this.columnHolder.get(i).x = ((this.global.boardWidth) - this.global.boardSidePadding - ((i+1) * this.global.checkerSize) - ((i) * this.global.checkerMargin));
			this.columnHolder.get(i).y = 2;
		}else if(i == 7) {
			this.columnHolder.get(i).x = ((this.global.boardWidth) - this.global.boardSidePadding - ((i+1) * this.global.checkerSize) - ((i) * this.global.checkerMargin))- this.global.boardCenterPadding;
			this.columnHolder.get(i).y = 2;
		}else if(i == 8) {
			this.columnHolder.get(i).x = ((this.global.boardWidth) - this.global.boardSidePadding - ((i+1) * this.global.checkerSize) - ((i) * this.global.checkerMargin))- this.global.boardCenterPadding;
			this.columnHolder.get(i).y = 2;
		}else if(i == 9) {
			this.columnHolder.get(i).x = ((this.global.boardWidth) - this.global.boardSidePadding - ((i+1) * this.global.checkerSize) - ((i) * this.global.checkerMargin))- this.global.boardCenterPadding;
			this.columnHolder.get(i).y = 2;
		}else if(i == 10) {
			this.columnHolder.get(i).x = ((this.global.boardWidth) - this.global.boardSidePadding - ((i+1) * this.global.checkerSize) - ((i) * this.global.checkerMargin))- this.global.boardCenterPadding;
			this.columnHolder.get(i).y = 2;
		}else if(i == 11) {
			this.columnHolder.get(i).x = ((this.global.boardWidth) - this.global.boardSidePadding - ((i+1) * this.global.checkerSize) - ((i) * this.global.checkerMargin))- this.global.boardCenterPadding;;
			this.columnHolder.get(i).y = 2;
		}

	}
}

export default Board