var PlayerEntity = me.ObjectEntity.extend({

	init: function(x, y, settings){

		//call ObjectEntity constructor
		this.parent(x, y, settings);

		this.enemyCollidable = true;
		this.playerState = "alive";
		this.playerDirection = true;
		this.type = "mainPlayer";
		this.collidable = true;
		this.disableTopLadderCollision = true;
		this.alwaysUpdate = true;
		this.floatTimer = 160;
		this.floatCounter = this.floatTimer;
		this.floatCooldown = true;
		
		//me.debug.renderHitBox = true;
		//set display to follow player's position on x and y axis
		me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);

		me.game.player = this;

		if (bWorldLevel == true)
		{
			this.gravity = 0;
		}

		//me.input.registerMouseEvent('mousedown', this.collisionBox, this.onMouseDown.bind(this), true);
	},

	/*onMouseDown: function()
	{
				this.playerDirection = true;
				this.player_movementState = "walk_right";
				this.setFriction(0,0);
				this.setCurrentAnimation( "walk" );
				faceLeft = false;
				shootLeft = false;
				shootRight = true;
				this.doWalk(false);
				return true;
	},
	*/

	update: function(){

		// ===============================
		// ===== DEBUG FUNCTIONALITY =====
		// ===============================
		/*
		me.game.HUD.setItemValue("debug1", this.player_movementState);
		me.game.HUD.setItemValue("debug2", this.player_jumpState);
		me.game.HUD.setItemValue("debug3", this.vel.y);
		*/
		if (me.input.isKeyPressed('NUM1')) { this.giveLife(); }
		if (me.input.isKeyPressed('NUM2')) { this.oneshotKills(); }
		if (me.input.isKeyPressed('NUM3')) { this.giveSpeed(); }
		if (me.input.isKeyPressed('NUM4')) {	this.slowSpeed(); }
		if (me.input.isKeyPressed('NUM5')) {	this.giveKeys(); }
		if (me.input.isKeyPressed('NUM6')) {	this.giveListings();	}
		if (me.input.isKeyPressed('NUM7')) {	this.giveListings();	}	
		if (me.input.isKeyPressed('NUM8')) {	this.giveListings(); }	
		if (me.input.isKeyPressed('NUM9')) {	this.unlockProgression(); }	
		if (me.input.isKeyPressed('NUM0')) {	this.clearProgression(); }			
		
		this.current_player_shootCooldown--;

		if (this.playerState == "alive")
		{
			if (this.health <= 0)
			{
				this.playerState = "incapacitated";
				return true;
			}
			
			this.setFriction(0,0);

			if (bWorldLevel == true)
			{
				this.gravity = 0;
				
				if (me.input.isKeyPressed('up'))
				{
					this.renderable.setCurrentAnimation("climb");
					// move the player up on the screen
					this.vel.y = (true) ? -this.accel.x * me.timer.tick
						: this.accel.x * me.timer.tick;
				}
				else if(me.input.isKeyPressed('down'))
				{
					this.renderable.setCurrentAnimation("climb");
					// move the player down on the screen
					this.vel.y = (false) ? -this.accel.x * me.timer.tick
						: this.accel.x * me.timer.tick;
				}
				else
				{
					this.vel.y = 0;
					this.vel.x = 0;
					this.renderable.setCurrentAnimation("idle");
				}
			}
			else
			{
				if(this.onladder)
				{
					if (me.input.isKeyPressed('up') || climbUp == true )
					{
						this.setFriction(0,1);
						this.renderable.setAnimationFrame(8);
						this.player_movementState = "ladder_up";
						this.renderable.setCurrentAnimation("climb");
						//this.animationspeed = me.sys.fps/5;
						this.doClimb(true);
					}
					else if(me.input.isKeyPressed('down') || climbDown == true)
					{
						this.setFriction(0,1);
						this.renderable.setAnimationFrame(8);
						this.player_movementState = "ladder_down";
						this.renderable.setCurrentAnimation("climb");
						//this.animationspeed = me.sys.fps/5;
						this.doClimb(false);
					}
					else
					{
						this.setFriction(0,1);
						this.player_movementState = "ladder_idle";
						this.vel.y = 0;
						this.renderable.setAnimationFrame(8);
						this.renderable.setCurrentAnimation("idleClimb");
					}
				}
				else
				{
					this.setFriction(0, 0);

					if(!this.renderable.isCurrentAnimation("idleClimb"))
					{
						this.renderable.setCurrentAnimation( "idle" );
					}
				}
				
				if((me.input.keyStatus('jump') || jumpButton == true) && !this.onladder)
				{
					this.playerFloat();
				}
				else
				{
					this.jumpkeypressed = false;
					
					if ((this.vel.y < 0 && this.player_jumpState == "jump") || this.falling)
					{
						this.gravity = 0.35;
					}
					else
					{
						if (saveData.upgrade_global_doublejump == 1)
						{
							this.doublejumpCooldown = false;
						}
						// set standard animation here
						this.gravity = 0.35;
						this.floatCounter = this.floatTimer;
						this.floatCooldown = true;	
						this.player_jumpState = "ground";
					}
				}
			
			}
			
			if(me.input.isKeyPressed('left') || walkLeft == true)
			{
				this.player_movementState = "walk_left";
				this.setFriction(0,0);
				this.renderable.setCurrentAnimation( "walk" );
				this.playerDirection = false;
				faceLeft = true;
				shootLeft = true;
				shootRight = false;
				this.doWalk(true);
				walkRight = false;
			}
			else if(me.input.isKeyPressed('right') || walkRight == true)
			{
				this.playerDirection = true;
				this.player_movementState = "walk_right";
				this.setFriction(0,0);
				this.renderable.setCurrentAnimation( "walk" );
				faceLeft = false;
				shootLeft = false;
				shootRight = true;
				this.doWalk(false);
				walkLeft = false;
			}
			else
			{
				walkRight = false;
				walkLeft = false;
				
				this.player_movementState = "walk_idle";
				if (this.playerDirection == true)
				{
					if (this.vel.x > 0)
					{
						this.vel.x -= playerMomentum;
					}
					else
					{
						this.vel.x = 0;
					}				
				}
				else
				{
					if (this.vel.x < 0)
					{
						this.vel.x += playerMomentum;
					}
					else
					{
						this.vel.x = 0;
					}				
				}

				
			}

			//Code for firing shots. 
			if ((me.input.keyStatus("shot") || shootButton == true) && (!this.renderable.isCurrentAnimation("idleClimb")) && (!this.renderable.isCurrentAnimation("climb")))
			{
				this.player_movementState = "shooting";

				//The first two parameters control the x and y starting points of the bullet.
				if(faceLeft != true)
				{
					var shot = new bullet(this.pos.x + 42, this.pos.y + this.bulletOffsetY,{image: 'bullet', spritewidth: 16, spriteheight: 16});
				}
				else
				{
					var shot = new bullet(this.pos.x - 24, this.pos.y + this.bulletOffsetY,{image: 'bullet', spritewidth: 16, spriteheight: 16});
					shot.flipX(true);
				}

				if(shootLeft)
				{
					//shootRight = false;
					shot.vel.x -= shootSpeed;
					this.renderable.setCurrentAnimation( "shoot" );
				}

				if(shootRight)
				{
					//shootLeft = false;
					shot.vel.x += shootSpeed;
					this.renderable.setCurrentAnimation( "shoot" );
				}

				if (this.current_player_shootCooldown <= 0)
				{	
					me.game.add(shot, this.z);
					me.audio.play( this.player_shoot_sfx,false,null,default_sfx_volume );
					me.game.sort();
					this.current_player_shootCooldown = this.player_shootCooldown;
				}
			}

			if (this.current_player_shootCooldown <= 0)
			{
				this.current_player_shootCooldown = this.player_shootCooldown;
			}
		}
		else if (this.playerState == "incapacitated")
		{
			this.incapacitate();
		}
		else if (this.playerState == "dead")
		{
			this.die();
		}
		else if (this.playerState == "fallingDeath")
		{
			this.renderable.setCurrentAnimation( "fallingDeath", function() {
				this.playerState = "dead";
			}.bind(this));
		}
		else if (this.playerState == "paused")
		{
			this.vel.x = 0;
			this.vel.y = 0;
			this.gravity = 0;
			this.renderable.setCurrentAnimation( "idle");
		}
		
		
		// Pause game button
		if (me.input.isKeyPressed("pause")) {
			me.game.player.playerState = "paused";
			var new_pauseMenu = new pauseMenu(this.pos.x, this.pos.y ,{});
			me.game.add(new_pauseMenu, 99);
			me.game.sort();
		}
		

		//check and update player movement
		this.updateMovement();

		me.game.collide(this,true);

		if (this.renderable.isFlickering())
		{
			this.enemyCollidable = false;
		}
		else
		{
			this.enemyCollidable = true;
		}
	
		// Update player health on HUD. This should probably go somewhere that doesn't update every frame. Turn in to a function here and call on enemy hit.
		
		this.health = Math.round(this.health);
		//console.log('local health:' + this.health + ' | global_health:' + me.game.player_health);
		
		if (this.health != me.game.player_health)
		{
			me.game.HUD.setItemValue("health", this.health);
			me.game.player_health = this.health;		
		}


		this.parent(this);
		return true;

	},

	die: function()
    {
		me.state.current().restartLevel();
    },
	
	incapacitate: function()
    {
		this.vel.x = 0;
		//this.vel.y = 0;
		this.health = 0;
		this.enemyCollidable = false;
		
		this.renderable.setCurrentAnimation( "incapacitated", function() {
			checkAchievement("deaths");

			if (saveData["deaths"] == 2)
			{
				var new_tutorialDisplay = new tutorialDisplay(0, 0 ,{tutorial_id: "deaths"});
				me.game.add(new_tutorialDisplay, 99);
				me.game.sort();			
			}
			else
			{
				this.playerState = "dead";
			}


		}.bind(this));
    },
	
	onCollision: function(res, obj){
		if(obj.type == me.game.ENEMY_OBJECT && me.game.player.enemyCollidable)
		{
			curData.abilityPickup = false;
			
			if (obj.bullet_type == 'licheboss_bullet')
			{
				this.health -= licheboss_ranged_Damage;
				//me.gamestat.updateValue("damage_taken",licheboss_ranged_Damage);
				saveData.damage_taken += licheboss_ranged_Damage;
				this.renderable.flicker(player_immunity_time);
				me.game.remove(obj);
			}
			else if (obj.bullet_type == 'liche_bullet')
			{
				this.health -= liche_ranged_Damage;
				//me.gamestat.updateValue("damage_taken",liche_ranged_Damage);
				saveData.damage_taken += liche_ranged_Damage;
				this.renderable.flicker(player_immunity_time);
				me.game.remove(obj);
			}
			else if (obj.grenadeType == 'skeleton_ranged_sword')
			{
				this.health -= skeleton_ranged_Damage;
				//me.gamestat.updateValue("damage_taken",skeleton_ranged_Damage);
				saveData.damage_taken += skeleton_ranged_Damage;
				this.renderable.flicker(player_immunity_time);
			}
		}
		/*
		else if (obj.type == "KillEntity")
		{
			this.health = 0;
		}
		*/
	},

	playerFloat: function()
	{
		if (this.player_jumpState != "jump" && this.player_jumpState != "float")
		{
			this.forceJump(true);
			this.player_jumpState = "jump";
			this.jumpkeypressed = true;
			// set float animation here
			
			if (saveData.upgrade_global_float == 1)
			{
				this.floatCooldown = false;
			}
		}
		else if (this.floatCounter > 0 && this.floatCooldown == false)
		{
			if (this.falling)
			{
				if (this.doublejumpCooldown == false && this.jumpkeypressed == false)
				{
					this.forceJump();
					this.doublejumpCooldown = true;
				}
				else
				{
					this.vel.y = 0;
					this.gravity += .01;
					this.player_jumpState = "float";
				}
			}
			else if (this.player_jumpState == "float")
			{
				this.vel.y = 0;
				this.gravity += .10;
			}

				this.floatCounter--;
		}
		else if (this.floatCounter <= 0 || this.falling)
		{
			this.gravity = 0.40;
			this.floatCounter = this.floatTimer;
			this.floatCooldown = true;
		}
		else
		{
			//this.player_jumpState = "???";
		}
	},
	
    fireGrenade: function () 
	{
		var grenade = new GrenadeEntity(this.pos.x, this.pos.y, {image: "grenade", spritewidth: 16, direction: this.playerDirection, originator: selectedHero});

		me.game.add(grenade, this.z);
		me.game.sort.defer();

		//me.audio.play("grenade");
    },

    abilityLightning: function () 
	{
		var lightning = new LightningEntity(this.pos.x, this.pos.y, {image: "lightning", spritewidth: 145, spriteheight: 500, direction: this.playerDirection, originator: selectedHero});

		me.game.add(lightning, this.z);
		me.game.sort.defer();

		//me.audio.play("grenade");
    },
	
	// Debug Functions
    giveLife: function() {
		this.health += 10000;
	},
    oneshotKills: function() {
		this.bullet_damage += 10000;
	},
    giveSpeed: function() {
		this.playerVelocity += this.playerVelocity * .25;
		this.setVelocity(this.playerVelocity, this.playerJump);
	},
    slowSpeed: function() {
		this.playerVelocity -= this.playerVelocity * .25;
		this.setVelocity(this.playerVelocity, this.playerJump);
	},
    giveKeys: function() {
		saveData.key_currency += 1000;
	},
    giveListings: function() {
		saveData.listing_pickup += 10;
	},
    upgradeMax: function() {
		saveData.upgrade_malyn_health = 1;
		saveData.upgrade_malyn_damage = 1;
		saveData.upgrade_malyn_attackrate = 1;
		saveData.upgrade_malyn_movespeed = 1;
		saveData.upgrade_malyn_abilityunlocked = 1;
		saveData.upgrade_malyn_abilityunlocked_upgrade01 = 1;
		saveData.upgrade_malyn_abilityunlocked_upgrade02 = 1;
		saveData.upgrade_malyn_abilitycooldown = 1;
		saveData.upgrade_malyn_abilitydamage = 1;

		saveData.upgrade_meena_health = 1;
		saveData.upgrade_meena_damage = 1;
		saveData.upgrade_meena_attackrate = 1;
		saveData.upgrade_meena_movespeed = 1;
		saveData.upgrade_meena_abilityunlocked = 1;
		saveData.upgrade_meena_abilityunlocked_upgrade01 = 1;
		saveData.upgrade_meena_abilityunlocked_upgrade02 = 1;
		saveData.upgrade_meena_abilitycooldown = 1;
		saveData.upgrade_meena_abilitydamage = 1;

		saveData.upgrade_global_doublejump = 1;
		saveData.upgrade_global_float = 1;
		saveData.upgrade_global_coins = 1;
	},
    settoDefault: function() {
		saveData.upgrade_malyn_health = 0;
		saveData.upgrade_malyn_damage = 0;
		saveData.upgrade_malyn_attackrate = 0;
		saveData.upgrade_malyn_movespeed = 0;
		saveData.upgrade_malyn_abilityunlocked = 0;
		saveData.upgrade_malyn_abilityunlocked_upgrade01 = 0;
		saveData.upgrade_malyn_abilityunlocked_upgrade02 = 0;
		saveData.upgrade_malyn_abilitycooldown = 0;
		saveData.upgrade_malyn_abilitydamage = 0;

		saveData.upgrade_meena_health = 0;
		saveData.upgrade_meena_damage = 0;
		saveData.upgrade_meena_attackrate = 0;
		saveData.upgrade_meena_movespeed = 0;
		saveData.upgrade_meena_abilityunlocked = 0;
		saveData.upgrade_meena_abilityunlocked_upgrade01 = 0;
		saveData.upgrade_meena_abilityunlocked_upgrade02 = 0;
		saveData.upgrade_meena_abilitycooldown = 0;
		saveData.upgrade_meena_abilitydamage = 0;

		saveData.upgrade_global_doublejump = 0;
		saveData.upgrade_global_float = 0;
		saveData.upgrade_global_coins = 0;
	},
    unlockProgression: function() {
		saveData.city_level_01 = 1,
		saveData.city_level_02 = 1,
		saveData.city_level_03 = 1,
		saveData.city_level_04 = 1,
		saveData.city_level_05 = 1,
		saveData.city_level_06 = 1,
		saveData.city_level_boss_01 = 1,

		saveData.city_level_01_cleared = 1;
		saveData.city_level_02_cleared = 1;
		saveData.city_level_03_cleared = 1;
		saveData.city_level_04_cleared = 1;
		saveData.city_level_05_cleared = 1;
		saveData.city_level_06_cleared = 1;
		saveData.city_level_boss_01_cleared = 1;
	},
    clearProgression: function() {
		saveData.city_level_01 = 0,
		saveData.city_level_02 = 0,
		saveData.city_level_03 = 0,
		saveData.city_level_04 = 0,
		saveData.city_level_05 = 0,
		saveData.city_level_06 = 0,
		saveData.city_level_boss_01 = 0,

		saveData.city_level_01_cleared = 0;
		saveData.city_level_02_cleared = 0;
		saveData.city_level_03_cleared = 0;
		saveData.city_level_04_cleared = 0;
		saveData.city_level_05_cleared = 0;
		saveData.city_level_06_cleared = 0;
		saveData.city_level_boss_01_cleared = 0;
	}
});

	

