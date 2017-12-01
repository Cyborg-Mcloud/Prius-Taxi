var last_chat = 0;

var chatopened = 0;

function chat_key(e) {

    if (e.keyCode == 13) {
        send_chat();
    }
}


function chat_click() {
    if (chatopened == 0) {
        document.getElementById("chat_window").style.display = "inline";
        document.getElementById("chat_div").style.bottom = "400px";
        chatopened = 1;
    }
    else {
        document.getElementById("chat_window").style.display = "none";
        document.getElementById("chat_div").style.bottom = "60px";
        chatopened = 0;
    }

}

function chat_send() {
    chat_txt = document.getElementById("chat_send_text").value;
    document.getElementById("chat_send_text").value = "";
    url = "http://developer.design.ge/geotaxi/chat.php?send=1&myid=" + myid + "&chat_txt=" + chat_txt;
    console.log("send chat: " + url);
    gamehttp.open('GET', url, true);
    gamehttp.send(null);
}

function change_start() {

}

function change_status(newstat) {
    console.log("status change: " + newstat + " / " + mystatus);
    if (newstat != mystatus) {

        if (newstat == 1) {

            uplimit = 1;
            document.getElementById("taxi_search_screen").style.display = "inline";
            document.getElementById("info_text").innerHTML = "მიმდინარეობს ტაქსის ძიება";
            document.getElementById("call_but").style.display = "none";
            document.getElementById("arrived_screen").style.display = "none";
        }
        else if (newstat == 2) {
            document.getElementById("taxi_search_screen").style.display = "none";
            uplimit = 1;
            document.getElementById("call_but").style.display = "none";
            document.getElementById("info_text").innerHTML = "ტაქსი მოდის";
            myself = 1;
        }
        else if (newstat == 3) {
            uplimit = 1;
            document.getElementById("taxi_search_screen").style.display = "none";
            document.getElementById("call_but").style.display = "none";
            document.getElementById("arrived_screen").style.display = "inline";
            document.getElementById("taxi_number").innerHTML = "ბორტის ნომერი: " + taxiname;
            myself = 1;
        }
        else if (newstat == 4) {
            uplimit = 1;
            document.getElementById("taxi_search_screen").style.display = "none";
            document.getElementById("call_but").style.display = "none";
            document.getElementById("arrived_screen").style.display = "none";
            document.getElementById("info_text").innerHTML = "ტაქსი გელოდებათ, ბორტი: " + taxiname;

            myself = 1;
        }
        else if (newstat == 5) {
            uplimit = 5;
            document.getElementById("taxi_search_screen").style.display = "none";
            document.getElementById("call_but").style.display = "none";
            document.getElementById("arrived_screen").style.display = "none";
            document.getElementById("info_text").innerHTML = "თქვენ მოძრაობთ";
            myself = 1;
        }

        else if (newstat == 0) {
            uplimit = 5;
            document.getElementById("call_but").style.display = "inline";
            document.getElementById("taxi_search_screen").style.display = "none";
            document.getElementById("arrived_screen").style.display = "none";
        }
        mystatus = newstat;
    }


}

function chamovdivar() {
    if (MyUser != "nouser" && MyUser != "") {
        url = "http://developer.design.ge/geotaxi/chamovdivar.php?uname=" + MyUser + "&pass=" + MyPass + "&lat=" + MyLat + "&long=" + MyLong + "&unique=" + myid;
    }
    else {
        url = "http://developer.design.ge/geotaxi/chamovdivar.php?lat=" + MyLat + "&long=" + MyLong + "&unique=" + myid;
    }
    console.log("taxi chamovdivar: " + url);
    gamehttp.open('GET', url, true);
    gamehttp.send(null);

}

function cignore() {
    if (document.getElementById("ignor_cache").checked == true) {
        cache_ignore = 1;
    }
    else {
        cache_ignore = 0;
    }
}

function cignorewifi() {
    if (document.getElementById("ignor_cache_on_wifi").checked == true) {
        cache_ignore_wifi = 1;
    }
    else {
        cache_ignore_wifi = 0;
    }
}

function setme() {
    if (MyMarker !== undefined) {
        gmap.panTo(positionMarker.getPosition());
        infoWindow.setContent(getInfoContent('positionMarker'));
        infoWindow.open(gmap, positionMarker);
    }
    // MyMarker.setOptions({position: {lat: MyLat, lng: MyLong}})
    console.log("setme");
    if (myself == 0) {
        myself = 1;
        document.getElementById("cbut").src = 'resources/center_sel.svg';
    }
    else {
        myself = 0;
        document.getElementById("cbut").src = 'resources/center.svg';
    }

}

//document.getElementById("maptype").value=1;
var curmap = 1;

function changemap() {
    console.log("change map");
    curmap = document.getElementById("maptype").value;
    oxt = 0;
    oyt = 0;
    setmypos();
}

var curwindow = 0;

function show_settings() {

    checkConnection();

    curwindow = 1;
    document.getElementById("fanjara").style.visibility = "hidden";
    document.getElementById("settings_sheet").style.visibility = "visible";
}


