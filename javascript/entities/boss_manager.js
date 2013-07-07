var boss_manager = me.ObjectEntity.extend({
	init: function(x, y, settings){

		this.parent(x, y, settings);
		
		this.alwaysUpdate = true;
		this.collidable = false;
		this.playerCollidable = false;
		
		//me.debug.renderHitBox = true;
		
		this.currentState = 1;
		this.stateInit = false;
		
		this.fireballRain_delay = 20;
		this.fireballRain_timer = this.fireballRain_delay;
		
		this.state_01_timer = 200;
		
		curData.boss_manager = this;
		
		curData.abilityPickup = true;
		curData.abilityPickup_type = "abilityLightning";
	},

	//manage the enemy movement
	update: function(){
		
		if (this.currentState == 1)
		{
			// boss appears and shoots fireballs up in to the sky
			if (this.stateInit == false)
			{
				if (me.game.player.pos.x >= 800)
				{
					me.game.player.playerState = "paused";
					bindKeys("unbind","gameplay");
					
					// add boss to level once the player reaches a certain location
					var addLiche = new boss_Liche(1000, 600, {state: 1, num: 1});
					me.game.add(addLiche, this.z);
					me.game.sort();

					this.stateInit = true;
				}
			}
			else
			{
				this.state_01_timer--;
				
				if (this.state_01_timer == 0)
				{
					console.log(this.state_01_timer);
					curData.boss_Liche_01.currentState = 2;
					this.currentState = 2;
					this.stateInit = false;
				}
			}
		}
		else if (this.currentState == 2)
		{	
			// boss moves out of sight
		}
		else if (this.currentState == 3)
		{
			if (this.stateInit == false)
			{
				// fireballs begin to rain from the sky
				bindKeys("bind","gameplay");
				me.game.player.playerState = "alive";
				
				this.stateInit = true;
			}
			
			// create fireballs here
			if (this.fireballRain_timer <= 0)
			{
				var addFireball = new boss_fireballRain(this.pos.x,this.pos.y,{});
				me.game.add(addFireball, this.z);
				me.game.sort();
				
				var addFireball = new boss_fireballRain(this.pos.x,this.pos.y,{type: "front_fireball"});
				me.game.add(addFireball, this.z);
				me.game.sort();
				
				this.fireballRain_timer = this.fireballRain_delay;
			}
			
			this.fireballRain_timer--;
		
			if (me.game.player.pos.x >= 2500)
			{
				this.currentState = 4;
				this.stateInit = false;
			}	
		}
		else if (this.currentState == 4)
		{
			if (this.stateInit == false)
			{
				// add bosses to level
				var addLiche = new boss_Liche(3000, 600, {state: 4, num: 1});
				me.game.add(addLiche, this.z);
				
				var addLiche = new boss_Liche(2300, 600, {state: 4, num: 2});
				me.game.add(addLiche, this.z);
				
				me.game.sort();
				
				this.stateInit = true;
			}
		
		
		}
		
		
		return true;

	}
});



