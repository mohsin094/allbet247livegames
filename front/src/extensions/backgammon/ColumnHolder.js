import {findIndex, find} from "lodash"

function ColumnHolder() {
	this.columns = [];
}

ColumnHolder.prototype.columns = undefined;

ColumnHolder.prototype.removeOffer = function() {
	for(let i = 0; i < this.columns.length; i++) {
		this.columns[i].focus = false;
	}
}

ColumnHolder.prototype.isOccupied = function(columnIndex, color) {
	const column = this.get(columnIndex);
	let c = 0;
	for(let i = 0; i < column.length; i++) {
		if(column[i].color == color) {
			c++;
			if(c > 1) {
				return true;
				break;
			}
		}
	}

	return false;
}

ColumnHolder.prototype.removeChecker = function(index, color) {

	for(let i=0; i<this.columns.length; i++) {
		let id = findIndex(this.columns[i].container, (o) => {
			// if(o != undefined) {
				return (o.index == index && o.color == color);
			// }else
			// 	false
		});
		

		
		if(id !== -1 && this.columns[i].container.length > 0) {
			console.log(this.columns[i].container)
			this.columns[i].container.splice(id, 1);
			console.log(this.columns[i].container)
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
ColumnHolder.prototype.add = function(params) {
	this.columns.push({
		index: params.index,
		x: params.x,
		y: params.y,
		occupied: undefined,
		focus: false,
		container: []
	});	
}

ColumnHolder.prototype.get = function(index) {
	return find(this.columns, (o) => (o.index == index));
}

export default ColumnHolder

