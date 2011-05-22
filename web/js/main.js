var map;
var current_position_marker;

var uwe = new google.maps.LatLng(51.50169, -2.545738);
var user;

var infowindow;

function appMLReady() {
  map = new google.maps.Map($('#map .canvas').get(0), {
    zoom: 17,
    center: uwe,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });

  if(window.location.href.strstr('i7')) {
    fakePosition();
  } else {
    getPosition();
  }

  plot();
}

// AddToHome
if ('standalone' in navigator && !navigator.standalone && (/iphone|ipod|ipad/gi).test(navigator.platform) && (/Safari/i).test(navigator.appVersion)) {
  var addToHomeConfig = {
    animationIn: 'bubble',
    lifespan: 10000,
    touchIcon: true
  };

  document.write('<link rel="stylesheet" href="/js/plugins/add2home/add2home.css">');
  document.write('<script src="/js/plugins/add2home/add2home.js" charset="utf-8"></script>');
}

function getPosition() {
  //determine if the handset has client side geo location capabilities
  if(geo_position_js.init()){
    geo_position_js.getCurrentPosition(geoSuccess);
    setTimeout('getPosition()', 2000);
  }
}

// redirect function for successful location
function geoSuccess(pos) {
  user = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);

  if(current_position_marker == undefined) {
    // Plot
    current_position_marker = new google.maps.Marker({
      title: "You are here",
      position: user,
      map: map,
      icon: new google.maps.MarkerImage(
        "/images/blue_dot_circle.png",
        new google.maps.Size(38, 38),
        new google.maps.Point(0, 0),
        new google.maps.Point(19, 19)
      )
    });
    
    // Center
    var bounds = new google.maps.LatLngBounds();

    bounds.extend(user);
    bounds.extend(uwe);

    map.fitBounds(bounds);
  } else {
    current_position_marker.setPosition(user);
  }
}

function plot() {
  $.each(['accommodation', 'blocks', 'cafes', 'car-parks', 'libraries', 'sport', 'uwe'], function(i, file) {
    $.ajax({
      url: 'data/' + file + '.json',
      dataType: 'json',
      success: function(data) {
        $.each(data.poi, function(key, poi) {
          paths = [];

          $.each(poi.polygon, function(i, point) {
            paths[i] = new google.maps.LatLng(point.lat, point.lng);
          });

          var polygon = new google.maps.Polygon({
            paths: paths,
            strokeColor: data.color,
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: data.color,
            fillOpacity: 0.35
          });

          google.maps.event.addListener(polygon, 'mouseup', function() {
            if(infowindow) {
              infowindow.close();
            }

            infowindow = new google.maps.InfoWindow({
              content: poi.title + '<br/>' + poi.description,
              position: polygon.getBounds().getCenter()
            });

            infowindow.open(map);
          });

          polygon.setMap(map);
        });
      }
    });
  });
}

function fakePosition() {
  $.ajax({
    url: 'data/blocks.json',
    dataType: 'json',
    success: function(data) {
      locations = new Array();
      
      $.each(data.poi, function(key, poi) {
        $.each(poi.polygon, function(i, point) {
          locations.push({coords:{latitude: point.lat, longitude: point.lng}, duration: 5000});
        });
      });

      locations.shuffle();

      geo_position_js_simulator.init(locations);

      getPosition();
    }
  });
}

Array.prototype.shuffle = function() {
 	var len = this.length;
	var i = len;
	 while (i--) {
	 	var p = parseInt(Math.random()*len);
		var t = this[i];
  	this[i] = this[p];
  	this[p] = t;
 	}
};

String.prototype.strstr = function(needle) {
	var f = this.indexOf(needle)+1;
	return (f===0) ? 0 :1;
};

google.maps.Polygon.prototype.getBounds = function(latLng) {
  var bounds = new google.maps.LatLngBounds();
  var paths = this.getPaths();
  var path;

  for (var p = 0; p < paths.getLength(); p++) {
    path = paths.getAt(p);
    for (var i = 0; i < path.getLength(); i++) {
      bounds.extend(path.getAt(i));
    }
  }

  return bounds;
}