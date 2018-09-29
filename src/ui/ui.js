

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
			ui.inventory.panel.add(ui.inventory.panel.title = new SlickUI.Element.Text(0, 0, 'INVENTORY')).centerHorizontally();
			
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
				ui.inventory.panel.add(entry = new SlickUI.Element.Text(this.padding, this.listStartY + i * this.entryHeight, 'item ' + i));
				
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