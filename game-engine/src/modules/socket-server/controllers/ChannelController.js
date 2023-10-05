import
{
	ROLES
}
from "#extensions/permissions/Role";
import Log from "#components/Log";
import mongo from "#components/Mongo";
import
{
	ObjectId
}
from "mongodb";
import
{
	EMIT
}
from "#backgammon/Backgammon";
import
{
	PLAYER_COLOR
}
from "#backgammon/player/Player";

function ChannelController()
{
	this.accessRules = [
		{
			methods: ['join'],
			roles: [ROLES.MEMBER],
			allow: true
		}
	];

	this.join = async function() {
		const userId = this.app.user.id;
		let notif = undefined;
		
	}

}


export default ChannelController