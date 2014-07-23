//////////////////////////////////////////
// Created by: Jackie Hwang 
// Date: July 15, 2014						
// Project: Code for Boston Ungentry
// Re: Get 1990 Census Data 
//////////////////////////////////////////

///// The Data /////
* The data is from Social Explorer for Suffolk, Norfolk, and Middlesex Counties in MA
* The data is for 1990 for census tracts for selected variables
* The raw data is in .txt format and is saved as "census90_alldata.txt"
* The file "census90_alldata_vars_dictionary.txt" describes the variables in the data.

///// This File ////
* This code imports the raw data in Stata, 
* cleans the data into variables that we need, 
* removes irrelevant variables, 
* crosswalks the data to 2010 census boundary delineations 
* (the census changes the boundaries each year), 
* calculates the data into percentages 
* (a lot of the data exists as counts), 
* and saves the final file as as .csv: "census90_alldata_pcts_2010.csv"

* The crosswalk code uses aerial weights interpolation methods, 
* and was written by  Brian J. Stults for 
* the Longitudinal Tract Data Base at Brown University



// Import the raw data
clear
cd "C:\Users\Jackie\Documents\GitHub\ungentry\inputdata\censusacsdata\"
set more off
import delimited C:\Users\Jackie\Documents\GitHub\ungentry\inputdata\censusacsdata\Census1990_Boston\census90_alldata.txt, case(upper)

// Rename relevant variables and create new variables of interest
rename GEO_FIPS tractid90
rename T093_001 popupov
rename T093_006 poverty
rename PCT_T093_006 pctpoverty
rename P043_001 popu5
rename P043_002 sameres
rename PCT_P043_002 pctsameres
gen units_newres = H028_002 + H028_003
gen pctunits_newres = PCT_H028_002 + PCT_H028_003
rename T001_001 totalpop
rename T016_001 households
rename T019_003 hhfam
rename T019_006 hhchild
rename PCT_T019_006 pcthhchild
rename T022_001 popu25
rename T038_001 popuempl
rename T038_011 ind_finance
rename T038_015 ind_professional
rename T039_002 occ_profmanage
gen college = T022_005 + T022_006
gen pctcollege = PCT_T022_005 + PCT_T022_006
rename T041_002 inc_0_5K
rename T041_003 inc_5K_10K
rename PCT_T038_011 pctind_finance
rename PCT_T038_015 pctind_professional
rename PCT_T039_002 pctocc_profmanage
rename PCT_T041_002 pctinc_0_5K
rename PCT_T041_003 pctinc_5K_10K
gen inc_10K_15K = T041_004 + T041_005
gen inc_15K_20K = T041_006 + T041_007
gen inc_20K_25K = T041_008 + T041_009
gen inc_25K_30K = T041_010 + T041_011
gen inc_30K_35K = T041_012 + T041_013
gen inc_35K_40K = T041_014 + T041_015
gen inc_40K_45K = T041_016 + T041_017
gen inc_45K_50K = T041_018 + T041_019
gen pctinc_10K_15K = PCT_T041_004 + PCT_T041_005
gen pctinc_15K_20K = PCT_T041_006 + PCT_T041_007
gen pctinc_20K_25K = PCT_T041_008 + PCT_T041_009
gen pctinc_25K_30K = PCT_T041_010 + PCT_T041_011
gen pctinc_30K_35K = PCT_T041_012 + PCT_T041_013
gen pctinc_35K_40K = PCT_T041_014 + PCT_T041_015
gen pctinc_40K_45K = PCT_T041_016 + PCT_T041_017
gen pctinc_45K_50K = PCT_T041_018 + PCT_T041_019
rename T041_020 inc_50K_55K
rename T041_021 inc_55K_60K
rename T041_022 inc_60K_75K
rename T041_023 inc_75K_100K
rename T041_024 inc_100K_125K
rename T041_025 inc_125K_150K
rename T041_026 inc_150K_more
rename PCT_T041_020 pctinc_50K_55K
rename PCT_T041_021 pctinc_55K_60K
rename PCT_T041_022 pctinc_60K_75K
rename PCT_T041_023 pctinc_75K_100K
rename PCT_T041_024 pctinc_100K_125K
rename PCT_T041_025 pctinc_125K_150K
rename PCT_T041_026 pctinc_150K_more
rename T043_001 medhhincome
rename T072_001 units
rename T073_001 unitsocc
rename T073_002 own
rename T073_003 rent
rename T074_003 vacant
rename T062_002 publicassist
rename PCT_T073_002 pctown
rename PCT_T073_003 pctrent
rename PCT_T074_003 pctvacant
rename PCT_T062_002 pctpublicassist
rename T080_001 medianvalue
rename T081_002 unitsrent
rename T081_003 rent_0_300
rename T081_004 rent_300_600
rename T081_005 rent_600_750
rename T081_006 rent_750_1000
rename T081_007 rent_1000_more
rename PCT_T081_003 pctrent_0_300
rename PCT_T081_004 pctrent_300_600
rename PCT_T081_005 pctrent_600_750
rename PCT_T081_006 pctrent_750_1000
rename PCT_T081_007 pctrent_1000_more
rename T082_001 medianrent
gen incomerent_30_more = T083_005 + T083_006
gen pctincomerent_30_more = PCT_T083_005 + PCT_T083_006
rename T084_001 medianpctincomerent
rename T088_002 unitsmortgage
rename T088_004 inc_mortgage_30_more
rename T088_008 inc_nomortgage_30_more
rename PCT_T088_004 pctinc_mortgage_30_more
rename PCT_T088_008 pctinc_nomortgage_30_more

