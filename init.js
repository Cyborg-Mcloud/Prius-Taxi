var mystatus = 0;

document.addEventListener("deviceready", onDeviceReady, false);

var myid = 0;


var nogps = 0;
var wlon = 44.7814581;
var wlat = 41.7102118;
var MyUser = "nouser";
var MyPass = "nopass";
var MyZoom = 17;
var mytel = "";

var MyLat;
var MyLong;
var MyAlt;
var MyHead;
var MySpeed;
var MyAcc;
var started;
started = 0;

function onBackKeyDown() {
    if (curwindow == 1) {
        show_map();
    }
}

function onMenuDown() {
    if (curwindow == 0) {
        show_settings();
    }
}


function onSearchDown() {
    if (myself == 0) {
        setme();
    }
}

function onVolumeDown() {
    //zoomme(-1);
}

function onVolumeUp() {
    //zoomme(1);
}

var dataex = 0;

var xtile;
var ytile;

var mousex;
var mousey;
var omousex;
var omousey;

var sx;
var sy;

var canacX;
var canacY;
var inter = 'none';

var inpause = 0;

sx = getscreenw();
sy = getscreenh();
var myself = 0;


var gamehttp;
if (window.XMLHttpRequest) {
    gamehttp = new XMLHttpRequest();
}
else if (window.ActiveXObject) {
    gamehttp = new ActiveXObject('Microsoft.XMLHTTP');
}
else {
    alert('Your browser does not support XMLHTTP!');
}
gamehttp.onreadystatechange = update_data;


var userids = new Array();
var usernames = new Array();
var userlongs = new Array();
var userlats = new Array();
var useralts = new Array();
var userspeeds = new Array();
var userheads = new Array();
var userlasts = new Array();


var cache_ignore = 0;
var cache_ignore_wifi = 1;


var cur_down_i = 0;
var cur_down_ii = 0;
var down_complete = 1;
var check_complete = 1;
var file_downing = 0;
var LT_finished = 0;
var watchID = null;

// powermanagement -ის ფუნქციები
//window.powermanagement.acquire();
//window.powermanagement.release();

// ----------------------------------------------------------------
function onDeviceReady() {

    console.log("device ready, checking connection");
    checkConnection();

    document.addEventListener("pause", onPause, false);
    //document.addEventListener("backbutton", onBackKeyDown, false);
    //document.addEventListener("menubutton", onMenuDown, false);
    //document.addEventListener("searchbutton", onSearchDown, false);
    document.addEventListener("volumedownbutton", onVolumeDown, false);
    document.addEventListener("volumeupbutton", onVolumeUp, false);

    console.log("device ready, getting position");

    navigator.geolocation.getCurrentPosition(onSuccess, onError, {enableHighAccuracy: true, maximumAge: 0});
    var opts = {timeout: 5000, enableHighAccuracy: true, maximumAge: 0};
    watchID = navigator.geolocation.watchPosition(onWatchSuccess, onError, opts);

    document.addEventListener("resume", onResume, false);

    console.log("device ready, dealing with record file");

    // qveda amosagebia
    kc = checkIfFileExists("locdata.txt");


    //if (started==0)
    //	{
    //	Start();
    //	}
    //setmypos();
}

// ------------------------


function onError(e) {
    console.log(e);

//        MyLat=position.coords.latitude ;
//        MyLong=position.coords.longitude ;
//        MyAlt=position.coords.altitude ;
//        MyHead=position.coords.heading ;
//        MySpeed=position.coords.speed ;
//        MyAcc=position.coords.accuracy;

    return onSuccess({
        coords: {
            latitude: 41.7151,
            longitude: 44.8271,
            altitude: 0,
            heading: 0,
            speed: 0,
            accuracy: 1
        }
    });
    console.log("error getting location");
    nogps++;
    if (nogps > 1) {
        document.getElementById("nogps").style.display = "inline";
    }
}

var updatacounter = 0;
var uplimit = 5;


function MainProg() {
    console.log("main prog: " + started);
    console.log("focus is on: " + document.activeElement.getAttribute('id'));
    if (started == 1) {
        console.log("I am running");
        updatacounter++;
        if (updatacounter > uplimit) {
            UpData();
            updatacounter = 0;
        }
        if (myself == 1 && inpause == 0) {
            wlon = MyLong;
            wlat = MyLat;
            setmypos();
        }
    }
    navigator.geolocation.getCurrentPosition(onSuccess, onError, {enableHighAccuracy: true, maximumAge: 0});

    setTimeout("MainProg();", 1000);
}

