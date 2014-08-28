//define router class

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
	  	         "pctincomerent_30_more" : "showPctincomerent_30_more",
	  	         "medianpctincomerent" : "showMedianpctincomerent",
	  	         "pctinc_mortgage_30_more" : "showPctinc_mortgage_30_more",
	  	         "pctsameres" : "showPctsameres",
	  	         "pctind_info" : "showPctind_info",
	  	         "pctunits_newres_2000" : "showPctunits_newres_2000",
	  	         "pctunits_newres" : "showPctunits_newres",

	  },

	  showPcthchild: function(){
		setProperty("pcthhchild", "#FFFF33", "#FF00CC"); 
	  },

	  showPct_finance: function(){
		//setProperty("pctind_finance", "#CCFFCC", "#9900FF"); 
		setPropertyBrewer("pctind_finance", "BuPu");	
	  },

	  showPct_professional: function(){
		//setProperty("pctind_professional", "#FF0033", "#9933FF"); 
		setPropertyBrewer("pctind_professional", "BuPu"); 
	  },

	  showPctocc_profmanage: function(){
		setProperty("pctocc_profmanage", "#99FF66", "#000099"); 
	  },

	  showPctcollege: function(){
		setProperty("pctcollege", "#FFFFFF", "#FF3333"); 
	  },

	  showPctinc_0_25k: function(){
	  	setProperty("pctinc_0_10k", "#99FF66", "#000099");

	  },

	  showPctinc_25k_50k: function(){

	  },

	  showPctinc_50k_100k: function(){

	  },

	  showPctinc_100k_more: function(){

	  },

	  showMedhhincome: function(){
		setPropertyBrewer("medianhhincome", "OrRd");
	  },

	  showPctpoverty: function(){
		//setProperty("pctpoverty", "#07E500", "blue"); 
		setPropertyBrewer("pctpoverty", "BuGn");
	  },

	  showPctpublicassist: function(){
		setPropertyBrewer("pctpublicassist", "OrRd");
	  },

	  showUnits: function(){
		setPropertyBrewer("units", "OrRd");
	  },

	  showPctown: function(){
		setPropertyBrewer("pctown", "OrRd");
	  },

	  showPctrent: function(){
		setPropertyBrewer("pctrent", "OrRd");
	  },

	  showPctvacant: function(){
		setPropertyBrewer("pctvacant", "OrRd");
	  },

	  showMedianvalue: function() {

	  },

	  showMedianrent: function(){
		//setProperty("medianrent", "yellow", "red");
		setPropertyBrewer("medianrent", "OrRd"); 
	  },

	  showMedianpctincomerent : function(){
		setPropertyBrewer("medianpctincomerent", "GnBu"); 
	  },

	  showPctincomerent_30_more: function(){

	  },

	  showPctinc_mortgage_30_more: function(){

	  },

	  showPctsameres: function(){

	  },

	  showPctind_info: function(){

	  },

	  showPctunits_newres: function(){

	  },

	  showPctunits_newres_2000: function(){

	  }

	  
});


function initMapRouter(){
	var router = new MapRouter();
	Backbone.history.start();
}

