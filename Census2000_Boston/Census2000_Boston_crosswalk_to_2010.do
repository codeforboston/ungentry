//Created by: Jackie//
//Date: June 17, 2014//
//Re: Ungentry//
//Crosswalk 2000 data to 2010 boundaries//

clear
*import data csv
insheet using "C:\Users\Jackie\Documents\GitHub\ungentry\Census2000_Boston\Census2000_Boston_counts.csv", comma
tostring tractid00, generate(tractid) format(%11.0f)
rename medhhincome medianhhincome
gen households2 = households
gen own2 = own
gen unitsrent2 = unitsrent
gen unitsrent3 = unitsrent
*convert to stata format
save "C:\Users\Jackie\Documents\GitHub\ungentry\Census2000_Boston\Census2000_Boston_counts.dta", replace


*convert everything to counts
global input_file "C:\Users\Jackie\Documents\GitHub\ungentry\Census2000_Boston\Census2000_Boston_counts.dta"
global output_file "C:\Users\Jackie\Documents\GitHub\ungentry\Census2000_Boston\Census2000_Boston_counts_2010.dta"
global crosswalk_file "C:\Users\Jackie\Documents\Sociology\Research\Datasets\US_Census\Longitudinal_Tract_Data_Base\crosswalk_to_2010\crosswalk_2000_2010.dta"
global crosswalk_year "00"
global input_idvar "tractid"
global counts "totalpop households hhfam hhchild popu25 popuempl ind_finance ind_professional  inc_0_10k inc_10k_15k inc_15k_20k inc_20k_25k inc_25k_30k inc_30k_35k inc_35k_40k inc_40k_45k inc_45k_50k inc_50k_60k inc_60k_75k inc_75k_100k inc_100k_125k inc_125k_150k publicassist units own rent unitsocc vacant unitsrent rent_0_300 rent_300_600 rent_600_800 rent_800_1000 rent_1000_1250 rent_1250_1500 rent_1500_2000 rent_2000_more unitsmortgage inc_mortgage_30_more inc_nomortgage_30_more popu5 sameres units_newres  college occ_profmanage inc_150k_more  incomerent_30_more poverty"
global medians "medianhhincome medianvalue medianrent medianpctincomerent"
global median_weights "households2 own2 unitsrent2 unitsrent3"

/****************************************************
 It is not necessary to edit anything below this line.
 ****************************************************/

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

 //convert data back to percentages//
use "C:\Users\Jackie\Documents\GitHub\ungentry\Census2000_Boston\Census2000_Boston_counts_2010.dta", clear
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

drop hhfam hhchild popu25 popuempl ind_finance ind_professional inc_0_10k inc_10k_15k inc_15k_20k inc_20k_25k inc_25k_30k inc_30k_35k inc_35k_40k inc_40k_45k inc_45k_50k inc_50k_60k inc_60k_75k inc_75k_100k inc_100k_125k inc_125k_150k publicassist own rent unitsocc vacant unitsrent rent_0_300 rent_300_600 rent_600_800 rent_800_1000 rent_1000_1250 rent_1250_1500 rent_1500_2000 rent_2000_more unitsmortgage inc_mortgage_30_more inc_nomortgage_30_more popu5 sameres units_newres college occ_profmanage inc_150k_more incomerent_30_more poverty

save "C:\Users\Jackie\Documents\GitHub\ungentry\Census2000_Boston\Census2000_Boston_pcts_2010.dta", replace
export delimited using "C:\Users\Jackie\Documents\GitHub\ungentry\Census2000_Boston\Census2000_Boston_pcts_2010.csv", replace
