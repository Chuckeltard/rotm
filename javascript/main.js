//jsApp is being used as a namespace to be able to use functions with dot notation. AKA, jsApp.onload(), etc

var jsApp = {

	onload: function() {
		// load user data here;
		load_user_data();

		//me.sys.fps = 30;

		this.videoScale;

		// alert(fullScreen);

		if(me.sys.isMobile)
		{
			this.videoScale = .5;
		}
		else
		{
			if (fullScreen == "true")
			{
				this.videoScale = "auto";
			}
			else
			{
				this.videoScale = 1.0;
			}
		}

		if(!me.video.init('jsapp', 768, 432, true, this.videoScale)) //1024x576, we may be able to use 'auto' for auto scaling.
		{
			alert("Sorry but your browser does not support html 5 canvas.");
			return;
		}

		//initialize the audio
		me.audio.init("ogg,mp3");

		// Set a callback to run when loading is complete.
        me.loader.onload = this.loaded.bind(this);

        this.loadResources();

		//load everything & display a loading screen
		me.state.set(me.state.LOADING, new LoadingScreen());
		me.state.change(me.state.LOADING);

		//Global gravity for all in-game entities
		//me.sys.gravity = gravity;

	},

	"loadResources" : function loadResources() {

			// Set all resources to be loaded.
			var resources = [];

			// GUI PNG
			this.resources["ui_png"].forEach(function forEach(value) {
				resources.push({
					"name"  : value,
					"type"  : "image",
					"src"   : "data/GUI/" + value + ".png"
				})
			});

			// GUI JPG
			this.resources["ui_jpg"].forEach(function forEach(value) {
				resources.push({
					"name"  : value,
					"type"  : "image",
					"src"   : "data/GUI/" + value + ".jpg"
				})
			});

			this.resources["global_sprites"].forEach(function forEach(value) {
				resources.push({
					"name"  : value,
					"type"  : "image",
					"src"   : "data/sprites/" + value + ".png"
				})
			});

			this.resources["city_world_sprites"].forEach(function forEach(value) {
				resources.push({
					"name"  : value,
					"type"  : "image",
					"src"   : "data/sprites/city_world/" + value + ".png"
				})
			});

			this.resources["forest_world"].forEach(function forEach(value) {
				resources.push({
					"name"  : value,
					"type"  : "image",
					"src"   : "data/sprites/forest_world/" + value + ".png"
				})
			});

			// Backgrounds.
			this.resources["backgrounds"].forEach(function forEach(value) {
				resources.push({
					"name"  : value,
					"type"  : "image",
					"src"   : "data/backgrounds/" + value + ".png"
				})
			});

			// Tilesets.
			this.resources["tilesets"].forEach(function forEach(value) {
				resources.push({
					"name"  : value,
					"type"  : "image",
					"src"   : "data/tilesets/" + value + ".png"
				})
			});

			// Maps.
			this.resources["map"].forEach(function forEach(value) {
				resources.push({
					"name"  : value,
					"type"  : "tmx",
					"src"   : "data/levels/city_world/" + value + ".json"
				})
			});

			// Sound effects.
			this.resources["sfx"].forEach(function forEach(value) {
				resources.push({
					"name"      : value,
					"type"      : "audio",
					"src"       : "data/audio/sfx/",
					"channel"   : 4
				})
			});

			// Music.
			this.resources["bgm"].forEach(function forEach(value) {
				resources.push({
					"name"      : value,
					"type"      : "audio",
					"src"       : "data/audio/bgm/",
					"channel"   : 1,
					"stream" : true
				})
			});

			// Load the resources.
			me.loader.preload(resources);
		},

	//callback when everything is loaded

	loaded: function(){
		// debug
		//me.plugin.register(debugPanel, "debug");

		// set the various game states
		me.state.set(me.state.MENU, new LoadingScreen());
		me.state.set(me.state.MENU, new TitleScreen());
		me.state.set(MAIN_MENU_STATE, new MainMenu());
		me.state.set(me.state.CREDITS, new creditsScreen());
		me.state.set(me.state.PLAY, new PlayScreen());
		me.state.set(OPTIONS_STATE, new OptionsScreen());
		me.state.set(GAME_OVER_STATE, new GameOverScreen());
		me.state.set(DEBUG_STATE, new DebugSelectScreen());
		me.state.set(CHARACTER_SELECT_STATE, new CharacterSelectScreen());
		me.state.set(LEVEL_TRANSITION_STATE, new level_transitionScreen());
		me.state.set(STORY_STATE, new StoryScreen());
		//me.state.set(SPLASH_SCREEN_STATE, new splashScreen());

		// set a global fading transition for the screen
		me.state.transition("fade", "#000000", 250);
        me.entityPool.add('Health_Entity', Health_Entity);
		me.entityPool.add('Collectible_01_Entity', Collectible_01_Entity);
		me.entityPool.add('Collectible_02_Entity', Collectible_02_Entity);
		me.entityPool.add('abilityPickup', abilityPickup);
		me.entityPool.add('bullet', bullet);
		me.entityPool.add('licheboss_bullet',licheboss_bullet);
		me.entityPool.add('boss_manager', boss_manager);
		me.entityPool.add('EnemyEntity_licheboss', EnemyEntity_licheboss);
        me.entityPool.add('EnemyEntity_licheboss_staff', EnemyEntity_licheboss_staff);
        me.entityPool.add('EnemyEntity_zombie', EnemyEntity_zombie);
		me.entityPool.add('EnemyEntity_mummy', EnemyEntity_mummy);
		me.entityPool.add('EnemyEntity_skeleton', EnemyEntity_skeleton);
		me.entityPool.add('EnemyEntity_skeleton_ranged', EnemyEntity_skeleton_ranged);
		me.entityPool.add('EnemyEntity_vampire', EnemyEntity_vampire);
		me.entityPool.add('EnemyEntity_liche', EnemyEntity_liche);
        me.entityPool.add('EnemyEntity_ghost', EnemyEntity_ghost);
        me.entityPool.add('EnemyEntity_ghost_angry', EnemyEntity_ghost_angry);
        me.entityPool.add('EnemyEntity_bat', EnemyEntity_bat);
        me.entityPool.add('KillEntity', KillEntity);
		me.entityPool.add('tutorial_obj', tutorial_obj);
		me.entityPool.add('neon_sign', neon_sign);
		me.entityPool.add('game_over_exit', game_over_exit);
		me.entityPool.add('level_transitionObject', level_transitionObject);
		me.entityPool.add('level_clearObject', level_clearObject);
		me.entityPool.add('level_saveObject', level_saveObject);
		me.entityPool.add('platformEntity', platformEntity);
		me.entityPool.add('platformH', platformH); // old - levels need to be updated and this removed
        me.entityPool.add('platformV', platformV); // old - levels need to be updated and this removed
        me.entityPool.add('teleport', Teleport);
        me.entityPool.add('fire', fire);
		me.entityPool.add('pauseMenu', pauseMenu);
		me.entityPool.add('tutorialDisplay', tutorialDisplay);

		// Enemy Spawners
        me.entityPool.add("zombie_Spawner", zombie_Spawner);
		me.entityPool.add("mummy_Spawner", mummy_Spawner);
		me.entityPool.add("skeleton_Spawner", skeleton_Spawner);
		me.entityPool.add("skeleton_ranged_Spawner", skeleton_ranged_Spawner);
		me.entityPool.add("vampire_Spawner", vampire_Spawner);
        me.entityPool.add("ghost_Spawner", ghost_Spawner);
		me.entityPool.add("ghost_angry_Spawner", ghost_angry_Spawner);
		me.entityPool.add("bat_Spawner", bat_Spawner);
		me.entityPool.add("liche_Spawner", liche_Spawner);

		// Ambient Spawners
        me.entityPool.add('cloud_AmbientSpawner', cloud_AmbientSpawner);
        me.entityPool.add('smoke_AmbientSpawner', smoke_AmbientSpawner);
        me.entityPool.add('rain_front_AmbientSpawner', rain_front_AmbientSpawner);
        me.entityPool.add('rain_back_AmbientSpawner', rain_back_AmbientSpawner);

		//start the game
		me.state.change(MAIN_MENU_STATE);

	}
}; //jsApp

