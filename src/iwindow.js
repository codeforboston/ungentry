define(['jquery', 'underscore'], function($, _){
	var SELECTOR = '.iwrapper';

	var TEMPLATE = '<p> <%= varInfo %> </P>'

	function render(event, legendData){
	   var $el = $(SELECTOR);
	   $el.html( _.template(TEMPLATE, legendData));

	}


	function init () {
		// do anything if we need to

		// listen for when there is data, then render
		$(document).on('iwindow:render', render);

	}

	return {
		init: init
	}
});