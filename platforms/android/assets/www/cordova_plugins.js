cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/cordova-plugin-dialogs/www/notification.js",
        "id": "cordova-plugin-dialogs.notification",
        "merges": [
            "navigator.notification"
        ]
    },
    {
        "file": "plugins/cordova-plugin-dialogs/www/android/notification.js",
        "id": "cordova-plugin-dialogs.notification_android",
        "merges": [
            "navigator.notification"
        ]
    },
    {
        "file": "plugins/cordova-plugin-spinner/www/spinner-plugin.js",
        "id": "cordova-plugin-spinner.SpinnerPlugin",
        "clobbers": [
            "SpinnerPlugin"
        ]
    },
    {
        "file": "plugins/cordova-plugin-indooratlas/www/Coordinates.js",
        "id": "cordova-plugin-indooratlas.Coordinates",
        "clobbers": [
            "Coordinates"
        ]
    },
    {
        "file": "plugins/cordova-plugin-indooratlas/www/PositionError.js",
        "id": "cordova-plugin-indooratlas.PositionError",
        "clobbers": [
            "PositionError"
        ]
    },
    {
        "file": "plugins/cordova-plugin-indooratlas/www/Position.js",
        "id": "cordova-plugin-indooratlas.Position",
        "clobbers": [
            "Position"
        ]
    },
    {
        "file": "plugins/cordova-plugin-indooratlas/www/Region.js",
        "id": "cordova-plugin-indooratlas.Region",
        "clobbers": [
            "Region"
        ]
    },
    {
        "file": "plugins/cordova-plugin-indooratlas/www/IndoorAtlas.js",
        "id": "cordova-plugin-indooratlas.IndoorAtlas",
        "clobbers": [
            "IndoorAtlas"
        ]
    },
    {
        "file": "plugins/cordova-plugin-indooratlas/www/FloorPlan.js",
        "id": "cordova-plugin-indooratlas.FloorPlan",
        "clobbers": [
            "FloorPlan"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-whitelist": "1.2.2",
    "cordova-plugin-dialogs": "1.3.1",
    "cordova-plugin-spinner": "1.1.0",
    "cordova-plugin-indooratlas": "1.0.0"
};
// BOTTOM OF METADATA
});