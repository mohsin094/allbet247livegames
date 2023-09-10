import bg from "#backgammon/Backgammon";
import {ROLES} from "#extensions/permissions/Role";
import GameHolder from "#backgammon/GameHolder";

function SystemController() {
	
	this.accessRules = [
		{
			methods: ['game-cancel'],
			httpMethods: ['GET', 'POST'],
			roles: [ROLES.SYSTEM],
			allow: true
		}
	];

	this.gameCancel = async function() {
		
	}

	this.index = async function()
	{

		

		// const sess = new session("hnwvEM4gieQSgB7UQ2d9xJ6e94otCTcg");
		// await sess.begin();
		// await sess.set('test', 'data');
		// await sess.set('test', 'new data');
		// console.log(await sess.has('test'));
		// await sess.del('test')
		// console.log(await sess.has('test'));
		// console.log(sess.records);
		// const t = new bg();
		
		// t.create({
		// 	timer: {
		// 		time: 10,
		// 		timeBank: 20
		// 	}
		// });
		return this.send(JSON.stringify({hi: 'hi'}));
	}
}



export default SystemController

