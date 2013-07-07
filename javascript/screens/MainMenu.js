var menuButton = me.GUI_Object.extend({

    init: function(x, y, settings) {
        settings.image = "blank";
		//settings.spritewidth = 32;
		//settings.spriteheight = 48;
		this.action = settings.action;
		
		if (settings.obj)
		{
			this.obj = settings.obj
		}
		this.parent(x, y, settings);
		console.log(this.obj);
	},
    
    onClick: function() {
        console.log(this.action);
		
		if (this.action == 'newGame')
		{
 			//selectedlevel = "world_city";
			selectedlevel = "city_level_01";
			me.audio.play("zombie_brains");
			me.state.change(LEVEL_TRANSITION_STATE);       
		}
		else if (this.action == 'characterMenu')
		{
			me.state.change(CHARACTER_SELECT_STATE);
			me.audio.play("zombie_generic");     
		}
		else if (this.action == 'optionsMenu')
		{
			me.state.change(OPTIONS_STATE);
			me.audio.play("zombie_generic");
		}	
		else if (this.action == 'creditsMenu')
		{
			me.state.change(me.state.CREDITS);
			me.audio.play("zombie_generic");
		}
		else if (this.action == 'storyMenu')
		{
			me.state.change(STORY_STATE);
			me.audio.play("zombie_generic");
		}	
		else if (this.action == 'debugMenu')
		{
			me.state.change(DEBUG_STATE);
			me.audio.play("zombie_generic");
		}
		else if (this.action == 'level_loadComplete')
		{
			me.audio.play("zombie_generic");
			me.state.change(me.state.PLAY);
		}
		else if (this.action == 'endTutorial')
		{
			me.game.remove(this.obj);
		}
        return true;
    },

    draw: function() {
	
	}
});

