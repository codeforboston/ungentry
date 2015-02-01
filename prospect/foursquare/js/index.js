
var map;

function retrieveVenuePrice(id){

	console.log(id);

	$.ajax({
		url: 'https://api.foursquare.com/v2/venues/'+id,
		type: 'GET',
		dataType: 'jsonp',
		data: { 
			   oauth_token : "2D2CXQUH5IWPUSKYIDLWO0CLWPDVLJ0FPCNBS41HYCDKXGCX",
			   v : "20150131"			
			 },
	})
	.done(function(data){

		var venue = data.response.venue;
		console.log(venue.price.tier);
		
		var circle = L.circle([venue.location.lat, venue.location.lng], 20, {
		    color: colorbrewer["RdBu"][4][venue.price.tier],
		    fillColor: colorbrewer["RdBu"][4][venue.price.tier],
		    fillOpacity: 0.9
		}).addTo(map);
		circle.bindPopup(venues.name);
		

	});

}

function listVenues(data){

	var venues = data.response.venues;
	for (var id in venues) {
		console.log(venues[id].location.lat+" "+venues[id].location.lng);

		//var marker = L.marker([venues[id].location.lat, venues[id].location.lng]).addTo(map);
		retrieveVenuePrice(venues[id].id);
		
	}

}

$(function() {

	map = L.map('map').setView([42.354, -71.065], 16);

	this.tileLayer = new L.StamenTileLayer("toner").addTo(map);

	
	// Here we will try to figure out how many venues we can display in Boston area
	// First we can take bounds
	var bounds = map.getBounds();
	console.log(bounds);

	var maxx = bounds._northEast.lng;
	var minx = bounds._southWest.lng;

	var maxy = bounds._northEast.lat;
	var miny = bounds._southWest.lat;

	console.log("Maxy:"+maxy);
	console.log("Miny:"+miny);

	var avgy = (maxy+miny)/2;

	var facty = 111.32;
	console.log("Latitude km/deg:"+facty);
	var factx = Math.cos(3.141592*avgy/360)*facty;
	console.log("Longitude km/deg:"+factx);

	// Here we want to compute venues/km
	var unit_1km_in_deg_y = 1/facty;
	var unit_1km_in_deg_x = 1/factx;

	var nx = Math.trunc((maxx-minx)/(unit_1km_in_deg_x))+1;
	var ny = Math.trunc((maxy-miny)/(unit_1km_in_deg_y))+1;
	console.log(nx);
	console.log(ny);



	for (var i=0; i<nx; i++) {
		for (var j=0; j<ny; j++) {
			
				$.ajax({
					url: 'https://api.foursquare.com/v2/venues/search',
					type: 'GET',
					dataType: 'jsonp',
					data: { 
						   intent : "browse",
						   ll : (miny+unit_1km_in_deg_y*(0.5+j))+","+(minx+unit_1km_in_deg_x*(0.5+i)),	
						   radius : 500,
						   price : "1,2,3,4",
						   categoryId : "4d4b7105d754a06374d81259", /* should normally be food */
						   limit : 50,
						   oauth_token : "2D2CXQUH5IWPUSKYIDLWO0CLWPDVLJ0FPCNBS41HYCDKXGCX",
						   v : "20150131"			
						 },
				})
				.done(listVenues);

		}
	}

});
