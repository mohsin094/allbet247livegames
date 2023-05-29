import {PLAYER_COLOR as COLOR} from "#backgammon/player/Player";
export default {
	initPosition(borad, color, checkers) {
		switch(color) {
		case COLOR.WHITE:
			for(let i = 1; i <= 15; i++) {
				if(i == 1 || i == 2) {
					board.position(checkers[i], 1);
				}else if(i < 8) {
					board.position(checkers[i], 12);
				}else if(i < 11) {
					borad.position(checkers[i], 17);
				}else {
					borad.position(checkers[i], 19);
				}
			}
			break;
		case COLOR.BLACK:
			for(let i = 1; i <= 15; i++) {
				if(i == 1 || i == 2) {
					board.position(checkers[i], 24);
				}else if(i < 8) {
					board.position(checkers[i], 13);
				}else if(i < 11) {
					borad.position(checkers[i], 8);
				}else {
					borad.position(checkers[i], 6);
				}
			}
			break;
		}
	}
}