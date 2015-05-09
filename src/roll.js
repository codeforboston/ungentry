define(['jquery', 'underscore'], function($, _){
      
	var SELECTOR = '.rollwindow';

	// This template will dump out something like:
	// 	<h4> Avg. Rent <h4>
	//  <i style="background: #fff;"></i> $265 - $756
	//  <i style="background: #eee;"></i> $756 - $1000
	// ...
	var TEMPLATE = '<h4> Tract ID </h4>'+
									'<% _.each( data, function(entry){ %>'+
									'<i style="background: <%= entry.color %>;"></i>'+
									'<%= entry.unit %> <%= entry.min %> - '+
									'<%= entry.unit %>  <%= entry.max %> '+
									'<br>'+
									'<% }) %>';

	// Legend Data is an object with a title attribute, and a data attribute which is an array of legend entries as follows:

	// [
	// 		{
	//		min: <integer>,
	//		max: <integer>,
	//		unit: <string>,
	//		color: <colorHEX>
	// 		},
	//    ...
	// ]
	function render(event, legendData){
		var $el = $(SELECTOR);
		$el.html( _.template(TEMPLATE, legendData));

	}


	function init () {
		// do anything if we need to

		// listen for when there is data, then render
		$(document).on('roll:render', render);

	}

	return {
		init: init
	}


});
