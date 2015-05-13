require.config({

	paths: {
		'jquery': 'lib/jquery-1.11.2.min',
		'jquery-ui': 'lib/jquery-ui-1.11.1',
		'backbone': 'lib/backbone-min',
		'underscore': 'lib/underscore-min',
		'bootstrap': 'lib/bootstrap/bootstrap.min',
		'leaflet': 'lib/leaflet-0.7.3/leaflet',
		'leaflet.ajax': 'lib/leaflet.ajax',
		'mapSync': 'lib/L.Map.Sync',
		'stamen': 'lib/stamen',
		'colorbrewer': 'lib/colorbrewer',
		'fullScreen': 'lib/Control.FullScreen',
		'easybutton': 'lib/easy-button',
		'geostats': 'lib/geostats',
		'rainbow': 'lib/rainbowvis',
		'topojson': 'lib/topojson.v1.min',
		'censusLayer': 'src/censusLayer',
		'timeslider': 'src/timeslider',
		'script': 'src/script',
		'routes': 'src/routes',
		'legend': 'src/legend',
		'iwindow': 'src/iwindow',
             'hoverTract': 'src/hoverTract',
            'subselect': 'src/subSelect',
            "variables": "src/variables",
            "categories": "src/categories",
            "varMenus": "src/varMenus"
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
		'stamen': {
			deps: ['leaflet']
		},
		'backbone': {
			deps: ['jquery', 'underscore']
		},
		'bootstrap': {
			deps: ['jquery']
		}
	}

});

require(['script', 'routes', 'legend',
         "iwindow", "varMenus", 'bootstrap', 'jquery-ui'],
        function(S, routes, legend, iwindow, varMenus){
	    legend.init();
	    //roll.init();
	    S.bootstrap();
	    routes.init();
            iwindow.init();
            varMenus.init();
});
