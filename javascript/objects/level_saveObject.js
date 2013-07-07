var level_saveObject = me.ObjectEntity.extend({
	init: function(x, y, settings){

		settings.image = 'neon_sign';
		settings.spritewidth = 80;
		settings.spriteheight = 40;
		
		this.x = settings.x;
		this.y = settings.y;
		
		//call parent constructor
		this.parent(x, y, settings);
		
		this.renderable.addAnimation( "active", [1,1,1,1,2,1,1,1,0,1,1,2] );
		this.renderable.addAnimation( "inactive", [1,1,1,1,2,1,1,1,0,1,1,2] );
		
		this.collidable = true;
		this.playerCollidable = true;
		this.type = me.game.LEVEL_OBJECT;

		this.renderable.setCurrentAnimation("inactive");
},

    onCollision: function( res, obj )
    {
        this.collide( res, obj );
    },
    
    collide: function( res, obj )
    {
		if ( obj == me.game.player )
		{
			this.renderable.setCurrentAnimation("active");
			me.game.level_save_trigger = true;
			me.game.level_player_pos_x = this.x;
			me.game.level_player_pos_y = this.y;
			this.collidable = false;
		}
    },
	
    update: function()
    {	
		if (currentDifficulty == "Monster")
		{	
			me.game.remove(this);
		}		
		this.parent(this);
		return true;
		
    },

});