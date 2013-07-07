
//Enemy entities

var EnemyEntity_zombie = runandclimbEnemy.extend({
	init: function (x, y, behavior) {
        var settings = {};
		settings.image = 'zombie';
		settings.spritewidth = 32;
		settings.spriteheight = 32;
		this.spritewidth = settings.spritewidth;
		this.spriteheight = settings.spriteheight;
		
		//call parent constructor
		this.parent(x, y, settings);
		
		this.enemy_type = "zombie";
		
		this.renderable.addAnimation( "walk", [0,1,2,3] );
		this.renderable.addAnimation( "jump", [0,1,2,3] );
        this.renderable.addAnimation( "climb", [4,5] );
        this.renderable.addAnimation( "incapacitated", [6,6,7,8,9,10,11,9,9,9,9,10,11,9,9,12] );
		this.renderable.addAnimation( "sleep", [6,6,7,8,9,10,11,9,9,9,9,10,11,9,9,12] );

		this.particleOffsetX_left = 20;
		this.particleOffsetX_right = 0;
		this.particleOffsetY = 16;
		this.particleFrames = [0,3];
		this.damage = zombie_Damage * currentModifier;
		this.health = zombie_Health * currentModifier;
		this.gravity = zombie_Gravity;
		this.enemyState = "alive";
		this.enemy_Velocity = zombie_Velocity + (zombie_Velocity * (currentModifier / 50));
		this.setVelocity(this.enemy_Velocity, zombie_Jump);
		this.sfx_enemy_hit = "zombie_hit";
		this.enemy_sfx_array = ["zombie_generic","zombie_brains"];
		
},
	
	
	//manage the enemy movement
	update: function()
	{
		if (this.enemyState == "dead" && (this.KillEntity == false || this.KillEntity == null))
		{
			checkAchievement("kills_zombie");
		}
		
		//Code to speed up the enemy when they jump so they can make the same distances as the player
		if (this.update_action == 'jump')
		{
			this.setVelocity(enemy_jumpSpeed, malyn_jumpHeight);
		}
		else
		{
			this.setVelocity(this.enemy_Velocity, zombie_Jump);
		}
		
		this.parent();
		return true;
	}
});

var EnemyEntity_mummy = runandclimbEnemy.extend({
	init: function (x, y, behavior) {
        var settings = {};
		settings.image = 'mummy';
		settings.spritewidth = 59;
		settings.spriteheight = 48;
		this.spritewidth = settings.spritewidth;
		this.spriteheight = settings.spriteheight;	
		
		//call parent constructor
		this.parent(x, y, settings);
		
		this.enemy_type = "mummy";
		
		this.renderable.addAnimation( "walk", [0,1,2,3] );
		this.renderable.addAnimation( "jump", [0,1,2,3] );
		this.renderable.addAnimation( "climb", [4,5] );
		this.renderable.addAnimation( "incapacitated", [4,4,5,6,7,8,9,7,7,7,7,8,9,7,7,10] );
		this.renderable.addAnimation( "sleep", [4,4,5,6,7,8,9,7,7,7,7,8,9,7,7,10] );

		this.particleOffsetX_left = 23;
		this.particleOffsetX_right = 12;
		this.particleOffsetY = 28;
		this.particleFrames = [0,2];
		
		this.damage = mummy_Damage * currentModifier;
		this.health = mummy_Health * currentModifier;
		
		this.gravity = mummy_Gravity;
		
		//this.updateColRect( 0, 59, -20, 45 );
		
		this.enemyState = "alive";
		
		this.enemy_Velocity = mummy_Velocity + (mummy_Velocity * (currentModifier / 50));
		this.setVelocity(this.enemy_Velocity, mummy_Jump);
		
		this.sfx_enemy_hit = "halfsec";
		this.enemy_sfx_array = ["mummy_generic","halfsec"];
	},
	
	//manage the enemy movement
		update: function()
		{	
			if (this.enemyState == "dead" && (this.KillEntity == false || this.KillEntity == null))
			{
				checkAchievement("kills_mummy");
			}
			this.parent(this);
			return true;
		}
});

