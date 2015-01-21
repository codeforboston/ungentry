define([
  'jquery',
  'underscore',
  'backbone',
  'router',
], function($, _, Backbone, Router){


  function initialize(){
    // This is the main entry point of the app.
    // This is the first things that runs

    // Pass in our Router module and call it's initialize function
    Router.initialize();


    // This was pulled from inline scripts in index.html...
    $( document ).ready(function() {
    console.log( "ready!" );

    $('#link_1900').click(function(event) {
      event.preventDefault();
      console.log('clicked 1900');
     $('#map1').hide();
      $('#map2').hide();
    });
    $('#link_2000').click(function(event) {
      event.preventDefault();
      console.log('clicked 2000');
      $('#map0').hide();
      $('#map1').show();
      $('#map2').hide();
    });
    $('#link_2010').click(function(event) {
      event.preventDefault();
      console.log('clicked 2010');
      $('#map0').hide();
      $('#map1').hide();
      $('#map2').show();
    });

    });
  };

  return {
    initialize: initialize
  };
});
