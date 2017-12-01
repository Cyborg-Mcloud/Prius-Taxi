var MyLat;
var MyLong;
var infoWindow, tempMarker;

function initMap() {

    MyLat = 41.718287;
    MyLong = 44.778728;

    var position = {lat: MyLat, lng: MyLong};

    gmap = new google.maps.Map(document.getElementById('gmap'), {
        zoom: 18,
        center: position,
        zIndex: 70

    });

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
        icon: myicon
    });
    positionMarker = new google.maps.Marker({position: position, map: gmap, icon: gpsIcon});
    infoWindow = new google.maps.InfoWindow({content: getInfoContent('')});
    tempMarker = new google.maps.Marker();
    gmap.addListener('click', function (e) {
        tempMarker.setPosition(e.latLng);
        tempMarker.setMap(gmap);
        infoWindow.setContent(getInfoContent('tempMarker'));
        infoWindow.open(gmap, tempMarker);
    })
}

function getInfoContent(markerName) {
    return "<div style='text-align: center;'>" +
        "<button onclick='chooseLocation(" + markerName + ")'>არჩევა</button></div>";
}

function setLocation(marker) {
    MyMarker.setPosition(marker.getPosition());
    gmap.panTo(MyMarker.getPosition());
    if (marker === tempMarker) marker.setMap(null);
}

function chooseLocation(marker) {
    navigator.notification.confirm('დარწმუნებული ხართ, რომ გსურთ ამ ლოკაციის არჩევა?',
        function (choice) {
            if (choice === 1) setLocation(marker);
        }, 'დადასტურება', ['დიახ', 'არა'])
}

//  mapTypeId: 'satellite',