var bullet = me.ObjectEntity.extend({

	init: function(x, y, settings){
		this.parent(x, y, settings);
		this.collidable = true;
		this.gravity = 0;
		this.type = me.game.bullet;
		var travelLeft = false;
		this.inViewport = true;
		//this.updateColRect(0, 16, -8, 16);
		this.alwaysUpdate = true;
	},
	
	update: function(){
		if(!this.inViewport || this.vel.x == 0){
			me.game.remove(this);
		}
			
		//check for collision

		var res = me.game.collide(this,true);
		
		/*	
		if(res){

			if (res.obj.enemyState)
			{
				alert('test');
			}
			if (res.obj.type != me.game.COLLECTABLE_OBJECT && res.obj.bullet_type != 'liche_bullet' && res.obj != me.game.player){
				me.game.remove(this);
				return true;
			}		

		}
		*/
		
		this.updateMovement();
		return true;
	}
});

var licheboss_bullet = me.ObjectEntity.extend({

	init: function(x, y, settings){
		settings.image = 'bullet_licheboss';
		settings.spritewidth = 30;
		settings.spriteheight = 30;
		
		if (settings.direction)
		{
			this.direction = settings.direction;
		}
		else
		{
			this.direction = "left";
		}
		
		this.parent(x, y, settings);
				
		this.collidable = true;
		this.gravity = 0;
		this.type = me.game.ENEMY_OBJECT;
		this.bullet_type = 'licheboss_bullet';
		
		this.setVelocity(licheboss_shootSpeed, liche_Jump);
		
		//this.renderable.addAnimation( "shoot", [0,1,2] );
		
		var travelLeft = false;
		this.inViewport = true;
		this.alwaysUpdate = true;

	},
	
	update: function(){

		
		if (this.direction == "up")
		{
			if(!this.inViewport || this.vel.y == 0){
				me.game.remove(this);
			}
			this.pos.y += this.vel.y;
		}
		else if (this.direction == "down")
		{

			this.pos.y -= this.vel.y;
		}
		else
		{
			if(!this.inViewport || this.vel.x == 0){
				me.game.remove(this);
			}
			this.pos.x += this.vel.x;
		}
					
		//this.setCurrentAnimation( "shoot" );
		
		//check for collision
		var res = me.game.collide(this);
		
		if (res){
			if (res.obj.type != me.game.COLLECTABLE_OBJECT && res.obj.type != me.game.bullet && res.obj != me.game.player){
				me.game.remove(this);
			}	
			
		}
		

		this.parent(this);
		return true;
	}
});

var liche_bullet = me.ObjectEntity.extend({

	init: function(x, y, settings){

		this.direction = settings.direction;
		
		this.parent(x, y, settings);
				
		this.collidable = true;
		this.gravity = 0;
		this.type = me.game.ENEMY_OBJECT;
		this.bullet_type = 'liche_bullet';
		
		this.setVelocity(liche_shootSpeed, liche_shootSpeed);
		
		this.renderable.addAnimation( "shoot", [0] );
		
		var travelLeft = false;
		this.inViewport = true;
		this.alwaysUpdate = true;

	},
	
	update: function(){
		if(!this.inViewport || this.vel.x == 0){
			me.game.remove(this);
		}

		if (this.direction == true)
		{
			this.pos.x += this.vel.x;
		}
		else
		{
			this.pos.x -= this.vel.x;
		}
		
		//check for collision
		var res = me.game.collide(this);
		
		if (res){
			if (res.obj.type != me.game.COLLECTABLE_OBJECT && res.obj.type != me.game.bullet && res.obj != me.game.player && res.obj.type != me.game.ENEMY_OBJECT){
				me.game.remove(this);
			}			
		}

		this.parent(this);
		return true;
	}
});