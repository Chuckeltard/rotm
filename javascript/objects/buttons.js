var button = me.AnimationSheet.extend(
{
	init:function(x, y)
	{
		//this.parent(x, y, me.loader.getImage("mole"), 178, 140);
		this.addAnimation("idle", [0]);
	
		//me.input.registerMouseEvent('mousedown', this, this.onMouseDown.bind(this));
	},
	
	onMouseDown: function()
	{
		return false;
	},
	
	update: function()
	{
	
	}
});