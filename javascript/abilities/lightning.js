var LightningEntity = me.ObjectEntity.extend({
	init: function (x, y, settings) {
		this.parent(x, y, settings);
		this.direction = settings.direction;
		this.originator = settings.originator;
		this.collidable = true;
		this.alwaysUpdate = true;
		
		this.type = "abilityLightning";
	
		this.VEL_Y = 50;

		this.spriteheight = settings.spriteheight;
		this.spritewidth = settings.spritewidth;
		
		this.xDistance = 150;
		
		this.initialDamage = abilityLightning_damage;
		
		if (this.direction)
		{
			this.pos.x = me.game.player.pos.x + this.xDistance;
		}
		else
		{
			this.pos.x = me.game.player.pos.x - this.xDistance - this.spritewidth;
		}
			
		
		this.pos.y = me.game.player.pos.y - 1000;
		this.gravity = 10;
		
		this.setVelocity(0, this.VEL_Y);

		//me.debug.renderHitBox = true;
		this.updateColRect(60, 60, 500, 5);
    },

    onCollision: function( res, obj )
    {
        this.collide( res, obj );
    },
    
	//call by the engine when colliding with another object
	//obj parameter corresponds to the other object (typically the player) touching this one
    collide: function( res, obj )
    {
		if (obj.type == "movingPlatform")
		{
			this.explode();
		}
	},
	
	update: function () {
		
		if (this.pos.y + this.spriteheight - me.game.player.spriteheight > me.game.player.pos.y + 200)
		{
			me.game.remove(this);
			return false;
		}		
		
		var collision = this.updateMovement();
		
		this.parent(this);
		me.game.collide(this,true);
		
		if (collision.yprop.isSolid || collision.yprop.isPlatform)
		{
			this.explode_posY = this.pos.y + this.spriteheight - me.game.player.spriteheight;
			this.explode();
			console.log('explode');
			return false;
			
		}

		return true;
    },

	explode: function()
	{	
		this.lightningExplosion = new LightningExplosionEntity(this.pos.x, this.explode_posY,{originator: this.originator, direction: this.direction});
		me.game.add(this.lightningExplosion, this.z);		
		
		this.lightningStrike = new LightningStrikeEntity(this.pos.x, this.pos.y,{originator: this.originator, direction: this.direction});
    	me.game.add(this.lightningStrike, this.z);
        me.game.sort();
		me.game.remove(this);
	},
});


var LightningExplosionEntity = me.ObjectEntity.extend({
	init: function (x, y, settings) {
		
		this.originator = settings.originator;
		this.alwaysUpdate = true;
		
		if (this.originator == "TBD") // change to lightning character here and all data below until else statement
		{
			if (saveData.upgrade_malyn_abilityunlocked_upgrade01 == 1)
			{
				// change this to the new ability upgrade
				settings.image = "grenade_explosion";
				settings.spritewidth = 100;
				settings.spriteheight = 50;
			}
			else
			{
				settings.image = "grenade_explosion";
				settings.spritewidth = 100;
				settings.spriteheight = 50;
			}
			
			y = y - 25;
			x = x - 50;
			
			this.burnTimer = malyn_grenadeBurnTimer;
			this.initialDamage = abilityLightning_damage;
			this.burnDamage = malyn_grenadeBurnDamage;
			this.type = "abilityLightning_explosion";
			this.explosion_sfx = me.audio.play("malyn_grenade_explosion");
		}
		else
		{
			settings.image = "grenade_explosion";
			settings.spritewidth = 100;
			settings.spriteheight = 50;
			
			y = y;
			x = x + 30;
			
			this.burnTimer = malyn_grenadeBurnTimer;
			this.initialDamage = abilityLightning_damage;
			this.type = "abilityLightning_explosion";
			this.explosion_sfx = me.audio.play("malyn_grenade_explosion");		
		
		}

		
		this.direction = settings.direction;

		this.parent(x, y, settings);
		this.renderable.addAnimation( "explode", [0,1,1,2,2,2,2,2] );
		
		this.gravity = 10;
		this.collidable = true;	
	
		this.burnCountdown = this.burnTimer;
		
	},
	
    update: function () {
		
		me.game.collide(this,true);
		this.renderable.setCurrentAnimation( "explode" );
		this.explosion_sfx;
		
		if (this.burnCountdown == 0)
		{
			me.game.remove(this);
		}
		
		this.burnCountdown--;

		this.parent(this);
		return true;
    },

	
	onDestroyEvent: function () {

	},
});

var LightningStrikeEntity = me.ObjectEntity.extend({
    init: function (x, y, settings) {
		
		this.originator = settings.originator;
		this.alwaysUpdate = true;
		
		settings.image = "lightning";
		settings.spritewidth = 145;
		settings.spriteheight = 500;


		this.parent(x, y, settings);
		this.renderable.addAnimation( "strike", [2,3,1,1,2,1,2,2], 1 );
		
		this.gravity = 10;
		this.collidable = false;	
		
	},
	
    update: function () {
		
		this.renderable.setCurrentAnimation( "strike",function(){
			this.explosion_sfx;
			me.game.remove(this);
			
		}.bind(this));
		
		this.parent(this);
		return true;
    },

	
	onDestroyEvent: function () {

	},
});