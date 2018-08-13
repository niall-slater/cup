var cursors;


var playState = {
	
	world: {},
	cameraScale: 2,
	
	init: function(builtMap) {
		this.world.map = builtMap;
	},
	
	preload: function() {
        
	},
	
	create: function() {
		
		game.physics.startSystem(Phaser.Physics.ARCADE);
    	cursors = game.input.keyboard.createCursorKeys();
		
		//Create map
		var map = this.world.map[0][0];
		
		map.addTilesetImage('roguelike_general', 'tiles_roguelike');
		
		layer0 = map.createLayer('passable');
		layer0.resizeWorld();
		layer1 = map.createLayer('impassable');
		layer1.resizeWorld();
		layer2 = map.createLayer('decoration');
		layer2.resizeWorld();
		layer3 = map.createLayer('overlay');
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