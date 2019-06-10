    	
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

    }