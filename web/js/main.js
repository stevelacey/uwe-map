var map;

var current_infowindow;
var current_position_marker;

var uwe = new google.maps.LatLng(51.50169, -2.545738);
var user;

var markers = [];

function gladiatorsReady() {
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

  plotBuildings();
  plotFacilities();
    
  google.maps.event.addListener(map, 'zoom_changed', function() {
    $.each(markers, function(i, marker) {
      marker.icon.scaledSize = new google.maps.Size(marker.icon.size.width * markerScale(), marker.icon.size.height * markerScale());
      marker.shadow.scaledSize = new google.maps.Size(marker.shadow.size.width * markerScale(), marker.shadow.size.height * markerScale());
    });
  });
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

function plotBuildings() {
  $.each(['accommodation', 'blocks', 'cafes', 'car-parks', 'libraries', 'sport', 'uwe'], function(i, file) {
    $.ajax({
      url: 'data/' + file + '.json',
      dataType: 'json',
      success: function(data) {
        $.each(data.poi, function(key, poi) {
          var paths = [];

          $.each(poi.polygon, function(i, point) {
            paths[i] = new google.maps.LatLng(point.lat, point.lng);
          });
          
          var color = poi.color ? poi.color : data.color;
          var polygon = plotPolygon(paths, color);
          var polygon_center = polygon.getBounds().getCenter();
          
          poi.description = poi.description ? poi.description : data.description;
          poi.icon = poi.icon ? poi.icon : data.icon;
          
          var infowindow = function() {
            loadInfoWindow(poi, polygon_center);
          };

          if(poi.icon) {
            var marker = plotMarker(poi.title, polygon_center, data.icons + poi.icon);
            google.maps.event.addListener(marker, 'mouseup', infowindow);
            markers[markers.length] = marker;
          }
          
          google.maps.event.addListener(polygon, 'mouseup', infowindow);

          polygon.setMap(map);
        });
      }
    });
  });
}

function plotFacilities() {
  $.ajax({
    url: 'data/facilities.json',
    dataType: 'json',
    success: function(data) {
      $.each(data.categories, function(key, category) {
        $.each(category.poi, function(key, poi) {
          var position = new google.maps.LatLng(poi.position.lat, poi.position.lng);

          poi.slug = poi.slug ? poi.slug : category.slug;

          var marker = plotMarker(poi.title, position, "/images/markers/" + poi.slug);

          google.maps.event.addListener(marker, 'mouseup', function() {
            loadInfoWindow(poi, position);
          });

          markers[markers.length] = marker;
        });
      });
    }
  });
}

function plotMarker(title, position, image) {
  return new google.maps.Marker({
    title: title,
    position: position,
    map: map,
    icon: new google.maps.MarkerImage(
      image + ".png",
      new google.maps.Size(39, 49),
      new google.maps.Point(0, 0),
      new google.maps.Point(19, 24),
      new google.maps.Size(39 * markerScale(), 49 * markerScale())
    ),
    shadow: new google.maps.MarkerImage(
      "/images/markers/shadow.png",
      new google.maps.Size(64, 49),
      new google.maps.Point(0, 0),
      new google.maps.Point(19, 24)
    )
  });
}

function plotPolygon(paths, color) {
  return new google.maps.Polygon({
    paths: paths,
    strokeColor: color,
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: color,
    fillOpacity: 0.35
  });
}

function loadInfoWindow(poi, position) {
  if(current_infowindow) {
    current_infowindow.close();
  }
  
  current_infowindow = new google.maps.InfoWindow({
    content: $('.infowindow-template').jqote(poi),
    position: position
  });

  current_infowindow.open(map);
}

function markerScale() {
  return Math.min(map.getZoom() / 30, 1);
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