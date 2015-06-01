'use strict';
define([], function() {
    return {
        'totalpop': {
            'desc': 'Total population per census tract',
            'props': 'PuRd',
            'name': 'Total Pop per Tract',
            'category': 'People'
        },
        'households': {
            'desc': 'Number of households per census tract',
            'props': 'PuRd',
            'name': 'Households per Census Tract',
            'category': 'People'
        },
        'pcthhchild': {
            'desc': 'Percentage of households with children residing in them.',
            'props': 'PuRd',
            'name': '% of Households with Children',
            'category': 'People'
        },
        'pctpoverty': {
            'name': '% of Residents in Poverty',
            'desc': 'Percentage of people living under the federal poverty line in a given census tract.',
            'props': 'GnBu',
            'category': 'Economic'
        },
        'pctcollege': {
            'name': '% College Educated',
            'desc': 'Percentage of people who possess a college degree.',
            'props': 'PuRd',
            'category': 'People'
        },
        'pctinc_100k_more': {
            'name': '% Of Household inc. 100K and up',
            'desc': 'Percentage of people that have an income of $100,000 or more in a given census tract.',
            'props': 'GnBu',
            'category': 'Economic'
        },
        'medianhhincome': {
            'name': 'Median Household Income',
            'desc': 'Median income of all households in a given census tract.',
            'props': 'GnBu',
            'category': 'Economic'
        },
        'units': {
            'name': 'Number of Housing Units',
            'desc': 'Number of housing units per census tract',
            'props': 'OrRd',
            'category': 'Housing'
        },
        'pctown': {
            'name': '% of Units Owned',
            'desc': 'Percentage of housing units that are owner-occupied in a given census tract.',
            'props': 'OrRd',
            'category': 'Housing'
        },
        'pctrent': {
            'name': '% of Units Rented',
            'desc': 'Percentage of housing units that are renter-occupied in a given census tract.',
            'props': 'OrRd',
            'category': 'Housing'
        },
        'pctrent_300_600_': {
            'name': '% unit $300-$600',
            'desc': 'Percentage of housing units that are rented for between $300 and $600.',
            'props': 'OrRd',
            'category': 'Housing'
        },
        'pctrent_600_750':{
            'name': '% unit $600-$750',
            'desc': 'Percentage of housing units that are rented for between $600 and $750.',
            'props': 'OrRd',
            'category': 'Housing'
        },
        'pctrent_750_1000':{
            'name': '% unit $750-$1000',
            'desc': 'Percentage of housing units that are rented for between $750 and $1000.',
            'props': 'OrRd',
            'category': 'Housing'
        },
        'pctrent_1000_more':{
            'name': '% unit $1000 more',
            'desc': 'Percentage of housing units that are rented for $1000 or more.',
            'props': 'OrRd',
            'category': 'Housing'
        },
        'pctvacant': {
            'name': '% of Units Vacant',
            'desc': 'Percentage of housing units that are vacant in a given census tract.',
            'props': 'OrRd',
            'category': 'Housing'
        },
        'medianvalue': {
            'name': 'Median Home Value',
            'desc': 'Median value of housing units over a given census tract.',
            'props': 'OrRd',
            'category': 'Housing'
        },
        'medianrent': {
            'name': 'Median rent',
            'desc': 'Median rent paid by residents of a given census tract.',
            'props': 'OrRd',
            'category': 'Housing'
        },
        'medianpctincomerent': {
            'name': 'Median % of Income as Rent',
            'desc': "Median percentage of residents' income that is paid for rent.",
            'props': 'GnBu',
            'category': 'Housing'
        },
        'pctincomerent_30_more':{
            'name': '% Res Paying 30% inc as Rent',
            'desc': 'Percentage of residents paying 30% or more of their income for rent.',
            'props': 'GnBu',
            'category': 'Housing'
        },
        'pctinc_mortgage_30_more':{
            'name': '% Res Paying 30% inc as Mortgage',
            'desc': 'Percentage of residents paying 30% of their income for a mortgage.',
            'props': 'GnBu',
            'category': 'Housing'
        },
        'pctsameres': {
            'name': '% of owner-occupied',
            'desc': '',
            'props': 'OrRd',
            'category': 'Housing'
        }
    };
});
