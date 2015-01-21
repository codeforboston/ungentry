define([
	'backbone',
	'script'
], function(Backbone, S){

	var MapRouter = Backbone.Router.extend ({
		  routes: {
			   ""          : "showMedianrent", // Default display
				"pcthchild" : "showPcthchild",
				"pct_finance" : "showPct_finance",
				"pctind_professional" : "showPct_professional",
				"pctocc_profmanage" : "showPctocc_profmanage",
				"pctcollege" : "showPctcollege",
				"pctinc_0_25k" : "showPctinc_0_25k",
				"pctinc_25k_50k" : "showPctinc_25k_50k",
				"pctinc_50k_100k" : "showPctinc_50k_100k",
				"pctinc_100k_more" : "showPctinc_100k_more",
				"medhhincome" : "showMedhhincome",
				"pctpoverty" : "showPctpoverty",
				"pctpublicassist" : "showPctpublicassist",
				"units" : "showUnits",
				"pctown" : "showPctown",
				"pctrent" : "showPctrent",
				"pctvacant" : "showPctvacant",
				"medianvalue" : "showMedianvalue",
				"medianrent" : "showMedianrent",
				"medianpctincomerent" : "showMedianpctincomerent",
				"pctinc_mortgage_30_more" : "showPctinc_mortgage_30_more",
				"pctsameres" : "showPctsameres"
		  },

		  showPcthchild: function(){
			S.setPropertyBrewer("pcthhchild", "PuRd");
		  },

		  showPct_finance: function(){

			S.setPropertyBrewer("pctind_finance", "PuRd");
		  },

		  showPct_professional: function(){

			S.setPropertyBrewer("pctind_professional", "PuRd");
		  },

		  showPctocc_profmanage: function(){

			S.setPropertyBrewer("pctocc_profmanage", "PuRd");
		  },

		  showPctcollege: function(){

			S.setPropertyBrewer("pctcollege", "PuRd");
		  },

		  showPctinc_0_25k: function(){

		  	S.setPropertyBrewer("pctinc_0k_25k", "GnBu");

		  },

		  showPctinc_25k_50k: function(){
		  	S.setPropertyBrewer("pctinc_25k_50k", "GnBu");

		  },

		  showPctinc_50k_100k: function(){
		  	S.setPropertyBrewer("pctinc_50k_100k", "GnBu");

		  },

		  showPctinc_100k_more: function(){
		  	S.setPropertyBrewer("pctinc_100k_more", "GnBu");

		  },

		  showMedhhincome: function(){
			S.setPropertyBrewer("medianhhincome", "GnBu");
		  },

		  showPctpoverty: function(){

			S.setPropertyBrewer("pctpoverty", "GnBu");
		  },

		  showPctpublicassist: function(){
			S.setPropertyBrewer("pctpublicassist", "GnBu");
		  },

		  showUnits: function(){
			S.setPropertyBrewer("units", "OrRd");
		  },

		  showPctown: function(){
			S.setPropertyBrewer("pctown", "OrRd");
		  },

		  showPctrent: function(){
			S.setPropertyBrewer("pctrent", "OrRd");
		  },

		  showPctvacant: function(){
			S.setPropertyBrewer("pctvacant", "OrRd");
		  },

		  showMedianvalue: function() {
		  	S.setPropertyBrewer("medianvalue", "OrRd");

		  },

		  showMedianrent: function(){
			S.setPropertyBrewer("medianrent", "OrRd");
		  },

		  showMedianpctincomerent : function(){
			S.setPropertyBrewer("medianpctincomerent", "GnBu");
		  },

		  showPctsameres: function(){
		  	S.setPropertyBrewer("pctsameres", "OrRd");
		  }

	});


	function initialize(){
		// Initializer function for the Router.
		// Initializes the 'script' module because the route callbacks reply on S being set up.
		S.initialize();
		var router = new MapRouter();
		Backbone.history.start();
	}

	return {
    initialize: initialize
  };

});
