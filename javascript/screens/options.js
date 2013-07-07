//Splash Screen 
var OptionsScreen = me.ScreenObject.extend({
    // constructor
    init: function() {
        this.parent(true);
 
        // title screen image
        this.title = null;
		this.cursorPos = 75;
 
    },
 
    // reset function
    onResetEvent: function() {
        if (this.title == null) {
            // init stuff if not yet done
            this.title = me.loader.getImage('credits_screen');
			
			this.screenState = "options";
			
            // font to display the menu items
            this.fontRed = new me.BitmapFont('16x16_font', 16);
            this.fontRed.set("left");
            this.fontWhite = new me.BitmapFont('16x16_font_white', 16);
            this.fontWhite.set("left");
            this.fontGreen = new me.BitmapFont('16x16_font_green', 16);
            this.fontGreen.set("left");
			this.fontsmall = new me.Font("Tahoma",15,"white","left");
						
			this.difficultyArray = new Array("Easy","Normal","Hard","Monster");

			this.fontmedium_center = new me.Font("Tahoma",17,"white","center");
			this.alertBox = me.loader.getImage("tutorial_box");
			this.alertBox_timer = alertMessage_duration;
			
			currentDifficulty = saveData.currentDifficulty;
        }

		console.log(musicOn);
		bindKeys("bind","menu");
 
    },
	
	displayMessage: function(message) {
		this.alertMessage = message;
		this.showMessage = true;
	},
	
    // update function
    update: function() {
        
		console.log(this.cursorPos);
		
		if (this.screenState == "options")
		{
			
			if (me.input.isKeyPressed('enter')) 
			{
				if(this.cursorPos == 50){
					currentDifficulty = "Easy";
					currentModifier = easyModifier;
					this.displayMessage("Difficulty is now set to: \n \n "+currentDifficulty+"\n \n Health, Damage and Speed is affected");
					me.audio.play("zombie_hit");
				}
				
				if(this.cursorPos == 75){
					currentDifficulty = "Normal";
					currentModifier = normalModifier;
					this.displayMessage("Difficulty is now set to: \n \n "+currentDifficulty+"\n \n Health, Damage and Speed is affected");
					me.audio.play("zombie_hit");
				}
				
				if(this.cursorPos == 100){
					currentDifficulty = "Hard";
					currentModifier = hardModifier;
					this.displayMessage("Difficulty is now set to: \n \n "+currentDifficulty+"\n \n Health, Damage and Speed is affected");
					me.audio.play("zombie_hit");
				}
				
				if(this.cursorPos == 125){
					currentDifficulty = "Monster";
					currentModifier = monsterModifier;
					this.displayMessage("Difficulty is now set to: \n \n "+currentDifficulty+"\n \n Health, Damage and Speed is affected");
					me.audio.play("zombie_hit");
				}
				
				this.check_lowestDifficulty(currentDifficulty);
				
				if(this.cursorPos == 200){
					musicOn = true;
					me.audio.playTrack("title_screen_01");
					me.audio.unmuteAll();
					this.displayMessage("\n \n Audio is now ON");
					me.audio.play("zombie_hit");
				}
				
				if(this.cursorPos == 225){
					musicOn = false;
					//default_sfx_volume = 0;
					//me.audio.stop("title_screen_01");
					me.audio.muteAll();
					this.displayMessage("\n \n Audio is now OFF");
					me.audio.play("zombie_hit");
				}

				if(this.cursorPos == 275){
					this.screenState = "keyconfig_select";
					this.cursorPos = 50;
					me.audio.play("zombie_hit");
				}
				
				if(this.cursorPos == 400){
					me.state.change(MAIN_MENU_STATE);
					me.audio.play("zombie_hit");
				}
			}
				
			//Keeps the cursor from going up too far
			if(me.input.isKeyPressed('menuUp')){
				if (this.cursorPos == 50)
				{
					this.cursorPos += 350;
				}
				else if (this.cursorPos == 200)
				{
					this.cursorPos -= 75;
				}
				else if (this.cursorPos == 275)
				{
					this.cursorPos -= 50;
				}
				else if (this.cursorPos == 400)
				{
					this.cursorPos -= 125;
				}
				else
				{
					this.cursorPos -= 25;
				}
			}
			
			//Keeps the cursor from going down too far
			if(me.input.isKeyPressed('menuDown')){
				if (this.cursorPos == 400)
				{
					this.cursorPos -= 350;
				}
				else if (this.cursorPos == 125)
				{
					this.cursorPos += 75;
				}
				else if (this.cursorPos == 225)
				{
					this.cursorPos += 50;
				}
				else if (this.cursorPos == 275)
				{
					this.cursorPos += 125;
				}
				else
				{
					this.cursorPos += 25;
				}
			}
		}
		
		else if (this.screenState == "keyconfig_select")
		{
			if (me.input.isKeyPressed('enter')) 
			{
				if(this.cursorPos == 50){
					saveData.keyConfig = 1;
					this.displayMessage("Your keyboard configuration \n has been updated");
				}
				else if(this.cursorPos == 75){
					saveData.keyConfig = 2;
					this.displayMessage("Your keyboard configuration \n has been updated");
				}
				else if(this.cursorPos == 100){
					saveData.keyConfig = 3;
					this.displayMessage("Your keyboard configuration \n has been updated");
				}						
				else if(this.cursorPos == 400){
					this.screenState = "options";
				}
			}

			if (this.cursorPos == 50)
			{
				this.viewConfig = "Config 1";
			}
			else if (this.cursorPos == 75)
			{
				this.viewConfig = "Config 2";
			}
			else if (this.cursorPos == 100)
			{
				this.viewConfig = "Config 3";
			}
			
			//Keeps the cursor from going up too far
			if(me.input.isKeyPressed('menuUp')){
				if (this.cursorPos == 50)
				{
					this.cursorPos += 350;
				}
				else if (this.cursorPos == 400)
				{
					this.cursorPos -= 300;
				}
				else
				{
					this.cursorPos -= 25;
				}
			}
			
			//Keeps the cursor from going down too far
			if(me.input.isKeyPressed('menuDown')){
				if (this.cursorPos == 400)
				{
					this.cursorPos -= 350;
				}
				else if (this.cursorPos == 100)
				{
					this.cursorPos += 300;
				}
				else
				{
					this.cursorPos += 25;
				}
			}
		}

        return true;
    },
 
    // draw function
    draw: function(context) {
        context.drawImage(this.title, 0, 0);

 		// =============================
		// == OPTIONS SELECT SCREEN =====
		// =============================
		if (this.screenState == "options")
		{
			this.fontRed.draw(context, "->", 35, this.cursorPos);
			
			this.fontRed.draw(context, "Difficulty", 75, 25);
			
			if (currentDifficulty == "Easy")
			{
				this.fontGreen.draw(context, "Easy", 75, 50);
			}
			else
			{
				this.fontWhite.draw(context, "Easy", 75, 50);
			}

			if (currentDifficulty == "Normal")
			{
				this.fontGreen.draw(context, "Normal", 75, 75);
			}
			else
			{
				this.fontWhite.draw(context, "Normal", 75, 75);
			}
			
			if (currentDifficulty == "Hard")
			{
				this.fontGreen.draw(context, "Hard", 75, 100);
			}
			else
			{
				this.fontWhite.draw(context, "Hard", 75, 100);
			}
			
			if (currentDifficulty == "Monster")
			{
				this.fontGreen.draw(context, "MONSTER", 75, 125);
			}
			else
			{
				this.fontWhite.draw(context, "MONSTER", 75, 125);
			}
			
			
			
			this.fontRed.draw(context, "Music/SFX", 75, 175);
			if (musicOn)
			{
				this.fontGreen.draw(context, "On", 75, 200);
				this.fontWhite.draw(context, "Off", 75, 225);			
			}
			else
			{
				this.fontWhite.draw(context, "On", 75, 200);
				this.fontGreen.draw(context, "Off", 75, 225);			
			}

			
			this.fontWhite.draw(context, "Key Configuration", 75, 275);
			
			this.fontWhite.draw(context, "Main Menu", 75, 400);
		}
		
		else if (this.screenState == "keyconfig_select")
		{
			this.fontRed.draw(context, "->", 35, this.cursorPos);
			this.fontWhite.draw(context, "Back", 75, 400);
			
			this.fontRed.draw(context, "Keyboard Configs", 75, 25);
			
			if (saveData.keyConfig == 1)
			{
				this.fontGreen.draw(context, "Config 1", 75, 50);
			}
			else
			{
				this.fontWhite.draw(context, "Config 1", 75, 50);
			}

			if (saveData.keyConfig == 2)
			{
				this.fontGreen.draw(context, "Config 2", 75, 75);
			}
			else
			{
				this.fontWhite.draw(context, "Config 2", 75, 75);
			}
			
			if (saveData.keyConfig == 3)
			{
				this.fontGreen.draw(context, "Config 3", 75, 100);
			}
			else
			{
				this.fontWhite.draw(context, "Config 3", 75, 100);
			}
			
			this.fontRed.draw(context, "General", 75, 150);
			this.fontsmall.draw(context, "Pause: P", 75, 175);
			this.fontsmall.draw(context, "Accept: Enter", 75, 200);
			
			if (this.viewConfig == "Config 1")
			{
				this.fontRed.draw(context, this.viewConfig, 475, 25);
				
				this.fontsmall.draw(context, "Climb Up: Up Arrow", 475, 50);
				this.fontsmall.draw(context, "Climb Down: Down Arrow", 475, 75);
				this.fontsmall.draw(context, "Walk Left: Left Arrow", 475, 100);
				this.fontsmall.draw(context, "Walk Right: Right Arrow", 475, 125);
				
				this.fontsmall.draw(context, "Shoot: Z", 475, 175);
				this.fontsmall.draw(context, "Jump: Spacebar", 475, 200);
				this.fontsmall.draw(context, "Special Ability: G", 475, 225);
				
				this.fontWhite.draw(context, "Press Enter to \n use this config", 475, 275);
			}
			else if (this.viewConfig == "Config 2")
			{
				this.fontRed.draw(context, this.viewConfig, 475, 25);
				
				this.fontsmall.draw(context, "Climb Up: E", 475, 50);
				this.fontsmall.draw(context, "Climb Down: D", 475, 75);
				this.fontsmall.draw(context, "Walk Left: S", 475, 100);
				this.fontsmall.draw(context, "Walk Right: F", 475, 125);
				
				this.fontsmall.draw(context, "Shoot: K", 475, 175);
				this.fontsmall.draw(context, "Jump: J", 475, 200);
				this.fontsmall.draw(context, "Special Ability: L", 475, 225);
				
				this.fontWhite.draw(context, "Press Enter to \n use this config", 475, 275);
			}
		}
		



		// ===== DISPLAY MESSAGE POPUP =====
		if (this.showMessage == true)
		{
			if (this.alertBox_timer >= 0)
			{
				context.drawImage( this.alertBox, 350, 300 );
				this.fontmedium_center.draw(context, this.alertMessage, 560, 320);
				this.alertBox_timer--;
			}
			else
			{
				this.showMessage = false;
				this.alertBox_timer = alertMessage_duration;
			}
		}
    },
	
	check_lowestDifficulty: function()
	{
		// check if lowest difficulty is Easy. If so, no point in comparing anything
		if (saveData.lowestDifficulty == "Easy")
		{
			return false;
		}
		else if (saveData.lowestDifficulty == "")
		{
			saveData.currentDifficulty = currentDifficulty;
		}
		// check if the difficulties are different and update as necessary
		else if (saveData.lowestDifficulty != currentDifficulty)
		{
			this.saved_lowestDifficulty = in_array(saveData.lowestDifficulty,this.difficultyArray);
			this.lowestDifficulty = in_array(currentDifficulty,this.difficultyArray);
			
			if (this.lowestDifficulty < this.saved_lowestDifficulty)
			{
				saveData.lowestDifficulty = currentDifficulty;
				saveData.currentDifficulty = currentDifficulty;
			}
			else
			{
				return false;
			}
		}
	
	},
	
	updateDifficulty: function(){

	},
	
    // destroy function
    onDestroyEvent: function() {
        bindKeys("unbind","menu");
		this.title == null;
    }
});