var EnemyEntity_skeleton = runandclimbEnemy.extend({
	init: function (x, y, behavior) {
        var settings = {};
		settings.image = 'skeleton';
		settings.spritewidth = 80;
		settings.spriteheight = 59;
		this.spritewidth = settings.spritewidth;
		this.spriteheight = settings.spriteheight;
		
		//call parent constructor
		this.parent(x, y, settings);
		
		this.enemy_type = "skeleton";
		
		this.renderable.addAnimation( "walk", [3,2,1,0,5,4,3,4] );
		this.renderable.addAnimation( "jump", [3,1,1,3,4] );
		this.renderable.addAnimation( "climb", [4,5] );
        this.renderable.addAnimation( "incapacitated", [6,6,6,7,7,8,8,8,8,8,8,8,8,8,9,9] );
		this.renderable.addAnimation( "sleep", [6,6,6,7,7,8,8,8,8,8,8,8,8,8,9,9] );

		this.particleOffsetX_left = 35;
		this.particleOffsetX_right = 28;
		this.particleOffsetY = 37;
		this.particleFrames = [0,3];
		
		this.damage = skeleton_Damage * currentModifier;	
		
		this.health = skeleton_Health * currentModifier;
		
		this.gravity = skeleton_Gravity;
		
		this.enemyState = "alive";
		
		this.enemy_Velocity = skeleton_Velocity + (skeleton_Velocity * (currentModifier / 50));
		this.setVelocity(this.skeleton_Velocity, skeleton_Jump);

		this.sfx_enemy_hit = "halfsec";
		this.enemy_sfx_array = ["halfsec","halfsec"];
		
		// adjust the bounding box
		this.updateColRect(5, 70, 2, 57);
	},

	//manage the enemy movement
	update: function(){
		if (this.enemyState == "dead" && (this.KillEntity == false || this.KillEntity == null))
		{
			checkAchievement("kills_skeleton");
		}
		
		//Code to speed up the enemy when they jump so they can make the same distances as the player
		if (this.update_action == 'jump')
		{
			this.setVelocity(enemy_jumpSpeed, malyn_jumpHeight);
		}
		else
		{
			this.setVelocity(this.enemy_Velocity, skeleton_Jump);
		}
		
		this.parent(this);
		return true;	
	}
});

var EnemyEntity_skeleton_ranged = RangedEnemy.extend({
	init: function (x, y, settings) {
		settings.image = 'skeleton_ranged';
		settings.spritewidth = 80;
		settings.spriteheight = 59;
		this.moving = settings.moving;
		
		this.spritewidth = settings.spritewidth;
		this.spriteheight = settings.spriteheight;
		
		this.startX = x;
		this.endX = x + settings.width - settings.spritewidth;

		//call parent constructor
		this.parent(x, y, settings);
		this.enemyDirection = true;
		this.walkLeft = true;
		
		this.enemy_type = "skeleton_ranged";
		
		this.renderable.addAnimation( "walk", [2,2,5,2,5,5] );
		this.renderable.addAnimation( "jump", [2,5] );
		this.renderable.addAnimation( "climb", [3,3,3,4,4,4] );
        this.renderable.addAnimation( "incapacitated", [3,4,3,4,6,6,6,7,7,8,8,8,8,8,9,9] );
		this.renderable.addAnimation( "sleep", [3,4,3,4,6,6,6,7,7,8,8,8,8,8,9,9] );
		this.renderable.addAnimation( "shoot", [3,3,3,4,4,3,1,1,0] );

		this.particleOffsetX_left = 25;
		this.particleOffsetX_right = 30;
		this.particleOffsetY = 30;
		this.particleFrames = [0,3];
		
		this.damage = skeleton_ranged_touch_Damage * currentModifier;
		this.shotTimer = 0;
		this.shotTimerMax = skeleton_ranged_shotTimer;
		this.shotCount = 0;
		this.shotCountMax = skeleton_ranged_shotCountMax;		
		
		this.health = skeleton_ranged_Health * currentModifier;
		this.enemy_Velocity = skeleton_ranged_Velocity + (skeleton_ranged_Velocity * (currentModifier / 50));
		
		this.gravity = skeleton_ranged_Gravity;

		this.enemyState = "alive";

		if (this.moving == "no")
		{
			this.setVelocity(0, skeleton_ranged_Jump);
		}
		else
		{
			this.setVelocity(this.enemy_Velocity, skeleton_ranged_Jump);
		}
		this.sfx_enemy_hit = "halfsec";
		this.enemy_sfx_array = ["halfsec","halfsec"];
		
		//this.updateColRect( 8, 32, -1 );
	},
	
	update: function(){
		if (this.enemyState == "dead" && (this.KillEntity == false || this.KillEntity == null))
		{
			checkAchievement("kills_skeleton_ranged");
		}
		
		this.parent(this);
		return true;	
	}
});

