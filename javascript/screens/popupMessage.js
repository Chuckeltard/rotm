var popupMessage = me.ObjectEntity.extend({
	init: function(x, y, settings){
	
		//call parent constructor
		this.parent(x, y, settings);
		
		this.type = settings.type;
		console.log(this.type);
		
		this.spritewidth = 100;
		this.spriteheight = 100;
		
		this.alwaysUpdate = true;
		this.floating = true;
		this.inViewport = true;
		
		this.type = me.game.LEVEL_OBJECT;
		
		this.font = new me.Font("Tahoma",15,"white","center");
        this.fontsmall = new me.Font("Tahoma",12,"white","center");
		this.fontsmall_right = new me.Font("Tahoma",12,"white","right");
		this.titleFont = new me.BitmapFont('16x16_font', 16);
		this.titleFont.set("center");
		this.fontRed = new me.BitmapFont('16x16_font', 16);
	
		this.tutorial_box = me.loader.getImage("tutorial_box");

		this.cursorPosY = 140;
        this.cursorPosX = 175;
		
		// Disable game controls and initialize menu controls here
		// disable gameplay
        me.input.unbindKey(me.input.KEY.ENTER);
		me.input.unbindKey(me.input.KEY.UP);
		me.input.unbindKey(me.input.KEY.DOWN);
		me.input.unbindKey(me.input.KEY.LEFT);
		me.input.unbindKey(me.input.KEY.RIGHT);
		me.input.unbindKey(me.input.KEY.P);
		
		// enable menu
        me.input.bindKey(me.input.KEY.ENTER, "enter", true);
		me.input.bindKey(me.input.KEY.UP, "menuUp", true);
		me.input.bindKey(me.input.KEY.DOWN, "menuDown", true);
		me.input.bindKey(me.input.KEY.P, "unPause", true);
		me.input.bindKey(me.input.KEY.ESC, "unPause", true);
		
	},

	update: function()
	{
		
		if (me.input.isKeyPressed('enter')) {
			
			if(this.cursorPosY == 140){
				var popupResponse = false;
			}
			
			if(this.cursorPosY == 165){
				return true;
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
		context.drawImage(this.tutorial_box, 135, 100 );
		
		this.titleFont.draw(context, "->", this.cursorPosX, this.cursorPosY);
       
		this.font_center.draw(context, "Are you sure you want to exit to the World Map? Any progress made in this level will be lost.", 345, 115);
		


	},

	onDestroyEvent: function(){
        // disable menu controls
		me.input.unbindKey(me.input.KEY.ENTER);
		me.input.unbindKey(me.input.KEY.UP);
		me.input.unbindKey(me.input.KEY.DOWN);
		me.input.unbindKey(me.input.KEY.LEFT);
		me.input.unbindKey(me.input.KEY.RIGHT);
		me.input.unbindKey(me.input.KEY.P);
		
		// re-enable gameplay controls
		me.input.bindKey(me.input.KEY.LEFT, "left");
        me.input.bindKey(me.input.KEY.RIGHT, "right");
		me.input.bindKey(me.input.KEY.UP, "up");
		me.input.bindKey(me.input.KEY.DOWN, "down");
		me.input.bindKey(me.input.KEY.P, "pause", true);
		me.input.bindKey(me.input.KEY.ESC, "pause", true);
	},

});

