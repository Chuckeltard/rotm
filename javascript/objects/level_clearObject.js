var level_clearObject = me.ObjectEntity.extend({
	init: function(x, y, settings){

		//settings.image = 'neon_sign';
		//settings.spritewidth = 80;
		this.x = settings.x;
		this.y = settings.y;
		
		//call parent constructor
		this.parent(x, y, settings);
		
		this.toLevel = settings.toLevel;
		this.fromLevel = settings.fromLevel;
		
		//this.renderable.addAnimation( "walk", [0,1,2,3] );
		//this.renderable.addAnimation( "jump", [0,1,2,3] );
		
		this.collidable = true;
		this.playerCollidable = true;
		this.type = me.game.LEVEL_OBJECT;

		this.timer = 1;
		this.city_level_01_lastTile = 185;
		//previouslevel = 'city_level_01';

		this.collisionLayer = me.game.currentLevel.getLayerByName("collision");
		this.player_path_blockedLayer = me.game.currentLevel.getLayerByName("player_path_blocked");
		
		if (saveData.city_level_01_cleared == 1)
		{
			this.collisionLayer.clearTile(13,181);
			this.collisionLayer.clearTile(14,181);
			this.collisionLayer.clearTile(15,181);
			this.collisionLayer.clearTile(16,181);
				
			while (this.city_level_01_lastTile >= 170)
			{
				this.player_path_blockedLayer.clearTile(13,this.city_level_01_lastTile);
				this.player_path_blockedLayer.clearTile(14,this.city_level_01_lastTile);
				this.player_path_blockedLayer.clearTile(15,this.city_level_01_lastTile);
				this.player_path_blockedLayer.clearTile(16,this.city_level_01_lastTile);
				
				this.city_level_01_lastTile--;
			}
		}			
	},

	// this probably needs some cleanup. I'm just killing the players velocity, but he can still sit there and change his animation. I should make a global "pause" function that unbinds and can rebind all the player keys instead of just having it in playscreen in main.
	pause_player: function(pause)
	{
		if (pause == true)
		{
			me.game.player.setVelocity(0, 0);
		}
		else
		{
			me.game.player.setVelocity(malyn_movementVelocity, malyn_jumpHeight);
		}
	},
	
    update: function()
    {	
		if (previouslevel != this.toLevel)
		{
			return false;
		}
		else
		{
			if (previouslevel == 'city_level_01' && saveData[previouslevel] == 1)
			{
				// this isn't working for some reason. it's probably fine for most reveals, but will need it to work properly for boss reveals.
				//me.game.viewport.move(100,100);
				
				this.pause_player(true);
				
				if (this.city_level_01_lastTile < 170)
				{
					this.collisionLayer.clearTile(13,181);
					this.collisionLayer.clearTile(14,181);
					this.collisionLayer.clearTile(15,181);
					this.collisionLayer.clearTile(16,181);
					saveData.city_level_01_cleared = 1;
					previouslevel = 'world_city';
					
					this.pause_player(false);
				}
				else if (this.timer <= 0)
				{
					this.player_path_blockedLayer.clearTile(13,this.city_level_01_lastTile);
					this.player_path_blockedLayer.clearTile(14,this.city_level_01_lastTile);
					this.player_path_blockedLayer.clearTile(15,this.city_level_01_lastTile);
					this.player_path_blockedLayer.clearTile(16,this.city_level_01_lastTile);
					
					this.city_level_01_lastTile--;
					
					this.player_path_blockedLayer.clearTile(13,this.city_level_01_lastTile);
					this.player_path_blockedLayer.clearTile(14,this.city_level_01_lastTile);
					this.player_path_blockedLayer.clearTile(15,this.city_level_01_lastTile);
					this.player_path_blockedLayer.clearTile(16,this.city_level_01_lastTile);
					
					me.game.viewport.shake(25, 15, me.game.viewport.AXIS.BOTH);
					me.audio.play("world_clear_tiles");
					
					this.city_level_01_lastTile--;
					this.timer = 1;
				}
					this.timer -=  me.timer.tick / me.sys.fps;
			}
		}
		
		this.parent(this);
		return true;
		
    },

});