define([], function() {
    return {
        getColor: function(colorSeries, boundsArray, val) {
            for (var i in boundsArray) {
                if ((val-boundsArray[i]>=0) && (val-boundsArray[parseInt(i)+1]<0)) {
	            return colorSeries[boundsArray.length][i];
                }
            }
            return "#7F7F7F";
        }
    };
});
