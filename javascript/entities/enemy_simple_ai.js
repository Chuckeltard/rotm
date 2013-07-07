// =====================================
// ======== SIMPLE ENEMY AI =============
// =====================================

var SimpleEnemy = me.ObjectEntity.extend({
    init: function(x, y, settings){

		//call parent constructor
		this.parent(x, y, settings);

		this.heightDiff = me.game.player.spriteheight - this.spriteheight;

		// enemy variables
		//this.alwaysUpdate = true;
		this.current_incapacitateTime = enemy_incapacitateTime;
		this.previously_visible = false;
		this.collidable = true;
		this.playerCollidable = true;
		this.type = me.game.ENEMY_OBJECT;
		this.enemyDirection = true;
		// audio variables
		this.current_sfxTimer = enemy_random_sfxTimer;
		this.play_sfx = true;
		this.stuckDelayMax = 2;
		this.stuckTimer = this.stuckDelayMax;
		this.meena_sleepCounter = meena_grenadeBurnTimer;
	},

	die: function()
    {
		saveData.kills++;
		//me.gamestat.updateValue("kills",1);
		me.game.remove( this );
    },

	incapacitate: function()
    {
		this.current_incapacitateTime--;
		//this.collidable = false;
		
		this.renderable.setCurrentAnimation( "incapacitated");
		
		if (this.current_incapacitateTime == 0)
		{
			this.enemyState = "dead";
			
			if (this.enemy_type != "ghost")
			{
				// randomly drop a key
				this.random_drop = Math.floor((Math.random()*100)+1)
				if (this.random_drop < 5)
				{
					this.small_key_drop = new Collectible_01_Entity(this.pos.x, this.pos.y + 0,{image: 'spinning_key', spritewidth: 16, spriteheight: 16, origin: "drop"});
					me.game.add(this.small_key_drop, this.z);
				}
				
				if (this.random_drop > 95)
				{
					this.new_abilityPickup = new abilityPickup(this.pos.x, this.pos.y + 0,{ origin: "drop"});
					me.game.add(this.new_abilityPickup, this.z);
				}
				
			}
			if (this.spritewidth > 32)
			{
				this.health_drop = new Health_Entity(this.pos.x, this.pos.y,{image: 'health_drop', spritewidth: 16, spriteheight: 16, origin: "drop"});
				this.health_drop.healthReplenish = largehealthReplenish;
			}
			else
			{
				this.health_drop = new Health_Entity(this.pos.x, this.pos.y,{image: 'health_drop_small', spritewidth: 10, spriteheight: 10, origin: "drop"});
				this.health_drop.healthReplenish = smallhealthReplenish;
			}
			
			me.game.add(this.health_drop, this.z);
			me.game.sort();
		}
    },

	sleep: function(type)
    {
		if (type == 'meena')
		{
			if (this.meena_sleepCounter <= 0)
			{
				this.renderable.setCurrentAnimation( "walk" );
				this.enemyState = 'alive';
				this.meena_sleepCounter = meena_grenadeBurnTimer;
			}
			else
			{
				this.setVelocity(0,0);
				this.renderable.setCurrentAnimation( "sleep" );
			}
			
			if (saveData.upgrade_meena_abilityunlocked_upgrade02 == 1)
			{
				this.health -= meena_grenadeBurnDamage;
			}
			
			this.meena_sleepCounter--;   
		}
		else if (type == "follower_stunned")
		{
			if (this.follower_stunCounter <= 0)
			{
				this.collidable = true;
				this.renderable.setCurrentAnimation( "flying" );
				this.enemyState = 'alive';
				this.onFocus();
				this.follower_stunCounter = this.follower_stunTimer;
			}
			else
			{
				this.enemyState = 'follower_stunned';
				this.setVelocity(0,0);
				//this.collidable = false;
				//this.renderable.setCurrentAnimation( "sleep" );
			}
			
			this.follower_stunCounter--;   		
		
		
		}
    },
	
    spawnParticle: function( x, y, sprite, spritewidth, frames, speed )
    {
        var settings = new Object();
        settings.image = sprite;
        settings.spritewidth = 16;
        
        var particle = new me.ObjectEntity( x, y, settings );
        particle.renderable.animationspeed = speed;
        particle.renderable.addAnimation( "play", frames );
		particle.renderable.setCurrentAnimation( "play", function() { 
			me.game.remove( particle );
		}.bind(this));

        me.game.add( particle, this.z + 1 );
        me.game.sort();
    },
	
	play_random_sfx: function()
    {
		this.current_sfxTimer--;
		
		if (this.current_sfxTimer == 0)
		{
			this.play_sfx = true;
		}
				
		if ( Math.floor((Math.random()*10000)+1) < 9 && this.play_sfx)
		{
			this.random_sfx = this.enemy_sfx_array[Math.floor(Math.random() * this.enemy_sfx_array.length)];
			me.audio.play( this.random_sfx,false,null,default_sfx_volume );
			
			this.play_sfx = false;
			this.current_sfxTimer = enemy_random_sfxTimer;
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
	
	//call by the engine when colliding with another object
	//obj parameter corresponds to the other object (typically the player) touching this one
    collide: function( res, obj )
    {
		if (this.enemyState == "alive" || this.enemyState == "meena_sleep")
		{
			if ( obj == me.game.player && me.game.player.enemyCollidable )
			{
				if (this.health < 0)
				{
					this.health = 0;
				}
				me.game.player.health -= this.damage;
				me.game.player.renderable.flicker(player_immunity_time);
				//me.gamestat.updateValue("damage_taken",this.damage);
				saveData.damage_taken += this.damage;

				if (this.enemy_type == "ghost")
				{
					this.enemyState = "incapacitated";
				}
				else
				{
					curData.abilityPickup = false;
				}
				
				if (this.enemy_type == "ghost_angry" || this.enemy_type == "bat")
				{
					this.sleep('follower_stunned');
				}

			}
			else if ( obj.type == me.game.bullet )
			{
				me.game.remove(obj);
				this.health -= me.game.player.bullet_damage;
				
				if (this.enemy_type == "bat")
				{
					if (!this.gatheredFocus)
					{
						this.gatheredFocus = true;
						this.onFocus();
					}
				}
				//me.gamestat.updateValue("damage_done",me.game.player.bullet_damage);
				saveData.damage_done += me.game.player.bullet_damage;

				if (this.enemyDirection)
				{
					this.spawnParticle( this.pos.x + this.particleOffsetX_right, this.pos.y + this.particleOffsetY, "bullet_hit_effects", 16, this.particleFrames, 1 );
				}
				else
				{
					this.spawnParticle( this.pos.x + this.particleOffsetX_left, this.pos.y + this.particleOffsetY, "bullet_hit_effects", 16, this.particleFrames, 1 );
				}
				
				me.audio.play( this.sfx_enemy_hit,false,null,default_sfx_volume );
				

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
			else if (obj.type == "KillEntity")
			{
				this.health = 0;
				this.KillEntity = true;
			}

			if (this.health <= 0)
			{
				this.enemyState = "incapacitated";
			}
		}
    },
	
	//manage the enemy movement
	update: function(){

		// stop enemy AI and movement if the game is paused
		if (gameisPaused == true && this.enemyState != "paused")
		{
			this.previousState = this.enemyState;
			this.enemyState = "paused";
			return false;
		}
		else if (gameisPaused == false && this.enemyState == "paused")
		{
			this.enemyState = this.previousState;
		}

		
		this.parent();
	}
});

// =====================================
// ===== RUN AND CLIMB ENEMY AI =========
// =====================================

var runandclimbEnemy = SimpleEnemy.extend({
    init: function(x, y, settings){

		//call parent constructor
		this.parent(x, y, settings);

		// enemy variables
		this.alwaysUpdate = true;
		this.current_incapacitateTime = enemy_incapacitateTime;
		this.previously_visible = false;

		this.playerCollidable = true;
		this.type = me.game.ENEMY_OBJECT;
		this.enemyDirection = true;
		// audio variables
		this.current_sfxTimer = enemy_random_sfxTimer;
		this.play_sfx = true;
		this.deadzone_distance = 150;
		this.deadzone_distance_far = 300;
		this.stuckDelayMax = 3;
		this.stuckTimer = this.stuckDelayMax;
		
	},
	
	//manage the enemy movement
	update: function(){

		if (!this.inViewport && this.previously_visible == false)
        {
            return false;
        }
		else if (!this.previously_visible == true)
		{
			// Set enemies to be active after they have been seen once.
			if (this.previously_visible == false)
			{
				this.previously_visible = true;
			}		
		}

		if (this.enemyState == "alive")
		{
			// Run through the random sfx function
			this.play_random_sfx();
			
			this.pos_diff_x = me.game.player.pos.x - this.pos.x;
			this.pos_diff_y = me.game.player.pos.y - this.pos.y;			
			
			var collision = this.updateMovement();
			
			if (collision.y) {
				if (collision.yprop.action == "turnaround_right")
				{
					this.update_action = 'right';
					//alert(collision.yprop.action);
					//this.doWalk(false);
				}
				else if (collision.yprop.action == "turnaround_left")
				{
					this.update_action = 'left';
					//this.doWalk(true);
				}
				else if (collision.yprop.action == 'jump' && this.enemy_type != "mummy")
				{
					this.update_action = 'jump';
				}
				else if (collision.yprop.action == 'climb' || this.onladder)
				{
					this.update_action = 'climb';
				}
				else
				{
					this.update_action = null;
				}
			}

			
			if (this.vel.x < 0)
			{
				this.enemyDirection = true;
				this.stuckTimer = this.stuckDelayMax;
			}
			else if (this.vel.x > 0)
			{
				this.enemyDirection = false;
				this.stuckTimer = this.stuckDelayMax;
			}
			else if (this.vel.x == 0 && !this.onladder)
			{
				this.stuckTimer--;
				
				if (this.stuckTimer == 0)
				{
					this.renderable.setCurrentAnimation( "walk" );

					if (this.enemy_type == "mummy")
					{
						if (this.enemyDirection == true)
						{
							this.enemyDirection = false;
						}
						else
						{
							this.enemyDirection = true;
						}
					}
					else
					{
						this.doWalk( me.game.player.pos.x < this.pos.x ); 
						this.doJump();
					}
					
					this.stuckTimer = this.stuckDelayMax;
				}
			}
				
			if (this.update_action == 'right')
			{
				this.doWalk( false );
			}
			else if (this.update_action == 'left')
			{
				this.doWalk( true );
			}
			else if (this.update_action == 'jump')
			{
				this.setVelocity(enemy_jumpSpeed, malyn_jumpHeight);
				this.doJump();
				this.doWalk(this.enemyDirection);
			}
			else if (this.update_action == 'climb')
			{
				if (this.onladder && this.enemy_type != "mummy" && this.enemy_type != "skeleton")
				{
					if (this.pos.y - this.heightDiff >= me.game.player.pos.y + 2 && this.pos.y - this.heightDiff <= me.game.player.pos.y - 2)
					{
						this.renderable.setCurrentAnimation( "walk" );
						this.doWalk(me.game.player.pos.x < this.pos.x);
					}
					else if (this.pos.y - this.heightDiff > me.game.player.pos.y + 2) // enemy is below the player
					{
						this.renderable.setCurrentAnimation( "climb" );
						this.vel.x = 0;
						this.doClimb(true);
					}
					else if (this.pos.y - this.heightDiff < me.game.player.pos.y - 10) // enemy is above the player
					{
						this.renderable.setCurrentAnimation( "climb" );
						this.vel.x = 0;
						this.doClimb(false);				
					}
					else
					{
						this.renderable.setCurrentAnimation( "walk" );
						this.doWalk(me.game.player.pos.x < this.pos.x);
					}
				}
				else
				{
					this.doWalk(this.enemyDirection);
				}
			}
			else if (this.pos.y - this.heightDiff < me.game.player.pos.y)
			{ // enemy is above the player
				if (this.pos_diff_x >= this.deadzone_distance_far) // player is to the right of enemy
				{
					this.renderable.setCurrentAnimation( "walk" );
					this.doWalk( false );
				}
				else if (this.pos_diff_x <= -this.deadzone_distance_far) // player is to the left of enemy
				{
					this.renderable.setCurrentAnimation( "walk" );
					this.doWalk( true );
				}
				else // player is within the dead zone
				{
					this.renderable.setCurrentAnimation( "walk" );
					this.doWalk( this.enemyDirection );
				}
			}
			else if (this.pos.y - this.heightDiff > me.game.player.pos.y)
			{ // enemy is below the player
				if (this.pos_diff_x >= this.deadzone_distance_far) // player is to the right of enemy
				{
					this.renderable.setCurrentAnimation( "walk" );
					this.doWalk( false );
					
				}
				else if (this.pos_diff_x <= -this.deadzone_distance_far) // player is to the left of enemy
				{
					this.renderable.setCurrentAnimation( "walk" );
					this.doWalk( true );
				}
				else // player is within the dead zone
				{
					/*
					// This is an attempt to get the enemies to jump up to the player on ledges... but it's just not there. It basically makes them look like a bunch of bouncy balls.
					if (this.enemy_type == "zombie" || this.enemy_type == "skeleton")
					{
						if (this.pos_diff_x >= -120 && this.pos_diff_x <= 120 && me.game.player.player_movementState != "jump" && me.game.player.player_movementState != "float")
						{
							console.log(this.deadzone_distance);
							this.doJump();
						}
					}
					*/
					this.renderable.setCurrentAnimation( "walk" );
					this.doWalk( this.enemyDirection );
				}
			}
			else if (this.pos_diff_x >= this.deadzone_distance) // player is to the right of enemy
			{
				this.renderable.setCurrentAnimation( "walk" );
				this.doWalk( false );
			}
			else if (this.pos_diff_x <= -this.deadzone_distance) // player is to the left of enemy
			{
				this.renderable.setCurrentAnimation( "walk" );
				this.doWalk( true );
			}
			else // player is within the dead zone
			{
				this.renderable.setCurrentAnimation( "walk" );
				this.doWalk( this.enemyDirection );
			}
			// Debug display
			/*
			me.game.HUD.setItemValue("debug_enemy_pos", this.pos.y.toFixed(2));
			me.game.HUD.setItemValue("debug_player_pos", me.game.player.pos.y);
			me.game.HUD.setItemValue("debug_pos_diff", this.update_action);
			*/
		}
		else if (this.enemyState == 'meena_sleep')
		{
			this.sleep('meena');
		}
		else if (this.enemyState == "incapacitated")
		{
			if (this.onladder)
			{
				this.setVelocity(0,0);
			}
			else
			{
				this.setVelocity(0,5);
			}
			this.updateMovement();
			this.incapacitate();
		}
		else if (this.enemyState == "dead")
		{
			this.die();
		}	
		//me.game.collide(this,true);
		this.parent();
	}
});


// =====================================
// ======== FOLLOW ENEMY AI ============
// =====================================

var FollowingEnemy = SimpleEnemy.extend({
	init: function(x, y, settings) {
		this.parent(x, y, settings);

		this.alwaysUpdate = true;
		this.onladder = true;
		this.aerial = true;
		this.follower_stunTimer = follower_stunTimer;
		this.follower_stunCounter = this.follower_stunTimer;
	},

  doMoveTowards: function(obj) {
    this.doWalk(me.game.player.pos.x < this.pos.x);
    this.doClimb(me.game.player.pos.y + me.game.player.centerOffsetX < this.pos.y);
  },

	
	update: function() {
	
		if (!this.inViewport && this.previously_visible == false)
        {
            return false;
        }
		else if (!this.previously_visible == true)
		{
			// Set enemies to be active after they have been seen once.
			if (this.previously_visible == false)
			{
				this.previously_visible = true;
			}		
		}
		
		if (this.enemyState == "alive")
		{
			if (this.vel.x < 0)
			{
				this.enemyDirection = false;
			}
			else if (this.vel.x > 0)
			{
				this.enemyDirection = true;
			}
			
			// Run through the random sfx function
			this.play_random_sfx();
			
			this.doMoveTowards(me.game.player);

			this.computeVelocity(this.vel);
			this.pos.add(this.vel);
		
		}
		else if (this.enemyState == 'meena_sleep')
		{
			this.sleep('meena');
		}
		else if (this.enemyState == "incapacitated")
		{
			this.setVelocity(0,5);
			this.updateMovement();
			this.incapacitate();
		}
		else if (this.enemyState == 'follower_stunned')
		{
			this.sleep('follower_stunned');
		}
		else if (this.enemyState == "dead")
		{
			this.die();
		}	
	
		this.parent(this);


	}
});


// =====================================
// ======== RANGED ENEMY AI ============
// =====================================

var RangedEnemy = SimpleEnemy.extend({
	init: function(x, y, settings) {
		this.parent(x, y, settings);
		
		this.alwaysUpdate = true;
	},

	update: function() {

		if (!this.inViewport && this.previously_visible == false)
        {
            return false;
        }
		else if (!this.previously_visible == true)
		{
			// Set enemies to be active after they have been seen once.
			if (this.previously_visible == false)
			{
				this.previously_visible = true;
			}		
		}
			
		if (this.enemyState == "alive")
		{
			// Run through the random sfx function
			this.play_random_sfx();
			
			if (me.game.player.pos.x < this.pos.x)
			{
				this.enemyDirection = true;
			}
			else
			{
				this.enemyDirection = false;
			}
            
			if (this.pos.x <= this.startX) 
			{
				this.doWalk(false);
				this.flipX(this.enemyDirection);
            } 
			else if (this.pos.x >= this.endX) 
			{
				this.doWalk(true);
				this.flipX(this.enemyDirection);
            }		
			
			
			if(this.shotTimer <= 0)
			{
				if (this.shotCount == this.shotCountMax && this.shotCountMax > 0)
				{
					this.doJump();
					this.shotCount = 0;
				}
				this.renderable.setCurrentAnimation( "shoot",function(){
					if (this.enemy_type == "liche")
					{
						if (this.enemyDirection == true)
						{
							this.liche_shot = new liche_bullet(this.pos.x - 10, this.pos.y + 25,{image: 'bullet_fireball', spritewidth: 15, spriteheight: 15, direction: this.enemyDirection});
						}
						else
						{
							this.liche_shot = new liche_bullet(this.pos.x + 55, this.pos.y + 25,{image: 'bullet_fireball', spritewidth: 15, spriteheight: 15, direction: this.enemyDirection});
						}
						this.liche_shot.vel.x -= liche_shootSpeed;
						me.game.add(this.liche_shot, this.z);
						
						me.audio.play( "fireball_01" );	
						me.game.sort();						
					}
					else if (this.enemy_type == "skeleton_ranged")
					{
						if (this.enemyDirection == true)
						{
							this.skeleton_ranged_shot = new GrenadeEntity(this.pos.x - 0, this.pos.y + 0,{image: 'skeleton_ranged_sword', spritewidth: 60, spriteheight: 59, direction: !this.enemyDirection, originator: "skeleton_ranged"});
						}
						else
						{
							this.skeleton_ranged_shot = new GrenadeEntity(this.pos.x + 0, this.pos.y + 0,{image: 'skeleton_ranged_sword', spritewidth: 60, spriteheight: 59, direction: !this.enemyDirection, originator: "skeleton_ranged"});
						}
						this.skeleton_ranged_shot.vel.x -= liche_shootSpeed;
						me.game.add(this.skeleton_ranged_shot, this.z);
						
						//me.audio.play( "fireball_01" );	
						me.game.sort();						
					}
					
					this.renderable.setCurrentAnimation( "walk" );
				}.bind(this));
				
				this.shotCount++;
				this.shotTimer = this.shotTimerMax;		
			}
			
			this.shotTimer--;
			
			this.updateMovement();
			//this.doMoveTowards(me.game.player);

			//this.computeVelocity(this.vel);
			//this.pos.add(this.vel);
		
		}
		else if (this.enemyState == 'meena_sleep')
		{
			this.sleep('meena');
		}
		else if (this.enemyState == "incapacitated")
		{
			this.setVelocity(0,5);
			this.updateMovement();
			this.incapacitate();
		}
		else if (this.enemyState == "dead")
		{
			this.die();
		}	
	
		this.parent(this);


	}
});


// =====================================
// ========== Drone ENEMY AI =============
// =====================================

var DroneEnemy = SimpleEnemy.extend({
	init: function (x, y, settings) {
		this.parent(x, y, settings);
		
		this.alwaysUpdate = true;
		this.behavior = settings.behavior;
		
		if (this.behavior == "circular") {
			this.behavior = new CircularMovementBehavior(this);
		}
		else if (this.behavior == "zig_zag") {
			this.behavior = new ZigZagMovementBehavior(this);
		}
		else {
			this.behavior = new SwingMovementBehavior(this);
		}
	},
    
	update: function () {
		
		if (this.enemyState == "alive")
		{
			this.diffX = me.game.player.pos.x - this.pos.x;
			
			// will need to update this once directional drones are available
			if (this.diffX < -1000 || this.diffX > 800)
			{
				me.game.remove(this);
			}
			this.behavior.update();
		}
		else if (this.enemyState == 'meena_sleep')
		{
			this.sleep('meena');
		}
		else if (this.enemyState == "incapacitated")
		{
			this.incapacitate();
		}
		else if (this.enemyState == "dead")
		{
			this.die();
		}	
		
		
		//this.updateMovement();
		this.parent();
		return true;
    },
    
    updateMovement: function () {
		//this.pos.x += this.vel.x;
    },
});



// =====================================
// ======== RANGED ENEMY AI ============
// =====================================

var DisappearingEnemy = SimpleEnemy.extend({
	init: function(x, y, settings) {
		this.parent(x, y, settings);
		
		this.alwaysUpdate = true;
	},

	update: function() {

		if (!this.inViewport && this.previously_visible == false)
        {
            return false;
        }
		else if (!this.previously_visible == true)
		{
			// Set enemies to be active after they have been seen once.
			if (this.previously_visible == false)
			{
				this.previously_visible = true;
			}
		}
			
		if (this.enemyState == "alive")
		{
			// Run through the random sfx function
			this.play_random_sfx();
			
			if (me.game.player.pos.x < this.pos.x)
			{
				this.enemyDirection = true;
				this.flipX(this.enemyDirection);
			}
			else
			{
				this.enemyDirection = false;
				this.flipX(this.enemyDirection);
			}
            
			if (this.pos.x <= this.startX) 
			{
				this.vel.x += this.enemy_Velocity;
            } 
			else if (this.pos.x >= this.endX) 
			{
				this.vel.x -= this.enemy_Velocity;
            }
			
			if(this.shotTimer >= this.appearTimer)
			{
				// create staff here and face correct direction
				
				if (this.enemyDirection == true)
				{
					this.liche_shot = new liche_bullet(this.pos.x - 10, this.pos.y + 25,{image: 'bullet_fireball', spritewidth: 15, spriteheight: 15, direction: this.enemyDirection});
				}
				else
				{
					this.liche_shot = new liche_bullet(this.pos.x + 55, this.pos.y + 25,{image: 'bullet_fireball', spritewidth: 15, spriteheight: 15, direction: this.enemyDirection});
				}
				
				this.vel.x = 0;
				this.vel.y = 0;
				
				this.liche_shot.vel.x -= liche_shootSpeed;
				
				this.collidable = true;
				this.visible = true;
				
				if (this.shotTimer == this.shotTimerMax)
				{
					this.renderable.setCurrentAnimation( "shoot",function()
					{
						me.game.add(this.liche_shot, this.z);
						
						me.audio.play( "fireball_01" );	
						me.game.sort();
						
						this.renderable.setCurrentAnimation( "walk" );
						
					}.bind(this));				
				}
				
				if (this.shotTimer >= this.shotTimerMax + 90)
				{
					this.shotTimer = 0;	
					this.visible = false;
					this.collidable = false;
					this.vel.x = this.enemy_Velocity;
					this.vel.y = this.enemy_Velocity;	
				}
				
			}
			else
			{
				this.pos.y = me.game.player.pos.y;
			}
			
			this.shotTimer++;
			
			this.updateMovement();
			//this.doMoveTowards(me.game.player);

			//this.computeVelocity(this.vel);
			//this.pos.add(this.vel);
		
		}
		else if (this.enemyState == 'meena_sleep')
		{
			this.sleep('meena');
		}
		else if (this.enemyState == "incapacitated")
		{
			this.setVelocity(0,5);
			this.updateMovement();
			this.incapacitate();
		}
		else if (this.enemyState == "dead")
		{
			this.die();
		}	
	
		this.parent(this);


	}
});