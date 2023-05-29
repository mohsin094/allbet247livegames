import Column from "#backgammon/board/Column";

function Board() {

}

Board.prototype.columns = [];
Board.prototype.create = function() {
	for(let i=0; i<24; i++) {
		columns[i] = new Column();
	}
}

export default Board