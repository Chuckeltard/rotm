<?php
session_start();

$_SESSION['light_color'] = 'CDE3E8';
$_SESSION['dark_color'] = '363D59';

$light_color = $_SESSION['light_color'];
$dark_color = $_SESSION['dark_color'];
?>

<head>
<meta http-equiv='cache-control' content='no-cache'>
<meta http-equiv='expires' content='0'>
<meta http-equiv='pragma' content='no-cache'>
<meta charset="utf-8">

<link href='http://fonts.googleapis.com/css?family=Overlock' rel='stylesheet' type='text/css'>
<title>Rise of the Monsters!</title>
</head>
<link REL='stylesheet' HREF='../css/index_ie.css' TYPE='text/css'>
<link REL='stylesheet' HREF='../css/school_style.php' TYPE='text/css'>

<script>
/* Browser Detection and OS */
var OSName="Unknown OS";
if (navigator.appVersion.indexOf("Win")!=-1) OSName="Windows";
if (navigator.appVersion.indexOf("Mac")!=-1) OSName="MacOS";
if (navigator.appVersion.indexOf("X11")!=-1) OSName="UNIX";
if (navigator.appVersion.indexOf("Linux")!=-1) OSName="Linux";

function get_browser()
{
	var N=navigator.appName, ua=navigator.userAgent, tem;
	var M=ua.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
	
	if(M && (tem= ua.match(/version\/([\.\d]+)/i))!= null) M[2]= tem[1];
	M=M? [M[1], M[2]]: [N, navigator.appVersion, '-?'];
	return M[0];
}

function get_browser_version()
{
	var N=navigator.appName, ua=navigator.userAgent, tem;
	var M=ua.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
	
	if(M && (tem= ua.match(/version\/([\.\d]+)/i))!= null) M[2]= tem[1];
	M=M? [M[1], M[2]]: [N, navigator.appVersion, '-?'];
	return M[1];
}
	
