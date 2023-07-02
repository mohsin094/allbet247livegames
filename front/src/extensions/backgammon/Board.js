import ColumnHolder from "@/extensions/backgammon/ColumnHolder";
import {remove} from "lodash-es";
import {PLAYER_COLOR} from "@/extensions/backgammon/Player.js";

function Board(globalValues) {
	this.global = globalValues;
}

Board.prototype.global = undefined;
Board.prototype.columnHolder = undefined;
Board.prototype.afterPosition = function(){}

Board.prototype.removeChecker = function(index, color) {
	this.columnHolder.removeChecker(index, color);
}


Board.prototype.removeOffer = function() {
	this.columnHolder.removeOffer();
}

Board.prototype.offerMove = function(checker, fromPosition, dice, player) {
	switch(checker.color) {
	case PLAYER_COLOR.WHITE:
		
		for(let i=0; i<this.columnHolder.columns.length; i++) {
			
					
			if(fromPosition < this.columnHolder.columns[i].index) {
			
				
				if(this.columnHolder.isOccupied(this.columnHolder.columns[i].index, PLAYER_COLOR.WHITE) || this.columnHolder.columns[i].container.length < 2) {
					const sumFirst = fromPosition + dice.first;
					const sumSecond = fromPosition + dice.second;
					if(sumFirst == this.columnHolder.columns[i].index || sumSecond == this.columnHolder.columns[i].index) {
						
							this.columnHolder.columns[i].focus = true;
						// if((sumSecond > 23 || sumFirst > 23) && player.isAllCheckersHome()) {
						// 	this.columnHolder.columns[i].focus = true;
						// }else if(sumSecond < 24 || sumFirst < 24) {
						// }
					}
				}
			}
		}
		break;
	case PLAYER_COLOR.BLACK:

		for(let i=0; i<this.columnHolder.columns.length; i++) {
			
					
			if(fromPosition > this.columnHolder.columns[i].index) {

				if(this.columnHolder.isOccupied(this.columnHolder.columns[i].index, PLAYER_COLOR.BLACK) || this.columnHolder.columns[i].container.length < 2) {


					const sumFirst = fromPosition - dice.first;
					const sumSecond = fromPosition - dice.second;

					if(sumFirst == this.columnHolder.columns[i].index || sumSecond == this.columnHolder.columns[i].index) {
							this.columnHolder.columns[i].focus = true;
						
						// if((sumSecond < 1 || sumFirst < 1) && player.isAllCheckersHome()) {
						// 	this.columnHolder.columns[i].focus = true;
						// }else if(sumSecond > 0 || sumFirst > 0) {
						// }
					}
				}
			}
		}
		break;
	}
}

