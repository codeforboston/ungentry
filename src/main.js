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
		'censusLayer': '../src/scripts/censusLayer',
		'script': '../src/scripts/script',
		'routes': '../src/scripts/routes',
		'legend': '../src/scripts/legend',
		'iwindow': '../src/scripts/iwindow',
              'hoverTract': '../src/scripts/hoverTract',
              'subselect': '../src/scripts/subSelect',
              'variables': '../src/scripts/variables',
              'categories': '../src/scripts/categories',
              'varMenus': '../src/scripts/varMenus',
              'colors': '../src/scripts/colors',
              'intro': '../src/scripts/intro'	
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
