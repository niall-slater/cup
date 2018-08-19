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
    	cursors = game.input.keyboard.createCursorKeys();
		
		//Create map
		
		let currentChunkCoords = {x:0, y:0};
		let currentChunkIndex = this.world.mapIndexes[currentChunkCoords.x][currentChunkCoords.y];
		
		console.log('Spawning in ' + currentChunkCoords + ' which is a chunk of variant ' + currentChunkIndex);
		
        this.world.currentChunk = game.add.tilemap('chunk_test'); //TODO: load correct chunk file
		
		this.world.currentChunk.addTilesetImage('roguelike_general', 'tiles_roguelike');
		
		let map = this.world.currentChunk;
		
		let layer0 = map.createLayer('under');
		layer0.resizeWorld();
		let layer1 = map.createLayer('under-overlay');
		layer1.resizeWorld();
		let layer2 = map.createLayer('middle');
		layer2.resizeWorld();
		let layer3 = map.createLayer('over');
		layer3.resizeWorld();
		
		//Display FPS
		game.time.advancedTiming = true;
	},
	
	update: function() {
		

		if (cursors.left.isDown)
		{
			game.camera.x-=5;
		}
		else if (cursors.right.isDown)
		{
			game.camera.x+=5;
		}

		if (cursors.up.isDown)
		{
			game.camera.y-=5;
		}
		else if (cursors.down.isDown)
		{
			game.camera.y+=5;
		}

	},
	
	render: function() {
		game.camera.scale.x = this.cameraScale;
		game.camera.scale.y = this.cameraScale;
		game.debug.text(game.time.fps, 750, 550, '#fff');
	}
	
};