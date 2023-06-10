import {PLAYER_COLOR} from "@/extensions/backgammon/Player";
import {Texture, Sprite} from "pixi.js";

function Checker(globalValues) {
	this.global = globalValues;
}

Checker.prototype.color = undefined;
Checker.prototype.position = undefined;
Checker.prototype.index = undefined;
Checker.prototype.global = undefined;
Checker.prototype.create = function(color, position, index) {
	this.color = color;
	this.position = position;
	this.index = index;

	switch(this.color) {
		case PLAYER_COLOR.WHITE:
			

		break;
		case PLAYER_COLOR.BLACK:
			
		break;
	}

}

export default Checker