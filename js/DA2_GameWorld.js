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

var catfriend, map, layer0, layer1, layer2, walls, CollisionLayer, wallsCG, playerCG, catsCG;
var speed = 100, hope, HOPEMAX, courage, COURAGEMAX, hopebar, hopeback, hopefore;
var time1, time2, cattime, cropbox, permawidth, collectioncats, courageCats, catstopped = true;
RPGGame.GameWorld.prototype = {
	
    create: function () {
		this.music = this.add.audio('gameMusic', 1.5, true);
		this.music.play();
		//this.game.world.setBounds(0, 0, 4000, 4000);//widenbounds for tilemap load?
		//this.game.physics.startSystem(Phaser.Physics.P2JS);
		this.game.physics.startSystem(Phaser.Physics.ARCADE);
		/*this.game.physics.p2.setImpactEvents(true);
		wallsCG = this.game.physics.p2.createCollisionGroup();
		playerCG = this.game.physics.p2.createCollisionGroup();
		catsCG = this.game.physics.p2.createCollisionGroup();*/
		
		map = this.game.add.tilemap('map');
		map.addTilesetImage('stone_walls', 'stonewalls');
		map.addTilesetImage('doors_udonly', 'doors_ud');
		map.addTilesetImage('doors_lronly', 'doors_lr');
		layer0 = map.createLayer('Layer0');
		layer1 = map.createLayer('Layer1');
		//layer1.debug = true;
		layer2 = map.createLayer('Layer2');
		layer1.resizeWorld();
		catfriend = this.game.add.sprite(30, 30, 'cat', 2);
		//CollisionLayer = map.createLayer('Layer3');
		
		this.game.physics.enable(catfriend, Phaser.Physics.ARCADE);
		//this.game.physics.enable(catfriend, Phaser.Physics.P2JS);
		catfriend.anchor.setTo(0.5, 0.5);
		//catfriend.debug = true;
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
		//this.game.camera.setSize(100, 100);
		//this.game.camera.bounds = new Phaser.Rectangle(0, 0, 3216,3216);
		//this.game.camera.follow(catfriend, this.game.camera.FOLLOW_TOPDOWN_TIGHT);
		//this.game.camera.update();
		
		/*catfriend.body.setCollisionGroup(playerCG);
		catfriend.body.collides(playerCG);
		catfriend.body.collides(wallsCG);
		catfriend.body.collides(catsCG);
		walls = this.game.physics.p2.convertCollisionObjects(map, "Layer3", true);
		for(var wall in walls)
		{
			walls[wall].setCollisionGroup(wallsCG);
			walls[wall].collides(playerCG);
		}*/
		
		collectioncats = this.game.add.group();
		collectioncats.enableBody = true;
		collectioncats.physicsBodyType = Phaser.Physics.ARCADE;
		//collectioncats.setCollisionGroup(catsCG);
		for(var i = 0; i < 25; i++)
		{
			/*var catguy = newCat(this.game);
			catguy.setCollisionGroup(catsCG);
			catguy.collides(playerCG);
			collectioncats.add(catguy);*/
			collectioncats.add(newCat(this.game));
		}
		
		/*courageCats = this.game.add.group();
		courageCats.enableBody = true;
		courageCats.physicsBodyType = Phaser.Physics.ARCADE;
		//collectioncats.setCollisionGroup(catsCG);
		for(var i = 0; i < 10; i++)
		{
			/*var catguy = newCat(this.game);
			catguy.setCollisionGroup(catsCG);
			catguy.collides(playerCG);
			collectioncats.add(catguy);
			courageCats.add(newCCat(this.game));
		}*/
		
		/*enemyGroup = this.game.add.group();
		enemyGroup.enableBody = true;
		enemyGroup.physicsBodyType = Phaser.Physics.ARCADE;
		//collectioncats.setCollisionGroup(catsCG);
		for(var i = 0; i < 35; i++)
		{
			/*var catguy = newCat(this.game);
			catguy.setCollisionGroup(catsCG);
			catguy.collides(playerCG);
			collectioncats.add(catguy);
			enemyGroup.add(newBaddie(this.game));
		}*/
		
		hopeback = this.game.add.sprite(this.game.camera.width*0.75, this.game.camera.height*0.07, 'barback');
		hopebar = this.game.add.sprite(hopeback.x, hopeback.y, 'hope');//where did this go?
		//hopebar = this.game.add.sprite(this.game.camera.width*0.75, this.game.camera.height*0.07, 'hope');//none hopeback edition
		//hopebar.reset(hopeback.x, hopeback.y);
		hopefore = this.game.add.sprite(hopeback.x, hopeback.y, 'barfore');
		hopeback.scale.x = 0.5;
		hopeback.scale.y = 0.5;
		hopebar.scale.x = 0.5;
		hopebar.scale.y = 0.5;
		hopefore.scale.x = 0.5;
		hopefore.scale.y = 0.5;
		
		hopeback.fixedToCamera = true;
		hopebar.fixedToCamera = true;
		hopefore.fixedToCamera = true;
		hopeback.cameraOffset.setTo(this.game.camera.width*0.75, this.game.camera.height*0.07);
		hopebar.cameraOffset.setTo(this.game.camera.width*0.75, this.game.camera.height*0.07);
		hopefore.cameraOffset.setTo(this.game.camera.width*0.75, this.game.camera.height*0.07);
		
		/*courageback = this.game.add.sprite(this.game.camera.width*0.5, this.game.camera.height*0.07, 'barback');
		couragebar = this.game.add.sprite(courageback.x, courageback.y, 'courage');
		couragefore = this.game.add.sprite(courageback.x, courageback.y, 'barfore');
		courageback.scale.x = 0.5;
		courageback.scale.y = 0.5;
		couragebar.scale.x = 0.5;
		couragebar.scale.y = 0.5;
		couragefore.scale.x = 0.5;
		couragefore.scale.y = 0.5;*/
		
		permawidth = hopeback.width;
		
		//hopebar.cropEnabled = true;
		HOPEMAX = 300;
		//COURAGEMAX = 100;
		hope = 200;//HOPEMAX;
		//courage = 50;
		//console.log("width: %d, Height: %d", hopebar.width, hopebar.height);//debug
		//cropbox = new Phaser.Rectangle(hopebar.x, hopebar.y, (hope/HOPEMAX)*hopebar.width, hopebar.height);
		//hopebar.crop = new Phaser.Rectangle(hopebar.x, hopebar.y, hopebar.width, hopebar.height);
		//hopebar.crop(cropbox);
		//hopebar.cropRect = cropbox;
		//hopebar.crop = hopebar.crop;
		//hopebar.crop.width = (hope / HOPEMAX) * hopebar.width;
		//hopebar.cropRect.width = (hope / HOPEMAX) * hopebar.width;
		//hopebar.cropRect.setTo(hopebar.x, hopebar.y, (hope / HOPEMAX) * hopebar.width, hopebar.height);
		//hopebar.updateCrop();
		hopebar.width = (hope / HOPEMAX) * permawidth;
		//couragebar.width = (courage / COURAGEMAX) * permawidth;
		
		time1 = this.game.time.now;
		cattime = this.game.time.now;
		//time2 = -1;
    },

    update: function () {
		this.game.physics.arcade.collide(catfriend, layer1);
		//Phaser.Physics.Arcade.collide(catfriend, layer1);//not a function
		this.game.physics.arcade.collide(catfriend, collectioncats, gainCat);
		//this.game.physics.arcade.collide(catfriend, courageCats, gainCCat);
		if(collectioncats.countLiving()/*+courageCats.countLiving()*/ === 0)
			this.endGame(this, true);
		//hopebar.updateCrop();
		//hopebar.width = (hope / HOPEMAX) * permawidth;
		
		if(this.game.time.now-time1 > 2500)
		{
			hope -= 10;	
			if(hope <= 0)
			{
				hope = 0;//also end the game
				this.endGame(false);
			}
			//hopebar.cropRect.width = (hope / HOPEMAX) * hopebar.width;
			//hopebar.updateCrop();
			//hopebar.crop.width = (hope / HOPEMAX) * hopebar.width;
			hopebar.width = (hope / HOPEMAX) * permawidth;
			//hopebar.x = hopeback.x;
			time1 = this.game.time.now;
		}
		console.log("hope %d", hope);
		
		//this.game.physics.p2.collide(playerCG, wallsCG);//invalid function
		
		if(this.game.input.keyboard.isDown(Phaser.Keyboard.A))
		{
			//catfriend.body.x -= speed;
			catfriend.body.velocity.y = 0;
			catfriend.body.velocity.x = -speed;
			catfriend.animations.play('walkLeft', 20, true);
		}
		else if(this.game.input.keyboard.isDown(Phaser.Keyboard.D))
		{
			//catfriend.body.x += speed;
			catfriend.body.velocity.y = 0;
			catfriend.body.velocity.x = speed;
			catfriend.animations.play('walkRight', 20, true);
		}		
		else if(this.game.input.keyboard.isDown(Phaser.Keyboard.W))
		{
			//catfriend.body.y -= speed;
			catfriend.body.velocity.x = 0;
			catfriend.body.velocity.y = -speed;
			catfriend.animations.play('walkLeft', 20, true);
		}
		else if(this.game.input.keyboard.isDown(Phaser.Keyboard.S))
		{
			//catfriend.body.y += speed;
			catfriend.body.velocity.x = 0;
			catfriend.body.velocity.y = speed;
			catfriend.animations.play('walkRight', 20, true);
		}
		else
		{
			catfriend.body.velocity.x = 0;
			catfriend.body.velocity.y = 0;
			catfriend.animations.stop(null, true);
		}
		
		/*if(this.game.time.now-cattime > 4000)
		{
			if(catstopped === true)
			{
				collectioncats.forEachAlive(moveCat, this, this.game);
				catstopped = false;
			}
			else
			{
				collectioncats.forEachAlive(stopCat, this);
				catstopped = true;
			}
		}
		else{}//do nothing*/
		
		/*if(this.game.input.keyboard.isDown(Phaser.Keyboard.UP) && this.game.time.now-time2 >= 1000)
		{
			fireShot(0, this.game);
		}
		else if(this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) && this.game.time.now-time2 >= 1000)
		{
			fireShot(1, this.game);
		}
		else if(this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN) && this.game.time.now-time2 >= 1000)
		{
			fireShot(2, this.game);
		}
		else if(this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT) && this.game.time.now-time2 >= 1000)
		{
			fireShot(3, this.game);
		}*/
    },

    quitGame: function (pointer) {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.
        //this.state.start('MainMenu');

    },
	endGame: function(won)
	{
		this.music.stop();
		if(won)
			this.state.start('WinScreen');//display win screen
		else
			this.state.start('LoseScreen');//display lose screen
	}/*,
	
	render: function() {

		this.game.debug.cameraInfo(this.game.camera, 32, 32);
	}*/

};

