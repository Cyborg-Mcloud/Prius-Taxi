
function WriteData()
	{
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotfswrite, fail);
	}

function ReadData()
	{
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotfsread, fail);
	}
function gotfswrite(fileSystem) 
	{
	fileSystem.root.getFile("locage/locdata.txt", {create: true, exclusive: false}, gotFileEntry, fail);
	}

function gotfsread(fileSystem)
	{
	fileSystem.root.getFile("locage/locdata.txt", null, gotFileEntry2, fail2);
	}

function gotFileEntry(fileEntry) 
	{
	fileEntry.createWriter(gotFileWriter, fail);
	}

function gotFileWriter(writer) 
	{
	writer.write(MyUser+";"+MyPass+";"+MyZoom+";"+wlon+";"+wlat);

	}

function fail(error)
	{
	alert("error: "+error.code);
	}



function gotFileEntry2(fileEntry) 
	{
	fileEntry.file(gotFile, fail);
	}

function gotFile(file)
	{
	readAsText(file);
	}

function readAsText(file) 
	{
	var reader = new FileReader();
	reader.onloadend = function(evt) 
		{
		var myData =evt.target.result;
		a=myData.split(";");
		MyUser=a[0];
		MyPass=a[1];
		MyZoom=Math.floor(a[2]);
		if (a.length>3)
			{
			wlon=a[3];
			wlat=a[4];
			setmypos();
			}

		document.getElementById("myname").value=MyUser;
		document.getElementById("mypass").value=MyPass;
		};
	reader.readAsText(file);
	}

function fail2(evt) 
	{
	alert(evt.target.error.code);
	}

function checkIfFileExists(path)
	{
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem){fileSystem.root.getDirectory("locage", {create: true, exclusive: false}, fileExists, fileDoesNotExist); } , getFSFail); 
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem){fileSystem.root.getDirectory("locage/maps", {create: true, exclusive: false}, fileExists, fileDoesNotExist); } , getFSFail); 
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem){fileSystem.root.getDirectory("locage/maps/1", {create: true, exclusive: false}, fileExists, fileDoesNotExist); } , getFSFail); 
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem){fileSystem.root.getDirectory("locage/maps/2", {create: true, exclusive: false}, fileExists, fileDoesNotExist); } , getFSFail); 
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem){fileSystem.root.getDirectory("locage/maps/3", {create: true, exclusive: false}, fileExists, fileDoesNotExist); } , getFSFail); 
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem){fileSystem.root.getDirectory("locage/maps/4", {create: true, exclusive: false}, fileExists, fileDoesNotExist); } , getFSFail); 
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem){fileSystem.root.getDirectory("locage/maps/5", {create: true, exclusive: false}, fileExists, fileDoesNotExist); } , getFSFail); 
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem){fileSystem.root.getDirectory("locage/maps/6", {create: true, exclusive: false}, fileExists, fileDoesNotExist); } , getFSFail); 
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem){fileSystem.root.getDirectory("locage/maps/7", {create: true, exclusive: false}, fileExists, fileDoesNotExist); } , getFSFail); 
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem){fileSystem.root.getDirectory("locage/maps/8", {create: true, exclusive: false}, fileExists, fileDoesNotExist); } , getFSFail); 
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem){fileSystem.root.getDirectory("locage/maps/9", {create: true, exclusive: false}, fileExists, fileDoesNotExist); } , getFSFail); 
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem){fileSystem.root.getDirectory("locage/maps/10", {create: true, exclusive: false}, fileExists, fileDoesNotExist); } , getFSFail); 

	
	
	
	
	
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem){fileSystem.root.getFile("locage/"+path, { create: false }, fileExists, fileDoesNotExist);}, getFSFail); 
	}


function checktile(path)
	{
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem){fileSystem.root.getFile("locage/maps/"+path, { create: false }, tilefound, notile);}, getFSFail); 
	}

function tilefound(fileEntry)
	{
	tilef=1;
//	alert("found");
//	alert("size: ".fileEntry.size);

	}
function notile()
	{
	tilef=0;
	}

function fileExists(fileEntry)
	{
    dataex=1;
	}
function fileDoesNotExist()
	{
    dataex=0;
	}
function getFSFail(evt)
	{
    console.log(evt.target.error.code);
	}



