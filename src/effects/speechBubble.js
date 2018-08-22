class SpeechBubble extends Phaser.Sprite {
	
    constructor(game, x, y, text) {
        super(game, 0, 0);
		
		let width = 6 * text.length;
		let height = 32;
		
		this.anchor.setTo(0.5, 0.5);
        this.background = Phaser.Sprite.call(this, game, x-width/2, y-height/2, 'ui_speechBubble_center');
        this.width = width;
        this.height = height;
        
        this.pieces = [];
        
        this.pieces.push(game.add.image(x-width/2, y-height/2, 'ui_speechBubble_topleft'));
        this.pieces.push(game.add.image(x-width/2, y-height/2, 'ui_speechBubble_top'));
        this.pieces.push(game.add.image(x+width/2, y-height/2, 'ui_speechBubble_topright'));
        this.pieces.push(game.add.image(x-width/2, y-height/2, 'ui_speechBubble_left'));
        this.pieces.push(game.add.image(x+width/2, y-height/2, 'ui_speechBubble_right'));
        this.pieces.push(game.add.image(x-width/2, y+height/2, 'ui_speechBubble_bottomleft'));
        this.pieces.push(game.add.image(x-width/2, y+height/2, 'ui_speechBubble_bottom'));
        this.pieces.push(game.add.image(x+width/2, y+height/2, 'ui_speechBubble_bottomright'));
        this.pieces.push(game.add.image(x, y+height/2, 'ui_speechBubble_tail'));
        
        //Bring the corners and the tail to the top, and stretch the edges to the full width & height
        this.pieces[0].bringToTop();
        this.pieces[1].width = width;
        this.pieces[2].bringToTop();
        this.pieces[3].height = height;
        this.pieces[4].height = height;
        this.pieces[5].bringToTop();
        this.pieces[6].width = width;
        this.pieces[7].bringToTop();
        this.pieces[8].bringToTop();
        
		this.lifeTime = 2;
		
		this.padding = 6;
		
		this.phrase = game.add.text(this.padding, this.padding, text, style_default);
        this.phrase.bringToTop();
		
    }
    
    update() {
		
        this.phrase.x = Math.floor(this.x + this.padding);
        this.phrase.y = Math.floor(this.y + this.padding);
        
		if (this.lifeTime > 0) {
        	this.lifeTime -= game.time.physicsElapsed;
		} else {
			this.phrase.destroy();
			this.destroy();
            
            for (var i = 0; i < this.pieces.length; i++) {
                let piece = this.pieces[i];
                piece.destroy();
            }
		}
    }
    
};