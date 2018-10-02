class Speaker extends Phaser.Sprite {
	
    constructor(game, x, y, phrase, spriteIndex) {
        super(game, 0, 0);
         
        Phaser.Sprite.call(this, game, x, y, 'characters_roguelike', spriteIndex);
		
        
        this.anchor.setTo(0.5, 0.5);
		
		this.animSpeed = 4;
		this.moveSpeed = 100;
		
		this.moveTarget = null;
        
        this.phrase = phrase;
		
		this.speechBubbleAlive = false;
		this.speechBubbleLifetime = 2;
		
		/*
        this.anim_idle = this.animations.add('anim_idle', [0]);
        this.anim_walk = this.animations.add('anim_walk', [0,1]);
        this.anim_interact = this.animations.add('anim_interact', [2,3]);
		*/
		
        game.add.existing(this);
        game.physics.arcade.enable(this);
        this.body.immovable = true;
		this.body.setSize(14, 14, 1, 1);
    	this.body.collideWorldBounds = false;
		
		//this.animations.play('anim_walk', this.animSpeed, true);
		
		this.otherPhrases = [
			'Sigh...',
			'What?',
			'Be careful out there.',
			'Seen any critters?',
			'So tired...',
			"It's been a long day.",
			'They say our time is up.'
		];
		
		this.otherPhraseChance = 0.5;
    }
    
    update() {
		
		this.updateMovement();
		
    }
	
	
	moveTo(posX, posY) {
		this.moveTarget = {x: posX, y: posY};
        game.physics.arcade.moveToXY(this, this.moveTarget.x, this.moveTarget.y, this.moveSpeed);
	}
	
    die() {
        this.destroy();
    }
	
	updateMovement() {
        
        //If we've arrived at the moveTarget, delete it and zero out our velocity.
    	if (this.moveTarget != null) {
			if (Math.abs(this.x - this.moveTarget.x) < 1 && Math.abs(this.y - this.moveTarget.y) < 1) {
				this.moveTarget = null;
				this.body.velocity.x = 0; this.body.velocity.y = 0;
			}
		}
	}
    
    onInteract() {
        this.say(this.phrase);
    }
	
	say(text) {
		
		if (this.speechBubbleAlive)
			return;
		
		let speech = text;
		
		if (Math.random() < this.otherPhraseChance) {
			speech = this.otherPhrases[Math.floor(Math.random() * this.otherPhrases.length)];
		}
		
        //Create a sprite with text in it (placeholder graphics)
		let bubble = new SpeechBubble(game, this.x, this.y - 32, speech, this.speechBubbleLifetime, this);
		this.speechBubbleAlive = true;
        
        //Add the bubble object to a dedicated effects layer
		playState.world.currentChunk.groupEffects.add(bubble);
	}
	
}