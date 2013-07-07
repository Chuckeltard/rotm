var EnemyEntity_licheboss = me.ObjectEntity.extend({
	init: function(x, y, settings){

		settings.image = 'liche_boss';
		settings.spritewidth = 200;
		settings.spriteheight = 200;
		//call parent constructor
		this.parent(x, y, settings);
		this.renderable.addAnimation( "walk", [1,1,3,3,0,0,1,1,2,2,3,3,1,1,0,0,1,1,0,0] );
        this.renderable.addAnimation( "incapacitated", [4,1,4,1,4,5,5,6,7,7,7,7,7,7,8,8] );
		
		this.health = licheboss_Health;
	
		this.gravity = licheboss_Gravity;
		this.spritewidth = 200;
		this.spriteheight = 200;
		
		this.enemyState = "alive";
		this.current_incapacitateTime = enemy_incapacitateTime;
		
		this.alwaysUpdate = true;
		this.collidable = true;
		this.playerCollidable = true;
		this.type = me.game.ENEMY_OBJECT;

		this.setVelocity(licheboss_Velocity, licheboss_Jump);
		
		this.inViewport = true;
		
		//me.debug.renderHitBox = true;
},

	die: function()
    {
		//me.gamestat.updateValue("kills",1);
		checkAchievement("kills");
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
			
			//this.spawnParticle( this.pos.x, this.pos.y - 48, "heart", 48, [ 0, 1, 2, 3, 4, 5, 6 ], 4 );
			//me.audio.play( "temp" );
        }
		else if ( obj.type == me.game.bullet )
        {
			this.health -= me.game.player.bullet_damage;

			me.game.remove(obj);
			
			if (this.health <= 0)
			{
				this.enemyState = "incapacitated";
			}
			
			
            //this.spawnParticle( this.pos.x, this.pos.y, "burned", 48, [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11 ], 4 );
            //me.audio.play( "temp" );
        }
    },
	
	//manage the enemy movement
	update: function(){

		if (!this.inViewport && this.previously_visible == false)
		{
			return false;
		}
		else
		{
			// Set enemies to be active after they have been seen once.
			if (this.previously_visible == false)
			{
				this.previously_visible = true;
			}
		}
			
		if (this.enemyState == "alive")
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
		else if (this.enemyState == "incapacitated")
		{
			this.incapacitate();
		}
		else if (this.enemyState == "dead")
		{
			this.die();
		}	
		
		// Debug display
		/*
		me.game.HUD.setItemValue("debug_enemy_pos", this.pos.y.toFixed(2));
		me.game.HUD.setItemValue("debug_player_pos", me.game.player.pos.y.toFixed(2));
		me.game.HUD.setItemValue("debug_pos_diff", this.pos_diff.toFixed(2));
		*/
		
		//check and update movement
		//this.updateMovement();	
		
		//update animation if necessary
		this.parent(this);
		return true;

	}
});



var EnemyEntity_licheboss_staff = me.ObjectEntity.extend({
	init: function(x, y, settings){

		settings.image = 'liche_boss_staff';
		settings.spritewidth = 200;
		settings.spriteheight = 200;
		
		//call parent constructor
		this.parent(x, y, settings);
		this.renderable.addAnimation( "walk", [4,4] );
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

		me.game.licheboss_staff = this;
		
		this.inViewport = true;
	},

	//manage the enemy movement
	update: function(){
		
		if (!this.inViewport && this.previously_visible == false)
		{
			return false;
		}
		else
		{
			// Set enemies to be active after they have been seen once.
			if (this.previously_visible == false)
			{
				this.previously_visible = true;
			}
		}
		
		this.pos_diff = me.game.player.pos.y - this.pos.y;
		this.enemy_center = this.spritewidth / 2 + 30;
		
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
	
		if(this.shotTimer == 0)
		{
			if (this.shotCount == this.multishot_Threshold)
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
				

			}
			else
			{	
				this.renderable.setCurrentAnimation( "shoot",function(){
					this.licheboss_shot = new licheboss_bullet(this.pos.x, this.pos.y + 150,{image: 'bullet_licheboss', spritewidth: 30, spriteheight: 30});
					this.licheboss_shot.vel.x -= licheboss_shootSpeed;
					this.licheboss_shot.alwaysUpdate = true;
					me.game.add(this.licheboss_shot, this.z);
					
					me.audio.play( "fireball_01" );
					
					me.game.sort();
					
					this.renderable.setCurrentAnimation( "walk" );
					
				}.bind(this));
				
				this.shotTimer = this.shotTimerMax;
				this.shotCount++;
			}
		}
		
		this.shotTimer--;
		
		//check and update movement
		//this.updateMovement();	
		
		//update animation if necessary
		this.parent(this);
		return true;

	}
});