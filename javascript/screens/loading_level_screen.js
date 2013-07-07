var level_transitionObject = me.ObjectEntity.extend({
	init: function(x, y, settings){

		if (settings.fromLevel == "world_city")
		{
			settings.image = 'neon_sign';
			settings.spritewidth = 80;
			settings.spriteheight = 40;
		}

		this.x = settings.x;
		this.y = settings.y;
		
		//call parent constructor
		this.parent(x, y, settings);
		
		this.toLevel = settings.toLevel;
		this.fromLevel = settings.fromLevel;
		
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
		if (obj != me.game.player)
		{
			return false;
		}
		
		/*
		// Send user straight to main menu instead of the world screen
		if (!bWorldLevel)
		{
			me.state.change(MAIN_MENU_STATE);
		}
		*/
		
		if (selectedlevel == 'world_city' && obj == me.game.player)
		{
			// add UI call here to tell the player to press enter to enter the level
			if (me.input.isKeyPressed('enter'))
			{
				selectedlevel = this.toLevel;
				previouslevel = this.fromLevel;
				me.game.world_player_pos_x = this.x;
				me.game.world_player_pos_y = this.y;
				me.state.change(LEVEL_TRANSITION_STATE);
			}
		}
		else
		{
			if ( obj == me.game.player )
			{
				selectedlevel = this.toLevel;
				previouslevel = this.fromLevel;
				
				if (this.fromLevel != 'world_city')
				{
					//me.gamestat.updateValue(this.fromLevel,true);
					saveData[this.fromLevel] = 1;
				}
				
				me.state.change(LEVEL_TRANSITION_STATE);
			}
		}
    },
});


