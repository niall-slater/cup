//UI values
let uiSize = {
	buttonWidth: 128,
	buttonHeight: 32,
	margin: 4,
	panelX: 4,
	panelY: 72,
	panelWidth: 480-8,
	panelHeight: 270-78
};

let style_default = { font: "24px VT323", fill: "#000", wordWrap: "true", wordWrapWidth: 330};
let style_small = { font: "19px VT323", fill: "#333", wordWrap: "true", wordWrapWidth: 330};


var ui = {
	
	inventory: {
		
		items: [],
		displaying: false,
		
		margin: 12,
		padding: 12,
		listStartY: 0,
		entryHeight: 18,
		
		init: function() {
		
			//Create inventory panel
			slickUI.add(ui.inventory.panel = new SlickUI.Element.Panel(this.margin, this.margin, gameWidth - this.margin*2, gameHeight - this.margin*2));

			//Title
			ui.inventory.panel.add(ui.inventory.panel.title = new SlickUI.Element.Text(0, 0, 'INVENTORY', null, style_default)).centerHorizontally();
			
			ui.inventory.panel.alpha = .95;
			ui.inventory.panel.x = this.margin + 256;
		},
		
		//Toggle inventory display
		toggle: function() {
			if (this.displaying) {
				this.hideInventory();
				this.displaying = false;
				
			} else {
				this.showInventory();
				this.displaying = true;
			}
		},
		
		showInventory: function() {
            game.add.tween(ui.inventory.panel).to( {x: ui.inventory.margin}, 500, Phaser.Easing.Exponential.Out, true);

			//Bring UI to top
			game.world.bringToTop(playState.groupUI);
		},
		
		hideInventory: function() {
			
            game.add.tween(ui.inventory.panel).to( {x: 256 + ui.inventory.margin}, 500, Phaser.Easing.Exponential.Out, true);
			
		},
		
		addItem: function(item) {
			
			this.items.push(item);
			
			let numItems = this.items.length;
			
			let entry;
			let icon;
			
			
			ui.inventory.panel.add(icon = new SlickUI.Element.DisplayObject(
				this.padding, Math.floor(this.listStartY + this.padding * 2 + (numItems * this.entryHeight - 2)),
										 item));
			
			ui.inventory.panel.add(entry = new SlickUI.Element.Text(
				Math.floor(this.padding * 2), Math.floor(this.listStartY + numItems * this.entryHeight + this.padding),
																		item.name,
																		null,
																		style_small));
			
		}
	},
	
	encounter: {
		
		margin: 4,
		padding: 2,
		
		menuHeight: 64,
		buttonWidth: 76,
		
		position_monster: {x: 144, y: 32},
		
		delay: 600,
		tweenDistance: 128,
		
		sprite_background: null,
		
		sprite_monster: null,
		
		init: function() {
			
			game.camera.x = 0;
			game.camera.y = 0;
			game.camera.unfollow();
			
			//Create sprites
			this.sprite_background = game.add.sprite(0, 0, 'enc_background');
			this.sprite_player = game.add.sprite(16, gameHeight - 116, 'enc_player');
			this.sprite_monster = game.add.sprite(this.position_monster.x + this.tweenDistance, this.position_monster.y, 'enc_monster_0');

			//Create menu
			slickUI.add(this.menu = new SlickUI.Element.Panel(
				this.margin, gameHeight - this.menuHeight - this.margin,
				gameWidth - this.margin*2, this.menuHeight));
			this.menu.add(this.menu.title = new SlickUI.Element.Text(this.padding, 0, 'BATTLE', 14, style_small));
			this.menu.add(this.menu.buttonGive = new SlickUI.Element.Button(this.padding, this.padding + 20, this.buttonWidth, this.menuHeight/2));
			this.menu.buttonGive.add(this.menu.buttonGive.label = new SlickUI.Element.Text(this.padding, 0, 'GIVE', 10, style_small)).centerHorizontally();
			
			this.menu.add(this.menu.buttonEat = new SlickUI.Element.Button(this.padding * 2 + this.buttonWidth, this.padding + 20, this.buttonWidth, this.menuHeight/2));
			this.menu.buttonEat.add(this.menu.buttonEat.label = new SlickUI.Element.Text(this.padding, 0, 'EAT', 10, style_small)).centerHorizontally();
			
			this.menu.add(this.menu.buttonRun = new SlickUI.Element.Button(this.padding * 3 + this.buttonWidth * 2, this.padding + 20, this.buttonWidth, this.menuHeight/2));
			this.menu.buttonRun.add(this.menu.buttonRun.label = new SlickUI.Element.Text(this.padding, 0, 'RUN', 10, style_small)).centerHorizontally();
			
			this.menu.y += this.tweenDistance;
			
			game.camera.flash(0xffffff, this.delay/2, false);
			
			game.time.events.add(this.delay, this.tweenInUI, this);
			
            
			
		},
		
		tweenInUI: function() {
			//Tween in the monster
			game.add.tween(this.sprite_monster).to( {x: this.position_monster.x}, 500, Phaser.Easing.Cubic.Out, true);
			
			//Tween in the menu after a delay
			game.time.events.add(this.delay, () => {
				game.add.tween(this.menu).to( {y: gameHeight - this.menuHeight - this.margin}, 500, Phaser.Easing.Cubic.Out, true)
			}, this);
			
			
			
		}
		
	}
};