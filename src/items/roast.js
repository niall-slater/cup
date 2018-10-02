class Roast extends Collectable {
	
    constructor(game, x, y) {
        super(game, 0, 0);
		
		Phaser.Sprite.call(this, game, x, y, 'tiles_roguelike', 909);
    	this.anchor.setTo(0.5, 0.5);
		this.name = 'Roasted bird';
	}
	
}