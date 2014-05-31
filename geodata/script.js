(function () {
  var map = new L.Map('map').setView([42.3334, -71.0270], 13);
  var mapQuest = L.tileLayer('http://otile{s}.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.jpeg', {
    attribution: 'Tiles Courtesy of <a href="http://www.mapquest.com/">MapQuest</a> &mdash; Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
    subdomains: '1234'
  }).addTo(map);
  var tracts2010 = L.geoJson.ajax("geodata/tracts2010.json",{
      middleware:function(data){
        return topojson.feature(data, data.objects.tracts2010);
      },
	  style: function(feature){
	    var featureId = feature.id;
		var d = censusData[2008][featureId].totalpop;
		var fill = d > 5944 ? '#800026' :
			       d > 5323  ? '#BD0026' :
			       d > 4777  ? '#E31A1C' :
			       d > 4146  ? '#FC4E2A' :
			       d > 3552   ? '#FD8D3C' :
			       d > 2970   ? '#FEB24C' :
			       d > 2215   ? '#FED976' :
			                  '#FFEDA0';

	  	return {
			weight: 1,
			color: "#ff0000",
			fillColor: fill
		};
	}
  }).addTo(map);
  var tracts2000 = L.geoJson.ajax("geodata/tracts2000.json",{
      middleware:function(data){
        return topojson.feature(data, data.objects.tracts2000);
      },
	  style: function(feature){
	    var featureId = feature.id;
		var d = censusData[2000][featureId].totalpop;
		var fill = d > 5944 ? '#800026' :
			       d > 5323  ? '#BD0026' :
			       d > 4777  ? '#E31A1C' :
			       d > 4146  ? '#FC4E2A' :
			       d > 3552   ? '#FD8D3C' :
			       d > 2970   ? '#FEB24C' :
			       d > 2215   ? '#FED976' :
			                  '#FFEDA0';

	  	return {
			weight: 1,
			color: "#ff0000",
			fillColor: fill
		};
	  }
  });
  
  var censusData;
  L.Util.ajax('geodata/allcensusacsdata.json').then(function(data) {
	  censusData = data;
  });
 
  var baseLayers = {
    "Map Quest": mapQuest
  };

  var overlays = {
      "2010 Tracts": tracts2010,
      "2000 Tracts": tracts2000
  };

  L.control.layers(baseLayers, overlays).addTo(map);
}());