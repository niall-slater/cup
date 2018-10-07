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
			
			ui.inventory.panel.icons = [];
			ui.inventory.panel.entries = [];
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
			
			this.addEntryToList(item);
			
		},
		
		addEntryToList: function(item) {
			let numItems = this.items.length;
			
			let icon;
			let entry;
			
			ui.inventory.panel.add(icon = new SlickUI.Element.DisplayObject(this.padding, Math.floor(this.listStartY + this.padding * 2 + (numItems * this.entryHeight - 2)), item));
			
			ui.inventory.panel.add(entry = new SlickUI.Element.Text(Math.floor(this.padding * 2), Math.floor(this.listStartY + numItems * this.entryHeight + this.padding), item.name, null, style_small));
			
			ui.inventory.panel.icons.push(icon);
			ui.inventory.panel.entries.push(entry);
		},
		
		rebuildPanel: function() {
			for (let i = 0; i < ui.inventory.panel.icons.length; i++) {
				ui.inventory.panel.remove(ui.inventory.panel.icons[i]);
			}
			ui.inventory.panel.icons = [];
			
			for (let i = 0; i < ui.inventory.panel.entries.length; i++) {
				ui.inventory.panel.remove(ui.inventory.panel.entries[i]);
			}
			ui.inventory.panel.entries = [];

			for (let i = 0; i < this.items.length; i++) {
				ui.inventory.addEntryToList(ui.inventory.items[i]);
			}
			
		},
		
		removeItem: function(item) {
			
			this.items.splice(this.items.indexOf(item), 1);
			
			ui.inventory.rebuildPanel();
			
		}
	},
	
	encounter: {
		
		margin: 4,
		padding: 2,
		
		menuHeight: 64,
		buttonWidth: 76,
		
		position_monster: {x: 144, y: 64},
		
		delay: 600,
		tweenDistance: 128,
		
		sprite_background: null,
		
		sprite_monster: null,
		
		cursor: null,
		
		init: function() {
			
			game.camera.x = 0;
			game.camera.y = 0;
			game.camera.unfollow();
			
			let numSprites = 5;
			let legsSelection, bodySelection, headSelection;
			legsSelection = Math.floor(Math.random() * numSprites);
			bodySelection = Math.floor(Math.random() * numSprites);
			headSelection = Math.floor(Math.random() * numSprites);
			
			//Create sprites
			this.sprite_background = game.add.sprite(0, 0, 'enc_background');
			this.sprite_player = game.add.sprite(16, gameHeight - 116, 'enc_player');
			this.sprite_monster = [];
			this.sprite_monster.push(game.add.sprite(this.position_monster.x + this.tweenDistance, this.position_monster.y, 'enc_monster_bodies', bodySelection));
			this.sprite_monster.push(game.add.sprite(this.position_monster.x + this.tweenDistance, this.position_monster.y, 'enc_monster_heads', headSelection));

			/* CREATE MENU */
			//base panel
			slickUI.add(this.menu = new SlickUI.Element.Panel(
				this.margin, gameHeight - this.menuHeight - this.margin,
				gameWidth - this.margin*2, this.menuHeight));
			this.menu.add(this.menu.title = new SlickUI.Element.Text(this.padding, 0, 'BATTLE', 14, style_small));
			
			//Give button
			this.menu.add(this.menu.buttonGive = new SlickUI.Element.Button(this.padding, this.padding + 20, this.buttonWidth, this.menuHeight/2));
			this.menu.buttonGive.add(this.menu.buttonGive.label = new SlickUI.Element.Text(this.padding, 0, 'FOOD', 10, style_small)).centerHorizontally();
			this.menu.buttonGive.events.onInputUp.add(this.openFood);
			
			/*
			//Eat button
			this.menu.add(this.menu.buttonEat = new SlickUI.Element.Button(this.padding * 2 + this.buttonWidth, this.padding + 20, this.buttonWidth, this.menuHeight/2));
			this.menu.buttonEat.add(this.menu.buttonEat.label = new SlickUI.Element.Text(this.padding, 0, 'EAT', 10, style_small)).centerHorizontally();
			this.menu.buttonRun.events.onInputUp.add(this.openGive);
			*/
			
			//Run button
			this.menu.add(this.menu.buttonRun = new SlickUI.Element.Button(this.padding * 3 + this.buttonWidth * 2, this.padding + 20, this.buttonWidth, this.menuHeight/2));
			this.menu.buttonRun.add(this.menu.buttonRun.label = new SlickUI.Element.Text(this.padding, 0, 'RUN', 10, style_small)).centerHorizontally();
			this.menu.buttonRun.events.onInputUp.add(this.endEncounter);
			
			//Put menu out of view so it can slide in
			this.menu.y += this.tweenDistance;
			game.camera.flash(0xffffff, this.delay/2, false);
			game.time.events.add(this.delay, this.tweenInUI, this);
			
			/* CREATE FOOD MENU */
			
			slickUI.add(this.menuFood = new SlickUI.Element.Panel(
				this.margin, this.margin,
				gameWidth*.75, gameHeight - this.margin*2));
			this.menuFood.add(this.menuFood.title = new SlickUI.Element.Text(this.margin, 0, 'FOOD', 14, style_small));
			this.menuFood.x = -gameWidth*.75;
			
			this.menuFood.add(this.menuFood.buttonClose = new SlickUI.Element.Button(this.menuFood.width - this.margin - 24, this.margin, 24, 24));
			this.menuFood.buttonClose.add(this.menuFood.buttonClose.label = new SlickUI.Element.Text(0, -4, 'x', 8, style_small)).centerHorizontally();
			this.menuFood.buttonClose.events.onInputUp.add(this.closeFood);
			
			this.menuFood.entries = [];
			for (let i = 0; i < ui.inventory.items.length; i++) {
				let itemButton;
				let itemHeight = 32;
				let itemWidth = 124;
				let itemsStartY = 16;
				let item = ui.inventory.items[i];
				this.menuFood.add(itemButton = new SlickUI.Element.Button(this.margin, itemsStartY + this.margin + (i * itemHeight), itemWidth, itemHeight));
				itemButton.add(new SlickUI.Element.Text(0, 0, item.name, 8, style_small));
				itemButton.events.onInputUp.add(()=>{ui.encounter.useFood(item)});
				this.menuFood.entries.push(itemButton);
			}
            
		},
		
		rebuildFoodList: function() {
			
			for (let i = 0; i < this.menuFood.entries.length; i++) {
				this.menuFood.remove(this.menuFood.entries[i]);
			}
			
			this.menuFood.entries = [];
			
			for (let i = 0; i < ui.inventory.items.length; i++) {
				let itemButton;
				let itemHeight = 32;
				let itemWidth = 124;
				let itemsStartY = 16;
				let item = ui.inventory.items[i];
				this.menuFood.add(itemButton = new SlickUI.Element.Button(this.margin, itemsStartY + this.margin + (i * itemHeight), itemWidth, itemHeight));
				itemButton.add(new SlickUI.Element.Text(0, 0, item.name, 8, style_small));
				itemButton.events.onInputUp.add(()=>{ui.encounter.useFood(item)});
				this.menuFood.entries.push(itemButton);
			}
			
		},
		
		tweenInUI: function() {
			//Tween in the monster
			this.sprite_monster.forEach((element)=>{
				game.add.tween(element).to( {x: this.position_monster.x}, 500, Phaser.Easing.Cubic.Out, true);
			});
			
			//Tween in the menu after a delay
			game.time.events.add(this.delay, () => {
				game.add.tween(this.menu).to( {y: gameHeight - this.menuHeight - this.margin}, 500, Phaser.Easing.Cubic.Out, true)
			}, this);
			
		},
		
		//MENU OPTIONS
		
		openFood: function() {
			game.add.tween(ui.encounter.menu).to( {y: ui.encounter.menu.y + ui.encounter.tweenDistance}, 500, Phaser.Easing.Cubic.Out, true);
			
			game.add.tween(ui.encounter.menuFood).to( {x: ui.encounter.margin}, 500, Phaser.Easing.Cubic.Out, true);
		},
		
		closeFood: function() {
			game.add.tween(ui.encounter.menu).to( {y: ui.encounter.menu.y - ui.encounter.tweenDistance}, 500, Phaser.Easing.Cubic.Out, true);
			
			game.add.tween(ui.encounter.menuFood).to( {x: 0 - gameWidth*.75}, 500, Phaser.Easing.Cubic.Out, true);
		},
		
		useFood: function(item) {
			console.log('Chose ' + item.name);
			ui.inventory.removeItem(item);
			this.rebuildFoodList();
			ui.encounter.closeFood();
		},
		
		endEncounter: function() {
			playState.endEncounter();
		}
		
	}
};