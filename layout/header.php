<!doctype html>
<html>
  <head>
    <title>UWE Map</title>

    <link rel="apple-touch-icon" href="/images/apple-touch-icon.png"/>
    <link rel="apple-touch-startup-image" href="/images/startup.png">

    <link rel="stylesheet" href="/css/hicTech/MobileAppStyle.css"/>
    <style type="text/css" media="all">@import "themes/apple/theme.css";</style>

    <link rel="stylesheet" href="/css/main.css"/>

    <script src="/js/jquery/jquery-1.4.4-hicVersion-min.js"></script>
    <script src="js/plugins/canvasLoader/canvasLoader.js"></script> 
    <script src="/js/plugins/livequery/jquery.livequery-1.0.3.js"></script>
    
    <script src="/js/hicTech/appManager.js"></script>

    <script src="http://maps.google.com/maps/api/js?sensor=true"></script>
    
    <script src="/js/jquery/jquery.jqote2.min.js"></script>

    <script src="/js/geo.js"></script>
    <script src="/js/main.js"></script>

    <?php if (strstr($_SERVER['HTTP_HOST'], 'i7.stevelacey.net')) : ?>
      <script src="/js/geo-fake.js"></script>
      <?php if(!strstr($_SERVER['HTTP_USER_AGENT'], 'iPhone Simulator')) : ?>
        <script src="/js/live.js"></script>
      <?php endif ?>
    <?php endif ?>
  </head>
  <body data-appml-onload="gladiatorsReady()">
    <appml class="<?php echo $module ?>">
      <loading></loading>
      <content>