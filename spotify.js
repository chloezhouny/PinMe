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