/*
me.game.onLevelLoaded = function () {
	var layer_background = me.game.getEntityByName("parallax_background")[0];
	layer_background.new_offset_x = 0;
	layer_background.new_offset_y = -100;
	try {
		// melonJS 0.9.7+
		layer_background.pos.x = layer_background.new_offset_x;
		layer_background.pos.y = layer_background.new_offset_y;
	}
	catch (e) {
		// melonJS 0.9.6 and older
		layer_background.offset.x = layer_background.new_offset_x;
		layer_background.offset.y = layer_background.new_offset_y;
	}
};
*/

/*the in game stuff*/
var PlayScreen = me.ScreenObject.extend({

	onResetEvent: function(){
		if (selectedHero == 'malyn')
		{
			me.entityPool.add('mainPlayer', PlayerEntity_malyn);
		}
		else if (selectedHero == 'meena')
		{
			me.entityPool.add('mainPlayer', PlayerEntity_meena);
		}
		else
		{
			me.entityPool.add('mainPlayer', PlayerEntity_malyn);
		}

		me.game.viewport.setDeadzone(0,0)

		bindKeys("bind","gameplay");

		//me.debug.renderHitBox = true;
		// don't specify a specific region for mousemove,
		// so we can 'watch' the whole screen
		//me.input.registerMouseEvent('mousemove',null, this.mouseMove.bind(this));
	/*
		mouseMove : function (e)
		{
			mX = me.input.mouse.pos.x;
			mY = me.input.mouse.pos.y;
			if (this.collisionBox.containsPoint(me.input.mouse.pos)) {
			}
			else if (!this.mDown) {
			}
			if (this.mDown) {
				return false;
			}

			return true;
		},*/

		//stuff to reset on state change
		//Load the level-selection screen.
		me.levelDirector.loadLevel(selectedlevel);

		//Load the first song.
		if(musicOn){
			me.audio.stopTrack();
			me.audio.playTrack(current_audio_track);
		}

		//add a default HUD to the game manager.
		me.game.addHUD(0, 0, 768, 100);

		//add a new HUD item
		me.game.HUD.addItem("Collectible_01_Entity", new Collectible_01_HUDObject(732, 10));
		me.game.HUD.addItem("Collectible_02_Entity", new Collectible_02_HUDObject(732, 30));

		//me.game.HUD.addItem("Collectible_03_Entity", new Collectible_03_HUDObject(732, 50));
		me.game.HUD.addItem("health", new HealthHUDObject(152, 10));

		// Debug display
		/*
		me.game.HUD.addItem("debug1", new DebugHUDObject(450, 10));
		me.game.HUD.addItem("debug2", new DebugHUDObject(450, 30));
		me.game.HUD.addItem("debug3", new DebugHUDObject(450, 50));
		*/

		// detect what levels the player has already cleared and wipe the map accordingly - we should do this before the map is loaded in

		// teleport the player to the previous completed level if in world_city

		if (selectedlevel == 'world_city')
		{
			if (me.game.world_player_pos_x != null)
			{
				me.game.player.pos.x = me.game.world_player_pos_x;
				me.game.player.pos.y = me.game.world_player_pos_y;
			}
		}
		
		//Controls for Android and IOS
		me.game.add((new rightControl(70,360)),10);
		me.game.add((new leftControl(10, 360)),10);
		me.game.add((new upControl(30, 340)),10);
		me.game.add((new downControl(30, 400)),10);
		me.game.add((new grenadeControl(600, 380)),10);
		me.game.add((new shotControl(650, 380)),10);
		me.game.add((new jumpControl(700, 380)),10);



		me.game.sort();

	},

    restartLevel: function( level ) {
		me.audio.stopTrack();
        level = level || me.levelDirector.getCurrentLevelId();
        me.levelDirector.loadLevel( level );
        me.game.sort();

		if (me.game.level_save_trigger == true)
		{
			me.game.player.pos.x = me.game.level_player_pos_x;
			me.game.player.pos.y = me.game.level_player_pos_y;
		}

		bindKeys("bind","gameplay");
		me.audio.playTrack(current_audio_track);

    },

	//action to perform when game is finished(state change)
	onDestroyEvent: function(){
		me.audio.stopTrack();
		me.game.disableHUD();
		me.input.unbindMouse(me.input.mouse.LEFT);
	}
});

