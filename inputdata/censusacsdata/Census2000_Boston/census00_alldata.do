//////////////////////////////////////////
// Created by: Jackie Hwang 
// Date: July 22, 2014						
// Project: Code for Boston Ungentry
// Re: Get 2000 Census Data 
//////////////////////////////////////////

///// The Data /////
* The data is from Social Explorer for Suffolk, Norfolk, and Middlesex Counties in MA
* The data is for 2000 for census tracts for selected variables
* The raw data is in .txt format and is saved as "census00_alldata.txt"
* The file "census00_alldata_vars_dictionary.txt" describes the variables in the data.

///// This File ////
* This code imports the raw data in Stata, 
* cleans the data into variables that we need, 
* removes irrelevant variables, 
* crosswalks the data to 2010 census boundary delineations 
* (the census changes the boundaries each year), 
* calculates the data into percentages 
* (a lot of the data exists as counts), 
* and saves the final file as as .csv: "census00_alldata_pcts_2010.csv"

* The crosswalk code uses aerial weights interpolation methods, 
* and was written by  Brian J. Stults for 
* the Longitudinal Tract Data Base at Brown University

// Import the raw data
clear
cd "C:\Users\Jackie\Documents\GitHub\ungentry\inputdata\censusacsdata\"
set more off
import delimited C:\Users\Jackie\Documents\GitHub\ungentry\inputdata\censusacsdata\Census2000_Boston\census00_alldata.txt, case(upper)

// Rename relevant variables and create new variables of interest
rename GEO_FIPS tractid00
rename T001_001 totalpop
rename T020_001 households
rename T020_002 hhfam
rename T025_006 hhchild
rename PCT_T025_006 pcthhchild
gen poverty = T183_002 + T183_005
rename T040_001 popu25
gen college = T040_005 + T040_006 + T040_007 + T040_008
gen pctcollege = PCT_T040_005 + PCT_T040_006 + PCT_T040_007 + PCT_T040_008
rename T085_013 ind_finance
rename T085_016 ind_professional
rename PCT_T085_013 pctind_finance
rename PCT_T085_016 pctind_professional
gen occ_profmanage = ( T088_002 + T088_003 + T087_002 + T087_003) 
gen pctocc_profmanage = ( T088_002 + T088_003 + T087_002 + T087_003) / ( T087_001 + T088_001) * 100
rename T197_001 popu5
rename T197_002 sameres
rename PCT_T197_002 pctsameres
rename H038001 unitsocc
gen units_newres = H038010 + H038011 + H038003 + H038004
gen pctunits_newres = PCT_H038010 + PCT_H038011 + PCT_H038003 + PCT_H038004
rename T092_002 inc_0_10K
rename T092_003 inc_10K_15K
rename T092_004 inc_15K_20K
rename T092_005 inc_20K_25K
rename T092_006 inc_25K_30K
rename T092_007 inc_30K_35K
rename T092_008 inc_35K_40K
rename T092_009 inc_40K_45K
rename T092_010 inc_45K_50K
rename T092_011 inc_50K_60K
rename T092_012 inc_60K_75K
rename T092_013 inc_75K_100K
rename T092_014 inc_100K_125K
rename T092_015 inc_125K_150K
rename PCT_T092_002 pctinc_0_10K
rename PCT_T092_003 pctinc_10K_15K
rename PCT_T092_004 pctinc_15K_20K
rename PCT_T092_005 pctinc_20K_25K
rename PCT_T092_006 pctinc_25K_30K
rename PCT_T092_007 pctinc_30K_35K
rename PCT_T092_008 pctinc_35K_40K
rename PCT_T092_009 pctinc_40K_45K
rename PCT_T092_010 pctinc_45K_50K
rename PCT_T092_011 pctinc_50K_60K
rename PCT_T092_012 pctinc_60K_75K
rename PCT_T092_013 pctinc_75K_100K
rename PCT_T092_014 pctinc_100K_125K
rename PCT_T092_015 pctinc_125K_150K
gen inc_150K_more = T092_016 + T092_017
gen pctinc_150K_more = PCT_T092_016 + PCT_T092_017
rename T093_001 medhhincome
rename T142_002 publicassist
rename PCT_T142_002 pctpublicassist
rename T155_001 units

