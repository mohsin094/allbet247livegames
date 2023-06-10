import {Container} from "pixi.js";
import {find} from "lodash-es";

function ColumnHolder() {
	this.columns = [];
}

ColumnHolder.prototype.columns = undefined;


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
		container: []
	});	
}

ColumnHolder.prototype.get = function(index) {
	return find(this.columns, (o) => o.index == index);
}

export default ColumnHolder