//bootstrap
window.onReady(function(){
	jsApp.onload();
});

function checkAchievement(type)
{
	//console.log(type);

	if (type == "Complete the Demo")
	{
		var new_displayAchievement = new displayAchievement(0, 0 ,{achievement: type});
		me.game.add(new_displayAchievement, 999);
		me.game.sort();
	}
	else
	{
		saveData[type]++;

		if (in_array(saveData[type], achievementData[type]))
		{
			var key = in_array(saveData[type], achievementData[type]);

			var new_displayAchievement = new displayAchievement(0, 0 ,{achievement: key});

			me.game.add(new_displayAchievement, 999);
			me.game.sort();
		}
	}
}

function bindKeys(action, type)
{
	if (type == "menu")
	{
		if (action == "bind")
		{
			me.input.bindKey(me.input.KEY.ENTER, "enter", true);
			me.input.bindKey(me.input.KEY.UP, "menuUp", true);
			me.input.bindKey(me.input.KEY.DOWN, "menuDown", true);
			me.input.bindKey(me.input.KEY.LEFT, "menuLeft", true);
			me.input.bindKey(me.input.KEY.RIGHT, "menuRight", true);
		}
		else if (action == "unbind")
		{
			me.input.unbindKey(me.input.KEY.ENTER);
			me.input.unbindKey(me.input.KEY.UP);
			me.input.unbindKey(me.input.KEY.DOWN);
			me.input.unbindKey(me.input.KEY.LEFT);
			me.input.unbindKey(me.input.KEY.RIGHT);
			me.input.unbindKey(me.input.KEY.P);
			return true;
		}
	}
	else if (type == "gameplay")
	{
		if (saveData.keyConfig == 1)
		{
			if (action == "bind")
			{
				me.input.bindKey(me.input.KEY.LEFT, "left");
				me.input.bindKey(me.input.KEY.RIGHT, "right");
				me.input.bindKey(me.input.KEY.UP, "up");
				me.input.bindKey(me.input.KEY.DOWN, "down");
				me.input.bindKey(me.input.KEY.SPACE, "jump", true);
				me.input.bindKey(me.input.KEY.F, "shot");
				me.input.bindKey(me.input.KEY.G, "special_ability", true);
			}
			else if (action == "unbind")
			{
				me.input.bindKey(me.input.KEY.LEFT);
				me.input.bindKey(me.input.KEY.RIGHT);
				me.input.bindKey(me.input.KEY.UP);
				me.input.bindKey(me.input.KEY.DOWN);
				me.input.bindKey(me.input.KEY.SPACE);
				me.input.bindKey(me.input.KEY.F);
				me.input.bindKey(me.input.KEY.G);
				return true;
			}
		}
		else if (saveData.keyConfig == 2)
		{
			if (action == "bind")
			{
				me.input.bindKey(me.input.KEY.S, "left");
				me.input.bindKey(me.input.KEY.F, "right");
				me.input.bindKey(me.input.KEY.E, "up");
				me.input.bindKey(me.input.KEY.D, "down");
				me.input.bindKey(me.input.KEY.L, "special_ability", true);
				me.input.bindKey(me.input.KEY.J, "jump", true);
				me.input.bindKey(me.input.KEY.K, "shot",true);
				me.input.bindKey(me.input.KEY.LEFT, "left");
				me.input.bindKey(me.input.KEY.RIGHT, "right");
				me.input.bindKey(me.input.KEY.UP, "up");
				me.input.bindKey(me.input.KEY.DOWN, "down");
			}
			else if (action == "unbind")
			{
				me.input.unbindKey(me.input.KEY.S);
				me.input.unbindKey(me.input.KEY.F);
				me.input.unbindKey(me.input.KEY.E);
				me.input.unbindKey(me.input.KEY.D);
				me.input.unbindKey(me.input.KEY.L);
				me.input.unbindKey(me.input.KEY.J);
				me.input.unbindKey(me.input.KEY.K);
				return true;
			}
		}
		else if (saveData.keyConfig == 3)
		{
			if (action == "bind")
			{
				me.input.bindKey(me.input.KEY.LEFT, "left");
				me.input.bindKey(me.input.KEY.RIGHT, "right");
				me.input.bindKey(me.input.KEY.UP, "up");
				me.input.bindKey(me.input.KEY.DOWN, "down");
				me.input.bindKey(me.input.KEY.SPACE, "jump", true);
				me.input.bindKey(me.input.KEY.Z, "shot");
				me.input.bindKey(me.input.KEY.G, "special_ability", true);
				me.input.bindKey(me.input.KEY.X, "jump", true);
			}
			else if (action == "unbind")
			{
				me.input.bindKey(me.input.KEY.LEFT);
				me.input.bindKey(me.input.KEY.RIGHT);
				me.input.bindKey(me.input.KEY.UP);
				me.input.bindKey(me.input.KEY.DOWN);
				me.input.bindKey(me.input.KEY.SPACE);
				me.input.bindKey(me.input.KEY.Z);
				me.input.bindKey(me.input.KEY.G);
				me.input.unbindKey(me.input.KEY.X);
				return true;
			}
		}

		// global
		me.input.bindKey(me.input.KEY.P, "pause", true);
		me.input.bindKey(me.input.KEY.ESC, "pause", true);
		me.input.bindKey(me.input.KEY.ENTER, "enter", true);
		//me.input.bindMouse(me.input.mouse.LEFT, me.input.KEY.RIGHT);

		// debug keys
		me.input.bindKey(me.input.KEY.NUM1, "NUM1", true);
		me.input.bindKey(me.input.KEY.NUM2, "NUM2", true);
		me.input.bindKey(me.input.KEY.NUM3, "NUM3", true);
		me.input.bindKey(me.input.KEY.NUM4, "NUM4", true);
		me.input.bindKey(me.input.KEY.NUM5, "NUM5", true);
		me.input.bindKey(me.input.KEY.NUM6, "NUM6", true);
		me.input.bindKey(me.input.KEY.NUM8, "NUM7", true);
		me.input.bindKey(me.input.KEY.NUM8, "NUM8", true);
		me.input.bindKey(me.input.KEY.NUM9, "NUM9", true);
		me.input.bindKey(me.input.KEY.NUM9, "NUM0", true);
	}
}