var boss_Liche = me.ObjectEntity.extend({
	init: function(x, y, settings){

		settings.image = 'liche_boss';
		settings.spritewidth = 200;
		settings.spriteheight = 200;
		this.currentState = settings.state;
		this.num = settings.num;
		
		//call parent constructor
		this.parent(x, y, settings);
		
		this.renderable.addAnimation( "walk", [1,1,3,3,0,0,1,1,2,2,3,3,1,1,0,0,1,1,0,0] );
        this.renderable.addAnimation( "incapacitated", [4,1,4,1,4,5,5,6,7,7,7,7,7,7,8,8] );

		this.spritewidth = 200;
		this.spriteheight = 200;
		
		this.enemyState = "alive";
		this.alwaysUpdate = true;
		this.setVelocity(licheboss_Velocity, licheboss_Jump);
		this.type = me.game.ENEMY_OBJECT;
		this.gravity = licheboss_Gravity;
		this.current_incapacitateTime = enemy_incapacitateTime;
		
		if (this.currentState == 1)
		{
			this.health = licheboss_Health;
			
			console.log('staff');
		}
		else if (this.currentState == 4)
		{
			this.health = licheboss_Health;
		}
	
		this.collidable = true;
		this.playerCollidable = true;

		this.addLicheStaff = new boss_LicheStaff(this.pos.x - 100, this.pos.y, {state: this.currentState, num: this.num});
		me.game.add(this.addLicheStaff, this.z + 10);
		me.game.sort();
			
		if (this.num == 1)
		{
			curData.boss_Liche_01 = this;
		}
		else if (this.num == 2)
		{
			curData.boss_Liche_02 = this;
			this.flipX();
		}

	},

	die: function()
    {
		//me.gamestat.updateValue("kills",1);
		//checkAchievement("kills");
		//saveData.kills++;
		me.game.remove( this );
    },

	incapacitate: function()
    {
		this.vel.x = 0;
		this.vel.y = 0;
		this.current_incapacitateTime--;
		this.collidable = false;

		this.renderable.setCurrentAnimation( "incapacitated");
		me.game.remove(me.game.licheboss_staff);
		
		if (this.current_incapacitateTime == 0)
		{
			this.enemyState = "dead";
		}       
    },
	
    onCollision: function( res, obj )
    {
        this.collide( res, obj );
    },
    
    checkCollision: function( obj )
    {
        // collision optimization - this may not actually be necessary if we don't need to check enemy collision against something else
        if ( this.type == obj.type )
        {
            return null;
        }
        return this.parent( obj );
    },

    collide: function( res, obj )
    {
		
        if ( obj == me.game.player && me.game.player.enemyCollidable )
        {
			me.game.player.health -= licheboss_touch_Damage;
			me.game.player.flicker(player_immunity_time);
        }
		else if ( obj.type == me.game.bullet )
        {
			this.health -= me.game.player.bullet_damage;

			me.game.remove(obj);
        }
		else if (obj.type == "abilityLightning" || obj.type == "abilityLightning_explosion")
		{
			this.health -= obj.initialDamage;
			console.log(this.health);
		}
		else if ( obj.type == "grenade")
		{
			obj.explode();
		}
		else if ( obj.type == "grenadeExplosion")
		{
			if (obj.grenadeType == "malyn_grenadeExplosion")
			{
				this.health -= obj.initialDamage;
				me.audio.play( this.sfx_enemy_hit,false,null,default_sfx_volume );
			}
			else if (obj.grenadeType == "meena_grenadeExplosion")
			{
				this.enemyState = "meena_sleep";
				this.health -= obj.initialDamage;
				me.audio.play( this.sfx_enemy_hit,false,null,default_sfx_volume ); // change this to sleep sfx
			}
			else
			{
				this.health -= obj.initialDamage;
				me.audio.play( this.sfx_enemy_hit,false,null,default_sfx_volume );			
			}
			
		}
	},
	
	//manage the enemy movement
	update: function(){

		if (this.health <= 0)
		{
			this.enemyState = "incapacitated";
		}
			
		if (this.enemyState == "alive")
		{
			if (this.currentState == 1)
			{
				this.bossMovement();
			}
			else if (this.currentState == 2)
			{
				if (this.inViewport)
				{
					this.stageExit();
				}
				else
				{
					me.game.remove(this);
					me.game.remove(curData.boss_LicheStaff_01);
					curData.boss_manager.currentState = 3;
				}
			}
			else if (this.currentState == 3)
			{
			
			}
			else if (this.currentState == 4)
			{
				this.bossMovement();
			}
		}
		else if (this.enemyState == "incapacitated")
		{
			this.incapacitate();
		}
		else if (this.enemyState == "dead")
		{
			this.die();
		}	
		
		this.parent(this);
		return true;

	},

	stageExit: function()
	{
		this.pos_diff = me.game.player.pos.y - this.pos.y;
		this.enemy_center = this.spritewidth / 2;
		
		this.pos.x = this.pos.x + licheboss_Velocity;
		
		this.renderable.setCurrentAnimation( "walk" );
	},
	
	bossMovement: function()
	{
		this.pos_diff = me.game.player.pos.y - this.pos.y;
		this.enemy_center = this.spritewidth / 2;
		
		if (this.pos_diff >= this.enemy_center - 1 && this.pos_diff <= this.enemy_center + 1)
		{
			//this.setCurrentAnimation( "walk" );
		}
		else if (this.pos_diff < this.enemy_center) // below the player
		{
			// Make the boss float up from here
			this.pos.y = this.pos.y - licheboss_Velocity;
		}
		else if (this.pos_diff > this.enemy_center) // above the player
		{
			// Make the boss float down from here
			this.pos.y = this.pos.y + licheboss_Velocity;
		}
		
		this.renderable.setCurrentAnimation( "walk" );
	}
});



