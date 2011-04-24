<?php

$uri = trim($_SERVER['REQUEST_URI'], '/');

switch(substr($uri, 0, !strpos($uri, '/') ? strlen($uri) : strpos($uri, '/'))) {
  case 'find':
    $module = 'find';
    break;
  default:
    $module = 'map';
}

include_once('../layout/header.php');

include_once('../layout/panels.php');
//include_once('../modules/'.$module.'.php');

include_once('../layout/footer.php');