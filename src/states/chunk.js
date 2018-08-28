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
		game.world.bringToTop(this.groupActors);
		playState.player.bringToTop();
		this.currentLayers[2].bringToTop();
		this.currentLayers[3].bringToTop();
		game.world.bringToTop(this.groupEffects);
        
        //Test stuff
		this.groupItems.add(new Cup(game, 186, 150));
        
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
        this.tilemap = game.add.tilemap('chunk' + this.chunkID);
        this.tilemap.currentChunk.addTilesetImage('roguelike_general', 'tiles_roguelike');
        
		this.currentLayers.push(this.world.currentChunk.createLayer('under'));
		this.currentLayers.push(this.world.currentChunk.createLayer('under-overlay'));
		this.currentLayers.push(this.world.currentChunk.createLayer('middle'));
		this.currentLayers.push(this.world.currentChunk.createLayer('over'));
		this.currentLayers[0].resizeWorld();
    }
    
}