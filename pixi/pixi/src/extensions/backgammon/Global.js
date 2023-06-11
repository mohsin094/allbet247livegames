function Global() {
	this.boardSideSizePercent = 8.32;
	this.boardCenterSizePercent = 3.22;
	this.checkerSizePercent = 6.44;
	this.checkerMarginPercent = 0.26;
	this.boardRatio = 1.44
	this.boardTopPaddingSizePercent = 2.5;
}

Global.prototype.gameWidth = undefined;
Global.prototype.gameHeight = undefined;
Global.prototype.boardWidth = undefined;
Global.prototype.boardHeight = undefined;
Global.prototype.checkerSize = undefined;
Global.prototype.boardSidePadding = undefined;
Global.prototype.checkerMargin = undefined;
Global.prototype.boardCenterPadding = undefined;
Global.prototype.boardTopPaddingHeight = undefined;

Global.prototype.init = function() {
	this.gameWidth = document.getElementById("game").offsetWidth;
	this.gameHeight = window.innerHeight;

	if(this.gameWidth >= this.gameHeight) {
		this.boardHeight = this.gameHeight;
		this.boardWidth = this.gameHeight * (this.boardRatio);
	}else {
		this.boardWidth = this.gameWidth;
		this.boardHeight = this.gameWidth  / (this.boardRatio);
	}

	this.checkerSize = this.boardWidth * (this.checkerSizePercent / 100);
	this.checkerMargin = this.boardWidth * (this.checkerMarginPercent / 100);
	this.boardSidePadding = this.boardWidth * (this.boardSideSizePercent / 100);
	this.boardCenterPadding = this.boardWidth * (this.boardCenterSizePercent / 100);
	this.boardTopPaddingHeight = this.boardHeight * (this.boardTopPaddingSizePercent / 100);
}




export default Global