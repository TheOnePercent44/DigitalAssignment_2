RPGGame.MainMenu = function (game) {
	this.game = game;
	this.music = null;
	this.playButton = null;

};

RPGGame.MainMenu.prototype = {

	create: function () {

		//	We've already preloaded our assets, so let's kick right into the Main Menu itself.
		//	Here all we're doing is playing some music and adding a picture and button
		//	Naturally I expect you to do something significantly better :)

		this.music = this.add.audio('titleMusic');
		this.music.play();

		//this.add.sprite(0, 0, 'titlepage');
		//add text

		//this.playButton = this.add.button(400, 600, 'playButton', this.startGame, this, 'buttonOver', 'buttonOut', 'buttonOver');
		this.playButton = this.add.button(this.game.world.centerX - 95, 400, 'button', this.actionOnClick, this, 2, 0, 1);

	},

	update: function () {

		//	Do some nice funky main menu effect here

	},

	startGame: function (pointer) {

		//	Ok, the Play Button has been clicked or touched, so let's stop the music (otherwise it'll carry on playing)
		this.music.stop();

		//	And start the actual game
		this.state.start('Game');

	},
	
	actiononClick: function() {
		this.startGame();
	}

};