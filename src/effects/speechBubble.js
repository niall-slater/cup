class SpeechBubble extends Phaser.Sprite {
	
    constructor(game, x, y, text, lifetime, speaker) {
        super(game, 0, 0);
		
		this.lifeTime = lifetime;
		this.speaker = speaker;
		
		this.x = x; this.y = y;
		
		this.padding = 3;
		let width = (this.padding * 2) + 8 * text.length;
		let height = 22;
		
		this.anchor.setTo(0.5, 0.5);
        this.background = game.world.currentChunk.groupEffects.create(Math.floor(x-width/2)+1, Math.floor(y-height/2), 'ui_speechBubble_center');
        this.background.width = width-1;
        this.background.height = height;
		
		this.fadeDistance = 24;
        
        this.pieces = [];
        
        //Assemble the separate pieces of the speech bubble with small pixel adjustments so they fit
        
        this.pieces.push(game.world.currentChunk.groupEffects.create(x-width/2-1, y-height/2-1, 'ui_speechBubble_topleft'));
        this.pieces.push(game.world.currentChunk.groupEffects.create(x-width/2+1, y-height/2, 'ui_speechBubble_top'));
        this.pieces.push(game.world.currentChunk.groupEffects.create((x+width/2)-1, (y-height/2)-1, 'ui_speechBubble_topright'));
        this.pieces.push(game.world.currentChunk.groupEffects.create(x-width/2, y-height/2+2, 'ui_speechBubble_left'));
        this.pieces.push(game.world.currentChunk.groupEffects.create(x+width/2, y-height/2+1, 'ui_speechBubble_right'));
        this.pieces.push(game.world.currentChunk.groupEffects.create(x-width/2-1, y+height/2-1, 'ui_speechBubble_bottomleft'));
        this.pieces.push(game.world.currentChunk.groupEffects.create(x-width/2+1, y+height/2, 'ui_speechBubble_bottom'));
        this.pieces.push(game.world.currentChunk.groupEffects.create(x+width/2-1, y+height/2-1, 'ui_speechBubble_bottomright'));
        this.pieces.push(game.world.currentChunk.groupEffects.create(x, y+height/2, 'ui_speechBubble_tail'));
        
        //Draw the corners and tail on top, and stretch the edges to the full width & height
        this.pieces[0].bringToTop();
        this.pieces[1].width = width-2;
        this.pieces[2].bringToTop();
        this.pieces[3].height = height-2;
        this.pieces[4].height = height-2;
        this.pieces[5].bringToTop();
        this.pieces[6].width = width-2;
        this.pieces[7].bringToTop();
        this.pieces[8].bringToTop();
        
        for (var i = 0; i < this.pieces.length; i++) {
            this.pieces[i].x = Math.floor(this.pieces[i].x);
            this.pieces[i].y = Math.floor(this.pieces[i].y);
			game.add.tween(this.pieces[i]).to( {alpha: 0, y: this.pieces[i].y-this.fadeDistance}, this.lifeTime * 1000, Phaser.Easing.Exponential.In, true);
        }
		
		this.phrase = game.add.text(this.x + this.padding, this.y + this.padding, text, style_small);
		
		game.add.tween(this.background).to( {alpha: 0, y: y-height/2-this.fadeDistance}, this.lifeTime * 1000, Phaser.Easing.Exponential.In, true);
		game.add.tween(this.phrase).to( {alpha: 0, y: y-this.fadeDistance}, this.lifeTime * 1000, Phaser.Easing.Exponential.In, true);
		
		this.phrase.anchor.setTo(0.5, 0.5);
        
		
		game.world.currentChunk.groupEffects.add(this.phrase);
		this.phrase.bringToTop();
		
    }
    
    update() {
		
        this.phrase.x = Math.floor(this.x + this.padding);
        this.phrase.y = Math.floor(this.y + this.padding);
        
		if (this.lifeTime > 0) {
        	this.lifeTime -= game.time.physicsElapsed;
		} else {
			this.speaker.speechBubbleAlive = false;
			this.phrase.destroy();
			this.background.destroy();
            
            for (var i = 0; i < this.pieces.length; i++) {
                let piece = this.pieces[i];
                piece.destroy();
            }
		}
    }
    
};