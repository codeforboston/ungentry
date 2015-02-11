define([
	'leaflet',
	'topojson',
	'colorbrewer'
	], function(L, topojson, colorbrewer){


	var CensusLayer = L.Class.extend({

	    initialize: function (iMap,iDataPath) {
        // save position of the layer or any options from the constructor

		   	this._datapath = iDataPath;

	    },

	    onAdd: function (map) {

	      this._map = map;

		   	this._layers_id = [];
		   	this._properties_data = {};

        this._zoom_level = 0;
        this._zoom_change = true;

		   	this._init();

	    },

	    onRemove: function (map) {
	        // remove layer's DOM elements and listeners
	        // map.off('viewreset', this._reset, this);
	    },

	    setProperty : function(iProperty, iColorBrewer) {
				this._currentProperty = iProperty;
				this._colorBrewerName = iColorBrewer;
				this._refreshStyles();
	    },

	    _init : function() {

				this._computZoomLevel();

				this._groupLayer = L.layerGroup([]);
				this._groupLayer.addTo(this._map);

				this._loadJson();

				var self = this;
				this._map.on('zoomend', function(e) {

				   if (self._computZoomLevel()) {
					 self._zoom_change = true;
				   }

				   self._loadJson();

				});

				this._map.on('moveend', function(e) {

			   console.log("moveend");
			   self._loadJson();

				});

				/*
				this._map.on('dragend', function(e) {

				   console.log("dragend");
				   self._loadJson();

				});
				*/

	    },

	    // Zoom management
	    _zoom_max : 18,
	    _zoom_area : [0,  11 , 13 , 15 , 17,  18],

	    _computZoomLevel : function(){

			 	var new_zoom = -1;

				var c_zoom = this._map.getZoom();

				for (var i=0; i<this._zoom_area.length-1; i++) {
					if ((c_zoom> this._zoom_area[i]) && (c_zoom<=this._zoom_area[i+1])) {
						new_zoom = i;
					}
				}

				if (new_zoom!=this._zoom_level) {
					this._zoom_level = new_zoom;
					return true;
				}

				return false;

			},

			// Json load part

			_map_cache : {},

			_loadJson : function (){

				if (this._zoom_change) {

					this._base_folder = this._datapath+"p"+(4-this._zoom_level)+"/";

					var self = this;
					if (!this._loadingProp) {
						this._loadingProp = true;

						var url = this._base_folder + "properties.json";
						$.getJSON( url, function( data_properties ) { // first loading properties
							self._loadingProp = false;
							self._properties_data = data_properties;
							self._loadMapBounds();
							self._loadLegend();

						}).fail(function(d) {
		          console.log("Error occured on loading data...");
							console.log(d);
		        });

					}

				} else {

					console.log('ComputBounds');
					this._computBounds();

				}

			},

			_loadMapBounds : function () {

				var self = this;

				$.getJSON( this._base_folder + "mapbounds.json", function( data ) { // here get bounding maps for
																	   // json MA grid

					self._mapbounds_data = data;

					self._parts = [];
					self._groupLayer.clearLayers();
					self._computBounds();

				});

			},

			_computBounds : function(){

				var bounds = this._map.getBounds();

				this._bounds_to_be_loaded = [];

				for (var i=0; i<this._mapbounds_data.length; i++){

					var southWest = L.latLng(this._mapbounds_data[i].bound.miny, this._mapbounds_data[i].bound.minx),
					    northEast = L.latLng(this._mapbounds_data[i].bound.maxy, this._mapbounds_data[i].bound.maxx);

					var aRecordBnd = L.latLngBounds( southWest, northEast );

					if (aRecordBnd.intersects(bounds)) {

						var key = this._mapbounds_data[i].file;
						this._bounds_to_be_loaded.push(key);

					}

				}

				this._todisplay_parts = [];
				this._geojsondata = {};

				this._loadBoundProcess();

			},

			_loadBoundProcess : function() {

				if (this._bounds_to_be_loaded.length>0) {

					var key = this._bounds_to_be_loaded[0];
					this._bounds_to_be_loaded = this._bounds_to_be_loaded.slice(1,this._bounds_to_be_loaded.length);
					var self = this;
					var url = this._base_folder+key;

					if (this._map_cache[url]) {

						//console.log("Rebuild file:"+url);
						this._computGeoJsonBound( this._map_cache[url] );

					} else {

						//console.log("Loading file:"+url);
						$.getJSON( url , (function(url) { return function( data ) {

							//console.log("Loaded ...");
							var aFeature = topojson.feature(data, data.objects.MA);
							self._map_cache[url] = aFeature;
							self._computGeoJsonBound( aFeature );

						};} ) (url));

					}

				} else {
					this._buildsGroupLayer();
				}

			},

			_computGeoJsonBound : function(data){

				var bounds = this._map.getBounds();

				for (var j=0; j<data.features.length; j++) {

					var aEntity = data.features[j]; // Entity, 1 sector

					if ($.inArray(aEntity.id, this._todisplay_parts)==-1) { // not in array

						var properties = aEntity.properties;

						var subSouthWest = L.latLng(properties.bound.miny, properties.bound.minx),
		    				    subNorthEast = L.latLng(properties.bound.maxy, properties.bound.maxx);

						var aEntityBnd = L.latLngBounds( subSouthWest, subNorthEast );

						if (aEntityBnd.intersects(bounds)) { // Bounds each entity
							this._geojsondata[aEntity.id] = aEntity;
							this._todisplay_parts.push(aEntity.id);
						}

					}

				}

				this._loadBoundProcess();

			},

			_buildsGroupLayer : function(){

				var remove = $(this._parts).not(this._todisplay_parts).get();
				var add =  $(this._todisplay_parts).not(this._parts).get();


				for (var i=0; i<remove.length; i++) {

					if (this._layers_id[remove[i]].length>0) {

						for (var j=0; j<this._layers_id[remove[i]].length; j++) {
							this._groupLayer.removeLayer(this._layers_id[remove[i]][j]);
						}
						this._layers_id[remove[i]] = [];

					}
				}

				for (var i=0; i<add.length; i++) {

					var geojsonLayer = L.geoJson(this._geojsondata[add[i]], {
					    style: $.proxy( this._styleFunction, this)
			   		});

					var self = this;
					$.each(geojsonLayer._layers,function(idx,layer){
						layer.feature.map_mouse_over = false;
						layer.on("mouseover", function (e) {
					        e.target.feature.map_mouse_over = true;
						   e.target.setStyle(self._styleFunction(e.target.feature, true));
						});
						layer.on("mouseout", function (e) {
						   e.target.feature.map_mouse_over = false;
						   e.target.setStyle(self._styleFunction(e.target.feature));
						});
					});

					if (this._layers_id[add[i]]) {
						this._layers_id[add[i]].push(geojsonLayer._leaflet_id);
					} else {
						this._layers_id[add[i]] = [geojsonLayer._leaflet_id];
					}

					this._groupLayer.addLayer(geojsonLayer);
				}

				this._parts = this._todisplay_parts.slice();
				this._zoom_change = false;

			},

			_styleFunction : function(feature,highlight) {

				 if (this._itemStyle){
					return this._itemStyle(feature);
				 }

				 if (this._currentProperty!="") {

					 var prop = this._properties_data[this._currentProperty];

					 var val = parseFloat(feature.properties[this._currentProperty]);

					 if (val) {
						if ((typeof(highlight)!=="undefined") || feature.map_mouse_over==true) {
					 		return {"fillColor": this._getColor(prop.serie,val) , "color" : "#f00" , "weight": 6 , "opacity" : 1.0,  "fillOpacity": 0.6};
						} else {
							return {"fillColor": this._getColor(prop.serie,val) ,  "weight": 0 , "opacity" : 0.0,  "fillOpacity": 0.6};
						}
					} else {
						return {color: "#7F7F7F", "weight": 0 , "fillOpacity": 0.6};
					}

				 }
				 return {color: "#7F7F7F", "weight": 0 , "fillOpacity": 0.6};

		  },

			_getColor : function(geo,val){
				for (var i in geo) {
					if ((val-geo[i]>=0) && (val-geo[parseInt(i)+1]<0)) {
						return colorbrewer[this._colorBrewerName][5][i];
					}
				}
				return "#7F7F7F";
			},

			_refresh : function(){

				if (this._groupLayer){
					this._parts = [];
					this._groupLayer.clearLayers();
					this._loadJson();
					this._loadLegend();
				}

			},

			_refreshStyles : function(){
				if (this._map) {
					if (this._groupLayer){

						var self = this;
						this._groupLayer.eachLayer(function (geojsonlayer) {
							$.each(geojsonlayer._layers,function(idx,layer){
								layer.setStyle(self._styleFunction(layer.feature));
							});
						});

					}
				}
				this._loadLegend();
			},

			_loadLegend : function() {

				if (this._legend) {
					this._map.removeControl(this._legend);
				}

				var self = this;
				this._legend = L.control({position: 'bottomright'});
				this._legend.onAdd = function (map) {

					var div = L.DomUtil.create('div', 'info legend');
					if (self._currentProperty!="") {

						var prop = self._properties_data[self._currentProperty];

						if (prop) {
							var geo = prop.serie;


							div.innerHTML += '<h4>'+prop.title+'</h4>';
							for (var i = 0; i < 5; i++) {
							    var range_min = geo[i].toFixed(0);
							    var range_max =  geo[i+1].toFixed(0);
							    var color =  self._getColor(geo, (parseFloat(range_max)+parseFloat(range_min))/2 );
							    div.innerHTML += '<i style="background: ' + color + ';"></i> ' + range_min + prop.unit + " - " + range_max + prop.unit + '<br>';
							}
						}


					}

					return div;
			    	};
				this._legend.addTo(this._map);

			}


	});



	return CensusLayer;

});
