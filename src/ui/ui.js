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
		items_entries: [],
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
			ui.inventory.panel.visible = false;
			
			this.buildItemList();
		},
		
		buildItemList: function() {
			//Build a list of items to display
			//items[] is a list of actual items owned by the player
			//items_entries[] is a list of UI display objects associated with items
			
			for(let i = 0; i < this.items.length; i++) {
				let entry;
				
				//previous text objects are not being destroyed, they're overlapping. TODO: fix
				
				ui.inventory.panel.add(entry = new SlickUI.Element.Text(this.padding, this.listStartY + i * this.entryHeight, 'item ' + i, null, style_small));
				
				this.items_entries[i] = entry;
			}
			
			console.log(this.items_entries);
		},
		
		//Toggle inventory display
		toggle: function() {
			if (this.displaying) {
				this.destroyInventory();
				this.displaying = false;
				
			} else {
				this.displayInventory();
				this.displaying = true;
			}
		},
		
		//display inventory
		displayInventory: function() {
			ui.inventory.panel.visible = true;
		},
		
		//destroy inventory
		destroyInventory: function() {
			ui.inventory.panel.visible = false;
		},
	}
};