var EnemyEntity_vampire = runandclimbEnemy.extend({
	init: function (x, y, behavior) {
        var settings = {};
		settings.image = 'vampire';
		settings.spritewidth = 60;
		settings.spriteheight = 59;
		this.spritewidth = settings.spritewidth;
		this.spriteheight = settings.spriteheight;
		
		//call parent constructor
		this.parent(x, y, settings);
		
		this.enemy_type = "vampire";
		
		this.renderable.addAnimation( "walk", [1,0,1,0,1,0,3,3,3,3,3,3,3,3,3,3,3,3] );
		this.renderable.addAnimation( "jump", [1,2,2,4,4,0] );
		this.renderable.addAnimation( "climb", [11,12] );
        this.renderable.addAnimation( "incapacitated", [5,5,6,6,6,7,8,9,9,9,9,9,9,9,9,10] );
		this.renderable.addAnimation( "sleep", [5,5,6,6,6,7,8,9,9,9,9,9,9,9,9,10] );

		this.particleOffsetX_left = 30;
		this.particleOffsetX_right = 0;
		this.particleOffsetY = 33;
		this.particleFrames = [0,4];
		
		this.damage = vampire_Damage * currentModifier;

		this.health = vampire_Health * currentModifier;
		
		this.gravity = vampire_Gravity;

		this.enemyState = "alive";
		
		this.enemy_Velocity = vampire_Velocity + (vampire_Velocity * (currentModifier / 50));
		this.setVelocity(this.enemy_Velocity, vampire_Jump);

		this.sfx_enemy_hit = "halfsec";
		this.enemy_sfx_array = ["halfsec","halfsec"];
		
		// adjust the bounding box
		this.updateColRect(5, 50, 13, 46);
},

	//manage the enemy movement
	update: function(){
		
		if (this.enemyState == "dead" && (this.KillEntity == false || this.KillEntity == null))
		{
			checkAchievement("kills_vampire");
		}
		
		//Code to speed up the enemy when they jump so they can make the same distances as the player
		if (this.update_action == 'jump')
		{
			this.setVelocity(enemy_jumpSpeed, malyn_jumpHeight);
		}
		else
		{
			this.setVelocity(this.enemy_Velocity, vampire_Jump);
		}
		
		this.parent(this);
		return true;	
	}
});

var EnemyEntity_ghost = DroneEnemy.extend({
    
    init: function (x, y, settings) {
		//var settings = {};
		settings.image = "ghost";
		settings.spritewidth = 32;
		settings.spriteheight = 32;
		this.spritewidth = settings.spritewidth;
		this.spriteheight = settings.spriteheight;
		
		if (settings.travelDirection)
		{
			this.travelDirection = settings.travelDirection;
		}
		
		this.parent(x, y, settings);
		
		if (this.travelDirection == "right")
		{
			this.flipX(true);
		}
		this.enemy_type = "ghost";
		
		this.current_incapacitateTime = enemy_incapacitateTime_short;
		
		this.renderable.addAnimation("green", [5,4,0,1,2,3,2,3,2,4,5,10,10,10,10,10,10,10]);
		this.renderable.addAnimation("cyan", [5,4,0,1,2,3,4,5,10]);
		this.renderable.addAnimation("purple", [0,1,2,3,4,5,4,3,0,1,3,4,5,10,10,5,4]);
		this.renderable.addAnimation("yellow", [2,3,0,1,2,3,2,3,0,1,2,3,2,3]);
		this.renderable.addAnimation("red", [0,1,1,2,3,2,3,4,5,10,10,10,5,4]);
		this.renderable.addAnimation("incapacitated", [6,6,7,8,8,8,9]);
		this.renderable.addAnimation("sleep", [6,6,7,8,8,8,9]);
		
		this.particleOffsetX_left = 0;
		this.particleOffsetX_right = 3;
		this.particleOffsetY = 10;
		this.particleFrames = [0,4];
		
		this.renderable.setCurrentAnimation(util.arrayRandomElement(["green", "cyan", "purple", "yellow", "red"]));

		this.health = ghost_Health * currentModifier;
		this.damage = ghost_Damage * currentModifier;
		
		//this.animationspeed = 1;
		this.enemy_Velocity = ghost_Velocity + (ghost_Velocity * (currentModifier / 50));
		this.setVelocity(this.enemy_Velocity, ghost_Jump);
		
		this.enemyState = "alive";
	
		this.sfx_enemy_hit = "halfsec";
		this.enemy_sfx_array = ["halfsec","halfsec"];
    },

	update: function(){
		if (this.enemyState == "dead" && (this.KillEntity == false || this.KillEntity == null))
		{
			checkAchievement("kills_ghost");
		}
		this.parent(this);
		return true;	
	}
});

