
var datamap0, datamap1, datamap2;

function setProperty(name, color1, color2) {

	 datamap0.setGradient(color1, color2);
	 datamap0.setDisplayProperty(name+"_90");

	 datamap1.setGradient(color1, color2);
	 datamap1.setDisplayProperty(name+"_00");

	 datamap2.setGradient(color1, color2);
	 datamap2.setDisplayProperty(name+"_10");

}

function initDataMap(){

	  /*Setup Map 0: 1990 tracts */
	  datamap0 = new Datamap('map0', 42.354, -71.065, "./geodata/common/dataset/" );	
	  	
	  /* Setup Map 1: 2000 tracts */
	  datamap1 = new Datamap('map1', 42.354, -71.065, "./geodata/common/dataset/" );	
	  
	  /* Setup map 2: 2010 tracts */
	  datamap2 = new Datamap('map2', 42.354, -71.065, "./geodata/common/dataset/" );	
	  
	  setProperty("medianrent", "yellow", "red");

	  datamap0.initMap();
	  datamap1.initMap();	
       datamap2.initMap();

	  // synchronize three maps
       datamap0.getMap().sync(datamap1.getMap());
       datamap0.getMap().sync(datamap2.getMap());
	  datamap1.getMap().sync(datamap0.getMap());
       datamap1.getMap().sync(datamap2.getMap());
	  datamap2.getMap().sync(datamap0.getMap());
       datamap2.getMap().sync(datamap1.getMap());

}


function bindAddress(){

	var address=$("#address").val();

    	$.ajax({
    		type: "GET",
    		url: "http://nominatim.openstreetmap.org/search",
    		data: { q: address, format: "json", polygon : "1" , addressdetails :"1" }
		})
		.done(function( data ) {
        	console.log(data);
        	datamap0.getMap().setView(data[0]);
        	L.marker(data[0]).addTo(datamap0.getMap());
        	L.marker(data[0]).addTo(datamap1.getMap());
        	L.marker(data[0]).addTo(datamap2.getMap());
    	});


}

$(function() {

	  initDataMap();

	  setTimeout( initMapRouter , 2000 ); // not really clean but easy

	  /*
	  $("#pctpoverty").click( function(){
			setProperty("pctpoverty", "#07E500", "blue"); 
	  });

       $("#medianrent").click( function(){
			setProperty("medianrent", "yellow", "red"); 
	  });
	  */

	  

    
    $("#sendaddress").click(bindAddress);

    $("#address").keypress(function(e){
    	  if(e.which == 13){
    	  	bindAddress();
    	  	e.preventDefault();
    	  }
    });
      

  });



