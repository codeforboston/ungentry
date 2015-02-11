define([
  'leaflet',
  'censusLayer',
  'stamen',
  'mapSync'
  ], function(L, CensusLayer){

    var map0, map1, map2;
    var census0, census1, census2;

    function setPropertyBrewer(iName, iColorBrewerName) {

    	census0.setProperty(iName+"_90",iColorBrewerName);
    	census1.setProperty(iName+"_00",iColorBrewerName);
    	census2.setProperty(iName+"_10",iColorBrewerName);

    }

    // ############################ MAPS SETUP STATIC ############################# //

    // Initialization method that setup the UI to display 3 maps
    function init3ViewsMode(){

    	$("#date").html("1990");

    	map0 = L.map('map0').setView([42.354, -71.065], 13);
    	new L.StamenTileLayer("toner").addTo(map0);
    	census0 = new CensusLayer(map0, "./geodata/common/dataset/");
    	map0.addLayer(census0);

    	map1 = L.map('map1').setView([42.354, -71.065], 13);
    	new L.StamenTileLayer("toner").addTo(map1);
    	census1 = new CensusLayer(map1, "./geodata/common/dataset/");
    	map1.addLayer(census1);

    	map2 = L.map('map2').setView([42.354, -71.065], 13);
    	new L.StamenTileLayer("toner").addTo(map2);
    	census2 = new CensusLayer(map2, "./geodata/common/dataset/");
    	map2.addLayer(census2);

    	// synchronize three maps

    	map0.sync(map1);
    	map0.sync(map2);

    	map1.sync(map0);
    	map1.sync(map2);

    	map2.sync(map0);
    	map2.sync(map1);

    	setMarker();

    }

    // ################# MAP Init ###########################
    // Initialization method to build maps context
    // Switch in 3 maps context i.e. displaying 3 different
    // periods 1990 2000 2010
    //
    // Setup also links for responsive mode
    //
    function initDataMap(){

    	init3ViewsMode(); // init the view with 3 maps

    	$('#link_1900').click(function(event) {
    	  event.preventDefault();
    	  console.log('clicked 1900');
    	  $('#map1').hide();
    	  $('#map2').hide();
    	});
    	$('#link_2000').click(function(event) {
    	  event.preventDefault();
    	  console.log('clicked 2000');
    	  $('#map0').hide();
    	  $('#map1').show();
    	  $('#map2').hide();
    	});
    	$('#link_2010').click(function(event) {
    	  event.preventDefault();
    	  console.log('clicked 2010');
    	  $('#map0').hide();
    	  $('#map1').hide();
    	  $('#map2').show();
    	});

    }

    // ############### GEOLOCATE ##############################
    // Geolocate methods
    // Used to implement search address, that setup a marker
    // Here we call nominatim server to geolocate the address

    var last_marker = [];
    var current_marker = null;

    // Adding a marker
    function addMarker(iPos, ioMap, iCurrentMarker) {

    	if (last_marker[iPos]!=null) {
    		ioMap.removeLayer(last_marker[iPos]);
    	}
    	last_marker[iPos] = L.marker(iCurrentMarker).addTo(ioMap);

    }

    // Set a marker on all maps depending on the current mode
    function setMarker(){

    	if (current_marker!=null) {

    		map0.setView(current_marker, 16,  {
    			reset : true,
    			animate :true
    		});

    		addMarker(0, map0, current_marker);

    		//map1.setView(current_marker);
    		addMarker(1, map1, current_marker);

    		//map2.setView(current_marker);
    		addMarker(2, map2, current_marker);

    	}

    }

    // Perform search in nominatim address method
    function bindAddress(){

    	// retrieve the address value
    	var address=$("#address").val();

    	// perform ajax call to nominatim
        	$.ajax({
        		type: "GET",
        		url: "https://nominatim.openstreetmap.org/search",
        		data: { q: address, format: "json", polygon : "1" , addressdetails :"1" }
    		})
    		.done(function( data ) { // if address found

    		// takes the first geolocated data
    		// and record current_marker variable
    		current_marker = data[0];
    		// draws a marker from geolocated point
    		setMarker();

        	});

    }

    // Binds search button + return key to the address
    function initGeolocate(){

        $("#sendaddress").click(bindAddress);

        $("#address").keypress(function(e){
        	  if(e.which == 13){
        	  	bindAddress();
        	  	e.preventDefault();
        	  }
        });

    }


    return {
      setPropertyBrewer: setPropertyBrewer,
      bootstrap: function(){
        // #################### MAIN  ###############################
        // Main initialization method
        // When all page libraries are loaded this function is called
        //
        // Initializing maps
        initDataMap();

        // Initialization geolocation search buttons & field
        initGeolocate();
      }
    }

});
