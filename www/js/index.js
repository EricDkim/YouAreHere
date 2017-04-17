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

var GOOGLE_API_KEY = 'AIzaSyAzXNyHtYRnUl8l_ZyIWJ_NsTf-AYwBhBA';

var IA_API_KEY = 'acb20002-c1c8-4da7-882a-4ec0fbffad82';
var IA_API_SECRET = '/WR8nloUygtkltkPzRW3i/Lu5o6YR21BExwqYdq8GDlH2rLelYbe4NwxIWUNQcQLH6J/gCIP1H3B13HBsnw5ZZ+McSiZ9WQIcSUtyLfRrRAldbiFH0W6nv+pO+pvrw==';


var IA_FLOORPLAN_ID;

var app = {
  initialize: function() {
    this.bindEvents();
  },
  bindEvents: function() {
    document.addEventListener('deviceready', this.onDeviceReady, false);
  },
  onDeviceReady: function() {
    app.receivedEvent('deviceready');
    cordovaExample.configureIA();
  },
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

$("#selectBuilding").change(function() {
    var building_selection = $("#selectBuilding").val();
    var floor_selection = $("#selectfloor").val();
    if (building_selection === "A") {
        IA_FLOORPLAN_ID = 'c49491e5-6c4b-43a4-9c83-e4853435a95b';
        $("#selectfloor").val("G").trigger("change");
        $("#selectfloor").selectmenu("disable", true);
    } else if (building_selection === "H") {
        $("#selectfloor").selectmenu("enable", true);
        IA_FLOORPLAN_ID = '7de47cbe-c232-4875-b3d7-324b1ba15ed9';
    } else {
        $("#selectfloor").selectmenu("enable", true);
    }
});



var image;
var venuemap;
var groundOverlay = null;
var cordovaExample = {
  watchId : null,
  regionWatchId : null,
  marker : null,
  retina : window.devicePixelRatio > 1 ? true : false,

  configureIA: function() {
    var _config = {
        key: IA_API_KEY,  
        secret: IA_API_SECRET};
    IndoorAtlas.initialize(this.IAServiceConfigured, this.IAServiceFailed, _config);
    return false;
  },
  IAServiceFailed: function(result) {
    cordovaExample.configureIA();
  },
  IAServiceConfigured: function(result) {
    cordovaExample.initializeMap();
  },
  showLocation: function(position) {
    SpinnerPlugin.activityStop();
    try {
      var center = {lat: position.coords.latitude, lng: position.coords.longitude};

      if (this.marker != null) {
        this.marker.setPosition(center);
      }
      else {
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
    }
    catch(error) {
    };
  },

  setPosition: function(options) {
    
      var building_selection = $("#selectBuilding").val();
    
      if (IA_FLOORPLAN_ID != "") {

      try {
        SpinnerPlugin.activityStart('Setting location');
        var win = function() {

          SpinnerPlugin.activityStop();
          cordovaExample.startRegionWatch();
        };
        var fail = function(error){
          SpinnerPlugin.activityStop();

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
  startPositioning: function() {
    if (this.watchId != null) {
      IndoorAtlas.clearWatch(this.watchId);
    }
    this.watchId = IndoorAtlas.watchPosition(this.showLocation, this.IAServiceFailed);
    cordovaExample.startRegionWatch();
  },
  getLocationCall: function() {
    SpinnerPlugin.activityStart('Fetching location. Move around');
    IndoorAtlas.getCurrentPosition(this.showLocation, this.IAServiceFailed);
  },
  stopPositioning: function() {
    IndoorAtlas.clearWatch(this.watchId);
    cordovaExample.stopRegionWatch();
    alert("Stopping Navigation");
  },
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
  stopRegionWatch: function() {
    IndoorAtlas.clearRegionWatch(this.regionWatchId);
  },
  initializeMap: function() {

        var buildingLatLng = $("#selectBuilding").val();

        if (buildingLatLng === "A") {
          var mapProp = new google.maps.Map(document.getElementById('map'),{
            center: new google.maps.LatLng(33.979452859103866, -84.00100886821748),
            zoom: 20,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            mapTypeControl: false,
            streetViewControl: false
          });
          var bounds = new google.maps.LatLngBounds(
              new google.maps.LatLng(33.880934, -83.003403),
              new google.maps.LatLng(33.179635, -84.004015));
          var srcImage = "img/building-a-map.svg";

        } else if (buildingLatLng === "H") {
          var mapProp = new google.maps.Map(document.getElementById('map'),{
            draggable: false,
            scrollWheel: false,
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
    image ={
      path: google.maps.SymbolPath.CIRCLE,
      fillColor: '#00A5F6',
      fillOpacity: 1.0,
      scale: 4.0,
      strokeColor: '#00A5F6',
      strokeWeight: 1
    };
    venuemap = new google.maps.Map(document.getElementById('googleMap'), mapProp);
    cordovaExample.mapOverlay({regionId: IA_FLOORPLAN_ID});
  },

  mapOverlay: function(position) {
    try {
      SpinnerPlugin.activityStart('Setting overlay');
      var win = function(floorplan) {
        SpinnerPlugin.activityStop();
          var block = document.getElementById('centered');
          if (block.style.display === "none"){
            block.style.display = "block";
          } else {
            block.style.display = "none";
          }
        cordovaExample.setMapOverlay(floorplan);

      };
      var fail = function(error) {
        SpinnerPlugin.activityStop();
      };

      IndoorAtlas.fetchFloorPlanWithId(position.regionId, win, fail);
    }
    catch(error) {
      // alert(error);
    }
  },

  setMapOverlay: function(floorplan) {
    var center = floorplan.center;
    var pixelsToMeters = floorplan.pixelsToMeters;
    var heightForCoordinates = floorplan.bitmapHeight/2;
    var widthForCoordinates = floorplan.bitmapWidth/2;

    var metersHorizontal = widthForCoordinates * pixelsToMeters;
    var metersVertical = heightForCoordinates * pixelsToMeters;

    var lengths = cordovaExample.calculateLongLatDegreesInMeters(center[1]);

    var longitudes = metersHorizontal / lengths.degreeOfLongitudeInMeters;
    var latitudes = metersVertical / lengths.degreeOfLatitudeInMeters;

    var swCoords = new google.maps.LatLng({lat: center[1] - latitudes, lng: center[0] - longitudes});
    var neCoords = new google.maps.LatLng({lat: center[1] + latitudes, lng: center[0] + longitudes});

    var bounds = new google.maps.LatLngBounds(swCoords , neCoords);

    var options = {
      rotate: 360 - floorplan.bearing
    };

    if (groundOverlay != null) {

      groundOverlay.setMap(null);
    }

    groundOverlay = new GroundOverlayEX(floorplan.url, bounds, options);

  },
  updateOverlay: function(id) {
    var win = function(floorplan) {
      SpinnerPlugin.activityStop();
      var block = document.getElementById('centered');
          if (block.style.display === 'none'){
            block.style.display = 'block';
          } else {
            block.style.display = 'none';
          }
      cordovaExample.setMapOverlay(floorplan);
    };
    var fail = function(error) {
      SpinnerPlugin.activityStop();
    };
    IndoorAtlas.fetchFloorPlanWithId(id, win, fail);
  },

  calculateLongLatDegreesInMeters: function(latitude) {
    var lat = Math.PI * latitude / 180;

    var m1 = 111132.92;
    var m2 = -559.82;
    var m3 = 1.175;
    var m4 = -0.0023;
    var p1 = 111412.84;
    var p2 = -93.5;
    var p3 = 0.118;

    var lengthOfDegreeOfLatitudeInMeters = m1 + (m2 * Math.cos(2 * lat)) + (m3 * Math.cos(4 * lat)) + (m4 * Math.cos(6 * lat));
    var lengthOfDegreeOfLongitudeInMeters = (p1 * Math.cos(lat)) + (p2 * Math.cos(3 * lat)) + (p3 * Math.cos(5 * lat));

    var lengths = {degreeOfLatitudeInMeters: lengthOfDegreeOfLatitudeInMeters, degreeOfLongitudeInMeters: lengthOfDegreeOfLongitudeInMeters};
    return lengths
  }
};











