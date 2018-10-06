//Store the different submenus we can display as objects
let menuMain = {};
let menuStart = {};

var menuState = {
	
	preload: function() {
		
		slickUI = game.plugins.add(Phaser.Plugin.SlickUI);
		slickUI.load('res/slickUI/kenney/kenney.json');
		
	},
	
	create: function() {
		
		let panel;
		
		//set up main menu panel
		slickUI.add(menuMain.panel = new SlickUI.Element.Panel(0, 0, gameWidth, gameHeight));
		
		//Title
		menuMain.panel.add(menuMain.panel.title = new SlickUI.Element.Text(0, 0, 'CUP QUEST')).centerHorizontally();
		
		//New game button
		menuMain.panel.add(menuMain.panel.buttonNewGame = new SlickUI.Element.Button(gameWidth/2-uiSize.buttonWidth/2, 100, uiSize.buttonWidth, uiSize.buttonHeight));
		menuMain.panel.buttonNewGame.add(new SlickUI.Element.Text(0,0, 'New Game', 10, style_default)).centerHorizontally();
		menuMain.panel.buttonNewGame.events.onInputUp.add(this.buildMap);
		
		
	},
	
	update: function() {
		
	},
	
	buildMap: function() {
		game.state.start('state_build');
	}
};