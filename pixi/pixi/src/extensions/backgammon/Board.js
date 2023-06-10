import ColumnHolder from "@/extensions/backgammon/ColumnHolder";
import {Texture, Sprite} from "pixi.js";

function Board(globalValues) {
	this.global = globalValues;
}

Board.prototype.global = undefined;
Board.prototype.columnHolder = undefined;

Board.prototype.position = function(checker, index, oldPosition) {
	let container = this.columnHolder.get(index-1).container;

		container.splice(index, 1);
		container.push(checker);
}

Board.prototype.getColumns = function() {
	return this.columnHolder;
}

Board.prototype.getColumnAt = function(index) {
	return this.columnHolder.get(index)
}

Board.prototype.create = function(app) {

	this.columnHolder = new ColumnHolder;
	for(let i=23; i > 11; i--) {
		this.columnHolder.add({
			index: i
		});

		if(i == 23) {
			this.columnHolder.get(i).container.x = (this.global.boardWidth - this.global.boardSidePadding - this.global.checkerSize - this.global.checkerMargin);
			this.columnHolder.get(i).container.y = this.global.boardHeight - 2 - this.global.checkerSize;
		}else if(i == 22) {
			this.columnHolder.get(i).container.x = ((this.global.boardWidth) - this.global.boardSidePadding - ((i-11) * this.global.checkerSize) - ((i) * this.global.checkerMargin));
			this.columnHolder.get(i).container.y = this.global.boardHeight - 2 - this.global.checkerSize;
		}else if(i == 21) {
			this.columnHolder.get(i).container.x = ((this.global.boardWidth) - this.global.boardSidePadding - ((i-11) * this.global.checkerSize) - ((i) * this.global.checkerMargin));
			this.columnHolder.get(i).container.y = this.global.boardHeight - 2 - this.global.checkerSize;
		}else if(i == 20) {
			this.columnHolder.get(i).container.x = ((this.global.boardWidth) - this.global.boardSidePadding - ((i-11) * this.global.checkerSize) - ((i) * this.global.checkerMargin));
			this.columnHolder.get(i).container.y = this.global.boardHeight - 2 - this.global.checkerSize;
		}else if(i == 19) {
			this.columnHolder.get(i).container.x = ((this.global.boardWidth) - this.global.boardSidePadding - ((i-11) * this.global.checkerSize) - ((i) * this.global.checkerMargin));
			this.columnHolder.get(i).container.y = this.global.boardHeight - 2 - this.global.checkerSize;
		}else if(i == 18) {
			this.columnHolder.get(i).container.x = ((this.global.boardWidth) - this.global.boardSidePadding - ((i-11) * this.global.checkerSize) - ((i) * this.global.checkerMargin));
			this.columnHolder.get(i).container.y = this.global.boardHeight - 2 - this.global.checkerSize;
		}else if(i == 17) {
			this.columnHolder.get(i).container.x = ((this.global.boardWidth) - this.global.boardSidePadding - ((i-11) * this.global.checkerSize) - ((i) * this.global.checkerMargin));
			this.columnHolder.get(i).container.y = this.global.boardHeight - 2 - this.global.checkerSize;
		}else if(i == 16) {
			this.columnHolder.get(i).container.x = ((this.global.boardWidth) - this.global.boardSidePadding - ((i-11) * this.global.checkerSize) - ((i) * this.global.checkerMargin))- this.global.boardCenterPadding;
			this.columnHolder.get(i).container.y = this.global.boardHeight - 2 - this.global.checkerSize;
		}else if(i == 15) {
			this.columnHolder.get(i).container.x = ((this.global.boardWidth) - this.global.boardSidePadding - ((i-11) * this.global.checkerSize) - ((i) * this.global.checkerMargin))- this.global.boardCenterPadding;
			this.columnHolder.get(i).container.y = this.global.boardHeight - 2 - this.global.checkerSize;
		}else if(i == 14) {
			this.columnHolder.get(i).container.x = ((this.global.boardWidth) - this.global.boardSidePadding - ((i-11) * this.global.checkerSize) - ((i-1) * this.global.checkerMargin))- this.global.boardCenterPadding;
			this.columnHolder.get(i).container.y = this.global.boardHeight - 2 - this.global.checkerSize;
		}else if(i == 13) {
			this.columnHolder.get(i).container.x = ((this.global.boardWidth) - this.global.boardSidePadding - ((i-11) * this.global.checkerSize) - ((i-1) * this.global.checkerMargin))- this.global.boardCenterPadding;
			this.columnHolder.get(i).container.y = this.global.boardHeight - 2 - this.global.checkerSize;
		}else if(i == 12) {
			this.columnHolder.get(i).container.x = ((this.global.boardWidth) - this.global.boardSidePadding - ((i) * this.global.checkerSize) - ((i-1) * this.global.checkerMargin))- this.global.boardCenterPadding;;
			this.columnHolder.get(i).container.y = this.global.boardHeight - 2 - this.global.checkerSize;
		}
	}

	for(let i=0; i < 12; i++) {

		this.columnHolder.add({
			index: i
		});
		
		if(i == 0) {
			this.columnHolder.get(i).container.x = (this.global.boardWidth - this.global.boardSidePadding - this.global.checkerSize - this.global.checkerMargin);
			this.columnHolder.get(i).container.y = 2;
		}else if(i == 1) {
			this.columnHolder.get(i).container.x = ((this.global.boardWidth) - this.global.boardSidePadding - ((i+1) * this.global.checkerSize) - ((i) * this.global.checkerMargin));
			this.columnHolder.get(i).container.y = 2;
		}else if(i == 2) {
			this.columnHolder.get(i).container.x = ((this.global.boardWidth) - this.global.boardSidePadding - ((i+1) * this.global.checkerSize) - ((i) * this.global.checkerMargin));
			this.columnHolder.get(i).container.y = 2;
		}else if(i == 3) {
			this.columnHolder.get(i).container.x = ((this.global.boardWidth) - this.global.boardSidePadding - ((i+1) * this.global.checkerSize) - ((i) * this.global.checkerMargin));
			this.columnHolder.get(i).container.y = 2;
		}else if(i == 4) {
			this.columnHolder.get(i).container.x = ((this.global.boardWidth) - this.global.boardSidePadding - ((i+1) * this.global.checkerSize) - ((i) * this.global.checkerMargin));
			this.columnHolder.get(i).container.y = 2;
		}else if(i == 5) {
			this.columnHolder.get(i).container.x = ((this.global.boardWidth) - this.global.boardSidePadding - ((i+1) * this.global.checkerSize) - ((i) * this.global.checkerMargin));
			this.columnHolder.get(i).container.y = 2;
		}else if(i == 6) {
			this.columnHolder.get(i).container.x = ((this.global.boardWidth) - this.global.boardSidePadding - ((i+1) * this.global.checkerSize) - ((i) * this.global.checkerMargin));
			this.columnHolder.get(i).container.y = 2;
		}else if(i == 7) {
			this.columnHolder.get(i).container.x = ((this.global.boardWidth) - this.global.boardSidePadding - ((i+1) * this.global.checkerSize) - ((i) * this.global.checkerMargin))- this.global.boardCenterPadding;
			this.columnHolder.get(i).container.y = 2;
		}else if(i == 8) {
			this.columnHolder.get(i).container.x = ((this.global.boardWidth) - this.global.boardSidePadding - ((i+1) * this.global.checkerSize) - ((i) * this.global.checkerMargin))- this.global.boardCenterPadding;
			this.columnHolder.get(i).container.y = 2;
		}else if(i == 9) {
			this.columnHolder.get(i).container.x = ((this.global.boardWidth) - this.global.boardSidePadding - ((i+1) * this.global.checkerSize) - ((i) * this.global.checkerMargin))- this.global.boardCenterPadding;
			this.columnHolder.get(i).container.y = 2;
		}else if(i == 10) {
			this.columnHolder.get(i).container.x = ((this.global.boardWidth) - this.global.boardSidePadding - ((i+1) * this.global.checkerSize) - ((i) * this.global.checkerMargin))- this.global.boardCenterPadding;
			this.columnHolder.get(i).container.y = 2;
		}else if(i == 11) {
			this.columnHolder.get(i).container.x = ((this.global.boardWidth) - this.global.boardSidePadding - ((i+1) * this.global.checkerSize) - ((i) * this.global.checkerMargin))- this.global.boardCenterPadding;;
			this.columnHolder.get(i).container.y = 2;
		}

	}
}

export default Board