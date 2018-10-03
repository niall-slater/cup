class Monster extends Phaser.Sprite {
	
    constructor(game, x, y) {
        super(game, 0, 0);
         
        Phaser.Sprite.call(this, game, x, y, 'monster_test');
		this.frame = 0;
        
        this.anchor.setTo(0.5, 0.5);
		
		this.animSpeed = 4;
		this.moveSpeed = 40;
		
		this.moveTarget = null;
		
		this.animations.add('idle', [0, 1]);
		this.animations.add('walk', [1, 2]);
		this.animations.add('hurt', [3, 1, 0]);
		this.animations.add('attack', [1, 5, 6]);
		
		
        game.add.existing(this);
        game.physics.arcade.enable(this);
		this.body.setSize(8, 8, 4, 4);
        this.body.mass = 25;
        this.body.immovable = false;
		this.body.drag = new Phaser.Point(100, 100);
    	this.body.collideWorldBounds = false;  
		
        this.animations.play('idle', this.animSpeed, true);
		this.body.bounce.x = 1;
		this.body.bounce.y = 1;
        this.body.onCollide = new Phaser.Signal();
        this.body.onCollide.add(this.collide, this);
        
        this.health = 2;
		
		game.time.events.add(Phaser.Timer.SECOND * Math.random() * 2, this.startWandering, this);
        
        this.attackForce = 5;
    }
	
	startWandering() {
		this.wander();
		this.wanderTimer = game.time.events.loop(Phaser.Timer.SECOND * 5, this.wander, this);
	}
    
    update() {
		
		this.updateMovement();
		
    }
	
	onInteract(actor) {
        this.hurt(1, actor);
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
	
	hurt(amount, attacker) {
		this.health -= amount;
        this.animations.play('hurt', this.animSpeed * 2, false);
		if (this.health <= 0) {
			this.die();
		}
		this.pushAwayFrom(attacker, attacker.attackForce);
	}
	
    die() {
		game.time.events.remove(this.wanderTimer);
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
	
	collide(me, other) {
        if (other instanceof Player) {
            me.attack(other);
        }
        
	}
	
	attack(target) {
        this.animations.play('attack', this.animSpeed * 2, false);
	}
       
	/*
	
	//this is the (probably) garbage code that I put in because of a failed merge.
	//TODO: check it's not needed then delete it
	
	encounter() {
		this.attack();
	}
	
	attack() {
        this.animations.play('attack', this.animSpeed * 2, false);
		
		if (playState.player.isNextTo(this)) {
			playState.player.hurt(1);
		}
	}*/
	
	pushAwayFrom(actor, force) {
		
		let momentum = new Phaser.Point(force, force);
		let vectorBetween = actor.body.position.subtract(this.body.position.x, this.body.position.y);
		vectorBetween.normalize();
		
		let punch = vectorBetween.multiply(momentum.x, momentum.y);
        this.body.velocity.subtract(punch.x, punch.y);
	}
	
}