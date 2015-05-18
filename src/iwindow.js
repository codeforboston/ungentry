define(['jquery', 'underscore', "hoverTract", "variables", "colors"], function($, _, hoverTract, vars, colors){
    var SELECTOR = '.iwrapper';
    var TEMPLATE = '<p> <%= varInfo %> </P>';
    var YEARS = ["1990", "2000", "2010"];

    var currentVar, currentFeature, currentProp, currentColors;

    function render(){
        if (!currentVar)
            return;

        $(".iwindow-desc").html(_.escape(vars[currentVar].desc));
        var $vals = $(".iwindow-vals").html("");
        var $tract = $('.iwindow-tract').html('');

        if (currentFeature) {
            var featureProps = currentFeature.properties;
            var featureId = currentFeature.id;

            $('<p>').html('<strong class="tract">Census Tract ID number:</strong>' + '  ' + featureId).appendTo($tract);

            _.each(YEARS, function(year) {
                var val = featureProps[currentVar + "_" + year.slice(2)];
                if (val) {
                    var color = colors.getColor(currentColors, currentProp.serie, val);
                    $("<li>").html("<strong class='year'>" + year + "</strong>" + '  ' +
                            '<span style="background-color:' + color + '">' + parseFloat(val).toFixed(2) + '</span>')
                        .appendTo($vals);

                }
            });
        }
    }

	function init () {
		// do anything if we need to

		// listen for when there is data, then render
	    $(document)
                .on("dataShown", function(e, varname) {
                    currentVar = varname;
                    render();
                });
            hoverTract.watch(function(_, _, feature, prop, colors) {
                //console.log(feature);
                currentFeature = feature;
                currentProp = prop;
                currentColors = colors;
                render();
            });
	}

	return {
		init: init
	};
});
