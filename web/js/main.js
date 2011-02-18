$('.map').live("pagecreate", function() {
  // uwe
  var lat = 51.50169,
      lng = -2.545738;

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

  var map = new google.maps.Map($('.map .canvas').get(0), {
    zoom: 17,
    center: new google.maps.LatLng(lat, lng),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });


  var paths = {
    q: [
      new google.maps.LatLng(51.50172,-2.548866),
      new google.maps.LatLng(51.501764,-2.548498),
      new google.maps.LatLng(51.501485,-2.548415),
      new google.maps.LatLng(51.501465,-2.548584),
      new google.maps.LatLng(51.501433,-2.548576),
      new google.maps.LatLng(51.501468,-2.548233),
      new google.maps.LatLng(51.500921,-2.548082),
      new google.maps.LatLng(51.500881,-2.548442),
      new google.maps.LatLng(51.5013,-2.548565),
      new google.maps.LatLng(51.501295,-2.548624),
      new google.maps.LatLng(51.501221,-2.548608),
      new google.maps.LatLng(51.5012,-2.548799),
      new google.maps.LatLng(51.501402,-2.548858),
      new google.maps.LatLng(51.501408,-2.548772)
    ]
  };

  var polygon = new google.maps.Polygon({
    paths: paths.q,
    strokeColor: "#FF0000",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#FF0000",
    fillOpacity: 0.35
  });

  polygon.setMap(map);
});