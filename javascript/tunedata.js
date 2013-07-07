var MOBILE = false;

var MAIN_MENU_STATE = me.state.USER + 0;
var OPTIONS_STATE = me.state.USER + 1;
var GAME_OVER_STATE = me.state.USER + 2;
var DEBUG_STATE = me.state.USER + 3;
var CHARACTER_SELECT_STATE = me.state.USER + 4;
var LEVEL_TRANSITION_STATE = me.state.USER + 5;
var STORY_STATE = me.state.USER + 6;
var SPLASH_SCREEN_STATE = me.state.USER + 6;

var bWorldLevel = false;
var worldlevel = "world_city";
var selectedlevel = null;
var previouslevel = null;
var current_audio_track = "city_level_bgm_01";
var teleportx_array = new Array();
var teleporty_array = new Array();

if (!username)
{
	var username = 'guest';
}

var introCompleted = false;
var gameisPaused = false;

var saveData = new Object();
var curData = new Object();
var purchaseData = new Object();
var achievementData = new Array();

// ==========================
// ===== Player Current Data =====
// ==========================
curData.abilityPickup = false;

// ========================
// ===== Player Save Data =====
// ========================
saveData.time_played = 0,
saveData.selectedHero = "malyn";
saveData.completedDemo = 0;
saveData.keyConfig = 1;
saveData.currentDifficulty = "Normal";

saveData.deaths = 0,
saveData.damage_taken = 0,
saveData.damage_done = 0,
saveData.kills = 0,
saveData.kills_zombie = 0,
saveData.kills_mummy = 0,
saveData.kills_skeleton = 0,
saveData.kills_skeleton_ranged = 0,
saveData.kills_vampire = 0,
saveData.kills_ghost = 0,
saveData.kills_ghost_angry = 0,
saveData.kills_bat = 0,
saveData.kills_liche = 0,
saveData.health_pickup = 0,
saveData.key_pickup = 0,
saveData.key_currency = 1000,
saveData.listing_pickup = 1000,
saveData.ability_pickup = 0,

saveData.upgrade_malyn_health = 0;
saveData.upgrade_malyn_damage = 0;
saveData.upgrade_malyn_attackrate = 0;
saveData.upgrade_malyn_movespeed = 0;
saveData.upgrade_malyn_abilityunlocked = 0;
saveData.upgrade_malyn_abilityunlocked_upgrade01 = 0;
saveData.upgrade_malyn_abilityunlocked_upgrade02 = 0;
saveData.upgrade_malyn_abilitycooldown = 0;
saveData.upgrade_malyn_abilitydamage = 0;

saveData.upgrade_meena_health = 0;
saveData.upgrade_meena_damage = 0;
saveData.upgrade_meena_attackrate = 0;
saveData.upgrade_meena_movespeed = 0;
saveData.upgrade_meena_abilityunlocked = 0;
saveData.upgrade_meena_abilityunlocked_upgrade01 = 0;
saveData.upgrade_meena_abilityunlocked_upgrade02 = 0;
saveData.upgrade_meena_abilitycooldown = 0;
saveData.upgrade_meena_abilitydamage = 0;

saveData.upgrade_global_doublejump = 0;
saveData.upgrade_global_float = 0;
saveData.upgrade_global_coins = 0;

saveData.city_level_01 = 0,
saveData.city_level_02 = 0,
saveData.city_level_03 = 0,
saveData.city_level_04 = 0,
saveData.city_level_05 = 0,
saveData.city_level_06 = 0,
saveData.city_level_boss_01 = 0,

saveData.city_level_01_cleared = 0;
saveData.city_level_02_cleared = 0;
saveData.city_level_03_cleared = 0;
saveData.city_level_04_cleared = 0;
saveData.city_level_05_cleared = 0;
saveData.city_level_06_cleared = 0;
saveData.city_level_boss_01_cleared = 0;

