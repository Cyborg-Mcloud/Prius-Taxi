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
        position: position,
        map: gmap,
        icon: myicon

    });
    infoWindow = new google.maps.InfoWindow({content: INFO_CONTENT});
    tempMarker = new google.maps.Marker();
    gmap.addListener('click', function (e) {
        tempMarker.setPosition(e.latLng);
        tempMarker.setMap(gmap);
        infoWindow.open(gmap, tempMarker);
    })
}

const INFO_CONTENT = "<div style='text-align: center;'>" +
    "<button>არჩევა</button></div>";
//  mapTypeId: 'satellite',