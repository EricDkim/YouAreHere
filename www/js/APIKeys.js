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

// Floorplan ID https://developer.indooratlas.com/venues
// have a selector (if statement or switch statement) to get the value of the building then use that value
// and use the appropriate floorplan_id for the app

// Create variable to grab the current building selector value

//var building_selection = $(this).val(); //<-- Setting this value globally in index.js might fix issue

// var building_selection = document.getElementById('select-building');

// Create a switch statement to handle the building floor plan id
// switch(sbuilding_selection) {
//     case 'A':
//         alert("Building A floor plan id is being used!");
//         // floorplan id for A
//         var IA_FLOORPLAN_ID = 'c49491e5-6c4b-43a4-9c83-e4853435a95b';
//         break;
//     case 'B':
//         alert("Building B floor plan id is being used!");
//         // Floor plan has not been created
//         break;
//     case 'C':
//         alert("Building C floor plan id is being used!");
//         // Floor plan has not been created
//         break;
//     case 'H':
//         alert("Building H floor plan id is being used!");
//         // floorplan id for H
//         var IA_FLOORPLAN_ID = '7de47cbe-c232-4875-b3d7-324b1ba15ed9';
//        // break;
//     //default : 
//       //  alert("You did not select a building.");
// }

// floorplan id for A
var IA_FLOORPLAN_ID = 'c49491e5-6c4b-43a4-9c83-e4853435a95b';
 
// floorplan id for H
var IA_FLOORPLAN_ID = '7de47cbe-c232-4875-b3d7-324b1ba15ed9'
