
var datamap0, datamap1, datamap2;
var mode = MODE_ALPHA; // MODE_ALPHA defined in maps.js
				   // This mode is used to animate data display
				   // It uses an alpha factor to compute a value between two properties
var current_property = "";
var current_color_c1 = "";
var current_color_c2 = "";
var current_color_brewer = "";
var alphaInterval; // Used to control interval for alpha value
var alpha = 0.0;
var alpha_count = 0;

var current_marker = null;

function setDisplayProperty(iName){
	
	datamap0.setDisplayProperty(iName+"_90");
	datamap1.setDisplayProperty(iName+"_00");
	datamap2.setDisplayProperty(iName+"_10");

}

function setColorBrewer(iColor){
	
	datamap0.setColorBrewer(iColor);
	if (mode==MODE_DIRECT) {
	 datamap1.setColorBrewer(iColor);
	 datamap2.setColorBrewer(iColor);
	}

}

function setColorGradient(iC1,iC2){
	
	datamap0.setGradient(iC1, iC2);
	if (mode==MODE_DIRECT) {
	 datamap1.setGradient(iC1, iC2);
	 datamap2.setGradient(iC1, iC2);
	}

}

function setProperty(name, color1, color2) {

	 current_property = name;
	 current_color_c1 = color1;
	 current_color_c2 = color2;
	 current_color_brewer = "";

	 setColorGradient(color1, color2);

	 if (mode==MODE_ALPHA) {	

	 	datamap0.setMode(MODE_ALPHA);
		// Here the property is not used, it is set later when timer runs

	 } else {

	 	datamap0.setMode(MODE_DIRECT);
		datamap1.setMode(MODE_DIRECT);
		datamap2.setMode(MODE_DIRECT);
	 	
		setDisplayProperty(name);

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

	 } else {
	 
	     datamap0.setMode(MODE_DIRECT); 				   // set mode alpha for the map	
	 	datamap1.setMode(MODE_DIRECT); 
		datamap2.setMode(MODE_DIRECT); 

		setDisplayProperty(name);

	 }

}

function setupDataInterval(){

    alphaInterval = setInterval(function(){

		alpha_count++;
		if (alpha_count>=20) alpha_count=0;
		$("#date").html((1990+alpha_count));

		if ((alpha_count>=0) && (alpha_count<=10)) {	
			alpha = 1.0*alpha_count/10;
			datamap0.setAlpha(alpha); 	
			datamap0.setDisplayPropertyAlpha( current_property+"_90", current_property+"_00");
		} else {
			alpha = 1.0*(alpha_count-10)/10;
			datamap0.setAlpha(alpha); 	
			datamap0.setDisplayPropertyAlpha( current_property+"_00", current_property+"_10");
		}				

    }, 200);

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

function initAlphaMode(){

	removeMaps();	

	mode = MODE_ALPHA;	

	$("#map0").removeClass("col-md-4");
	$("#map0").addClass("col-md-12");
	$(".toHide").hide();	

	/*Setup Map 0 in Alpha mode that will switch between 1990-2000-2010 */
	datamap0 = new Datamap('map0', 42.354, -71.065, "./geodata/common/dataset/" );
	datamap0.initMap(true);
	datamap0.setMode(mode);
	datamap0.setButton("fa-windows","Switch layout ...",function(){
		
		if (!datamap0.fullscreen) {
			init3ViewsMode();
		}

	});
	setTimeout( setupDataInterval , 1000 ); // not really clean but easy

	if (current_color_brewer!="") { // To come back on same settings
		setColorBrewer(current_color_brewer);
	} else if (current_color_c1!="") {
		setColorGradient(current_color_c1, current_color_c2);
	}

	setMarker();

}

function init3ViewsMode(){

	removeMaps();	

	mode = MODE_DIRECT;

	if (alphaInterval) clearInterval(alphaInterval);

	$(".toHide").show();
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
		initAlphaMode();
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
		} else if (current_color_c1!="") {
			setColorGradient(current_color_c1, current_color_c2);
		}
		if (current_property!="") setDisplayProperty(current_property);

	}, 1000);

	setMarker();

}

function initDataMap(){

     //initAlphaMode();
	init3ViewsMode();

}


function bindAddress(){

	var address=$("#address").val();

    	$.ajax({
    		type: "GET",
    		url: "http://nominatim.openstreetmap.org/search",
    		data: { q: address, format: "json", polygon : "1" , addressdetails :"1" }
		})
		.done(function( data ) {
        	
		current_marker = data[0];
        	setMarker();
        	
    	});


}

$(function() {

    initDataMap();

    setTimeout( initMapRouter , 1000 ); // not really clean but easy
    
    $("#sendaddress").click(bindAddress);

    $("#address").keypress(function(e){
    	  if(e.which == 13){
    	  	bindAddress();
    	  	e.preventDefault();
    	  }
    });
      
});


$.ajax({
	url: 'https://api.foursquare.com/v2/venues/4cd1a0b17f56a1434795d5a6?oauth_token=2D2CXQUH5IWPUSKYIDLWO0CLWPDVLJ0FPCNBS41HYCDKXGCX&v=20140916',
	type: 'GET',
	dataType: 'jsonp',
	data: {param1: 'price'},
})
.done(function(data) {
	console.log(data)
	console.log(data.response.venue.price.tier);
	console.log(data.response.venue.price.message);
	console.log(data.response.venue.location.lat);
	console.log(data.response.venue.location.lng);
	//for(var venue in data.)
})
.fail(function(error) {
	console.log(error);
})
.always(function() {
	console.log("complete");
});


//function dataMap.on('move', function(e){
//	console.log(getBounds());
//});

