'use strict';

let cursors;

var playState = {
	
	world: {},
	currentChunkCoords: {x: 1, y: 1},
	
	/* Chunk transition effect */
	chunkTransitionPlaying: false,
	chunkTransitionSpeed: 350,
	
	init: function(mapIndexes) {
		this.world.mapIndexes = mapIndexes;
	},
	
	preload: function() {
		
	},
	
	create: function() {
		
		game.physics.startSystem(Phaser.Physics.ARCADE);
		game.time.desiredFps = 60;
        
        //Create player
		this.player = new Player(game, 186, 250);
    	cursors = game.input.keyboard.createCursorKeys();
        
		//Create map
        this.world.chunkMap = [
            [0,0,0,0],
            [0,0,0,0],
            [0,0,0,0],
            [0,0,0,0]
        ];
		this.createMap();
		
		//Display FPS
		game.time.advancedTiming = true;
		
		//Configure camera
//		game.world.setBounds(0, 0, 512, 512);
		game.camera.setSize(256, 256);
		game.camera.follow(this.player, .2, .2);
		game.camera.x = this.player.x;
		game.camera.y = this.player.y;
    	game.camera.deadzone = new Phaser.Rectangle(96, 96, 64, 64);
	},
	
	update: function() {
        this.world.currentChunk.update();
        this.handleWorldCollision();
	},
	
	render: function() {
		game.debug.text(game.time.fps, 5, 15, '#fff');
    	//game.debug.cameraInfo(game.camera, 5, 32);
	},
	
	createMap: function() {
		
		//This x and y is the wrong way round
        //TODO: fix it! (will require refactor in state_build.js)
        //leaving it here for testing though
		let currentChunkID = this.world.mapIndexes
			[this.currentChunkCoords.y][this.currentChunkCoords.x];
        
        this.world.currentChunk = new Chunk(game, currentChunkID);
        
        this.world.chunkMap[this.currentChunkCoords.y][this.currentChunkCoords.x] 
            = this.world.currentChunk;
	},
	
	goToChunk: function(chunkX, chunkY, playerX, playerY) {
		
        //TODO: bug: on chunk change all actors are moved to within camera view
        
		this.currentChunkCoords = {x: chunkX, y: chunkY};
		
		//Start fading the screen
		game.camera.fade('#000', this.chunkTransitionSpeed, true);
		playState.chunkTransitionPlaying = true;
		
		//Set a timer so we swap the chunks while the screen is dark
		game.time.events.add(this.chunkTransitionSpeed, function() {
			game.camera.flash('#000', playState.chunkTransitionSpeed, true);
			
			//Set flag once process is complete
			game.time.events.add(playState.chunkTransitionSpeed, function() {
				playState.chunkTransitionPlaying = false;
			}, this);
			
			//START THE CHUNK SWITCH
			this.world.currentChunk.disable();
            
			let newChunkCoords = {x: chunkX, y: chunkY};
            
            //Check if the slot we're going to in the chunkMap has a chunk in it already
            if (this.world.chunkMap[newChunkCoords.y][newChunkCoords.x] != 0) {
                let foundChunk = this.world.chunkMap[newChunkCoords.y][newChunkCoords.x];
                foundChunk.enable();
                this.world.currentChunk = foundChunk;
            } else {
                let newChunkID = this.world.mapIndexes[newChunkCoords.y][newChunkCoords.x];
                this.world.currentChunk = new Chunk(game, newChunkID);
                this.world.chunkMap[newChunkCoords.y][newChunkCoords.x] = this.world.currentChunk;
            }

			this.player.moveTo(playerX, playerY);
            
		}, this);
		
	},
    
    handleWorldCollision: function() {
		
		if (this.chunkTransitionPlaying) {
			return;
		}
        
        game.physics.arcade.collide(this.player, this.world.currentChunk.currentLayers[2]);
        game.physics.arcade.collide(this.world.currentChunk.groupActors, this.world.currentChunk.currentLayers[2]);
		
		//If player is at the edge of the screen, move to the adjacent chunk
        
		if (this.player.x < 16) {
			if (this.currentChunkCoords.x > 0)
				this.goToChunk(this.currentChunkCoords.x - 1, this.currentChunkCoords.y, 490, this.player.y);
		} else if (this.player.x > 512 - 16) {
			if (this.currentChunkCoords.x < 3)
				this.goToChunk(this.currentChunkCoords.x + 1, this.currentChunkCoords.y, 18, this.player.y);
		} else if (this.player.y < 16) {
				if (this.currentChunkCoords.y > 0)
			this.goToChunk(this.currentChunkCoords.x, this.currentChunkCoords.y - 1, this.player.x, 490);
		} else if (this.player.y > 512 - 16) {
			if (this.currentChunkCoords.y < 3)
				this.goToChunk(this.currentChunkCoords.x, this.currentChunkCoords.y + 1, this.player.x, 18);
		}
    }
	
};
