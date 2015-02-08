RPGGame.GameWorld = function (game) {

    //  When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:

    this.game;      //  a reference to the currently running game (Phaser.Game)
    this.add;       //  used to add sprites, text, groups, etc (Phaser.GameObjectFactory)
    this.camera;    //  a reference to the game camera (Phaser.Camera)
    this.cache;     //  the game cache (Phaser.Cache)
    this.input;     //  the global input manager. You can access this.input.keyboard, this.input.mouse, as well from it. (Phaser.Input)
    this.load;      //  for preloading assets (Phaser.Loader)
    this.math;      //  lots of useful common math operations (Phaser.Math)
    this.sound;     //  the sound manager - add a sound, play one, set-up markers, etc (Phaser.SoundManager)
    this.stage;     //  the game stage (Phaser.Stage)
    this.time;      //  the clock (Phaser.Time)
    this.tweens;    //  the tween manager (Phaser.TweenManager)
    this.state;     //  the state manager (Phaser.StateManager)
    this.world;     //  the game world (Phaser.World)
    this.particles; //  the particle manager (Phaser.Particles)
    this.physics;   //  the physics manager (Phaser.Physics)
    this.rnd;       //  the repeatable random number generator (Phaser.RandomDataGenerator)

    //  You can use any of these from any function within this State.
    //  But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.

};

var catfriend, map, layer0, layer1, layer2;
var speed = 4;
RPGGame.GameWorld.prototype = {
	
    create: function () {
        //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!
		catfriend = this.game.add.sprite(10, 7, 'cat', 2);
		this.game.physics.enable(catfriend, Phaser.Physics.ARCADE);
		catfriend.animations.add('walkLeft', [1, 0]);
		catfriend.animations.add('walkRight', [2, 3]);
		map = this.game.add.tilemap('map');
		map.addTilesetImage('stone_walls', 'stonewalls');
		map.addTilesetImage('doors_udonly', 'doors_ud');
		map.addTilesetImage('doors_lronly', 'doors_lr');
		layer0 = map.createLayer('Layer0');
		layer1 = map.createLayer('Layer1');
		layer2 = map.createLayer('Layer2');
		this.game.physics.collide(catfriend, layer1);
		map.setCollision(3);
		map.setCollision(9);
		map.setCollision(14);
		map.setCollision(16);
		
    },

    update: function () {

        //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!
		if(this.game.input.keyboard.isDown(Phaser.Keyboard.A))
		{
			//catfriend.body.moveLeft(300);
			catfriend.body.x -= speed;
			catfriend.animations.play('walkLeft', 20, true);
		}
		else if(this.game.input.keyboard.isDown(Phaser.Keyboard.D))
		{
			//catfriend.body.moveRight(300);
			catfriend.body.x += speed;
			catfriend.animations.play('walkRight', 20, true);
		}
		else
		{
			if(!(this.game.input.keyboard.isDown(Phaser.Keyboard.W) || this.game.input.keyboard.isDown(Phaser.Keyboard.S)))
				catfriend.animations.stop(null, true);
		}
		
		if(this.game.input.keyboard.isDown(Phaser.Keyboard.W))
		{
			//catfriend.body.moveUp(300);
			catfriend.body.y -= speed;
			if(catfriend.frame === 2)
				catfriend.animations.play('walkRight', 20, true);
			else if(catfriend.frame === 0)
				catfriend.animations.play('walkLeft', 20, true);
		}
		else if(this.game.input.keyboard.isDown(Phaser.Keyboard.S))
		{
			//catfriend.body.moveDown(300);
			catfriend.body.y += speed;
			if(catfriend.frame === 2)
				catfriend.animations.play('walkRight', 20, true);
			else if(catfriend.frame === 0)
				catfriend.animations.play('walkLeft', 20, true);
		}
    },

    quitGame: function (pointer) {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.
        //this.state.start('MainMenu');

    }

};