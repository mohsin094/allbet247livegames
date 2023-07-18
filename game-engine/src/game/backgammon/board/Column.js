import {find} from "lodash-es";

function column() {
	this.columns = [];
}

column.prototype.columns = undefined;

column.prototype.isOccupied = function(columnIndex, color) {
	
	const column = this.get(columnIndex);
	
	let c = 0;
	for(let i = 0; i < column.container.length; i++) {
		if(column.container[i].color == color) {
			c++;
			if(c > 1) {
				return true;
				break;
			}
		}
	}

	return false;
}

/**
 *
 * @params params (object) {
 * 	index: ,
 *  width: ,
 * 	height: ,
 * } 
 *  
*/
column.prototype.add = function(params) {
	this.columns.push({
		index: params.index,
		x: params.x,
		y: params.y,
		occupied: undefined,
		focus: false,
		container: []
	});	
}

column.prototype.get = function(index) {
	return find(this.columns, (o) => o.index == index);
}

export default column