saveData.city_level_01_listing_1 = 0,
saveData.city_level_02_listing_1 = 0,
saveData.city_level_03_listing_1 = 0,
saveData.city_level_03_listing_2 = 0,
saveData.city_level_04_listing_1 = 0,
saveData.city_level_05_listing_1 = 0,
saveData.city_level_06_listing_1 = 0,
saveData.city_level_06_listing_2 = 0,
saveData.city_level_06_listing_3 = 0,
saveData.city_level_boss_01_listing_1 = 0,
saveData.city_level_boss_01_listing_2 = 0,

// ======================
// ===== Purchase Data =====
// ======================
purchaseData.upgrade_health_1 = 5;
purchaseData.upgrade_health_2 = 10;
purchaseData.upgrade_health_3 = 15;

purchaseData.upgrade_damage_1 = 10;
purchaseData.upgrade_damage_2 = 20;
purchaseData.upgrade_damage_3 = 30;

purchaseData.upgrade_attackrate_1 = 10;
purchaseData.upgrade_attackrate_2 = 20;
purchaseData.upgrade_attackrate_3 = 30;

purchaseData.upgrade_movespeed_1 = 10;
purchaseData.upgrade_movespeed_2 = 20;
purchaseData.upgrade_movespeed_3 = 30;

purchaseData.specialability_01 = 5;
purchaseData.upgrade_specialability_01 = 10;
purchaseData.upgrade_specialability_02 = 15;

// =========================
// ===== Achievement Data =====
// =========================
achievementData["key_pickup"] = new Array();
achievementData["key_pickup"]["Collect 10 Keys"] = 1;
achievementData["key_pickup"]["Collect 1000 Keys"] = 1000;
achievementData["key_pickup"]["Collect 10,000 Keys"] = 10000;

achievementData["kills"] = new Array();
achievementData["kills"]["Kill 100 Enemies"] = 100;
achievementData["kills"]["Kill 1000 Enemies"] = 1000;
achievementData["kills"]["Kill 10,000 Enemies"] = 10000;

achievementData["deaths"] = new Array();
achievementData["deaths"]["Die Once"] = 1;
achievementData["deaths"]["Die 10 Times"] = 1000;
achievementData["deaths"]["Die 1000 Times"] = 10000;

achievementData["kills_zombie"] = new Array();
achievementData["kills_zombie"]["Kill 10 Zombies"] = 10;
achievementData["kills_zombie"]["Kill 100 Zombies"] = 100;
achievementData["kills_zombie"]["Kill 1000 Zombies"] = 1000;

achievementData["kills_mummy"] = new Array();
achievementData["kills_mummy"]["Kill 10 Mummies"] = 10;
achievementData["kills_mummy"]["Kill 100 Mummies"] = 100;
achievementData["kills_mummy"]["Kill 1000 Mummies"] = 1000;

achievementData["kills_skeleton"] = new Array();
achievementData["kills_skeleton"]["Kill 10 Skeletons"] = 10;
achievementData["kills_skeleton"]["Kill 100 Skeletons"] = 100;
achievementData["kills_skeleton"]["Kill 1000 Skeletons"] = 1000;

achievementData["kills_skeleton_ranged"] = new Array();
achievementData["kills_skeleton_ranged"]["Kill 10 Skeleton Throwers"] = 10;
achievementData["kills_skeleton_ranged"]["Kill 100 Skeleton Throwers"] = 100;
achievementData["kills_skeleton_ranged"]["Kill 1000 Skeleton Throwers"] = 1000;

achievementData["kills_vampire"] = new Array();
achievementData["kills_vampire"]["Kill 10 Vampires"] = 10;
achievementData["kills_vampire"]["Kill 100 Vampires"] = 100;
achievementData["kills_vampire"]["Kill 1000 Vampires"] = 1000;

achievementData["kills_vampire_hero"] = new Array();
achievementData["kills_vampire_hero"]["Kill 10 Vampire Lords"] = 10;
achievementData["kills_vampire_hero"]["Kill 100 Vampire Lords"] = 100;
achievementData["kills_vampire_hero"]["Kill 1000 Vampire Lords"] = 1000;

