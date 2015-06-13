'use strict';
require.config({

	paths: {
		'jquery': '../lib/jquery-1.11.2.min',
		'jquery-ui': '../lib/jquery-ui-1.11.1',
		'backbone': '../lib/backbone-min',
		'underscore': '../lib/underscore-min',
		'bootstrap': '../lib/bootstrap/bootstrap.min',
		'tourLib' : '../lib/bootstrap-tour/bootstrap-tour.min',
		'leaflet': '../lib/leaflet-0.7.3/leaflet',
		'leaflet.ajax': '../lib/leaflet.ajax',
		'mapSync': '../lib/L.Map.Sync',
		'colorbrewer': '../lib/colorbrewer',
		'geostats': '../lib/geostats',
		'rainbow': '../lib/rainbowvis',
		'topojson': '../lib/topojson.v1.min',
		'censusLayer': 'scripts/censusLayer',
		'script': 'scripts/script',
		'routes': 'scripts/routes',
		'legend': 'scripts/legend',
		'iwindow': 'scripts/iwindow',
              'hoverTract': 'scripts/hoverTract',
              'subselect': 'scripts/subSelect',
              'variables': 'scripts/variables',
              'categories': 'scripts/categories',
              'varMenus': 'scripts/varMenus',
              'colors': 'scripts/colors',
              'intro': 'scripts/intro'	
       },

	shim: {
		'leaflet': {
			exports: 'L'
		},
		'mapSync': {
			deps: ['leaflet']
		},
		'leaflet.ajax': {
			deps: ['leaflet']
		},
		'backbone': {
			deps: ['jquery', 'underscore']
		},
		'bootstrap': {
			deps: ['jquery']
		},

		'tourLib': {
			deps: ['jquery', 'bootstrap']
		}
		
	}

});

require(['script', 'routes', 'legend', "iwindow", "varMenus", 'intro','bootstrap', 'jquery-ui'],

        function(S, routes, legend, iwindow, varMenus, intro){
	    legend.init();
	    S.bootstrap();
	    routes.init();
           iwindow.init();
           varMenus.init();
           intro.init();
});
