define(["jquery", "underscore", "variables", "categories"],
        function($, _, vars, cats) {
            return {
                init: function() {
                    _.each(cats, function(cat) {
                        var dropdown = $(cat.dropdown);
                        /*
                        console.log("Building menu",
                                    cat, dropdown);
                         */

                        _.each(cat.varnames, function(catgroup, i) {
                            if (i > 0) {
                                dropdown.append("<li class='divider'/>");
                            }

                            _.each(catgroup, function(varname) {
                                var varinfo = vars[varname],
                                    html = "<li>" +
                                        "<a href='#data/" + varname +
                                        "'>" + _.escape(varinfo.name) +
                                        "</a></li>";
                                console.log(varinfo);
                                dropdown.append(html);
                            });
                        });
                    });
                }
            };
        });
