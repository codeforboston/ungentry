define(['jquery', 'underscore', "hoverTract", "variables", "colors"], function($, _, hoverTract, vars, colors){
    var SELECTOR = '.iwrapper';
    var TEMPLATE = '<p> <%= varInfo %> </P>';
    var YEARS = ["1990", "2000", "2010"];

    var currentVar, currentFeature, currentProp, currentColors;

    function commaSeparate(s) {
        var split = s.split("."),
            after = split[1];

        s = split[0];

        var l = s.length;
        if (l <= 3)
            return s;

        var istart = 0,
            iend = (l % 3) || 3,
            pieces = [],
            p;

        while ((p = s.slice(istart, iend))) {
            pieces.push(p);
            istart = iend;
            iend += 3;
        }

        return pieces.join(",") + (after ? ("." + after) : "");
    }

    var formatters = {
        "%": function(n) {
            return n.toFixed(2) + "%";
        },

        "#": function(n) {
            return commaSeparate(n.toFixed(2));
        },

        "$": function(n) {
            return "$" + commaSeparate(n.toFixed(2));
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

            var previousVal = null;

            _.each(YEARS, function(year) {
                var val = featureProps[currentVar + "_" + year.slice(2)];
                if (val && currentProp) {
                    val = parseFloat(val);
                    var color = colors.getColor(currentColors,
                                                currentProp.serie, val),
                        formatter = formatters[currentProp.unit] ||
                            formatters["#"];

                    var li = $("<li>");

                    li.append("<div class='swatch' style='background-color:" +
                                color + ";'/>")
                        .append("<strong class='year'>" + year + ":</strong>" + '  ' +
                                formatter(val))
                        .appendTo($vals);

                    if (previousVal) {
                        var changeSpan = $("<span class='change'/>");

                        changeSpan.addClass((val > previousVal) ?
                                            "increase" : "decrease")
                            .html(formatter(val - previousVal))
                            .appendTo(li);
                    }
                }

                previousVal = val;
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
