
var datamap0, datamap1, datamap2;
var mode = MODE_ALPHA; // MODE_ALPHA defined in maps.js
				   // This mode is used to animate data display
				   // It uses an alpha factor to compute a value between two properties
var current_property = "";
var current_color_brewer = "";
var alphaInterval; // Used to control interval for alpha value
var alpha = 0.0;
var alpha_count = 0;

var current_marker = null;

// Set the property to map 
function setDisplayProperty(iName){
	
	datamap0.setDisplayProperty(iName+"_90");
	datamap1.setDisplayProperty(iName+"_00");
	datamap2.setDisplayProperty(iName+"_10");

}

// They are 2 modes to display colors

// Brewer from the library colorbrewer.js
function setColorBrewer(iColor){
	
	datamap0.setColorBrewer(iColor);
	if (mode==MODE_DIRECT) {
	 datamap1.setColorBrewer(iColor);
	 datamap2.setColorBrewer(iColor);
	}

}

function setPropertyBrewer(name, iColorBrewerName) {

	 current_property = name;
	 current_color_c1 = "";
	 current_color_c2 = "";
	 current_color_brewer = iColorBrewerName;

	 setColorBrewer(iColorBrewerName);

	 if (mode==MODE_ALPHA) {	

	 	datamap0.setMode(MODE_ALPHA); 				   // set mode alpha for the map
		// Here the property is not used, it is set later when timer runs
		buildAlpha();

	 } else {
	 
	     datamap0.setMode(MODE_DIRECT); 				   // set mode direct for the map	
	 	datamap1.setMode(MODE_DIRECT); 
		datamap2.setMode(MODE_DIRECT); 

		setDisplayProperty(name);

	 }

}

function removeMaps(){

	if (datamap0) datamap0.remove();
	if (datamap1) datamap1.remove();
	if (datamap2) datamap2.remove();

	delete datamap0;
	delete datamap1;
	delete datamap2;

	datamap0 = null;
	datamap1 = null;
	datamap2 = null;

}

// ############## SLIDER/ANIMATION MANAGEMENT ############################## //
// This part can be included in maps.js as animation management

// Switch the color to the map among selected property
function buildAlpha(){

	if ((alpha_count>=0) && (alpha_count<=10)) {	
		alpha = 1.0*alpha_count/10;

		datamap0.setScaleSlider(0.5);
		datamap0.setShiftSlider(0.0);
		datamap0.setAlpha(alpha); 	
		datamap0.setDisplayPropertyAlpha( current_property+"_90", current_property+"_00");
	} else {
		alpha = 1.0*(alpha_count-10)/10;
		datamap0.setScaleSlider(0.5);
		datamap0.setShiftSlider(0.55);
		datamap0.setAlpha(alpha); 	
		datamap0.setDisplayPropertyAlpha( current_property+"_00", current_property+"_10");
	}	

}

function playAlpha(){

	alpha_count++;
	if (alpha_count>=20) alpha_count=0;
	$("#date").html((1990+alpha_count));
	buildAlpha();

}

function setupDataInterval(){

    alphaInterval = setInterval(function(){
		playAlpha();
    }, 200);

}

function pauseSlider(){
	clearInterval(alphaInterval);
}

function playSlider(){
	setupDataInterval(); // not really clean but easy
}

function changeSlider(event,ui){
	alpha_count = ui.value * 20;
	$("#date").html((1990+alpha_count));
	buildAlpha();
}

// ############################ MAPS SETUP ANIMATED/STATIC ############################# //

// Setup the animated maps
function initAnimatedMode(){

	// Remove all maps
	removeMaps();	

	mode = MODE_ALPHA;	

	// Switch map0 to full width
	$("#map0").removeClass("col-md-4");
	$("#map0").addClass("col-md-12");
	$(".toHide").hide();	

	/*Setup Map 0 in Alpha mode that will switch between 1990-2000-2010 */
	datamap0 = new Datamap('map0', 42.354, -71.065, "./geodata/common/dataset/" );

	// Methods binds to manage slider
	datamap0.setSlider(changeSlider);
	datamap0.setPauseSlider(pauseSlider);
	datamap0.setPlaySlider(playSlider);

	datamap0.initMap(true);
	datamap0.setMode(mode);
	// Setup the control to switch views
	datamap0.setButton("fa-windows","Switch layout ...",function(){
		
		if (!datamap0.fullscreen) {
			init3ViewsMode();
		}

	});

	if (current_color_brewer!="") { // To come back on same settings
	   setColorBrewer(current_color_brewer);
	}

	// Set the position of slider and current property we want to display
	setTimeout( function() {		
	     datamap0.setScaleSlider(0.5);
		datamap0.setShiftSlider(0.0);
		datamap0.setAlpha(0); 	
		datamap0.setDisplayPropertyAlpha( current_property+"_90", current_property+"_00");
	}, 1000);

	setMarker();

}


// Initialization method that setup the UI to display 3 maps
function init3ViewsMode(){

	// clears maps objects
	removeMaps();	

	// Setup mode 3 maps (DIRECT)
	mode = MODE_DIRECT;

	// clear the interval setuped if a animate view has been called previsouly 
	if (alphaInterval) clearInterval(alphaInterval);

	// hides maps 1-2
	$(".toHide").show();
	// setup class for map0 that switch it 1/3s screen instead plain view
	$("#map0").removeClass("col-md-12");
	$("#map0").addClass("col-md-4");

	$("#date").html("1990");

	/*Setup Map 0: 1990 tracts */
	datamap0 = new Datamap('map0', 42.354, -71.065, "./geodata/common/dataset/" );
	  	
	/* Setup Map 1: 2000 tracts */
	datamap1 = new Datamap('map1', 42.354, -71.065, "./geodata/common/dataset/" );	
	  
	/* Setup map 2: 2010 tracts */
	datamap2 = new Datamap('map2', 42.354, -71.065, "./geodata/common/dataset/" );	
	  
	datamap0.initMap(false);
	datamap0.setButton("fa-windows","Switch layout ...",function(){
		initAnimatedMode();
	});

	datamap1.initMap(false);	
     datamap2.initMap(false);

	// synchronize three maps
       
	datamap0.getMap().sync(datamap1.getMap());
     datamap0.getMap().sync(datamap2.getMap());
	datamap1.getMap().sync(datamap0.getMap());
     datamap1.getMap().sync(datamap2.getMap());
     datamap2.getMap().sync(datamap0.getMap());
     datamap2.getMap().sync(datamap1.getMap());

	setTimeout( function(){
		
		if (current_color_brewer!="") {
			setColorBrewer(current_color_brewer);
		} 
		if (current_property!="") setDisplayProperty(current_property);

	}, 1000);

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

// Set a marker on all maps depending on the current mode
function setMarker(){

	if (current_marker!=null) {
		datamap0.getMap().setView(current_marker);		
		datamap0.addMarker(current_marker);
		if (mode==MODE_DIRECT) {
			datamap1.addMarker(current_marker);
			datamap2.addMarker(current_marker);
		}
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

// #################### MAIN  ###############################
// Main initialization method
// When all page libraries are loaded this function is called
// 
$(function() {

    // Initializing maps
    initDataMap();

    // Initialization geolocation search buttons & field
    initGeolocate();

    // Initialize Backbone router in Router.js file
    // This is done with a timer so that the app have the time
    // to build first needed objects in maps : if the router is 
    // called as soon as initialized, it may call not present 
    // parameters. 
    setTimeout( initMapRouter , 2000 ); // not really clean but easy
       
});