rename T156_002 own
rename T156_003 rent
rename PCT_T156_002 pctown
rename PCT_T156_003 pctrent
rename T157_003 vacant
rename PCT_T157_003 pctvacant
rename T163_001 medianvalue
rename T165_001 unitsrent
rename T165_002 rent_0_300
rename T165_003 rent_300_600
rename T165_004 rent_600_800
rename T165_005 rent_800_1000
rename T165_006 rent_1000_1250
rename T165_007 rent_1250_1500
rename T165_008 rent_1500_2000
rename T165_009 rent_2000_more
rename PCT_T165_002 pctrent_0_300
rename PCT_T165_003 pctrent_300_600
rename PCT_T165_004 pctrent_600_800
rename PCT_T165_005 pctrent_800_1000
rename PCT_T165_006 pctrent_1000_1250
rename PCT_T165_007 pctrent_1250_1500
rename PCT_T165_008 pctrent_1500_2000
rename PCT_T165_009 pctrent_2000_more
gen incomerent_30_more = T166_004 + T166_005
gen pctincomerent_30_more = PCT_T166_004 + PCT_T166_005
rename T167_001 medianrent
rename T168_001 medianpctincomerent
rename T172_004 inc_mortgage_30_more  
rename T172_009 inc_nomortgage_30_more 
rename PCT_T172_004 pctinc_mortgage_30_more 
rename PCT_T172_009 pctinc_nomortgage_30_more
rename T069_005 popuempl
rename T171_002 unitsmortgage

drop T069_001 T069_002 T069_003 T069_004 T069_006 T069_007
drop T171_001 T171_003 T171_004 T171_005 T171_006 T171_007 T171_008
drop T183_001 T183_002 T183_003 T183_004 T183_005 T183_006
drop PCT_T183_002 PCT_T183_003 PCT_T183_005 PCT_T183_006
drop T020_003 T020_004 T020_005 T020_006 T020_007 T020_008 T020_009
drop PCT_T020_002 PCT_T020_003 PCT_T020_004 PCT_T020_005 PCT_T020_006 PCT_T020_007 PCT_T020_008 PCT_T020_009
drop T025_001 T025_002 T025_003 T025_004 T025_005
drop T025_007 T025_008 T025_009 T025_010
drop T025_011 T025_012 T025_013 T025_014 T025_015
drop T025_016 T025_017 T025_018
drop PCT_T025_002 PCT_T025_003 PCT_T025_004 PCT_T025_005
drop PCT_T025_007 PCT_T025_008 PCT_T025_009 PCT_T025_010
drop PCT_T025_011 PCT_T025_012 PCT_T025_013 PCT_T025_014 PCT_T025_015
drop PCT_T025_016 PCT_T025_017 PCT_T025_018
drop T040_002 T040_003 T040_004 T040_005 T040_006 T040_007 T040_008
drop PCT_T040_002 PCT_T040_003 PCT_T040_004 PCT_T040_005 PCT_T040_006 PCT_T040_007 PCT_T040_008
drop T085_001 T085_002 T085_003 T085_004 T085_005 T085_006 T085_007 T085_008 T085_009 T085_010
drop T085_017 T085_018 T085_019 T085_020
drop T085_021 T085_022 T085_023 T085_024 T085_025 T085_026 T085_027
drop PCT_T085_002 PCT_T085_003 PCT_T085_004 PCT_T085_005 PCT_T085_006 PCT_T085_007 PCT_T085_008 PCT_T085_009 PCT_T085_010
drop PCT_T085_011 PCT_T085_012 PCT_T085_014 PCT_T085_015 PCT_T085_017 PCT_T085_018 PCT_T085_019 PCT_T085_020
drop PCT_T085_021 PCT_T085_022 PCT_T085_023 PCT_T085_024 PCT_T085_025 PCT_T085_026 PCT_T085_027
drop T087_001 T087_002 T087_003 T087_004 T087_005 T087_006 T087_007 T087_008 T087_009 T087_010
drop T087_011 T087_012 T087_013 T087_014
drop PCT_T087_002 PCT_T087_003 PCT_T087_004 PCT_T087_005 PCT_T087_006 PCT_T087_007 PCT_T087_008 PCT_T087_009 PCT_T087_010
drop T085_011 T085_012 T085_014 T085_015
drop PCT_T087_011 PCT_T087_012 PCT_T087_013 PCT_T087_014
drop T088_001 T088_002 T088_003 T088_004 T088_005 T088_006 T088_007 T088_008 T088_009 T088_010
drop T088_011 T088_012 T088_013 T088_014
drop PCT_T088_002 PCT_T088_003 PCT_T088_004 PCT_T088_005 PCT_T088_006 PCT_T088_007 PCT_T088_008 PCT_T088_009 PCT_T088_010
drop PCT_T088_011 PCT_T088_012 PCT_T088_013 PCT_T088_014
drop T092_001
drop T092_016 T092_017
drop PCT_T092_016 PCT_T092_017
drop T142_001 T142_003
drop PCT_T142_003
drop T156_001
drop T157_001 T157_002 PCT_T157_002
drop T166_001 T166_002 T166_003 T166_004 T166_005 T166_006
drop PCT_T166_002 PCT_T166_003 PCT_T166_004 PCT_T166_005 PCT_T166_006
drop T172_001 T172_002 T172_003
drop T172_005 T172_006 T172_007 T172_008
drop T172_010 T172_011 PCT_T172_002 PCT_T172_003
drop PCT_T172_005 PCT_T172_006 PCT_T172_007 PCT_T172_008
drop PCT_T172_010 PCT_T172_011
drop T179_001 T179_002 T179_003 T179_004 T179_005 T179_006 T179_007 T179_008 T179_009 T179_010
drop T179_011
drop PCT_T179_002 PCT_T179_003 PCT_T179_004 PCT_T179_005 PCT_T179_006 PCT_T179_007 PCT_T179_008 PCT_T179_009 PCT_T179_010
drop PCT_T179_011
drop T197_003 T197_004 T197_005 T197_006 T197_007 T197_008 T197_009 T197_010
drop T197_011 T197_012 T197_013 T197_014 T197_015 T197_016 T197_017 T197_018
drop PCT_T197_003 PCT_T197_004 PCT_T197_005 PCT_T197_006 PCT_T197_007 PCT_T197_008 PCT_T197_009 PCT_T197_010
drop PCT_T197_011 PCT_T197_012 PCT_T197_013 PCT_T197_014 PCT_T197_015 PCT_T197_016 PCT_T197_017 PCT_T197_018
drop H038002 H038003 H038004 H038005 H038006 H038007 H038008 H038009 H038010
drop H038011 H038012 H038013 H038014 H038015
drop PCT_H038002 PCT_H038003 PCT_H038004 PCT_H038005 PCT_H038006 PCT_H038007 PCT_H038008 PCT_H038009 PCT_H038010
drop PCT_H038011 PCT_H038012 PCT_H038013 PCT_H038014 PCT_H038015

