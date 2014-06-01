(function () {
  /*Setup Map 0: 1990 tracts */
  var map0 = new L.Map('map0').setView([42.354, -71.065], 14);
  /* Setup Map 1: 2000 tracts */
  var map1 = new L.Map('map1').setView([42.354, -71.065], 14);
  /* Setup map 2: 2010 tracts */
  var map2 = new L.Map('map2').setView([42.354, -71.065], 14);
  
  var toner = new L.StamenTileLayer("toner").addTo(map0);
  var toner1 = new L.StamenTileLayer("toner").addTo(map1);
  var toner2 = new L.StamenTileLayer("toner").addTo(map2);
  var mapc = L.tileLayer('http://tiles.mapc.org/basemap/{z}/{x}/{y}.png', {
    attribution: 'Tiles by <a href="http://www.mapc.org/">Metropolitan Area Planning Council</a>.'
  });
  var mapQuest = L.tileLayer('http://otile{s}.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.jpeg', {
    attribution: 'Tiles Courtesy of <a href="http://www.mapquest.com/">MapQuest</a> &mdash; Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
    subdomains: '1234'
  });

  var baseLayers = {
    "Map Quest": mapQuest,
    "Toner": toner,
    "MAPC": mapc
  };

  //color scales for legends and styling. can have 3 to 9 colors
  var popcolors = colorbrewer.RdPu[7]; //population
  var medinc = colorbrewer.Greens[7]; //median income
  var pctcol = colorbrewer.YlOrRd[7]; //percent college grad
  var pctpov = colorbrewer.PuBu[7]; //percent under poverty line
  var medrent = colorbrewer.PuOr[7]; //median rent

  L.Util.ajax('geodata/allcensusacsdata.json').then( function(data) {
    
    //list of objects for every tract by year: 1990 2000 2005 2008
    bigdata = data;
    var census2010 = data[2008];
    var census2000 = data[2000];
    var census1990 = data[1990];

    //make array of all population values so we can calculate stats/classifications
    var poparray2010 = [];
    var poparray2000 = [];
    var poparray1990 = [];

    for (key in census2010) {
        var obj = census2010[key].totalpop;
        poparray2010.push(obj);
    }

    for (key in census2000) {
      var obj = census2000[key].totalpop;
      poparray2000.push(obj);
    }

    for (key in census1990) {
        var obj = census1990[key].totalpop;
        poparray1990.push(obj);
    }

    // console.log(poparray);
    var popstats2010 = new geostats(poparray2010);
    var a2010 = popstats2010.getClassQuantile(5);
    var range2010 = popstats2010.ranges;

    var popstats2000 = new geostats(poparray2000);
    var a2000 = popstats2000.getClassQuantile(5);
    var range2000 = popstats2000.ranges;

    var popstats1990 = new geostats(poparray1990);
    var a1990 = popstats1990.getClassQuantile(5);
    var range1990 = popstats1990.ranges;


    var tracts2010 = L.geoJson.ajax("geodata/tracts2010.json",{
      middleware:function(data){
        return topojson.feature(data, data.objects.tracts2010);
      },
      style: 
      function(feature){
        var featureId = feature.id;
        try {
          var d = data[2008][featureId].totalpop;
          // console.log(d);
        } catch (e) {
          // console.log(e)
        }
        var fill = d > a2010[5] ? popcolors[5] :
                   d > a2010[4] ? popcolors[4] :
                   d > a2010[3] ? popcolors[3] :
                   d > a2010[2] ? popcolors[2] :
                   d > a2010[1] ? popcolors[1] :
                              popcolors[0];
        return {
          weight: 0,
          color: "#0000ff",
          fillColor: fill,
          fillOpacity: .75
          };
         }
    }).addTo(map2);

    var tracts2000 = L.geoJson.ajax("geodata/tracts2000.json",{
      middleware:function(data){
        return topojson.feature(data, data.objects.tracts2000);
      },
      style: 
      function(feature){
        var featureId = feature.id;
        try {
          var d = data[2000][featureId].totalpop;
          // console.log(d);
        } catch (e) {
          // console.log(e)
        }
        var fill = d > a2000[5] ? popcolors[5] :
                   d > a2000[4] ? popcolors[4] :
                   d > a2000[3] ? popcolors[3] :
                   d > a2000[2] ? popcolors[2] :
                   d > a2000[1] ? popcolors[1] :
                              popcolors[0];
        return {
          weight: 0,
          color: "#0000ff",
          fillColor: fill,
          fillOpacity: .75
          };
         }
    }).addTo(map1);

    var tracts1990 = L.geoJson.ajax("geodata/tracts1990.json",{
      middleware:function(data){
        return topojson.feature(data, data.objects.tracts1990);
      },
      style: 
      function(feature){
        var featureId = feature.id;
        try {
          var d = data[1990][featureId].totalpop;
          // console.log(d);
        } catch (e) {
          // console.log(e)
        }
        var fill = d > a1990[5] ? popcolors[5] :
                   d > a1990[4] ? popcolors[4] :
                   d > a1990[3] ? popcolors[3] :
                   d > a1990[2] ? popcolors[2] :
                   d > a1990[1] ? popcolors[1] :
                              popcolors[0];
        return {
          weight: 0,
          color: "#0000ff",
          fillColor: fill,
          fillOpacity: .75
          };
         }
    }).addTo(map0);

    // var overlays = {
    //     // "1990 Tracts": tracts1990,
    //     "2000 Tracts": tracts2000,
    //     "2010 Tracts": tracts2010
    // };

    // add layers to map
    L.control.layers(baseLayers).addTo(map0);
    L.control.layers(baseLayers).addTo(map1);
    L.control.layers(baseLayers).addTo(map2);


  // add legends
    var legend2010 = L.control({position: 'bottomright'});
    legend2010.onAdd = function (map) {
      var div = L.DomUtil.create('div', 'info legend');
      div.innerHTML += '<h4>Population per tract 2010</h4>';
      for (var i = 0; i < range2010.length; i++) {
          div.innerHTML +=
              '<i style="background:' + popcolors[i] + ';"></i> ' + range2010[i] + '<br>';
      }
      return div;
    };   
    legend2010.addTo(map2);

    var legend2000 = L.control({position: 'bottomright'});
    legend2000.onAdd = function (map) {
      var div = L.DomUtil.create('div', 'info legend');
      div.innerHTML += '<h4>Population per tract 2000</h4>';
      for (var i = 0; i < range2000.length; i++) {
          div.innerHTML +=
              '<i style="background:' + popcolors[i] + ';"></i> ' + range2000[i] + '<br>';
      }
      return div;
    };   
    legend2000.addTo(map1);

    var legend1990 = L.control({position: 'bottomright'});
    legend1990.onAdd = function (map) {
      var div = L.DomUtil.create('div', 'info legend');
      div.innerHTML += '<h4>Population per tract 1990</h4>';
      for (var i = 0; i < range1990.length; i++) {
          div.innerHTML +=
              '<i style="background:' + popcolors[i] + ';"></i> ' + range1990[i] + '<br>';
      }
      return div;
    };   
    legend1990.addTo(map0);


  }); 




      // synchronize three maps
      map0.sync(map1);
      map0.sync(map2);
      map1.sync(map0);
      map1.sync(map2);
      map2.sync(map0);
      map2.sync(map1);

    

 


  //pulls Boston data from Socrata
  // var constructionSites = "http://data.cityofboston.gov/resource/ktrb-k8k6.json?$select=project_name,project_uses,location";
  // var crime = 'http://data.cityofboston.gov/resource/7cdf-6fgx.json?$select=incident_type_description,weapontype,location';

  //function to update the lat/lon as numbers instead of strings
  // var coordinateFix = function(){
  //     this.location.latitude = Number(this.location.latitude);
  //     this.location.longitude = Number(this.location.longitude);
  // }

  //marker styles!
  // var cm = {
  //     radius: 4,
  //     fillColor: "#ff7800",
  //     color: "#000",
  //     weight: 1,
  //     opacity: 1,
  //     fillOpacity: 0.8
  // };
  // var c2m = {
  //     radius: 6,
  //     fillColor: "#99ff22",
  //     opacity: 0.3,
  //     fillOpacity: 0.2
  // };


  // var c = L.Util.ajax(constructionSites).then(function(data){    
  //     $.each(data, function (key, val) {
  //       coordinateFix();
  //       marker = L.circleMarker([this.location.latitude, this.location.longitude], cm).addTo(map);
  //       marker.bindPopup(this.project_name + '<br>' + this.project_uses);
  //     });
  // });

  // var c2 = L.Util.ajax(crime).then(function(data){    
  //     $.each(data, function (key, val) {
  //       coordinateFix();
  //       marker = L.circleMarker([this.location.latitude, this.location.longitude], c2m).addTo(map);
  //       marker.bindPopup(this.incident_type_description);
  //     });
  // });

  // Add foursquare API
  // initialize empty layer group for data
  // var foursquarePlaces = L.layerGroup().addTo(map); 
  // map.attributionControl.addAttribution('<a href="https://foursquare.com/">Places data from Foursquare</a>');

  // Cristen's foursquare account
  // var CLIENT_ID = 'WKWAY3UZFRFNRN2XOC2FQ1WEPMYMBKP0SD2AUEHSWEYBTIVX';
  // var CLIENT_SECRET = 'ZILRPJDFUY3DWCCRCD2U2SQUA0DFPTDESGOLSXS5O1BRKJYL';

  // var API_ENDPOINT = 'https://api.foursquare.com/v2/venues/explore' +
  //   '?client_id=CLIENT_ID' +
  //   '&client_secret=CLIENT_SECRET' +
  //   '&radius=10000' + 
  //   '&limit=50' +
  //   '&v=20140531' +
  //   '&ll=LATLON'; 
  //   //explore the venues on the map. max results the API likes is 50.

  // var API_ENDPOINT2 = 'https://api.foursquare.com/v2/venues/VENUEID' +
  //   '?client_id=CLIENT_ID' +
  //   '&client_secret=CLIENT_SECRET' +
  //   '&v=20140531' +
  //   '&callback=?'; 
    //get the details for a specific venue (needed to get price info)

  // Use jQuery to make an AJAX request to Foursquare to find venues
  // $.getJSON(API_ENDPOINT
  //   .replace('CLIENT_ID', CLIENT_ID)
  //   .replace('CLIENT_SECRET', CLIENT_SECRET)
  //   .replace('LATLON', map.getCenter().lat +
  //       ',' + map.getCenter().lng), function(result, status) {

  //   // if (status !== 'success') return alert('Request to Foursquare failed');

  //   // var items = result.response.groups[0].items;
    
  //   // Get details for each venue and add as a marker on the map.
  //   // for (var i = 0; i < items.length; i++) {
  //   //   $.getJSON(API_ENDPOINT2
  //   //     .replace('CLIENT_ID', CLIENT_ID)
  //   //     .replace('CLIENT_SECRET', CLIENT_SECRET)
  //   //     .replace('VENUEID', items[i].venue.id), function(result2, status) {

  //   //     if (status !== 'success') return alert('Request to Foursquare failed');

  //   //     // add venue details to popup on its marker on the map.
  //   //     var details = result2.response.venue;
  //   //     var latlng = L.latLng(details.location.lat,details.location.lng);
  //   //     var price;
  //   //     if (details.price !== undefined) { price = details.price.currency } else { price = "No price available." };
  //   //     var marker = L.marker(latlng)
  //   //     .bindPopup('<strong><a href="https://foursquare.com/v/' + details.id + '">' +
  //   //         details.name + '</a></strong><br>' + price)
  //   //     .addTo(foursquarePlaces);  
  //   //   });
  //   // }

  // });



  }());