/*function fireShot(direction, game)
{
	if(direction === 0)
	{}//shoot up
	else if(direction === 1)
	{}//shoot right
	else if(direction === 2)
	{}//shoot down
	else// if(direciton === 3)
	{}//shoot left
	
	courage -= 5;
	time2 = game.time.now;
};*/

/*function newBaddie(game)
{
	var xcoord, ycoord;
	
	xcoord = game.rnd.integerInRange(50, 784);
	ycoord = game.rnd.integerInRange(50, 784);
	
	var mummy = game.add.sprite(xcoord, ycoord, 'mummy', 2);
	game.physics.enable(mummy, Phaser.Physics.ARCADE);
	while(game.physics.arcade.collide(mummy, layer1) || game.physics.arcade.overlap(mummy, catfriend))
	{
		xcoord = game.rnd.integerInRange(50, 784);
		ycoord = game.rnd.integerInRange(50, 784);
		mummy.kill();
		mummy.reset(xcoord, ycoord);
	}
	//mummy.animations.add('jumpRight', [2, 3]);
	//meowcat.animations.play('jumpRight', 5, true);
	
	return mummy;
};*/

function newCat(game)
{
	var xcoord, ycoord;
	
	xcoord = game.rnd.integerInRange(16, 768);
	ycoord = game.rnd.integerInRange(16, 768);
	
	var meowcat = game.add.sprite(xcoord, ycoord, 'cat', 2);
	game.physics.enable(meowcat, Phaser.Physics.ARCADE);
	while(game.physics.arcade.collide(meowcat, layer1) || game.physics.arcade.collide(meowcat, catfriend) || game.physics.arcade.collide(meowcat, collectioncats))
	{
		xcoord = game.rnd.integerInRange(16, 768);
		ycoord = game.rnd.integerInRange(16, 768);
		meowcat.kill();
		meowcat.reset(xcoord, ycoord);
	}
	meowcat.animations.add('jumpRight', [2, 3]);
	meowcat.animations.add('jumpLeft', [1, 0]);
	meowcat.animations.play('jumpRight', 5, true);
	
	return meowcat;
};

