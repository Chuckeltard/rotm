//Splash Screen 
var creditsScreen = me.ScreenObject.extend({
    // constructor
	
    init: function() {
        this.parent(true);
        this.title = null;
    },
 
    onResetEvent: function() {
        if (this.title == null) {
			
            this.title = me.loader.getImage('credits_screen');

            this.fontWhite_center = new me.BitmapFont('16x16_font_white', 16);
            this.fontWhite_center.set("center");

			this.cursorPos = 400;
			this.page = 1;
			this.pageTimer = 15;
			this.pageCounter = 0;
			
			this.fontWhite_left = new me.BitmapFont('16x16_font_white', 16);
			this.fontWhite_left.set("left");
			
			this.fontRed_center = new me.BitmapFont('16x16_font', 16);
			this.fontRed_center.set("center");
			
            this.fontRed_left = new me.BitmapFont('16x16_font', 16);
            this.fontRed_left.set("left");
        }
 
        // enable the keyboard
		bindKeys("bind","menu");
		
    },
 

	update: function() {
        if (me.input.isKeyPressed('enter')) {
			me.audio.play("zombie_hit");
			this.pageCounter = 0;
			this.page++;
        }
        return true;
    },

	
    draw: function(context) {
        context.drawImage(this.title, 0, 0);
		
		this.pageCounter +=  me.timer.tick / me.sys.fps;

		if (this.pageCounter >= this.pageTimer) {
			this.pageCounter = 0;
			this.page++;
		}
		
		//Draw the all the text for the Main Menu
		this.fontRed_left.draw(context, "->", 35, this.cursorPos);
		this.fontWhite_left.draw(context, "Skip", 75, 400);
		
		if (this.page == 1)
		{
			this.fontRed_center.draw(context, "GAME DIRECTOR", 384, 40);
			this.fontWhite_center.draw(context, "Mike Luyties", 384, 65);
			
			this.fontRed_center.draw(context, "LEAD SOFTWARE ENGINEER", 384, 115);
			this.fontWhite_center.draw(context, "Timothy Peter", 384, 140);
			
			this.fontRed_center.draw(context, "ART DIRECTOR", 384, 190);
			this.fontWhite_center.draw(context, "Nick Springer", 384, 215);
			

		}
		else if (this.page == 2)
		{
			this.fontRed_center.draw(context, "LEVEL DESIGNERS", 384, 40);
			this.fontWhite_center.draw(context, "Dave Luyties", 384, 65);
			this.fontWhite_center.draw(context, "Jesse Young", 384, 90);
			
			this.fontRed_center.draw(context, "MUSIC COMPOSER", 384, 140);
			this.fontWhite_center.draw(context, "Darrell Reconose", 384, 165);		
		}
		else if (this.page == 3)
		{
			me.state.change(GAME_OVER_STATE);
		}
    },
 
    onDestroyEvent: function() {
		this.title = null;
		bindKeys("unbind","menu");
    }
});