//Splash Screen 
var level_transitionScreen = me.ScreenObject.extend({
    // constructor
    init: function() {
        this.parent(true);
 
        // title screen image
        this.title = null;
        this.font = null;
		this.loadCount = 0;
		this.progress = 0;
		var saveResult = null;
		me.input.unbindKey(me.input.KEY.ENTER);
		
		rainSFX = "on";
		me.game.level_save_trigger = false;
		
		// ===== Loading Tip Data =====
		this.loadingTip_delay = 15; // 15 sec delay
		this.loadingTip_timer = this.loadingTip_delay;
		this.random_loadingTip_array = [ 
		"Not all enemies can jump and climb ladders.",
		"Don't forget to upgrade your Hero!",
		"Pick up as many keys as possible to unlock upgrades.",
		"Pick up listings in order to unlock further levels.",
		"Each Hero has their own special ability and stats.",
		"Long falls won't hurt you... unless there is \n something bad at the bottom..."];
		
		this.loadingTip_count = this.random_loadingTip_array.length - 1;
		this.currentTip = Math.floor(Math.random() * this.loadingTip_count);

		// ===== Loading Ad Data =====
		// Pull updated ad lines from database if there is an internet connection
		this.random_loadingAd_array = [ 
		"Register for an account and unlock achievements, even in the demo!",
		"If you register for an account, your achievements and currency \n from the demo will carry over to the full game!",
		"Write a review on RenterMonsters.com to receive free keys!",
		"Like Rise of the Monsters on Facebook at \n Facebook.com/RiseoftheMonsters",
		"Looking for a new apartment or home? Check us out at RenterMonsters.com \n It's 100% free.",
		"Follow Rise of the Monsters on Twitter \n @RiseOTMonsters",
		"Ever lived somewhere and wanted to share your experience? \n Now's your chance at RenterMonsters.com",
		"Need a roommate? Check us out at RenterMonsters.com \n It's 100% free.",
		"Don't forget to tell your friends and family about \n Rise of the Monsters and RenterMonsters.com!",
		"Like RenterMonsters.com on Facebook at \n Facebook.com/RenterMonsters",
		"Follow RenterMonsters.com on Twitter \n @RenterMonsters",
		"Interested in advertising here? Contact us at rotm@rentermonsters.com",
		];
		
		this.loadingAd_count = this.random_loadingAd_array.length - 1;
		this.currentAd = Math.floor(Math.random() * this.loadingAd_count);
		
		me.game.level_transitionScreen = this;

    },

	onload: function(){
		// check loading progress - if progress is 100% - call loaded function
		this.loadCount++;
		this.progress = this.loadCount / this.resourceCount * 100;
		
		if (this.progress >= 100)
		{
			this.loaded();
		}
	},
    
	loaded: function(){ 
		// enable the enter key once everything is fully loaded
		this.newButton = new menuButton(525, 400, { spritewidth: 200, spriteheight: 24, action: 'level_loadComplete' });
		me.game.add(this.newButton, 999);
		
		me.input.bindKey(me.input.KEY.ENTER, "enter", true);

	},
	
	display_loadingTip: function(){

		this.random_loadingTip = this.random_loadingTip_array[this.currentTip];

		this.currentTip++;
		
		if (this.currentTip > this.loadingTip_count)
		{
			this.currentTip = 0;
		}
		
		return this.random_loadingTip;
		
	},

	display_loadingAd: function(){

		this.random_loadingAd = this.random_loadingAd_array[this.currentAd];

		this.currentAd++;
		
		if (this.currentAd > this.loadingAd_count)
		{
			this.currentAd = 0;
		}
		
		return this.random_loadingAd;
		
	},
	
	onerror: function(){
		alert("You have encountered an error!");
	},
		
	// reset function
    onResetEvent: function() {

		me.input.unbindKey(me.input.KEY.ENTER);
		this.loadCount = 0;
		this.progress = 0;
		
		// add ajax save functionality here
		if (username)
		{
			saveResult = "save_started";
			save_user_data();
		}

		this.resourceCount = 2;
		me.loader.onload = this.loaded.bind(this);
		
		me.audio.stopTrack();

		if (selectedlevel != previouslevel)
		{
			me.loader.unload({name: selectedlevel,  type: "tmx",  src: "data/levels/city_world/" + previouslevel + ".tmx"});
		}
		
		// load needed level
		me.loader.load({name: selectedlevel,  type: "tmx",  src: "data/levels/city_world/" + selectedlevel + ".tmx"}, this.onload.bind(this), this.onerror.bind(this));
		
		if (worldlevel == "world_city")
		{
			// I will want to load in all the city world specific assets here instead of preloading them. Not sure if I have to count them as resources (will it fire off the completed function if they are already loaded?)
			if (selectedlevel == "world_city")
			{
				bWorldLevel = true;
				current_audio_track = "title_screen_01";
				gravity = 0;
			}
			else
			{
				bWorldLevel = false;
				gravity = 0.40;
			}
			
			// need to set the different background offsets for each level as well as audio selects
			if (selectedlevel == "city_level_boss_01")
			{
				current_audio_track = "city_level_welcome_to_zombieville_guitar";
			}
			else if (selectedlevel == "city_level_01" || selectedlevel == "city_level_02")
			{
				current_audio_track = "city_level_welcome_to_zombieville_keyboard";
			}
			else if (selectedlevel == "city_level_05")
			{
				current_audio_track = "city_level_waking_nightmare";
			}
			else if (selectedlevel == "dave_test2")
			{
				current_audio_track = "city_level_undead_shuffle";
			}
			else
			{
				current_audio_track = "city_level_welcome_to_zombieville_keyboard";
			}
		}
		
		// load needed background music
		me.loader.load({name: current_audio_track,  type: "audio",  src: "data/audio/bgm/", channel: 2, stream: false}, this.onload.bind(this), this.onerror.bind(this));

		if (this.title == null) {
            // init stuff if not yet done
            this.title = me.loader.getImage('credits_screen');
			
			this.generic_smallFont = new me.Font("Tahoma",12,"white","left");
			this.generic_largeFont = new me.Font("Tahoma",18,"white","left");
			this.generic_largeFont_center = new me.Font("Tahoma",18,"white","center");
            this.whiteFont = new me.BitmapFont('16x16_font_white', 16);
            this.whiteFont.set("center");
            this.redFont = new me.BitmapFont('16x16_font', 16);
            this.redFont.set("center");
        }
		
    },
 
    // update function
    update: function() {
		//Pressing enter begins the game
        if (me.input.isKeyPressed('enter')){
			me.audio.play("zombie_generic");
			me.state.change(me.state.PLAY);
        }
		
        return true;
    },
 
    // draw function
    draw: function(context) {
        context.drawImage(this.title, 0, 0);
		
		// display loading screen tip after every delay
		this.loadingTip_timer +=  me.timer.tick / me.sys.fps;

		if (this.loadingTip_timer >= this.loadingTip_delay) {
			this.loadingTip_timer = 0;
			this.current_loadingTip = this.display_loadingTip();
			this.current_loadingAd = this.display_loadingAd();
		}
		
		this.generic_largeFont.draw(context, this.current_loadingTip, 15, 25);
		
		// display advertisement here
		this.generic_largeFont_center.draw(context, this.current_loadingAd, 384, 185);
		
		// Loading indicator and press start message once fully loaded
		if (this.progress < 100)
		{
			this.generic_largeFont.draw(context, "Loading " + this.progress + "%", 560, 395);
		}
		else if (this.progress >= 100)
		{
			this.generic_largeFont.draw(context, "Press Enter To Continue", 525, 395);
		}

		// Save indicator
		/*
		if (saveResult == 'success')
		{
			this.generic_largeFont.draw(context, "Save Successful", 15, 395);
		}
		else if (saveResult == "save_started")
		{
			this.generic_largeFont.draw(context, "Saving", 15, 395);
		}
		else
		{
			this.generic_largeFont.draw(context, saveResult, 15, 395);
		}
		*/
    },
 
    onDestroyEvent: function() {
		this.title = null;
        me.input.unbindKey(me.input.KEY.ENTER);
		me.input.unbindKey(me.input.KEY.UP);
		me.input.unbindKey(me.input.KEY.DOWN);
		me.input.unbindKey(me.input.KEY.ESCAPE);
 
    }
});