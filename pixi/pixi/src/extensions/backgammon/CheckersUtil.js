import {PLAYER_COLOR as COLOR} from "@/extensions/backgammon/Player";
export default {

	initPosition(board, color, checkers) {
		
		switch(color) {
		case COLOR.WHITE:
			for(let i = 0; i < 15; i++) {
				if(i == 0 || i == 1) {
					checkers[i].position = 0;
					board.position(checkers[i], 0);
				}else if(i < 7) {

					checkers[i].position = 11;
					board.position(checkers[i], 11);
				}else if(i < 12) {
					checkers[i].position = 18;
					board.position(checkers[i], 18);
				}else {

					checkers[i].position = 16;
					board.position(checkers[i], 16);
				}
			}
			break;
		case COLOR.BLACK:
			for(let i = 0; i < 15; i++) {
			
				if(i == 0 || i == 1) {
					checkers[i].position = 23;
					board.position(checkers[i], 23);
				}else if(i < 7) {

					checkers[i].position = 12;
					board.position(checkers[i], 12);
				}else if(i < 10) {

					checkers[i].position = 7;
					board.position(checkers[i], 7);
				}else {

					checkers[i].position = 5;
					board.position(checkers[i], 5);
				}
			}
			break;
		}
	}
}