function show_map() {
    curwindow = 0;
    document.getElementById("fanjara").style.visibility = "visible";
    document.getElementById("settings_sheet").style.visibility = "hidden";
}


function stopScrolling(touchEvent) {
    touchEvent.preventDefault();
}


//document.body.addEventListener( 'touchmove' , stopScrolling , false );
var mcl = "orange";


function DrawUsers() {

    if (mystatus == 2) {

        console.log("draw taxi: " + taxilong + " / " + taxilat + " onme:" + myself);


        document.getElementById("taxibox").style.visibility = "visible";
        document.getElementById("taxitext").innerHTML = taxiname;


    }
}


function DrawHomePos() {
    console.log("drawing home pos");


}


var but1 = 0;

var t2x = 0;
var t2y = 0;

var tdist = 0;
var tdist_old = 0;


function mdown(event) {

}


var sfinx = 0;
var finy = 0;

function getmousecoord(event) {
    console.log("get mouse coord movedi");

}

function mup(event) {
    console.log("mouse up");

}


//document.ontouchmove = function (e) {  console.log("object: "+e.target.id);};


document.getElementById("fanjara").style.width = sx + "px";
document.getElementById("fanjara").style.height = sy + "px";

//document.getElementById("mouser").style.width=sx+"px";
//document.getElementById("mouser").style.height=sy+"px";


function zoomme(sait) {

}

var myloginid = 0;


function saveuser() {
    if (document.getElementById("myname").value != "" && document.getElementById("mypass").value != "") {
        MyUser = document.getElementById("myname").value;
        MyPass = document.getElementById("mypass").value;
    }
    else {
        MyUser = "nouser";
        MyPass = "nopass";
    }

    WriteData();


    url = "http://developer.design.ge/prius/login.php?login=1&unique=" + myid + "&myuser=" + MyUser + "&mypass=" + MyPass;
    console.log("login: " + url);
    gamehttp.open('GET', url, true);
    gamehttp.send(null);

    if (started == 0) {
        Start();
    }
}


var curx;
var cury;
var oxt = 0;
var oyt = 0;
var tilef = 0;

var kartX;
var kartY;

function setmypos() {
    if (window.navigator.onLine == false) {
        document.getElementById("myint").style.display = "inline";
    }
    else {
        document.getElementById("myint").style.display = "none";
    }


    DrawHomePos();

    var myLatLng = {lat: MyLat, lng: MyLong};
    positionMarker.setPosition(myLatLng);
    gmap.panTo(myLatLng);
    console.log("move marker");
}

function check_user_click() {

}

function hide_profile() {
    document.getElementById("profile_div").style.visibility = "hidden";
//	document.getElementById("mouser").style.visibility="visible";
    curtaxi = -1;
}

var curtaxi = -1;

function show_profile(tid) {
    var curtaxi = tid;
    document.getElementById("profile_div").style.visibility = "visible";
//	document.getElementById("mouser").style.visibility="hidden";
}

var callingtaxi = 0;

/**Returns whether the number is valid*/
function isValidInput(input1) {
    return true;
}

function call_taxi() {
    function onPrompt(result) {

        if (result.buttonIndex === 0) {
            if (isValidInput(result.input1)) {
                mytel = result.input1;
                WriteData();
            } else {
                navigator.notification.alert('გთხოვთ სწორად შეიყვანოთ ტელეფონის ნომერი\n(5XX-XXX-XXX)',
                    undefined, 'არასწორი ტელეფონის ნომერი')
            }
        }

    }

    if (mytel === "" || mytel.length < 6) {

        // mytel = prompt("რა ნომერზე დაგიკავშირდეთ?");
        // WriteData();
        navigator.notification.prompt(
            'რა ნომერზე დაგიკავშირდეთ?',  // message
            onPrompt,                  // callback to invoke
            'ტელეფონის ნომერი',            // title
            ['დადასტურება', 'გაუქმება'],             // buttonLabels
            mytel === undefined ? '5' : mytel                 // defaultText
        );
    }

    if ((mytel !== "" && mytel != null) || mytel.length >= 6) {
        if (MyUser !== "nouser" && MyUser !== "") {
            url = "http://developer.design.ge/geotaxi/call.php?uname=" + MyUser + "&pass=" + MyPass + "&lat=" + MyLat + "&long=" + MyLong + "&unique=" + myid + "&tel=" + mytel;
        }
        else {
            url = "http://developer.design.ge/geotaxi/call.php?lat=" + MyLat + "&long=" + MyLong + "&unique=" + myid + "&tel=" + mytel;
        }
        callingtaxi = 1;
        console.log("taxi call: " + url);
        gamehttp.open('GET', url, true);
        gamehttp.send(null);

    }
}


function logout() {
    myloginid = 0;
    WriteData();
    document.getElementById("regbut").style.display = "inline";
    document.getElementById("myname").value = "";
    document.getElementById("mypass").value = "";
    document.getElementById("loggedin_page").style.display = "none";
    document.getElementById("login_page").style.display = "inline";
}

function fail(error) {
    console.log(error.code);
}