class Player extends Phaser.Sprite {
    
    constructor(game, x, y) {
        super(game, 0, 0);
         
        Phaser.Sprite.call(this, game, x, y, 'characters_test');
		
        
        this.anchor.setTo(0.5, 0.5);
		
		this.animSpeed = 4;
		this.moveSpeed = 100;
        
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
		game.camera.follow(this);
		
		//this.animations.play('anim_walk', this.animSpeed, true);
        
        /* KEYBOARD INPUT */
        
        this.KEY_INTERACT = game.input.keyboard.addKey(Phaser.Keyboard.X);
        this.KEY_INTERACT.onDown.add(this.interact.bind(this));
    }
    
    update() {
		
    	this.body.velocity.x = 0;
    	this.body.velocity.y = 0;
		
		if (cursors.left.isDown)
		{
			this.body.velocity.x = -this.moveSpeed;
		}
		else if (cursors.right.isDown)
		{
			this.body.velocity.x = this.moveSpeed;
		}

		if (cursors.up.isDown)
		{
			this.body.velocity.y = -this.moveSpeed;
		}
		else if (cursors.down.isDown)
		{
			this.body.velocity.y = this.moveSpeed;
		}
    }
	
    die() {
        this.destroy();
    }
	
	moveTo(x, y) {
		this.x = x;
		this.y = y;
	}
	
    interact() {
        
        for (let i = 0; i < playState.groupActors.children.length; i++) {
            let actor = playState.groupActors.children[i];
            if (actor === this) {
                continue;
            }
            if (this.isNextTo(actor)) {
                actor.onInteract();
                return;
            }
        }
    }
    
    isNextTo(sprite) {
        if (Math.abs(this.x - sprite.x) < 16 && Math.abs(this.y - sprite.y) < 16) {
            return true;
        } else {
            return false;
        }
    } 
};