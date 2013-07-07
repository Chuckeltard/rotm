// ========================
// ======= Health HUD =======
// ========================

// Player Health
var HealthHUDObject = me.HUD_Item.extend({
	init: function(x, y){
		this.parent(x, y);

		this.font = new me.BitmapFont('16x16_font', 16);
        this.hud_box = me.loader.getImage("hud_box");
	},
	
	draw: function(context, x, y){
		context.drawImage( this.hud_box, 0, 0 );
        this.font.draw(context, "HEALTH", 15, 10);
		this.font.draw(context, this.value, 120, 10);       
	}
});

var DebugHUDObject = me.HUD_Item.extend({
	init: function(x, y){
		this.parent(x, y);

		this.font = new me.BitmapFont('16x16_font', 16);
	},
	
	draw: function(context, x, y){
		this.font.draw(context, this.value, this.pos.x + x, this.pos.y + y);
	}
});

// ============================
// ======= Collectibles HUD =======
// ============================
// Key HUD
var Collectible_01_HUDObject = me.HUD_Item.extend({
	init: function(x, y){
		this.parent(x, y);

		this.font = new me.BitmapFont('16x16_font', 16);
		this.font.set("center");
		this.keyIcon = me.loader.getImage("icon_key");
        this.hud_box = me.loader.getImage("hud_box2");
	},
	
	draw: function(context, x, y){
        //context.drawImage( this.hud_box, 580, 3 );
		context.drawImage( this.keyIcon, 675, 10 );
		this.font.draw(context, saveData["key_currency"], 717, 12);
	}
});

// Listing HUD
var Collectible_02_HUDObject = me.HUD_Item.extend({
	init: function(x, y){
		this.parent(x, y);

		this.font = new me.BitmapFont('16x16_font', 16);
		this.font.set("center");
        this.hud_box = me.loader.getImage("hud_box2");
		this.listingIcon = me.loader.getImage("icon_listing");

	},
	
	draw: function(context, x, y){
        context.drawImage( this.hud_box, 490, 0 );
		context.drawImage( this.listingIcon, 665, 38 );
		this.font.draw(context, saveData["listing_pickup"], 717, 40);
	}
});

/* Health Pickup
var Collectible_03_HUDObject = me.HUD_Item.extend({
	init: function(x, y){
		this.parent(x, y);
		//create a font
		this.font = new me.BitmapFont('16x16_font', 16);
        this.hud_box = me.loader.getImage("hud_box2");
        this.healthIcon = me.loader.getImage("health_drop");
	},
	
	draw: function(context, x, y){
        context.drawImage( this.hud_box, 645, 0 );
		//context.drawImage( this.healthIcon, this.pos.x -35, this.pos.y + y );
		//this.font.draw(context, me.gamestat.getItemValue("health_pickup"), this.pos.x + x, this.pos.y + y);
		this.font.draw(context, saveData["health_pickup"], 705, 50);
	}
});

*/
// ===============================
// ======= Achievement Display =======
// ===============================
var displayAchievement = me.ObjectEntity.extend({
	init: function(x, y, settings){
		//call parent constructor
		this.parent(x, y, settings);
		
		this.achievement = settings.achievement;
		
		this.spritewidth = 100;
		this.spriteheight = 100;
		
		this.alwaysUpdate = true;
		this.floating = true;
		this.inViewport = true;
		this.isPersistent = true;
		
		this.type = me.game.LEVEL_OBJECT;

		this.titleFont = new me.BitmapFont('16x16_font', 16);
		this.titleFont.set("center");
		
		this.font = new me.Font("Tahoma",15,"white","center");
		
        this.fontsmall = new me.Font("Tahoma",12,"white","center");
		this.fontsmall_right = new me.Font("Tahoma",12,"white","right");

		this.fontRed = new me.BitmapFont('16x16_font', 16);
	
		this.tutorial_box = me.loader.getImage("tutorial_box");

		this.fontmedium_center = new me.Font("Tahoma",17,"white","center");
		
		this.alertBox_timer = alertMessage_duration;
		//this.alertBox_timer = 100000;
			
	},

	update: function()
	{
		
	},
	
	draw: function(context)
	{
		// ===== DISPLAY MESSAGE POPUP =====

		if (this.alertBox_timer >= 0)
		{
			//context.drawImage(this.tutorial_box, 350, 0 );
			
			this.titleFont.draw(context, "Achievement\nUnlocked:", 384, 10);
			this.font.draw(context, this.achievement, 384, 60);

			this.alertBox_timer--;
		}
		else
		{
			me.game.remove(this);
		}	
		
	},

	onDestroyEvent: function(){

	},

});

