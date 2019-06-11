
// EventBrite API
var locations = [];

var labels = [];

var gate = false;

var userlong;
var userlat;

var eventGenre = $("#event-input").val();
var genre = [
  {
    id: 3001,
    name: "alternative"
  },
  { id: 3002, name: "blues & jazz" },
  { id: 3003, name: "classical" },
  { id: 3004, name: "country" },
  { id: 3005, name: "culture" },
  { id: 3006, name: "edm/electronic" },
  { id: 3007, name: "folk" },
  { id: 3008, name: "hip hop/rap" },
  { id: 3009, name: "indie" },
  { id: 3010, name: "latin" },
  { id: 3011, name: "metal" },
  { id: 3012, name: "opera" },
  { id: 3013, name: "pop" },
  { id: 3014, name: "r&b" },
  { id: 3015, name: "reggae" },
  { id: 3016, name: "religious/spiritual" },
  { id: 3017, name: "rock" },
  { id: 3018, name: "top 40" },
  { id: 3099, name: "other" }
];

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
}

function showPosition(position) {
  console.log(
    "Latitude: " +
      position.coords.latitude +
      " Longitude: " +
      position.coords.longitude
  );
  userlong = position.coords.longitude;
  userlat = position.coords.latitude;
}

getLocation();

function displayEvent() {
  eventGenre = eventGenre.toLowerCase();
  console.log("this is event genre" + eventGenre);
  for (i = 0; i < genre.length; i++) {
    if (eventGenre == genre[i].name) {
      eventGenre = genre[i].id;
    }
  }
  console.log("the Event genre id is: " + eventGenre);

  var price = $("#price").val();
  var date = $("#date").val();

  var queryURL =
    "https://www.eventbriteapi.com/v3/events/search/?sort_by=date&categories=103&subcategories=" +
    eventGenre +
    "&token=HCI6R2VNZXBSOAT5UBT2&expand=venue&location.latitude=" +
    userlat +
    "&location.longitude=" +
    userlong +
    "&location.within=100mi&price=" +
    price +
    "&start_date.keyword=" +
    date;

  //  &start_date.range_start=&start_date.range_end=&start_date.keyword=

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);

    for (n = 0; n < 10; n++) {
      var eventloc = [];
      eventloc.push(response.events[n].venue.latitude);
      eventloc.push(response.events[n].venue.longitude);
      locations.push(eventloc);
      if (n === 9) {
        gate = true;
        console.log("yes");
      }
    }
    console.log(locations);
  });
}
$("#event-genre").on("click", function(event) {
  event.preventDefault();
  displayEvent();
});


// Google Maps API    	
function initMap() {
     
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 8,
      center: {lat: userlat, lng: userlong}
    });
    
    var bounds = new google.maps.LatLngBounds();


    $("#event-genre").on("click", function() {
        console.log(locations.length)
        var marker;
        // loop through locations and add to map
        for ( var i = 0; i < locations.length; i++ )
        {
            // get current location
            var location = locations[ i ];
            
            // create map position
            var position = new google.maps.LatLng( location[ 0 ], location[ 1 ] );
            
            // add position to bounds
    bounds.extend( position );
    
    // create marker (https://developers.google.com/maps/documentation/javascript/reference#MarkerOptions)
            marker = new google.maps.Marker({
                /*animation: google.maps.Animation.DROP */
                  map: map
                , position: position
                , title: location[ 0 ]
    });
    
    // create info window and add to marker (https://developers.google.com/maps/documentation/javascript/reference#InfoWindowOptions)
            google.maps.event.addListener( marker, 'click', ( 
                function( marker, i ) {
                    return function() {
                        var infowindow = new google.maps.InfoWindow();
                        infowindow.setContent( labels[i]);
                        infowindow.open( map, marker );
                    }
                }
            )( marker, i ) );
            
        };

    })

    var infoWindow = new google.maps.InfoWindow;
    if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.');
            infoWindow.open(map);
            map.setCenter(pos);
          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }
    

      function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser does not support geolocation.');
        infoWindow.open(map);
      }

}