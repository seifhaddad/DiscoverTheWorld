/* global google:true */
/* jshint camaelcase: false */
(function(){
  'use strict';

  $(document).ready(function(){
    $('#toggle_button').click(geocode);

  });

  var map,
  infowindow = new google.maps.InfoWindow(),
  mapCity,
  lat,
  lng;
  console.log('LAT & LNG HERE---->', lat, lng);

  var map;

  function initialize(lat, lng) {
    if(lat && lng){
      mapCity = new google.maps.LatLng(lat, lng);
    }else{
      mapCity = new google.maps.LatLng(31.956648, 35.949275)
    }

    // };

    map = new google.maps.Map(document.getElementById('map'), {
      center: mapCity,
      zoom: 8,
    });

  var request = {
    location: mapCity,
    radius: 150000,
    query: 'hotels'
  };
  infowindow = new google.maps.InfoWindow();
  var service = new google.maps.places.PlacesService(map);
  service.textSearch(request, callback);
}

  function callback(results, status){
    if (status === google.maps.places.PlacesServiceStatus.OK){
      for (var i = 0; i < results.length; i++){
        createMarker(results[i]);
      }
    }
  }

  function createMarker(place){
    var placeLoc = place.geometry.location,
    marker = new google.maps.Marker({
      icon: '/img/marker_h5.png',
      map: map,
      animation: google.maps.Animation.DROP,
      position: placeLoc
    });
    google.maps.event.addListener(marker, 'click', function(){
      infowindow.setContent(place.name);
      infowindow.open(map, this);
    });
  }


  var weatherLayer =new google.maps.weather.WeatherLayer({
    temperatureUnits: google.maps.weather.TemperatureUnit.FAHRENHEIT
  }),
  cloudLayer = new google.maps.weather.CloudLayer();

  $('#toggle_weather').click(function(){
    if(weatherLayer.getMap() || cloudLayer.getMap()){
      weatherLayer.setMap(null);
      cloudLayer.setMap(null);
    }else{
      weatherLayer.setMap(map);
      cloudLayer.setMap(map);
    }
  });

  var trafficLayer = new google.maps.TrafficLayer();
  $('#toggle_traffic').click(function(){
    if(trafficLayer.getMap()){
      trafficLayer.setMap(null);
    }else{
      trafficLayer.setMap(map);
    }
  });

  function geocode(event){
    var geocoder = new google.maps.Geocoder(),
    name = $('#name').val();

    geocoder.geocode({address:name}, function(results, status){
      console.log('---------->-------->--->', results);
      var cityName = results[0].formatted_address,
      lat  = results[0].geometry.location.lat(),
      lng  = results[0].geometry.location.lng();

      $('#name').val(cityName);
      $('#lat').val(lat);
      $('#lng').val(lng);

      centerCity(lat, lng);
      initialize(lat, lng);
    });

    event.preventDefault();
  }

  function centerCity(lat, lng){
    map.setCenter({lat:lat, lng:lng});
  }

  google.maps.event.addDomListener(window, 'load', initialize);

})();

// Client ID:
// 16220685986-rfilo8rid66o47t6k0ta5svekpok964p.apps.googleusercontent.com
// Email address:
// 16220685986-rfilo8rid66o47t6k0ta5svekpok964p@developer.gserviceaccount.com
// Client secret:
// UYeUtponVM9-WxXtD8D57KKD
// Redirect URIs:	none
// JavaScript origins:	none
// api:Key for server apps"AIzaSyDGUeJAH51gQaGQ_PYaoBp469xwf15PDQg"
// api:Key for browser apps"AIzaSyDCHEBR_hwdr6Neva7oHXfGaNaJm3Mbae0"
// ip's: "68.53.133.130"
