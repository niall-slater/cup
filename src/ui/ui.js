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
let style_small = { font: "18px VT323", fill: "#333", wordWrap: "true", wordWrapWidth: 330};


var ui = {
	
	inventory: {
		
		items: [],
		displaying: false,
		
		margin: 12,
		padding: 8,
		listStartY: 28,
		entryHeight: 24,
		
		init: function() {
		
			//Create inventory panel
			slickUI.add(ui.inventory.panel = new SlickUI.Element.Panel(this.margin, this.margin, gameWidth - this.margin*2, gameHeight - this.margin*2));

			//Title
			ui.inventory.panel.add(ui.inventory.panel.title = new SlickUI.Element.Text(0, 0, 'INVENTORY', null, style_default)).centerHorizontally();
			
			ui.inventory.panel.alpha = 0.8;
			ui.inventory.panel.x = this.margin + 512;
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
		},
		
		hideInventory: function() {
			
            game.add.tween(ui.inventory.panel).to( {x: 512 + ui.inventory.margin}, 500, Phaser.Easing.Exponential.Out, true);
			
		},
		
		addItem: function(item) {
			
			this.items.push(item);
			
			let numItems = this.items.length;
			
			let entry;
			
			ui.inventory.panel.add(entry = new SlickUI.Element.Text(this.padding,
																		this.listStartY + numItems * this.entryHeight,
																		'item ' + numItems,
																		null,
																		style_small));
			
		}
	}
};