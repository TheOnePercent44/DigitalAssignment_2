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
var speed = 2, hope, HOPEMAX, courage, COURAGEMAX, hopebar, hopeback, hopefore;
var time1, cropbox;
RPGGame.GameWorld.prototype = {
	
    create: function () {
		this.game.physics.startSystem(Phaser.Physics.P2JS);
		//this.game.physics.startSystem(Phaser.Physics.ARCADE);
		//this.game.physics.p2.setImpactEvents(true);
		//wallsCG = this.game.physics.p2.createCollisionGroup();
		//playerCG = this.game.physics.p2.createCollisionGroup();
		
		map = this.game.add.tilemap('map');
		map.addTilesetImage('stone_walls', 'stonewalls');
		map.addTilesetImage('doors_udonly', 'doors_ud');
		map.addTilesetImage('doors_lronly', 'doors_lr');
		layer0 = map.createLayer('Layer0');
		layer1 = map.createLayer('Layer1');
		layer2 = map.createLayer('Layer2');
		layer1.resizeWorld();
		catfriend = this.game.add.sprite(30, 30, 'cat', 2);
		//CollisionLayer = map.createLayer('Layer3');
		
		this.game.physics.enable(catfriend, Phaser.Physics.ARCADE);
		//this.game.physics.enable(catfriend, Phaser.Physics.P2JS);
		catfriend.anchor.setTo(0.5, 0.5);
		//catfriend.body.collideWorldBounds = true;
		//catfriend.body.tilePadding.set(16, 16);
		//map.setCollision([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31], true, layer1, true);
		//map.setCollisionByExclusion([0, 18], true, layer1);
		map.setCollisionBetween(1, 40, true, 'Layer1', true);
		//this.game.physics.p2.enable(catfriend);
		catfriend.animations.add('walkLeft', [1, 0]);
		catfriend.animations.add('walkRight', [2, 3]);
		//this.game.physics.arcade.collide(catfriend, layer1);
		//this.game.physics.arcade.TILE_BIAS = 50;
		this.game.camera.setSize(100, 100);
		this.game.camera.follow(catfriend, this.game.camera.FOLLOW_TOPDOWN_TIGHT);
		//this.game.camera.update();
		
		/*catfriend.body.setCollisionGroup(playerCG);
		catfriend.body.collides(playerCG);
		catfriend.body.collides(wallsCG);
		walls = this.game.physics.p2.convertCollisionObjects(map, "Layer3", true);
		for(var wall in walls)
		{
			walls[wall].setCollisionGroup(wallsCG);
			walls[wall].collides(playerCG);
			//walls[wall].collides(playerperson);
		}*/
		
		collectioncats = this.game.add.group();
		collectioncats.enableBody = true;
		for(var i = 0; i < 25; i++)
		{
			collectioncats.add(newCat(this.game));
		}
		
		hopeback = this.game.add.sprite(this.game.camera.width*0.75, this.game.camera.height*0.07, 'barback');
		hopebar = this.game.add.sprite(hopeback.x, hopeback.y, 'hope');
		hopefore = this.game.add.sprite(hopeback.x, hopeback.y, 'barfore');
		hopeback.scale.x = 0.5;
		hopeback.scale.y = 0.5;
		hopebar.scale.x = 0.5;
		hopebar.scale.y = 0.5;
		hopefore.scale.x = 0.5;
		hopefore.scale.y = 0.5;
		
		//hopebar.cropEnabled = true;
		HOPEMAX = 500;
		hope = 325;//HOPEMAX;
		console.log("width: %d, Height: %d", hopebar.width, hopebar.height);//debug
		cropbox = new Phaser.Rectangle(hopebar.x, hopebar.y, hopebar.width, hopebar.height);
		//hopebar.crop = new Phaser.Rectangle(hopebar.x, hopebar.y, hopebar.width, hopebar.height);
		hopebar.crop(cropbox);
		//hopebar.cropRect = cropbox;
		//hopebar.crop = hopebar.crop;
		//hopebar.crop.width = (hope / HOPEMAX) * hopebar.width;
		//hopebar.cropRect.width = (hope / HOPEMAX) * hopebar.width;
		//hopebar.updateCrop();
		time1 = this.game.time.now;
    },

    update: function () {
		this.game.physics.arcade.collide(catfriend.body, layer1);
		this.game.physics.arcade.overlap(catfriend, collectioncats, gainCat);
		if(this.game.time.now-time1 > 3000)
		{
			hope -= 20;
			//hopebar.cropRect.width = (hope / HOPEMAX) * hopebar.width;
			//hopebar.updateCrop();
			//hopebar.crop.width = (hope / HOPEMAX) * hopebar.width;
			time1 = this.game.time.now;
		}
		console.log("hope %d", hope);
		if(hope <= 0)
			hope = 0;//also end the game
		
		//this.game.physics.p2.collide(playerCG, wallsCG);//invalid function
		
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

    },
	
	render: function() {

		this.game.debug.cameraInfo(this.game.camera, 32, 32);
	}

};

function newCat(game)
{
	var xcoord, ycoord;
	
	xcoord = game.rnd.integerInRange(16, 784);
	ycoord = game.rnd.integerInRange(16, 784);
	
	var meowcat = game.add.sprite(xcoord, ycoord, 'cat', 2);
	while(game.physics.arcade.overlap(this, map.layer1))
	{
		xcoord = game.rnd.integerInRange(16, 784);
		ycoord = game.rnd.integerInRange(16, 784);
		meowcat.kill();
		meowcat.reset(xcoord, ycoord);
	}
	meowcat.animations.add('jumpRight', [2, 3]);
	meowcat.animations.play('jumpRight', 5, true);
	
	return meowcat;
};

function gainCat(player, cat) {

	// Remove cat (or replace with follower?)
	cat.kill();
	//cat = new follower?

	//Restore Hope and/or Courage
	hope += 20;
	if(hope > HOPEMAX)
		hope = HOPEMAX;

};