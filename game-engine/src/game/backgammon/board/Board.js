import Column from "#backgammon/board/Column";

function Board() {

}

Board.prototype.columns = [];
Board.prototype.create = function() {
	for(let i=0; i<24; i++) {
		this.columns[i] = new Column();
	}
}

Board.prototype.position = function() {
	
}

export default Board