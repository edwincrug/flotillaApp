////////////////////////////////////////////////////////////////////////////////////
/*SQLITE*/
///////////////////////////////////////////////////////////////////////////////////
var flotillasDB = null;
var valorDoc = null;
var suma = 0;
var states = {};
var networkState = null;
var valorDoc = null;
        
document.addEventListener("deviceready", onDeviceReady,false);
//document.addEventListener('online',onLineDevice, false);

function onDeviceReady(){
    flotillasDB = window.sqlitePlugin.openDatabase({name: "FlotillasDB.db", createFromLocation: 1});

    if(flotillasDB != null){
        alert('hola flotillas');
    }
    /*flotillasDB.transaction(function(transaction) {
    transaction.executeSql('CREATE TABLE IF NOT EXISTS UnidadDoc(id integer primary key AUTOINCREMENT, idDocumento integer, valor text)', [],
    function(tx, result) {
    alert("Table created successfully");
    },
        function(error) {
        alert("Error occurred while creating the table.");
        });
    });*/

    cordova.plugins.backgroundMode.setDefaults({ 
        title:  'TheTitleOfYourProcess',
        text:   'Executing background tasks.'
    });

    // Enable background mode
    cordova.plugins.backgroundMode.enable();

    // Called when background mode has been activated
    cordova.plugins.backgroundMode.onactivate = function () {
        onLineDevice();
         //if(states[networkState] == 'wifi' ){
            /*for(var i=1; i <= 10; i++){
                suma = suma+1;
            }*/
            //valorDoc = selectUnidadId(1);
            //if(valorDoc != null){
                alert("functAjax");
                functAjax();
            //}
        //}
    }
}


function functAjax (){
    $.ajax({
    type: "GET",
    url: "http://192.168.20.9/WebServiceFlotilla/Service1.svc/GetJSON/HOLA",
    contentType: "application/json;charset=utf-8",
    dataType: "json",
    success: function (data) {
            alert('data');                            
        },
        error: function (xhr) {
            alert(xhr.responseText);
        }
    });
}

function onLineDevice(){

    networkState = navigator.connection.type;
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'wifi';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.CELL]     = 'Cell generic connection';
    states[Connection.NONE]     = 'No network connection'; 
    alert('Connection type: ' + states[networkState]);         
}

function insertUnidad(valor){
    flotillasDB.transaction(function(transaction) {
        var executeQuery = "INSERT INTO UnidadDoc (idDocumento, valor) VALUES (?, ?)";
        transaction.executeSql(executeQuery, [1, valor]
        , function(tx, result) {
        alert('Inserted');
        },
        function(error){
        alert('Error occurred');
        });
    });
}
 
function selectUnidadId(id){
    flotillasDB.transaction(function(transaction) {
        transaction.executeSql("SELECT valor FROM UnidadDoc WHERE id = ?", [id], function (tx, results) {
            alert(results.rows.item(0).valor);
        }, null);
    });
}       

////////////////////////////////////////////////////////////////////////////////////
/*CAMERA*/
///////////////////////////////////////////////////////////////////////////////////
function getPhoto() {
    navigator.camera.getPicture(onSuccess, onFail, {
        quality: 50,
        destinationType: Camera.DestinationType.FILE_URI,
        saveToPhotoAlbum: true
    });

    function onSuccess(imageURI) {
        document.getElementById('image').src = imageURI;
        insertUnidad(imageURI);
        //movePic(imageURI);imageURI
    }
}

function onFail(message) {
    alert('An error Occured: ' + message);
}

function movePic(file) {
    window.resolveLocalFileSystemURI(file, resolveOnSuccess, resOnError);
}

function resolveOnSuccess(entry) {

    alert('Archivo: ' + entry.fullPath);

    var d = new Date();
    var n = d.getTime();
    //new file name
    var newFileName = n + ".jpg";
    var myFolderApp = "/MyAppFolder";

    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSys) {
            //The folder is created if doesn't exist
            fileSys.root.getDirectory(myFolderApp, {
                    create: true
                },
                function (directory) {
                    entry.moveTo(directory, newFileName, successMove, resOnError);
                },
                resOnError);
        },
        resOnError);
}

function successMove(entry) {
    //Store imagepath in session for future use
    // like to store it in database
    sessionStorage.setItem('imagepath', entry.fullPath);

    alert(entry.fullPath);
}

function resOnError(error) {
    alert("Error: " + error.code);
}