// drop the remaining unnecessary variables 
drop T074_001 T074_002 PCT_T074_002
drop T083_001 T083_002 T083_003 T083_004 T083_007 
drop PCT_T083_002 PCT_T083_003 PCT_T083_004 PCT_T083_007
drop T083_005 T083_006 PCT_T083_005 PCT_T083_006
drop T085_001 T087_001 T087_002 T087_003 PCT_T087_002 PCT_T087_003 
drop T088_001 T088_003 T088_005 T088_006 T088_007 T088_009
drop T065_001 T066_001 T067_001 T068_001 T069_001 T070_001 T071_001
drop T075_001 T075_002 T075_003 T075_004 PCT_T075_002 PCT_T075_003 PCT_T075_004 
drop T076_001 T076_002 T076_003 T076_004 T076_005 T076_006 
drop T076_007 T076_008 T076_009 T076_010 T076_011 T076_012 
drop PCT_T076_002 PCT_T076_003 PCT_T076_004 PCT_T076_005 PCT_T076_006 
drop PCT_T076_007 PCT_T076_008 PCT_T076_009 PCT_T076_010 
drop PCT_T076_011 PCT_T076_012
drop T077_001 T078_001 T078_002 T078_003 T078_004 T078_005 
drop T078_006 T078_007 T078_008 
drop PCT_T078_002 PCT_T078_003 PCT_T078_004 PCT_T078_005 
drop PCT_T078_006 PCT_T078_007 PCT_T078_008
drop T079_001 T079_002 T079_003 T079_004 T079_005 T079_006 T079_007 T079_008 
drop PCT_T079_002 PCT_T079_003 PCT_T079_004 PCT_T079_005 
drop PCT_T079_006 PCT_T079_007 PCT_T079_008
drop T081_001 T081_008 PCT_T081_002 PCT_T081_008
drop PCT_T088_002 PCT_T088_003 PCT_T088_005 
drop PCT_T088_006 PCT_T088_007 PCT_T088_009
drop T089_001 T089_002 T089_003 T089_004 
drop PCT_T089_002 PCT_T089_003 PCT_T089_004 
drop T090_001 T090_002 T090_003 T090_004 
drop PCT_T090_002 PCT_T090_003 PCT_T090_004 
drop T091_001 T091_002 
drop T098_001 T098_002 T098_003 T098_004 T098_005 
drop PCT_T098_002 PCT_T098_003 PCT_T098_004 PCT_T098_005
drop T093_002 T093_003 T093_004 T093_005 T093_007 T093_008 T093_009
drop PCT_T093_002 PCT_T093_003 PCT_T093_004 PCT_T093_005 
drop PCT_T093_007 PCT_T093_008 PCT_T093_009 
drop P043_003 P043_004 P043_005 
drop P043_006 P043_007 P043_008 P043_009 P043_010 
drop P043_011 P043_012 P043_013 P043_014 P043_015
drop PCT_P043_003 PCT_P043_004 PCT_P043_005 
drop PCT_P043_006 PCT_P043_007 PCT_P043_008 PCT_P043_009 PCT_P043_010 
drop PCT_P043_011 PCT_P043_012 PCT_P043_013 PCT_P043_014 PCT_P043_015
drop H028_001 H028_002 H028_003 H028_004 H028_005 
drop H028_006 H028_007 PCT_H028_002 PCT_H028_003 PCT_H028_004 PCT_H028_005 
drop PCT_H028_006 PCT_H028_007
drop T016_002 T016_003 T016_004 T016_005 T016_006 T016_007 T016_008 T016_009
drop PCT_T016_002 PCT_T016_003 PCT_T016_004 PCT_T016_005 
drop PCT_T016_006 PCT_T016_007 PCT_T016_008 PCT_T016_009
drop T019_001 T019_002 T019_004 T019_005 T019_007 T019_008 T019_009 T019_010 
drop T019_011 T019_012 T019_013 T019_014
drop PCT_T019_002 PCT_T019_003 PCT_T019_004 PCT_T019_005
drop PCT_T019_007 PCT_T019_008 PCT_T019_009 PCT_T019_010 
drop PCT_T019_011 PCT_T019_012 PCT_T019_013 PCT_T019_014
drop T022_002 T022_003 T022_004 T022_005 T022_006
drop PCT_T022_002 PCT_T022_003 PCT_T022_004 PCT_T022_005 PCT_T022_006
drop T038_002 T038_003 T038_004 T038_005 
drop T038_006 T038_007 T038_008 T038_009 T038_010 
drop T038_012 T038_013 T038_014 T038_016 T038_017 T038_018 T038_019
drop PCT_T038_002 PCT_T038_003 PCT_T038_004 PCT_T038_005 
drop PCT_T038_006 PCT_T038_007 PCT_T038_008 PCT_T038_009 PCT_T038_010
drop PCT_T038_012 PCT_T038_013 PCT_T038_014
drop PCT_T038_016 PCT_T038_017 PCT_T038_018 PCT_T038_019
drop T039_001 T039_003 T039_004 T039_005 T039_006 
drop T039_007 T039_008 T039_009 T039_010 
drop T039_011 T039_012 T039_013 T039_014 T039_015 T039_016 T039_017 T039_018
drop PCT_T039_003 PCT_T039_004 PCT_T039_005 
drop PCT_T039_006 PCT_T039_007 PCT_T039_008 PCT_T039_009 PCT_T039_010 
drop PCT_T039_011 PCT_T039_012 PCT_T039_013 PCT_T039_014 PCT_T039_015 
drop PCT_T039_016 PCT_T039_017 PCT_T039_018
drop T041_001 T041_004 T041_005 T041_006 T041_007 T041_008 T041_009 T041_010
drop T041_011 T041_012 T041_013 T041_014 T041_015 
drop T041_016 T041_017 T041_018 T041_019
drop PCT_T041_004 PCT_T041_005 
drop PCT_T041_006 PCT_T041_007 PCT_T041_008 PCT_T041_009 PCT_T041_010 
drop PCT_T041_011 PCT_T041_012 PCT_T041_013 PCT_T041_014 PCT_T041_015 
drop PCT_T041_016 PCT_T041_017 PCT_T041_018 PCT_T041_019
drop T062_001 T062_003 PCT_T062_003 
drop T002_002 T002_001 T002_003 T003_001 T003_002 T003_003 
drop PCT_T003_002 PCT_T003_003
drop T005_001 T005_002 T005_003 PCT_T005_002 PCT_T005_003
drop T008_001 T008_002 T008_003 T008_004 T008_005 
drop T008_006 T008_007 T008_008 T008_009 T008_010
drop T008_011 T008_012 T008_013
drop PCT_T008_002 PCT_T008_003 PCT_T008_004 PCT_T008_005 
drop PCT_T008_006 PCT_T008_007 PCT_T008_008 PCT_T008_009 PCT_T008_010
drop PCT_T008_011 PCT_T008_012 PCT_T008_013
drop T012_001 T012_002 T012_003 T012_004 T012_005 T012_006
drop PCT_T012_002 PCT_T012_003 PCT_T012_004 PCT_T012_005 PCT_T012_006
drop T023_001 T023_002 T023_003 PCT_T023_002 PCT_T023_003
drop T024_001 T024_002 PCT_T024_002
drop T029_001 T029_002 T029_003 PCT_T029_002 PCT_T029_003
drop T040_001 T040_002 T040_003 T040_004 T040_005 T040_006
drop PCT_T040_002 PCT_T040_003 PCT_T040_004 PCT_T040_005 PCT_T040_006
drop T042_001 T042_002 T042_003 T042_004 T042_005 
drop T042_006 T042_007 T042_008 T042_009 T042_010
drop PCT_T042_002 PCT_T042_003 PCT_T042_004 PCT_T042_005 
drop PCT_T042_006 PCT_T042_007 PCT_T042_008 PCT_T042_009 PCT_T042_010
drop T044_001 T045_001 T045_002 T045_003 T045_004 T045_005 T045_006
drop T046_001 T047_001 T048_001 T049_001 T050_001 T056_001 T056_002 T056_003
drop PCT_T056_002 PCT_T056_003
drop T057_001 T057_002 T057_003 PCT_T057_002 PCT_T057_003
drop T058_001 T058_002 T058_003 PCT_T058_002 PCT_T058_003
drop T059_001 T059_002 T059_003 PCT_T059_002 PCT_T059_003
drop T060_001 T060_002 T060_003 PCT_T060_002 PCT_T060_003
drop T061_001 T061_002 T061_003 PCT_T061_002 PCT_T061_003
drop T063_001 T063_002 T063_003 PCT_T063_002 PCT_T063_003
drop T064_001 T064_002 T064_003 PCT_T064_002 PCT_T064_003

