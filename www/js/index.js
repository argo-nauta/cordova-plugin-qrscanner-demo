/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('deviceready').classList.add('ready');
    receivedEvent('deviceready');

}

document.querySelector("#prepare").addEventListener("touchend", function() {
    window.QRScanner.prepare(onDone); // show the prompt

});

document.querySelector("#show").addEventListener("touchend", function() {
    //document.body.style.background = 'transparent';
    document.getElementById("scanner").classList.add('active')
    document.getElementById("cont-cancel").setAttribute('style', 'display:block;');
    window.QRScanner.show();

});

document.querySelector("#scan").addEventListener("touchend", function() {
    window.QRScanner.scan(displayContents);
    

});
document.querySelector("#cancel").addEventListener("touchend", function() {
    document.getElementById("scanner").classList.remove('active');
    document.getElementById("cont-cancel").setAttribute('style', 'display:none;');
    window.QRScanner.destroy(function(status){
        console.log(status);
    });
});

function onDone(err, status){
    if (err) {
        // here we can handle errors and clean up any loose ends.
        console.error(err);
    }
    if (status.authorized) {
        // W00t, you have camera access and the scanner is initialized.
        // QRscanner.show() should feel very fast.
    } else if (status.denied) {
        // The video preview will remain black, and scanning is disabled. We can
        // try to ask the user to change their mind, but we'll have to send them
        // to their device settings with `QRScanner.openSettings()`.
    } else {
        // we didn't get permission, but we didn't get permanently denied. (On
        // Android, a denial isn't permanent unless the user checks the "Don't
        // ask again" box.) We can ask again at the next relevant opportunity.
    }
}

function displayContents(err, text){
    if(err){
        // an error occurred, or the scan was canceled (error code `6`)
    } else {
        // The scan completed, display the contents of the QR code:
        document.getElementById("scanner").classList.remove('active');
        document.getElementById("cont-cancel").setAttribute('style', 'display:none;');
        document.getElementById("qrmessage").innerHTML = text;
    }
}


// Update DOM on a Received Event
function receivedEvent(id) {
    var parentElement = document.getElementById(id);
    var listeningElement = parentElement.querySelector('.listening');
    var receivedElement = parentElement.querySelector('.received');

    listeningElement.setAttribute('style', 'display:none;');
    receivedElement.setAttribute('style', 'display:block;');

    console.log('Received Event: ' + id);
}