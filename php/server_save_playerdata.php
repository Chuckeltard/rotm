<?php
include '../../mysql/mysql_config.php';
include '../../mysql/mysql_opendb.php';

$username = $_REQUEST['username'];
$data = $_REQUEST['data'];

$data = json_decode($data,true);

$mysql_entry = null;

foreach ($data AS $key => $value)
{
	if (is_numeric($value))
	{
		$mysql_entry .= $key . " = " . $value;	
	}
	else
	{
		$mysql_entry .= ''.$key.' = "'.$value.'"';	
	}

	$mysql_entry .= ', ';
}

$mysql_entry = substr_replace($mysql_entry,"",-2);

mysql_query("UPDATE rotm_player_savedata SET $mysql_entry WHERE username='$username'") or die (mysql_error());

echo 'success';

include '../../mysql/mysql_closedb.php';
?>