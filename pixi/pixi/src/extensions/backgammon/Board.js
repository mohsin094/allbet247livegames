import ColumnHolder from "@/extensions/backgammon/ColumnHolder";
import {Texture, Sprite} from "pixi.js";

function Board(globalValues) {
	this.global = globalValues;
}

Board.prototype.PIXI = undefined;
Board.prototype.global = undefined;
Board.prototype.columnHolder = undefined;

Board.prototype.position = function(checker, index) {
	const container = this.columnHolder.get(index-1).container;
	const length = container.children.length
	if(index <= 12) {
		checker.sprite.y = (((index))+this.global.checkerSize* length)
	}else {
		checker.sprite.y = (((index))+this.global.checkerSize* length) * -1
	}
	container.addChild(checker.sprite);
}

Board.prototype.getColumns = function() {
	return this.columnHolder;
}

Board.prototype.create = function(app) {
	const boardTexture = Texture.from('/assets/img/board.png');
	const board = new Sprite(boardTexture);
	board.width = this.global.boardWidth;
	board.height = this.global.boardHeight;
	board.x = this.global.boardX;
	board.y = this.global.boardY;
	app.stage.addChild(board);

	this.columnHolder = new ColumnHolder;
	for(let i=23; i > 11; i--) {
		this.columnHolder.add({
			index: i
		});
		app.stage.addChild(this.columnHolder.get(i).container);

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

		app.stage.addChild(this.columnHolder.get(i).container);
	}

	for(let i=0; i < 12; i++) {

		this.columnHolder.add({
			index: i
		});
		app.stage.addChild(this.columnHolder.get(i).container);
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
		app.stage.addChild(this.columnHolder.get(i).container);
	}
}

export default Board