achievementData["kills_ghost"] = new Array();
achievementData["kills_ghost"]["Kill 10 Ghosts"] = 10;
achievementData["kills_ghost"]["Kill 100 Ghosts"] = 100;
achievementData["kills_ghost"]["Kill 1000 Ghosts"] = 1000;

achievementData["kills_ghost_angry"] = new Array();
achievementData["kills_ghost_angry"]["Kill 10 Angry Ghosts"] = 10;
achievementData["kills_ghost_angry"]["Kill 100 Angry Ghosts"] = 100;
achievementData["kills_ghost_angry"]["Kill 1000 Angry Ghosts"] = 1000;

achievementData["kills_bat"] = new Array();
achievementData["kills_bat"]["Kill 10 Bats"] = 10;
achievementData["kills_bat"]["Kill 100 Bats"] = 100;
achievementData["kills_bat"]["Kill 1000 Bats"] = 1000;

achievementData["kills_bat_hero"] = new Array();
achievementData["kills_bat_hero"]["Kill 10 Rabid Bats"] = 10;
achievementData["kills_bat_hero"]["Kill 100 Rabid Bats"] = 100;
achievementData["kills_bat_hero"]["Kill 1000 Rabid Bats"] = 1000;

achievementData["kills_liche"] = new Array();
achievementData["kills_liche"]["Kill 10 Liches"] = 10;
achievementData["kills_liche"]["Kill 100 Liches"] = 100;
achievementData["kills_liche"]["Kill 1000 Liches"] = 1000;

achievementData["kills_liche_hero"] = new Array();
achievementData["kills_liche_hero"]["Kill 10 Liche Kings"] = 10;
achievementData["kills_liche_hero"]["Kill 100 Liche Kings"] = 100;
achievementData["kills_liche_hero"]["Kill 1000 Liche Kings"] = 1000;


me.game.player_health = 0;
me.game.level_player_pos_x = null;
me.game.level_player_pos_y = null;
me.game.world_player_pos_x = null;
me.game.world_player_pos_y = null;

var musicOn = true;
var alertMessage_duration = 300;

//Difficulty Related Variables
var currentDifficulty = "Normal";
var currentModifier = 1;
var easyModifier = 0.5;
var normalModifier = 1;
var hardModifier = 5;
var monsterModifier = 10;

// Global Variables
var gravity = 0.40;
var playerMomentum = .2; // how quickly it gets to 0 (lower number takes longer for player to stop)
var default_sfx_volume = 1.0;
var player_immunity_time = 60;
var smallhealthReplenish = 1;
var largehealthReplenish = 5;

var upgrade_health = 0;
var upgrade_damage = 0;
var upgrade_attackrate = 0;
var upgrade_movespeed = 0;
var upgrade_abilitycooldown = 0;
var upgrade_abilitydamage = 0;
				
var shootSpeed = 17; //Variable to change the bullet speed of the player.

var faceLeft = false;
var shootLeft = false;
var shootRight = false;
var walkRight = false;
var walkLeft = false;
var climbUp = false;
var climbDown = false;
var jumpButton = false;
var shootGrenade = false;
var shootButton = false;

var abilityLightning_damage = 50;
// Malyn (Rambo) Variables
// (30fps / shootCooldown) x bullet_damage = DPS
// current dps = 23.5
var malyn_movementVelocity = 3.5;
var malyn_jumpHeight = 10;
var malyn_bullet_damage = 11;
var malyn_health = 30;
var malyn_maxHealth = 50;
var malyn_shootCooldown = 14;
var malyn_gravity = 0.40;
var malyn_grenadeTimer = 120;
var malyn_grenadeInitialDamage = 4;
var malyn_grenadeBurnTimer = 10;
var malyn_grenadeBurnDamage = 0;

