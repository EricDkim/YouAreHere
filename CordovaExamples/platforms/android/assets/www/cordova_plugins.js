cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "id": "cordova-plugin-spinner.SpinnerPlugin",
        "file": "plugins/cordova-plugin-spinner/www/spinner-plugin.js",
        "pluginId": "cordova-plugin-spinner",
        "clobbers": [
            "SpinnerPlugin"
        ]
    },
    {
        "id": "cordova-plugin-indooratlas.Coordinates",
        "file": "plugins/cordova-plugin-indooratlas/www/Coordinates.js",
        "pluginId": "cordova-plugin-indooratlas",
        "clobbers": [
            "Coordinates"
        ]
    },
    {
        "id": "cordova-plugin-indooratlas.PositionError",
        "file": "plugins/cordova-plugin-indooratlas/www/PositionError.js",
        "pluginId": "cordova-plugin-indooratlas",
        "clobbers": [
            "PositionError"
        ]
    },
    {
        "id": "cordova-plugin-indooratlas.Position",
        "file": "plugins/cordova-plugin-indooratlas/www/Position.js",
        "pluginId": "cordova-plugin-indooratlas",
        "clobbers": [
            "Position"
        ]
    },
    {
        "id": "cordova-plugin-indooratlas.Region",
        "file": "plugins/cordova-plugin-indooratlas/www/Region.js",
        "pluginId": "cordova-plugin-indooratlas",
        "clobbers": [
            "Region"
        ]
    },
    {
        "id": "cordova-plugin-indooratlas.IndoorAtlas",
        "file": "plugins/cordova-plugin-indooratlas/www/IndoorAtlas.js",
        "pluginId": "cordova-plugin-indooratlas",
        "clobbers": [
            "IndoorAtlas"
        ]
    },
    {
        "id": "cordova-plugin-indooratlas.FloorPlan",
        "file": "plugins/cordova-plugin-indooratlas/www/FloorPlan.js",
        "pluginId": "cordova-plugin-indooratlas",
        "clobbers": [
            "FloorPlan"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-whitelist": "1.3.1",
    "cordova-plugin-spinner": "1.1.0",
    "cordova-plugin-indooratlas": "1.0.0"
};
// BOTTOM OF METADATA
});