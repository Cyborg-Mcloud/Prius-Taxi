var MyLat;
var MyLong;
var infoWindow, tempMarker, geocoder;
var dirService, dirRender;

function geocodeLocation(position, infoWindow, markerName) {

    geocoder.geocode({
        latLng: position
    }, function (responses) {
        console.log('hhh')
        if (responses && responses.length > 0) {
            infoWindow.setContent(getInfoContent(markerName, responses[0].formatted_address));
        } else {
            infoWindow.setContent(getInfoContent(markerName));
        }
        infoWindow.open(map, tempMarker);
    });
}

function initMap() {

    MyLat = 41.718287;
    MyLong = 44.778728;

    var position = {lat: MyLat, lng: MyLong};

    map = new google.maps.Map(document.getElementById('gmap'), {
        zoom: 18,
        center: position,
        zIndex: 70

    });

    geocoder = new google.maps.Geocoder();
    dirRender = new google.maps.DirectionsRenderer();
    dirService = new google.maps.DirectionsService();
    var myicon = {
        url: "resources/pin.svg", // url
        scaledSize: new google.maps.Size(30, 36), // size
        origin: new google.maps.Point(0, 0), // origin
        anchor: new google.maps.Point(15, 18), // anchor
        ratation: 30
    };

    var caricon = {
        url: "resources/car.svg", // url
        scaledSize: new google.maps.Size(50, 50), // size
        origin: new google.maps.Point(0, 0), // origin
        anchor: new google.maps.Point(25, 25) // anchor

    };
    var gpsIcon = {
        url: "resources/images/Clustericon.svg", // url
        scaledSize: new google.maps.Size(50, 50), // size
        origin: new google.maps.Point(0, 0), // origin
        anchor: new google.maps.Point(25, 25) // anchor

    };
    MyMarker = new google.maps.Marker({
        icon: myicon,
        map: map
    });
    positionMarker = new google.maps.Marker({position: position, map: map, icon: gpsIcon});
    infoWindow = new google.maps.InfoWindow({content: getInfoContent('')});
    tempMarker = new google.maps.Marker();
    map.addListener('click', function (e) {
        tempMarker.setPosition(e.latLng);
        tempMarker.setMap(map);
        geocodeLocation(tempMarker.getPosition(), infoWindow, 'tempMarker');
    })
}

function getInfoContent(markerName, address) {

    return "<div class='btn' style='text-align: center; color:black'><div>" + address + "</div><br>" +
        "<button onclick='chooseLocation(" + markerName + ")'>არჩევა</button></div>";
}

function setLocation(marker) {
    MyMarker.setPosition(marker.getPosition());
    map.panTo(MyMarker.getPosition());
    if (marker === tempMarker) marker.setMap(null);
}

function chooseLocation(marker) {
    navigator.notification.confirm('დარწმუნებული ხართ, რომ გსურთ ამ ლოკაციის არჩევა?',
        function (choice) {
            if (choice === 1) setLocation(marker);
        }, 'დადასტურება', ['დიახ', 'არა'])
}

function calcRoute(from_loc, to_loc, directionsService, directionsDisplay) {
    var start = from_loc;
    var end = to_loc;
    var request = {
        origin: start,
        destination: end,
        travelMode: google.maps.TravelMode.DRIVING
    };
    directionsService.route(request, function (response, status) {
        if (status === google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
            directionsDisplay.setMap(map);
        } else {
            addMarkers(map, [from_loc, to_loc], map.getBounds());
        }
    });
}

function addMarkers(map, markers, bounds) {
    // Loop through our array of markers & place each one on the map

    addMarker(map, markers[0], bounds, 'A');
    addMarker(map, markers[1], bounds, 'B');
}

function addMarker(map, position, bounds, label) {

    console.log(position);
    bounds.extend(position);
    var marker = new google.maps.Marker({
        position: {lat: position['lat'], lng: position['lng']},
        map: map,
        label: label
    });
    console.log(marker.position);
    marker.addListener('click', function () {
        map.setOptions({zoom: map.zoom + 2, center: position});
    });
    // Automatically center the map fitting all markers on the screen
    map.fitBounds(bounds);

}

//  mapTypeId: 'satellite',