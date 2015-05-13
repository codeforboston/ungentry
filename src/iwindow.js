define(['jquery', 'underscore', "hoverTract", "variables"], function($, _, hoverTract, vars){
    var SELECTOR = '.iwrapper';
    var TEMPLATE = '<p> <%= varInfo %> </P>';
    var YEARS = ["1990", "2000", "2010"];

    var currentVar, currentFeature;

    function render(){
        if (!(currentVar && currentFeature))
            return;

        var featureProps = currentFeature.properties;

        $(".iwindow-desc").html(_.escape(vars[currentVar].desc));

        var $vals = $(".iwindow-vals").html("");

        _.each(YEARS, function(year) {
            $("<li>").html("<strong class='year'>" + year + "</strong> " +
                           featureProps[currentVar + "_" + year.slice(2)])
                .appendTo($vals);
        });
    }

	function init () {
		// do anything if we need to

		// listen for when there is data, then render
	    $(document)
                .on("dataShown", function(e, varname) {
                    currentVar = varname;
                    render();
                });
            hoverTract.watch(function(_, _, feature) {
                currentFeature = feature;
                render();
            });
	}

	return {
		init: init
	};
});
