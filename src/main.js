require.config({
	shim: {
		"bootstrap" : { "deps" :['jquery'] }
	},
	paths: {
		'jquery': '../lib/jquery-1.11.2.min',
		'jquery-ui': '../lib/jquery-ui-1.11.2/jquery-ui.min',
		'backbone': '../lib/backbone-min',
		'underscore': '../lib/underscore-min',
		'bootstrap': '../lib/bootstrap/bootstrap.min',
		'colorbrewer': '../lib/colorbrewer',
		'fullScreen': '../lib/Control.FullScreen',
		'easybutton': '../lib/easy-button',
		'geostats': '../lib/geostats',
		'mapSync': '../lib/L.Map.Sync',
		'rainbow': '../lib/rainbowvis',
		'topojson': '../lib/topojson.v1.min',
		'leaflet': '../lib/leaflet-0.7.3/leaflet',
		'stamen': '../lib/tile.stamen',
		'timeslider': 'timeslider',
		'map': 'maps',
		'router': 'routes',
		'script': 'script'
	}

});

require(['app', 'leaflet', 'bootstrap'], function(App, L, bootstrap){
	window.L = L; // This is annoying but it is the easiest way to quickly get leaflet plugins (which rely on the browser global 'L') to be OK in requirejs without jumping through too many hoops...

	App.initialize();

});
