/*
* IndoorAtlas Cordova Plugin Examples
* https://github.com/IndoorAtlas/cordova-plugin
* https://github.com/IndoorAtlas/sdk-cordova-examples
*/

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

/*
 * IndoorAtlas Cordova Plugin Examples
 * https://github.com/IndoorAtlas/cordova-plugin
 * https://github.com/IndoorAtlas/sdk-cordova-examples
 */

// API KEYS FOR INDOORATLAS SERVICES AND GOOGLE MAPS JAVASCRIPT API

// Get Google Maps API Key from here: https://console.developers.google.com/apis/credentials
var GOOGLE_API_KEY = 'AIzaSyAzXNyHtYRnUl8l_ZyIWJ_NsTf-AYwBhBA';

// Get IndoorAtlas API Key and Secret from here https://app.indooratlas.com/apps
var IA_API_KEY = 'acb20002-c1c8-4da7-882a-4ec0fbffad82';
var IA_API_SECRET = '/WR8nloUygtkltkPzRW3i/Lu5o6YR21BExwqYdq8GDlH2rLelYbe4NwxIWUNQcQLH6J/gCIP1H3B13HBsnw5ZZ+McSiZ9WQIcSUtyLfRrRAldbiFH0W6nv+pO+pvrw==';

//
var IA_FLOORPLAN_ID;

// floorplan id for H
// var IA_FLOORPLAN_ID = '7de47cbe-c232-4875-b3d7-324b1ba15ed9'



var app = {
  // Application Constructor
  initialize: function() {
    this.bindEvents();
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
    cordovaExample.configureIA();
  },
  // Update DOM on a Received Event
  receivedEvent: function(id) {
    var parentElement = document.getElementById(id);
    var listeningElement = parentElement.querySelector('.listening');
    var receivedElement = parentElement.querySelector('.received');

    listeningElement.setAttribute('style', 'display:none;');
    receivedElement.setAttribute('style', 'display:block;');

    console.log('Received Event: ' + id);
  }
};

app.initialize();

//added
// HBuildingOverlay.prototype = new google.maps.OverlayView();
//jump to google maps descriptions

/* 
    This function sets the floor selector to "Ground" and disables it if
    "Building A" is selected in the building selector. If "Building A" is 
    not selected then the floor selector will be enabled. The floor plan ID is also set based on what building is selected.
*/

$(document).on('pageshow', '#pageone', function() {
  $('#FloorSelector').hide();
  $('#RoomSelector').hide();
});

$("#selectBuilding").change(function() {
  
    // Create variable to grab current selection value
    var building_selection = $("#selectBuilding").val();
    var floor_selection = $("#selectfloor").val();
    
    if (building_selection === "A") {
        $('#FloorSelector').show();
        // floorplan id for A
        IA_FLOORPLAN_ID = 'c49491e5-6c4b-43a4-9c83-e4853435a95b';
        alert("You selected building A!");
        $("#selectfloor").val("G").trigger("change");
        $("#selectfloor").selectmenu("disable", true);
       //$("select-floor").selectmenu("refresh", true);
       if (floor_selection === ""){
          $('#RoomSelector').show();
        }
    
    } else if (building_selection === "H"){
        $('#FloorSelector').show();
        alert("You selected building H!");
        $("#selectfloor").selectmenu("enable", true);
        // floorplan id for H
        IA_FLOORPLAN_ID = '7de47cbe-c232-4875-b3d7-324b1ba15ed9';
        if (floor_selection === ""){
          $('#RoomSelector').show();
        }
       
    } else {
        
        $("#selectfloor").selectmenu("enable", true);
    }
});



