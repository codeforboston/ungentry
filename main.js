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
            //"about": "src/about.js",
	    'iwindow': 'src/iwindow',
            "hoverTract": "src/hoverTract",
            "subselect": "src/subselect",
            "variables": "src/variables",
            "categories": "src/categories",
            "varMenus": "src/varMenus",
	    'legend': 'src/legend',
	    'roll': 'src/roll'
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

require(['script',
         'routes',
         'legend',
         "roll",
         "iwindow",
         "varMenus",
         "bootstrap",
         "jquery-ui"
        ],
        function(S, routes, legend, roll, iwindow, menus){
	    legend.init();
	    S.bootstrap();
	    routes.init();
            iwindow.init();
            menus.init();

            $( window ).resize(function() {

	  	if ($('body').width() > 1000){

	  	    $("#map0").css('display', "inline-block");
	  	    $("#map1").css('display', "inline-block");
	  	    $("#map2").css('display', "inline-block");

	  	}
	    });

	    $(window).load(function(){
                $('#welcomeModal').modal('show');
            });
        }
       );
