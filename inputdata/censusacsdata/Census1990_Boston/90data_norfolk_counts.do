/* 
* TODO: 1. Place the .txt data file and the dictionary file you downloaded in the work folder, or enter the full path to these files!
*       2. You may have to increase memory using the 'set mem' statement. It is commented out in the code bellow.
*
* If you have any questions or need assistance contact info@socialexplorer.com.
*/
clear
cd "C:\Users\Jackie\Documents\GitHub\ungentry\Census1990_Boston"

///set mem 512m
set more off
infile using "90data_norfolk.dct", using("90data_norfolk.txt")


rename FIPS tractid90
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
rename T093_006 poverty
rename P043_002 sameres
rename PCT_T088_004 pctinc_mortgage_30_more
rename PCT_T088_008 pctinc_nomortgage_30_more
rename T093_001 popupov
rename P043_001 popu5
rename PCT_T093_006 pctpoverty
rename PCT_P043_002 pctsameres
gen units_newres = H028_002 + H028_003
gen pctunits_newres = PCT_H028_002 + PCT_H028_003
order college pctcollege, after(pctocc_profmanage)
order inc_5K_10K inc_10K_15K inc_15K_20K inc_20K_25K inc_25K_30K inc_30K_35K inc_35K_40K inc_40K_45K inc_45K_50K, after(inc_0_5K) 
order pctinc_10K_15K pctinc_15K_20K pctinc_20K_25K pctinc_25K_30K pctinc_30K_35K pctinc_35K_40K pctinc_40K_45K pctinc_45K_50K, after( pctinc_5K_10K)
order incomerent_30_more pctincomerent_30_more, after( medianrent)
order poverty pctpoverty, after(medhhincome)

drop NAME QName SUMLEV GEOCOMP REGION DIVISION STATE COUNTY TRACT
drop T016_002 T016_003 T016_004 T016_005 T016_006 T016_007 T016_008 T016_009
drop PCT_T016_002 PCT_T016_003 PCT_T016_004 PCT_T016_005 PCT_T016_006 PCT_T016_007 PCT_T016_008 PCT_T016_009
drop T019_001 T019_002 T019_004 T019_005 T019_007 T019_008 T019_009 T019_010 
drop T019_011 T019_012 T019_013 T019_014
drop PCT_T019_002 PCT_T019_003 PCT_T019_004 PCT_T019_005
drop PCT_T019_007 PCT_T019_008 PCT_T019_009 PCT_T019_010 PCT_T019_011 PCT_T019_012 PCT_T019_013 PCT_T019_014
drop T022_002 T022_003 T022_004 T022_005 T022_006
drop PCT_T022_002 PCT_T022_003 PCT_T022_004 PCT_T022_005 PCT_T022_006
drop T038_002 T038_003 T038_004 T038_005 T038_006 T038_007 T038_008 T038_009 T038_010 
drop T038_012 T038_013 T038_014 T038_016 T038_017 T038_018 T038_019
drop PCT_T038_002 PCT_T038_003 PCT_T038_004 PCT_T038_005 PCT_T038_006 PCT_T038_007 PCT_T038_008 PCT_T038_009 PCT_T038_010
drop PCT_T038_012 PCT_T038_013 PCT_T038_014
drop PCT_T038_016 PCT_T038_017 PCT_T038_018 PCT_T038_019
drop T039_001 T039_003 T039_004 T039_005 T039_006 T039_007 T039_008 T039_009 T039_010 
drop T039_011 T039_012 T039_013 T039_014 T039_015 T039_016 T039_017 T039_018
drop PCT_T039_003 PCT_T039_004 PCT_T039_005 PCT_T039_006 PCT_T039_007 PCT_T039_008 PCT_T039_009 PCT_T039_010 
drop PCT_T039_011 PCT_T039_012 PCT_T039_013 PCT_T039_014 PCT_T039_015 PCT_T039_016 PCT_T039_017 PCT_T039_018
drop T041_001 T041_004 T041_005 T041_006 T041_007 T041_008 T041_009 T041_010
drop T041_011 T041_012 T041_013 T041_014 T041_015 T041_016 T041_017 T041_018 T041_019
drop PCT_T041_004 PCT_T041_005 PCT_T041_006 PCT_T041_007 PCT_T041_008 PCT_T041_009 PCT_T041_010 
drop PCT_T041_011 PCT_T041_012 PCT_T041_013 PCT_T041_014 PCT_T041_015 PCT_T041_016 PCT_T041_017 PCT_T041_018 PCT_T041_019
drop T062_001 T062_003 PCT_T062_003 
drop T074_001 T074_002 PCT_T074_002
drop T081_001 T081_008
drop PCT_T081_002
drop PCT_T081_008
drop T083_001 T083_002 T083_003 T083_004 T083_005 T083_006 T083_007
drop PCT_T083_002 PCT_T083_003 PCT_T083_004 PCT_T083_005 PCT_T083_006 PCT_T083_007
drop T088_001 T088_003 T088_005 T088_006 T088_007 T088_009
drop PCT_T088_002 PCT_T088_003 PCT_T088_005 PCT_T088_006 PCT_T088_007
drop PCT_T088_009
drop T093_002 T093_003 T093_004 T093_005 T093_007 T093_008 T093_009
drop PCT_T093_002 PCT_T093_003 PCT_T093_004 PCT_T093_005 PCT_T093_007 PCT_T093_008 PCT_T093_009
drop P043_003 P043_004 P043_005 P043_006 P043_007 P043_008 P043_009 P043_010
drop P043_011 P043_012 P043_013 P043_014 P043_015
drop PCT_P043_003 PCT_P043_004 PCT_P043_005 PCT_P043_006 PCT_P043_007 PCT_P043_008 PCT_P043_009 PCT_P043_010
drop PCT_P043_011 PCT_P043_012 PCT_P043_013 PCT_P043_014 PCT_P043_015
drop H028_001 H028_002 H028_003 H028_004 H028_005 H028_006 H028_007
drop PCT_H028_002 PCT_H028_003 PCT_H028_004 PCT_H028_005 PCT_H028_006 PCT_H028_007

save "C:\Users\Jackie\Documents\GitHub\ungentry\Census1990_Boston\Census1990_Boston_norfolk_counts.dta", replace
