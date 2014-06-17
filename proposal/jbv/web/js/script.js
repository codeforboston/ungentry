
var datamap0, datamap1, datamap2;

function setProperty(name, color1, color2) {

	 datamap0.setGradient(color1, color2);
	 datamap0.setDisplayProperty(name);

	 datamap1.setGradient(color1, color2);
	 datamap1.setDisplayProperty(name);

	 datamap2.setGradient(color1, color2);
	 datamap2.setDisplayProperty(name);

}

function initDataMap(){

	  /*Setup Map 0: 1990 tracts */
	  datamap0 = new Datamap('map0', 42.354, -71.065, "./data/1990/dataset/" );	
	  	
	  /* Setup Map 1: 2000 tracts */
	  datamap1 = new Datamap('map1', 42.354, -71.065, "./data/2000/dataset/" );	
	  
	  /* Setup map 2: 2010 tracts */
	  datamap2 = new Datamap('map2', 42.354, -71.065, "./data/2010/dataset/" );	
	  
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


$(function() {

	  initDataMap();

	  $("#pctpoverty").click( function(){
			setProperty("pctpoverty", "#07E500", "blue"); 
	  });

       $("#medianrent").click( function(){
			setProperty("medianrent", "yellow", "red"); 
	  });
      

  });
