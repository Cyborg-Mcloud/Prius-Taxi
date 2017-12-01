var MyLat;
var MyLong;
var infoWindow, tempMarker, geocoder;
var dirService, dirRender;
var startMarker, endMarker, positionMarker;
var startPosListener, endPosListener;

function geocodeLocation(position, infoWindow, markerName, targetMarkerName) {

    geocoder.geocode({
        latLng: position
    }, function (responses) {
        console.log(markerName + " " + targetMarkerName)
        if (responses && responses.length > 0) {

            infoWindow.setContent(getInfoContent(markerName, targetMarkerName, responses[0].formatted_address));
        } else {
            infoWindow.setContent(getInfoContent(markerName, targetMarkerName));
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
    dirRender = new google.maps.DirectionsRenderer({suppressMarkers: true});
    dirService = new google.maps.DirectionsService();
    START_ICON = {
        url: "resources/pin_start.svg", // url
        scaledSize: new google.maps.Size(30, 36), // size
        origin: new google.maps.Point(0, 0), // origin
        anchor: new google.maps.Point(15, 36), // anchor
        ratation: 30
    };
    END_ICON = {
        url: "resources/pin_end.svg", // url
        scaledSize: new google.maps.Size(30, 36), // size
        origin: new google.maps.Point(0, 0), // origin
        anchor: new google.maps.Point(15, 36), // anchor
        ratation: 30
    };
    var myicon = {
        url: "resources/pin_start.svg", // url
        scaledSize: new google.maps.Size(30, 36), // size
        origin: new google.maps.Point(0, 0), // origin
        anchor: new google.maps.Point(15, 36), // anchor
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
    startMarker = new google.maps.Marker({
        icon: START_ICON,
        map: map
    });
    endMarker = new google.maps.Marker({
        icon: END_ICON, map: map
    });
    positionMarker = new google.maps.Marker({position: position, map: map, icon: gpsIcon});
    infoWindow = new google.maps.InfoWindow({content: getInfoContent('')});
    tempMarker = new google.maps.Marker();
    startPosListener = map.addListener('click', function (e) {
        geocodeOnClick(e, 'startMarker')
    });
    setState(0);
}

function geocodeOnClick(e, target) {
    tempMarker.setPosition(e.latLng);
    tempMarker.setMap(map);
    geocodeLocation(tempMarker.getPosition(), infoWindow, 'tempMarker', target);
}

function getInfoContent(markerName, targetMarkerName, address) {

    return "<div style='text-align: center; color:black'><div>" + address + "</div><br>" +
        "<button class='btn'onclick='chooseLocation(" + markerName + "," + targetMarkerName + ")'>არჩევა</button></div>";
}

var state = 0;
const SWITCH_TEXTS = ['დანიშნულების არჩევა', 'დასაწყისის არჩევა', 'თავიდან არჩევა'];

function setState(newState) {
    state = newState;
    document.getElementById('switchButton').innerHTML = SWITCH_TEXTS[state];
    google.maps.event.removeListener(startPosListener);
    google.maps.event.removeListener(endPosListener);
    switch (state) {
        case 0:
            startPosListener = map.addListener('click', function (e) {
                console.log('staart')
                geocodeOnClick(e, 'startMarker')
            });
            break;
        case 1:
            endPosListener = map.addListener('click', function (e) {
                geocodeOnClick(e, 'endMarker')
            });
            break;
        case 2:
            calcRoute(startMarker.getPosition(), endMarker.getPosition(), dirService, dirRender);
            break;
    }
}

function switchState() {
    if (state === 1 && (startMarker.getPosition() === undefined || endMarker.getPosition() === undefined)) {
        setState(0);
        return;
    }
    setState((state + 1) % 3);

}

function setLocation(marker, target) {
    target.setPosition(marker.getPosition());
    map.panTo(target.getPosition());

    if (marker === tempMarker) {
        switchState();
        marker.setMap(null);
    }
}

function chooseLocation(marker, target) {
    try {
        navigator.notification.confirm('დარწმუნებული ხართ, რომ გსურთ ამ ლოკაციის არჩევა?',
            function (choice) {
                if (choice === 1) setLocation(marker, target);
            }, 'დადასტურება', ['დიახ', 'არა'])
    } catch (e) {
        if (confirm(
                'დარწმუნებული ხართ, რომ გსურთ ამ ლოკაციის არჩევა?'
            )) setLocation(marker, target);
    }
}

function getPosition(loc) {
    return {
        lat: loc.lat(),
        lng: loc.lng()
    }
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
            var route = response.routes[0].legs[0];
            addMarker(startMarker, map, getPosition(route.start_location), map.getBounds());
            addMarker(endMarker, map, getPosition(route.end_location), map.getBounds());
            directionsDisplay.setDirections(response);

            directionsDisplay.setMap(map);
        } else {
            addMarkers(map, [from_loc, to_loc], map.getBounds());
        }
    });
}

function addMarkers(map, markers, bounds) {
    // Loop through our array of markers & place each one on the map

    addAndGetMarker(map, markers[0], bounds, 'A');
    addAndGetMarker(map, markers[1], bounds, 'B');
}

function addMarker(marker, map, position) {
    var bounds = map.getBounds();
    bounds.extend(position);
    marker.setPosition(position);
    marker.setMap(map);
    map.fitBounds(bounds);
}

function addAndGetMarker(map, position, bounds, label, icon) {
    console.log(position);
    bounds.extend(position);
    var marker = new google.maps.Marker({
        position: {lat: position['lat'], lng: position['lng']},
        map: map
    });
    if (label !== undefined) marker.setLabel(label);
    if (icon !== undefined) marker.setIcon(icon);
    console.log(marker.position);
    marker.addListener('click', function () {
        map.setOptions({zoom: map.zoom + 2, center: position});
    });
    // Automatically center the map fitting all markers on the screen
    map.fitBounds(bounds);

}

var START_ICON, END_ICON;

//  mapTypeId: 'satellite',