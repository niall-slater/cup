var gameWidth = 800;
var gameHeight = 600;

var game = new Phaser.Game(gameWidth, gameHeight, 'game', false, false);
var slickUI;

game.antialias = false;

game.state.add('state_load', loadState);
game.state.add('state_menu', menuState);
game.state.add('state_build', buildState);
game.state.add('state_play', playState);
game.state.add('state_end', endState);

game.state.start('state_load');