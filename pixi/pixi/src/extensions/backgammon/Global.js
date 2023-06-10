function Global() {
	this.boardSideSizePercent = 8.32;
	this.boardCenterSizePercent = 3.22;
	this.checkerSizePercent = 6.44;
	this.checkerMarginPercent = 0.26;
	this.boardRatio = 1.44
}

Global.prototype.gameWidth = undefined;
Global.prototype.gameHeight = undefined;
Global.prototype.boardWidth = undefined;
Global.prototype.boardHeight = undefined;
Global.prototype.checkerSize = undefined;

Global.prototype.init = function() {
	this.gameWidth = document.getElementById("game").offsetWidth;
	this.gameHeight = window.innerHeight;

	if(this.gameWidth >= this.gameHeight) {
		this.boardHeight = this.gameHeight;
		this.boardWidth = this.gameHeight * (this.boardRatio);
	}else {
		this.boardWidth = this.gameWidth;
		this.boardHeight = this.gameWidth  * (this.boardRatio);
	}

	this.checkerSize = this.boardWidth * (this.checkerSizePercent / 100);
}




export default Global