function user_Logout() {

	if (window.XMLHttpRequest) {
  		xmlhttp=new XMLHttpRequest();
	}
	else {
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange=function() {
		if (xmlhttp.readyState==4 && xmlhttp.status==200) {
			window.location = "../games.php"
		}
	}
	xmlhttp.open("POST","../login/logout.php",true);
	xmlhttp.send();
}

function fullScreen_update(toggle)
{
	var screenUpdate = confirm("Warning! This will reset the game! Make sure you have \n completed a level to save your current progress! \n \n Are you sure you want to continue?")

	if (toggle == "false" || toggle == null || toggle == "")
	{
		if (screenUpdate)
		{
			document.cookie = "fullScreen=true";
			location.reload(true);
		}
	}
	else
	{
		if (screenUpdate)
		{
			document.cookie = "fullScreen=false";
			location.reload(true);
		}
	}
	

}

function get_cookie ( cookie_name ) {
	var results = document.cookie.match ( '(^|;) ?' + cookie_name + '=([^;]*)(;|$)' );
	
	if ( results )
		return ( unescape ( results[2] ) );
	else
		return null;
}

var fullScreen = get_cookie("fullScreen");
var username = get_cookie("nickname");

var browser=get_browser();
var browser_version=get_browser_version();

</script>

<style type="text/css">
body {position: relative: width: 1024px; border: none; font-family: 'Overlock', cursive; font-size: 14px; margin: 0 auto; text-align: center; }

html {overflow-y:scroll; }

a.dark_color_link:link {color: #000; background: none; text-decoration: none; }
a.dark_color_link:active {color: #000; background: none; text-decoration: none; }
a.dark_color_link:visited {color: #000; background: none; text-decoration: none; }
a.dark_color_link:hover {color: #000; background: none; text-decoration: underline; }

a.landing_page_link:link {color: #363D59; background: none; text-decoration: none; }
a.landing_page_link:active {color: #363D59; background: none; text-decoration: none; }
a.landing_page_link:visited {color: #363D59; background: none; text-decoration: none; }
a.landing_page_link:hover {color: #EC008C; background: none; text-decoration: underline; }

a.landing_page_write_review_link:link {color: #363D59; background: url("images/landing_page_write_review.gif"); text-decoration: none; }
a.landing_page_write_review_link:active {color: #363D59; background: none; text-decoration: none; }
a.landing_page_write_review_link:visited {color: #363D59; background: none; text-decoration: none; }
a.landing_page_write_review_link:hover {color: #EC008C; background: url("images/landing_page_write_review_inverted.gif"); }

.school_button_default { position: relative; margin: 0 auto; display: block; width: 90%; color: #<?php echo $dark_color; ?>; background-color: #<?php echo $light_color; ?>; padding: 3px 0px 3px 0px; text-align: center; box-shadow: 1px 1px 0 0 #000000, 2px 2px 0 0 #000000, 3px 3px 0 0 #000000, 4px 4px 0 0 #000000, 5px 5px 5px 0 #000000; -moz-border-radius: 30px; border-radius: 20px; -webkit-transition: background-color 0.2s linear; transition: background-color 0.2s linear; text-decoration: none; }
.school_button_default:active { box-shadow: 1px 1px 5px 0 #000000; -webkit-box-shadow: 1px 1px 5px 0 #000000; -moz-box-shadow: 1px 1px 5px 0 #000000; top: 4px; left: 4px; }
.school_button_default:hover { background-color: #<?php echo $dark_color; ?>; color: #<?php echo $light_color; ?>; }

</style>

<div id="header">
<a href="../index.php"><div id="logo"></div></a>

<div style="position: relative; float: left; left: 0%; text-align: center; width: 52%; height: 65%; ">
<div style="height: 4px;"></div>
<div id="premium_ad_display" style="height: 65%; width: 80%; margin: 0 auto;">
	<table style="width: 100%; font-size: 15px; border-collapse: collapse; background-color: #E6E8FA;">
	<td style="height: 100%; border: solid 1px #D0D0D0; text-align: center;">
		Ever had a MONSTER of an experience renting an apartment and want to write a review? 
		<br><br>
		Are you looking for a new apartment or roommate?
		<br><br>
		Check out our <b>FREE</b> Apartment and Roommate rental and review site by clicking on our logo!
	</td>
	</table>

</div>
<div style="height: 21px;"></div>
<div style="font-size: 18px; color: #A00000;">
</div>
</div>
<?php

if(isset($_SESSION['email'])) {
	?>
	<div id="login">
	<table style="text-align: right; width: 100%;">
	<tr>
	<td><a href="../myaccount.php" class="school_button_default" style="float: right; font-size: 12px;">Welcome <?php echo $_SESSION['nickname']; ?></a></td>
	<tr>
	<td><a href="javascript:user_Logout();" class="school_button_default" style="float: right; width: 50px; font-size: 12px;">Logout?</a></td>
	</table>
	<div id="header_message"></div>
	</div>
	<?php
}
		
else {
	?>
	
	<div id="login">
		<div style="text-align: center;">
			<a class="school_button_default" style="font-size: 14px;" href="../games.php">Click here to log in or register</a>
		</div>
	<div id="header_message"></div>
	</div>
	
	<?php
}

?>
<div class="page_break">
&nbsp;
</div>
<div class="page_break">
&nbsp;
</div>
<div class="page_break">
&nbsp;
</div>

</div>
<!-- ================ BODY START ======================= -->
<div id="body">

	<div id="info">
		<div id="fps">
			<!--<span id="framecounter">(0/0 fps)</span>-->
		</div>
	</div>
	<div style="float: right; width: 2%;">&nbsp;</div>
	<div id="message_container" style="float: right; width: 220px; text-align: center; font-size: 15px;">
		<div id="message_right"></div>
		<div>
		<?php if (!isset($_SESSION['email'])) { echo '<font color="red"><b>Warning!</b></font> You must be logged in to save your stats and game progression! Please click the link at the top of this page to log in or register now!'; } ?>
		<br><br>
		<b>Contact Us:</b> If you have any feedback, questions or you found a bug that annoys you, feel free to let us know at <a href="mailto:rotm@rentermonsters.com?Subject=RotM%20Feedback">rotm@rentermonsters.com</a>
		</div>	
	</div>

	<script>
	if (fullScreen == 'true')
	{
		document.getElementById("message_container").innerHTML="";
	}
	else if (OSName == "Windows" && browser == "Safari")
	{
		document.getElementById("message_right").innerHTML="You may experience game related problems using <font color='red'><b>Safari on Windows</b></font>. If you do encounter an error, please try using a different browser. <br><br> We recommend Google Chrome. <br> <a href='http://www.google.com/chrome'>Chrome Download</a><br><br><br>";
	}
	else if (OSName == "Windows" && browser == "MSIE" && browser_version == "9.0")
	{
		document.getElementById("message_right").innerHTML="You may experience game related problems using <font color='red'><b>Internet Explorer 9.0</b></font>. If you do encounter an error, please try using a different browser. <br><br> We recommend Google Chrome.<br><a href='http://www.google.com/chrome'>Chrome Download</a><br><br><br>";
	}
	</script>
	
	<div id="jsapp" style="float: left;"></div>
	<script src="javascript/melonJS-0.9.8.js"></script>
	<!-- <script src="javascript/melonJS-0.9.7-min.js"></script> -->
	<script src="javascript/tunedata.js"></script>
    <script src="javascript/main.js"></script>
	<script src="javascript/resources.js"></script>
	<script src="javascript/HUD.js"></script>
    <script src="javascript/screens/debug_levels.js"></script>
	<script src="javascript/debugPanel.js"></script>
    <script src="javascript/screens/loading_level_screen.js"></script>
	<script src="javascript/screens/loading_screen.js"></script>
	<script src="javascript/screens/TitleScreen.js"></script>
	<script src="javascript/screens/MainMenu.js"></script>
    <script src="javascript/screens/story_screen.js"></script>
    <script src="javascript/screens/character_select.js"></script>
    <script src="javascript/screens/options.js"></script>
    <script src="javascript/screens/credits.js"></script>
    <script src="javascript/screens/menu_exitscreen.js"></script>
	<script src="javascript/entities/enemy_simple_ai.js"></script>
	<script src="javascript/entities/enemy.js"></script>
	<script src="javascript/entities/boss_manager.js"></script>
	<script src="javascript/entities/enemy_boss.js"></script>
	<script src="javascript/entities/player.js"></script>
	<script src="javascript/touchControls.js"></script>
	<script src="javascript/entities/bullet.js"></script>
	<script src="javascript/entities/SpawnerEntity.js"></script>
    <script src="javascript/entities/GrenadeEntity.js"></script>
    <script src="javascript/abilities/lightning.js"></script>
    <script src="javascript/objects/ambient.js"></script>
    <script src="javascript/objects/level_clearObject.js"></script>
    <script src="javascript/objects/level_saveObject.js"></script>
	<script src="javascript/objects/buttons.js"></script>
    <script src="javascript/objects/tutorials.js"></script>
	<script src="javascript/objects/collectibles.js"></script>
    <script src="javascript/objects/platforms.js"></script>
    <script src="javascript/objects/teleporter.js"></script>
    <script src="javascript/behaviors/movements.js"></script>
    <script src="javascript/behaviors/util.js"></script>
	
	<div class="page_break">
		&nbsp;
	</div>

<div style="width: 98%; margin: 0 auto; font-size: 18px;">

	<!-- Add fullscreen button here -->
	<div style="float: left;">
	<a href="javascript:fullScreen_update(fullScreen);" class="school_button_default" style="float: left; width: 150px; font-size: 15px;">Full Screen Toggle</a>
	</div>
	
	<div style="clear: both;">&nbsp;</div>

	<h1>Heroes</h1>

	<h3><a name="h.grjkw1z58t6k"></a>Malyn</h3>
	<p>You don’t want to mess with Malyn! Our little warrior can take on anything those guys can dish out! She chews through her enemies with her little chaingun “Betsy” at the ready. The number of rounds “Betsy” puts out can take down even the toughest of the undead! Malyn has a soft spot for her grenades, though. When they least expect it the worst of them go BOOM!</p>
	<p><i>Meaning: Little Warrior</i></p>
	<br>
<!--
	<h3><a name="h.8bcp0ik4i22"></a>Meena</h3>
	<p>Meena always feels like she’s in Malyn’s shadow! She may be more petite but she can be just as fierce! Her grenades give sweet dreams to her enemies until she uses “Drako” to tear them up! She may be small but you should never underestimate her!</p>
	<p><i>Meaning: smooth, fine, small, Irish/Gaelic</i></p>
-->
	<br>
	<h1><a name="h.7kj7iygm4cw"></a>Enemies</h1>

	<h3><a name="h.o32sh7fzeecf"></a>Aiechunao<span style="font-size: 12px;"><sup>TM</sup></span></h3>
	<p>Aiechunao would LOVE to have you for lunch sometime! Seriously, is tomorrow good for you? Because their calendars are free all week. They will do anything they can to get together with you. Run, jump, climb; no obstacle is too tough for these guys! Be aware though, waiters don’t like the big groups that show up as they usually ignore the included tip.</p>
	<p><i>Meaning: I eat you now!</i></p>

	<br>
	<h3><a name="h.mewgnnfjrorr"></a>Féar Gortach</h3>
	<p>This is one hungry mummy! Unlike your Eqyptian mummies these guys are not satisfied with just your soul. They want all the lovely meaty parts, too! What they don’t have in speed they make up for in relentlessness. They just keep coming and they’re stong enough to get at all your inside bits. C’mon, what’s a few ribs between friends?</p>
	<p><i>Meaning: The expression "an féar gortach" (the hungry grass) is an Irish idiom connoting possession of a prodigious appetite.</i></p>

	<br>
	<h3><a name="h.oqofgzl0xtar"></a>Draugr</h3>
	<p>They didn’t make it easy on you did they? This guy is just ridiculously huge. He may look skinny, just a pile of bones really, but don’t underestimate how strong those bones can be. This was one viking revenant that drank his milk like his mom told him to. Oh, yeah, and about that sword? I’d steer clear of it if I were you!</p>
	<p><i>Meaning: A Scandanavian undead creature from Norse Mythology, Daugr are dead Vikings that have come back to life. These creatures attack and feed on the living and are capable of superhuman strength, increasing their physical size and carry the unmistakable stench of decay. It is said that the only kind of person capable of dispatching these creatures is a hero, one possessed of great courage and moral fiber. </i></p>

	<br>
	<h3><a name="h.3n65ph11ocr"></a>BlutUngetüm</h3>
	<p>Nothing worse than an undead blood sucker raised on blutsausage! He grew up with a taste for it and now wants it fresh from YOU! You’ll have to be quick and have plenty of reserve strength to survive this match up! Blood doping won’t help you here, it just makes you more tasty!</p>
	<p><i>Meaning: German - Blood Monster</i></p>

	<br>
	<h3><a name="h.um0fzp5l15k8"></a>Mære</h3>
	<p>Man, these guys are annoying. They don’t do much except get in your way while you are trying to deal with REAL problems. Where’s a bugzapper when you need one?</p>
	<p><i>Meaning: A mare or nightmare (Old English: mære) is an evil spirit or goblin in Germanic folklore which rides on people's chests while they sleep, bringing on bad dreams (or "nightmares").</i></p>

<!--
	<br>
	<h3><a name="h.ya1kirhd4948"></a>Gjenganger</h3>
	<p>Boy, you would think that being able to live forever would make someone happy. Not so with these guys! They are the original grumpy pants! You can beat them pretty easily if you can get to them. Getting through without becoming undead your self will be quite a trick.</p>
	<p><i>Meaning: A form of Scandanavian revenant, these undead beings are typically depicted as animate corpses that have come back from the dead to spread disease and attack the living.</i></p>
-->
	<br>
	<h3><a name="h.21py97nbhze3"></a>Gashadokuro</h3>
	<p>Geez, I thought the Gjenganger was in a bad mood. He’s a barrel of rainbows, kittens, and unicorns compared to this guy! This one is no pushover and packs a whallop! Same bad attitude but bigger, stronger and still wants you to be undead. (Don’t ask what he does with them I don’t want to know, either!) I wish you luck. ...Hey, can I have your stuff when you don’t come back?</p>
	<p><i>Meaning: Gashadokuro are a Japanese undead creature, a skeleton fifteen times larger than any normal hero. Gashadokuro are created by the assembled bones of those who have starved to death. The only way to avoid death is to flee before the Gashadokuro has a chance to grab you.</i></p>

	</div>
	<div class="page_break">
		&nbsp;
	</div>
</div>
