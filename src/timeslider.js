define([
  'leaflet'
], function(L){

  function run () {
    L.Control.TimeSlider = L.Control.extend({

      options: {
        position: 'bottomleft'
      },
      initialize: function (options) {
        this._timeslider = {
        };
        if (options.position) {
            this.options.position = options.position;
        } else {
            this.options.position = 'bottomleft'
        }

        if (options.min) {
    	   this.options.min = options.min;
        } else {
    	   this.options.min = 0;
        }

        if (options.max) {
    	   this.options.max = options.max;
        } else {
    	   this.options.max = 1.0;
        }

        this.setTimeSlider(options);
      },

      setValue : function(iVal){

    	$( "#slider" ).slider( "option", "value", iVal );

      },

      onAdd: function (map) {
        this._map = map;
        var container = L.DomUtil.create('div', 'leaflet-control-timeslider');

        L.DomEvent.on(container, 'mousedown', L.DomEvent.stopPropagation)
            .on(container, 'doubleclick', L.DomEvent.stopPropagation)
            .on(container, 'click', L.DomEvent.stopPropagation);

        this._container = container;

        this._update();
        return this._container;
      },

      onRemove: function (map) {
      },

      start : function(){
      	$( "#slider" ).slider({

      		min : this.options.min,
      		max : this.options.max,
      		step : 0.05

      	});

      	if (this.options.onSlide) {
      		$( "#slider" ).on( "slide", this.options.onSlide );
      	}

      	var self = this;

      	$( "#slider_button" ).click(function(){

      		var spanElem = $( "#slider_button" ).find("span");

      		if (spanElem.hasClass("glyphicon-play")) {

      			spanElem.removeClass("glyphicon-play");
      			spanElem.addClass("glyphicon-pause");

      			self.options.onPlay();

      		} else {

      			spanElem.removeClass("glyphicon-pause");
      			spanElem.addClass("glyphicon-play");

      			self.options.onPause();

      		}

      	});

      },

      setTimeSlider: function (options) {
        var timeslider = {
          'text': options.text || '',                 //string
          'onClick': options.onClick || function(){},           //callback function
          'hideText': !!options.hideText,         //forced bool
          'maxWidth': options.maxWidth || 70,     //number
          'doToggle': options.toggle,			//bool
          'toggleStatus': false,				//bool
          'html': options.html
        };

        this._timeslider = timeslider;
        this._update();
      },

      onPause: function (iCallback) {

    	 this.options.onPause = iCallback;

      },

      onPlay: function (iCallback) {

    	this.options.onPlay = iCallback;

      },

      onSlide: function (iCallback) {

    	this.options.onSlide = iCallback;

      },

      getText: function () {
      	return this._timeslider.text;
      },

      destroy: function () {
      	this._timeslider = {};
      	this._update();
      },

      toggle: function (e) {

      	this._update();

      },

      _update: function () {

        if (!this._map) {
          return;
        }

        this._container.innerHTML = '';
        this._makeTimeSlider(this._timeslider);

      },

      _makeTimeSlider: function (timeslider) {

        var newTimeSlider = L.DomUtil.create('div', 'leaflet-control-timeslider', this._container);

        newTimeSlider.innerHTML += "<div id='control'>\
    						   <div class='input-group'>\
    						   <span class='input-group-btn'>\
    						   <button class='btn btn-default' type='button' id='slider_button'><span class='glyphicon glyphicon-play'></span></button>\
    						   </span>\
    						   <div class='form-control'><div id='slider'></div></div>\
    						   </div></div>";

        L.DomEvent
          .addListener(newTimeSlider, 'click', L.DomEvent.stop)
          .addListener(newTimeSlider, 'click', timeslider.onClick,this)
          .addListener(newTimeSlider, 'click', this._clicked,this);
        L.DomEvent.disableClickPropagation(newTimeSlider);

        return newTimeSlider;

      },

      _clicked: function () {  //'this' refers to timeslider

      	return;
      }

    });
  }

  return {
    run: run
  };
});
