

function Datamap(ident, lat, lon, datapath){

	//L.Path.options.clickable = false; 
	L.FeatureGroup.EVENTS = ''; 

	this.ident = ident;
	this.lat = lat;
	this.lon = lon;	
	this.datapath = datapath;

	this.colors = new Rainbow(); 
	this.colors.setNumberRange(0, 100);	

	this.map;
	this.leafletMapId = 'jbv.id3fl8g2' ;
	this.leafletAttr = 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>';

	this.zoom_max = 18;
	this.zoom_area = [0,  11 , 13 , 15 , 17,  this.zoom_max];
	this.zoom_level = 0;
	this.zoom_change = true;

	this.loadingProp = false;

	this.mapbounds_data;
	this.properties_data;

	this.inner_index;

	this.base_folder;

	this.map_layers = {};
	this.must_load = 0;

	this.groupLayer;
	this.parts = [];
	this.layers_id = [];
	this.bounds_to_be_loaded = []; 
	this.map_cache = {};

	this.geostats_cache = {};

	this.setItemStyle = function(iItemStyleFunction){
		this.itemStyle = iItemStyleFunction;
	}

	this.setGradient = function(iC1,iC2){
		this.colors.setSpectrum(iC1 , iC2); 
	}

	/*
	this.getGeoStat = function(iName,iProp) {

		if (this.geostats_cache[iName]) {

			return this.geostats_cache[iName];

		} else {

			var geo = new geostats(iProp.serie);
			this.geostats_cache[iName] = geo.getClassJenks(5);
			this.geostats_cache[iName] = geo.getClassJenks(5);
			return this.geostats_cache[iName];

		}

	}
	*/

	this.getColor = function(geo,val){

		for (var i in geo) {
			if ((val-geo[i]>=0) && (val-geo[parseInt(i)+1]<0)) {
				color = "#"+this.colors.colourAt(100*(parseFloat(i)/(geo.length-1)));
				return color;
			}
		}
		return "#7F7F7F";

	}

	this.computZoomLevel = function(){

	 	var new_zoom = -1;

		var c_zoom = this.map.getZoom();

		for (var i=0; i<this.zoom_area.length-1; i++) {
		
			if ((c_zoom> this.zoom_area[i]) && (c_zoom<=this.zoom_area[i+1])) {
					new_zoom = i; 
			}

		}

		if (new_zoom!=this.zoom_level) {
			this.zoom_level = new_zoom;
			return true;   
		}	

		return false;

	}

	this.buildsGroupLayer = function(){

		var remove = $(this.parts).not(this.todisplay_parts).get();
		var add =  $(this.todisplay_parts).not(this.parts).get();


		for (var i=0; i<remove.length; i++) {
	
			if (this.layers_id[remove[i]].length>0) {

				for (var j=0; j<this.layers_id[remove[i]].length; j++) {
					this.groupLayer.removeLayer(this.layers_id[remove[i]][j]);
				}	
				this.layers_id[remove[i]] = [];		

			}
		}
	
		for (var i=0; i<add.length; i++) {
		
			var self = this;

			var geojsonLayer = L.geoJson(this.geojsondata[add[i]], {
			    style: function(feature) {

				 if (self.itemStyle){
					return self.itemStyle(feature);
			      }
				
			      var prop = self.properties_data[self.currentProperty];
				 //var geo = self.getGeoStat(self.currentProperty, prop);
				
				 var val = parseFloat(feature.properties[self.currentProperty]);
				 if (val) {
				 	return {color: self.getColor(prop.serie,val) ,  "weight": 0 , "opacity" : 0.0,  "fillOpacity": 0.6};
				 } else {
					return {color: "#7F7F7F", "weight": 0 , "fillOpacity": 0.6};
				 }	

			    }
	   		});

			if (this.layers_id[add[i]]) {
				this.layers_id[add[i]].push(geojsonLayer._leaflet_id);
			} else {
				this.layers_id[add[i]] = [geojsonLayer._leaflet_id];
			}

			this.groupLayer.addLayer(geojsonLayer);
		}

		this.parts = this.todisplay_parts.slice();
		this.zoom_change = false;

	}

	this.computGeoJsonBound = function(data){


		var bounds = this.map.getBounds();
		
		for (var j=0; j<data.features.length; j++) {
					
			var aEntity = data.features[j]; // Entity, 1 sector

			if ($.inArray(aEntity.id, this.todisplay_parts)==-1) { // not in array 
			
				var properties = aEntity.properties;

				var subSouthWest = L.latLng(properties.bound.miny, properties.bound.minx),
    				    subNorthEast = L.latLng(properties.bound.maxy, properties.bound.maxx);

				var aEntityBnd = L.latLngBounds( subSouthWest, subNorthEast );	

				if (aEntityBnd.intersects(bounds)) { // Bounds each entity
					this.geojsondata[aEntity.id] = aEntity;
					this.todisplay_parts.push(aEntity.id);
				}

			}

		}
	
		this.loadBoundProcess();

	}

	this.loadBoundProcess= function() {

		if (this.bounds_to_be_loaded.length>0) {

			var key = this.bounds_to_be_loaded[0];
			this.bounds_to_be_loaded = this.bounds_to_be_loaded.slice(1,this.bounds_to_be_loaded.length);
			var self = this;
			var url = this.base_folder+key;

			if (this.map_cache[url]) {

				//console.log("Rebuild file:"+url);
				this.computGeoJsonBound( this.map_cache[url] );

			} else {
		
				//console.log("Loading file:"+url);
				$.getJSON( url , (function(url) { return function( data ) {

					//console.log("Loaded ...");
					var aFeature = topojson.feature(data, data.objects.MA);
					self.map_cache[url] = aFeature;			
					self.computGeoJsonBound( aFeature );

				};} ) (url));	

			}
		
		} else {

			this.buildsGroupLayer();

		}


	}

	this.computBounds = function(){

		//console.log("Comput bounds ...");

		var bounds = this.map.getBounds();
		this.bounds_to_be_loaded = [];
	
		for (var i=0; i<this.mapbounds_data.length; i++){

			var southWest = L.latLng(this.mapbounds_data[i].bound.miny, this.mapbounds_data[i].bound.minx),
			    northEast = L.latLng(this.mapbounds_data[i].bound.maxy, this.mapbounds_data[i].bound.maxx);

			var aRecordBnd = L.latLngBounds( southWest, northEast );

			if (aRecordBnd.intersects(bounds)) {
		
				var key = this.mapbounds_data[i].file;
				this.bounds_to_be_loaded.push(key);
	
			} 

		}

		this.todisplay_parts = [];
		this.geojsondata = {};
		// Prints bounds to be loaded;
		//console.log(this.bounds_to_be_loaded);			

		this.loadBoundProcess();

	}

	this.loadMapBounds = function () {

		var self = this;

		$.getJSON( this.base_folder + "mapbounds.json", function( data ) { // here get bounding maps for 
																 	  // json MA grid

			//console.log("Mapbounds loaded ...");
			self.mapbounds_data = data;
	
			self.parts = [];
			self.groupLayer.clearLayers();
			self.computBounds();		

		});	

	}

	this.loadJson = function (){

		if (this.zoom_change) {

			//console.log("Trying loading map properties:"+this.loadingProp);

			this.base_folder = this.datapath+"p"+(4-this.zoom_level)+"/";

			var self = this;
			if (!this.loadingProp) {
				this.loadingProp = true;

				var url = this.base_folder + "properties.json";
				//console.log("Ask to load:"+url);
				$.getJSON( url, function( data_properties ) { // first loading properties

					//console.log("Properties loaded ...");
					//console.log(data_properties);
					self.loadingProp = false;
					self.properties_data = data_properties;
					self.loadMapBounds();
					self.loadLegend();

				}).fail(function(d) {
                		console.log("Error occured on loading data...");
					console.log(d);
            		});

			}

		} else {

			this.computBounds();

		}

	}

	this.getMap = function() {
		return this.map;
	}

	this.loadLegend = function() {

		if (this.legend) {
			this.map.removeControl(this.legend);
		}

		var self = this;
		this.legend = L.control({position: 'bottomright'});
		this.legend.onAdd = function (map) {
		
			var prop = self.properties_data[self.currentProperty];
			var geo = prop.serie;
			
			var div = L.DomUtil.create('div', 'info legend');
			div.innerHTML += '<h4>'+prop.title+' per tract</h4>';
			for (var i = 0; i < 5; i++) {
			    var range_min = geo[i].toFixed(0);
			    var range_max =  geo[i+1].toFixed(0);
			    var color =  self.getColor(geo, (parseFloat(range_max)+parseFloat(range_min))/2 );
			    div.innerHTML += '<i style="background: ' + color + ';"></i> ' + range_min + prop.unit + " - " + range_max + prop.unit + '<br>';
			}
			return div;
	    	};   
		this.legend.addTo(this.map);

	}

	this.initMap = function (){

		this.map = L.map(this.ident).setView([this.lat, this.lon], 14); // Boston/Cambridge coordinates

		/*
		L.tileLayer('http://{s}.tiles.mapbox.com/v3/'+this.leafletMapId+'/{z}/{x}/{y}.png', 
				  {
	    				attribution: this.leafletAttr,
	    				maxZoom: 18
				  }).addTo(this.map);
		*/

		this.tileLayer = new L.StamenTileLayer("toner").addTo(this.map);

		this.computZoomLevel();
		
		this.groupLayer = L.layerGroup([]);
		this.groupLayer.addTo(this.map);

		this.loadJson();
		
		var self = this;

		this.map.on('zoomend', function(e) {	

		   if (self.computZoomLevel()) {
			 self.zoom_change = true;
		   }

		   self.loadJson();

		});	
	
		this.map.on('moveend', function(e) {	

		   self.loadJson();

		});

		

	}

	this.refresh = function(){

		if (this.groupLayer){		
			this.parts = [];
			this.groupLayer.clearLayers();
			this.loadJson();
			this.loadLegend();	
		}

	}

	this.setDisplayProperty = function(iProperty){
		this.currentProperty = iProperty;
		if (this.map) {
			this.refresh();
		}
	}

}

