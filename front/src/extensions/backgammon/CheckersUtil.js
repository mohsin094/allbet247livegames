import {PLAYER_COLOR as COLOR} from "@/extensions/backgammon/Player";
import Checker from "@/extensions/backgammon/Checker";
export default {

	setPosition(board, checkers, color) {
		for(let i=0; i<checkers.length; i++) {
			board.removeChecker(checkers[i].index, color);
			const checker = new Checker;
			checker.create(checkers[i].color,checkers[i].position,checkers[i].index);
			board.position(checker, checker.position);
		}
		// const board1 = board;
		// board = Object.assign({});
		// board = board1;
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
					checkers[i].position = 19;
					board.position(checkers[i], 19);
				}else {
					checkers[i].position = 17;
					board.position(checkers[i], 17);
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