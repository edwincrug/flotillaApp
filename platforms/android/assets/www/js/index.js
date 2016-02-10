/*var app = {
    // Application Constructor
    initialize: function() {
        
        console.log("initializing");
        this.bindEvents();
        console.log("initializing done");
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);   
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        navigator.geolocation.getCurrentPosition(app.onSuccess, app.onErr);
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');
    },

    onErr: function(error)
    {
        alert('Unable to get your location. Without location you will not be able to use navigate feature! Error:' + '\n' + error.message);
    },

    onSuccess: function(position)
    {
        registrationModule.latitude = position.coords.latitude;
        registrationModule.longitude = position.coords.longitude;
    }
};*/