//player entity
var PlayerEntity_malyn = PlayerEntity.extend({

	init: function(x, y, settings){

		settings.image = 'malyn';
		settings.spritewidth = 45;
		settings.spriteheight = 45;
		this.spritewidth = settings.spritewidth;
		this.spriteheight = settings.spriteheight;
		
		//call ObjectEntity constructor
		this.parent(x, y, settings);

		// add sprite animations
		this.renderable.addAnimation( "idle", [0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,6,7] );
        this.renderable.addAnimation( "walk", [0,1,2,3] );
		this.renderable.addAnimation( "shoot", [4,5] );
		this.renderable.addAnimation( "climb", [8,9] );
		this.renderable.addAnimation( "idleClimb", [8]);
        this.renderable.addAnimation( "incapacitated", [0,10,11,12,13,14,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15] );
		this.renderable.addAnimation( "fallingDeath", [0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,6,7,0,2,0,2,0,2,0,2,0,2,0,2,0] );

		//set walking and jumping speed
		this.malyn_movementVelocity = malyn_movementVelocity + (malyn_movementVelocity * (saveData.upgrade_malyn_movespeed / 100));
		this.setVelocity(this.malyn_movementVelocity, malyn_jumpHeight);
		this.playerVelocity = this.malyn_movementVelocity;
		this.playerJump = malyn_jumpHeight;
		
		// set the player health to default health level if dead. If not dead, use saved global health variable
		if (me.game.player_health == 0)
		{
			this.health = malyn_health + (malyn_health * (saveData.upgrade_malyn_health / 100));
		}
		else
		{
			this.health = me.game.player_health;
		}

		this.maxHealth = malyn_maxHealth + (malyn_maxHealth * (saveData.upgrade_malyn_health / 100));
		this.bullet_damage = malyn_bullet_damage + (malyn_bullet_damage * (saveData.upgrade_malyn_damage / 100));
		this.player_shootCooldown = malyn_shootCooldown - (malyn_shootCooldown * (saveData.upgrade_malyn_attackrate / 100));
		this.current_player_shootCooldown = this.player_shootCooldown;

		// adjust the bounding box
		this.updateColRect(0, 40, 7, 38);

		// set gravity to normal if not a world level
		if (bWorldLevel == false)
		{
			this.gravity = malyn_gravity;
		}

		this.player_shoot_sfx = "player_gunshot";
		this.centerOffsetX = 22;		
		this.bulletOffsetY = 24;

		//Grenade settings
        this.grenadeTimer = malyn_grenadeTimer - (malyn_grenadeTimer * (saveData.upgrade_malyn_attackrate / 100));
        this.grenadeCountdown = 0;

		//me.debug.renderHitBox = true;
		
		// Force turn on ability
		//curData.abilityPickup = true;
	},

	update: function(){

		// Code for firing grenades
		if (me.input.isKeyPressed("special_ability") || shootGrenade == true) {
			if (curData.abilityPickup == true)
			{
				if (this.grenadeCountdown == 0)
				{
					if (curData.abilityPickup_type == "abilityLightning")
					{
						this.abilityLightning();
						this.grenadeCountdown = this.grenadeTimer;
					}
					else if (curData.abilityPickup_type == "abilityGrenade")
					{
						this.fireGrenade();
						this.grenadeCountdown = this.grenadeTimer;
					}
				}
			}
			else if (saveData.upgrade_malyn_abilityunlocked == 1)
			{
				if (this.grenadeCountdown == 0)
				{
					this.fireGrenade();
					this.grenadeCountdown = this.grenadeTimer;
				}
			}
		}

		if (this.grenadeCountdown > 0)
		{
			this.grenadeCountdown--;
		}

		this.parent(this);
		return true;
	}
});
    