function gainCat(player, cat) {

	// Remove cat (or replace with follower?)
	cat.kill();
	//cat = new follower?

	//Restore Hope and/or Courage
	hope += 40;
	if(hope > HOPEMAX)
		hope = HOPEMAX;
	
	hopebar.width = (hope / HOPEMAX) * permawidth;
};

/*var speed = [100, -100];
function moveCat(cat, game)
{
	var xspeed = speed[game.rnd.integerInRange(0, 1)];
	var yspeed = speed[game.rnd.integerInRange(0, 1)];
	cat.body.velocity.x = xspeed;
	cat.body.velocity.y = yspeed;
};

function stopCat(cat)
{
	cat.body.velocity.x = 0;
	cat.body.velocity.y = 0;
};*/

/*function newCCat(game)
{
	var xcoord, ycoord;
	
	xcoord = game.rnd.integerInRange(16, 784);
	ycoord = game.rnd.integerInRange(16, 784);
	
	var ccat = game.add.sprite(xcoord, ycoord, 'orangecat', 2);
	game.physics.enable(ccat, Phaser.Physics.ARCADE);
	while(game.physics.arcade.collide(ccat, layer1) || game.physics.arcade.collide(ccat, catfriend))
	{
		xcoord = game.rnd.integerInRange(16, 784);
		ycoord = game.rnd.integerInRange(16, 784);
		ccat.kill();
		ccat.reset(xcoord, ycoord);
	}
	ccat.animations.add('jumpRightC', [2, 3]);
	ccat.animations.add('jumpLeftC', [1, 0]);
	ccat.animations.play('jumpRightC', 5, true);
	
	return ccat;
};

function gainCCat(player, cat) {

	// Remove cat (or replace with follower?)
	cat.kill();
	//cat = new follower?

	//Restore Hope and/or Courage
	courage += 10;
	if(courage > COURAGEMAX)
		courage = COURAGEMAX;
	
	couragebar.width = (courage/COURAGEMAX)*permawidth;
};*/
