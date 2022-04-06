global.initForm = function() {
  const venueInput = document.getElementById('quiz_venue');
  const postcodeInput = document.getElementById('quiz_postcode');
  const addressInput = document.getElementById('quiz_address');
  const latInput = document.getElementById('quiz_latitude');
  const lngInput = document.getElementById('quiz_longitude');
  
  if (latInput.value && lngInput.value) {
    displayCoordinateInputs();
    const coords = new google.maps.LatLng(latInput.value, lngInput.value);
  
    const mapOptions = {
      center: coords,
      zoom: 14
    };
  
    const mapContainer = document.getElementById('map_container');
    const venueMap = document.createElement('div');
    venueMap.id = 'map';
    const map = new google.maps.Map(venueMap, mapOptions);
  
    const marker = new google.maps.Marker({
      position: coords,
      map: map
    });
  
    mapContainer.appendChild(venueMap);
  }

  function getCoordsFromPostcode() {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: `${venueInput.value}, ${postcodeInput.value}` }, function(results, status) {
      if (status == 'OK') {
        const coords = new google.maps.LatLng(51.45946, -2.5907347);

        const mapOptions = {
          center: coords,
          zoom: 14
        };

        let map;
        if (document.getElementById('map')) {
          map = new google.maps.Map(document.getElementById('map'), mapOptions);
        } else {
          const mapContainer = document.getElementById('map_container');
          const venueMap = document.createElement('div');
          venueMap.id = 'map';
          map = new google.maps.Map(venueMap, mapOptions);

          mapContainer.appendChild(venueMap);
        }

        const marker = new google.maps.Marker({
          position: coords,
          map: map
        });

        map.setCenter(results[0].geometry.location);
        marker.setPosition(results[0].geometry.location);

        const address = results[0].formatted_address;
        addressInput.value = address;

        setInputValues(marker.getPosition());
      } else {
        console.log('Uh oh', status);
      }
    });
  }

  function setInputValues(latlng) {
    newlat = Math.round(latlng.lat() * 1000000) / 1000000;
    newlng = Math.round(latlng.lng() * 1000000) / 1000000;
    latInput.value = newlat;
    lngInput.value = newlng;
    displayCoordinateInputs();
  }

  function displayCoordinateInputs() {
    document.querySelector(".hidden-field").classList.remove("hidden-field");
  }

  document.getElementById('geocode_button').addEventListener('click', getCoordsFromPostcode);
}