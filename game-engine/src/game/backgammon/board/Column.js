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

column.prototype.removeChecker = function(index, color) {
	for(let i=0; i<this.columns.length; i++) {
	
		let id = findIndex(this.columns[i].container, (o) => {
			// if(o != undefined) {
				return (o.index == index && o.color == color);
			// }else
			// 	false
		});
		

		if(id !== -1 && this.columns[i].container.length > 0) {
			this.columns[i].container.splice(id, 1);
			break;
		}
	}
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