define([
	'backbone',
	'script',
    'underscore',
    "variables"
], function( Backbone, S, _, vars){

    function showData(varName) {
        var brewerName = vars[varName].props;
        S.setPropertyBrewer(varName, brewerName);
        $(document).trigger("dataShown", varName);
    }


       var self = this;
	var TEMPLATE = '<p> <%= this.blurb %> </p>';

	//define router class
	var MapRouter = Backbone.Router.extend ({
	    routes: {
                "": "showData",
                "data/:varname": "showData"
            },

            "showData": function(v) {
                showData(v || "medianpctincomerent");
            }
	});


	function initMapRouter(){

		// TODO we probably do not need this timeout...

    // Initialize Backbone router in Router.js file
    // This is done with a timer so that the app have the time
    // to build first needed objects in maps : if the router is
    // called as soon as initialized, it may call not present
    // parameters.
       setTimeout( function(){

    	   var router = new MapRouter();
			Backbone.history.start();

       } , 2000 ); // not really clean but easy

       //$('div.iwindow').html(_.template(TEMPLATE));


	}


	return {
		init: initMapRouter
	};

});
