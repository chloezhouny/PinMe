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
  var eventGenre = $("#event-input").val();
  eventGenre = eventGenre.toLowerCase();
  console.log("this is event genre" + eventGenre);
  for (i = 0; i < genre.length; i++) {
    if (eventGenre == genre[i].name) {
      eventGenre = genre[i].id;
    }
  }
  console.log("the Event genre id is: " + eventGenre);
}
