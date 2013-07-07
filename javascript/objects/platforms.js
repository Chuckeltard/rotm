//For horizontal movable platforms
var platformEntity = me.ObjectEntity.extend({
	startLoc: "bottom",
	delay: 2,
	speed: 1,
	moveType: "vertical",
	// enemyBehavior: "jump", future addition
	
    init: function(x, y, settings) {

		if (settings.image == "platform2_long")
		{
			settings.spritewidth = 96;
			settings.spriteheight = 32;
		}
		else if (settings.image == "platform_leaves")
		{
			settings.spritewidth = 180;
			settings.spriteheight = 69;
		}
		
		this.parent(x, y, settings);
		
		if (settings) {
			if (settings.startLoc) {
				this.startLoc = settings.startLoc;
			}
			if (settings.delay) {
				this.delay = settings.delay;
			}
			if (settings.speed)
			{
				this.speed = settings.speed;
			}
			if (settings.moveType)
			{
				this.moveType = settings.moveType;
			}
		}

		if (this.startLoc == "left")
		{
			this.pos.x = x;
			this.moveLeft = true;
		}
		else if (this.startLoc == "right")
		{
			this.moveLeft = false;
			this.pos.x = x + settings.width - settings.spritewidth;
		}
		else if (this.startLoc == "top")
		{
			this.pos.y = y;
			this.moveDown = true;
		}
		else if (this.startLoc == "bottom")
		{
			this.pos.y = y +settings.height - settings.spriteheight;
			this.moveDown = false;		
		}        
		
        this.startY = y;
        this.endY = y + settings.height - settings.spriteheight;

		this.startX = x;
		this.endX = x + settings.width - settings.spritewidth;
		
		this.delay = this.delay * 30;
		this.delayCounter = this.delay;
        
        this.setVelocity(this.speed, this.speed);
        this.gravity = 0;
        this.collidable = true;
        this.type = "movingPlatform";
        this.renderable.addAnimation("move", [0, 0]);
        this.renderable.setCurrentAnimation("move");
		
		this.alwaysUpdate = true;
    },
    onCollision: function(res, obj) {
        /*
        On collision, dont let the player fall with gravity
        and move player within the block
         */

		if (obj.type == "mainPlayer" || obj.type == me.game.COLLECTABLE_OBJECT || obj.type == me.game.ENEMY_OBJECT) {
			/*
			// if the user hits the platform anywhere but the top, jump them on top of the platform. I don't like this functionality and am commenting it out
			if (obj.jumping && res.y < 0) {
                obj.forceJump()
                obj.jumping = false;
                obj.falling = true;
            }
			*/
            if (obj.falling) {
                
                obj.falling = false;
				
                if (res.y > 0) {
					obj.vel.y = 0;
					obj.pos.y = this.pos.y - obj.spriteheight;
					if (this.vel.x != 0)
					{
						if (this.moveLeft) {
							obj.pos.x = obj.pos.x - this.speed;
						}
						if (!this.moveLeft) {
							obj.pos.x = obj.pos.x + this.speed;
						}
					}
                }
            }
        }
		else if (obj.type == "grenade")
		{
			obj.explode();
		}
    },
	
    update: function() {
		
		if (this.moveType == "horizontal")
		{
			if (this.moveLeft && this.pos.x <= this.startX) 
			{
				this.moveLeft = false;
			} 
			else if (!this.moveLeft && this.pos.x >= this.endX) 
			{
				this.moveLeft = true;
			}
			
			if (this.pos.x == this.startX || this.pos.x == this.endX)
			{
				if (this.delayCounter <= 0)
				{
					this.doWalk(this.moveLeft);
					this.delayCounter = this.delay;
				}
				else
				{
					this.vel.x = 0;
					this.delayCounter--;
				}
			}
		}
		else if (this.moveType == "vertical")
		{
			if (this.moveDown && this.pos.y <= this.startY) 
			{
				this.moveDown = false;
			} 
			else if (!this.moveDown && this.pos.y >= this.endY) 
			{
				this.moveDown = true;
			}
			
			if (this.pos.y == this.startY || this.pos.y == this.endY)
			{
				if (this.delayCounter <= 0)
				{
					if (this.moveDown) {
						this.vel.y = -1;
					}
					if (!this.moveDown) {
						this.vel.y = 1;
					}
					this.delayCounter = this.delay;
				}
				else
				{
					this.vel.y = 0;
					this.delayCounter--;
				}			
			
			}
		}
		
		me.game.collide(this,true);
        this.updateMovement();
        
		if (this.vel.x !== 0) {
            this.parent(this);
            return true;
        }
        return false;
    }
});



