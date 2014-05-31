(function () {
  var map = new L.Map('map').setView([42.354, -71.065], 14);
  var mapQuest = L.tileLayer('http://otile{s}.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.jpeg', {
    attribution: 'Tiles Courtesy of <a href="http://www.mapquest.com/">MapQuest</a> &mdash; Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
    subdomains: '1234'
  }).addTo(map);
  var tracts2010 = L.geoJson.ajax("geodata/tracts2010.json",{
      middleware:function(data){
        return topojson.feature(data, data.objects.tracts2010);
      }
  }).addTo(map);
  var tracts2000 = L.geoJson.ajax("geodata/tracts2000.json",{
      middleware:function(data){
        return topojson.feature(data, data.objects.tracts2000);
      }
  });
  var baseLayers = {
    "Map Quest": mapQuest
  };

  var overlays = {
      "2010 Tracts": tracts2010,
      "2000 Tracts": tracts2000
  };

  L.control.layers(baseLayers, overlays).addTo(map);
}());