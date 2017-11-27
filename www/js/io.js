const EXPIRE_DAYS = 90;

const COOKIE_NAMES = {
    user: 'MyUser',
    password: 'MyPass',
    zoom: 'MyZoom',
    lat: 'WLat',
    lng: 'WLon',
    id: 'LoginId',
    tel: 'Tel_n'
};

function setCookie_e(cname, cval) {
    setCookie(cname, cval, EXPIRE_DAYS);
}

/**Writes used data into cookies*/
function WriteData() {
    setCookie_e(COOKIE_NAMES.user, MyUser);
    setCookie_e(COOKIE_NAMES.password, MyPass);
    setCookie_e(COOKIE_NAMES.zoom, MyZoom);
    setCookie_e(COOKIE_NAMES.lat, wlat);
    setCookie_e(COOKIE_NAMES.lng, wlon);
    setCookie_e(COOKIE_NAMES.id, myloginid);
    setCookie_e(COOKIE_NAMES.tel, mytel);
    // window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotfswrite, fail);
}

/**Reads used data from cookies*/
function ReadData() {
    MyUser = getCookie(COOKIE_NAMES.user);
    MyPass = getCookie(COOKIE_NAMES.password);
    MyZoom = getCookie(COOKIE_NAMES.zoom);
    wlat = getCookie(COOKIE_NAMES.lat);
    wlon = getCookie(COOKIE_NAMES.lng);
    myloginid = getCookie(COOKIE_NAMES.id);
    mytel = getCookie(COOKIE_NAMES.tel);

    // window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotfsread, fail);
}
//
// function gotfswrite(fileSystem) {
//     fileSystem.root.getFile("mytaxi/locdata.txt", {create: true, exclusive: false}, gotFileEntry, fail);
// }
//
// function gotfsread(fileSystem) {
//     fileSystem.root.getFile("mytaxi/locdata.txt", null, gotFileEntry2, fail2);
// }
//
// function gotFileEntry(fileEntry) {
//     fileEntry.createWriter(gotFileWriter, fail);
// }
//
// function gotFileWriter(writer) {
//     writer.write(
//         MyUser + ";" + MyPass +
//         ";" + MyZoom + ";" + wlon + ";" + wlat + ";" + myid + ";" + myloginid + ";" + mytel);
// }
//
// function fail(error) {
//     alert("error: " + error.code);
// }
//
//
// function gotFileEntry2(fileEntry) {
//     fileEntry.file(gotFile, fail);
// }
//
// function gotFile(file) {
//     readAsText(file);
// }
//
// function readAsText(file) {
//     var reader = new FileReader();
//     reader.onloadend = function (evt) {
//         var myData = evt.target.result;
//         console.log("file read: " + myData);
//         a = myData.split(";");
//         MyUser = a[0];
//         MyPass = a[1];
//         MyZoom = Math.floor(a[2]);
//         if (a.length > 3) {
//             wlon = a[3];
//             wlat = a[4];
//             setmypos();
//         }
//
//
//         if (a.length > 5) {
//             myid = a[5];
//         }
//
//
//         if (a.length > 6) {
//             myloginid = a[6];
//             if (myloginid > 0) {
//                 document.getElementById("loggedin_page").style.display = "inline";
//                 document.getElementById("login_page").style.display = "none";
//                 document.getElementById("regbut").style.display = "none";
//                 document.getElementById("loggedin_info").innerHTML = "მოგესალმებით " + MyUser;
//             }
//             else {
//                 document.getElementById("loggedin_page").style.display = "none";
//                 document.getElementById("login_page").style.display = "inline";
//
//             }
//         }
//
//         if (a.length > 7) {
//             mytel = a[7];
//         }
//
//         if (MyUser != "nouser") {
//             document.getElementById("myname").value = MyUser;
//             document.getElementById("mypass").value = MyPass;
//
//         }
//         else {
//
//             document.getElementById("myname").value = "";
//             document.getElementById("mypass").value = "";
//         }
//     };
//     reader.readAsText(file);
//
//
// }
//
// function fail2(evt) {
//     alert(evt.target.error.code);
// }
//
// function checkIfFileExists(path) {
//     window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem) {
//         fileSystem.root.getDirectory("mytaxi", {create: true, exclusive: false}, fileExists, fileDoesNotExist);
//     }, getFSFail);
//     window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem) {
//         fileSystem.root.getDirectory("mytaxi/maps", {create: true, exclusive: false}, fileExists, fileDoesNotExist);
//     }, getFSFail);
//     window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem) {
//         fileSystem.root.getDirectory("mytaxi/maps/1", {create: true, exclusive: false}, fileExists, fileDoesNotExist);
//     }, getFSFail);
//     window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem) {
//         fileSystem.root.getDirectory("mytaxi/maps/2", {create: true, exclusive: false}, fileExists, fileDoesNotExist);
//     }, getFSFail);
//     window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem) {
//         fileSystem.root.getDirectory("mytaxi/maps/3", {create: true, exclusive: false}, fileExists, fileDoesNotExist);
//     }, getFSFail);
//     window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem) {
//         fileSystem.root.getDirectory("mytaxi/maps/4", {create: true, exclusive: false}, fileExists, fileDoesNotExist);
//     }, getFSFail);
//     window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem) {
//         fileSystem.root.getDirectory("mytaxi/maps/5", {create: true, exclusive: false}, fileExists, fileDoesNotExist);
//     }, getFSFail);
//     window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem) {
//         fileSystem.root.getDirectory("mytaxi/maps/6", {create: true, exclusive: false}, fileExists, fileDoesNotExist);
//     }, getFSFail);
//     window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem) {
//         fileSystem.root.getDirectory("mytaxi/maps/7", {create: true, exclusive: false}, fileExists, fileDoesNotExist);
//     }, getFSFail);
//     window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem) {
//         fileSystem.root.getDirectory("mytaxi/maps/8", {create: true, exclusive: false}, fileExists, fileDoesNotExist);
//     }, getFSFail);
//     window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem) {
//         fileSystem.root.getDirectory("mytaxi/maps/9", {create: true, exclusive: false}, fileExists, fileDoesNotExist);
//     }, getFSFail);
//     window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem) {
//         fileSystem.root.getDirectory("mytaxi/maps/10", {create: true, exclusive: false}, fileExists, fileDoesNotExist);
//     }, getFSFail);
//     window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem) {
//         fileSystem.root.getDirectory("mytaxi/maps/dummy.html", {
//             create: true,
//             exclusive: false
//         }, fileExists, fileDoesNotExist);
//     }, getFSFail);
//     window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem) {
//         fileSystem.root.getFile("mytaxi/" + path, {create: false}, fileExists_main, fileDoesNotExist_main);
//     }, getFSFail);
// }
//
//
// function checktile(fileName) {
//     console.log("checking file: " + fileName);
//     fileName = "file:///storage/emulated/0/mytaxi/maps/" + fileName;
//     var http = new XMLHttpRequest();
//     http.open('HEAD', fileName, false);
//     http.send(null);
//     console.log("file: " + fileName + " status: " + http.status);
//     return (http.status != 404);
// }
//
// function checktile2(path) {
//     var reader = new FileReader();
//     reader.onloadend = function (evt) {
//         if (evt.target.result == null) {
//             tilef = 0;
//             return false;
//             // If you receive a null value the file doesn't exists
//         }
//         else {
//             tilef = 1;
//             return true;
//             // Otherwise the file exists
//         }
//     };
//
//     reader.readAsDataURL("mytaxi/maps/" + path);
// }
//
// function checktile3(path) {
//
//     window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem) {
//         fileSystem.root.getFile("mytaxi/maps/" + path, {create: false}, tilefound, notile);
//     }, getFSFail);
// //	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem){fileSystem.root.getFile("mytaxi/maps/"+path, { create: false }, function(){console.log("loading image: "+path); document.getElementById("img_"+i+"-"+ii).src="file:///storage/emulated/0/mytaxi/maps/"+path;}, function(){console.log("downloading tile: "+smap+"/"+szoom+"_"+A+"_"+B+" : "+i+" | "+ii);downtile(smap, szoom, A, B, i, ii,1);});}, getFSFail);
//
// }
//
// function tilefound(fileEntry) {
//     tilef = 1;
//     check_complete = 1;
// }
//
// function notile() {
//     tilef = 0;
//     check_complete = 1;
// }
//
// function fileExists(fileEntry) {
// //		console.log("aris!");
// //	dataex=1;
// }
//
// function fileDoesNotExist() {
// //		console.log("ar arsebobda");
// //    dataex=0;
// }
//
//
// function fileExists_main(fileEntry) {
//     console.log("aris faili!");
//
//     dataex = 1;
//
//
//     ReadData();
// }
//
// function fileDoesNotExist_main() {
//     console.log("ar arsebobda");
//     myid = Math.floor(Math.random() * 100000000);
//
//     WriteData();
//     dataex = 0;
// }
//
// function getFSFail(evt) {
//     console.log("shit error");
// }
//
//
//