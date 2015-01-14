require.config({

	paths: {
		'jquery': 'lib/jquery-1.11.2.min',
		'backbone': 'lib/backbone-min',
		'underscore': 'lib/underscore-min.js',
		'bootstrap': 'lib/bootstrap/bootstrap.min',
		'colorbrewer': 'lib/colorbrewer',
		'fullScreen': 'lib/Control.FullScreen',
		'easybutton': 'lib/easy-button',
		'geostats': 'lib/geostats',
		'mapSync': 'lib/L.Map.Sync',
		'rainbow': 'lib/rainbowvis',
		'topo': 'lib/topojson.v1.min'


	}

});

require(['app'], function(app){
	App.initialize();
});
