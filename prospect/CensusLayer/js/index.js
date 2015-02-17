
$(function() {

	var map = L.map('map').setView([42.354, -71.065], 13);

	this.tileLayer = new L.StamenTileLayer("toner").addTo(map);

	var aCensusLayer = new CensusLayer("../../geodata/common/dataset/");
	map.addLayer(aCensusLayer);

	aCensusLayer.setProperty("medianrent", "OrRd");

});
