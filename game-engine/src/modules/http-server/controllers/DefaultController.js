import bg from "#backgammon/Backgammon";
import session from "#components/Session";

function DefaultController() {
	
	this.accessRules = [
		{
			allow: true
		}
	];

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
		this.setResult('hi');
	}
}



export default DefaultController