function in_array(needle, haystack, argStrict)
{
	var key = '',
	strict = !! argStrict;

	if (strict)
	{
		for (key in haystack)
		{
			if (haystack[key] === needle)
			{
			  return key;
			}
		}
	}
	else
	{
		for (key in haystack)
		{
			if (haystack[key] == needle)
			{
				return key;
			}
		}
	}

	return false;

}

function save_user_data() {

	if (username != 'guest')
	{
		if (window.XMLHttpRequest) {
			xmlhttp=new XMLHttpRequest();
		}
		else {
			xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
		}

		var data = JSON.stringify( saveData );

		xmlhttp.onreadystatechange=function() {

			if (xmlhttp.readyState==4 && xmlhttp.status==200) {

				saveResult = xmlhttp.responseText.split("****");

				if (saveResult != "success")
				{
					saveResult = "Save Failed";
				}
			}
		}

		xmlhttp.open("POST","php/server_save_playerdata.php?username="+username+"&data="+data,true);
		xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		xmlhttp.send();
	}

}

function load_user_data() {

	if (window.XMLHttpRequest) {
		xmlhttp=new XMLHttpRequest();
	}
	else {
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}

	xmlhttp.onreadystatechange=function() {

		if (xmlhttp.readyState==4 && xmlhttp.status==200) {
			var Result = xmlhttp.responseText.split("****");

			// parse load response and update local variables accordingly
			var data_key = Result[0].split(",");
			var data_value = Result[1].split(",");

			for (var i = 0; i < data_key.length; i++) {
				if (i <= 3)
				{
					saveData[data_key[i]] = data_value[i];
				}
				else
				{
					saveData[data_key[i]] = parseFloat(data_value[i]);
				}
			}
		}
	}

	xmlhttp.open("POST","php/server_load_playerdata.php?username="+username,true);
	xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	xmlhttp.send();

}