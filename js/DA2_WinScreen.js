RPGGame.WinScreen = function (game) {
	this.game = game;
};

RPGGame.WinScreen.prototype = {
	var text = this.game.add.text(this.game.world.centerX, this.game.world.centerY, "Congratulations!", { font: "65px Arial", fill: "#000000", align: "center" });
};