var boss_LicheStaff = me.ObjectEntity.extend({
	init: function(x, y, settings){

		settings.image = 'liche_boss_staff';
		settings.spritewidth = 200;
		settings.spriteheight = 200;
		this.currentState = settings.state;
		this.num = settings.num;
		
		//call parent constructor
		this.parent(x, y, settings);
		this.renderable.addAnimation( "walk", [4,4] );
		this.renderable.addAnimation( "airShot", [4,3,2,1,0,0,0,0] );
		this.renderable.addAnimation( "shoot", [4,3,2,1,0,0,0,0] );
        this.renderable.addAnimation( "3shot", [3,4,5,6,6,6,6,6,6,6,6,3,2,1,0] );

		this.gravity = licheboss_Gravity;
		this.spritewidth = 200;

		this.collidable = false;
		this.playerCollidable = false;
		this.type = me.game.ENEMY_OBJECT;
		this.alwaysUpdate = true;
		
		this.setVelocity(licheboss_Velocity, licheboss_Jump);
		
		this.shotCount = 0;
		this.shotTimer = licheboss_shotTimer;
		this.shotTimerMax = this.shotTimer;
		this.multishot_Threshold = licheboss_multishot_Threshold;

		if (this.num == 1)
		{
			curData.boss_LicheStaff_01 = this;
		}
		else if (this.num == 2)
		{
			curData.boss_LicheStaff_02 = this;
			this.flipX();
		}
		
	},

	//manage the enemy movement
	update: function(){
		
		if (this.num == 1)
		{
			this.pos.x = curData.boss_Liche_01.pos.x - 70;
			this.pos.y = curData.boss_Liche_01.pos.y;
		}
		else if (this.num == 2)
		{
			this.pos.x = curData.boss_Liche_02.pos.x + 70;
			this.pos.y = curData.boss_Liche_02.pos.y;		
		}
		
		
		if (curData.boss_Liche_01.currentState == 1)
		{
			this.airShot();
		}
		else if (curData.boss_Liche_01.currentState == 2)
		{
		
		}
		else if (curData.boss_Liche_01.currentState == 3)
		{
		
		}
		else if (curData.boss_Liche_01.currentState == 4)
		{
		
		}
		else
		{
			if(this.shotTimer == 0)
			{
				if (this.shotCount == this.multishot_Threshold)
				{	
					this.multiShot();
				}
				else
				{	
					this.singleShot();
				}
			}
		}
		
		this.shotTimer--;
		
		//check and update movement
		//this.updateMovement();	
		
		//update animation if necessary
		this.parent(this);
		return true;

	},

	airShot: function()
	{
		this.renderable.setCurrentAnimation( "airShot",function(){
			this.licheboss_shot = new licheboss_bullet(this.pos.x, this.pos.y + 150,{image: 'bullet_licheboss', spritewidth: 30, spriteheight: 30, direction: "up"});
			this.licheboss_shot.vel.y -= licheboss_shootSpeed;
			this.licheboss_shot.vel.x = 0;
			this.licheboss_shot.alwaysUpdate = true;
			me.game.add(this.licheboss_shot, this.z);
			
			me.audio.play( "fireball_01" );
			
			me.game.sort();
			
			this.renderable.setCurrentAnimation( "walk" );
			
		}.bind(this));
		
		this.shotTimer = this.shotTimerMax;
		this.shotCount++;	
	},
	
	singleShot: function(direction)
	{
		if (direction)
		{
			this.direction = direction;
		}
		else
		{
			this.direction = "left";
		}
		
		this.renderable.setCurrentAnimation( "shoot",function(){
			this.licheboss_shot = new licheboss_bullet(this.pos.x, this.pos.y + 150,{image: 'bullet_licheboss', spritewidth: 30, spriteheight: 30, });
			this.licheboss_shot.vel.x -= licheboss_shootSpeed;
			this.licheboss_shot.alwaysUpdate = true;
			me.game.add(this.licheboss_shot, this.z);
			
			me.audio.play( "fireball_01" );
			
			me.game.sort();
			
			this.renderable.setCurrentAnimation( "walk" );
			
		}.bind(this));
		
		this.shotTimer = this.shotTimerMax;
		this.shotCount++;	
	},
	
	multiShot: function()
	{
		this.renderable.setCurrentAnimation( "3shot",function(){
			this.licheboss_shot = new licheboss_bullet(this.pos.x, this.pos.y + 40,{image: 'bullet_licheboss', spritewidth: 30, spriteheight: 30});
			this.licheboss_shot.vel.x -= licheboss_shootSpeed;
			this.licheboss_shot.alwaysUpdate = true;
			me.game.add(this.licheboss_shot, this.z);
		
			this.licheboss_shot = new licheboss_bullet(this.pos.x, this.pos.y + 95,{image: 'bullet_licheboss', spritewidth: 30, spriteheight: 30});
			this.licheboss_shot.vel.x -= licheboss_shootSpeed;
			this.licheboss_shot.alwaysUpdate = true;
			me.game.add(this.licheboss_shot, this.z);

			this.licheboss_shot = new licheboss_bullet(this.pos.x, this.pos.y + 150,{image: 'bullet_licheboss', spritewidth: 30, spriteheight: 30});
			this.licheboss_shot.vel.x -= licheboss_shootSpeed;
			this.licheboss_shot.alwaysUpdate = true;
			me.game.add(this.licheboss_shot, this.z);
			
			me.audio.play( "fireball_01" );
				
			me.game.sort();
			
			this.renderable.setCurrentAnimation( "walk" );
		
			this.shotTimer = this.shotTimerMax;
			this.shotCount = 0;
		}.bind(this));
	},
});

