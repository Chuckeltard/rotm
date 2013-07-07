var city_world_background = me.ImageLayer.extend({
        init: function(width, height, repeat) {
        width = 1024;
		height = 576;        
        repeat = repeat-x;        
        }
});
    
var ScrollingBackgroundLayer = me.ImageLayer.extend({
	init: function(image, speed) {
		var name = image;
		var width = 1024;
		var height = 576;
		var z = 10;
		var ratio = 1;
		this.speed = speed;
		this.parent(name, width, height, image, z, ratio);
	},

	update: function() 
	{
		// recalibrate image position
		if (this.offset.x >= this.imagewidth) 
		{
			this.offset.x = 0;
		};
	
		// increment horizontal background position
		this.offset.x += this.speed;
		return true;
	}
});