var platformH = me.ObjectEntity.extend({
    init: function(x, y, settings) {
        this.parent(x, y, settings);
		
		if (settings.image == "platform1")
		{
			settings.spritewidth = 64;
			settings.spriteheight = 16;
		}
		else if (settings.image == "platform2")
		{
			settings.spritewidth = 64;
			settings.spriteheight = 32;		
		}
		else if (settings.image == "platform2_long")
		{
			settings.spritewidth = 96;
			settings.spriteheight = 32;		
		}
		else
		{
			settings.spritewidth = 64;
			settings.spriteheight = 16;		
		}
	
        this.startX = x;
        this.endX = x + settings.width - settings.spritewidth;
        this.pos.x = x;
        this.walkLeft = true;
        this.setVelocity(1, 0);
        this.gravity = 0;
        this.collidable = true;
        this.type = me.game.ACTION_OBJECT;
        this.renderable.addAnimation("move", [0, 0]);
        this.renderable.setCurrentAnimation("move");
		
		this.alwaysUpdate = true;
    },
    onCollision: function(res, obj) {
        /*
        On collision, dont let the player fall with gravity
        and move player within the block
         */
        if (obj.alive) {

            if (obj.jumping && res.y < 0) {
                obj.forceJump()
                obj.jumping = false;
                obj.falling = true;

            }
            if (obj.falling) {
                obj.pos.y = this.pos.y - obj.spritewidth + 1;
                obj.vel.y = 0;
                obj.falling = false;

                if (res.y > 0) {
                    if (this.walkLeft) {
                        obj.pos.x = obj.pos.x - 1;
                    }
                    if (!this.walkLeft) {
                        obj.pos.x = obj.pos.x + 1;
                    }
                }

            } else {
                obj.vel.y = 0;
            }

        }
    },
    update: function() {
        if (!this.inViewport) return false;
        if (this.alive) {
            if (this.walkLeft && this.pos.x <= this.startX) {
                this.walkLeft = false;
            } else if (!this.walkLeft && this.pos.x >= this.endX) {
                this.walkLeft = true;
            }
            this.doWalk(this.walkLeft);
        } else {
            this.vel.x = 0;
        }
        this.updateMovement();
        if (this.vel.x !== 0) {
            this.parent(this);
            return true;
        }
        return false;
    }
});



// For vertical movable blocks

var platformV = me.ObjectEntity.extend({
    init: function(x, y, settings) {
        this.parent(x, y, settings);
		
		//console.log("Image: " + settings.image);
		
		if (settings.image == "platform1")
		{
			settings.spritewidth = 64;
			settings.spriteheight = 16;
		}
		else if (settings.image == "platform2")
		{
			settings.spritewidth = 64;
			settings.spriteheight = 32;		
		}
		else if (settings.image == "platform2_long")
		{
			settings.spritewidth = 96;
			settings.spriteheight = 32;		
		}
		else
		{
			settings.spritewidth = 64;
			settings.spriteheight = 16;		
		}

		if (selectedHero == "malyn")
		{
			this.playerDiff = 44;
		}
		else if (selectedHero == "meena")
		{
			this.playerDiff = 31;
		}
		
        this.starty = y;
        this.endy = y + settings.height
        this.pos.y = y;
        this.upp = false;
        this.setVelocity(0, 1);
        this.gravity = 0;
        this.collidable = true;
        this.type = me.game.ACTION_OBJECT;
        this.renderable.addAnimation("move", [0, 0]);
        this.renderable.setCurrentAnimation("move");
		
		this.alwaysUpdate = true;
		
    },
    onCollision: function(res, obj) {
        /*
         On collision, dont let the player fall with gravity.
         */
        if (obj.alive) {

            if (obj.jumping && res.y < 0) {
                obj.forceJump()
                obj.jumping = false;
                obj.falling = true;

            }
            if (obj.falling) {
                obj.pos.y = this.pos.y - obj.spritewidth + 1;
                obj.vel.y = 0;
                obj.falling = false;

            } else {
                obj.vel.y = 0;
            }

        }
    },
    update: function() {

        if (this.upp) {
            this.vel.y = -1
        }
        if (!this.upp) {
            this.vel.y = 1
        }
        if (this.pos.y >= this.endy) {
            this.upp = true
        }
        if (this.pos.y <= this.starty) {
            this.upp = false
        }
        this.updateMovement();
        if (this.vel.y !== 0) {
            this.parent(this);
            return true;
        }
        return false;
    }
});
