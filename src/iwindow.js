define(['jquery', 'underscore'], function($, _){
	var selector = '.iwrapper';

	var template = 

	function render(event, legendData){
	   var $el = $(selector);
	   $el.html( _.template(TEMPLATE, legendData));

	}


	function init () {
		// do anything if we need to

		// listen for when there is data, then render
		$(document).on('legend:render', render);

	}

	return {
		init: init
	}
});