var EnemyEntity_liche = DisappearingEnemy.extend({
	init: function (x, y, settings) {
		settings.image = 'liche';
		settings.spritewidth = 60;
		settings.spriteheight = 59;
		this.spritewidth = settings.spritewidth;
		this.spriteheight = settings.spriteheight;
		
		this.startX = x;
		this.endX = x + settings.width - settings.spritewidth;

		//call parent constructor
		this.parent(x, y, settings);
		this.enemyDirection = true;
		this.walkLeft = true;
		
		this.enemy_type = "liche";
		
		this.renderable.addAnimation( "walk", [1,0,1,0,1,0,3,3,3,3,3,3,3,3,3,3,3,3] );
		this.renderable.addAnimation( "jump", [0] );
		this.renderable.addAnimation( "climb", [0,1] );
        this.renderable.addAnimation( "incapacitated", [0] );
		this.renderable.addAnimation( "sleep", [0] );
		this.renderable.addAnimation( "shoot", [0] );

		this.particleOffsetX_left = 0;
		this.particleOffsetX_right = 10;
		this.particleOffsetY = 35;
		this.particleFrames = [0,4];
		
		this.damage = liche_touch_Damage * currentModifier;
		this.shotTimer = liche_appearTimer - 10;
		this.appearTimer = liche_appearTimer;
		this.shotTimerMax = liche_shotTimer;
		
		this.health = liche_Health * currentModifier;
		
		this.gravity = liche_Gravity;
		
		this.enemyState = "alive";
		
		this.enemy_Velocity = liche_Velocity + (liche_Velocity * (currentModifier / 50));
		this.setVelocity(this.enemy_Velocity, this.enemy_Velocity);

		this.sfx_enemy_hit = "halfsec";
		this.enemy_sfx_array = ["halfsec","halfsec"];
		
		//this.updateColRect( 8, 32, -1 );
	},
	
	update: function(){
		if (this.enemyState == "dead" && (this.KillEntity == false || this.KillEntity == null))
		{
			checkAchievement("kills_liche");
		}
		
		this.parent(this);
		return true;	
	}
});

