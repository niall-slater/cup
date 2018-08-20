class Creature extends Phaser.Sprite {
	
    constructor(game, x, y) {
        super(game, 0, 0);
         
        Phaser.Sprite.call(this, game, x, y, 'characters_test');
		
        
        this.anchor.setTo(0.5, 0.5);
		
		this.animSpeed = 4;
		this.moveSpeed = 100;
		
		this.moveTarget = null;
		
		/*
        this.anim_idle = this.animations.add('anim_idle', [0]);
        this.anim_walk = this.animations.add('anim_walk', [0,1]);
        this.anim_interact = this.animations.add('anim_interact', [2,3]);
		*/
		
        game.add.existing(this);
        game.physics.arcade.enable(this);
		this.body.setSize(14, 14, 0, 0);
    	this.body.drag = 50;
    	this.body.collideWorldBounds = true;
		
		//this.animations.play('anim_walk', this.animSpeed, true);
    }
    
    update() {
		
		this.updateMovement();
		
    }
	
	
	moveTo(x, y) {
		this.moveTarget = {x: x, y: y};
			game.physics.arcade.moveToXY(this, this.moveTarget.x, this.moveTarget.y, this.moveSpeed);
	}
	
    die() {
        this.destroy();
    }
	
	//Movement
	updateMovement() {
    	if (this.moveTarget != null) {
			//Move to target
			//If we're there, delete moveTarget
			if (Math.abs(this.x - this.moveTarget.x) < 1 && Math.abs(this.y - this.moveTarget.y) < 1) {
				this.moveTarget = null;
				this.body.velocity.x = 0;
				this.body.velocity.y = 0;
			}
		}
	}
	
}