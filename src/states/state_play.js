'use strict';

let cursors;

var playState = {
	
	world: {},
	cameraScale: 2,
	currentChunkCoords: {x: 1, y: 1},
	currentLayers: [],
    
    /* Sprite Groups */
    groupActors: null,
    groupEffects: null,
	
	init: function(mapIndexes) {
		this.world.mapIndexes = mapIndexes;
	},
	
	preload: function() {
		
	},
	
	create: function() {
		
		game.physics.startSystem(Phaser.Physics.ARCADE);
		game.time.desiredFps = 60;
		
        this.groupActors = game.add.group();
        this.groupEffects = game.add.group();
        
		this.player = new Player(game, 186, 250);
        this.groupActors.add(this.player);
        
		//Create map
		this.createMap();
    	cursors = game.input.keyboard.createCursorKeys();
		
		//Display FPS
		game.time.advancedTiming = true;
	},
	
	update: function() {
        
    	this.handleObjectCollision();
        this.handleWorldCollision();
	},
	
	render: function() {
		game.debug.text(game.time.fps, 5, 15, '#fff');
	},
	
	createMap: function() {
		
		//This x and y is the wrong way round - TODO: fix it! (will require refactor in state_build.js) leaving it here for testing though
		let currentChunkID = this.world.mapIndexes[this.currentChunkCoords.y][this.currentChunkCoords.x];
		this.setUpChunk(currentChunkID);
	
	},
	
	setUpChunk: function(chunkID) {
		
        this.world.currentChunk = game.add.tilemap('chunk_' + chunkID);
		this.world.currentChunk.addTilesetImage('roguelike_general', 'tiles_roguelike');
		
        // Build the tilemap from the cached Tiled JSON file
		this.currentLayers.push(this.world.currentChunk.createLayer('under'));
		this.currentLayers.push(this.world.currentChunk.createLayer('under-overlay'));
		this.currentLayers.push(this.world.currentChunk.createLayer('middle'));
		this.currentLayers.push(this.world.currentChunk.createLayer('over'));
        
        let objects = this.world.currentChunk.objects.objects;
        
        objects.map(this.createFromObject);

		this.currentLayers[0].resizeWorld();
        
        // Set the middle layer to be the collision layer        
		this.world.currentChunk.setCollisionByExclusion([], true, 'middle', false);
		
        
        /* TODO: Critters, creatures and other bits should be generated from JSON data */
        
		this.critter = new Critter(game, 240, 100);
		this.critter.moveTo(this.player.x, this.player.y);
        this.groupActors.add(this.critter);
		
        /* Arrange render layers for tiles and objects */
        
		game.world.bringToTop(this.groupActors);
		this.currentLayers[2].bringToTop();
		this.currentLayers[3].bringToTop();
		game.world.bringToTop(this.groupEffects);
	},
	
	goToChunk: function(chunkX, chunkY, playerX, playerY) {
		
		this.currentChunkCoords = {x: chunkX, y: chunkY};
		
		//If moving from another chunk, destroy the previous chunk
		if (this.currentLayers.length > 0) {
			this.currentLayers.map(function(layer) {
				layer.destroy();
			});
			this.world.currentChunk.destroy();
		}
		this.currentLayers = [];
		
		let newChunkCoords = {x: chunkX, y: chunkY};

		//This x and y is the wrong way round - TODO: fix it! leaving it here for testing though
		let newChunkID = this.world.mapIndexes[newChunkCoords.y][newChunkCoords.x];
		
		this.setUpChunk(newChunkID);
		
		this.player.moveTo(playerX, playerY);
	},
    
    handleObjectCollision: function() {
        
        //game.physics.arcade.collide(x, y);
        
    },
    
    handleWorldCollision: function() {
        
        
        game.physics.arcade.collide(this.player, this.currentLayers[2]);
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
    },
    
    createFromObject: function(item, index) {
        //Create an entity based on data from a Tiled JSON object
        switch(item.type) {
            case 'speaker': {
                playState.groupActors.add(new Speaker(game, item.x, item.y, item.properties.phrase));
            }
        }
    }
	
};
