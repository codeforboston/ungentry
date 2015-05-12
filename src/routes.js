
define([
	'backbone',
	'script',
	'underscore'
	], function( Backbone, S, _){
       
       var self = this;
	var TEMPLATE = '<p> <%= this.blurb %> </p>'; 	

	//define router class
	var MapRouter = Backbone.Router.extend ({
		  routes: {

	         ''          : 'showMedianpctincomerent', // Default display
	         'pcthchild' : 'showPcthchild',
	         'pct_finance' : 'showPct_finance',
	         'pctind_professional' : 'showPct_professional',
	         'pctocc_profmanage' : 'showPctocc_profmanage',
	         'pctcollege' : 'showPctcollege',
	         'pctinc_0_25k' : 'showPctinc_0_25k',
	         'pctinc_25k_50k' : 'showPctinc_25k_50k',
	         'pctinc_50k_100k' : 'showPctinc_50k_100k',
	         'pctinc_100k_more' : 'showPctinc_100k_more',
	         'medhhincome' : 'showMedhhincome',
	         'pctpoverty' : 'showPctpoverty',
	         'pctpublicassist' : 'showPctpublicassist',
	         'units' : 'showUnits',
	         'pctown' : 'showPctown',
	         'pctrent' : 'showPctrent',
	         'pctvacant' : 'showPctvacant',
	         'medianvalue' : 'showMedianvalue',
	         'medianrent' : 'showMedianrent',
	         'medianpctincomerent' : 'showMedianpctincomerent',
	         'pctinc_mortgage_30_more' : 'showPctinc_mortgage_30_more',
	         'pctsameres' : 'showPctsameres'

		  },

		  showPcthchild: function(){
			S.setPropertyBrewer('pcthhchild', 'PuRd');
			$('div.iwindow').html('<p>Percentage of households per census tract with children residing in them.</P>');
		  },

		  showPct_finance: function(){

			S.setPropertyBrewer('pctind_finance', 'PuRd');
			$('div.iwindow').html('<p>Percentage of people per census tract employed in jobs qualified by the ACS as "finance."</P>');
		  },

		  showPct_professional: function(){

			S.setPropertyBrewer('pctind_professional', 'PuRd');
			$('div.iwindow').html('<p>Percentage of people per census tract employed in jobs qualified by the ACS as "professional."</P>');
		  },

		  showPctocc_profmanage: function(){

			S.setPropertyBrewer('pctocc_profmanage', 'PuRd');
			$('div.iwindow').html('<p></P>');
		  },

		  showPctcollege: function(){

			S.setPropertyBrewer('pctcollege', 'PuRd');
			$('div.iwindow').html('<p>Percentage of people per census tract that posses a college degree.</P>');
		  },

		  showPctinc_0_25k: function(){

		  	S.setPropertyBrewer('pctinc_0k_25k', 'GnBu');
		  	$('div.iwindow').html('<p>Go get ya f*cken shinebox!</P>');

		  },

		  showPctinc_25k_50k: function(){
		  	S.setPropertyBrewer('pctinc_25k_50k', 'GnBu');
		  	$('div.iwindow').html('<p>Am I funny to you?</P>');

		  },

		  showPctinc_50k_100k: function(){
		  	S.setPropertyBrewer('pctinc_50k_100k', 'GnBu');
		  	$('div.iwindow').html('<p></P>');

		  },

		  showPctinc_100k_more: function(){
		  	S.setPropertyBrewer('pctinc_100k_more', 'GnBu');
		  	$('div.iwindow').html('<p>Percentage of people per census tract that have an income of $100,000 or more.</P>');

		  },

		  showMedhhincome: function(){
			S.setPropertyBrewer('medianhhincome', 'GnBu');
			$('div.iwindow').html('<p>Median income of all households per census tract</P>');
		  },

		  showPctpoverty: function(){

			S.setPropertyBrewer('pctpoverty', 'GnBu');
			$('div.iwindow').html('<p>Percentage of people per census tract living under the federal poverty line.</P>');
		  },

		  showPctpublicassist: function(){
			S.setPropertyBrewer('pctpublicassist', 'GnBu');
			$('div.iwindow').html('<p>Calmer than you dude...</P>');
		  },

		  showUnits: function(){
			S.setPropertyBrewer('units', 'OrRd');
			$('div.iwindow').html('<p>Number of housing units per census tract.</P>');
		  },

		  showPctown: function(){
			S.setPropertyBrewer('pctown', 'OrRd');
			$('div.iwindow').html('<p>Percentage of housing units per census tract that are owner-occupied.</P>');
		  },

		  showPctrent: function(){
			S.setPropertyBrewer('pctrent', 'OrRd');
			$('div.iwindow').html('<p>Percentage of housing units per census tract that are renter-occupied.</P>');
		  },

		  showPctvacant: function(){
			S.setPropertyBrewer('pctvacant', 'OrRd');
			$('div.iwindow').html('<p>Percentage of housing units per census tract that are vacant.</P>');
		  },

		  showMedianvalue: function() {
		  	S.setPropertyBrewer('medianvalue', 'OrRd');
		  	$('div.iwindow').html('<p>Median value of housing units over a given census tract.</P>');

		  },

		  showMedianrent: function(){

			S.setPropertyBrewer('medianrent', 'OrRd');
			$('div.iwindow').html('<p>Median rent paid by residents of a given census tract.</P>');
		  },

		  showMedianpctincomerent : function(){
			S.setPropertyBrewer('medianpctincomerent', 'GnBu');
			$('div.iwindow').html("<p>Median percentage of residents' income that is paid for rent.</P>");
		  },

		  showPctsameres: function(){
		  	S.setPropertyBrewer('pctsameres', 'OrRd');
		  	$('div.iwindow').html('<p></P>');
		  }

	});


	function initMapRouter(){

		// TODO we probably do not need this timeout...

    // Initialize Backbone router in Router.js file
    // This is done with a timer so that the app have the time
    // to build first needed objects in maps : if the router is
    // called as soon as initialized, it may call not present
    // parameters.
       setTimeout( function(){

    	   var router = new MapRouter();
			Backbone.history.start();

       } , 2000 ); // not really clean but easy

       //$('div.iwindow').html(_.template(TEMPLATE));


	}    


	return {
		init: initMapRouter
	};

});
