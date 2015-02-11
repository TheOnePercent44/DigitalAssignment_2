RPGGame.LoseScreen = function (game) {
	this.game = game;
};

RPGGame.LoseScreen.prototype = {
	var text = this.game.add.text(this.game.world.centerX, this.game.world.centerY, "You lose!", { font: "65px Arial", fill: "#000000", align: "center" });
};