var boss_fireballRain = me.ObjectEntity.extend({
	init: function (x,y,settings) {
		settings.image = 'bullet_licheboss';
		settings.spritewidth = 30;
		settings.spriteheight = 30;
		
		if (settings.type)
		{
			if (settings.type == "front_fireball")
			{
				this.xDistance = 460;
			}
		}
		else
		{
			this.maxVal = 350,
			this.minVal = 100,
			this.includeZero = true,
			
			this.xDistance;

			do this.xDistance = Math.ceil(Math.random() * (this.maxVal + this.minVal)) - this.minVal;
			while (this.includeZero === false && result === 0);	
		}
		
		this.parent(x, y, settings);

		this.collidable = true;
		this.alwaysUpdate = true;
		
		this.type = me.game.ENEMY_OBJECT;
		this.bullet_type = 'licheboss_bullet';
		
		this.VEL_Y = 4;
		
		this.spriteheight = settings.spriteheight;
		this.spritewidth = settings.spritewidth;

	
		

		this.pos.x = me.game.player.pos.x + this.xDistance;

		if (this.pos.x <= 0)
		{
			this.pos.x = -this.pos.x
		}
		
		console.log(this.xDistance);
		
		this.pos.y = me.game.player.pos.y - 500;
		this.gravity = 10;
		
		this.setVelocity(0, this.VEL_Y);

		//this.updateColRect(60, 60, 500, 5);
    },

    onCollision: function( res, obj )
    {
        this.collide( res, obj );
    },
    
	//call by the engine when colliding with another object
	//obj parameter corresponds to the other object (typically the player) touching this one
    collide: function( res, obj )
    {

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
		this.lightningExplosion = new GrenadeExplosionEntity(this.pos.x + 15, this.pos.y + 15,{originator: this.originator, direction: this.direction});
		me.game.add(this.lightningExplosion, this.z);		
		me.game.sort.defer();
		me.game.remove(this);
	},
});