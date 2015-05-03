define(['jquery',
        'underscore',
       "variables"],

       function($, _,  vars) {
           var SELECTOR = '.iwrapper';

           var TEMPLATE = '<p> <%= varInfo %> </p>';

           function render(event, legendData){
	       var $el = $(SELECTOR);
	       $el.html( _.template(TEMPLATE, legendData));
           }

           function init () {
	       // do anything if we need to

	       // listen for when there is data, then render
	       $(document)
                   .on('iwindow:render', render)
                   .on("dataShown", function(e, varname) {
                       var desc = vars[varname].desc;

                       $("div.iwindow").html("<p>" + _.escape(desc) + "</p>");
                   });
           }

           return {
	       init: init
           };
       });
