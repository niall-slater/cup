'use strict';

let cursors;
let cursorsWASD;

var playState = {
	
	world: {},
	currentChunkCoords: {x: 1, y: 1},
	
	/* Play state paused (for menus and stuff) */
	paused: false,
	
	/* Chunk transition effect */
	chunkTransitionPlaying: false,
	chunkTransitionSpeed: 350,
	
	/* Day/Night cycle */
	isNightTime: false,
	
	/* Encounter flags */
	encounterPlaying: false,
	
	init: function(mapIndexes) {
		this.world.mapIndexes = mapIndexes;
	},
	
	preload: function() {
		slickUI.load('res/slickUI/kenney/kenney.json');
		
	},
	
	create: function() {
		
		this.groupUI = game.add.group();
		
		game.physics.startSystem(Phaser.Physics.ARCADE);
		game.time.desiredFps = 60;
        
        //Create player
		this.player = new Player(game, 186, 250);
        
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
		
		ui.inventory.init();
	},
	
	update: function() {
		
		if (this.chunkTransitionPlaying) {
			return;
		}
		
		if (this.encounterPlaying) {
			this.updateEncounter();
			return;
		}
		
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
			
			//Move the player to the right position and bring the UI back on top

			this.player.moveTo(playerX, playerY);
			game.world.bringToTop(ui.inventory.panel.container.displayGroup.parent);
		}, this);
		
	},
    
    handleWorldCollision: function() {
        
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
    },
	
	/* ENCOUNTER CODE */
	
	startEncounter: function() {
		
		//Begin an encounter between the player and foe
		
		//set flags to prevent other encounters triggering in the background
		//stop creature wandering if possible
		//disable rendering of tilemap and effects
		//switch player input to encounter mode
		//set encounter ui to visible
		//set sprites and data to the ones for this new encounter
			//OR INSTEAD
			//save playState information
			//switch to encounter state
			//handle everything there instead
			//but this would need some refactoring of the create code and could cause bugs
		
		//lets try implementing it in playstate for starters
		
		this.encounterPlaying = true;
		playState.player.body.velocity.x = 0;
		playState.player.body.velocity.y = 0;
		
		game.camera.fade(0xffffff, 200, true);
		
		game.time.events.add(ui.encounter.delay, () => {
			this.world.currentChunk.disable();
			ui.encounter.init();
		}, this);
		
	},
	
	updateEncounter: function() {
	},
	
	endEncounter: function() {
	
		game.camera.flash(0x000000, ui.encounter.delay*1.5, false);
			
		ui.encounter.sprite_monster.forEach((element)=>{
			element.destroy();
		});
		ui.encounter.sprite_background.destroy();
		ui.encounter.menu.destroy();
		
		game.camera.follow(playState.player, .2, .2);
		//game.camera.x = playState.player.x;
		//game.camera.y = playState.player.y;
		
		game.world.currentChunk.enable();
		playState.encounterPlaying = false;
		
		game.time.events.add(1500, () => {playState.player.encountersEnabled = true;}, this);
		
	}
	
};
