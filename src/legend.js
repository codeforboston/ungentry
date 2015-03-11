define(['jquery', 'leaflet', 'colorbrewer'], function($, L, colorbrewer){

	  		

	var self = this;
	var legend = L.control({position: 'bottomright'});
	self.legend.onAdd = function (lwrapper) {
					
	var div = L.DomUtil.create('div', 'info legend');
		if (self._currentProperty!=='') {

		  var prop = self._properties_data[self._currentProperty];

		if (prop) {
			var geo = prop.serie;


			div.innerHTML += '<h4>'+prop.title+'</h4>';
				for (var i = 0; i < 5; i++) {
			       var range_min = geo[i].toFixed(0);
      			    var range_max =  geo[i+1].toFixed(0);
			    var color =  self._getColor(geo, (parseFloat(range_max)+parseFloat(range_min))/2 );
			    div.innerHTML += '<i style="background: ' + color + ';"></i> '+ prop.unit + ' ' + range_min + " - " + prop.unit + ' ' + range_max  + '<br>';
							}
						}


					}
					//lwrapper.html(div);
					return div;
			    	};
				self.legend.addTo($('.lwrapper'));
				


});