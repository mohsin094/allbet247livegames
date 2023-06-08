function Global() {
	this.boardSideSizePercent = 8.32;
	this.boardCenterSizePercent = 3.22;
	this.checkerSizePercent = 6.44;
	this.checkerMarginPercent = 0.26;
}

Global.prototype.init = function(app) {

	this.boardWidth = 0;
	this.boardHeight = 0;
	this.boardX = 0;
	this.boardY = 0;
	this.boardCenterPadding = app.screen.width * (this.boardCenterSizePercent/100);
	this.boardSidePadding = app.screen.width * (this.boardSideSizePercent/100);
	if(app.screen.height > app.screen.width) {
		this.boardWidth = app.screen.width;
		this.boardHeight = app.screen.width / 1.44;
		this.boardY = (app.screen.height - this.boardHeight)/2;
		this.boardX = 0;
	}else {
		this.boardHeight = app.screen.height;
		this.boardWidth = app.screen.height * 1.44;
		if(app.screen.width < this.boardWidth) {
			this.boardWidth = this.boardWidth - (this.boardWidth - app.screen.width);
		}
		this.boardX = (app.screen.width - this.boardWidth)/2;
		this.boardY = 0;
	}

}

Global.prototype.boardWidth = undefined;
Global.prototype.boardHeight = undefined;
Global.prototype.boardX = undefined;
Global.prototype.boardY = undefined;
Global.prototype.boardCenterPadding = undefined;
Global.prototype.boardSidePadding = undefined;
Global.prototype.checkerMargin = undefined;


export default Global