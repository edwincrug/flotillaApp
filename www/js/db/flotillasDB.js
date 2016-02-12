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
        alert('Ya existe la base de datos');
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

    
    /*cordova.plugins.backgroundMode.setDefaults({ 
        title:  'TheTitleOfYourProcess',
        text:   'Executing background tasks.'
    });

    // Enable background mode
    cordova.plugins.backgroundMode.enable();

    // Called when background mode has been activated
    cordova.plugins.backgroundMode.onactivate = function () {
        onLineDevice();
                alert("functAjax");
                functAjax();
    }*/
}
