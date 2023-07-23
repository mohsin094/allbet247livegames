import Column from "#backgammon/board/Column";

function Board() {

}


Board.prototype.column = undefined;
Board.prototype.create = function() {
	this.column = new Column;
	for(let i=-1; i<28; i++) {
		this.column.add({
			index: i
		});
	}
}

Board.prototype.position = function(checker, index, oldPosition) {
	const column = this.column.get(index);
	let container = column.container;
	// if(checker.position != index) {
		if(oldPosition) {
			let oldContainer = this.column.get(oldPosition).container;
			remove(oldContainer, (o) => o.index == checker.index);
		}

		container.push(checker);
		checker.position = index;
		column.occupied = checker.color;
	// }

}

Board.prototype.getColumns = function() {
	return this.column;
}

Board.prototype.getColumnAt = function(index) {
	return this.column.get(index)
}

export default Board