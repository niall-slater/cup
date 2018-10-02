class Player extends Phaser.Sprite {
    
    constructor(game, x, y) {
        super(game, 0, 0);
         
        Phaser.Sprite.call(this, game, x, y, 'characters_test');
		
        
        this.anchor.setTo(0.5, 0.5);
		
		this.animSpeed = 4;
		this.moveSpeed = 120;
        
		/*
        this.anim_idle = this.animations.add('anim_idle', [0]);
        this.anim_walk = this.animations.add('anim_walk', [0,1]);
        this.anim_interact = this.animations.add('anim_interact', [2,3]);
		*/
		
        game.add.existing(this);
        game.physics.arcade.enable(this);
		this.body.setSize(14, 14, 1, 1);
    	this.body.drag = (25, 25);
        this.body.mass = .01;
    	this.body.collideWorldBounds = true;
		
		//this.animations.play('anim_walk', this.animSpeed, true);
        
		
        /* KEYBOARD INPUT */
        
        this.KEY_INTERACT = game.input.keyboard.addKey(Phaser.Keyboard.X);
        this.KEY_INTERACT.onDown.add(this.interact.bind(this));
		
        this.KEY_INTERACT = game.input.keyboard.addKey(Phaser.Keyboard.Z);
        this.KEY_INTERACT.onDown.add(this.toggleInventory.bind(this));
		
		this.health = 3;
		this.invulnerableCooldown = 500; //in ms
		this.invulnerable = false;
		this.punchForce = 100;
		
    }
    
    update() {
		
    	this.body.velocity.x = 0;
    	this.body.velocity.y = 0;
		
		if (playState.chunkTransitionPlaying) {
			return;
		}
		
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
	
	hurt(amount) {
		
		if (this.invulnerable) {
			return;
		}
		
		this.health -= amount;
		console.log('hurt player, health at ' + this.health);
		
		if (this.health <= 0) {
			this.die();
			return;
		}
		
		this.tint = '0x00FF0030';
		
		this.invulnerable = true;
		
		game.time.events.add(this.invulnerableCooldown, () => {
			this.invulnerable = false;
			this.tint = '0xFFFFFF';
		});
	}
	
    die() {
        console.log('YOU DEAD');
    }
	
	moveTo(x, y) {
		this.x = x;
		this.y = y;
	}
	
    interact() {
        for (let i = 0; i < playState.world.currentChunk.groupActors.children.length; i++) {
            let actor = playState.world.currentChunk.groupActors.children[i];
            if (actor === this) {
                continue;
            }
            if (this.isNextTo(actor)) {
                actor.onInteract(this);
                return;
            }
        }
		
    }
    
    isNextTo(sprite) {
		let range = 25;
		
        if (Math.abs(this.x - sprite.x) < range && Math.abs(this.y - sprite.y) < range) {
            return true;
        } else {
            return false;
        }
    }
	
	addToInventory(item) {
		ui.inventory.addItem(item);
	}
	
	toggleInventory() {
		ui.inventory.toggle();
	}
};