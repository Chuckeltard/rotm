var GrenadeEntity = me.ObjectEntity.extend({
	init: function (x, y, settings) {
		this.parent(x, y, settings);
		this.direction = settings.direction;
		this.originator = settings.originator;
		this.collidable = true;
		this.alwaysUpdate = true;
		
		if (this.originator == "skeleton_ranged")
		{
			this.grenadeType = "skeleton_ranged_sword";
			this.renderable.addAnimation( "stuck", [5,5,5,4,5,4,4,5,5,5,4,5,5] );
			this.type = me.game.ENEMY_OBJECT;
			
			// adjust the bounding box
			this.updateColRect(5, 50, 5, 54);
		
			this.VEL_Y = 2.0;
			this.UP_VEL_X = 1.4;
			this.DOWN_VEL_X = 1.4;
			this.flyupDuration = 120;
			this.hoverTime = 5;
		}
		else
		{
			this.type = "grenade";
			this.grenadeType = "grenade";
			this.VEL_Y = 5.5;
			this.UP_VEL_X = 7.5;
			this.UP_GRAVITY = 0.2;
			this.DOWN_VEL_X = 2.5;
			this.DOWN_GRAVITY = 0.2;
			this.horizontalFlyTimer = 0;
			this.horizontalFlyDuration = 0;
		}
		
		this.setVelocity(this.DOWN_VEL_X, this.VEL_Y);
		this.forceJump();
    },
    update: function () {

		if (me.game.player.pos.x - this.pos.x < -900 || me.game.player.pos.x - this.pos.x > 900 || me.game.player.pos.y - this.pos.y > 600 || me.game.player.pos.y - this.pos.y < -600)
		{
			me.game.remove(this);
			return false;
		}

		this.parent(this);
		me.game.collide(this);
		
		if (this.originator == "skeleton_ranged")
		{
			this.updateSwordThrow();
		}
		else
		{
			this.updateVelocityAndGravity();
			this.updateMovement();

			if (this.vel.x == 0 || this.vel.y == 0)
			{
				this.explode();
			}
		}

		return true;
    },
	updateSwordThrow: function () {

		if (this.flyupDuration > this.hoverTime)
		{
			if (this.direction)
			{
				this.pos.x += this.UP_VEL_X;
			}
			else
			{
				this.pos.x -= this.UP_VEL_X;
			}

			this.pos.y -= this.VEL_Y;
	
		}
		else if (this.flyupDuration <= this.hoverTime && this.flyupDuration >= 0)
		{
			if (this.direction)
			{
				this.pos.x += this.DOWN_VEL_X;
			}
			else
			{
				this.pos.x -= this.DOWN_VEL_X;
			}			
		}
		else
		{
			if (this.direction)
			{
				this.pos.x += this.DOWN_VEL_X;
			}
			else
			{
				this.pos.x -= this.DOWN_VEL_X;
			}
			
			if (this.DOWN_VEL_X > 0.5)
			{
				this.DOWN_VEL_X -= .008;
			}
		
			this.pos.y += this.VEL_Y;
		}
		
		this.flyupDuration--;
		if (this.pos.y - me.game.player.pos.y >= 1000)
		{
			me.game.remove(this);
		}
	},
		
	updateVelocityAndGravity: function () {
		if (this.falling) {
			this.horizontalFlyTimer++;

			if (this.horizontalFlyTimer > this.horizontalFlyDuration) {
				this.vel.x = this.direction ? this.DOWN_VEL_X : -this.DOWN_VEL_X;
				this.gravity = this.DOWN_GRAVITY;
			}
			else {
				this.vel.x = this.direction ? this.UP_VEL_X : -this.UP_VEL_X;
				this.gravity = 0;
			}
		}
		else {
			this.gravity = this.UP_GRAVITY;
			this.vel.x = this.direction ? this.UP_VEL_X : -this.UP_VEL_X;
		}
    },

    onCollision: function( res, obj )
    {
        this.collide( res, obj );
    },
	
	collide: function( res, obj )
    {
		
	},
	
	explode: function()
	{	
		this.grenadeExplosion = new GrenadeExplosionEntity(this.pos.x, this.pos.y,{originator: this.originator, direction: this.direction});
		me.game.add(this.grenadeExplosion, this.z);		
		me.game.sort.defer();
		me.game.remove(this);		
	},
});

var GrenadeExplosionEntity = me.ObjectEntity.extend({
	init: function (x, y, settings) {
		
		this.originator = settings.originator;
		this.alwaysUpdate = true;
		
		if (this.originator == "malyn")
		{
			if (saveData.upgrade_malyn_abilityunlocked_upgrade01 == 1)
			{
				// change this to the new grenade explosion image and width/height
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
			this.initialDamage = malyn_grenadeInitialDamage;
			this.burnDamage = malyn_grenadeBurnDamage;
			this.grenadeType = "malyn_grenadeExplosion";
			this.explosion_sfx = me.audio.play("malyn_grenade_explosion");
		}
		else if (this.originator == "meena")
		{
			if (saveData.upgrade_meena_abilityunlocked_upgrade01 == 1)
			{
				this.burnTimer = meena_grenadeBurnTimer * 2;
			}
			else
			{
				this.burnTimer = meena_grenadeBurnTimer;
			}

			settings.image = "grenade_explosion";
			settings.spritewidth = 100;
			settings.spriteheight = 50;
			y = y - 25;
			x = x - 50;
			
			this.initialDamage = 0;
			this.burnDamage = 0;	
			this.grenadeType = "meena_grenadeExplosion";
			this.explosion_sfx = me.audio.play("malyn_grenade_explosion");
		}
		else
		{
			settings.image = "grenade_explosion";
			settings.spritewidth = 100;
			settings.spriteheight = 50;
			y = y - 25;
			x = x - 50;
			this.burnTimer = 1;
			this.initialDamage = 50;
			this.burnDamage = 0;
			this.grenadeType = "generic_grenadeExplosion";
			this.explosion_sfx = me.audio.play("malyn_grenade_explosion");
		}
		
		this.direction = settings.direction;

		this.parent(x, y, settings);
		this.renderable.addAnimation( "explode", [0,1,1,2,2,2,2,2] );
		this.type = "grenadeExplosion";
		
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
			if (this.originator == "malyn" && saveData.upgrade_malyn_abilityunlocked_upgrade02 == 1)
			{
				var grenade = new GrenadeEntity(this.pos.x + 50, this.pos.y, {image: "grenade", spritewidth: 16, direction: this.direction, originator: selectedHero});

				me.game.add(grenade, this.z);
				me.game.sort.defer();
			
			}
			me.game.remove(this);
		}
		
		this.burnCountdown--;

		this.parent(this);
		return true;
    },

	
	onDestroyEvent: function () {

	},

});