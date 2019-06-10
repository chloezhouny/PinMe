    	
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
				
            };

        })

    }