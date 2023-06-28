import {PLAYER_COLOR} from "@/extensions/backgammon/Player";


function Checker(globals) {
	
	this.global = globals;
}

Checker.prototype.color = undefined;
Checker.prototype.position = undefined;
Checker.prototype.index = undefined;
Checker.prototype.global = undefined;
Checker.prototype.width = undefined;
Checker.prototype.selected = undefined;
Checker.prototype.create = function(color, position, index) {
	this.color = color;
	this.position = position;
	this.index = index;
	this.width = this.global.checkerSize;
	this.selected = false;
	
	switch(this.color) {
		case PLAYER_COLOR.WHITE:
			
		break;
		case PLAYER_COLOR.BLACK:
			
		break;
	}

}

export default Checker