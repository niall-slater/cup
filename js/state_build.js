/* MAP BUILDING GLOBALS */

var MAP_SIZE = 4;
var MAP_NUMBEROFCHUNKTYPES = 16;
var MAP_NUMBEROFCHUNKSUBTYPES = 1;

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
				row.push('0_0');
			}
			map.push(row);
		}
		
		//This x and y is the wrong way round - TODO: fix it! leaving it here for testing though
		map = [
			['4_0',		'1_0',	'3_0',	'2_0'],
			['14_0',	'0_0',	'6_0',	'5_0'],
			['15_0',	'8_0',	'10_0',	'11_0'],
			['9_0',		'7_0',	'12_0',	'13_0']
		];
		
		console.log(map);
		
		game.state.start('state_play', true, false, map);
	}
	
};