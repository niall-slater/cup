class Critter extends Phaser.Sprite {
	
    constructor(game, x, y) {
        super(game, 0, 0);
         
        Phaser.Sprite.call(this, game, x, y, 'critter_test');
		this.frame = 0;
        
        this.anchor.setTo(0.5, 0.5);
		
		this.animSpeed = 2;
		this.moveSpeed = 40;
		
		this.moveTarget = null;
		
		this.speechBubbleAlive = false;
		this.speechBubbleLifetime = .5;
		
		if (Math.random() > .5) {
			this.animations.add('idle', [0, 1]);
			this.animations.add('walk', [0, 1]);
			this.animations.add('jump', [1, 2]);
		} else {
			this.animations.add('idle', [3, 4]);
			this.animations.add('walk', [3, 4]);
			this.animations.add('jump', [4, 5]);
		}
		
		
        game.add.existing(this);
        game.physics.arcade.enable(this);
		this.body.setSize(8, 8, 4, 4);
        this.body.mass = -10;
        this.body.immovable = false;
    	this.body.collideWorldBounds = false;  
		
        this.animations.play('idle', this.animSpeed, true);
        this.body.onCollide = new Phaser.Signal();
        this.body.onCollide.add(this.stopMoving, this);
        
        game.time.events.loop(Phaser.Timer.SECOND * 5, this.wander, this);
    }
    
    update() {
		
		this.updateMovement();
		
    }
	
	onInteract() {
        this.say('mrrrp');
    }
    
	moveTo(posX, posY) {
		this.moveTarget = {x: posX, y: posY};
        game.physics.arcade.moveToXY(this, this.moveTarget.x, this.moveTarget.y, this.moveSpeed);
        
        if (this.moveTarget.x > this.x) {
            this.scale.x = -1;
        } else {
            this.scale.x = 1;
        }
        
	}
	
    die() {
        this.destroy();
    }
    
    wander() {
        this.stopMoving();
        
        let wanderX = (-7 + Math.floor(Math.random() * 14)) * 10;
        let wanderY = (-7 + Math.floor(Math.random() * 14)) * 10;
        
        let collisionLayer = 'middle';
        
        if (playState.world.currentChunk.getTileAtPixel(this.x + wanderX, this.y + wanderY, collisionLayer) != null) {
            //Flip the coords if there's a solid tile in the way
            wanderX = -wanderX;
            wanderY = -wanderY;
        }
        
        this.moveTo(this.x + wanderX, this.y + wanderY);
    }
	
	updateMovement() {
        
        //If we've arrived at the moveTarget, delete it and zero out our velocity.
    	if (this.moveTarget != null) {
            this.animations.play('jump', this.animSpeed * 4, true);
			if (Math.abs(this.x - this.moveTarget.x) < 3 &&
                Math.abs(this.y - this.moveTarget.y) < 3) {
                this.stopMoving();
			}
		}
	}
    
    stopMoving() {
        this.moveTarget = null;
        this.body.velocity.x = 0; this.body.velocity.y = 0;
        this.animations.play('idle', this.animSpeed, true);
    }
	
	say(text) {
		
		if (this.speechBubbleAlive)
			return;
		
        //Create a sprite with text in it (placeholder graphics)
		let bubble = new SpeechBubble(game, this.x, this.y - 25, text, this.speechBubbleLifetime, this);
		this.speechBubbleAlive = true;
        
        //Add the bubble object to a dedicated effects layer
		playState.world.currentChunk.groupEffects.add(bubble);
	}
	
}