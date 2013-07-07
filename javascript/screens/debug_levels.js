 //Splash Screen 
var DebugSelectScreen = me.ScreenObject.extend({
    // constructor
    init: function() {
        this.parent(true);
 
        // title screen image
        this.title = null;
 
        this.font = null;
		this.font2 = null;
		this.font3 = null;
		this.font4 = null;
		this.font5 = null;
		this.arrow = null;
		this.cursorPosY = 50;
        this.cursorPosX = 35;
 
    },
 
    // reset function
    onResetEvent: function() {
        if (this.title === null) {
            // init stuff if not yet done
            this.title = me.loader.getImage('credits_screen');
            // font to display the menu items
            this.fontRed = new me.BitmapFont('16x16_font', 16);
            this.fontRed.set("left");
            this.fontWhite = new me.BitmapFont('16x16_font_white', 16);
            this.fontWhite.set("left");
 

        }


        // enable the keyboard
		bindKeys("bind","menu");
        // play something
        //me.audio.play("cling");
 
    },
 
    // update function
    update: function() {
        // enter pressed ?
        if (me.input.isKeyPressed('enter')) {

			if(this.cursorPosX == 35 && this.cursorPosY == 50){
                selectedlevel = "city_level_01";
				me.state.change(LEVEL_TRANSITION_STATE);
			}
			
			if(this.cursorPosX == 35 && this.cursorPosY == 75){
                selectedlevel = "city_level_02";
				me.state.change(LEVEL_TRANSITION_STATE);

			}
			
			if(this.cursorPosX == 35 && this.cursorPosY == 100){
                selectedlevel = "city_level_03";
				me.state.change(LEVEL_TRANSITION_STATE);
			}
			
			if(this.cursorPosX == 35 && this.cursorPosY == 125){
                selectedlevel = "city_level_04";
				me.state.change(LEVEL_TRANSITION_STATE);
            }
			
			if(this.cursorPosX == 35 && this.cursorPosY == 150){
                selectedlevel = "city_level_05";
				me.state.change(LEVEL_TRANSITION_STATE);
			}
			
            if(this.cursorPosX == 35 && this.cursorPosY == 175){
                selectedlevel ="city_level_06";
                me.state.change(LEVEL_TRANSITION_STATE);
            }
            
            if(this.cursorPosX == 35 && this.cursorPosY == 200){
                selectedlevel ="city_level_boss_01";
				me.state.change(LEVEL_TRANSITION_STATE);
            }

            if(this.cursorPosX == 35 && this.cursorPosY == 225){
                selectedlevel ="city_level_boss_02";
                me.state.change(LEVEL_TRANSITION_STATE);
            } 
            
            if(this.cursorPosX == 460 && this.cursorPosY == 50){
                selectedlevel = "test_nick2";
				me.state.change(LEVEL_TRANSITION_STATE);
            }
            
            if(this.cursorPosX == 460 && this.cursorPosY == 75){
                selectedlevel ="dave_test";
				me.state.change(LEVEL_TRANSITION_STATE);
            }    
            
            if(this.cursorPosX == 460 && this.cursorPosY == 100){
                selectedlevel ="dave_test1";
				me.state.change(LEVEL_TRANSITION_STATE);
            }

            if(this.cursorPosX == 460 && this.cursorPosY == 125){
                selectedlevel ="dave_test2";
				me.state.change(LEVEL_TRANSITION_STATE);
            }
			
			if(this.cursorPosX == 460 && this.cursorPosY == 150){
                selectedlevel ="dave_test3";
				me.state.change(LEVEL_TRANSITION_STATE);
            }
			
			if(this.cursorPosX == 460 && this.cursorPosY == 175){
                selectedlevel ="dave_test4";
				me.state.change(LEVEL_TRANSITION_STATE);
            }
            
            if(this.cursorPosX == 460 && this.cursorPosY == 200){
                selectedlevel ="jesse_test";
				me.state.change(LEVEL_TRANSITION_STATE);
            }    
            if(this.cursorPosX == 460 && this.cursorPosY == 225){
                selectedlevel ="jesse_test2";
				me.state.change(LEVEL_TRANSITION_STATE);
            }    
			if(this.cursorPosX == 460 && this.cursorPosY == 250){
                selectedlevel ="jesse_test3";
				me.state.change(LEVEL_TRANSITION_STATE);
            }    
			if(this.cursorPosX == 460 && this.cursorPosY == 275){
                selectedlevel ="jesse_test4";
				me.state.change(LEVEL_TRANSITION_STATE);
            }
			if(this.cursorPosX == 460 && this.cursorPosY == 300){
                selectedlevel ="jesse_bonus";
				me.state.change(LEVEL_TRANSITION_STATE);
            }            
            if(this.cursorPosX == 460 && this.cursorPosY == 325){
                selectedlevel ="test_nick3";
                me.state.change(LEVEL_TRANSITION_STATE);
            } 
            if(this.cursorPosX == 460 && this.cursorPosY == 350){
                selectedlevel ="sewer_01";
                me.state.change(LEVEL_TRANSITION_STATE);
            } 
			
			if(this.cursorPosX == 35 && this.cursorPosY == 375){
				malyn_health = 99999;
				//malyn_bullet_damage = 9999;
				malyn_maxHealth = 99999;
			}
			
			if(this.cursorPosX == 35 && this.cursorPosY == 400){
				me.state.change(MAIN_MENU_STATE);
			}
        }
				
		//Keeps the cursor from going up too far
		if(me.input.isKeyPressed('menuUp') && this.cursorPosY >= 50){
			if (this.cursorPosY == 50)
			{
				this.cursorPosY += 350;
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
				this.cursorPosY -= 350;
			}
			else
			{
				this.cursorPosY += 25;
			}		
		}
		
    //Keeps the cursor from going left far
        if(me.input.isKeyPressed('menuLeft') && this.cursorPosX > 50){
			this.cursorPosX -= 425;			
		}
		
		//Keeps the cursor from going right too far
		if(me.input.isKeyPressed('menuRight') && this.cursorPosX < 450){
			this.cursorPosX += 425;
		}
		
        return true;
    },
 
    // draw function
    draw: function(context) {
        context.drawImage(this.title, 0, 0);
 
		this.fontRed.draw(context, "->", this.cursorPosX, this.cursorPosY);
		
		this.fontRed.draw(context, "City World Levels", 75, 25);
		this.fontWhite.draw(context, "1", 75, 50);
		this.fontWhite.draw(context, "2", 75, 75);
		this.fontWhite.draw(context, "3", 75, 100);
		this.fontWhite.draw(context, "4", 75, 125);
        this.fontWhite.draw(context, "5", 75, 150);
        this.fontWhite.draw(context, "6", 75, 175);
        this.fontWhite.draw(context, "mini-boss", 75, 200);
        this.fontWhite.draw(context, "boss", 75, 225);
		
		this.fontRed.draw(context, "Test levels", 500, 25);
        this.fontWhite.draw(context, "Nick2", 500, 50);
        this.fontWhite.draw(context, "Dave", 500, 75);
		this.fontWhite.draw(context, "Dave 1", 500, 100);
		this.fontWhite.draw(context, "Dave 2", 500, 125);
		this.fontWhite.draw(context, "Dave 3", 500, 150);
		this.fontWhite.draw(context, "Dave 4", 500, 175);
        this.fontWhite.draw(context, "Jesse 1", 500, 200);
		this.fontWhite.draw(context, "Jesse 2", 500, 225);
		this.fontWhite.draw(context, "Jesse 3", 500, 250);
		this.fontWhite.draw(context, "Jesse 4", 500, 275);
		this.fontWhite.draw(context, "Jesse Bonus", 500, 300);
        this.fontWhite.draw(context, "Nick3", 500, 325);
		this.fontWhite.draw(context, "Sewer 01", 500, 350);
        
		this.fontWhite.draw(context, "God Mode", 75, 375);
		this.fontWhite.draw(context, "Main Menu", 75, 400);

    },
	
    // destroy function
    onDestroyEvent: function() {
		bindKeys("unbind","menu");
    }
});