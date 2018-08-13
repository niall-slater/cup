var buildState = {
	
	preload: function() {
        
		//Assemble a map using 16 random pre-loaded chunks
		//This is where you load the chunks, maybe? Then assemble them in Create
		
	},
	
	create: function() {
		
		let map = [];
		
		let mapSize = 4;
		
		for (let x = 0; x < mapSize; x++) {
			let row = [];
			for (let y = 0; y < mapSize; y++) {
				//Load a test tilemap chunk for now
				let chunk = game.add.tilemap('chunk_test');
				row.push(chunk);
			}
			map.push(row);
		}
		
		console.log('Map built of size ' + mapSize);
		
		console.log(map);
		
		game.state.start('state_play', true, false, map);
	}
	
};