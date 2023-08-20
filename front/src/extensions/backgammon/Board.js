import ColumnHolder from "@/extensions/backgammon/ColumnHolder";
import {remove} from "lodash-es";
import {PLAYER_COLOR} from "@/extensions/backgammon/Player";
import {STAGE} from "@/extensions/backgammon/Game"

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

Board.prototype.offerMove = function(checker, fromPosition, player, stage) {
	const diceFirst = player.getMove(player.dice.first);
	const diceSecond = player.getMove(player.dice.second); 
	const originColFirst = (diceFirst != undefined) ? diceFirst.getOriginColumn(fromPosition) : undefined;
	const originColSecond = (diceSecond != undefined) ? diceSecond.getOriginColumn(fromPosition) : undefined;
	switch(checker.color) {
	case PLAYER_COLOR.WHITE:
		
		for(let i=0; i<this.columnHolder.columns.length; i++) {
			if((stage.id == STAGE.THROW_DOUBLE_DICE || stage.id == STAGE.MOVE_SECOND_DICE) 
				&& diceFirst != undefined
				&& diceFirst.moved == false
				&& diceFirst.isPossible
				&& originColFirst != undefined
				&& originColFirst.length > 0
				&& originColFirst[0] == this.columnHolder.columns[i].index) {

				this.columnHolder.columns[i].focus = true;

			}else if((stage.id == STAGE.THROW_DOUBLE_DICE || stage.id == STAGE.MOVE_FIRST_DICE) 
				&& diceSecond != undefined
				&& diceSecond.isPossible
				&& diceSecond.moved == false
				&& originColSecond != undefined
				&& originColSecond.length > 0
				&& originColSecond[0] == this.columnHolder.columns[i].index) {
				this.columnHolder.columns[i].focus = true;
			}
		}
		break;
	case PLAYER_COLOR.BLACK:

		for(let i=0; i<this.columnHolder.columns.length; i++) {
			
			if((diceFirst != undefined
				&& diceFirst.moved == false
				&& diceFirst.isPossible
				&& originColFirst != undefined
				&& originColFirst.length > 0
				&& originColFirst[0] == this.columnHolder.columns[i].index)
				|| 
				(diceSecond != undefined
				&& diceSecond.moved == false
				&& diceSecond.isPossible
				&& originColSecond != undefined
				&& originColSecond.length > 0
				&& originColSecond[0] == this.columnHolder.columns[i].index)
				) {

				this.columnHolder.columns[i].focus = true;
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
	for(let i=26; i > 12; i--) {
		this.columnHolder.add({
			index: i
		});
		if(i == 26) {
			this.columnHolder.get(i).x = ((this.global.boardWidth) - this.global.boardSidePadding - ((7) * this.global.checkerSize));
			this.columnHolder.get(i).y= this.global.boardTopPaddingHeight;
		}
		else if(i == 25) {
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

	for(let i=-1; i < 13; i++) {

		this.columnHolder.add({
			index: i
		});
		if(i == -1) {
			this.columnHolder.get(i).x = ((this.global.boardWidth) - this.global.boardSidePadding - ((7) * this.global.checkerSize));
			this.columnHolder.get(i).y= this.global.boardTopPaddingHeight;
		}
		else if(i == 0) {
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