global.displayBigMap = function(quizzes) {
  const container = document.getElementById('big-map-container');

  const initialCoords = new google.maps.LatLng(51.45946, -2.5907347);

  const mapOptions = {
    center: initialCoords,
    zoom: 13
  };

  const bigMap = document.createElement('div');
  bigMap.id = 'big-map';
  const map = new google.maps.Map(bigMap, mapOptions);

  for (let i = 0; i < quizzes.length; i++) {
    const coords = new google.maps.LatLng(quizzes[i].latitude, quizzes[i].longitude);
    const marker = new google.maps.Marker({
      position: coords,
      map: map
    });
    const infoWindow = new google.maps.InfoWindow({
      content: quizzes[i].venue
    });
    google.maps.event.addListener(marker, 'mouseover', function() {
      infoWindow.open(map, marker);
    });
    google.maps.event.addListener(marker, 'mouseout', function() {
      infoWindow.close();
    });
    google.maps.event.addListener(marker, 'click', function() {
      window.location.href = `/quizzes/${quizzes[i].slug}`;
    });
  }

  container.appendChild(bigMap);
}