var taxilong = 0;
var taxilat = 0;
var taxiname = "";
var notified = 0;

var chatis = "";

function update_data() {
    if (gamehttp.readyState == 4) {
        mr = gamehttp.responseText;
        if (mr != "") {
            console.log("data received from server: " + mr);
            if (mr == "register") {

                console.log("register received");
                Start();
            }
            else if (mr.substring(0, 4) == "logi") {
                console.log("login receive: " + mr);
                a = mr.split("|");

                console.log("loginid:" + a[1]);
                if (a[1] != "error") {
                    myloginid = a[1];
                    MyUser = a[2];
                    WriteData();

                }
                else {
                    alert("ელ.ფოსტა/მობილური ან პაროლი არასწორია!");
                }

                if (myloginid > 0) {
                    document.getElementById("loggedin_page").style.visibility = "visible";
                    document.getElementById("login_page").style.display = "none";
                    document.getElementById("regbut").style.display = "inline";
                    document.getElementById("loggedin_info").innerHTML = "მოგესალმებით " + MyUser;

                }
                else {
                    document.getElementById("loggedin_page").style.display = "none";
                    document.getElementById("login_page").style.display = "inline";
                }
            }
            else if (mr.substring(0, 4) == "chat") {
                console.log("chat receive: " + mr);
                a = mr.split("|");
                chatis = a[1];
                document.getElementById("chat_txt").innerHTML = chatis;
                document.getElementById("chat_txt").scrollTop = document.getElementById("chat_txt").scrollHeight;
                ;
            }
            else {


                a = mr.split("|");
                if (a[0] == "searching_taxi") {
                    notified = 0;
                    change_status(1);
                    callingtaxi = 0;

                }
                else if (a[0] == "taxi_moving") {
                    notified = 0;
                    callingtaxi = 0;
                    change_status(2);
                    b = a[1].split(";");
                    if (b[0] != "") {
                        taxilong = parseFloat(b[0]);
                        taxilat = parseFloat(b[1]);
                        taxiname = b[2];

                    }
                }
                else if (a[0] == "taxi_arrived") {
                    callingtaxi = 0;

                    change_status(3);
                    b = a[1].split(";");
                    if (b[0] != "") {
                        taxilong = parseFloat(b[0]);
                        taxilat = parseFloat(b[1]);
                        taxiname = b[2];
                        document.getElementById("taxi_number").innerHTML = "ბორტის ნომერი: " + taxiname;
                        if (notified == 0) {
                            window.plugin.notification.local.schedule({
                                id: "321123",  // A unique id of the notifiction
                                text: "თქვენი ტაქსი მოვიდა და გელოდებათ",  // The message that is displayed
                                title: "ტაქსი მოვიდა",  // The title of the message

                            });
                            notified = 1;
                        }

                    }
                }
                else if (a[0] == "taxi_waiting") {
                    callingtaxi = 0;
                    change_status(4);
                    b = a[1].split(";");
                    if (b[0] != "") {
                        taxilong = parseFloat(b[0]);
                        taxilat = parseFloat(b[1]);
                        taxiname = b[2];
                    }
                }
                else if (a[0] == "you_moving") {
                    notified = 0;
                    callingtaxi = 0;
                    change_status(5);
                    b = a[1].split(";");
                    if (b[0] != "") {
                        taxilong = parseFloat(b[0]);
                        taxilat = parseFloat(b[1]);
                        taxiname = b[2];
                    }
                }
                else {
                    if (mystatus > 0) {
                        callingtaxi = 0;
                        notified = 0;
                        document.getElementById("taxibox").style.visibility = "hidden";
                        uplimit = 5;
                        document.getElementById("call_but").style.display = "inline";
                        document.getElementById("arrived_screen").style.display = "none";
                        change_status(0);
                    }
                    check_chat(parseInt(mr));
                }

                if (inpause == 0) {
                    DrawUsers();
                }


            }
        }
    }
}

function check_chat(chatid) {
    if (chatid != last_chat) {
        last_chat = chatid;
        url = "http://developer.design.ge/geotaxi/chat.php?req=1&myid=" + myid;

        console.log("request chat: " + url);
        gamehttp.open('GET', url, true);
        gamehttp.send(null);
    }
}