// Set up variables for the crosswalk code
* The code doesn't like reusing variable names
tostring tractid00, generate(tractid) format(%11.0f)
rename medhhincome medianhhincome
gen households2 = households
gen own2 = own
gen unitsrent2 = unitsrent
gen unitsrent3 = unitsrent

*convert to stata format and save 
save "C:\Users\Jackie\Documents\GitHub\ungentry\inputdata\censusacsdata\Census2000_Boston\census00_alldata.dta", replace

global input_file "C:\Users\Jackie\Documents\GitHub\ungentry\inputdata\censusacsdata\Census2000_Boston\census00_alldata.dta"
global output_file "C:\Users\Jackie\Documents\GitHub\ungentry\inputdata\censusacsdata\Census2000_Boston\census00_alldata_2010.dta"
global crosswalk_file "C:\Users\Jackie\Documents\GitHub\ungentry\inputdata\censusacsdata\Census2000_Boston\crosswalk_2000_2010.dta"
global crosswalk_year "00"
global input_idvar "tractid"
global counts "totalpop households hhfam hhchild popu25 popuempl ind_finance ind_professional inc_0_10K inc_10K_15K inc_15K_20K inc_20K_25K inc_25K_30K inc_30K_35K inc_35K_40K inc_40K_45K inc_45K_50K inc_50K_60K inc_60K_75K inc_75K_100K inc_100K_125K inc_125K_150K publicassist units own rent unitsocc vacant unitsrent rent_0_300 rent_300_600 rent_600_800 rent_800_1000 rent_1000_1250 rent_1250_1500 rent_1500_2000 rent_2000_more unitsmortgage inc_mortgage_30_more inc_nomortgage_30_more popu5 sameres units_newres  college occ_profmanage inc_150K_more  incomerent_30_more poverty"
global medians "medianhhincome medianvalue medianrent medianpctincomerent"
global median_weights "households2 own2 unitsrent2 unitsrent3"

