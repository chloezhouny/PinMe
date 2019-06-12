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
  var eventGenre = $("#event-input").val();
  var date = $("#date").val();
  var queryURL;

  function getURL() {
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
    }
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
  getURL();

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
    for (var i = 0; i < events.length; i++) {
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
    }

    // is this google map api?
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
// ​
// })
// .then(function(response){
//     console.log(response);
//     for(var i = 0; i<4; i++)
// {
// ​
//     var result = response.playlists;
//     var playlistURL = result.items[i].external_urls.spotify;
// ​
//     var imgURL = result.items[i].images[0].url;
// }
//
