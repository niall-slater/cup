var loadState = {
	
	preload: function() {

		game.scale.pageAlignHorizontally = true;
		game.scale.pageAlignVertically = true;
		game.scale.refresh();
		
        game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
        
		slickUI = game.plugins.add(Phaser.Plugin.SlickUI);
		slickUI.load('res/slickUI/kenney/kenney.json');
		
		//Load all the assets we'll need during the game
		
		var loadingLabel = game.add.text(80, 150, "loading...", {font: "30px Arial", fill: "#fff"});
		
        
		/* SPRITES */
		
		//Scenery tiles
        game.load.spritesheet('tiles_roguelike', 'res/sprites/tiles/roguelike.png',
							  16, 16, -1, 0, 1);
		
		//Character sprites
		let maxChars = 17; //this is the number of characters in the spritesheet
        game.load.spritesheet('characters_roguelike', 'res/sprites/characters/roguelike.png', 16, 16, maxChars, 0, 1);
		game.load.image('characters_test', 'res/sprites/characters/test.png');
		
		//Item sprites
		
        
		//Ingame UI sprites
		game.load.image('ui_speechBubble', 'res/sprites/ui/speechBubble.png');
		game.load.image('ui_speechBubble_topleft', 'res/sprites/ui/speechBubble9/topleft.png');
		game.load.image('ui_speechBubble_top', 'res/sprites/ui/speechBubble9/top.png');
		game.load.image('ui_speechBubble_topright', 'res/sprites/ui/speechBubble9/topright.png');
		game.load.image('ui_speechBubble_left', 'res/sprites/ui/speechBubble9/left.png');
		game.load.image('ui_speechBubble_center', 'res/sprites/ui/speechBubble9/center.png');
		game.load.image('ui_speechBubble_right', 'res/sprites/ui/speechBubble9/right.png');
		game.load.image('ui_speechBubble_bottomleft', 'res/sprites/ui/speechBubble9/bottomleft.png');
		game.load.image('ui_speechBubble_bottom', 'res/sprites/ui/speechBubble9/bottom.png');
		game.load.image('ui_speechBubble_bottomright', 'res/sprites/ui/speechBubble9/bottomright.png');
		game.load.image('ui_speechBubble_tail', 'res/sprites/ui/speechBubble9/tail.png');
        
		
		//Effect sprites
		game.load.image('effect_smoke', 'res/sprites/effects/smoke.png');
		
		/* TILEMAPS */
		
		//Map chunks
		for (let i = 0; i < MAP_NUMBEROFCHUNKTYPES; i++) {
			for (let j = 0; j < MAP_NUMBEROFCHUNKSUBTYPES; j++) {
				//console.log('loading chunk ' + i + '_' + j);
				try {
        			game.load.tilemap('chunk_' + i + '_' + j, 'res/maps/chunks/chunk_' + i + '_' + j + '.json', null, Phaser.Tilemap.TILED_JSON);
				} catch (e) {
					console.log(e);
					console.log("Couldn't find chunk " + i + '_' + j);
					continue;
				}
			}
		}
		
		
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