var image;
var venuemap;
// var venueMarker; // added
var groundOverlay = null;
var cordovaExample = {
  watchId : null,
  regionWatchId : null,
  marker : null,
  retina : window.devicePixelRatio > 1 ? true : false,

  // Configures IndoorAtlas SDK with API Key and Secret
  // Set the API Keys in www/js/APIKeys.js
  configureIA: function() {
    var _config = {
        key: IA_API_KEY,  
        secret: IA_API_SECRET};
    IndoorAtlas.initialize(this.IAServiceConfigured, this.IAServiceFailed, _config);
    return false;
  },
  IAServiceFailed: function(result) {
    // Try again to initialize the service
    cordovaExample.configureIA();
  },
  IAServiceConfigured: function(result) {
    cordovaExample.initializeMap();
  },

  // Displays the current location of the user
  // IMPORTANT FOR USER TRACKING AND WHY MAP MOVES WHEN USER MOVES
  showLocation: function(position) {
    // Show a map centered at (position.coords.latitude, position.coords.longitude).
    SpinnerPlugin.activityStop();
    try {
      var center = {lat: position.coords.latitude, lng: position.coords.longitude};

      if (this.marker != null) {
        // condition to have the marker update the users position
        this.marker.setPosition(center);
        // do not add an alert here. 
      }
      else {
        // alert('good mark');
        // this is the default location where the marker will be placed if the service cannot
        // pick up the users location.
        this.marker = new google.maps.Marker({
          position: center,
          map: venuemap,
          icon: image,
          zoom: 2,
          animation: google.maps.Animation.DROP,
          zIndex: google.maps.Marker.MAX_ZINDEX + 1,
          optimized: false
        });
      }
      // disabled moving of screen while marker moves
      // venuemap.panTo(center);
    }
    catch(error) {
      // alert(error)
    };
  },

  // Sets position of the location
  setPosition: function(options) {

      // Check if the floorplan is set
    if (IA_FLOORPLAN_ID != "") {
      alert("Setting location with floorplan ID: " + IA_FLOORPLAN_ID);
      // IndoorAtlas.clearWatch(this.watchId);
      // this.watchId = IndoorAtlas.watchPosition(this.showLocation,this.IAServiceFailed);

      // alert("Setting location with floorplan ID: " + IA_FLOORPLAN_ID);

      try {
        SpinnerPlugin.activityStart('Setting location');
        var win = function() {

          SpinnerPlugin.activityStop();
          cordovaExample.startRegionWatch();
        };
        var fail = function(error){
          SpinnerPlugin.activityStop();
          // alert(error.message);

        };
        IndoorAtlas.setPosition(win, fail, options);
      }
      catch(error){
        // alert(error);
      }
    } else {
      alert("Floorplan ID is not set");
    }
    


  },
  // Starts positioning the user in the given floorplan area
  startPositioning: function() {
    // SpinnerPlugin.activityStart('Move around to get a location');

    // this is where we are getting the 'indooratlas is not init' error. The watchId != null area
    if (this.watchId != null) {
      IndoorAtlas.clearWatch(this.watchId);
    }
    this.watchId = IndoorAtlas.watchPosition(this.showLocation, this.IAServiceFailed);
    cordovaExample.startRegionWatch();
  },

  // Fetches the current location
  getLocationCall: function() {
    SpinnerPlugin.activityStart('Fetching location. Move around');
    IndoorAtlas.getCurrentPosition(this.showLocation, this.IAServiceFailed);
  },

  // Stops positioning the user
  stopPositioning: function() {
    IndoorAtlas.clearWatch(this.watchId);
    cordovaExample.stopRegionWatch();
    alert("IndoorAtlas positioning stopped");
  },
  // Starts watching changes in region id
  startRegionWatch: function() {
    if (this.regionWatchId != null) {
      IndoorAtlas.clearRegionWatch(this.regionWatchId);
    }
    var onEnterRegion = function(region) {
      cordovaExample.updateOverlay(region.regionId);
    };
    var onExitRegion = function(region) {
    };
    this.regionWatchId = IndoorAtlas.watchRegion(onEnterRegion, onExitRegion, this.IAServiceFailed);
  },

  // Stops watching for the changes in region id
  stopRegionWatch: function() {
    IndoorAtlas.clearRegionWatch(this.regionWatchId);
  },
  // Initializes Google Maps with the given properties
  initializeMap: function() {

        var buildingLatLng = $("#selectBuilding").val();

        if (buildingLatLng === "A") {
          // var mapProp = {
          var mapProp = new google.maps.Map(document.getElementById('map'),{
            center: new google.maps.LatLng(33.979452859103866, -84.00100886821748),
            zoom: 20,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            mapTypeControl: false,
            streetViewControl: false
          });
          //added
          var bounds = new google.maps.LatLngBounds(
              new google.maps.LatLng(33.880934, -83.003403),
              new google.maps.LatLng(33.179635, -84.004015));
          var srcImage = "img/building-a-map.svg";

          overlay = new HBuildingOverlay(bounds, srcImage, mapProp);
        } else if (buildingLatLng === "H") {
          var mapProp = new google.maps.Map(document.getElementById('map'),{
          // var mapProp = {
            draggable: false,
            scrollWheel: false,
            // oiginal
            // center: new google.maps.LatLng(33.980347, -84.003798),
            // center: new google.maps.LatLng(33.980325, -84.003844),
            center: new google.maps.LatLng(33.980329, -84.003831),
            zoom: 19,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            mapTypeControl: false,
            streetViewControl: false,
            scaleControl: false,
            zoomControl: false,
            disableDoubleClickZoom: true,
            styles: [
              {
                "elementType": "labels",
                "stylers": [
                  {
                    "visibility": "off"
                  }
                ]
              },
              {
                "featureType": "administrative",
                "elementType": "geometry",
                "stylers": [
                  {
                    "visibility": "off"
                  }
                ]
              },
              {
                "featureType": "administrative.neighborhood",
                "stylers": [
                  {
                    "visibility": "off"
                  }
                ]
              },
              {
                "featureType": "poi",
                "stylers": [
                  {
                    "visibility": "off"
                  }
                ]
              },
              {
                "featureType": "road",
                "stylers": [
                  {
                    "visibility": "off"
                  }
                ]
              },
              {
                "featureType": "road",
                "elementType": "labels.icon",
                "stylers": [
                  {
                    "visibility": "off"
                  }
                ]
              },
              {
                "featureType": "transit",
                "stylers": [
                  {
                    "visibility": "off"
                  }
                ]
              }
            ]
          });

          var swBound = new google.maps.LatLng(33.979579, -84.004074);
          var neBound = new google.maps.LatLng(33.980980, -84.003446);
          var bounds = new google.maps.LatLngBounds(swBound, neBound);
          

        } else {
          alert("Defualt location");
          var mapProp = {
            center: new google.maps.LatLng(65.060848804763, 25.4410770535469),
            zoom: 20,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            mapTypeControl: false,
            streetViewControl: false,
            scaleControl: false,
            scrollWheel: false,
            zoomControl: false
          };
        }
    // the blue dot 
    image ={
      path: google.maps.SymbolPath.CIRCLE,
      fillColor: '#00A5F6',
      fillOpacity: 1.0,
      scale: 4.0,
      strokeColor: '#00A5F6',
      strokeWeight: 1
    };

    venuemap = new google.maps.Map(document.getElementById('googleMap'), mapProp);
    // added
    // venuemarker = new google.maps.Map(document.getElementById('markerTo'), markerProp);
    cordovaExample.mapOverlay({regionId: IA_FLOORPLAN_ID});
  },

  // Sets an overlay to Google Maps specified by the floorplan coordinates and bearing
  mapOverlay: function(position) {
    try {
      // alert("setting overlay 1"); //added
      SpinnerPlugin.activityStart('Setting overlay');
      var win = function(floorplan) {
        // alert("set overlay worked Win condition 2"); //added
        SpinnerPlugin.activityStop();
          var block = document.getElementById('centered');
          // var hbuildingfloor1div = document.getElementById('hBuildingFloor1');
          if (block.style.display === "none"){

            block.style.display = "block";
          } else {
            // hbuildingfloor1div.style.display = "none";
            block.style.display = "none";
          }
        // Set position and map overlay
        cordovaExample.setMapOverlay(floorplan);

      };
      var fail = function(error) {
        // alert("setoverlay failed 3"); //added
        SpinnerPlugin.activityStop();
        // alert(error.message);
      };


      // Gets the floorplan with the given region ID (floorplan ID) and then continues as specified earlier
      IndoorAtlas.fetchFloorPlanWithId(position.regionId, win, fail);
    }
    catch(error) {
      // alert(error);
    }
  },

  // Sets the map overlay
  setMapOverlay: function(floorplan) {
    // Needed to calculate the coordinates for floorplan that has not yet been rotated
    var center = floorplan.center;
    var pixelsToMeters = floorplan.pixelsToMeters;
    var heightForCoordinates = floorplan.bitmapHeight/2;
    var widthForCoordinates = floorplan.bitmapWidth/2;

    // Amount of meters of how much the coordinates have to be moved from the centre.
    var metersHorizontal = widthForCoordinates * pixelsToMeters;
    var metersVertical = heightForCoordinates * pixelsToMeters;

    // This function returns the length of one degree of latitude and same for longitude for the given latitude
    var lengths = cordovaExample.calculateLongLatDegreesInMeters(center[1]);

    // Amounts of how much the coordinates need to be moved from the centre
    var longitudes = metersHorizontal / lengths.degreeOfLongitudeInMeters;
    var latitudes = metersVertical / lengths.degreeOfLatitudeInMeters;

    // Calculate the new south-west and north-east coordinates
    var swCoords = new google.maps.LatLng({lat: center[1] - latitudes, lng: center[0] - longitudes});
    var neCoords = new google.maps.LatLng({lat: center[1] + latitudes, lng: center[0] + longitudes});

    // Get the bound of the unrotated image
    var bounds = new google.maps.LatLngBounds(swCoords , neCoords);

    // Options for custom class GroundOverlayEX
    var options = {
      // Rotates image counter-clockwise and floorplan.bearing has rotation clockwise therefore 360-[degrees] is needed
      rotate: 360 - floorplan.bearing
    };

    // Remove previous overlay if it exists
    if (groundOverlay != null) {
      // alert("calling the remove overlay if it exists call 4"); //added
      groundOverlay.setMap(null);
    }

    // Creates new GroundOverlayEX for displaying floorplan in Google Maps
    // Custom class GroundOverlayEX is used to do this because Google Maps JavaScript API doesn't support rotation
    groundOverlay = new GroundOverlayEX(floorplan.url, bounds, options);

    // Displays the overlay in the map
    // groundOverlay.setMap(venuemap);
    // changed the zoom to be more out was 20
    // venuemap.setZoom(16);

  },

  // Updates the ground overlay
  updateOverlay: function(id) {
    // alert("updaing the ground overlay 5"); //added
    var win = function(floorplan) {
      SpinnerPlugin.activityStop();
      //added
      var block = document.getElementById('centered');
          // var hbuildingfloor1div = document.getElementById('hBuildingFloor1');
          if (block.style.display === 'none'){
            // hbuildingfloor1div.÷style.display = 'block';
            block.style.display = 'block';
          } else {
            // hbuildingfloor1div.style.display = 'none';
            block.style.display = 'none';
          }
      cordovaExample.setMapOverlay(floorplan);

    };
    var fail = function(error) {
      SpinnerPlugin.activityStop();
      // alert(error.message);
    };

    // Gets the floorplan with the given region ID (floorplan ID) and then continues as specified earlier
    IndoorAtlas.fetchFloorPlanWithId(id, win, fail);
  },

  // Calculates length of degree of latitude and longitude according to the given latitude. Returns both of these lengths.
  calculateLongLatDegreesInMeters: function(latitude) {
    var lat = Math.PI * latitude / 180;

    // Constants for calculating lengths
    var m1 = 111132.92;
    var m2 = -559.82;
    var m3 = 1.175;
    var m4 = -0.0023;
    var p1 = 111412.84;
    var p2 = -93.5;
    var p3 = 0.118;

    // Calculate the length of a degree of latitude and longitude in meters
    var lengthOfDegreeOfLatitudeInMeters = m1 + (m2 * Math.cos(2 * lat)) + (m3 * Math.cos(4 * lat)) + (m4 * Math.cos(6 * lat));
    var lengthOfDegreeOfLongitudeInMeters = (p1 * Math.cos(lat)) + (p2 * Math.cos(3 * lat)) + (p3 * Math.cos(5 * lat));

    var lengths = {degreeOfLatitudeInMeters: lengthOfDegreeOfLatitudeInMeters, degreeOfLongitudeInMeters: lengthOfDegreeOfLongitudeInMeters};
    return lengths
  }
};











