import bg from "#backgammon/Backgammon";

function DefaultController() {
	
	this.accessRules = [
		{
			allow: true
		}
	];

	this.index = function()
	{
		const t = new bg();
		
		t.create({
			timer: {
				time: 10,
				timeBank: 20
			}
		});
	}
}



export default DefaultController

