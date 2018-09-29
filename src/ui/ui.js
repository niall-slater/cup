
var ui = {
	
	inventory: {
		
		items: [],
		displaying: false,
		
		margin: 12,
		
		init: function() {
		
			//Create inventory panel
			slickUI.add(ui.inventory.panel = new SlickUI.Element.Panel(this.margin, this.margin, gameWidth - this.margin*2, gameHeight - this.margin*2));

			//Title
			ui.inventory.panel.add(ui.inventory.panel.title = new SlickUI.Element.Text(0, 0, 'INVENTORY')).centerHorizontally();
			
			ui.inventory.panel.visible = false;

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