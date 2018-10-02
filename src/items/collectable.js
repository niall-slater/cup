class Collectable extends Phaser.Sprite {
	
    constructor(game, x, y) {
        super(game, 0, 0);
		
		this.collected = false;
		//Treat this as an abstract class - do not create anything of class Collectable.
	}
	
	update() {
		
		if (playState.player.isNextTo(this) && !this.collected) {
			this.onCollect();
		}
		
	}
	
	onCollect() {
		this.collected = true;
		playState.player.addToInventory(this);
		console.log('Collected ' + this);
	}
}