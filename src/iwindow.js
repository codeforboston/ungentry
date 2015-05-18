define(['jquery', 'underscore', "hoverTract", "variables", "colors"], function($, _, hoverTract, vars, colors){
    var SELECTOR = '.iwrapper';
    var TEMPLATE = '<p> <%= varInfo %> </P>';
    var YEARS = ["1990", "2000", "2010"];

    var currentVar, currentFeature, currentProp, currentColors;

    var formatters = {
        "%": function(n) {
            return parseFloat(n).toFixed(2) + "%";
        },

        "#": function(n) {
            return parseFloat(n).toFixed(2);
        },

        "$": function(n) {
            return "$" + parseFloat(n).toFixed(2);
        }
    };

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
                if (val && currentProp) {
                    console.log(currentProp.unit);
                    var color = colors.getColor(currentColors,
                                                currentProp.serie, val),
                        formatter = formatters[currentProp.unit] ||
                            formatters["#"];

                    $("<li>")
                        .append("<div class='swatch' style='background-color:" +
                                color + ";'/>")
                        .append("<strong class='year'>" + year + ":</strong>" + '  ' +
                                formatter(val))
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
