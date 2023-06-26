function Checker() {
}


Checker.prototype.index = undefined;
Checker.prototype.selected = undefined;
Checker.prototype.color = undefined;
Checker.prototype.position = undefined;

Checker.prototype.create = function(color) {
	this.color = color;
	this.selected = false;
}

export default Checker