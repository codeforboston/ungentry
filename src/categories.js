define([], function() {
    return [
        {
            name: "Individual",
            dropdown: "ul.cat-household",
            // varnames should be an array of arrays.  When the menu is
            // constructed, the resulting menu items will be separated
            // by dividers.
            varnames: [["pcthhchild", "pctcollege", "pctind_professional",
                        "pctocc_profmanage", "pctind_finance"]]
        },

        {
            name: "Housing",
            dropdown: "ul.cat-housing",
            varnames: [["units", "pctrent", "pctown", "pctvacant"],
                       ["medianrent", "medianpctincomerent"]]
        },

        {
            name: "Income",
            dropdown: "ul.cat-income",
            varnames: [["medianhhincome", "pctpoverty", "pctpublicassist"],
                       ["pctinc_0k_25k", "pctinc_25k_50k", "pctinc_50k_100k",
                        "pctinc_100k_more"]]
        }
    ];
});
