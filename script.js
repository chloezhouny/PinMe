var locations = [];

var labels = [];

var gate = false;

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
  //debugger;

  var price = $("#price").val();
  console.log("the price is: " + price);
  var eventGenre = $("#event-input").val();
  console.log("the Event genre id is: " + eventGenre);
  var date = $("#date").val();
  console.log("the date: " + date);

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
