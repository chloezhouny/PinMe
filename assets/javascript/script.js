var locations = [];

var labels = [];

var userlong;
var userlat;
window.onload = function() {
  displayEvent;
};
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

function getURL() {
  // debugger;
  var price = $("#price").val();
  var eventGenre = $("#event-input").val();
  var date = $("#date").val();
  var queryURL;
  var basicURL =
    "https://www.eventbriteapi.com/v3/events/search/?sort_by=date&categories=103&token=HCI6R2VNZXBSOAT5UBT2&expand=venue&location.latitude=" +
    userlat +
    "&location.longitude=" +
    userlong +
    "&location.within=100mi";

  // if (
  //   eventGenre == "Any genre" &&
  //   price == "Any price" &&
  //   date == "Any date"
  // ) {
  queryURL = basicURL;

  if (price !== "Any price") {
    queryURL = queryURL + "&price=" + price;
  }
  if (eventGenre !== "Any genre") {
    queryURL = queryURL + "&subcategories=" + eventGenre;
  }
  if (date !== "Any date") {
    queryURL = queryURL + "&start_date.keyword=" + date;
  }
  return queryURL;
}

function displayEvent() {
  //debugger;

  var queryURL = getURL();

  var bufferIntObj = {
    template: 2,
    parent: ".main-carouse"
  };
  var bufferProgress = new Mprogress(bufferIntObj);
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);
    console.log(queryURL);
    bufferProgress.end();
    var events = response.events;
    for (var i = 0; i < 10; i++) {
      var newEvent = $("<div>").addClass("eventDiv");
      var eventImg = $("<img>")
        .attr("src", events[i].logo.url)
        .addClass("image");
      var eventName = $("<h3>").text(events[i].name.text);
      var eventSum = $("<p>").text(events[i].summary);
      var venueName = $("<p>").text(events[i].venue.name);
      var eventStart = $("<p>").text(events[i].start.local);
      var eventURL = $("<a />", {
        href: events[i].url,
        text: "read more"
      });

      newEvent.append(eventName);
      newEvent.append(eventImg);

      newEvent.append(eventSum);
      newEvent.append(eventStart);
      newEvent.append(venueName);

      newEvent.append(eventURL);
      $($(".col")[i % 2]).append(newEvent);

      var eventloc = [];
      eventloc.push(events[i].venue.latitude);
      eventloc.push(events[i].venue.longitude);
      locations.push(eventloc);
      labels.push("<div><b>Event:</b> " + response.events[i].name.html + "</div><div><b>Venue:</b> " + response.events[i].venue.name)
    }
    console.log(locations);
  });
}

$("#event-genre").on("click", function(event) {
  event.preventDefault();
  displayEvent();
});
$(".main-carousel").flickity({
  // options
  cellAlign: "left",
  contain: true,
  autoPlay: true,
  groupCells: true
});

//get covers from sotify
// $.ajax({
//     url: playlistURL,
//     method: "GET",
//     Accept: "application/json",
//     ContentType: "application/json",
//     headers: {
//     "Authorization": "Bearer "+ token1}
//
// })
// .then(function(response){
//     console.log(response);
//     for(var i = 0; i<4; i++)
// {
//
//     var result = response.playlists;
//     var playlistURL = result.items[i].external_urls.spotify;
//
//     var imgURL = result.items[i].images[0].url;
// }
//

getLocation();



//Google Maps script

var markers = [];

setTimeout(initMap(),1000);
function initMap() {

  var myLatlng = new google.maps.LatLng(userlat, userlong)

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 8,
    center: myLatlng
  });
  
  var bounds = new google.maps.LatLngBounds();

  $("#event-genre").on("click", function(event) {
    event.preventDefault();
    clearMarkers()
      console.log(locations.length)
      var marker;

setTimeout(function() { 
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

  markers.push(marker);
  
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
    
  },3000)
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




   // Sets the map on all markers in the array.
   function setMapOnAll(map) {
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(map);
    }
  }

  // Removes the markers from the map.
  function clearMarkers() {
    setMapOnAll(null);
    locations = [];
    labels = [];
  }

