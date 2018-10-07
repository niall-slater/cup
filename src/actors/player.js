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
        this.body.mass = 1;
    	this.body.collideWorldBounds = true;
		
		//this.animations.play('anim_walk', this.animSpeed, true);
        
		
        /* KEYBOARD INPUT */
        
        this.KEY_X = game.input.keyboard.addKey(Phaser.Keyboard.X);
        this.KEY_X.onDown.add(this.onPressX.bind(this));
		
        this.KEY_Z = game.input.keyboard.addKey(Phaser.Keyboard.Z);
        this.KEY_Z.onDown.add(this.onPressZ.bind(this));
		
		/* PLAYER INFO */
		//Combat
		this.health = 3;
		this.attackForce = 100;
		this.invulnerableCooldown = 500; //in ms
		this.invulnerable = false;
		this.punchForce = 100;
		//Encounters
		this.encountersEnabled = true;
		
    	cursors = game.input.keyboard.createCursorKeys();
		cursorsWASD = game.input.keyboard.addKeys({ 'up': Phaser.KeyCode.W, 'down': Phaser.KeyCode.S, 'left': Phaser.KeyCode.A, 'right': Phaser.KeyCode.D });
		
		console.log(cursors);
		console.log(cursorsWASD);
		
		cursors.left.onDown.add( () => { 
			this.onPressCursor('left');
		} );
		cursors.right.onDown.add( () => { 
			this.onPressCursor('right');
		} );
		cursors.up.onDown.add( () => { 
			this.onPressCursor('up');
		} );
		cursors.down.onDown.add( () => { 
			this.onPressCursor('down');
		} );
		
		cursorsWASD.left.onDown.add( () => { 
			this.onPressCursor('left');
		} );
		cursorsWASD.right.onDown.add( () => { 
			this.onPressCursor('right');
		} );
		cursorsWASD.up.onDown.add( () => { 
			this.onPressCursor('up');
		} );
		cursorsWASD.down.onDown.add( () => { 
			this.onPressCursor('down');
		} );
		
    }
    
    update() {
		
		if (playState.encounterPlaying) {
			this.updateInEncounter();
		} else {
			this.updateInOverworld();
		}
    }
	
	updateInEncounter() {
		
	}
	
	updateInOverworld() {
    	this.body.velocity.x = 0;
    	this.body.velocity.y = 0;
		
		if (playState.chunkTransitionPlaying) {
			return;
		}
		
		if (cursors.left.isDown || cursorsWASD.left.isDown)
		{
			this.body.velocity.x = -this.moveSpeed;
		}
		else if (cursors.right.isDown || cursorsWASD.right.isDown)
		{
			this.body.velocity.x = this.moveSpeed;
		}

		if (cursors.up.isDown || cursorsWASD.up.isDown)
		{
			this.body.velocity.y = -this.moveSpeed;
		}
		else if (cursors.down.isDown || cursorsWASD.down.isDown)
		{
			this.body.velocity.y = this.moveSpeed;
		}
		
		if (this.encountersEnabled) {
			this.rollForEncounter();
		}
	}
	
	hurt(amount) {
        console.log('Hurt player');
		
		if (this.invulnerable) {
			return;
		}
	}
	
    die() {
        console.log('Player died');
    }
	
	moveTo(x, y) {
		this.x = x;
		this.y = y;
	}
	
	onPressX() {
		
		if (playState.encounterPlaying) {
			//Pressed X during an encounter
			console.log('x in encounter');
		} else {
			//Pressed X in the overworld
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
	}
	
	onPressZ() {
		
		if (playState.encounterPlaying) {
			//Pressed Z during an encounter
			console.log('z in encounter');
		} else {
			//Pressed Z in the overworld
			this.toggleInventory();
		}
	}
	
	onPressCursor(direction) {
		if (!playState.encounterPlaying) {
			//We're in the overworld - do nothing, because cursors are handled in UpdateInOverworld
			//This is because in overworld we use bools and in encounters we use Phaser Signals
			return;
		}
		
		switch(direction) {
			case 'up': console.log('up'); break;
			case 'down': console.log('down'); break;
			case 'left': console.log('left'); break;
			case 'right': console.log('right'); break;
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
	
	pushAwayFrom(actor, force) {
		
		let momentum = new Phaser.Point(force, force);
		let vectorBetween = actor.body.position.subtract(this.body.position.x, this.body.position.y);
		vectorBetween.normalize();
		
		let punch = vectorBetween.multiply(momentum.x, momentum.y);
		console.log(punch);
        this.body.velocity.subtract(punch.x, punch.y);
	}
	
	addToInventory(item) {
		ui.inventory.addItem(item);
	}
	
	toggleInventory() {
		ui.inventory.toggle();
	}
	
	rollForEncounter() {
		
		/*
		*  Roll a die to decide if there will be an encounter
		*/
		
		//Tile sprite indexes for triggering encounters:
		//593 = long grass
		//650 = longer grass
		
		let tileCheck = playState.world.currentChunk.getTileAtPixel(this.x, this.y, 'under-overlay');
		let encounterChance = 0.03;
		
		if (tileCheck != null) {
			let index = tileCheck.index;
			if (index === 593 || index === 650) {
				if (Math.random() < encounterChance) {
					playState.startEncounter();
					//Disable encounters until we've done this one, so we
					//don't immediately have another one on completion
					this.encountersEnabled = false;
				}
			}
		}
	}
	
};