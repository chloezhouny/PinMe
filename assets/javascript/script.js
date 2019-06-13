  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyCZk9PYW4NDZTAyx1a4a20xyJIryTHwFy4",
    authDomain: "first-group-project-243018.firebaseapp.com",
    databaseURL: "https://first-group-project-243018.firebaseio.com",
    projectId: "first-group-project-243018",
    storageBucket: "first-group-project-243018.appspot.com",
    messagingSenderId: "227952669943",
    appId: "1:227952669943:web:845507b14772ff8e"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  var database = firebase.database();


var locations = [];

var labels = [];

var userlong;
var userlat;
var token1;
var genreText;
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
  var eventGenre = $("#event_input").val();
  genreText = event_input.selectedOptions[0].text;
  console.log(genreText);

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
      var venueName = $("<p>").html("<b>Venue:</b> " + events[i].venue.name);
      var eventTimeStart = events[i].start.local.split("T")
      var eventStart = $("<p>").html("<b>Date</b>: " + eventTimeStart[0] + "<br>" + "<b>Time: </b>" + eventTimeStart[1]);
      var eventPlace = $("<p>").html("<b>Address:</b> " + events[i].venue.address.localized_address_display);
      var eventURL = $("<a />", {
        href: events[i].url,
        text: "read more"
      });

      var eventFree;
      if (events[i].is_free) {
        eventFree = $("<p>").html("<b>Pricing:</b> Free")
      }
      else if (!events[i].is_free) {
        eventFree = $("<p>").html("<b>Pricing:</b> Paid")
      }

      newEvent.append(eventName);
      newEvent.append(eventImg);

      newEvent.append(eventSum);
      newEvent.append(eventStart);
      newEvent.append(venueName);
      newEvent.append(eventFree);
      newEvent.append(eventPlace);

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
  $(".col").empty();
  displayEvent();
  playList();
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
      infoWindow.setContent('You are here.');
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







function getSpotifyToken()
{
  var tokenURL = "https://accounts.spotify.com/api/token";
  var clientId = '5e15085d2b924d049ae29907ee452bbf';
  var clientSecret = 'e84f853c2b784addb982d679f609d73a';
  var encodedData = window.btoa(clientId + ':' + clientSecret);

  console.log("HI");
    jQuery.ajaxPrefilter(function(options) {
      if (options.crossDomain && jQuery.support.cors) {
          options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
      }
  });


    $.ajax({
        method: "POST",
        url: tokenURL,
        data: {
          grant_type: 'client_credentials'
        },
      headers: {
        "Authorization": "Basic "+ encodedData,
        'Content-Type': 'application/x-www-form-urlencoded',
        'x-requested-with': 'XMLHttpRequest'
      }
    })
        .then (function(result) {
          console.log(result);
          token1 = result.access_token;
     });


}


getSpotifyToken();




// var deviceId; 



//   console.log(window.location.hash);
//   // Get the hash of the url
//   const hash = window.location.hash
//   .substring(1)
//   .split('&')
//   .reduce(function (initial, item) {
//     if (item) {
//       var parts = item.split('=');
//       initial[parts[0]] = decodeURIComponent(parts[1]);
//     }
//     return initial;
//   }, {});
//   window.location.hash = '';

//   // Set token
//   let _token = hash.access_token;

//   const authEndpoint = 'https://accounts.spotify.com/authorize';

//   // Replace with your app's client ID, redirect URI and desired scopes
//   const clientId = '5e15085d2b924d049ae29907ee452bbf';
//   const redirectUri = 'http://localhost:8000/Desktop/testSpotify/';
//   const scopes = [
//     'streaming',
//     'user-read-birthdate',
//     'user-read-private',
//     'user-modify-playback-state'
//   ];

//   // If there is no token, redirect to Spotify authorization
  




//   // Set up the Web Playback SDK

//   window.onSpotifyPlayerAPIReady = () => {
//     const player = new Spotify.Player({
//       name: 'Web Playback SDK Template',
//       getOAuthToken: cb => { cb(_token); }
//     });

//     // Error handling
//     player.on('initialization_error', e => console.error(e));
//     player.on('authentication_error', e => console.error(e));
//     player.on('account_error', e => console.error(e));
//     player.on('playback_error', e => console.error(e));

//     // Playback status updates
//     player.on('player_state_changed', state => {
//       console.log(state)
//       $('#current-track').attr('src', state.track_window.current_track.album.images[0].url);
//       $('#current-track-name').text(state.track_window.current_track.name);
//     });

//     // Ready
//     player.on('ready', data => {
//       console.log('Ready with Device ID', data.device_id);
      
//       // Play a track using our new device ID
//        deviceId = data.device_id;
      
//     });

//     // Connect to the player!
//     player.connect();
//   }



// // Play a specified track on the Web Playback SDK's device ID
// function play(device_id) {
//   $.ajax({
//    url: "https://api.spotify.com/v1/me/player/play?device_id=" + device_id,
//    type: "PUT",
//    data: '{"uris": ["'+trackURI+'"]}',
//    beforeSend: function(xhr){xhr.setRequestHeader('Authorization', 'Bearer ' + _token );},
//    success: function(data) { 
//      console.log(data)
//    }
//   });
// }






















// var tracksAPIs = [];
// var trackURI;


// $(document).on("click", "#event-genre", function()
// {
 function playList()
 {
  $("#playlistDiv").text("");
  console.log(token1);
  
  var topicSearch = $(this).attr("data-fitness");
  var state = $(this).attr("data-state");
  var playlistURL = "https://api.spotify.com/v1/search?q=" + genreText + "&type=playlist&limit=10"; 



      /* Spotify playlist API */
    $.ajax({
      url: playlistURL,
      method: "GET",
      Accept: "application/json",
      ContentType: "application/json",
      headers: {
      "Authorization": "Bearer "+ token1}

    })
    .then(function(response){
      console.log(response);
      for(var i = 0; i<4; i++)
    {

      var result = response.playlists;
      var playlistURL = result.items[i].external_urls.spotify;

      var imgURL = result.items[i].images[0].url;
      // var tracksAPI = result.items[i].tracks.href;
      // tracksAPIs.push(tracksAPI);
      

      var playlists = $("<div id = 'playlist'>");
      var playlist = $("<a href='" + playlistURL + "' target = 'blank'>");
      var img = $("<img>");
      img.attr("src"
        , imgURL);
      img.addClass("uk-animation-scale-up uk-transform-origin-top-left uk-transition-fade");
      img.attr("background-color", "black")

      var playDiv =  $("<div id='play'>").text("►");
      playDiv.addClass("uk-transition-fade");
      

      playlist.addClass("uk-transition-toggle");
      playlist.addClass("uk-overflow-hidden");
      playlist.append(img);
      playlist.append(playDiv);


      playlists.append(playlist);
      
      $("#playlistDiv").append(playlists);
    }

  //   getTrackURI();
  //   if (!_token) {
  //   // window.location = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join('%20')}&response_type=token&show_dialog=true`;
  //   window.open(`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join('%20')}&response_type=token&show_dialog=true`, "_blank");
  // }
  })
}



// function getTrackURI()
// {
//   var tracksURL = tracksAPIs[0];
//   $.ajax({
//       url: tracksURL,
//       method: "GET",
//       Accept: "application/json",
//       ContentType: "application/json",
//       headers: {
//       "Authorization": "Bearer "+ token1}

//     })
//     .then(function(response){
//       console.log(response);

//       console.log(response.items[0].track.uri);
//       trackURI = response.items[0].track.uri;
//       play(deviceId);
//       tracksAPIs = [];
//     })

// }

