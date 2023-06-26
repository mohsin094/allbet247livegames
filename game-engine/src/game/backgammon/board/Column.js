import {find} from "lodash-es";

function column() {
	this.columns = [];
}

column.prototype.columns = undefined;

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