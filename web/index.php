<?php

$uri = trim($_SERVER['REQUEST_URI'], '/');

switch(substr($uri, 0, !strpos($uri, '/') ? strlen($uri) : strpos($uri, '/'))) {
  case 'find':
    // do data stuff
    break;
  default:
    include_once('../layout/header.php');

    include_once('../modules/map.php');
    include_once('../modules/find.php');

    include_once('../layout/footer.php');
}