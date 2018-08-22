class SpeechBubble extends Phaser.Sprite {
	
    constructor(game, x, y, text) {
        super(game, 0, 0);
		
		let width = 50;
		let height = 20;
		
        y = y - 14;
        x = x - 8;
		
		this.anchor.setTo(0.5, 0.5);
		
		this.background = Phaser.Sprite.call(this, game, x, y, '');
		
        this.background = new Phaser.Sprite(game, 0, 0, 'ui_speechBubble');
		
		this.lifeTime = 2;
		
		let padding = 3;
		
		this.phrase = game.add.text(padding, padding, text, style_default);
		
		//groupText.add(this.phrase);
		this.addChild(this.background);
		this.addChild(this.phrase);
		this.phrase.setTextBounds(padding, padding);
		
		
		let stretch = padding * 2 + text.length * 12;
		
		if (stretch < 1) {
			stretch = 1;
		}
		
		this.background.width = stretch;
		this.background.height = stretch/2;
        
    }
    
    update() {
		
		if (this.lifeTime > 0) {
        	this.lifeTime -= game.time.physicsElapsed;
		} else {
			this.phrase.destroy();
			this.destroy();
		}
    }
    
};