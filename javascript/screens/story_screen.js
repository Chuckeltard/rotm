var StoryScreen = me.ScreenObject.extend({
    init: function() {
        this.parent( true );
	
		
		this.title = null;

    },

    onResetEvent: function() {
        if (this.title == null) {
			me.audio.stopTrack();
			
			this.still_counter = 0;
			
            this.s001= me.loader.getImage("credits_screen");
			this.s002 = me.loader.getImage("menu_screen");
			this.still_array = new Array(this.s001,this.s002);
			
			// need to detect where the player is currently at in the story line and set this.max_still accordingly
			this.max_still = 1;

        }

        me.input.bindKey( me.input.KEY.ENTER, "enter", true );
        //me.audio.playTrack( "add music here" );
    },

    update: function() {
        if( me.input.isKeyPressed('enter')) {
			
			if (this.still_counter < this.max_still)
			{
				this.still_counter++;
				me.game.repaint(); // force redraw
			}
			else
			{
				// I will need to set where the player should be returned to. Most of the time should be sent back to Play.
				me.state.change(MAIN_MENU_STATE);
			}
		}
    },

    draw: function(context) {
		context.drawImage( this.still_array[this.still_counter], 0, 0 );
    },

    onDestroyEvent: function() {
		this.title = null;
        me.input.unbindKey(me.input.KEY.ENTER);
        //me.audio.stopTrack();
    }
});

/*
var splashScreen = me.ScreenObject.extend({
    init: function() {
        this.parent( true );
    
		this.title = null;
		this.timerSpeed = 5;
		this.counter = this.timerSpeed;
		
    },

    onResetEvent: function() {
        if (this.title == null) {
			
			this.still_counter = 0;
			
			me.audio.playTrack("title_screen_01");
			
            this.s001= me.loader.getImage("renter_00");
            this.s002= me.loader.getImage("renter_01");
            this.s003= me.loader.getImage("renter_02");
            this.s004= me.loader.getImage("renter_03");
            this.s005= me.loader.getImage("renter_04");
            this.s006= me.loader.getImage("renter_05");
            this.s007= me.loader.getImage("renter_06");
            this.s008= me.loader.getImage("renter_07");
            this.s009= me.loader.getImage("renter_00");
            this.s010 = me.loader.getImage("MainMenu_intro_00297");
            this.s011 = me.loader.getImage("MainMenu_intro_00298");
            this.s012 = me.loader.getImage("MainMenu_intro_00299");
			this.s013 = me.loader.getImage("MainMenu_intro_00003");
            this.s014 = me.loader.getImage("MainMenu_intro_00012");
            this.s015 = me.loader.getImage("MainMenu_intro_00019");
            this.s016 = me.loader.getImage("MainMenu_intro_00029");
            this.s017 = me.loader.getImage("MainMenu_intro_00040");
            this.s018 = me.loader.getImage("MainMenu_intro_00067");
            this.s019 = me.loader.getImage("MainMenu_intro_00091");
            this.s020 = me.loader.getImage("MainMenu_intro_00101");
            this.s021 = me.loader.getImage("MainMenu_intro_00123");
            this.s022 = me.loader.getImage("menu_screen");
            this.still_array = new Array(this.s001,this.s002,this.s003,this.s004,this.s005,this.s006,this.s007,this.s008,this.s009,this.s010,this.s011,this.s012,this.s013,this.s014,this.s015,this.s016,this.s017,this.s018,this.s019,this.s020,this.s021,this.s022);
			
			// need to detect where the player is currently at in the story line and set this.max_still accordingly
			this.max_still = 21;

        }

        me.input.bindKey( me.input.KEY.ENTER, "enter", true );
        //me.audio.playTrack( "add music here" );
    },

    update: function() {
		// skip ability - needs to be removed for shipped game
		if( me.input.isKeyPressed('enter'))
		{
			me.state.change(MAIN_MENU_STATE);
		}
		
		if (this.counter < 0)
		{
			if (this.still_counter <= this.max_still)
			{
				this.still_counter++;
				me.game.repaint(); // force redraw
			}
			else
			{
				me.state.change(MAIN_MENU_STATE);
			}
			
			if (this.still_counter == 7)
			{
				this.counter = 160;
			}
			else if (this.still_counter == 8)
			{
				this.counter = this.timerSpeed;
				// add some sort of impact audio here for when the name hits if I can find something good
				// me.audio.play("zombie_brains");
			}
			else if (this.still_counter == this.max_still)
			{
				this.counter = 120;
			}
			else
			{
				this.counter = this.timerSpeed;
			}
		}

		this.counter--;
		
    },

    draw: function(context) {
		if (this.still_counter < this.max_still)
		{
			context.drawImage( this.still_array[this.still_counter], 0, 0 );
		}
    },

    onDestroyEvent: function() {
		this.title = null;
        me.input.unbindKey(me.input.KEY.ENTER);
        //me.audio.stopTrack();
    }
});
*/