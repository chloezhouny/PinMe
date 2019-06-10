var locations = [];

var labels = [];

var gate = false;

var eventGenre = $("#event-input").val();

var userlong;
var userlat;
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

  eventGenre = eventGenre.toLowerCase();
  console.log("this is event genre" + eventGenre);
  for (i = 0; i < genre.length; i++) {
    if (eventGenre == genre[i].name) {
      eventGenre = genre[i].id;
    }
  }
  console.log("the Event genre id is: " + eventGenre);

  var queryURL =
    "https://www.eventbriteapi.com/v3/events/search/?categories=103&subcategories=" +
    eventGenre +
    "&token=HCI6R2VNZXBSOAT5UBT2&expand=venue&location.latitude=" +
    userlat +
    "&location.longitude=" +
    userlong +
    "&location.within=100mi";

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