Board.prototype.position = function(checker, index, oldPosition) {


	// if(checker.position != index) {
		if(oldPosition) {
			remove(this.columnHolder.get(oldPosition).container, (o) => o.index == checker.index);
		}

		this.columnHolder.get(index).container.push(checker);
		checker.position = index;
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
	for(let i=25; i > 12; i--) {
		this.columnHolder.add({
			index: i
		});
		
		if(i == 25) {
			this.columnHolder.get(i).x = (this.global.boardWidth - this.global.boardSidePadding) + this.global.checkerMargin;
			this.columnHolder.get(i).y= this.global.boardTopPaddingHeight;
		}
		else if(i == 24) {
			this.columnHolder.get(i).x = ((this.global.boardWidth) - this.global.boardSidePadding - ((1) * this.global.checkerSize) - ((1) * this.global.checkerMargin));
			this.columnHolder.get(i).y= this.global.boardTopPaddingHeight;
		}else if(i == 23) {
			this.columnHolder.get(i).x = ((this.global.boardWidth) - this.global.boardSidePadding - ((2) * this.global.checkerSize) - ((2) * this.global.checkerMargin));
			this.columnHolder.get(i).y= this.global.boardTopPaddingHeight;
		}else if(i == 22) {
			this.columnHolder.get(i).x = ((this.global.boardWidth) - this.global.boardSidePadding - ((3) * this.global.checkerSize) - ((3) * this.global.checkerMargin));
			this.columnHolder.get(i).y= this.global.boardTopPaddingHeight;
		}else if(i == 21) {
			this.columnHolder.get(i).x = ((this.global.boardWidth) - this.global.boardSidePadding - ((4) * this.global.checkerSize) - ((4) * this.global.checkerMargin));
			this.columnHolder.get(i).y= this.global.boardTopPaddingHeight;
		}else if(i == 20) {
			this.columnHolder.get(i).x = ((this.global.boardWidth) - this.global.boardSidePadding - ((5) * this.global.checkerSize) - ((5) * this.global.checkerMargin));
			this.columnHolder.get(i).y= this.global.boardTopPaddingHeight;
		}else if(i == 19) {
			this.columnHolder.get(i).x = ((this.global.boardWidth) - this.global.boardSidePadding - ((6) * this.global.checkerSize) - ((6) * this.global.checkerMargin));
			this.columnHolder.get(i).y= this.global.boardTopPaddingHeight;
		}else if(i == 18) {
			this.columnHolder.get(i).x = ((this.global.boardWidth) - this.global.boardSidePadding - ((7) * this.global.checkerSize) - ((7) * this.global.checkerMargin))- this.global.boardCenterPadding;
			this.columnHolder.get(i).y= this.global.boardTopPaddingHeight;
		}else if(i == 17) {
			this.columnHolder.get(i).x = ((this.global.boardWidth) - this.global.boardSidePadding - ((8) * this.global.checkerSize) - ((8) * this.global.checkerMargin))- this.global.boardCenterPadding;
			this.columnHolder.get(i).y= this.global.boardTopPaddingHeight;
		}else if(i == 16) {
			this.columnHolder.get(i).x = ((this.global.boardWidth) - this.global.boardSidePadding - ((9) * this.global.checkerSize) - ((9) * this.global.checkerMargin))- this.global.boardCenterPadding;
			this.columnHolder.get(i).y= this.global.boardTopPaddingHeight;
		}else if(i == 15) {
			this.columnHolder.get(i).x = ((this.global.boardWidth) - this.global.boardSidePadding - ((10) * this.global.checkerSize) - ((10) * this.global.checkerMargin))- this.global.boardCenterPadding;
			this.columnHolder.get(i).y= this.global.boardTopPaddingHeight;
		}else if(i == 14) {
			this.columnHolder.get(i).x = ((this.global.boardWidth) - this.global.boardSidePadding - ((11) * this.global.checkerSize) - ((11) * this.global.checkerMargin))- this.global.boardCenterPadding;
			this.columnHolder.get(i).y= this.global.boardTopPaddingHeight;
		}else if(i == 13) {
			this.columnHolder.get(i).x = ((this.global.boardWidth) - this.global.boardSidePadding - ((12) * this.global.checkerSize) - ((12) * this.global.checkerMargin))- this.global.boardCenterPadding;;
			this.columnHolder.get(i).y= this.global.boardTopPaddingHeight;
		}
	}

	for(let i=0; i < 13; i++) {

		this.columnHolder.add({
			index: i
		});
		if(i == 0) {
			this.columnHolder.get(i).x = (this.global.boardWidth - this.global.boardSidePadding) + this.global.checkerMargin;
			this.columnHolder.get(i).y= this.global.boardTopPaddingHeight;
		}
		else if(i == 1) {
			this.columnHolder.get(i).x = (this.global.boardWidth - this.global.boardSidePadding - this.global.checkerSize - this.global.checkerMargin);
			this.columnHolder.get(i).y= this.global.boardTopPaddingHeight;
		}else if(i == 2) {
			this.columnHolder.get(i).x = ((this.global.boardWidth) - this.global.boardSidePadding - ((i) * this.global.checkerSize) - ((i) * this.global.checkerMargin));
			this.columnHolder.get(i).y= this.global.boardTopPaddingHeight;
		}else if(i == 3) {
			this.columnHolder.get(i).x = ((this.global.boardWidth) - this.global.boardSidePadding - ((i) * this.global.checkerSize) - ((i) * this.global.checkerMargin));
			this.columnHolder.get(i).y= this.global.boardTopPaddingHeight;
		}else if(i == 4) {
			this.columnHolder.get(i).x = ((this.global.boardWidth) - this.global.boardSidePadding - ((i) * this.global.checkerSize) - ((i) * this.global.checkerMargin));
			this.columnHolder.get(i).y= this.global.boardTopPaddingHeight;
		}else if(i == 5) {
			this.columnHolder.get(i).x = ((this.global.boardWidth) - this.global.boardSidePadding - ((i) * this.global.checkerSize) - ((i) * this.global.checkerMargin));
			this.columnHolder.get(i).y= this.global.boardTopPaddingHeight;
		}else if(i == 6) {
			this.columnHolder.get(i).x = ((this.global.boardWidth) - this.global.boardSidePadding - ((i) * this.global.checkerSize) - ((i) * this.global.checkerMargin));
			this.columnHolder.get(i).y= this.global.boardTopPaddingHeight;
		}else if(i == 7) {
			this.columnHolder.get(i).x = ((this.global.boardWidth) - this.global.boardSidePadding - ((i) * this.global.checkerSize) - ((i) * this.global.checkerMargin))- this.global.boardCenterPadding;
			this.columnHolder.get(i).y= this.global.boardTopPaddingHeight;
		}else if(i == 8) {
			this.columnHolder.get(i).x = ((this.global.boardWidth) - this.global.boardSidePadding - ((i) * this.global.checkerSize) - ((i) * this.global.checkerMargin))- this.global.boardCenterPadding;
			this.columnHolder.get(i).y= this.global.boardTopPaddingHeight;
		}else if(i == 9) {
			this.columnHolder.get(i).x = ((this.global.boardWidth) - this.global.boardSidePadding - ((i) * this.global.checkerSize) - ((i) * this.global.checkerMargin))- this.global.boardCenterPadding;
			this.columnHolder.get(i).y= this.global.boardTopPaddingHeight;
		}else if(i == 10) {
			this.columnHolder.get(i).x = ((this.global.boardWidth) - this.global.boardSidePadding - ((i) * this.global.checkerSize) - ((i) * this.global.checkerMargin))- this.global.boardCenterPadding;
			this.columnHolder.get(i).y= this.global.boardTopPaddingHeight;
		}else if(i == 11) {
			this.columnHolder.get(i).x = ((this.global.boardWidth) - this.global.boardSidePadding - ((i) * this.global.checkerSize) - ((i) * this.global.checkerMargin))- this.global.boardCenterPadding;
			this.columnHolder.get(i).y= this.global.boardTopPaddingHeight;
		}else if(i == 12) {
			this.columnHolder.get(i).x = ((this.global.boardWidth) - this.global.boardSidePadding - ((i) * this.global.checkerSize) - ((i) * this.global.checkerMargin))- this.global.boardCenterPadding;;
			this.columnHolder.get(i).y= this.global.boardTopPaddingHeight;
		}

	}
}

export default Board