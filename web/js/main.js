function appMLReady() {
  // uwe
  var lat = 51.50169,
      lng = -2.545738;

  var infowindow;

  // try to get GPS coords
  if( navigator.geolocation ) {

    // redirect function for successful location
    function gpsSuccess(pos){
      if( pos.coords ){
        lat = pos.coords.latitude;
        lng = pos.coords.longitude;
      } else {
        lat = pos.latitude;
        lng = pos.longitude;
      }
    }

    function gpsFail(){
      // geo-location is supported, but we failed to get your coordinates. Workaround here perhaps?
    }

    navigator.geolocation.getCurrentPosition(gpsSuccess, gpsFail, {enableHighAccuracy:true, maximumAge: 300000});
  }

  var map = new google.maps.Map($('#map .canvas').get(0), {
    zoom: 17,
    center: new google.maps.LatLng(lat, lng),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });

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

          google.maps.event.addListener(polygon, 'click', function() {
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

if (!google.maps.Polygon.prototype.getBounds) {
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
}