//Splash Screen 
var MainMenu = me.ScreenObject.extend({
    // constructor
	
    init: function() {
        this.parent(true);
 
        this.title = null;
		this.cursorPos = null;
        this.font = null;
		this.selectFont = null;
        this.scrollerfont = null;
        this.scrollertween = null;
		this.creditsFont = null;
		this.optionsFont = null;
        var selectedlevel = null;
		
		if (saveData.selectedHero == "" || saveData.selectedHero == null)
		{
			saveData.selectedHero = "malyn";
		}

		me.audio.playTrack("title_screen_01");
		
		selectedHero = saveData.selectedHero;
		currentDifficulty = saveData.currentDifficulty;
		
		if (currentDifficulty == "Easy")
		{
			currentModifier = easyModifier;
		}
		else if (currentDifficulty == "Normal")
		{
			currentModifier = normalModifier;
		}
		else if (currentDifficulty == "Hard")
		{
			currentModifier = hardModifier;
		}
		else if (currentDifficulty == "Monster")
		{
			currentModifier = monsterModifier;
		}
		else if (currentDifficulty == "endTutorial")
		{
			me.game.remove(obj);
		}		
		
    },

    createButtons: function() {
		this.newButton = new menuButton(75, 275, { spritewidth: 130, spriteheight: 24, action: 'newGame' });
		me.game.add(this.newButton, 999);    
		
		this.newButton = new menuButton(75, 300, { spritewidth: 130, spriteheight: 24, action: 'characterMenu' });
		me.game.add(this.newButton, 999);

		this.newButton = new menuButton(75, 325, { spritewidth: 130, spriteheight: 24, action: 'optionsMenu' });
		me.game.add(this.newButton, 999);

		this.newButton = new menuButton(75, 350, { spritewidth: 130, spriteheight: 24, action: 'creditsMenu' });
		me.game.add(this.newButton, 999);

		this.newButton = new menuButton(75, 375, { spritewidth: 130, spriteheight: 24, action: 'storyMenu' });
		me.game.add(this.newButton, 999);		

		this.newButton = new menuButton(75, 250, { spritewidth: 130, spriteheight: 24, action: 'debugMenu' });
		me.game.add(this.newButton, 999);		
		
		me.game.sort();
	
	},

    // reset function
    onResetEvent: function() {
        if (this.title == null) {
            this.title = me.loader.getImage('menu_screen');
            this.font = new me.BitmapFont('16x16_font_white', 16);
            this.font.set("left");

			if (saveData.completedDemo == 1)
			{
				saveData.completedDemo++;
				checkAchievement("Complete the Demo");
			}
		
			if (introCompleted == true)
			{
				this.createButtons();
				this.menuState = "menu";
			}
			else
			{
				this.menuState = "intro";
			}
			
			if(musicOn)
			{
				//me.audio.playTrack("title_screen_01");
			}
			else
			{
				me.audio.stopTrack();
			}
			
			this.cursorPos = 275;
			
			this.fontRed = new me.BitmapFont('16x16_font', 16);
			this.fontRed.set("left");
	
			this.fontWhite = new me.BitmapFont('16x16_font_white', 16);
			this.fontWhite.set("left");

			this.s001= me.loader.getImage("renter_03");
			this.s002= me.loader.getImage("renter_04");
			this.s003= me.loader.getImage("renter_05");
			this.s004= me.loader.getImage("renter_06");
			this.s005= me.loader.getImage("renter_07");
			this.s006= me.loader.getImage("renter_06");
			this.s007= me.loader.getImage("renter_05");
			this.s008= me.loader.getImage("renter_04");
			this.s009= me.loader.getImage("renter_03");
            this.s010= me.loader.getImage("renter_02");
            this.s011= me.loader.getImage("renter_01");
            this.s012= me.loader.getImage("renter_00");
			this.s013 = me.loader.getImage("MainMenu_intro_00297");
			this.s014 = me.loader.getImage("MainMenu_intro_00298");
			this.s015 = me.loader.getImage("MainMenu_intro_00299");
			this.s016 = me.loader.getImage("MainMenu_intro_00003");
			this.s017 = me.loader.getImage("MainMenu_intro_00012");
			this.s018 = me.loader.getImage("MainMenu_intro_00019");
			this.s019 = me.loader.getImage("MainMenu_intro_00029");
			this.s020 = me.loader.getImage("MainMenu_intro_00040");
			this.s021 = me.loader.getImage("MainMenu_intro_00067");
			this.s022 = me.loader.getImage("MainMenu_intro_00091");
			this.s023 = me.loader.getImage("MainMenu_intro_00101");
			this.s024 = me.loader.getImage("MainMenu_intro_00123");
			this.s025 = me.loader.getImage("menu_screen");
			this.still_array = new Array(this.s001,this.s002,this.s003,this.s004,this.s005,this.s006,this.s007,this.s008,this.s009,this.s010,this.s011,this.s012,this.s013,this.s014,this.s015,this.s016,this.s017,this.s018,this.s019,this.s020,this.s021,this.s022,this.s023,this.s024,this.s025);

			this.timerSpeed = 2;
			this.counter = this.timerSpeed;
			this.still_counter = 0;			
			this.max_still = 24;
		
        }
 
        // enable the keyboard
		bindKeys("bind","menu");
		
    },
 
    // update function
    update: function() {
	
		if (this.menuState == "intro")
		{
			if( me.input.isKeyPressed('enter'))
			{
				this.menuState = "menu";
				//me.state.change(MAIN_MENU_STATE);
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
					//me.state.change(MAIN_MENU_STATE);
					this.menuState = "menu";
				}
				
				if (this.still_counter == 4)
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
		}
		else
		{
			//Pressing enter begins the game
			if (me.input.isKeyPressed('enter')){
				//Begin the game
				if(this.cursorPos == 275){
					//selectedlevel = "world_city";
					selectedlevel = "city_level_01";
					me.audio.play("zombie_brains");
					me.state.change(LEVEL_TRANSITION_STATE);
				}
				//View the credits screen
				if(this.cursorPos == 300){
					me.state.change(CHARACTER_SELECT_STATE);
					me.audio.play("zombie_generic");
				}
				//View the options screen
				if(this.cursorPos == 325){
					me.state.change(OPTIONS_STATE);
					me.audio.play("zombie_generic");
				}
				//View the options screen
				if(this.cursorPos == 350){
					me.state.change(me.state.CREDITS);
					me.audio.play("zombie_generic");
				}
				if(this.cursorPos == 375){
					me.state.change(STORY_STATE);
					me.audio.play("zombie_generic");
				}
				//Debug levels
				if(this.cursorPos == 250){
					me.state.change(DEBUG_STATE);
					me.audio.play("zombie_generic");
				}
			}
			
			//Keeps the cursor from going up too far
			if(me.input.isKeyPressed('menuUp')){
				if (this.cursorPos == 250)
				{
					this.cursorPos += 125;
				}
				else
				{
					this.cursorPos -= 25;
				}
			}
			
			//Keeps the cursor from going down too far
			if(me.input.isKeyPressed('menuDown')){
				if (this.cursorPos == 375)
				{
					this.cursorPos -= 125;
				}
				else
				{
					this.cursorPos += 25;
				}
			}
			
			return true;
		}
    },
 
    // draw function
    draw: function(context) {
		
		if (this.menuState == "intro")
		{
			if (this.still_counter < this.max_still)
			{
				context.drawImage( this.still_array[this.still_counter], 0, 0 );
			}
		}
		else
		{
			if (introCompleted != true)
			{
				this.createButtons();
			
			}
			
			introCompleted = true;
			
			context.drawImage(this.title, 0, 0);
	 
			//Draw the all the text for the Main Menu
			this.fontRed.draw(context, "->", 35, this.cursorPos);
			this.fontWhite.draw(context, "New Game", 75, 275);
			this.fontWhite.draw(context, "Characters", 75, 300);
			this.fontWhite.draw(context, "Options", 75, 325);
			this.fontWhite.draw(context, "Credits", 75, 350);
			this.fontWhite.draw(context, "Story", 75, 375);
			this.fontWhite.draw(context, "debug level loader", 75, 250);
		}
    },
 
    // destroy function
    onDestroyEvent: function() {
		this.title = null;
		bindKeys("unbind","menu");

    }
});