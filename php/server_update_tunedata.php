<?php
Header("content-type: application/x-javascript");

include '../mysql/mysql_config.php';
include '../mysql/mysql_opendb.php';

$result = mysql_query("SELECT * FROM riseofthemonsters_tunedata") or die(mysql_error());
$numrows = mysql_num_rows($result);

while ($row = mysql_fetch_array($result))
{
	$type = $row['type'];
	$min = $row['min'];
	$max = $row['max'];
	
	$tunedata = ''.$type.' = '.$min.'';
	?>

	var <?php echo $tunedata?>

	<?php
}

include '../mysql/mysql_closedb.php';
?>