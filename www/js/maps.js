var MyLat;
var MyLong;
var infoWindow, tempMarker, geocoder;

function geocodeLocation(position, infoWindow, markerName) {

    geocoder.geocode({
        latLng: position
    }, function (responses) {
        console.log('hhh')
        if (responses && responses.length > 0) {
            infoWindow.setContent(getInfoContent(markerName), responses[0].formatted_address);
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
        geocodeLocation(position, infoWindow, 'tempMarker');

    })
}

function getInfoContent(markerName, address) {

    return "<div style='text-align: center;'>" + address + "<br>" +
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

//  mapTypeId: 'satellite',