// =========================
// ======= Pause Menu =======
// =========================
var pauseMenu = me.ObjectEntity.extend({
	init: function(x, y, settings){
	
		//call parent constructor
		this.parent(x, y, settings);
		
		this.spritewidth = 100;
		this.spriteheight = 100;
		
		this.alwaysUpdate = true;
		this.floating = true;
		this.inViewport = true;
		
		this.type = me.game.LEVEL_OBJECT;
		
		this.font = new me.Font("Tahoma",15,"white","left");
        this.fontsmall = new me.Font("Tahoma",12,"white","center");
		this.fontsmall_right = new me.Font("Tahoma",12,"white","right");
		this.titleFont = new me.BitmapFont('16x16_font', 16);
		this.titleFont.set("center");
		this.fontRed = new me.BitmapFont('16x16_font', 16);
	
		this.tutorial_box = me.loader.getImage("tutorial_box");

		this.cursorPosY = 140;
        this.cursorPosX = 175;

		this.fontmedium_center = new me.Font("Tahoma",17,"white","center");
		this.alertBox = me.loader.getImage("tutorial_box");
		this.alertBox_timer = alertMessage_duration;
		
		gameisPaused = true;

		// Disable game controls and initialize menu controls here
		// disable gameplay controls
 		bindKeys("unbind","gameplay");
		me.input.unbindKey(me.input.KEY.P);
		me.input.unbindKey(me.input.KEY.ENTER);
		
		// enable menu controls
		bindKeys("bind","menu");
		me.input.bindKey(me.input.KEY.P, "unPause", true);
		me.input.bindKey(me.input.KEY.ESC, "unPause", true);
		
	},

	displayMessage: function(message) {
		this.alertMessage = message;
		this.showMessage = true;
	},
	
	update: function()
	{
		
		if (me.input.isKeyPressed('enter')) 
		{
			
			if(this.cursorPosY == 140)
			{
				me.audio.unmuteAll();
				this.displayMessage("\n \n Audio is now ON");
			}
			
			if(this.cursorPosY == 165)
			{
				me.audio.muteAll();
				this.displayMessage("\n \n Audio is now OFF");
			}
			
			if(this.cursorPosY == 240)
			{
				previouslevel = selectedlevel;
				selectedlevel = "world_city";
				
				// save updated player data here
				save_user_data();
				
				me.state.change(LEVEL_TRANSITION_STATE);
			}
			
			if(this.cursorPosY == 265)
			{
				// save updated player data here
				save_user_data();
				
				me.state.change(MAIN_MENU_STATE);
			}
			
		}

		if (me.input.isKeyPressed('unPause')) {
			me.game.remove(this);
		}
		
		if(me.input.isKeyPressed('menuUp')){
			if (this.cursorPosY == 140)
			{
				this.cursorPosY += 125;
			}
			else if (this.cursorPosY == 240)
			{
				this.cursorPosY -= 75;
			}
			else
			{
				this.cursorPosY -= 25;
			}		
		}
		
		if(me.input.isKeyPressed('menuDown')){
			if (this.cursorPosY == 265)
			{
				this.cursorPosY -= 125;
			}
			else if (this.cursorPosY == 165)
			{
				this.cursorPosY += 75;
			}
			else
			{
				this.cursorPosY += 25;
			}		
		}
		
	},
	
	draw: function(context)
	{
		//context.drawImage(this.tutorial_box, 135, 100 );
		
		this.titleFont.draw(context, "->", this.cursorPosX, this.cursorPosY);
		
		this.titleFont.draw(context, "Pause \n Menu", 495, 115);
		
		this.fontRed.draw(context, "Music/SFX", 195, 115);
        this.font.draw(context, "Music On", 195, 140);
		this.font.draw(context, "Music Off", 195, 165);
		
		this.fontRed.draw(context, "Exit Level", 195, 215);
		this.font.draw(context, "World Map", 195, 240);
		this.font.draw(context, "Main Menu", 195, 265);
		
		this.fontsmall_right.draw(context, 'Press "P" to continue', 540, 236);	
		
		// ===== DISPLAY MESSAGE POPUP =====
		if (this.showMessage == true)
		{
			if (this.alertBox_timer >= 0)
			{
				context.drawImage( this.alertBox, 350, 300 );
				this.fontmedium_center.draw(context, this.alertMessage, 560, 325);
				this.alertBox_timer--;
			}
			else
			{
				this.showMessage = false;
				this.alertBox_timer = alertMessage_duration;
			}
		}
	},

	onDestroyEvent: function(){
        // disable menu controls
		bindKeys("unbind","menu");
		
		// re-enable gameplay controls
		bindKeys("bind","gameplay");
		
		me.game.player.playerState = "alive";
		gameisPaused = false;
	},

});

