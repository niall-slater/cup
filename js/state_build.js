var buildState = {
	
	preload: function() {
        
		//Assemble a map using 16 random pre-loaded chunks
		//This is where you load the chunks, maybe? Then assemble them in Create
		
	},
	
	create: function() {
		
		playState.world.map = [];
		
		let mapSize = 4;
		
		for (let x = 0; x < mapSize; x++) {
			let row = [];
			for (let y = 0; y < mapSize; y++) {
				//Load a test tilemap chunk for now
				let chunk = game.load.tilemap('chunk_test');
				row.push(chunk);
			}
			playState.world.map.push(row);
		}
		
		console.log('Map built of size ' + mapSize);
		
		console.log(playState.world.map);
		
		game.state.start('state_play');
	}
	
};