// Set up variables for the crosswalk code
* The code doesn't like reusing variable names

tostring tractid90, generate(tractid) format(%11.0f)
rename medhhincome medianhhincome
gen households2 = households
gen own2 = own
gen unitsrent2 = unitsrent
gen unitsrent3 = unitsrent
*convert to stata format and save 
save "C:\Users\Jackie\Documents\GitHub\ungentry\inputdata\censusacsdata\Census1990_Boston\census90_alldata.dta", replace

// Set up file names and input names for the crosswalk
// See explanations of user inputs below

* Global inputs are annoying 
* so make sure you have nothing saved in the global input memory
* You can do this by closing Stata and restarting it.
global input_file "C:\Users\Jackie\Documents\GitHub\ungentry\inputdata\censusacsdata\Census1990_Boston\census90_alldata.dta"
global output_file "C:\Users\Jackie\Documents\GitHub\ungentry\inputdata\censusacsdata\Census1990_Boston\census90_alldata_2010.dta"
global crosswalk_file "C:\Users\Jackie\Documents\GitHub\ungentry\inputdata\censusacsdata\Census1990_Boston\crosswalk_1990_2010.dta"
global crosswalk_year "90"
global input_idvar "tractid"
global counts "totalpop households hhfam hhchild popu5 popu25 popuempl ind_finance ind_professional occ_profmanage college inc_0_5K inc_5K_10K inc_10K_15K inc_15K_20K inc_20K_25K inc_25K_30K inc_30K_35K inc_35K_40K inc_40K_45K inc_45K_50K inc_50K_55K inc_55K_60K inc_60K_75K inc_75K_100K inc_100K_125K inc_125K_150K inc_150K_more popupov poverty publicassist units unitsocc unitsrent unitsmortgage own rent vacant rent_0_300 rent_300_600 rent_600_750 rent_750_1000 rent_1000_more incomerent_30_more inc_mortgage_30_more inc_nomortgage_30_more sameres units_newres"
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
use "C:\Users\Jackie\Documents\GitHub\ungentry\inputdata\censusacsdata\Census1990_Boston\Census1990_Boston_counts_2010.dta", clear
rename trtid10 tractid10
drop households2 own2 unitsrent2 unitsrent3
gen pcthhchild = hhchild / hhfam * 100
gen pctind_finance = ind_finance/ popuempl * 100
gen pctind_professional = ind_professional / popuempl * 100
gen pctocc_profmanage = occ_profmanage / popuempl * 100
gen pctcollege = college / popu25 * 100
gen pctinc_0_5k = inc_0_5k / households * 100
gen pctinc_5k_10k = inc_5k_10k / households * 100
gen pctinc_10k_15k = inc_10k_15k / households * 100
gen pctinc_15k_20k = inc_15k_20k / households * 100
gen pctinc_20k_25k = inc_20k_25k / households * 100
gen pctinc_25k_30k = inc_25k_30k / households * 100
gen pctinc_30k_35k = inc_30k_35k / households * 100
gen pctinc_35k_40k = inc_35k_40k / households * 100
gen pctinc_40k_45k = inc_40k_45k / households * 100
gen pctinc_45k_50k = inc_45k_50k / households * 100
gen pctinc_50k_55k = inc_50k_55k / households * 100
gen pctinc_55k_60k = inc_55k_60k / households * 100
gen pctinc_60k_75k = inc_60k_75k / households * 100
gen pctinc_75k_100k = inc_75k_100k / households * 100
gen pctinc_100k_125k = inc_100k_125k / households * 100
gen pctinc_125k_150k = inc_125k_150k / households * 100
gen pctinc_150k_more = inc_150k_more / households * 100
gen pctpoverty = poverty / popupov * 100
gen pctpublicassist = publicassist / households * 100
gen pctown = own / unitsocc * 100
gen pctrent = rent / unitsocc * 100
gen pctvacant = vacant / units * 100
gen pctrent_0_300 = rent_0_300 / unitsrent * 100
gen pctrent_300_600 = rent_300_600 / unitsrent * 100 
gen pctrent_600_750 = rent_600_750 / unitsrent * 100
gen pctrent_750_1000 = rent_750_1000 / unitsrent * 100
gen pctrent_1000_more = rent_1000_more / unitsrent * 100
gen pctincomerent_30_more = incomerent_30_more / rent * 100   
gen pctinc_mortgage_30_more  = inc_mortgage_30_more / unitsmortgage * 100
gen pctinc_nomortgage_30_more = inc_nomortgage_30_more / unitsmortgage * 100
gen pctsameres = sameres / popu5 * 100
gen pctunits_newres = units_newres / unitsocc * 100

// drop unnecessary count variables
drop hhfam hhchild popu5 popu25 popuempl ind_finance ind_professional occ_profmanage college inc_0_5k inc_5k_10k inc_10k_15k inc_15k_20k inc_20k_25k inc_25k_30k inc_30k_35k inc_35k_40k inc_40k_45k inc_45k_50k inc_50k_55k inc_55k_60k inc_60k_75k inc_75k_100k inc_100k_125k inc_125k_150k inc_150k_more popupov poverty publicassist unitsocc unitsrent unitsmortgage own rent vacant rent_0_300 rent_300_600 rent_600_750 rent_750_1000 rent_1000_more incomerent_30_more inc_mortgage_30_more inc_nomortgage_30_more sameres units_newres

// save as a Stata file
save "C:\Users\Jackie\Documents\GitHub\ungentry\inputdata\censusacsdata\Census1990_Boston\census90_alldata_pcts_2010.dta", replace
// save as a csv file 
export delimited using "C:\Users\Jackie\Documents\GitHub\ungentry\inputdata\censusacsdata\Census1990_Boston\census90_alldata_pcts_2010.csv", replace
