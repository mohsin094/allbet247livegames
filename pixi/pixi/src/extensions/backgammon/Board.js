import ColumnHolder from "@/extensions/backgammon/ColumnHolder";
import {Texture, Sprite} from "pixi.js";

function Board(globalValues) {
	this.global = globalValues;
}

Board.prototype.PIXI = undefined;
Board.prototype.global = undefined;
Board.prototype.columnHolder = undefined;

Board.prototype.position = function(checker, index) {
	console.log(checker)
	this.columnHolder.get(index-1).container.addChild(checker.sprite);
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
	for(let i=0; i < 24; i++) {

		this.columnHolder.add({
			index: i
		});
		app.stage.addChild(this.columnHolder.get(i).container);
		if(i < 12) {
			this.columnHolder.get(i).container.x = (this.global.boardWidth / 15.5);
			this.columnHolder.get(i).container.y = 5;
		}else {
			this.columnHolder.get(i).container.x = (this.global.boardWidth / 15.5);
			this.columnHolder.get(i).container.y = 5;
		}
		app.stage.addChild(this.columnHolder.get(i).container);
	}
}

export default Board