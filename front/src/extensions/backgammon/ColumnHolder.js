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

ColumnHolder.prototype.removeChecker = function(index, color) {

	for(let i=0; i<this.columns.length; i++) {
		let id = findIndex(this.columns[i].container, (o) => {
			if(o != undefined) {
				return (o.index == index);	
			}else
				false
		});
		

		
		if(id !== -1 && this.columns[i].container.length > 0 && this.columns[i].container[id].color != undefined && this.columns[i].container[id].color == color) {
			// console.log(this.columns[i].container)
			console.log(delete this.columns[i].container[id]);
			// handler.deleteProperty(this.columns[i].container[i], id)
			// console.log(this.columns[i].container)
			
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

