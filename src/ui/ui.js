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
	}
};