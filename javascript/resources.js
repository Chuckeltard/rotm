jsApp.resources = {
	"ui_png" : [
		"16x16_font",
        "16x16_font_white",
        "16x16_font_green",
		"tutorial_box",
        "tutorial_box_big",
		"confirmation_box",
        "hud_box",
        "hud_box2",
        "icon_key",
        "icon_listing",
		"malyn_icon",
		"meena_icon",
        "renter_00",
        "renter_01",
        "renter_02",
        "renter_03",
        "renter_04",
        "renter_05",
        "renter_06",
        "renter_07",

		//Buttons
		"button_down",
		"button_grenade",
		"button_jump",
		"button_left",
		"button_right",
		"button_shoot",
		"button_up"
		
	],
    "ui_jpg" : [
		"title_screen",
        "credits_screen",
        "menu_screen",
        "MainMenu_intro_00003",
        "MainMenu_intro_00012",
        "MainMenu_intro_00019",
        "MainMenu_intro_00029",
        "MainMenu_intro_00040",
        "MainMenu_intro_00067",
        "MainMenu_intro_00091",
        "MainMenu_intro_00101",
        "MainMenu_intro_00123",
        "MainMenu_intro_00297",
        "MainMenu_intro_00298",
        "MainMenu_intro_00299"
        
	],

	"global_sprites" : [
        // Characters
        "malyn",
		"meena",
       
		// Collectibles
        "spinning_key",
        "listing",
        "health_drop",
		"health_drop_small",
		
        // Projectiles
        "bullet",
		"bullet_fireball",
		"bullet_licheboss",
		"bullet_hit_effects",
        "grenade",
        "grenade_trace",
		"grenade_explosion",
		"lightning",
		"pickup_ability",
        "pickup_lightning",
		"effect_player_lightning",

		// Animations
        "neon_sign",
        "rain_back",
        "rain_front",
        "clouds",
        "fire",
        "smoke",
        
        //Objects
        "platform1",
        "platform2",
        "platform2_long",
        "teleport",
		"blank"

	],
	
	"city_world_sprites" : [
        // Enemies
        "zombie",
		"mummy",
		"skeleton",
		"skeleton_ranged",
		"skeleton_ranged_sword",
		"vampire",
        "liche",
		"ghost",
        "ghost_angry",
        "bat",
		"liche_boss",
		"liche_boss_staff"
    ],
        "forest_world" : [
        // Enemies
        "platform_leaves"
    ],

	// Tile Sets
	"tilesets" : [
        "city_world_tileset",
		"city_world_tileset_night",
		"metatiles",
        "forest_world_tileset",
        "city_objects",
        "colors_n_textures",
        "windows_n_doors_tileset",
        "cityworld"
	],
	
	// Backgrounds
	"backgrounds" : [
        "city_world_background",
        "sky",
        "blackness_background",
        "stars",
        "sunset",
        "cityscape_detail"
	],
	
    /* Levels from Tiled. */
    "map" : [
        /* City World */
        //"world_city",
		/*
        "city_level_01",
        "city_level_02",
        "city_level_03",
        "city_level_04",
		"city_level_05",
		"city_level_06",
		"city_level_boss_01"
		*/
		
		/* Test Levels */
		/*
		"test_nick2",
        "test_nick3",
		"dave_test",
		"dave_test1",
		"dave_test2",
		"dave_test3",
		"dave_test4",
		"jesse_test",
		"jesse_test2",
		"jesse_test3",
		"jesse_test4",
		"jesse_bonus", 
		*/
    ],

    /* 1-channel audio. Usually sound effects. */
    "sfx" : [
		"world_clear_tiles",
        "halfsec", // placeholder sound for places where audio has to be called but doesn't exist
		"zombie_generic",
		"zombie_brains",
		"zombie_hit",
		"player_gunshot",
		"rain_01",
		"mummy_generic",
		"fireball_01",
		"key_pickup",
		"health_pickup",
		"listing_pickup",
		"malyn_grenade_explosion"
    ],

    /* 2-channel audio. Usually music. */
    "bgm" : [
        //"city_level_bgm_01",
		"title_screen_01"
    ]
};