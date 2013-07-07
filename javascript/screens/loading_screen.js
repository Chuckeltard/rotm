// create a custom loading screen
var LoadingScreen = me.ScreenObject.extend(
{
   // constructor
   init: function()
   {
      // pass true to the parent constructor
      // as we draw our progress bar in the draw function
      this.parent(true);
      // a font logo
	  this.logo = new me.Font('century gothic', 36, 'white');
	  this.logo_small = new me.Font('century gothic', 18, 'white');
      // flag to know if we need to refresh the display
      this.invalidate = false;
      // load progress in percent
      this.loadPercent = 0;
      // setup a callback
      me.loader.onProgress = this.onProgressUpdate.bind(this);

   },

   // will be fired by the loader each time a resource is loaded
   onProgressUpdate: function(progress)
   {
      this.loadPercent = progress;
      this.invalidate = true;
   },


   // make sure the screen is only refreshed on load progress
   update: function()
   {
      if (this.invalidate===true)
      {
         // clear the flag
         this.invalidate = false;
         // and return true
         return true;
      }
      // else return false
      return false;
   },

   // on destroy event
   onDestroyEvent : function ()
   {
      // "nullify" all fonts
      this.logo = null;
	  this.logo_small = null;
   },

   //	draw function
   draw : function(context)
   {
      // clear the screen
      me.video.clearSurface (context, "black");

      // measure the logo size
	logo_width = this.logo.measureText(context,"Rise of the Monsters").width;
	logo_small_width = this.logo_small.measureText(context,"Powered by melonJS").width;
	
      // draw our text somewhere in the middle
      this.logo.draw(context,
                     "Rise of the Monsters",
                     ((me.video.getWidth() - logo_width) / 2),
                     (me.video.getHeight() + 0) / 2);

      this.logo_small.draw(context,
                     "Powered by melonJS",
                     ((me.video.getWidth() - logo_small_width) / 2),
                     (me.video.getHeight() + 100) / 2);
					 
      // display a progressive loading bar
      var width = Math.floor(this.loadPercent * me.video.getWidth());

      // draw the progress bar
      context.strokeStyle = "silver";
      context.strokeRect(0, (me.video.getHeight() / 2) + 40, me.video.getWidth(), 6);
      context.fillStyle = "#D4ADD1";
      context.fillRect(2, (me.video.getHeight() / 2) + 42, width-4, 2);
   },
});