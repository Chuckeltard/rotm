var Teleport = me.CollectableEntity.extend({
    distance: 50,
	direction: "right",
	
	init: function(x, y, settings) {
		if (settings) {
			if (settings.distance) {
				this.distance = settings.distance;
			}
			if (settings.direction) {
				this.direction = settings.direction;
			}
		}
		settings.image = "teleport";
        settings.spritewidth = 30;
		settings.spriteheight = 30;
        
        this.parent(x, y, settings);
        this.renderable.addAnimation("normal", [0]);
        this.renderable.addAnimation("active", [0]);
        this.renderable.setCurrentAnimation("normal");
        this.autodestroy = false;
        teleportx_array[settings.id] = x;
        teleporty_array[settings.id] = y;
        this.nameid = settings.id;
		this.goto_Teleporter = settings.goto;
		
		if (this.direction == "left")
		{
			this.distance = -this.distance;
		}
    },
    onCollision: function(res, obj) {

        for (var i = 0; i < (teleportx_array.length);
        (i++)) {
            if (this.goto_Teleporter == i) {
                obj.pos.x = (teleportx_array[i] + this.distance);
                obj.pos.y = teleporty_array[i];

            }
        }
        this.renderable.setCurrentAnimation("active");
    },
    update: function() {
        updated = this.updateMovement()
        if (updated) {
            this.parent();
            updated = true
        }
        return updated
    }
});