/****************************************************
             Explanation of user inputs
 ****************************************************

 - "input_file" is the name of your data file in
   STATA format.

 - "output_file" is the name you would like to give
   the data file that is produced by this program.

 - "crosswalk_file" is the name of the crosswalk file
   that you obtained.

 - "crosswalk_year" is the 2-digit year that is
   being interpolated to 2010 by this crosswalk file.
   It must be either 70, 80, 90, or 00 depending on
   which crosswalk is being used.

 - "input_idvar" is the tract identification variable
   in the input data file.  This must be a string
   variable with the following 11 digits:
     1-2  FIPS state code
     3-5  FIPS county code
     6-11 Census tract code (without decimals)
   All codes must be padded with zeros.  For example,
   state code "1" must be expressed as "01", and
   tract code "41.5" must be expressed as "004150".

 - "counts" is a space-separated list of all the
   count variables that you would like to interpolate.
   If you do not have any count variables to
   interpolate, leave these double-quotes empty.

 - "medians" is a space-separated list of all the
   median/mean/rate variables that you would like
   to interpolated as weighted average statistics.
   If you do not have any medians to interpolate,
   leave these double-quotes empty.

 - "median_weights" is a space-separated list of
   the base variables for the meian/mean/rate
   variables that are listed in "medians".  For
   example, the base variable for median household
   income would be the total number of households.
   Note that these variables must be listed in
   the same order that you listed your "medians" on
   the previous line.  If you do not have any medians
   to interpolate, leave these double-quotes empty.

****************************************************/

/****************************************************
 Open the user data file, keep the listed variables,
 and merge with the crosswalk
 ****************************************************/
use $input_file
keep $input_idvar $counts $medians $median_weights
rename $input_idvar oldid
rename oldid trtid$crosswalk_year
merge trtid$crosswalk_year using $crosswalk_file, sort uniqmaster
tab _merge
keep if (_merge == 3)
drop _merge

/****************************************************
 Set up flag identifying cases where all segments of
 a 2010 tract have missing values for a variable.
 These will be incorrectly set to zero when cases
 are collapsed into 2010 tracts, so they must be
 flagged and set back to missing after the collapse.
 ****************************************************/
foreach x of varlist $counts $medians $median_weights {
  bysort trtid$crosswalk_year (`x') : gen allmiss_`x' = mi(`x')
  global allmiss_vars $allmiss_vars allmiss_`x'
}

/****************************************************
 Weight the medians by their base variable.
 Temporarily set the base variable to missing if
 the median is missing.  Otherwise the value used
 later to unweight any aggregated medians will be
 incorrect.
 ****************************************************/
global n_medians : word count $medians
global i = 1
while $i <= $n_medians {
  global median : word $i of $medians
  global weight : word $i of $median_weights
  gen weight_$median = $weight if ($median != .)
  replace $median = $median * weight_$median
  global missweights $missweights weight_$median
  global i = $i + 1
}

/****************************************************
 apply the interpolation weight
 ****************************************************/
foreach x of varlist $counts $medians $median_weights $missweights {
  replace `x' = `x' * weight
}

/****************************************************
 collapse into 2010 census tracts
 ****************************************************/
 //!!! this line isn't working
collapse (sum) $counts $medians $median_weights $missweights (min) $allmiss_vars, by(trtid10)

/****************************************************
 Set each variable to missing if it was missing for
 all segments before collapsing into 2010 census
 tracts.  Otherwise they are automatically set to
 zero, which is incorrect.
 ****************************************************/
foreach x of varlist $counts $medians $median_weights {
  replace `x' = . if (allmiss_`x' == 1)
}

/****************************************************
 unweight the median variables to generate the final
 weighted averages
 ****************************************************/
global i = 1
while $i <= $n_medians {
  global median : word $i of $medians
  global missweight : word $i of $missweights
  replace $median = $median / $missweight
  global i = $i + 1
}

