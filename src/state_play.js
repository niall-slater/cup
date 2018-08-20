'use strict';

let cursors;

var playState = {
	
	world: {},
	cameraScale: 2,
	
	init: function(mapIndexes) {
		this.world.mapIndexes = mapIndexes;
	},
	
	preload: function() {
		
	},
	
	create: function() {
		
		game.physics.startSystem(Phaser.Physics.ARCADE);
		game.time.desiredFps = 30;
		
		//Create map
		this.createMap();
		
		this.player = new Player(game, 32, 32);
    	cursors = game.input.keyboard.createCursorKeys();
		
		//Display FPS
		game.time.advancedTiming = true;
	},
	
	update: function() {
		
    	game.physics.arcade.collide(this.player, this.map.layer2);

	},
	
	render: function() {
		game.debug.text(game.time.fps, 5, 15, '#fff');
	},
	
	createMap: function() {
	
		let currentChunkCoords = {x:0, y:2};
		
		//This x and y is the wrong way round - TODO: fix it! leaving it here for testing though
		let currentChunkID = this.world.mapIndexes[currentChunkCoords.y][currentChunkCoords.x];
		
		console.log('Spawning in ' + currentChunkCoords.x + ',' + currentChunkCoords.y + ' which is a chunk of variant ' + currentChunkID);
		
        this.world.currentChunk = game.add.tilemap('chunk_' + currentChunkID);
		
		this.world.currentChunk.addTilesetImage('roguelike_general', 'tiles_roguelike');
		
		this.map = this.world.currentChunk;
		
		//not yet used
		this.characters = game.add.group();
		
		this.map.layer0 = this.map.createLayer('under');
		this.map.layer1 = this.map.createLayer('under-overlay');
		this.map.layer2 = this.map.createLayer('middle');
		this.map.layer3 = this.map.createLayer('over');

		this.map.layer0.resizeWorld();
		//layer2.debug = true;
		
		this.map.setCollisionByExclusion([], true, 'middle', false);
		//map.setCollisionBetween(0, 999, true, 'middle', false);
	
	},
	
	goToChunk: function(chunkX, chunkY, playerX, playerY) {
		
		let newChunkCoords = {x: chunkX, y: chunkY};
		let newChunkID = this.world.mapIndexes[newChunkCoords.x][newChunkCoords.y];
		
		console.log('Spawning in ' + newChunkCoords.x + ',' + newChunkCoords.y + ' which is a chunk of variant ' + newChunkID);
		
        this.world.currentChunk = game.add.tilemap('chunk_' + currentChunkID);
		
		this.world.currentChunk.addTilesetImage('roguelike_general', 'tiles_roguelike');
		
		let currentMap = this.world.currentChunk;
		
		let layer0 = currentMap.createLayer('under');
		let layer1 = currentMap.createLayer('under-overlay');
		let layer2 = currentMap.createLayer('middle');
		let layer3 = currentMap.createLayer('over');
		
		layer0.resizeWorld();
		
		currentMap.setCollisionBetween(1, 100, true, 'middle');
	}
	
};