var PlayerEntity_meena = PlayerEntity.extend({

    init: function(x, y, settings){

		settings.image = 'meena';
		settings.spritewidth = 32;
		settings.spriteheight = 32;
		this.spritewidth = settings.spritewidth;
		this.spriteheight = settings.spriteheight;
		
		//call ObjectEntity constructor
		this.parent(x, y, settings);

		// add sprite animations
		this.renderable.addAnimation( "idle", [0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,6,7] );
        this.renderable.addAnimation( "walk", [0,1,2,3] );
		this.renderable.addAnimation( "shoot", [4,5] );
		this.renderable.addAnimation( "climb", [8,9] );
		this.renderable.addAnimation( "idleClimb", [8]);
		this.renderable.addAnimation( "incapacitated", [0,10,11,12,13,14,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15] );
		this.renderable.addAnimation( "fallingDeath", [0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,6,7,0,2,0,2,0,2,0,2,0,2,0,2,0] );
		
		//set walking and jumping speed
		this.meena_movementVelocity = meena_movementVelocity + (meena_movementVelocity * (saveData.upgrade_meena_movespeed / 100));
		this.setVelocity(this.meena_movementVelocity, meena_jumpHeight);
		this.playerVelocity = this.meena_movementVelocity;
		this.playerJump = meena_jumpHeight;
		this.maxHealth = meena_maxHealth;
		
		// set the player health to default health level if dead. If not dead, use saved global health variable
		if (me.game.player_health == 0)
		{
			this.health = meena_health + (meena_health * (saveData.upgrade_meena_health / 100));
		}
		else
		{
			this.health = me.game.player_health;
		}

		// set gravity to normal if not a world level
		if (bWorldLevel == false)
		{
			this.gravity = meena_gravity;
		}

		this.maxHealth = meena_maxHealth + (meena_maxHealth * (saveData.upgrade_meena_health / 100));
		this.bullet_damage = meena_bullet_damage + (meena_bullet_damage * (saveData.upgrade_meena_damage / 100));
		this.player_shootCooldown = meena_shootCooldown - (meena_shootCooldown * (saveData.upgrade_meena_attackrate / 100));
		this.current_player_shootCooldown = this.player_shootCooldown;

		// adjust the bounding box
		//this.updateColRect(0, 35, -1, 0);

		this.player_shoot_sfx = "player_gunshot";		

		this.centerOffsetX = 16;
		this.bulletOffsetY = 14;

		//Grenade settings
        this.grenadeTimer = meena_grenadeTimer - (meena_grenadeTimer * (saveData.upgrade_meena_attackrate / 100));
        this.grenadeCountdown = 0;

		//me.debug.renderHitBox = true;
	},

	update: function(){

		// Code for firing grenades
		if (me.input.isKeyPressed("special_ability") || shootGrenade == true) {
			if (curData.abilityPickup == true)
			{
				if (this.grenadeCountdown == 0)
				{
					if (curData.abilityPickup_type == "abilityLightning")
					{
						this.abilityLightning();
						this.grenadeCountdown = this.grenadeTimer;
					}
					else if (curData.abilityPickup_type == "abilityGrenade")
					{
						this.fireGrenade();
						this.grenadeCountdown = this.grenadeTimer;
					}
				}
			}
			else if (saveData.upgrade_meena_abilityunlocked == 1)
			{
				if (this.grenadeCountdown == 0)
				{
					this.fireGrenade();
					this.grenadeCountdown = this.grenadeTimer;
				}
			}
		}
		
		if (this.grenadeCountdown > 0)
		{
			this.grenadeCountdown--;
		}

		this.parent(this);
		return true;
	}
});

var abilityEffect = me.ObjectEntity.extend({

	init: function(x, y, settings){
		this.ability = settings.type;



		if (this.ability == "abilityLightning")
		{
			settings.image = 'effect_player_lightning';
			settings.spritewidth = 40;
			this.parent(x, y, settings);	
			this.renderable.addAnimation( "on", [6,1,6,6,6,6,6,6,2,3,6,6,6,6,6,6,6,6,4,6,6,6,1,6,6,6,6,6,6,6,6,6,6,6,6,5,6,6,6,6,6,6,6,6,6,6,2,6,6,4,6,6,6,6,6,6,5,6,6,6,6] );
			this.renderable.setCurrentAnimation("on");
		}
		else if (this.ability == "abilityGrenade")
		{
			settings.image = 'effect_player_lightning';
		}
		else
		{
			settings.image = 'effect_player_lightning';
		}
		
		// do math here to determine center of the sprite and create offset for update function below
		
		this.collidable = false;
		this.gravity = 0;
	},
	
	update: function(){

		if (curData.abilityPickup == false)
		{
			me.game.remove(this);
		}
		else
		{
			this.pos.x = me.game.player.pos.x;
			this.pos.y = me.game.player.pos.y;
		}
		
		this.parent();
		return true;
	}
});