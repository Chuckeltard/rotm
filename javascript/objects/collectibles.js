//Key collectable information
var Collectible_01_Entity = me.CollectableEntity.extend({
	init: function(x, y, settings){
		settings.image = 'spinning_key';
		settings.spritewidth = 16;
		settings.spriteheight = 16;
		this.origin = settings.origin;
		this.spritewidth = settings.spritewidth;
		this.spriteheight = settings.spriteheight;
		this.counter = 600;
		
		this.parent(x, y, settings);
		
		this.type = me.game.COLLECTABLE_OBJECT;
		
		if (this.origin == "drop")
		{
			this.gravity = 0.35;
			this.alwaysUpdate = true;
		}
		else
		{
			this.gravity = 0;
			this.alwaysUpdate = false;
		}
	},

	onCollision: function(res, obj){	

		if(obj.type == "mainPlayer"){
			saveData.key_pickup++;
			saveData.key_currency++;
			me.audio.play("key_pickup",false,null,default_sfx_volume );
			me.game.remove(this);
		}
	},

	update: function () {

		if (this.origin == "drop")
		{
			if (this.pos.y >= me.game.player.pos.y + 600 || this.counter <= 0)
			{
				me.game.remove(this);
				return false;
			}
			else
			{
				this.updateMovement();
				this.counter--;			
			}
		}
		
		if (this.onladder)
		{
			this.vel.y = 0;
			this.vel.x = 0;
			this.gravity = 0;
		}
		
		//me.game.collide(this,true);
        
        this.parent();
        return true;    
	},

	onDestroyEvent: function(){

	}
});


// Listing collectable information
var Collectible_02_Entity = me.CollectableEntity.extend({
	init: function(x, y, settings){
		settings.image = 'listing';
		settings.spritewidth = 32;
		settings.spriteheight = 60;
		this.id = settings.id;

		this.parent(x, y, settings);

		this.renderable.addAnimation( "inactive", [6] );
		this.renderable.addAnimation( "active", [0,1,2,3,4,5] );
			
		this.type = me.game.COLLECTABLE_OBJECT;
		
		this.current_listing = selectedlevel+"_listing_"+this.id;
		
		// check if listing is already collected - if so, set to inactive
		if (saveData[this.current_listing] == 1)
		{
			this.renderable.setCurrentAnimation( "inactive" );
			this.collidable = false;
		}
		else
		{
			this.renderable.setCurrentAnimation( "active" );
		}
	},
	
	onCollision: function(res, obj){	
		if(obj.type == "mainPlayer"){
			saveData.listing_pickup++;
			me.audio.play("listing_pickup");
			saveData[this.current_listing] = 1;
			me.game.remove(this);
		}
	},

	onDestroyEvent: function(){

	}
});

// Health Collectable
var Health_Entity = me.CollectableEntity.extend({
    init: function (x, y, settings) {
		
		this.parent(x, y, settings);
		this.origin = settings.origin;
		this.spritewidth = settings.spritewidth;
		this.spriteheight = settings.spriteheight;
		
		this.type = me.game.COLLECTABLE_OBJECT;
		this.moveLimit = 5;
		this.moveDirection;
		this.collidable = true;
		this.healthReplenish = settings.healthReplenish
		this.counter = 600;
		this.alwaysUpdate = true;
		
		if (this.origin == "drop")
		{
			this.gravity = 0.35;
		}
		else
		{
			this.gravity = 0;
		}
    },
	
	update: function () {

		if (this.pos.y >= me.game.player.pos.y + 600 || this.counter <= 0)
		{
			me.game.remove(this);
			return false;
		}
		else
		{
			this.updateMovement();
			this.counter--;			
		}
		
		if (this.onladder)
		{
			this.vel.y = 0;
			this.vel.x = 0;
			this.gravity = 0;
		}
		
		//me.game.collide(this,true);
        this.parent();
        return true;    
    },

	onCollision: function(res, obj){
		if(obj.type == "mainPlayer")
		{
			
			if (me.game.player.health + this.healthReplenish > me.game.player.maxHealth && me.game.player.health + this.healthReplenish < 100)
			{
				me.game.player.health = me.game.player.maxHealth;
			}
			else
			{
				me.game.player.health += this.healthReplenish;
			}

			saveData.health_pickup += this.healthReplenish;
			me.audio.play("health_pickup");
			me.game.remove(this);
		}
	},
	
	onDestroyEvent: function(){

	}
});

var abilityPickup = me.CollectableEntity.extend({
	init: function(x, y, settings){
	
		if (settings.type)
		{
			this.random_ability = settings.type;
		}
		else
		{
			this.ability_array = new Array("abilityLightning","abilityGrenade");
			this.random_ability = this.ability_array[Math.floor(Math.random() * this.ability_array.length)];
		}
		
		if (this.random_ability == "abilityLightning")
		{
			settings.image = 'pickup_lightning';
		}
		else if (this.random_ability == "abilityGrenade")
		{
			settings.image = 'pickup_lightning';
		}
		else
		{
			settings.image = 'pickup_lightning';
		}
		
		console.log(this.random_ability);
		
		settings.spritewidth = 20;
		settings.spriteheight = 20;
		
		this.origin = settings.origin;
		this.spritewidth = settings.spritewidth;
		this.spriteheight = settings.spriteheight;
		this.counter = 600;

		
		this.parent(x, y, settings);
		
		this.type = me.game.COLLECTABLE_OBJECT;
		
		if (this.origin == "drop")
		{
			this.gravity = 0.35;
			this.alwaysUpdate = true;
		}
		else
		{
			this.gravity = 0;
			this.alwaysUpdate = false;
		}
	},

	onCollision: function(res, obj){	

		if(obj.type == "mainPlayer"){
			curData.abilityPickup = true;
			curData.abilityPickup_type = this.random_ability;
			saveData.ability_pickup++;
			me.audio.play("halfsec",false,null,default_sfx_volume );
		
			var new_abilityEffect = new abilityEffect(this.pos.x, this.pos.y, {type: this.random_ability});

			me.game.add(new_abilityEffect, this.z + 1);
			me.game.sort.defer();
		
			me.game.remove(this);
		}
	},

	update: function () {

		if (this.origin == "drop")
		{
			if (this.pos.y >= me.game.player.pos.y + 600 || this.counter <= 0)
			{
				me.game.remove(this);
				return false;
			}
			else
			{
				this.updateMovement();
				this.counter--;			
			}
		}
		
		if (this.onladder)
		{
			this.vel.y = 0;
			this.vel.x = 0;
			this.gravity = 0;
		}
		
		//me.game.collide(this,true);
        
        this.parent();
        return true;    
	},

	onDestroyEvent: function(){

	}
});