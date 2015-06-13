'use strict';
define([], function() {
    return [
        {
            name: 'Individual',
            dropdown: 'ul.cat-household',
            // varnames should be an array of arrays.  When the menu is
            // constructed, the resulting menu items will be separated
            // by dividers.
            varnames: [['totalpop', 'households', 'pcthhchild', 'pctcollege']]
        },

        {
            name: 'Income',
            dropdown: 'ul.cat-income',
            varnames: [['medianhhincome', 'pctpoverty', 'pctinc_100k_more']]
        },        

        {
            name: 'Housing',
            dropdown: 'ul.cat-housing',
            varnames: [['units', 'medianvalue', 'pctrent', 'pctown', 'pctsameres', 'pctvacant'],
                       ['medianrent', 'medianpctincomerent', 'pctincomerent_30_more', 'pctinc_mortgage_30_more']
                       //,['pctrent_300_600','pctrent_600_750', 'pctrent_750_1000', 'pctrent_1000_more']
                       ]
        }


    ];
});
