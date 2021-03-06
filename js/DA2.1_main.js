window.onload = function() {
    // You might want to start with a template that uses GameStates:
    //     https://github.com/photonstorm/phaser/tree/master/resources/Project%20Templates/Basic
    
    // You can copy-and-paste the code from any of the examples at http://examples.phaser.io here.
    // You will need to change the fourth parameter to "new Phaser.Game()" from
    // 'phaser-example' to 'game', which is the id of the HTML element where we
    // want the game to go.
    // The assets (and code) can be found at: https://github.com/photonstorm/phaser/tree/master/examples/assets
    // You will need to change the paths you pass to "game.load.image()" or any other
    // loading functions to reflect where you are putting the assets.
    // All loading functions will typically all be found inside "preload()".
    
    "use strict";
    
    var game = new Phaser.Game( 800, 800, Phaser.AUTO, 'game', { preload: preload, create: create, update: update } );
    
    function preload() {
        //game.load.atlasJSONHash( 'dog', 'assets/dog.png', 'assets/dog.json');
		game.load.spritesheet('dog', 'assets/dog.png', 47, 31, 4);
		game.load.tilemap('map', 'assets/grasstile3.json', null, Phaser.Tilemap.TILED_JSON);
		game.load.image('tiles', 'assets/grassblock2_128x96_poor.png');
    }
    
    var playersprite, group, scrollPosition, background, playerSpeed, map, layer;
    
    function create() {
		map = game.add.tilemap('map');//, 32, 32);
		map.addTilesetImage('GrassBlocks', 'tiles', 32, 32);
		layer = map.createLayer('Layer0');
		playerSpeed = 250;
		//layer.resizeWorld();
        // Create a sprite at the center of the screen using the 'dog' image.
        playersprite = game.add.sprite(47, game.world.centerY, 'dog');
		playersprite.anchor.setTo(0.5, 0.5);
		playersprite.scale.x = -2;
		playersprite.scale.y = 2;
		//playersprite = new Follower(this.game, 47, this.game.height/2, this.game.input);
		//this.game.add.existing(playersprite);
		console.log("Player made");
		//game.camera.follo(
		//this.game.input.x = this.game.width/2;
		//this.game.input.y = this.game.height/2;
		//console.log("click simulated");
		//playersprite.animations.add('walk', ['dog/run/0001'], 10, true, false);
		player.animations.add('run', [1, 3, 0], 10, true);
		//player.animations.add('right', [5, 6, 7, 8], 10, true);
		
        // Anchor the sprite at its center, as opposed to its top-left corner.
        // so it will be truly centered.
        //playersprite.anchor.setTo( 0.5, 0.5 );
        
        // Turn on the arcade physics engine for this sprite.
        game.physics.enable(playersprite, Phaser.Physics.ARCADE );
        // Make it bounce off of the world bounds.
        playersprite.body.collideWorldBounds = true;
    }
    
    function update() {
		console.log("Updating");
        //playersprite.rotation = game.physics.arcade.accelerateToPointer( playersprite, this.game.input.activePointer, 500, 500, 500 );
		var self = this;
        //use map.random(x, y, width, height, layer) to randomize obstacle tiles
		
        //map.tilePosition.x = scrollPosition;
        scrollPosition += playerSpeed;
		
		//var distance = playersprite.game.math.distance(playersprite.x, playersprite.y, game.input.x, game.input.y);
		var rotation = playersprite.game.math.angleBetween(playersprite.x, playersprite.y, game.input.x, game.input.y);
        playersprite.body.velocity.y = Math.sin(rotation) * playerSpeed;
		
                
        
    }
	
};