function UpData() {
    if (myid == 0 || myid == "") {
        myid = Math.floor(Math.random() * 100000000);
        WriteData();
    }
    if (callingtaxi == 0) {

        if (MyUser != "nouser" && MyUser != "") {
            url = "http://developer.design.ge/geotaxi/upload.php?uname=" + MyUser + "&pass=" + MyPass + "&lat=" + MyLat + "&long=" + MyLong + "&alt=" + MyAlt + "&head=" + MyHead + "&speed=" + MySpeed + "&passive=" + inpause + "&myid=" + myid;
        }
        else {
            url = "http://developer.design.ge/geotaxi/upload.php?passive=" + inpause + "&myid=" + myid + "&lat=" + MyLat + "&long=" + MyLong + "&alt=" + MyAlt + "&head=" + MyHead + "&speed=" + MySpeed;
        }
        console.log("just upload: " + url);
        //	document.getElementById('erorebi').innerHTML="uname="+MyUser+"&pass="+MyPass+"&lat="+MyLat+"&long="+MyLong+"&alt="+MyAlt+"&head="+MyHead+"&speed="+MySpeed;
        gamehttp.open('GET', url, true);
        gamehttp.send(null);
    }


}

function Start() {
    console.log("Start / END");
    if (started == 0) {
        started = 1;
        MainProg();
    }  // document.getElementById('mainb').innerHTML="STOP";
    else {//started=0;
    } //  document.getElementById('mainb').innerHTML="START";

}

function onPause() {
    console.log("on pause");
//	if (started==0)
    //{
    if (mystatus == 0 || mystatus == 5) {
        started = 0;
        clearWatch();
        WriteData();
        inpause = 1;
    }

}

function onResume() {
    console.log("on resume");
    if (inpause == 1) {
        inpause = 0;
    }

    if (started == 0) {
        checkConnection();

        var opts = {timeout: 30000, enableHighAccuracy: true};
        watchID = navigator.geolocation.watchPosition(onWatchSuccess, onError, opts);

        Start();
    }

    //checkIfFileExists("locdata.txt");
    //if (dataex==0)
    //	{WriteData();}

    //ReadData();

// daakomentare jer


    //setmypos();
    //DrawUsers();
}


function onSuccess(position) {
    nogps = 0;
    console.log("GPS on success");
    document.getElementById("GPS_search_screen").style.display = "none";
//	var element = document.getElementById('geopos');
//	element.innerHTML = 'Latitude: '           + position.coords.latitude              + '<br />' +
//                            'Longitude: '          + position.coords.longitude             + '<br />';
    //'Altitude: '           + position.coords.altitude              + '<br />' +
    //'Accuracy: '           + position.coords.accuracy              + '<br />' +
    //'Heading: '            + position.coords.heading               + '<br />' +
    //'Speed: '              + position.coords.speed                 + '<br />';
    MyLat = position.coords.latitude;
    MyLong = position.coords.longitude;
    MyAlt = position.coords.altitude;
    MyHead = position.coords.heading;
    MySpeed = position.coords.speed;
    MyAcc = position.coords.accuracy;

    wlon = MyLong;
    wlat = MyLat;
    console.log("on succ, sett long");

    if (started == 0) {
        Start();
    }

    setmypos();
//	document.getElementById('geopos_short').innerHTML="<table width=100% cellspacing=0><tr><td>Accuracy: "+MyAcc+"</td><td>Altitude: "+MyAlt+"</td></tr></table>";

}


function getpos() {
    console.log("get pos");
    document.getElementById('geopos').innerHTML = "Finding geolocation...";
    navigator.geolocation.getCurrentPosition(onSuccess, onError);

}


function onWatchSuccess(position) {

    console.log("on watch success");

    MyLat = position.coords.latitude;
    MyLong = position.coords.longitude;
    MyAlt = position.coords.altitude;
    MyHead = position.coords.heading;
    MySpeed = position.coords.speed;
    MyAcc = position.coords.accuracy;
    if (inpause == 0) {
        var element = document.getElementById('geopos');
        element.innerHTML = 'Latitude: ' + position.coords.latitude + '<br />' +
            'Longitude: ' + position.coords.longitude + '<br />';
//							'Altitude: '           + position.coords.altitude              + '<br />' +
//							'Accuracy: '           + position.coords.accuracy              + '<br />' +
//							'Heading: '            + position.coords.heading               + '<br />' +
//							'Speed: '              + position.coords.speed                 + '<br />';

        setmypos();
        //	document.getElementById('geopos_short').innerHTML="<table width=100% cellspacing=0><tr><td>Accuracy: "+MyAcc+"</td><td>Altitude: "+MyAlt+"</td></tr></table>";

    }
}