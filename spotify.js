var topics = ["1", "2", "3", "4", "5", "6", "7", 
"8",  "9", "10", "11"];
var topicsSearch = ["1", "2", "3", "4", "5", "6", "7", "8", "9",
 "10", "11"];
var userAdd = false;
var start = true;
var token;




function getButton()
{

	if(start === true)
	{
		start = false;
	}

	if (userAdd === false)
	{
		for (var i = 0; i < topicsSearch.length; i++)
		{
			var btn = $("<button>").text(topics[i]);
			btn.addClass("btn btn-dark options");
			btn.attr("data-fitness", topicsSearch[i]);
			btn.attr("type", "button");
			$("#buttons-container").append(btn);
		}
		userAdd = true;
	}
	else
	{		
			var i = topicsSearch.length - 1 ;

			var btn = $("<button>").text(topics[i]);
			btn.addClass("btn btn-dark options");
			btn.attr("data-fitness", topicsSearch[i]);
			btn.attr("type", "button");
			$("#buttons-container").append(btn);
		
	}
}





function getSpotifyToken()
{
	var tokenURL = "https://accounts.spotify.com/api/token";
	var clientId = '5e15085d2b924d049ae29907ee452bbf';
	var clientSecret = 'e84f853c2b784addb982d679f609d73a';
	var encodedData = window.btoa(clientId + ':' + clientSecret);



	jQuery.ajaxPrefilter(function(options) {
	    if (options.crossDomain && jQuery.support.cors) {
	        options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
	    }
	});

		$.ajax({
		    method: "POST",
		    url: "https://accounts.spotify.com/api/token",
		    data: {
		      grant_type: 'client_credentials'
		    },
			headers: {
				"Authorization": "Basic "+ encodedData,
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		})
		    .then (function(result) {
		      console.log(result);
		      token = result.access_token;
		 });


}


getButton();
getSpotifyToken();

$(document).on("click", ".options", function()
{

	$("#playlistDiv").text("");
	var topicSearch = $(this).attr("data-fitness");
	var state = $(this).attr("data-state");
	var playlistURL = "https://api.spotify.com/v1/search?q=" + topicSearch + "&type=playlist&limit=10";	



      /* Spotify playlist API */
		$.ajax({
			url: playlistURL,
			method: "GET",
			Accept: "application/json",
			ContentType: "application/json",
			headers: {
			"Authorization": "Bearer "+ token}

		})
		.then(function(response){
			console.log(response);
			for(var i = 0; i<4; i++)
		{

			var result = response.playlists;
			var playlistURL = result.items[i].external_urls.spotify;

			var imgURL = result.items[i].images[0].url;
		

		

			var playlists = $("<div id = 'playlist'>");
			var playlist = $("<a href='" + playlistURL + "' target = 'blank'>");
			var img = $("<img>");
			img.attr("src", imgURL);
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
	})

});

