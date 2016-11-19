$(window).load(function() {
  loadScript();
});

var map;

// var chicago = {lat: 41.85, lng: -87.65};


// function CenterControl(controlDiv, map) {
//
//   // Set CSS for the control border.
//   var controlUI = document.createElement('div');
//   controlUI.style.backgroundColor = '#fff';
//   controlUI.style.border = '2px solid #fff';
//   controlUI.style.borderRadius = '3px';
//   controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
//   controlUI.style.cursor = 'pointer';
//   controlUI.style.marginBottom = '22px';
//   controlUI.style.textAlign = 'center';
//   controlUI.title = 'Click to recenter the map';
//   controlDiv.appendChild(controlUI);
//
//   // Set CSS for the control interior.
//   var controlText = document.createElement('div');
//   controlText.style.color = 'rgb(25,25,25)';
//   controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
//   controlText.style.fontSize = '16px';
//   controlText.style.lineHeight = '38px';
//   controlText.style.paddingLeft = '5px';
//   controlText.style.paddingRight = '5px';
//   controlText.innerHTML = 'Center Map';
//   controlUI.appendChild(controlText);
//
//   // Setup the click event listeners: simply set the map to Chicago.
//   controlUI.addEventListener('click', function() {
//     map.setCenter(chicago);
//   });
//
// }


function initialize() {

  var mapOptions = {
    center: new google.maps.LatLng(49.2827291, -123.12073750000002),
    zoom: 14,
    mapTypeId: google.maps.MapTypeId.NORMAL,
    mapTypeControl: false,
    panControl: true,
    scaleControl: false,
    streetViewControl: false,
    overviewMapControl: true
  };
  // initializing map
  map = new google.maps.Map(document.getElementById("map-canvas"),mapOptions);

  //test custom button
  // var centerControlDiv = document.createElement('div');
  // var centerControl = new CenterControl(centerControlDiv, map);
  //
  // centerControlDiv.index = 1;
  // map.controls[google.maps.ControlPosition.TOP_CENTER].push(centerControlDiv);

  // geocoding
  var geocoding  = new google.maps.Geocoder();
  $("#submit_button_geocoding").click(function(){
    codeAddress(geocoding);
  });
  $("#submit_button_reverse").click(function(){
    codeLatLng(geocoding);
  });

  //find current location
  // var infoWindow = new google.maps.InfoWindow({map: map});

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      // var marker = new google.maps.Marker({
      //   position: pos,
      //   map: map,
      //   title: 'You are here!',
      //   animation: google.maps.Animation.DROP
      // });
      var image = new google.maps.MarkerImage(
							'http://plebeosaur.us/etc/map/bluedot_retina.png',
							null, // size
							null, // origin
							new google.maps.Point( 8, 8 ), // anchor (move to center of marker)
							new google.maps.Size( 17, 17 ) // scaled size (required for Retina display icon)
			        );
      var myMarker = new google.maps.Marker({
        flat: true,
        icon: image,
        map: map,
        optimized: false,
        position: pos,
        title: 'I might be here',
        visible: true
      });
      map.setCenter(pos);
    }, function() {
      handleLocationError(true, myMarker, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, myMarker, map.getCenter());
  }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
}


var info;
function codeLatLng(geocoding){

  var input = $('#search_box_reverse').val();
  console.log(input);

  var latlngbounds = new google.maps.LatLngBounds();
  var listener;
  var regex = /([0-9])+\.([0-9])+\,([0-9])+\.([0-9])+/g;
  if(regex.test(input)) {
  var latLngStr = input.split(",",2);
  var lat = parseFloat(latLngStr[0]);
  var lng = parseFloat(latLngStr[1]);
  var latLng = new google.maps.LatLng(lat, lng);
  geocoding.geocode({'latLng': latLng}, function(results, status) {
     if (status == google.maps.GeocoderStatus.OK){
       if(results.length > 0){
         //map.setZoom(11);
         var marker;
         map.setCenter(results[1].geometry.location);
         var i;
        info = createInfoWindow("");
         for(i in results){
           latlngbounds.extend(results[i].geometry.location);
             marker = new google.maps.Marker({
             map: map,
             position: results[i].geometry.location
           });

          google.maps.event.addListener(marker, 'click', (function(marker,i) {
            return function() {
            info.setContent(results[i].formatted_address);
            info.open(map,marker);
            }
          })(marker,i));
        }

         map.fitBounds(latlngbounds);
         listener = google.maps.event.addListener(map, "idle", function() {
          if (map.getZoom() > 16) map.setZoom(16);
            google.maps.event.removeListener(listener);
          });
       }
     }
    else{
       alert("Geocoder failed due to: " + status);
     }
  });
  }else{
    alert("Wrong lat,lng format!");
  }
}

function codeAddress(geocoding){
  var address = $("#search_box_geocoding").val();
  if(address.length > 0){
    geocoding.geocode({'address': address},function(results, status){
      if(status == google.maps.GeocoderStatus.OK){
        map.setCenter(results[0].geometry.location);
        var marker  =  new google.maps.Marker({
          map: map,
          position: results[0].geometry.location
        });
        }else{
        alert("Geocode was not successful for the following reason: " + status);
      }
    });
  }else{
    alert("Search field can't be blank");
  }
}

function loadScript() {
	console.log("map loading ...");
  var script = document.createElement('script');
  script.type = 'text/javascript';
  //'https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyBJYFdplGeKUUEmGZ-vL4ydiSZ09Khsa_o&sensor=false&libraries=drawing'
  script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp' +
    //'&v=3.14'+
    //'&key=AIzaSyBJYFdplGeKUUEmGZ-vL4ydiSZ09Khsa_o'+
    '&libraries=drawing'+
    '&callback=initialize';
  document.body.appendChild(script);
}
