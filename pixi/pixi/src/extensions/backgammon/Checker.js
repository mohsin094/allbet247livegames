import {PLAYER_COLOR} from "@/extensions/backgammon/Player";
import {Texture, Sprite} from "pixi.js";

function Checker(globalValues) {
	this.global = globalValues;
}

Checker.prototype.color = undefined;
Checker.prototype.position = undefined;
Checker.prototype.index = undefined;
Checker.prototype.global = undefined;
Checker.prototype.sprite = undefined;
Checker.prototype.create = function(color, position, index) {
	this.color = color;
	this.position = position;
	this.index = index;

	switch(this.color) {
		case PLAYER_COLOR.WHITE:
			const whiteCheckerTexture = Texture.from('/assets/img/white-checker.png');
			this.sprite = new Sprite(whiteCheckerTexture);

		break;
		case PLAYER_COLOR.BLACK:
			const blackCheckerTexture = Texture.from('/assets/img/black-checker.png');
			this.sprite = new Sprite(blackCheckerTexture);
		break;
	}


	this.sprite.width = this.global.boardWidth * (this.global.checkerSizePercent / 100);
	this.sprite.height = this.global.boardWidth * (this.global.checkerSizePercent / 100);

}

export default Checker