// Meena (Mini) Variables
// current dps = 19
var meena_movementVelocity = 4.0;
var meena_jumpHeight = 10;
var meena_bullet_damage = 7;
var meena_health = 20;
var meena_maxHealth = 30;
var meena_shootCooldown = 11;
var meena_gravity = 0.40;
var meena_grenadeTimer = 30;
var meena_grenadeInitialDamage = 0;
var meena_grenadeBurnTimer = 120; // sleep timer for meena - number / 30fps is duration
var meena_grenadeBurnDamage = .08; // desired damage/sec divided by 30fps

	// Global Enemy Variables
var enemy_incapacitateTime = 75;
var enemy_incapacitateTime_short = 29;
var enemy_random_sfxTimer = 60;
var enemy_jumpSpeed = 4.0;
var follower_stunTimer = 60; // stun timer for when they touch the player

	// Zombie Variables
var zombie_Velocity = 2 // random(1.5,2); - i believe this is available in 0.9.5
var zombie_Jump = 10;
var zombie_Health = 10;
var zombie_Gravity = 0.35;
var zombie_Damage = 3;

	// Mummy Variables
var mummy_Velocity = 1.5;
var mummy_Jump = 1;
var mummy_Health = 100;
var mummy_Gravity = 1;
var mummy_Damage = 15;

	// Skeleton Variables
var skeleton_Velocity = 2.0;
var skeleton_Jump = 8;
var skeleton_Health = 40;
var skeleton_Gravity = 0.35;
var skeleton_Damage = 10;

	// Skeleton Ranged Variables
var skeleton_ranged_Velocity = 1.5;
var skeleton_ranged_Jump = 10;
var skeleton_ranged_Health = 80;
var skeleton_ranged_Gravity = 0.35;
var skeleton_ranged_Damage = 20;
var skeleton_ranged_touch_Damage = 10;
var skeleton_ranged_shotTimer = 90; // 30fps: 60 = 2 seconds
var skeleton_ranged_shotCountMax = 3; // jumps every 3 throws

	// Vampire Variables
var vampire_Velocity = 2.5;
var vampire_Jump = 9;
var vampire_Health = 50;
var vampire_Gravity = 0.35;
var vampire_Damage = 15;

	// Ghost Variables
var ghost_Velocity = 2.0;
var ghost_Jump = 0.1;
var ghost_Health = 10;
var ghost_Gravity = 0.35;
var ghost_Damage = 3;
var ghost_lineOfSight = 200;

	// Angry Ghost Variables
var ghost_angry_Velocity = 2.0;
var ghost_angry_Jump = 0.1;
var ghost_angry_Health = 15;
var ghost_angry_Gravity = 0.35;
var ghost_angry_Damage = 5;
var ghost_angry_lineOfSight = 200;

	// Liche Variables
var liche_Velocity = 1.5;
var liche_Jump = 10;
var liche_Health = 80;
var liche_Gravity = 0;
var liche_ranged_Damage = 10;
var liche_touch_Damage = 15;
var liche_appearTimer = 210;
var liche_shotTimer = 270; // 30fps: 60 = 2 seconds
var liche_shootSpeed = 5;
var liche_shotCountMax = -1; // set to negative number to keep the enemy from jumping

	// Bat Variables
var bat_Velocity = 1.0;
//var bat_Jump = 9;
var bat_Health = 20;
var bat_Gravity = 0;
var bat_Damage = 3;
var bat_lineOfSight = 200;

	// Liche Boss Variables
var licheboss_Velocity = 1.5;
var licheboss_Jump = 0;
var licheboss_Health = 500;
var licheboss_Gravity = 0;
var licheboss_ranged_Damage = 20;
var licheboss_touch_Damage = 1000;
var licheboss_shootSpeed = 5;
var licheboss_shotTimer = 75; // 30fps - 60 = 2 seconds
var licheboss_multishot_Threshold = 2; // How often he shoots his multishot