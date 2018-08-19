var loadState = {
	
	preload: function() {
		
		slickUI = game.plugins.add(Phaser.Plugin.SlickUI);
		slickUI.load('res/slickUI/kenney/kenney.json');
		
		//Load all the assets we'll need during the game
		
		var loadingLabel = game.add.text(80, 150, "loading...", {font: "30px Arial", fill: "#fff"});
		
        
		/* SPRITES */
		
		//Scenery tiles
        game.load.spritesheet('tiles_roguelike', 'res/sprites/tiles/roguelike.png');
		
		//Character sprites
		let maxChars = 17; //this is the number of characters in the spritesheet
        game.load.spritesheet('characters_roguelike', 'res/sprites/characters/roguelike.png', 16, 16, maxChars, 0, 1);
        
		//Ingame UI sprites
		game.load.image('ui_speechBubble', 'res/sprites/ui/speechBubble.png');
		
		//Effect sprites
		game.load.image('effect_smoke', 'res/sprites/effects/smoke.png');
		
		/* TILEMAPS */
		
		//Map chunks
		for (let i = 0; i < MAP_NUMBEROFCHUNKTYPES; i++) {
			for (let j = 0; j < MAP_NUMBEROFCHUNKSUBTYPES; j++) {
				//console.log('loading chunk ' + i + '_' + j);
			}
		}
        game.load.tilemap('chunk_test', 'res/maps/chunks/test.json', null, Phaser.Tilemap.TILED_JSON);
		
		
        //UI images
        
		/* AUDIO */
		//game.load.audio('music_airshipSerenity', 'res/audio/Airship Serenity.mp3');
		
		/* DATA */
		
		//Data
		//game.load.json("data_books", "res/data/data_books.json");
        
	},
	
	create: function() {
		
		//Done loading - start the menu
		
		game.state.start('state_menu');
	}
	
};