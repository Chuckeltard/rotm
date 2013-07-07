 //Splash Screen 
var CharacterSelectScreen = me.ScreenObject.extend({
    // constructor
    init: function() {
        this.parent(true);
 
        // title screen image
        this.title = null;
 
        this.font = null;
		this.arrow = null;

    },
 
    // reset function
    onResetEvent: function() {
		//if (this.title == null) {
            // init stuff if not yet done
			this.cursorPosY = 75;
			this.cursorPosX = 35;
			
            this.title = me.loader.getImage('credits_screen');
			
			this.screenState = "character_select"; // character select and upgrade select
            // font to display the menu items
            this.fontRed = new me.BitmapFont('16x16_font', 16);
            this.fontRed.set("left");
            this.fontRed_center = new me.BitmapFont('16x16_font', 16);
            this.fontRed_center.set("center");
            this.fontWhite = new me.BitmapFont('16x16_font_white', 16);
            this.fontWhite.set("left");
            this.fontGreen = new me.BitmapFont('16x16_font_green', 16);
            this.fontGreen.set("left");
            //this.fontWhite_center = new me.BitmapFont('16x16_font_white', 16);
            //this.fontWhite_center.set("center");
 			this.malynIcon = me.loader.getImage("malyn_icon");
			this.meenaIcon = me.loader.getImage("meena_icon");
			this.fontsmall = new me.Font("Tahoma",15,"white","left");
			this.fontmedium_center = new me.Font("Tahoma",17,"white","center");
			
			this.keyBox = me.loader.getImage("hud_box");
			this.alertBox = me.loader.getImage("confirmation_box");
			this.alertBox_timer = alertMessage_duration;
			
			this.current_upgrade_level = new Array();
		//}

        // enable the keyboard
		bindKeys("bind","menu");
 
    },
 
	displayMessage: function(message) {
		this.alertMessage = message;
		this.showMessage = true;
	},

	updatePlayerData: function(type) {

		if (type == "view")
		{
			if (this.viewHero == "Malyn")
			{
				this.view_upgrade_health = saveData.upgrade_malyn_health;
				this.view_upgrade_damage = saveData.upgrade_malyn_damage;
				this.view_upgrade_attackrate = saveData.upgrade_malyn_attackrate;
				this.view_upgrade_movespeed = saveData.upgrade_malyn_movespeed;
				this.view_upgrade_abilityunlocked = saveData.upgrade_malyn_abilityunlocked;
				this.view_upgrade_abilityunlocked_upgrade01 = saveData.upgrade_malyn_abilityunlocked_upgrade01;
				this.view_upgrade_abilityunlocked_upgrade02 = saveData.upgrade_malyn_abilityunlocked_upgrade02;
				//this.view_upgrade_abilitydamage = saveData.upgrade_malyn_abilitydamage;
			}
			else if (this.viewHero == "Meena")
			{						
				this.view_upgrade_health = saveData.upgrade_meena_health;
				this.view_upgrade_damage = saveData.upgrade_meena_damage;
				this.view_upgrade_attackrate = saveData.upgrade_meena_attackrate;
				this.view_upgrade_movespeed = saveData.upgrade_meena_movespeed;
				this.view_upgrade_abilityunlocked = saveData.upgrade_meena_abilityunlocked;
				this.view_upgrade_abilityunlocked_upgrade01 = saveData.upgrade_meena_abilityunlocked_upgrade01;
				this.view_upgrade_abilityunlocked_upgrade02 = saveData.upgrade_meena_abilityunlocked_upgrade02;
				//this.view_upgrade_abilitydamage = saveData.upgrade_meena_abilitydamage;
			}
		}	
		else if (type == "update")
		{
			if (this.viewHero == "Malyn")
			{
				upgrade_health = saveData.upgrade_malyn_health;
				upgrade_damage = saveData.upgrade_malyn_damage;
				upgrade_attackrate = saveData.upgrade_malyn_attackrate;
				upgrade_movespeed = saveData.upgrade_malyn_movespeed;
				//upgrade_abilitycooldown = saveData.upgrade_malyn_abilitycooldown;
				//upgrade_abilitydamage = saveData.upgrade_malyn_abilitydamage;		
			}
			else if (this.viewHero == "Meena")
			{
				upgrade_health = saveData.upgrade_meena_health;
				upgrade_damage = saveData.upgrade_meena_damage;
				upgrade_attackrate = saveData.upgrade_meena_attackrate;
				upgrade_movespeed = saveData.upgrade_meena_movespeed;
				//upgrade_abilitycooldown = saveData.upgrade_meena_abilitycooldown;
				//upgrade_abilitydamage = saveData.upgrade_meena_abilitydamage;		
			}
		}

	
	
	},
	
    // update function
    update: function() {
			
			if (this.screenState == "character_select")
			{
				//Keeps the cursor from going up too far
				if(me.input.isKeyPressed('menuUp')){
					if (this.cursorPosY == 75)
					{
						this.cursorPosY += 325;
					}
					else if (this.cursorPosY == 400)
					{
						this.cursorPosY -= 250;
					}
					else
					{
						this.cursorPosY -= 75;
					}			
				}
				
				//Keeps the cursor from going down too far
				if(me.input.isKeyPressed('menuDown') && this.cursorPosY <= 400){
					if (this.cursorPosY == 400)
					{
						this.cursorPosY -= 325;
					}
					else if (this.cursorPosY == 175)
					{
						this.cursorPosY += 225;
					}
					else if (this.cursorPosY == 150)
					{
						this.cursorPosY += 250;
					}
					else
					{
						this.cursorPosY += 75;
					}
				}
		
				if (me.input.isKeyPressed('enter')) {
				
					me.audio.play("player_gunshot");
					
					me.input.unbindKey(me.input.KEY.LEFT);
					me.input.unbindKey(me.input.KEY.RIGHT);
		
					if(this.cursorPosX == 35 && this.cursorPosY == 75){
						this.viewHero = "Malyn";
						this.updatePlayerData("view");
					}
				
					if(this.cursorPosX == 35 && this.cursorPosY == 150){
						this.viewHero = "Meena";
						this.updatePlayerData("view");
					}
				
					if(this.cursorPosX == 35 && this.cursorPosY == 400){
						me.state.change(MAIN_MENU_STATE);
					}
					else
					{
						this.screenState = "upgrade_select";
						this.cursorPosY = 225;
						this.cursorPosX = 35;
						this.cursorJump = 25;
						me.input.bindKey(me.input.KEY.LEFT, "menuLeft", true);
						me.input.bindKey(me.input.KEY.RIGHT, "menuRight", true);
						me.game.repaint();
					}
				}
			}
			else if (this.screenState == "upgrade_select")
			{
				//Keeps the cursor from going up too far
				if(me.input.isKeyPressed('menuUp') && this.cursorPosY >= 225){
					if (this.cursorPosY == 225)
					{
						this.cursorPosY += 175;
					}
					else if (this.cursorPosY == 400)
					{
						this.cursorPosY -= 75;
					}
					else
					{
						this.cursorPosY -= 25;
					}			
				}
				//Keeps the cursor from going down too far
				if(me.input.isKeyPressed('menuDown') && this.cursorPosY <= 400){
					if (this.cursorPosY == 400)
					{
						this.cursorPosY -= 175;
					}
					else if (this.cursorPosY == 325)
					{
						this.cursorPosY += 75;
					}
					else
					{
						this.cursorPosY += 25;
					}
				}
				//Keeps the cursor from going left far
				if(me.input.isKeyPressed('menuLeft') && this.cursorPosX > 50 && this.cursorPosY == 400){
					this.cursorPosX -= 450;			
				}
				
				//Keeps the cursor from going right too far
				if(me.input.isKeyPressed('menuRight') && this.cursorPosX < 450 && this.cursorPosY == 400){
					this.cursorPosX += 450;
				}
				
				if (me.input.isKeyPressed('enter')) {

					me.audio.play("player_gunshot");
					// Select an upgrade to view
					if(this.cursorPosX == 35 && this.cursorPosY == 225){
						this.viewUpgrade = "Health";
					}
					if(this.cursorPosX == 35 && this.cursorPosY == 250){
						this.viewUpgrade = "Damage";
					}
					if(this.cursorPosX == 35 && this.cursorPosY == 275){
						this.viewUpgrade = "Attack Rate";
					}
					if(this.cursorPosX == 35 && this.cursorPosY == 300){
						this.viewUpgrade = "Movement Speed";
					}
					if(this.cursorPosX == 35 && this.cursorPosY == 325){
						this.viewUpgrade = "Special Ability";
					}
					
					if(this.cursorPosX == 35 && this.cursorPosY == 400){
						this.cursorPosY = 400;
						this.cursorPosX = 35;
						this.viewHero = null;
						this.screenState = "character_select";
						me.game.repaint();	
					}
					else if (this.cursorPosX == 485 && this.cursorPosY == 400){
						selectedHero = this.viewHero.toLowerCase();
						saveData.selectedHero = selectedHero;
						// show a success message
						this.displayMessage("You are now playing as \n \n "+this.viewHero+"!");
						this.updatePlayerData("update");
						
						this.cursorPosY = 400;
						this.cursorPosX = 35;
					}
					else
					{
						this.screenState = "purchase_select";
						this.cursorPosY = 250;
						this.cursorPosX = 435;
						me.game.repaint();	
					}
				}
			}
			else if (this.screenState == "purchase_select")
			{
				//Keeps the cursor from going up too far
				if(me.input.isKeyPressed('menuUp')){
					if (this.cursorPosY == 225)
					{
						this.cursorPosY += 25;
					}
					else if (this.cursorPosY == 250)
					{
						this.cursorPosY -= 25;
					}
					else
					{
						this.cursorPosY -= 25;
					}			
				}
				//Keeps the cursor from going down too far
				if(me.input.isKeyPressed('menuDown')){
					if (this.cursorPosY == 250)
					{
						this.cursorPosY -= 25;
					}
					else if (this.cursorPosY == 200)
					{
						this.cursorPosY += 25;
					}
					else
					{
						this.cursorPosY += 25;
					}
				}
			
				if (me.input.isKeyPressed('enter')) {
					
					me.audio.play("player_gunshot");
					
					if(this.cursorPosY == 225 && this.allowUpgrade == true){

						// subtract cost of upgrade from player currency
						saveData.key_currency -= this.currentUpgradeCost;
						
						if (this.viewHero == "Malyn")
						{
							if (this.viewUpgrade == "Health")
							{
								saveData.upgrade_malyn_health += 10;
								this.view_upgrade_health = saveData.upgrade_malyn_health;
							}
							else if (this.viewUpgrade == "Damage")
							{
								saveData.upgrade_malyn_damage += 10;
								this.view_upgrade_damage = saveData.upgrade_malyn_damage;
							}
							else if (this.viewUpgrade == "Attack Rate")
							{
								saveData.upgrade_malyn_attackrate += 5;
								this.view_upgrade_attackrate = saveData.upgrade_malyn_attackrate;
							}
							else if (this.viewUpgrade == "Movement Speed")
							{
								saveData.upgrade_malyn_movespeed += 3;
								this.view_upgrade_movespeed = saveData.upgrade_malyn_movespeed;
							}
							else if (this.viewUpgrade == "Special Ability")
							{
								if (this.currentSpecialUpgrade == "upgrade_abilityunlocked")
								{
									saveData.upgrade_malyn_abilityunlocked = 1;
									this.view_upgrade_abilityunlocked = saveData.upgrade_malyn_abilityunlocked;
								}
								else if (this.currentSpecialUpgrade == "upgrade_abilityunlocked_upgrade01")
								{
									saveData.upgrade_malyn_abilityunlocked_upgrade01 = 1;
									this.view_upgrade_abilityunlocked_upgrade01 = saveData.upgrade_malyn_abilityunlocked_upgrade01;
								}
								else if (this.currentSpecialUpgrade == "upgrade_abilityunlocked_upgrade02")
								{
									saveData.upgrade_malyn_abilityunlocked_upgrade02 = 1;
									this.view_upgrade_abilityunlocked_upgrade02 = saveData.upgrade_malyn_abilityunlocked_upgrade02
								}
							}
						}
						else if (this.viewHero == "Meena")
						{
							if (this.viewUpgrade == "Health")
							{
								saveData.upgrade_meena_health += 10;
								this.view_upgrade_health = saveData.upgrade_meena_health;
							}
							else if (this.viewUpgrade == "Damage")
							{
								saveData.upgrade_meena_damage += 10;
								this.view_upgrade_damage = saveData.upgrade_meena_damage;
							}
							else if (this.viewUpgrade == "Attack Rate")
							{
								saveData.upgrade_meena_attackrate += 5;
								this.view_upgrade_attackrate = saveData.upgrade_meena_attackrate;
							}
							else if (this.viewUpgrade == "Movement Speed")
							{
								saveData.upgrade_meena_movespeed += 3;
								this.view_upgrade_movespeed = saveData.upgrade_meena_movespeed;
							}
							else if (this.viewUpgrade == "Special Ability")
							{
								if (this.currentSpecialUpgrade == "upgrade_abilityunlocked")
								{
									saveData.upgrade_meena_abilityunlocked = 1;
									this.view_upgrade_abilityunlocked = saveData.upgrade_meena_abilityunlocked;
								}
								else if (this.currentSpecialUpgrade == "upgrade_abilityunlocked_upgrade01")
								{
									saveData.upgrade_meena_abilityunlocked_upgrade01 = 1;
									this.view_upgrade_abilityunlocked_upgrade01 = saveData.upgrade_meena_abilityunlocked_upgrade01;
								}
								else if (this.currentSpecialUpgrade == "upgrade_abilityunlocked_upgrade02")
								{
									saveData.upgrade_meena_abilityunlocked_upgrade02 = 1;
									this.view_upgrade_abilityunlocked_upgrade02 = saveData.upgrade_meena_abilityunlocked_upgrade02
								}
							}
						}
						
						this.displayMessage("You purchased a \n \n "+this.viewUpgrade+" \n \n upgrade for "+this.viewHero+" !");
						
						// save updated player data here
						save_user_data();
					}
					
					if(this.cursorPosY == 250){
						this.cursorPosY = 225;
						this.cursorPosX = 35;
						//this.viewHero = null;
						this.screenState = "upgrade_select";
						me.game.repaint();	
					}
				}
			}		
		/*
		//Keeps the cursor from going left far
        if(me.input.isKeyPressed('menuLeft') && this.cursorPosX > 50){
			this.cursorPosX -= 425;			
		}
		
		//Keeps the cursor from going right too far
		if(me.input.isKeyPressed('menuRight') && this.cursorPosX < 450){
			this.cursorPosX += 425;
		}
		*/
        return true;
    },
 
    // draw function
    draw: function(context) {
        context.drawImage(this.title, 0, 0);
 
 		// ==================================
		// == CHARACTER SELECT SCREEN =====
		// ==================================
		if (this.screenState == "character_select")
		{
			this.fontRed.draw(context, "->", this.cursorPosX, this.cursorPosY);
			
			this.fontRed.draw(context, "Heroes", 75, 25);
		
			context.drawImage( this.malynIcon, 75, 55); 
			if (saveData.selectedHero == "malyn")
			{
				this.fontGreen.draw(context, "Malyn", 130, 73);
			}
			else
			{
				this.fontWhite.draw(context, "Malyn", 130, 73);
			}
			
			if (saveData.selectedHero == "meena")
			{
				this.fontGreen.draw(context, "Meena", 130, 147);
			}
			else
			{
				this.fontWhite.draw(context, "Meena", 130, 147);
			}
			
			context.drawImage( this.meenaIcon, 80, 137); 
			
			
			this.fontWhite.draw(context, "Main Menu", 75, 400);
		}

		// ==================================
		// == PURCHASE UPGRADES SCREEN ===
		// ==================================
		else if (this.screenState == "upgrade_select" || this.screenState == "purchase_select")
		{
			this.fontRed.draw(context, "->", this.cursorPosX, this.cursorPosY);
			
			if (this.viewHero == "Malyn")
			{
				this.fontRed.draw(context, "Malyn", 75, 25);
				this.fontsmall.draw(context, "Our main hero when exploring the world of \n RenterMonsters. She can chew through \n monsters with her chain gun and grenades \n and is fairly resilient against enemies. \n \n Meaning: Little Warrior", 75, 50);
				

			}
			else if (this.viewHero == "Meena")
			{
				this.fontRed.draw(context, "Meena", 75, 25);
				this.fontsmall.draw(context, "Meena is the smaller and quicker version of \n Malyn. While not quite as tough or destructive, \n she still has a chain gun at her disposal as well \n as sleep grenades to knock out her enemies \n \n Meaning: Tiny", 75, 50);
			}
			
			// ===== PURCHASE SCREEN ONLY =====
			if (this.screenState == "purchase_select")
			{
				// ===========================
				// ===== HEALTH UPGRADE =====
				// ===========================
				if (this.viewUpgrade == "Health")
				{
					this.fontRed.draw(context, this.viewUpgrade, 475, 25);
					this.fontsmall.draw(context, "You can increase "+this.viewHero+"'s health to \n be able to take more damage from \n enemies.", 475, 50);
					
					this.fontsmall.draw(context, "Increase:", 475, 125);
					
					if (this.view_upgrade_health == 0)
					{
						this.fontsmall.draw(context, "10%", 560, 125);
						this.fontsmall.draw(context, "20%", 625, 125);
						this.fontsmall.draw(context, "30%", 690, 125);
						
						this.currentUpgradeCost = purchaseData.upgrade_health_1;
						
						this.fontsmall.draw(context, "Upgrade Cost: " +purchaseData.upgrade_health_1 + " Keys", 475, 175);

						if (saveData.key_currency < purchaseData.upgrade_health_1 || saveData.key_currency == 0)
						{
							this.fontRed.draw(context, "Need More Keys", 475, 225);
							this.allowUpgrade = false;					
						}
						else
						{
							this.fontWhite.draw(context, "Purchase Upgrade", 475, 225);
							this.allowUpgrade = true;
						}
					}
					else if (this.view_upgrade_health == 10)
					{
						this.fontRed.draw(context, "10%", 550, 125);
						this.fontsmall.draw(context, "20%", 625, 125);
						this.fontsmall.draw(context, "30%", 690, 125);
						
						this.currentUpgradeCost = purchaseData.upgrade_health_2;
						
						this.fontsmall.draw(context, "Upgrade Cost: " +purchaseData.upgrade_health_2 + " Keys", 475, 175);
						
						if (saveData.key_currency < purchaseData.upgrade_health_2 || saveData.key_currency == 0)
						{
							this.fontRed.draw(context, "Need More Keys", 475, 225);
							this.allowUpgrade = false;					
						}
						else
						{
							this.fontWhite.draw(context, "Purchase Upgrade", 475, 225);
							this.allowUpgrade = true;
						}						
					}
					else if (this.view_upgrade_health == 20)
					{
						this.fontsmall.draw(context, "10%", 560, 125);
						this.fontRed.draw(context, "20%", 615, 125);
						this.fontsmall.draw(context, "30%", 690, 125);
						
						this.currentUpgradeCost = purchaseData.upgrade_health_3;
						
						this.fontsmall.draw(context, "Upgrade Cost: " +purchaseData.upgrade_health_3 + " Keys", 475, 175);
						
						if (saveData.key_currency < purchaseData.upgrade_health_3 || saveData.key_currency == 0)
						{
							this.fontRed.draw(context, "Need More Keys", 475, 225);
							this.allowUpgrade = false;					
						}
						else
						{
							this.fontWhite.draw(context, "Purchase Upgrade", 475, 225);
							this.allowUpgrade = true;
						}
					}
					else if (this.view_upgrade_health == 30)
					{
						this.fontsmall.draw(context, "10%", 560, 125);
						this.fontsmall.draw(context, "20%", 625, 125);
						this.fontRed.draw(context, "30%", 685, 125);

						this.fontWhite.draw(context, "Upgrade Complete", 475, 225);
						this.allowUpgrade = false;
					}
				}
				
				// ===========================
				// ===== DAMAGE UPGRADE ====
				// ===========================
				else if (this.viewUpgrade == "Damage")
				{
					this.fontRed.draw(context, this.viewUpgrade, 475, 25);
					this.fontsmall.draw(context, "You can increase "+this.viewHero+"'s damage to \n chew through enemies faster!", 475, 50);
					
					this.fontsmall.draw(context, "Increase:", 475, 125);
					
					if (this.view_upgrade_damage == 0)
					{
						this.fontsmall.draw(context, "10%", 560, 125);
						this.fontsmall.draw(context, "20%", 625, 125);
						this.fontsmall.draw(context, "30%", 690, 125);
						
						this.currentUpgradeCost = purchaseData.upgrade_damage_1;
						
						this.fontsmall.draw(context, "Upgrade Cost: " +purchaseData.upgrade_damage_1 + " Keys", 475, 175);

						if (saveData.key_currency < purchaseData.upgrade_damage_1 || saveData.key_currency == 0)
						{
							this.fontRed.draw(context, "Need More Keys", 475, 225);
							this.allowUpgrade = false;					
						}
						else
						{
							this.fontWhite.draw(context, "Purchase Upgrade", 475, 225);
							this.allowUpgrade = true;
						}
					}
					else if (this.view_upgrade_damage == 10)
					{
						this.fontRed.draw(context, "10%", 550, 125);
						this.fontsmall.draw(context, "20%", 625, 125);
						this.fontsmall.draw(context, "30%", 690, 125);
						
						this.currentUpgradeCost = purchaseData.upgrade_damage_2;
						
						this.fontsmall.draw(context, "Upgrade Cost: " +purchaseData.upgrade_damage_2 + " Keys", 475, 175);
						
						if (saveData.key_currency < purchaseData.upgrade_damage_2 || saveData.key_currency == 0)
						{
							this.fontRed.draw(context, "Need More Keys", 475, 225);
							this.allowUpgrade = false;					
						}
						else
						{
							this.fontWhite.draw(context, "Purchase Upgrade", 475, 225);
							this.allowUpgrade = true;
						}						
					}
					else if (this.view_upgrade_damage == 20)
					{
						this.fontsmall.draw(context, "10%", 560, 125);
						this.fontRed.draw(context, "20%", 615, 125);
						this.fontsmall.draw(context, "30%", 690, 125);
						
						this.currentUpgradeCost = purchaseData.upgrade_damage_3;
						
						this.fontsmall.draw(context, "Upgrade Cost: " +purchaseData.upgrade_damage_3 + " Keys", 475, 175);
						
						if (saveData.key_currency < purchaseData.upgrade_damage_3 || saveData.key_currency == 0)
						{
							this.fontRed.draw(context, "Need More Keys", 475, 225);
							this.allowUpgrade = false;					
						}
						else
						{
							this.fontWhite.draw(context, "Purchase Upgrade", 475, 225);
							this.allowUpgrade = true;
						}
					}
					else if (this.view_upgrade_damage == 30)
					{
						this.fontsmall.draw(context, "10%", 560, 125);
						this.fontsmall.draw(context, "20%", 625, 125);
						this.fontRed.draw(context, "30%", 685, 125);

						this.fontWhite.draw(context, "Upgrade Complete", 475, 225);
						this.allowUpgrade = false;
					}
				}

				// ===========================
				// == ATTACK RATE UPGRADE ===
				// ===========================
				if (this.viewUpgrade == "Attack Rate")
				{
					this.fontRed.draw(context, this.viewUpgrade, 475, 25);
					this.fontsmall.draw(context, "You can increase "+this.viewHero+"'s attack \n speed and special ability cooldown so that \n you can quickly destroy your enemies.", 475, 50);
					
					this.fontsmall.draw(context, "Increase:", 475, 125);
					
					if (this.view_upgrade_attackrate == 0)
					{
						this.fontsmall.draw(context, "5%", 560, 125);
						this.fontsmall.draw(context, "10%", 625, 125);
						this.fontsmall.draw(context, "15%", 690, 125);
						
						this.currentUpgradeCost = purchaseData.upgrade_attackrate_1;
						
						this.fontsmall.draw(context, "Upgrade Cost: " +purchaseData.upgrade_attackrate_1 + " Keys", 475, 175);

						if (saveData.key_currency < purchaseData.upgrade_attackrate_1 || saveData.key_currency == 0)
						{
							this.fontRed.draw(context, "Need More Keys", 475, 225);
							this.allowUpgrade = false;					
						}
						else
						{
							this.fontWhite.draw(context, "Purchase Upgrade", 475, 225);
							this.allowUpgrade = true;
						}
					}
					else if (this.view_upgrade_attackrate == 5)
					{
						this.fontRed.draw(context, "5%", 558, 125);
						this.fontsmall.draw(context, "10%", 625, 125);
						this.fontsmall.draw(context, "15%", 690, 125);
						
						this.currentUpgradeCost = purchaseData.upgrade_attackrate_2;
						
						this.fontsmall.draw(context, "Upgrade Cost: " +purchaseData.upgrade_attackrate_2 + " Keys", 475, 175);
						
						if (saveData.key_currency < purchaseData.upgrade_attackrate_2 || saveData.key_currency == 0)
						{
							this.fontRed.draw(context, "Need More Keys", 475, 225);
							this.allowUpgrade = false;					
						}
						else
						{
							this.fontWhite.draw(context, "Purchase Upgrade", 475, 225);
							this.allowUpgrade = true;
						}						
					}
					else if (this.view_upgrade_attackrate == 10)
					{
						this.fontsmall.draw(context, "5%", 560, 125);
						this.fontRed.draw(context, "10%", 613, 125);
						this.fontsmall.draw(context, "15%", 690, 125);
						
						this.currentUpgradeCost = purchaseData.upgrade_attackrate_3;
						
						this.fontsmall.draw(context, "Upgrade Cost: " +purchaseData.upgrade_attackrate_3 + " Keys", 475, 175);
						
						if (saveData.key_currency < purchaseData.upgrade_attackrate_3 || saveData.key_currency == 0)
						{
							this.fontRed.draw(context, "Need More Keys", 475, 225);
							this.allowUpgrade = false;					
						}
						else
						{
							this.fontWhite.draw(context, "Purchase Upgrade", 475, 225);
							this.allowUpgrade = true;
						}
					}
					else if (this.view_upgrade_attackrate == 15)
					{
						this.fontsmall.draw(context, "5%", 560, 125);
						this.fontsmall.draw(context, "10%", 625, 125);
						this.fontRed.draw(context, "15%", 685, 125);

						this.fontWhite.draw(context, "Upgrade Complete", 475, 225);
						this.allowUpgrade = false;
					}
				}

				// ===========================
				// == MOVE SPEED UPGRADE ===
				// ===========================
				if (this.viewUpgrade == "Movement Speed")
				{
					this.fontRed.draw(context, this.viewUpgrade, 475, 25);
					this.fontsmall.draw(context, "You can increase "+this.viewHero+"'s movement \n speed to dodge enemies and jump \n farther.", 475, 50);
					
					this.fontsmall.draw(context, "Increase:", 475, 125);
					
					if (this.view_upgrade_movespeed == 0)
					{
						this.fontsmall.draw(context, "3%", 563, 125);
						this.fontsmall.draw(context, "6%", 625, 125);
						this.fontsmall.draw(context, "9%", 690, 125);
						
						this.currentUpgradeCost = purchaseData.upgrade_movespeed_1;
						
						this.fontsmall.draw(context, "Upgrade Cost: " +purchaseData.upgrade_movespeed_1 + " Keys", 475, 175);

						if (saveData.key_currency < purchaseData.upgrade_movespeed_1 || saveData.key_currency == 0)
						{
							this.fontRed.draw(context, "Need More Keys", 475, 225);
							this.allowUpgrade = false;					
						}
						else
						{
							this.fontWhite.draw(context, "Purchase Upgrade", 475, 225);
							this.allowUpgrade = true;
						}
					}
					else if (this.view_upgrade_movespeed == 3)
					{
						this.fontRed.draw(context, "3%", 560, 125);
						this.fontsmall.draw(context, "6%", 625, 125);
						this.fontsmall.draw(context, "9%", 690, 125);
						
						this.currentUpgradeCost = purchaseData.upgrade_movespeed_2;
						
						this.fontsmall.draw(context, "Upgrade Cost: " +purchaseData.upgrade_movespeed_2 + " Keys", 475, 175);
						
						if (saveData.key_currency < purchaseData.upgrade_movespeed_2 || saveData.key_currency == 0)
						{
							this.fontRed.draw(context, "Need More Keys", 475, 225);
							this.allowUpgrade = false;					
						}
						else
						{
							this.fontWhite.draw(context, "Purchase Upgrade", 475, 225);
							this.allowUpgrade = true;
						}						
					}
					else if (this.view_upgrade_movespeed == 6)
					{
						this.fontsmall.draw(context, "3%", 560, 125);
						this.fontRed.draw(context, "6%", 618, 125);
						this.fontsmall.draw(context, "9%", 690, 125);
						
						this.currentUpgradeCost = purchaseData.upgrade_movespeed_3;
						
						this.fontsmall.draw(context, "Upgrade Cost: " +purchaseData.upgrade_movespeed_3 + " Keys", 475, 175);
						
						if (saveData.key_currency < purchaseData.upgrade_movespeed_3 || saveData.key_currency == 0)
						{
							this.fontRed.draw(context, "Need More Keys", 475, 225);
							this.allowUpgrade = false;					
						}
						else
						{
							this.fontWhite.draw(context, "Purchase Upgrade", 475, 225);
							this.allowUpgrade = true;
						}
					}
					else if (this.view_upgrade_movespeed == 9)
					{
						this.fontsmall.draw(context, "3%", 560, 125);
						this.fontsmall.draw(context, "6%", 625, 125);
						this.fontRed.draw(context, "9%", 685, 125);

						this.fontWhite.draw(context, "Upgrade Complete", 475, 225);
						this.allowUpgrade = false;
					}
				}
				
				// ===========================
				// ===== SPECIALY ABILITY ======
				// ===========================
				else if (this.viewUpgrade == "Special Ability")
				{
					this.fontRed.draw(context, this.viewUpgrade, 475, 25);
					
					if (this.viewHero == "Malyn")
					{
						this.fontsmall.draw(context, "Malyn can throw grenades at her enemies \n to inflict maximum damage.", 475, 50);
					}
					else if (this.viewHero == "Meena")
					{
						this.fontsmall.draw(context, "Meena can throw sleep grenades at her \n enemies to lull them to sleep and cause \n minor damage.", 475, 50);
					}
						
					if (this.view_upgrade_abilityunlocked == 0)
					{
						if (this.viewHero == "Malyn")
						{
							this.fontsmall.draw(context, "Purchase Malyn's grenades to unlock her \n destructive powers!", 475, 110);
						}
						else if (this.viewHero == "Meena")
						{
							this.fontsmall.draw(context, "Purchase Meena's sleep grenades to \n knock her enemies out!", 475, 110);
						}
						
						this.currentUpgradeCost = purchaseData.specialability_01;
						this.currentSpecialUpgrade = "upgrade_abilityunlocked"
						this.fontsmall.draw(context, "Upgrade Cost: " +purchaseData.specialability_01 + " Keys", 475, 175);

						if (saveData.key_currency < purchaseData.specialability_01 || saveData.key_currency == 0)
						{
							this.fontRed.draw(context, "Need More Keys", 475, 225);
							this.allowUpgrade = false;
						}
						else
						{
							this.fontWhite.draw(context, "Purchase Upgrade", 475, 225);
							this.allowUpgrade = true;
						}
					}
					else if (this.view_upgrade_abilityunlocked_upgrade01 == 0)
					{
						if (this.viewHero == "Malyn")
						{
							this.fontsmall.draw(context, "Purchase Grenade Blast to increase the \n radius of the explosion!", 475, 110);
						}
						else if (this.viewHero == "Meena")
						{
							this.fontsmall.draw(context, "Purchase Deep Sleep to keep \n Meena's enemies out longer!", 475, 110);
						}
						
						this.currentUpgradeCost = purchaseData.upgrade_specialability_01;
						this.currentSpecialUpgrade = "upgrade_abilityunlocked_upgrade01"
						this.fontsmall.draw(context, "Upgrade Cost: " +purchaseData.upgrade_specialability_01 + " Keys", 475, 175);

						if (saveData.key_currency < purchaseData.upgrade_specialability_01 || saveData.key_currency == 0)
						{
							this.fontRed.draw(context, "Need More Keys", 475, 225);
							this.allowUpgrade = false;
						}
						else
						{
							this.fontWhite.draw(context, "Purchase Upgrade", 475, 225);
							this.allowUpgrade = true;
						}
					}
					else if (this.view_upgrade_abilityunlocked_upgrade02 == 0)
					{
						if (this.viewHero == "Malyn")
						{
							this.fontsmall.draw(context, "Purchase Double Grenade to throw \n two grenades at the same time!", 475, 110);
						}
						else if (this.viewHero == "Meena")
						{
							this.fontsmall.draw(context, "Purchase Painful Sleep to increase the \n damage Meena does to her enemies \n while they are knocked out!", 475, 110);
						}
						
						this.currentUpgradeCost = purchaseData.upgrade_specialability_02;
						this.currentSpecialUpgrade = "upgrade_abilityunlocked_upgrade02"
						this.fontsmall.draw(context, "Upgrade Cost: " +purchaseData.upgrade_specialability_02 + " Keys", 475, 175);

						if (saveData.key_currency < purchaseData.upgrade_specialability_02 || saveData.key_currency == 0)
						{
							this.fontRed.draw(context, "Need More Keys", 475, 225);
							this.allowUpgrade = false;
						}
						else
						{
							this.fontWhite.draw(context, "Purchase Upgrade", 475, 225);
							this.allowUpgrade = true;
						}					
					}
					else
					{
						if (this.viewHero == "Malyn")
						{
							this.fontsmall.draw(context, "You have purchased: \n \n Grenades \n - Grenade Blast \n - Double Grenade", 475, 110);
						}
						else if (this.viewHero == "Meena")
						{
							this.fontsmall.draw(context, "You have purchased: \n \n Sleep Grenades \n - Deep Sleep \n - Painful Sleep", 475, 110);
						}
						this.fontWhite.draw(context, "Upgrade Complete", 475, 225);
						this.allowUpgrade = false;
					}
				}
				this.fontRed_center.draw(context, "Your Keys: " +saveData.key_currency, 620, 400);
				this.fontWhite.draw(context, "Back", 475, 250);
			}
			
			// ===== UPGRADE SELECT SCREEN ONLY =====
			else
			{
				this.fontWhite.draw(context, "Play as Hero", 525, 400);
				this.fontWhite.draw(context, "Back", 75, 400);
				
				// add a full character stat breakdown here
			}
			
			// ===== BOTH UPGRADE SELECT AND PURCHASE SCREEN =====
			this.fontRed.draw(context, "Upgrades", 75, 200);
			this.fontsmall.draw(context, "Health", 75, 225);
			this.fontsmall.draw(context, "Damage", 75, 250);
			this.fontsmall.draw(context, "Attack Rate", 75, 275);
			this.fontsmall.draw(context, "Movement Speed", 75, 300);
			this.fontsmall.draw(context, "Special Ability", 75, 325);
			
		}
		
		// ===== DISPLAY MESSAGE POPUP =====
		if (this.showMessage == true)
		{
			if (this.alertBox_timer >= 0)
			{
				context.drawImage( this.alertBox, 470, 270 );
				this.fontmedium_center.draw(context, this.alertMessage, 625, 282);
				this.alertBox_timer--;
			}
			else
			{
				this.showMessage = false;
				this.alertBox_timer = alertMessage_duration;
			}
		}
    },
	
    // destroy function
    onDestroyEvent: function() {
		bindKeys("unbind","menu");
    }
});