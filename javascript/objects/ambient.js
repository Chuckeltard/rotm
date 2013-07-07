var rain_back = me.ObjectEntity.extend({
	init: function (x, y, behavior) {
      var settings = {};

		settings.image = 'rain_back';
		settings.spritewidth = 1000;
		settings.spriteheight = 500;
		
		//call parent constructor
		this.parent(x, y, settings);
		this.gravity = 10;
        //this.setVelocity(rain_Velocity, rain_Jump);
		//this.addAnimation( "animate", [1] );
		
		//this.updateColRect( 8, 32, -1 );
		this.collidable = false;
		this.playerCollidable = false;
        this.isLethal = false;
		this.alwaysUpdate = true;
		
      if (behavior == "circular") {
        this.behavior = new CircularMovementBehavior(this);
      }
      else {
        this.behavior = new DownMovementBehavior(this);
      }
	},
    
    update: function () 
	{
		if (this.pos.y >= me.game.player.pos.y + 600)
		{	
			me.game.remove(this);
		}
		
		this.updateMovement();
		this.parent();
		return true;    
    },
	
	updateMovement: function () 
	{
		this.pos.x += this.vel.x;
		this.behavior.update();
	},
    
});
var rain_front = me.ObjectEntity.extend({
    init: function (x, y, behavior) {
      var settings = {};

		settings.image = 'rain_front';
		settings.spritewidth = 1000;
		settings.spriteheight = 500;
		
		//call parent constructor
		this.parent(x, y, settings);
		this.gravity = 100;
        this.setVelocity(rain_front_Velocity, rain_front_Jump);
		//this.addAnimation( "animate", [1] );
        
        var rain_front_Velocity = 15;
        var rain_front_Jump = 15;
		
		//this.updateColRect( 8, 32, -1 );
		this.collidable = false;
		this.playerCollidable = false;
        this.isLethal = false;
		this.alwaysUpdate = true;
		
      if (behavior == "circular") {
        this.behavior = new CircularMovementBehavior(this);
      }
      else {
        this.behavior = new DownMovementBehavior(this);
      }
	},
    
    update: function () 
	{
		if (this.pos.y >= me.game.player.pos.y + 600)
		{	
			me.game.remove(this);
		}
		
		this.updateMovement();
		this.parent();
		return true;    
    },
	
	updateMovement: function () 
	{
		this.pos.x += this.vel.x;
		this.behavior.update();
	},
    
});

var clouds = me.ObjectEntity.extend({
    init: function (x, y, behavior) {
      var settings = {};

		settings.image = 'clouds';
		settings.spritewidth = 200;
		settings.spriteheight = 108;
		
		//call parent constructor
		this.parent(x, y, settings);
		
		//this.updateColRect( 8, 32, -1 );
		this.alwaysUpdate = true;
		this.collidable = false;
		this.playerCollidable = false;
        this.renderable.addAnimation("one", [0]);
        this.renderable.addAnimation("two", [1]);
        this.renderable.addAnimation("three", [2]);
        this.renderable.addAnimation("four", [3,3,3,3,3,3,3,3,3,3,3,3,3,3,4]);

		//this.alwaysUpdate = true;
		
        this.renderable.setCurrentAnimation(util.arrayRandomElement(["one", "two", "three", "four"]));
    
      if (behavior == "circular") {
        this.behavior = new SwingMovementBehavior(this);
      }
      else {
        this.behavior = new CloudMovementBehavior(this);
      }
	},
    
    update: function () {
		if (this.pos.x <= me.game.player.pos.y - 1000)
		{
			me.game.remove(this);
			return false;
		}
		
		this.updateMovement();
		this.parent();
		return true;    
    },
    updateMovement: function () {
    this.pos.x += this.vel.x;
    this.behavior.update();
   },
    
});

var smoke = me.ObjectEntity.extend({
    init: function (x, y, behavior) {
      var settings = {};

        settings.image = 'smoke';
		settings.spritewidth = 111;
		settings.spriteheight = 200;
		
		//call parent constructor
		this.parent(x, y, settings);
		
		//this.updateColRect( 8, 32, -1 );
		this.alwaysUpdate = true;
		this.collidable = false;
		this.playerCollidable = false;
        this.renderable.addAnimation("one", [0]);
        this.renderable.addAnimation("two", [1]);
        this.renderable.addAnimation("three", [2]);
        this.renderable.addAnimation("four", [3]);
        this.renderable.addAnimation("five", [4]);

		//this.alwaysUpdate = true;
		
        this.renderable.setCurrentAnimation(util.arrayRandomElement(["one", "two", "three", "four", "five"]));
    
        this.behavior = new SmokeMovementBehavior(this);

	},
    
    update: function () {
		if (this.pos.y <= me.game.player.pos.y - 600)
		{
			me.game.remove(this);
			return false;
		}
		
		this.updateMovement();
		this.parent();
		return true;    
    },
    updateMovement: function () {
    this.pos.x += this.vel.x;
    this.behavior.update();
   },
    
});
// =====================================
// ======== Ambient Kill Volume ========
// =====================================

var KillEntity = me.ObjectEntity.extend({
	init: function(x, y, settings) {
		if (settings)
		{
			if (settings.type)
			{
				this.deathType = settings.type;
			}
			else
			{
				this.deathType = "fall";
			}
		}

        this.parent(x, y, settings);
        this.type = "KillEntity";
		this.alwaysUpdate = true;
    },
    onCollision: function(res, obj) {
		
		if (obj.type == 'KillEntity')
		{
			return false;
		}
		
		if (this.deathType == "fall")
		{
			obj.playerState = "fallingDeath";
		}
		else if (this.deathType == "fire")
		{
			obj.playerState = "incapacitated";
		}
		else if (this.deathType == "spikes")
		{
			obj.playerState = "incapacitated";
		}
	},
    update: function () {
		
		me.game.collide(this,true);

		this.parent(this);
		return true;
    },
});

var fire = KillEntity.extend({
    init: function(x, y, settings){

		settings.image = 'fire';
		settings.spritewidth = 32;
		
		//call parent constructor
		this.parent(x, y, settings);
		this.renderable.addAnimation( "animate", [0,1,2,1,3,0,1,3,2,1,3,0] );
		
		this.deathType = "fire";
		
},

	//manage the enemy movement
	update: function(){

		if ( !this.inViewport )
		{
            return false;
        }
	
		this.parent(this);
		return true;
	}
});

var neon_sign = me.ObjectEntity.extend({
	init: function(x, y, settings){

		settings.image = 'neon_sign';
		settings.spritewidth = 80;
		
		//call parent constructor
		this.parent(x, y, settings);
		
		this.renderable.addAnimation( "animate", [1,1,1,1,2,1,1,1,0,1,1,2] );
		
		this.collidable = false;
		this.playerCollidable = false;
},

	//manage the enemy movement
	update: function(){

		if ( !this.inViewport )
		{
            return false;
        }
		
		this.parent(this);
		return true;
	}
});