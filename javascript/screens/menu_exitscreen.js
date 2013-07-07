var game_over_exit = me.ObjectEntity.extend({
	init: function(x, y, settings){

		//settings.image = 'neon_sign';
		//settings.spritewidth = 80;
		
		//call parent constructor
		this.parent(x, y, settings);
		
		//this.renderable.addAnimation( "walk", [0,1,2,3] );
		//this.renderable.addAnimation( "jump", [0,1,2,3] );
		
		//this.updateColRect( 8, 32, -1 );
			
		this.collidable = true;
		this.playerCollidable = true;
		this.type = me.game.LEVEL_OBJECT;

},

    onCollision: function( res, obj )
    {
        this.collide( res, obj );
    },
    
    collide: function( res, obj )
    {
        if ( obj == me.game.player && me.game.player.enemyCollidable )
        {
			saveData.completedDemo = 1;
			save_user_data();
			me.state.change(me.state.CREDITS);
			me.game.remove(this);
        }

    },
	
	//manage the enemy movement
	update: function(){

		if ( !this.inViewport )
        {
            return false;
        }

		this.parent(this);
		return true;
	}
});


//Splash Screen 
var GameOverScreen = me.ScreenObject.extend({
    // constructor
    init: function() {
        this.parent(true);
 
        // title screen image
        this.title = null;
        this.font = null;
    },
 
    // reset function
    onResetEvent: function() {
        if (this.title == null) {
            // init stuff if not yet done
            this.title = me.loader.getImage('credits_screen');
            // font to display the menu items
            this.white_font = new me.BitmapFont('16x16_font_white', 16);
            this.white_font.set("center");
		
            this.red_font = new me.BitmapFont('16x16_font', 16);
            this.red_font.set("center");

            this.fontRed_left = new me.BitmapFont('16x16_font', 16);
            this.fontRed_left.set("left");
			
			this.fontWhite_left = new me.BitmapFont('16x16_font_white', 16);
			this.fontWhite_left.set("left");
			
			this.cursorPos = 400;
			
        }
		me.audio.stop("rain_01");
		
        // enable the keyboard
        me.input.bindKey(me.input.KEY.ENTER, "enter", true);
 
        // play something
        //me.audio.play("cling");
 
    },
 
    // update function
    update: function() {
        // enter pressed ?
        if (me.input.isKeyPressed('enter')) {
			me.audio.play("zombie_hit");
            me.state.change(MAIN_MENU_STATE);
        }
        return true;
    },
 
    // draw function
    draw: function(context) {
        context.drawImage(this.title, 0, 0);

		this.fontRed_left.draw(context, "->", 35, this.cursorPos);
		this.fontWhite_left.draw(context, "Main Menu", 75, 400);
		
        this.red_font.draw(context, "Thank you for playing Rise of the Monsters!", 384, 30);
		
		this.white_font.draw(context, "Please take a minute to check out our", 384, 80);
		this.white_font.draw(context, "FREE Apartment and Roommate rental site!", 384, 100);
		this.red_font.draw(context, "www.rentermonsters.com", 384, 130);

		this.white_font.draw(context, "You can also LIKE / Follow RotM", 384, 210);
		this.white_font.draw(context, "On Facebook and Twitter!", 384, 230);
		this.red_font.draw(context, "www.facebook.com/RiseoftheMonsters", 384, 260);
		this.red_font.draw(context, "www.twitter.com/RiseOTMonsters", 384, 290);
    },
 
    // destroy function
    onDestroyEvent: function() {
        me.input.unbindKey(me.input.KEY.ENTER);
 
    }
});