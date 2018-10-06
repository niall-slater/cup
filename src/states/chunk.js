class Chunk {
    
    constructor(game, chunkID) {
		
        this.chunkID = chunkID;
        //Bind class methods
        this.createFromObject = this.createFromObject.bind(this);
        
        //Set up sprite groups
        this.groupActors = game.add.group();
        this.groupItems = game.add.group();
        this.groupEffects = game.add.group();
        
        //Set up tilemap
        this.currentLayers = [];
        this.tilemap = game.add.tilemap('chunk_' + chunkID);
        this.tilemap.addTilesetImage('roguelike_general', 'tiles_roguelike');
        
		this.currentLayers.push(this.tilemap.createLayer('under'));
		this.currentLayers.push(this.tilemap.createLayer('under-overlay'));
		this.currentLayers.push(this.tilemap.createLayer('middle'));
		this.currentLayers.push(this.tilemap.createLayer('over'));
		this.currentLayers[0].resizeWorld();
		
        // Set the middle layer to be the collision layer        
		this.tilemap.setCollisionByExclusion([], true, 'middle', false);
        
        //Create objects from the tilemap's 'objects' layer
        let objects = this.tilemap.objects.objects;
        objects.map(this.createFromObject);
        
        //Arrange render order for tiles and objects     
		game.world.bringToTop(this.groupItems);   
		this.currentLayers[2].bringToTop();
		game.world.bringToTop(this.groupActors);
		playState.player.bringToTop();
		this.currentLayers[3].bringToTop();
		game.world.bringToTop(this.groupEffects);
		
		//Bring UI to top
		game.world.bringToTop(playState.groupUI);
		
		//Add night-time overlay
		this.night = this.groupEffects.create(0, 0, 'effect_night');
		this.night.fixedToCamera = true;
		this.night.alpha = 0.5;
		this.night.visible = playState.isNightTime;
    }
    
    update() {
        //Handle player collision
        game.physics.arcade.collide(playState.player, this.groupActors);
    }
    
    createFromObject(item, index) {
        //Create an entity based on data from a Tiled JSON object
        
        switch(item.type) {
            case 'speaker': {
				let spriteIndex = Math.floor(Math.random() * 16);
				//TODO: pull spriteindex from the JSON data
                this.groupActors.add(new Speaker(
                    game, item.x, item.y,
                    item.properties.phrase, spriteIndex));
                break;
            }
            case 'critter': {
                this.groupActors.add(new Critter(
                    game, item.x, item.y));
                break;
            }
            case 'monster': {
                this.groupActors.add(new Monster(
                    game, item.x, item.y));
                break;
            }
            case 'cup': {
                this.groupItems.add(new Cup(
                    game, item.x, item.y));
                break;
            }
            case 'roast': {
                this.groupItems.add(new Roast(
                    game, item.x, item.y));
                break;
            }
		}
    }
    
    disable() {
        this.groupActors.visible = false; this.groupActors.exists = false;
        this.groupItems.visible = false; this.groupItems.exists = false;
        this.groupEffects.visible = false; this.groupEffects.exists = false;
        
        //Destroy layers
        this.currentLayers.map(function(layer) {
            layer.destroy();
        });
        
        this.tilemap.destroy();
    }
    
    enable() {
        this.groupActors.visible = true; this.groupActors.exists = true;
        this.groupItems.visible = true; this.groupItems.exists = true;
        this.groupEffects.visible = true; this.groupEffects.exists = true;
        
        //Set up tilemap
        this.currentLayers = [];
        this.tilemap = game.add.tilemap('chunk_' + this.chunkID);
        this.tilemap.addTilesetImage('roguelike_general', 'tiles_roguelike');
        
		this.currentLayers.push(this.tilemap.createLayer('under'));
		this.currentLayers.push(this.tilemap.createLayer('under-overlay'));
		this.currentLayers.push(this.tilemap.createLayer('middle'));
		this.currentLayers.push(this.tilemap.createLayer('over'));
		this.currentLayers[0].resizeWorld();
        
        // Set the middle layer to be the collision layer        
		this.tilemap.setCollisionByExclusion([], true, 'middle', false);
        
        //Arrange render order for tiles and objects     
		game.world.bringToTop(this.groupItems);   
		this.currentLayers[2].bringToTop();
		game.world.bringToTop(this.groupActors);
		playState.player.bringToTop();
		this.currentLayers[3].bringToTop();
		game.world.bringToTop(this.groupEffects);
		
		game.world.bringToTop(ui.inventory.panel.container.displayGroup.parent);
		
		//Turn on night effects if it's night-time
		this.night.visible = playState.isNightTime;
    }
    
    getTileAtPixel(x, y, layer) {
        
        let result = this.tilemap.getTile(Math.floor(x/16), Math.floor(y/16), layer);
        
        return result;
        
    }
    
}