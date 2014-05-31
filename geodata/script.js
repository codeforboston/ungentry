(function () {
  var map = new L.Map('map').setView([42.3334, -71.0270], 13);
  var mapQuest = L.tileLayer('http://otile{s}.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.jpeg', {
    attribution: 'Tiles Courtesy of <a href="http://www.mapquest.com/">MapQuest</a> &mdash; Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
    subdomains: '1234'
  }).addTo(map);
  var tracts2010 = L.geoJson.ajax("tracts2010.json",{
      middleware:function(data){
        return topojson.feature(data, data.objects.tracts2010);
      }
  });
  var tracts2000 = L.geoJson.ajax("tracts2000.json",{
      middleware:function(data){
        return topojson.feature(data, data.objects.tracts2000);
      }
  });

  //pulls Boston data from Socrata
  var constructionSites = "http://data.cityofboston.gov/resource/ktrb-k8k6.json?$select=project_name,project_uses,location";
  var crime = 'http://data.cityofboston.gov/resource/7cdf-6fgx.json?$select=incident_type_description,weapontype,location';

  //function to update the lat/lon as numbers instead of strings
  var coordinateFix = function(){
      this.location.latitude = Number(this.location.latitude);
      this.location.longitude = Number(this.location.longitude);
  }

  //marker styles!
  var cm = {
      radius: 4,
      fillColor: "#ff7800",
      color: "#000",
      weight: 1,
      opacity: 1,
      fillOpacity: 0.8
  };
  var c2m = {
      radius: 8,
      opacity: 0.3,
      fillOpacity: 0.2
  };


  var c = L.Util.ajax(constructionSites).then(function(data){    
      $.each(data, function (key, val) {
        coordinateFix();
        marker = L.circleMarker([this.location.latitude, this.location.longitude], cm).addTo(map);
        marker.bindPopup(this.project_name + '<br>' + this.project_uses);
      });
  });

  var c2 = L.Util.ajax(crime).then(function(data){    
      $.each(data, function (key, val) {
        coordinateFix();
        marker = L.circleMarker([this.location.latitude, this.location.longitude], c2m).addTo(map);
        marker.bindPopup(this.incident_type_description);
      });
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