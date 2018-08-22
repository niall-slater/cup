var gameWidth = 512;
var gameHeight = 512;

var game = new Phaser.Game(gameWidth, gameHeight, 'game', false, false);
var slickUI;


WebFontConfig = {

    google: {
      families: ['VT323']
    }

};

game.antialias = false;

game.state.add('state_load', loadState);
game.state.add('state_menu', menuState);
game.state.add('state_build', buildState);
game.state.add('state_play', playState);
game.state.add('state_end', endState);

game.state.start('state_load');