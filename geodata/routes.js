//define router class

var MapRouter = Backbone.Router.extend ({
	  routes: {
	  	         "pcthchild" : "showPcthchild",
	  	         "pct_finance" : "showPct_finance",
	  	         "pctind_professional" : "showPct_professional",
	  	         "pctocc_profmanage" : "showPctocc_profmanage",
	  	         "pctcollege" : "showPctcollege",
	  	         "pctinc_0_10k" : "showPctinc_0_10k",
	  	         "pctinc_10k_15k" : "showPctinc_10k_15k",
	  	         ""
	  }
})