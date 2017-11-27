var MyLat;
var MyLong;

function initMap() {

    MyLat = 41.718287;
    MyLong = 44.778728;

    var myLatLng = {lat: MyLat, lng: MyLong};

    gmap = new google.maps.Map(document.getElementById('gmap'), {
        zoom: 18,
        center: myLatLng,
        zIndex: 70,

        disableDefaultUI: true


    });

    var myicon = {
        url: "pin.svg", // url
        scaledSize: new google.maps.Size(30, 36), // size
        origin: new google.maps.Point(0, 0), // origin
        anchor: new google.maps.Point(15, 18), // anchor
        ratation: 30
    };

    var caricon = {
        url: "car.svg", // url
        scaledSize: new google.maps.Size(50, 50), // size
        origin: new google.maps.Point(0, 0), // origin
        anchor: new google.maps.Point(25, 25), // anchor

    };


    MyMarker = new google.maps.Marker({
        position: myLatLng,
        map: gmap,
        icon: myicon

    });


}

//  mapTypeId: 'satellite',