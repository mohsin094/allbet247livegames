function Player()
{

}

const COLOR = {
	WHITE: 'white',
	BLACK: 'black'
}

Player.prototype.timer = undefined;
Player.prototype.color = undefined;
Player.prototype.dice = undefined;

Player.prototype.create = function(player) {
	this.timer = player.timer;
	this.color = player.color;
	this.dice = [new Dice(), new Dice()];
}

export default Player
export {COLOR as PLAYER_COLOR}