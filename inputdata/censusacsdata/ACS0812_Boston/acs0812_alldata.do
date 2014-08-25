//////////////////////////////////////////
// Created by: Jackie Hwang 
// Date: July 29, 2014						
// Project: Code for Boston Ungentry
// Re: Get 2008-2012 ACS Data 
//////////////////////////////////////////

///// The Data /////
* The data is from Social Explorer for Suffolk, Norfolk, and Middlesex Counties in MA
* The Census stopped collecting detailed data in 2010 
* Instead, the American Community Survey collects the data but
* instead of sampling people every 10 years, they sample 1/6 of the people every year
* Hence, they release data at the tract-level as 5-year estimates.
* The data is for 2008-2012 5-year estimates for census tracts for selected variables
* The raw data is in .txt format and is saved as "acs0812_alldata.txt"
* The file "acs0812_alldata_vars_dictionary.dct" describes the variables in the data.

///// This File ////
* This code imports the raw data in Stata, 
* cleans the data into variables that we need, 
* removes irrelevant variables, 
* and saves the final file as as .csv: "acs0812_alldata_pcts_2010.csv"

// Import the raw data
clear
cd "C:\Users\Jackie\Documents\GitHub\ungentry\inputdata\censusacsdata\ACS0812_Boston"
///set mem 512m
set more off
infile using "acs0812_alldata_vars_dictionary.dct", using("acs0812_alldata.txt")
gen tractid10 = STATE + COUNTY + TRACT
order tractid10, before(FIPS)
drop FIPS

// Rename relevant variables and create new variables of interest
rename T017_001 households
rename T020_006 hhchild
rename T020_003 hhfam
gen occ_profmanage = T050_002 + T050_003
rename T056_002 inc_0_10k
rename T056_003 inc_10k_15k
rename T056_004 inc_15k_20k
rename T056_005 inc_20k_25k
rename T056_006 inc_25k_30k
rename T056_007 inc_30k_35k
rename T056_008 inc_35k_40k
rename T056_009 inc_40k_45k
rename T056_010 inc_45k_50k
rename T056_011 inc_50k_60k
rename T056_012 inc_60k_75k
rename T056_013 inc_75k_100k
rename T056_014 inc_100k_125k
rename T056_015 inc_125k_150k
rename T056_016 inc_150k_200k
rename T056_017 inc_200k_more
rename T057_001 medianhhincome
rename T080_002 publicassist
rename T093_001 units
rename T102_001 unitsrent
rename T102_002 rent_0_300
rename T102_003 rent_300_600
rename T102_004 rent_600_800
rename T102_005 rent_800_1000
rename T102_006 rent_1000_1250
rename T102_007 rent_1250_1500
rename T102_008 rent_1500_2000
rename T102_009 rent_2000_more
rename T105_001 medianpctincomerent
rename T109_002 unitsmortgage
rename T109_007 unitsnomortgage
gen inc_mortgage_30_more = T109_004 
gen inc_nomortgage_30_more = T109_009 
gen poverty = T114_002 + T115_002 + T116_002
rename T130_002 sameres
rename T130_001 popu5
gen units_newres = B25026003 + B25026010 
gen unitsocc = B25026002 + B25026009
rename T001_001 totalpop
gen college = T025_005 + T025_006 + T025_007 + T025_008
rename T049_009 ind_finance
rename T049_010 ind_professional
rename T049_008 ind_info
rename T094_002 own
rename T094_003 rent
rename T095_003 vacant
rename T101_001 medianvalue
rename T104_001 medianrent
rename T049_001 popuempl
rename T025_001 popu25
gen incomerent_30_more = T103_004 + T103_005

//collapse multiple entries for same tract in different counties
collapse (sum) totalpop households hhfam hhchild ind_info ind_finance ind_professional occ_profmanage popuempl popu25 popu5 college inc_0_10k inc_10k_15k inc_15k_20k inc_20k_25k inc_25k_30k inc_30k_35k inc_35k_40k inc_40k_45k inc_45k_50k inc_50k_60k inc_60k_75k inc_75k_100k inc_100k_125k inc_125k_150k inc_150k_200k inc_200k_more poverty publicassist units unitsocc unitsrent unitsmortgage unitsnomortgage units_newres own rent vacant rent_0_300 rent_300_600 rent_600_800 rent_800_1000 rent_1000_1250 rent_1250_1500 rent_1500_2000 rent_2000_more inc_mortgage_30_more inc_nomortgage_30_more sameres incomerent_30_more (median) medianhhincome medianvalue medianrent medianpctincomerent, by (tractid10)

//calculate percentages 
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
gen pctinc_150k_200k = inc_150k_200k / households * 100
gen pctinc_200k_more = inc_200k_more / households * 100
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
gen pctinc_nomortgage_30_more = inc_nomortgage_30_more / unitsnomortgage * 100
gen pctsameres = sameres / popu5 * 100
gen pctunits_newres = units_newres / unitsocc * 100

// drop unnecessary count variables
drop hhfam hhchild popu25 popuempl ind_finance ind_professional inc_0_10k inc_10k_15k inc_15k_20k inc_20k_25k inc_25k_30k inc_30k_35k inc_35k_40k inc_40k_45k inc_45k_50k inc_50k_60k inc_60k_75k inc_75k_100k inc_100k_125k inc_125k_150k inc_150k_200k inc_200k_more publicassist own rent unitsocc vacant unitsrent rent_0_300 rent_300_600 rent_600_800 rent_800_1000 rent_1000_1250 rent_1250_1500 rent_1500_2000 rent_2000_more unitsmortgage unitsnomortgage inc_mortgage_30_more inc_nomortgage_30_more popu5 sameres units_newres college occ_profmanage incomerent_30_more poverty ind_info


// save as a Stata file
saveold "C:\Users\Jackie\Documents\GitHub\ungentry\inputdata\censusacsdata\ACS0812_Boston\acs0812_alldata_pcts_2010.dta", replace

//save file as csv
outsheet using "C:\Users\Jackie\Documents\GitHub\ungentry\inputdata\censusacsdata\ACS0812_Boston\acs0812_alldata_pcts_2010.csv", comma replace


