class Collectable extends Phaser.Sprite {
	
    constructor(game, x, y) {
        super(game, 0, 0);
		
		//Treat this as an abstract class - do not create anything of class Collectable.
	}
	
	update() {
		
		if (playState.player.isNextTo(this)) {
			this.onCollect();
		}
		
	}
	
	onCollect() {
		playState.player.addToInventory(this);
		console.log('Collected ' + this);
		this.destroy();
	}
}