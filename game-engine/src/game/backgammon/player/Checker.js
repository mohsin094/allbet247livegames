function Checker() {
}

Checker.prototype.color = undefined;
Checker.prototype.position = undefined;
Checker.prototype.create = function(color) {
	this.color = color;
}

export default Checker