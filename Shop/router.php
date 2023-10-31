<?php

session_start();
$url = $_SERVER['REQUEST_URI'];
$url = explode('/', $url);
require_once("php/db.php");
require_once("php/classes/User.php");

if (file_exists('pages/'.$url[1].'.php')) {
    $content = file_get_contents('pages/'.$url[1].'.php');
} else if (!$url[1]) {
    $content = file_get_contents("pages/index.php");
} else if ($url[1] == "auth") {
    if (count($_SESSION) != 0) {
        header('Location: ' . ((!empty($_SERVER['HTTPS'])) ? 'https' : 'http') . '://' . $_SERVER['HTTP_HOST'] . '/users/profile');
        exit( );
    } else {
        $content = file_get_contents("pages/login.html");
    }
} else if ($url[1] == "register") {
    $content = file_get_contents("pages/register.html");
} else if ($url[1] == "users") {
    require_once("pages/users/index.php");
} else if ($url[1] == "addUser") {
    echo User::addUser($_POST["name"], $_POST["lastname"], $_POST["email"], $_POST["pass"]);
} else if ($url[1] == "authUser") {
    echo User::authUser($_POST["email"], $_POST["pass"]);
}

if (!empty($content))
require_once("template.php");
 
?>

