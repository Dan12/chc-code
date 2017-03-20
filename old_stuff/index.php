<html>
<head>
	<title>level1</title>
    <link rel='stylesheet' href='style.css' type='text/css'>
</head>
<body>

<?php
$name1 = ['a','b'];
// print sha1($name1);

$myfile = fopen("shattered-1.pdf", "r") or die("Unable to open file!");
print sha1(file_get_contents("a.pdf"));
print '<br>';
print sha1(file_get_contents("b.pdf"));


$something = NULL;
print ('password123' == (string)$something) ? 'true' : 'false';
//
// file_put_contents('shattered-1.txt', file_get_contents("shattered-1.pdf"));
// file_put_contents('shattered-2.txt', file_get_contents("shattered-2.pdf"));

if (isset($_GET['name']) and isset($_GET['password'])) {
    $name = (string)$_GET['name'];
    $password = (string)$_GET['password'];

    if ($name == $password) {
        print 'Your password can not be your name.';
    } else if (sha1($name) === sha1($password)) {
      die('Flag: ');
    } else {
        print '<p class="alert">Invalid password.</p>';
    }
}
?>

<section class="login">
	<div class="title">
		<a href="./index.txt">Level 1</a>
	</div>

	<form method="get">
		<input type="text" required name="name" placeholder="Name"/><br/>
		<input type="text" required name="password" placeholder="Password" /><br/>
		<input type="submit"/>
	</form>
	</form>
</section>
</body>
</html>