global i = 1
while $i <= $n_medians {
  global median : word $i of $medians
  global weight : word $i of $median_weights
  replace $median = . if ($weight == 0)
  global i = $i + 1
}
/****************************************************
 sort and save
 ****************************************************/
drop $missweights $allmiss_vars
sort trtid10
save $output_file, replace
summ

/****************************************************
 written 10/24/2011 by Brian J. Stults
 ****************************************************/

//convert data back to percentages
use "C:\Users\Jackie\Documents\GitHub\ungentry\inputdata\censusacsdata\Census2000_Boston\Census2000_Boston_counts_2010.dta", clear
rename trtid10 tractid10
drop households2 own2 unitsrent2 unitsrent3
gen pcthhchild = hhchild / hhfam * 100
gen pctind_finance = ind_finance/ popuempl * 100
gen pctind_professional = ind_professional / popuempl * 100
gen pctocc_profmanage = occ_profmanage / popuempl * 100
gen pctcollege = college / popu25 * 100
gen pctinc_0_10k = inc_0_10k / households * 100
gen pctinc_10k_15k = inc_10k_15k / households * 100
gen pctinc_15k_20k = inc_15k_20k / households * 100
gen pctinc_20k_25k = inc_20k_25k / households * 100
gen pctinc_25k_30k = inc_25k_30k / households * 100
gen pctinc_30k_35k = inc_30k_35k / households * 100
gen pctinc_35k_40k = inc_35k_40k / households * 100
gen pctinc_40k_45k = inc_40k_45k / households * 100
gen pctinc_45k_50k = inc_45k_50k / households * 100
gen pctinc_50k_60k = inc_50k_60k / households * 100
gen pctinc_60k_75k = inc_60k_75k / households * 100
gen pctinc_75k_100k = inc_75k_100k / households * 100
gen pctinc_100k_125k = inc_100k_125k / households * 100
gen pctinc_125k_150k = inc_125k_150k / households * 100
gen pctinc_150k_more = inc_150k_more / households * 100
gen pctpoverty = poverty /totalpop * 100
gen pctpublicassist = publicassist / households * 100
gen pctown = own / unitsocc * 100
gen pctrent = rent / unitsocc * 100
gen pctvacant = vacant / units * 100
gen pctrent_0_300 = rent_0_300 / unitsrent * 100
gen pctrent_300_600 = rent_300_600 / unitsrent * 100 
gen pctrent_600_800 = rent_600_800 / unitsrent * 100
gen pctrent_800_1000 = rent_800_1000 / unitsrent * 100
gen pctrent_1000_1250 = rent_1000_1250 / unitsrent * 100
gen pctrent_1250_1500 = rent_1250_1500 / unitsrent * 100
gen pctrent_1500_2000 = rent_1500_2000 / unitsrent * 100
gen pctrent_2000_more = rent_2000_more / unitsrent * 100
gen pctincomerent_30_more = incomerent_30_more / rent * 100   
gen pctinc_mortgage_30_more  = inc_mortgage_30_more / unitsmortgage * 100
gen pctinc_nomortgage_30_more = inc_nomortgage_30_more / unitsmortgage * 100
gen pctsameres = sameres / popu5 * 100
gen pctunits_newres = units_newres / unitsocc * 100

// drop unnecessary count variables
drop hhfam hhchild popu25 popuempl ind_finance ind_professional inc_0_10k inc_10k_15k inc_15k_20k inc_20k_25k inc_25k_30k inc_30k_35k inc_35k_40k inc_40k_45k inc_45k_50k inc_50k_60k inc_60k_75k inc_75k_100k inc_100k_125k inc_125k_150k publicassist own rent unitsocc vacant unitsrent rent_0_300 rent_300_600 rent_600_800 rent_800_1000 rent_1000_1250 rent_1250_1500 rent_1500_2000 rent_2000_more unitsmortgage inc_mortgage_30_more inc_nomortgage_30_more popu5 sameres units_newres college occ_profmanage inc_150k_more incomerent_30_more poverty

// save as a Stata file
save "C:\Users\Jackie\Documents\GitHub\ungentry\inputdata\censusacsdata\Census2000_Boston\census00_alldata_pcts_2010.dta", replace

// save as a csv file 
export delimited using "C:\Users\Jackie\Documents\GitHub\ungentry\inputdata\censusacsdata\Census2000_Boston\census00_alldata_pcts_2010.csv", replace
