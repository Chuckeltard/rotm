<?php
Header("content-type: application/x-javascript");

include '../../mysql/mysql_config.php';
include '../../mysql/mysql_opendb.php';

$username = $_REQUEST['username'];

if ($username == null || $username == "" || $username == "null")
{
	exit;
}

$data_array = array();

$result = mysql_query("SELECT * FROM rotm_player_savedata WHERE username='$username'") or die(mysql_error());
$numrows = mysql_num_rows($result);
$row = mysql_fetch_assoc($result);

if ($numrows == 0)
{
	$result = mysql_query("SELECT * FROM users WHERE nickname='$username'") or die(mysql_error());
	$row = mysql_fetch_assoc($result);

	$total_reviews = $row['total_reviews'];
	$keys_for_reviews = $total_reviews * 100;
	
	$new_user_input = "INSERT INTO rotm_player_savedata (username, key_pickup, key_currency) VALUES ('$username', '$keys_for_reviews', '$keys_for_reviews')";
	mysql_query($new_user_input) or die(mysql_error());
	
	$result = mysql_query("SELECT * FROM rotm_player_savedata WHERE username='$username'") or die(mysql_error());
	$numrows = mysql_num_rows($result);
	$row = mysql_fetch_assoc($result);
}

foreach($row as $name => $value) {
	$data_key[] = $name;
	$data_value[] = $value;
}

array_shift($data_key);
array_shift($data_value);

echo implode(",",$data_key);
echo "****";
echo implode(",",$data_value);

//print_r($row);
/*
$data_array[] = $row['kills'];
$data_array[] = $row['deaths'];

print_r($data_array);
*/
//$kills = $row['kills'];
//$deaths = $row['deaths'];
	
	//$tunedata = ''.$type.' = '.$min.'';

/*
echo "kills,deaths";
echo "****";
echo $kills.",".$deaths;
*/
include '../../mysql/mysql_closedb.php';
?>