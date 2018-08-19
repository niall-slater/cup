/* MAP BUILDING GLOBALS */

var MAP_SIZE = 4;
var MAP_NUMBEROFCHUNKTYPES = 2;
var MAP_NUMBEROFCHUNKSUBTYPES = 3;

var buildState = {
	
	preload: function() {
        
		//Assemble a map using 16 random pre-loaded chunks
		/* Build a 2D array of indexes, that's all, and use them to choose which chunk to load on scene change */
		
	},
	
	create: function() {
		
		let map = [];
		
		for (let x = 0; x < MAP_SIZE; x++) {
			let row = [];
			for (let y = 0; y < MAP_SIZE; y++) {
				//Load a test tilemap chunk for now
				let index = Math.floor(Math.random() * MAP_NUMBEROFCHUNKTYPES) + '_' + Math.floor(Math.random() * MAP_NUMBEROFCHUNKSUBTYPES);
				row.push(index);
			}
			map.push(row);
		}
		
		
		console.log(map);
		
		game.state.start('state_play', true, false, map);
	}
	
};