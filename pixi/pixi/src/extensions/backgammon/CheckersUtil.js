import {PLAYER_COLOR as COLOR} from "@/extensions/backgammon/Player";
export default {
	fixPosition(board, checkers) {
		for(let i = 0; i < checkers.length; i++) {
			board.position(checkers[i], checkers[i].position);
		}
	},
	initPosition(board, color, checkers) {
		
		switch(color) {
		case COLOR.WHITE:
			for(let i = 0; i < 15; i++) {
				if(i == 0 || i == 1) {
					checkers[i].position = 1;
					board.position(checkers[i], 1);
				}else if(i < 7) {

					checkers[i].position = 12;
					board.position(checkers[i], 12);
				}else if(i < 12) {
					checkers[i].position = 17;
					board.position(checkers[i], 17);
				}else {

					checkers[i].position = 20;
					board.position(checkers[i], 20);
				}
			}
			break;
		case COLOR.BLACK:
			for(let i = 0; i < 15; i++) {
			
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