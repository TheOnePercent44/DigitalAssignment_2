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

var catfriend, map, layer0, layer1, layer2, walls, CollisionLayer, wallsCG, playerCG;
var speed = 2;
RPGGame.GameWorld.prototype = {
	
    create: function () {
		//this.game.physics.startSystem(Phaser.Physics.P2JS);
		this.game.physics.startSystem(Phaser.Physics.ARCADE);
		this.game.physics.p2.setImpactEvents(true);
		wallsCG = this.game.physics.p2.createCollisionGroup();
		playerCG = this.game.physics.p2.createCollisionGroup();
		
		map = this.game.add.tilemap('map');
		map.addTilesetImage('stone_walls', 'stonewalls');
		map.addTilesetImage('doors_udonly', 'doors_ud');
		map.addTilesetImage('doors_lronly', 'doors_lr');
		layer0 = map.createLayer('Layer0');
		layer1 = map.createLayer('Layer1');
		layer2 = map.createLayer('Layer2');
		//CollisionLayer = map.createLayer('CollisionLayer');
		layer0.resizeWorld();
		
		catfriend = this.game.add.sprite(12, 22, 'cat', 2);
		//this.game.physics.enable(catfriend, Phaser.Physics.ARCADE);
		this.game.physics.arcade.enable(catfriend);
		//this.game.physics.p2.enable(catfriend);
		catfriend.animations.add('walkLeft', [1, 0]);
		catfriend.animations.add('walkRight', [2, 3]);
		//this.game.physics.arcade.TILE_BIAS = 40;
		//this.game.physics.arcade.collide(catfriend, CollisionLayer);
		//this.game.physics.p2js.TILE_BIAS = 40;
		//this.game.physics.p2js.collide(catfriend, layer1);
		//map.setCollision(, true, layer1);
		/*this.game.camera.setSize(100, 100);
		this.game.camera.follow(catfriend);*/
		/*catfriend.anchor.setTo(0.5, 0.5);
		catfriend.body.setCollisionGroup(playerCG);
		catfriend.body.collides(playerCG);
		catfriend.body.collides(wallsCG);
		
		walls = this.game.physics.p2.convertCollisionObjects(map, "CollisionLayer", true);
		for(var wall in walls)
		{
			walls[wall].setCollisionGroup(wallsCG);
			walls[wall].collides(playerCG);
			//walls[wall].collides(playerperson);
		}*/
    },

    update: function () {
		this.game.physics.arcade.collide(catfriend, layer1);
		if(this.game.input.keyboard.isDown(Phaser.Keyboard.A))
		{
			catfriend.body.x -= speed;
			catfriend.animations.play('walkLeft', 20, true);
		}
		else if(this.game.input.keyboard.isDown(Phaser.Keyboard.D))
		{
			catfriend.body.x += speed;
			catfriend.animations.play('walkRight', 20, true);
		}		
		else if(this.game.input.keyboard.isDown(Phaser.Keyboard.W))
		{
			catfriend.body.y -= speed;
			catfriend.animations.play('walkLeft', 20, true);
		}
		else if(this.game.input.keyboard.isDown(Phaser.Keyboard.S))
		{
			catfriend.body.y += speed;
			catfriend.animations.play('walkRight', 20, true);
		}
		else
		{
			catfriend.animations.stop(null, true);
		}
    },

    quitGame: function (pointer) {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.
        //this.state.start('MainMenu');

    }

};