var EnemyEntity_bat = FollowingEnemy.extend({
	init: function(x, y, settings) {
		settings.image = "bat";
		settings.spritewidth = 28;
		settings.spriteheight = 23;

		this.spritewidth = settings.spritewidth;
		this.spriteheight = settings.spriteheight;
		
		this.parent(x, y, settings);

		this.enemy_type = "bat";
        
		this.current_incapacitateTime = enemy_incapacitateTime_short;
		this.renderable.addAnimation('sleeping', [4]);
		this.renderable.addAnimation('waking', [3, 4, 3]);
		this.renderable.addAnimation('flying', [2, 1, 0, 1]);
        this.renderable.addAnimation( "incapacitated", [5,5,6,7,7,7,8] );
		this.renderable.addAnimation( "sleep", [5,5,6,7,7,7,8] );

		this.particleOffsetX_left = 0;
		this.particleOffsetX_right = 14;
		this.particleOffsetY = 10;
		this.particleFrames = [0,4];
		
		this.damage = bat_Damage * currentModifier;
		this.health = bat_Health * currentModifier;
		this.enemy_Velocity = bat_Velocity + (bat_Velocity * (currentModifier / 50));
		
		this.gravity = bat_Gravity;
		
		this.gatheredFocus = false;
		this.enemyState = "alive";
		this.isSleeping = true;
		this.setVelocity(0, 0);
		this.lineOfSight = bat_lineOfSight;
		
		this.sfx_enemy_hit = "halfsec";
		this.enemy_sfx_array = ["halfsec","halfsec"];

		this.renderable.setCurrentAnimation('sleeping');
		//this.updateColRect(5, 20, -1, 0);
		//me.debug.renderHitBox = true;
	},

	onFocus: function() {
		this.renderable.setCurrentAnimation('waking', function() {
            this.isSleeping = false;
            this.setVelocity(this.enemy_Velocity, this.enemy_Velocity);
            this.renderable.setCurrentAnimation('flying');
            //this.updateColRect(0, 28, 0, 23);
		}.bind(this));
	},

	update: function(){
		if (this.enemyState == "dead" && (this.KillEntity == false || this.KillEntity == null))
		{
			checkAchievement("kills_bat");
		}
		
		if (!this.gatheredFocus) {
			if (this.distanceTo(me.game.player) <= this.lineOfSight) {
				this.gatheredFocus = true;
				this.onFocus();
			} 
			else {
				return false;
			}
		}
		
		this.parent(this);
		return true;	
	}
});

var EnemyEntity_ghost_angry = FollowingEnemy.extend({
    init: function(x, y, settings) {
		settings.image = "ghost_angry";
		settings.spritewidth = 32;
		settings.spriteheight = 32;

		this.parent(x, y, settings);

		this.spritewidth = settings.spritewidth;
		this.spriteheight = settings.spriteheight;
		
		this.enemy_type = "ghost_angry";
        
		this.current_incapacitateTime = enemy_incapacitateTime_short;
		this.renderable.addAnimation('sleeping', [0,0,0,0,0,0,0,0,11,11,12,11,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,11,11,12,11,12,12,12,11]);
		this.renderable.addAnimation('waking', [11,12,5,6,7]);
		this.renderable.addAnimation('flying', [8, 7, 8, 7, 10, 9]);
        this.renderable.addAnimation( "incapacitated", [4, 4, 3, 2, 2, 2, 1]);
		this.renderable.addAnimation( "sleep", [4, 4, 3, 2, 2, 2, 1]);

		this.particleOffsetX_left = 0;
		this.particleOffsetX_right = 0;
		this.particleOffsetY = 10;
		this.particleFrames = [0,4];
		
		this.damage = ghost_angry_Damage * currentModifier;
		this.health = ghost_angry_Health * currentModifier;
		this.enemy_Velocity = ghost_angry_Velocity + (ghost_angry_Velocity * (currentModifier / 50));
		
		this.gravity = ghost_angry_Gravity;
		
		this.gatheredFocus = false;
		this.enemyState = "alive";
		this.isSleeping = true;
		this.setVelocity(0, 0);
		this.lineOfSight = ghost_angry_lineOfSight;
			
		this.sfx_enemy_hit = "halfsec";
		this.enemy_sfx_array = ["halfsec","halfsec"];

		this.renderable.setCurrentAnimation('sleeping');
		this.updateColRect(5, 20, -1, 0);
		//me.debug.renderHitBox = true;
	},

	onFocus: function() {
		this.renderable.setCurrentAnimation('waking', function() {
            this.isSleeping = false;
            this.setVelocity(this.enemy_Velocity, this.enemy_Velocity);
            this.renderable.setCurrentAnimation('flying');
            this.updateColRect(0, 28, 0, 23);
		}.bind(this));
	},

	update: function(){
		if (this.enemyState == "dead" && (this.KillEntity == false || this.KillEntity == null))
		{
			checkAchievement("kills_ghost_angry");
		}
		
		if (!this.gatheredFocus) {
			if (this.distanceTo(me.game.player) <= this.lineOfSight) {
				this.gatheredFocus = true;
				this.onFocus();
			} 
			else {
				this.parent(this);
				return false;
			}
		}
		
		this.parent(this);
		return true;	
	}
});