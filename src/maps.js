
var MODE_DIRECT=0, MODE_ALPHA=1;
var COLOR_MODE_RAINBOW=0, COLOR_MODE_BREWER=1;

function Datamap(ident, lat, lon, datapath){

	//L.Path.options.clickable = false; 
	L.FeatureGroup.EVENTS = ''; 

	this.mode = MODE_DIRECT;

	this.ident = ident;
	this.lat = lat;
	this.lon = lon;	
	this.datapath = datapath;

	this.fullscreen = false;
	this.marker = null;

	this.colorMode = COLOR_MODE_RAINBOW;
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

	this.alpha = 0.0;

	this.base_folder;

	this.currentProperty="";
	this.currentPropertyAlpha="";

	this.map_layers = {};
	this.must_load = 0;

	this.groupLayer;
	this.parts = [];
	this.layers_id = [];
	this.bounds_to_be_loaded = []; 
	this.map_cache = {};

	this.geostats_cache = {};

	this.remove = function(){
		this.map.remove();
	};

	this.setItemStyle = function(iItemStyleFunction){
		this.itemStyle = iItemStyleFunction;
	};

	this.setGradient = function(iC1,iC2){
		this.colorMode = COLOR_MODE_RAINBOW;
		this.colors.setSpectrum(iC1 , iC2); 
	};

	this.setColorBrewer = function(iName){
		this.colorMode = COLOR_MODE_BREWER;
		this.colorBrewerName = iName;
	};

	this.setMode = function(iMode) {
		this.mode = iMode;
	}

	this.setButton = function(iLogo,iTooltip,iCallback) {
		L.easyButton(iLogo,
				   iCallback,	
             		   iTooltip,
				   this.map);
	}

	this.getColor = function(geo,val){

		if (this.colorMode==COLOR_MODE_RAINBOW) {
			for (var i in geo) {
				if ((val-geo[i]>=0) && (val-geo[parseInt(i)+1]<0)) {

					var pct = (val-geo[i])/(geo[parseInt(i)+1]-geo[i]);			
					color = "#"+this.colors.colourAt(100*((parseFloat(i)+pct)/(geo.length-1)));

					return color;
				}
			}
			return "#7F7F7F";

		} else {

			for (var i in geo) {
				if ((val-geo[i]>=0) && (val-geo[parseInt(i)+1]<0)) {
					return colorbrewer[this.colorBrewerName][5][i];
				}
			}
			return "#7F7F7F";

		}
		
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

	this.styleFunction = function(feature,highlight) {

		 if (this.itemStyle){
			return this.itemStyle(feature);
		 }
	
		 if (this.currentProperty!="") {

			 var prop = this.properties_data[this.currentProperty];
			 
			 var val = parseFloat(feature.properties[this.currentProperty]);
			 if (this.mode==MODE_ALPHA) {
			 	var val1 = parseFloat(feature.properties[this.currentPropertyAlpha]);

				val = (1.0-this.alpha)*val + this.alpha*val1;
			 }

			 if (val) {
				if ((typeof(highlight)!=="undefined") || feature.map_mouse_over==true) {
					console.log("highlight");
			 		return {"fillColor": this.getColor(prop.serie,val) , "color" : "#f00" , "weight": 6 , "opacity" : 1.0,  "fillOpacity": 0.6};
				} else {
					return {"fillColor": this.getColor(prop.serie,val) ,  "weight": 0 , "opacity" : 0.0,  "fillOpacity": 0.6};
				}			 
			} else {
				return {color: "#7F7F7F", "weight": 0 , "fillOpacity": 0.6};
			 }

		 } 
		 return {color: "#7F7F7F", "weight": 0 , "fillOpacity": 0.6};	

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
		
			var geojsonLayer = L.geoJson(this.geojsondata[add[i]], {
			    style: $.proxy( this.styleFunction, this)
	   		});

			var self = this;
			$.each(geojsonLayer._layers,function(idx,layer){
				layer.feature.map_mouse_over = false;
				layer.on("mouseover", function (e) {
			        e.target.feature.map_mouse_over = true;
				   e.target.setStyle(self.styleFunction(e.target.feature, true));
				});
				layer.on("mouseout", function (e) {
				   e.target.feature.map_mouse_over = false;		
				   e.target.setStyle(self.styleFunction(e.target.feature));
				});
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

			self.mapbounds_data = data;
	
			self.parts = [];
			self.groupLayer.clearLayers();
			self.computBounds();		

		});	

	}

	this.loadJson = function (){

		if (this.zoom_change) {

			this.base_folder = this.datapath+"p"+(4-this.zoom_level)+"/";

			var self = this;
			if (!this.loadingProp) {
				this.loadingProp = true;

				var url = this.base_folder + "properties.json";
				$.getJSON( url, function( data_properties ) { // first loading properties

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
		
			var div = L.DomUtil.create('div', 'info legend');
			if (self.currentProperty!="") {

				var prop = self.properties_data[self.currentProperty];
				var geo = prop.serie;
		
				
				div.innerHTML += '<h4>'+prop.title+'</h4>';
				for (var i = 0; i < 5; i++) {
				    var range_min = geo[i].toFixed(0);
				    var range_max =  geo[i+1].toFixed(0);
				    var color =  self.getColor(geo, (parseFloat(range_max)+parseFloat(range_min))/2 );
				    div.innerHTML += '<i style="background: ' + color + ';"></i> ' + range_min + prop.unit + " - " + range_max + prop.unit + '<br>';
				}

			}

			return div;
	    	};   
		this.legend.addTo(this.map);

	}

	this.initMap = function (iFullscreenButton){

		
		this.map = L.map(this.ident, iFullscreenButton ? { 
			fullscreenControl: true, // This adds fullscreen mode functionality
  			fullscreenControlOptions: {
    				position: 'topleft'
  			}
		} : {} ).setView([this.lat, this.lon], 14); // Boston/Cambridge coordinates
		
		if (iFullscreenButton) {

			var self = this;

			this.map.on('enterFullscreen', function(){
			  self.fullscreen = true;
			});

			this.map.on('exitFullscreen', function(){
			  self.fullscreen = false;
			});

		}
	
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

	this.refreshStyles = function(){
		if (this.map) {
			if (this.groupLayer){
				
				var self = this;
				this.groupLayer.eachLayer(function (geojsonlayer) {				    
					$.each(geojsonlayer._layers,function(idx,layer){
						layer.setStyle(self.styleFunction(layer.feature));
					});
				});

			}
		}
		this.loadLegend();	
	}

	this.setDisplayProperty = function(iProperty){
		this.currentProperty = iProperty;
		this.refreshStyles();
	}

	this.setDisplayPropertyAlpha = function(iProperty1, iProperty2){
		this.currentProperty = iProperty1;
		this.currentPropertyAlpha = iProperty2;
		this.refreshStyles();
	}

	this.setAlpha =  function(iAlpha){
		this.alpha = iAlpha;
		this.refreshStyles();
	}

	this.addMarker = function(iData){
		this.removeMarker();
		this.marker = L.marker(iData).addTo(this.map);
	}

	this.removeMarker = function(){
		if (this.marker!=null) {
			this.map.removeLayer(this.marker);
			delete this.marker;
			this.marker = null;
		}
	}

}

