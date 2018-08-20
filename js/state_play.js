'use strict';

let cursors;

var playState = {
	
	world: {},
	cameraScale: 1,
	
	init: function(mapIndexes) {
		this.world.mapIndexes = mapIndexes;
	},
	
	preload: function() {
	},
	
	create: function() {
		
		game.physics.startSystem(Phaser.Physics.ARCADE);
		game.time.desiredFps = 30;
		
		//Create map
		
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

		this.player = game.add.sprite(12, 12, 'characters_test');
		game.physics.enable(this.player);
		this.player.body.linearDamping = 1;
		this.player.anchor.set(0.5);
		this.player.body.setSize(14, 14, 0, 0);
		this.player.walkSpeed = 100;
    	this.player.body.drag = 50;
    	this.player.body.collideWorldBounds = true;
		game.camera.follow(this.player);
    	cursors = game.input.keyboard.createCursorKeys();
		
		//Display FPS
		game.time.advancedTiming = true;
	},
	
	update: function() {
		
    	game.physics.arcade.collide(this.player, this.map.layer2);
		
    	this.player.body.velocity.x = 0;
    	this.player.body.velocity.y = 0;
		
		if (cursors.left.isDown)
		{
			this.player.body.velocity.x = -this.player.walkSpeed;
		}
		else if (cursors.right.isDown)
		{
			this.player.body.velocity.x = this.player.walkSpeed;
		}

		if (cursors.up.isDown)
		{
			this.player.body.velocity.y = -this.player.walkSpeed;
		}
		else if (cursors.down.isDown)
		{
			this.player.body.velocity.y = this.player.walkSpeed;
		}

	},
	
	render: function() {
		game.camera.scale.x = this.cameraScale;
		game.camera.scale.y = this.cameraScale;
		game.debug.text(game.time.fps, 5, 15, '#fff');
	},
	
	goToChunk: function(chunkX, chunkY, playerX, playerY) {
		
		let newChunkCoords = {x: chunkX, y: chunkY};
		let newChunkID = this.world.mapIndexes[newChunkCoords.x][newChunkCoords.y];
		
		console.log('Spawning in ' + newChunkCoords.x + ',' + newChunkCoords.y + ' which is a chunk of variant ' + newChunkID);
		
        this.world.currentChunk = game.add.tilemap('chunk_' + currentChunkID);
		
		this.world.currentChunk.addTilesetImage('roguelike_general', 'tiles_roguelike');
		
		let map = this.world.currentChunk;
		
		let layer0 = map.createLayer('under');
		let layer1 = map.createLayer('under-overlay');
		let layer2 = map.createLayer('middle');
		let layer3 = map.createLayer('over');
		
		layer0.resizeWorld();
		
		map.setCollisionBetween(1, 100, true, 'middle');
	}
	
};