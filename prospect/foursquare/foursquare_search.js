/* Foursquare
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


function boundLog () {
	console.log(datamap0.toBBoxString())
	console.log("complete")
};*/
