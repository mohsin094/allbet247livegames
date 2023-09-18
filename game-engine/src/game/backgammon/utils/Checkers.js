import {PLAYER_COLOR as COLOR} from "#backgammon/player/Player";
export default {
	initPosition(board, color, checkers) {
		
		switch(color) {
		case COLOR.WHITE:
			for(let i = 0; i < 15; i++) {
				checkers[i].index = i;
				if(i == 0 || i == 1) {
					checkers[i].position = 1;
				
					board.position(checkers[i], 1);
				}else if(i < 7) {
					checkers[i].position = 12;

					board.position(checkers[i], 12);
				}else if(i < 10) {
					checkers[i].position = 17;

					board.position(checkers[i], 17);
				}else {
					checkers[i].position = 19;

					board.position(checkers[i], 19);
				}
			}
			break;
		case COLOR.BLACK:
			for(let i = 0; i < 15; i++) {
				checkers[i].index = i;
			
				if(i == 0 || i == 1) {
					checkers[i].position = 24;
					board.position(checkers[i], 24);
				}else if(i < 7) {
					checkers[i].position = 13;

					board.position(checkers[i], 13);
				}else if(i < 10) {
					checkers[i].position = 8;

					board.position(checkers[i], 8);
				}else {
					checkers[i].position = 6;

					board.position(checkers[i], 6);
				}
			}
			break;
		}
	}
}