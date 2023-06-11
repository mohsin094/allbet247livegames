import {Container} from "pixi.js";
import {find} from "lodash-es";

function ColumnHolder() {
	this.columns = [];
}

ColumnHolder.prototype.columns = undefined;

ColumnHolder.prototype.removeOffer = function() {
	for(let i = 0; i < this.columns.length; i++) {
		this.columns[i].focus = false;
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
	return find(this.columns, (o) => o.index == index);
}

export default ColumnHolder

