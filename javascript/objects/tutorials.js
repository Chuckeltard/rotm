var tutorial_obj = me.CollectableEntity.extend({
	init: function(x, y, settings){
		
		this.parent(x, y, settings);
		
		this.tutorial_id = settings.tutorial_id;
		this.collidable = true;
		
		//console.log(this.tutorial_id + ": " + settings.x + " , " + settings.y);
		
	},
	
	onResetEvent:function(){
	},

	onCollision: function(res, obj){	
		if(obj == me.game.player)
		{
			this.collidable = false;
			
			if (this.tutorial_id == 08)
			{		
				saveData.upgrade_malyn_abilityunlocked = 1;
			}
		
			//console.log("Player: " + obj.pos.x + " , " + obj.pos.y);
			
			var new_tutorialDisplay = new tutorialDisplay(this.pos.x, this.pos.y ,{tutorial_id: this.tutorial_id});
			me.game.add(new_tutorialDisplay, 99);
			
			me.game.sort();
			
			me.game.remove(this);
		}
	},	
	
	update: function(){

	},
	
	onDestroyEvent: function(){
	}
});


var tutorialDisplay = me.CollectableEntity.extend({
	init: function(x, y, settings){
		
		this.parent(x, y, settings);
		
		this.font = new me.Font("Tahoma",15,"white","center");
        this.fontsmall = new me.Font("Tahoma",12,"white","center");
		this.fontsmall_right = new me.Font("Tahoma",12,"white","right");
		this.titleFont = new me.BitmapFont('16x16_font', 16);
		this.titleFont.set("center");
		
		this.tutorial_box = me.loader.getImage("tutorial_box");
		
		this.tutorial_id = settings.tutorial_id;
		this.alwaysUpdate = true;
		this.floating = true;
		this.isPersistent = true;
		
		if (me.sys.isMobile)
		{
			this.move_onX_Key = "the arrow keys";
			this.move_onY_Key = "Up or Down arrow";
			this.shootKey = "F";
			this.jumpKey = "J";
			this.pauseKey = "this box";
			this.grenadeKey = "G";
		}
		else if (saveData.keyConfig == 1)
		{
			this.move_onX_Key = "the arrow keys";
			this.move_onY_Key = "Up or Down arrow";
			this.shootKey = "F";
			this.jumpKey = "Spacebar";
			this.pauseKey = "P";
			this.grenadeKey = "G";
		}
		else if (saveData.keyConfig == 2)
		{
			this.move_onX_Key = "the E, D, S and F keys";
			this.move_onY_Key = "E and D";
			this.shootKey = "K";
			this.jumpKey = "J";
			this.pauseKey = "P";
			this.grenadeKey = "L";		
		}

		this.newButton = new menuButton(135, 100, { spritewidth: 420, spriteheight: 170, action: 'endTutorial', obj: this });
		me.game.add(this.newButton, 999);    
			
		gameisPaused = true;
		me.game.player.playerState = "paused";
		
 		bindKeys("unbind","gameplay");
		me.input.unbindKey(me.input.KEY.P);
		me.input.unbindKey(me.input.KEY.ENTER);
		
		// enable menu
		bindKeys("bind","menu");
		me.input.bindKey(me.input.KEY.P, "unPause", true);
		me.input.bindKey(me.input.KEY.ESC, "unPause", true);
		
	},
	
	onResetEvent:function(){
	},
	
	draw: function(context){
			
		context.drawImage(this.tutorial_box, 135, 100 );
		
		if (this.tutorial_id == 01)
		{
			this.font.draw(context, "Welcome to", 345, 115);
			this.titleFont.draw(context, "Rise of the Monsters!", 345, 140);
			this.font.draw(context, "Use "+this.move_onX_Key+" to move up, down, left, and right.\n Hold down "+this.shootKey+" to shoot.\n Press "+this.jumpKey+" to jump.", 345, 170);
			this.fontsmall_right.draw(context, 'Press "'+this.pauseKey+'" to continue', 540, 236);
		}
		else if (this.tutorial_id == 02)
		{
			this.font.draw(context, "Your Hero can climb up and down ladders by \n pressing the "+this.move_onY_Key+" keys.\n But watch out! Some enemies can climb as well and \n you are not able to shoot while on a ladder!", 345, 135);
			this.fontsmall_right.draw(context, 'Press "'+this.pauseKey+'" to continue', 540, 236);
		}
		else if (this.tutorial_id == 03)
		{
			this.font.draw(context, "You just picked up a", 345, 120);
			this.titleFont.draw(context, "LISTING!", 345, 155);
			this.font.draw(context, "Listings allow you to unlock further levels as you progress.", 345, 195);
			this.fontsmall_right.draw(context, 'Press "'+this.pauseKey+'" to continue', 540, 236);
		}
		else if (this.tutorial_id == 04)
		{
			this.font.draw(context, "You just picked up a", 345, 120);
			this.titleFont.draw(context, "KEY!", 345, 150);
			this.font.draw(context, "Keys are our form of currency. Use them to \n upgrade your Hero when things get tough!", 345, 185);
			this.fontsmall_right.draw(context, 'Press "'+this.pauseKey+'" to continue', 540, 236);
		}
		else if (this.tutorial_id == 05)
		{
			this.font.draw(context, "Each creature in Rise of the Monsters is different.\n Killing creatures individually may be easy,\n but once they appear with other creatures,\n that may change...", 345, 130);
			this.fontsmall_right.draw(context, 'Press "'+this.pauseKey+'" to continue', 540, 236);
		}
		else if (this.tutorial_id == 06)
		{
			this.font.draw(context, "Not all Listings are freely available to just pick up.\n Some will require you to unlock upgrades for your \n Hero. Others, like this one, will require you to unlock \n new and different Heroes. Be sure to collect them all!", 345, 135);
			this.fontsmall_right.draw(context, 'Press "'+this.pauseKey+'" to continue', 540, 236);
		}
		else if (this.tutorial_id == 07)
		{
			// Add grenade purchase tutorial suggestion here at the end of Level 03
		}
		else if (this.tutorial_id == 08)
		{
			this.font.draw(context, 'You now have access to grenades!.\n Press the "'+this.grenadeKey+'" key to throw them at enemies!', 345, 135);
			this.fontsmall_right.draw(context, 'Press "'+this.pauseKey+'" to continue', 540, 236);
		}
		else if (this.tutorial_id == "deaths")
		{
			this.font.draw(context, 'If the game is a bit too difficult,\n you can change the difficulty in \n Main Menu --> Options', 345, 135);
			this.fontsmall_right.draw(context, 'Press "'+this.pauseKey+'" to continue', 540, 236);
		}		
	
	},

	onCollision: function(res, obj){	
		if(obj == me.game.player)
		{
			if (this.tutorial_id == 08)
			{		
				saveData.upgrade_malyn_abilityunlocked = 1;
			}
		}
	},	
	
	update: function(){
		if (me.input.isKeyPressed('unPause')) {
			me.game.remove(this);
		}
	},
	
	onDestroyEvent: function(){
        // disable menu controls
		bindKeys("unbind","menu");
		
		// re-enable gameplay controls
		bindKeys("bind","gameplay");
		
		if (this.tutorial_id == "deaths")
		{
			me.game.player.playerState = "dead";	
		}
		else
		{
			me.game.player.playerState = "alive";		
		}
		// set player back to "alive" and AI back to "unpaused"

		gameisPaused = false;
	}
});