/* MAP BUILDING GLOBALS */

var MAP_SIZE = 4;
var MAP_NUMBEROFCHUNKTYPES = 16;
var MAP_NUMBEROFCHUNKSUBTYPES = 2;

var buildState = {
	
	create: function() {
		
		//Assemble a map using 16 random pre-loaded chunks
		/* Build a 2D array of indexes and use them to choose which chunk to load on scene change */
		
		let map = [
			['4_0',		'1_0',	'3_0',	'2_0'],
			['14_0',	'0_0',	'6_0',	'5_0'],
			['15_0',	'8_0',	'10_0',	'11_0'],
			['9_0',		'7_0',	'12_0',	'13_0']
		];
		
		
		for (let x = 0; x < MAP_SIZE; x++) {
			let column = [];
			for (let y = 0; y < MAP_SIZE; y++) {
				let index = Math.floor(Math.floor(Math.random() * MAP_NUMBEROFCHUNKSUBTYPES));
				let string = map[x][y];
				string = string.replace('_0', '_' + index);
				map[x][y] = string;
			}
		}
		
		game.state.start('state_play', true, false, map);
	}
	
};