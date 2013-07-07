var rightControl = me.GUI_Object.extend({
	init:function(x, y)
	{
		settings = {}
		settings.image = "button_left";
		settings.spritewidth = 32;
		settings.spriteheight = 48;
		//parent constructor
		this.parent(x, y, settings);

		me.input.registerPointerEvent("mousedown", this, this.mousedown.bind(this));
		me.input.registerPointerEvent("mouseup", this, this.mouseup.bind(this));

	},
	
    destroy : function (e) {
		me.input.releasePointerEvent("mousedown", this);
		me.input.releasePointerEvent("mouseup", this);
    },
 
	//e.gameX and e.gameY are the touch coordinates, etc
    mousedown : function (e) {
        //console.log("mousedown", e);
		walkRight = true;
    },
 
    mouseup : function (e) {
        //console.log("mouseup", e);
		walkRight = false;
    },
	
	/*
	//when the object is clicked
	onClick:function()
	{
		walkRight = true;
	}
	*/
});

var leftControl = me.GUI_Object.extend({
	init:function(x, y)
	{
		settings = {}
		settings.image = "button_right";
		settings.spritewidth = 32;
		settings.spriteheight = 48;
		//parent constructor
		this.parent(x, y, settings);

		me.input.registerPointerEvent("mousedown", this, this.mousedown.bind(this));
		me.input.registerPointerEvent("mouseup", this, this.mouseup.bind(this));

	},
	
    destroy : function (e) {
		me.input.releasePointerEvent("mousedown", this);
		me.input.releasePointerEvent("mouseup", this);
    },
 
	//e.gameX and e.gameY are the touch coordinates, etc
    mousedown : function (e) {
		walkLeft = true;
    },
 
    mouseup : function (e) {
		walkLeft = false;
    },
	
	/*
	//when the object is clicked
	onClick:function()
	{
		walkRight = true;
	}
	*/
});

var upControl = me.GUI_Object.extend({
	init:function(x, y)
	{
		settings = {}
		settings.image = "button_up";
		settings.spritewidth = 48;
		settings.spriteheight = 32;
		//parent constructor
		this.parent(x, y, settings);

		me.input.registerPointerEvent("mousedown", this, this.mousedown.bind(this));
		me.input.registerPointerEvent("mouseup", this, this.mouseup.bind(this));

	},
	
    destroy : function (e) {
		me.input.releasePointerEvent("mousedown", this);
		me.input.releasePointerEvent("mouseup", this);
    },
 
	//e.gameX and e.gameY are the touch coordinates, etc
    mousedown : function (e) {
		climbUp = true;
    },
 
    mouseup : function (e) {
		climbUp = false;
    },
});

var downControl = me.GUI_Object.extend({
	init:function(x, y)
	{
		settings = {}
		settings.image = "button_down";
		settings.spritewidth = 48;
		settings.spriteheight = 32;
		//parent constructor
		this.parent(x, y, settings);

		me.input.registerPointerEvent("mousedown", this, this.mousedown.bind(this));
		me.input.registerPointerEvent("mouseup", this, this.mouseup.bind(this));

	},
	
    destroy : function (e) {
		me.input.releasePointerEvent("mousedown", this);
		me.input.releasePointerEvent("mouseup", this);
    },
 
	//e.gameX and e.gameY are the touch coordinates, etc
    mousedown : function (e) {
		climbDown = true;
    },
 
    mouseup : function (e) {
		climbDown = false;
    },
});

var jumpControl = me.GUI_Object.extend({
	init:function(x, y)
	{
		settings = {}
		settings.image = "button_jump";
		settings.spritewidth = 45;
		settings.spriteheight = 41;
		//parent constructor
		this.parent(x, y, settings);

		me.input.registerPointerEvent("mousedown", this, this.mousedown.bind(this));
		me.input.registerPointerEvent("mouseup", this, this.mouseup.bind(this));

	},
	
    destroy : function (e) {
		me.input.releasePointerEvent("mousedown", this);
		me.input.releasePointerEvent("mouseup", this);
    },
 
	//e.gameX and e.gameY are the touch coordinates, etc
    mousedown : function (e) {
		jumpButton = true;
    },
 
    mouseup : function (e) {
		jumpButton = false;
    },
});

var grenadeControl = me.GUI_Object.extend({
	init:function(x, y)
	{
		settings = {}
		settings.image = "button_grenade";
		settings.spritewidth = 45;
		settings.spriteheight = 41;
		//parent constructor
		this.parent(x, y, settings);

		me.input.registerPointerEvent("mousedown", this, this.mousedown.bind(this));
		me.input.registerPointerEvent("mouseup", this, this.mouseup.bind(this));

	},
	
    destroy : function (e) {
		me.input.releasePointerEvent("mousedown", this);
		me.input.releasePointerEvent("mouseup", this);
    },
 
	//e.gameX and e.gameY are the touch coordinates, etc
    mousedown : function (e) {
		shootGrenade = true;
    },
 
    mouseup : function (e) {
		shootGrenade = false;
    },
});

var shotControl = me.GUI_Object.extend({
	init:function(x, y)
	{
		settings = {}
		settings.image = "button_shoot";
		settings.spritewidth = 45;
		settings.spriteheight = 41;
		//parent constructor
		this.parent(x, y, settings);

		me.input.registerPointerEvent("mousedown", this, this.mousedown.bind(this));
		me.input.registerPointerEvent("mouseup", this, this.mouseup.bind(this));

	},
	
    destroy : function (e) {
		me.input.releasePointerEvent("mousedown", this);
		me.input.releasePointerEvent("mouseup", this);
    },
 
	//e.gameX and e.gameY are the touch coordinates, etc
    mousedown : function (e) {
		shootButton = true;
    },
 
    mouseup : function (e) {
		shootButton = false;
    },
});

//SpriteObject
var Gui = me.SpriteObject.extend({
    init : function (x, y, settings) {
        this.parent(x, y, settings);

		me.input.registerPointerEvent("mousedown", this, this.mousedown.bind(this));
		me.input.registerPointerEvent("mouseup", this, this.mouseup.bind(this));

    },
 
    destroy : function (e) {
			me.input.releasePointerEvent("mousedown", this);
			me.input.releasePointerEvent("mouseup", this);
    },
 
	//e.gameX and e.gameY are the touch coordinates, etc
    mousedown : function (e) {
        //console.log("mousedown", e);
		walkRight = true;
    },
 
    mouseup : function (e) {
        //console.log("mouseup", e);
		walkRight = false;
    }
});
 
 /*
var smiley = me.loader.getImage("smiley");
var mygui = new Gui(100, 100, {
    "image" : smiley,
    "spritewidth" : smiley.width,
    "spriteheight" : smiley.height
});
*/