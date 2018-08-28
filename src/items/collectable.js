class Collectable extends Phaser.Sprite {
	
    constructor(game, x, y) {
        super(game, 0, 0);
		
		//Treat this as an abstract class - Collectables do not spawn.
	}
	
	update() {
		
		if (playState.player.isNextTo(this)) {
			this.onCollect();
		}
		
	}
	
	onCollect() {
		playState.player.inventory.push(this);
		console.log('Collected ' + this);
		this.destroy();
	}
}