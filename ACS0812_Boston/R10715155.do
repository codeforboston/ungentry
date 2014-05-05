/* 
* TODO: 1. Place the .txt data file and the dictionary file you downloaded in the work folder, or enter the full path to these files!
*       2. You may have to increase memory using the 'set mem' statement. It is commented out in the code bellow.
*
* If you have any questions or need assistance contact info@socialexplorer.com.
*/
clear
cd "C:\Users\Jackie\Documents\GitHub\ungentry\ACS0812_Boston"
///set mem 512m
set more off
infile using "R10715155.dct", using("R10715155_SL080.txt")

rename FIPS tractid10
drop NAME QName STUSAB SUMLEV GEOCOMP FILEID LOGRECNO US REGION DIVISION STATECE 
drop STATE COUNTY COUSUB PLACE PLACESE TRACT BLKGRP CONCIT AIANHH AIANHHFP AIHHTLI AITSCE AITS ANRC 
drop CBSA CSA METDIV MACC MEMI NECTA CNECTA NECTADIV UA UACP CDCURR SLDU SLDL VTD ZCTA3 ZCTA5 
drop SUBMCD SDELM SDSEC SDUNI UR PCI TAZ UGA PUMA5 PUMA1 
drop GEOID BTTR BTBG AREALAND AREAWATR

rename T001_001 totalpop
drop T002_001 T002_002 T002_003 T003_001 T003_002 T003_003 PCT_T003_002 PCT_T003_003 
drop T009_001 T009_002 T009_003 T009_004 T009_005 
drop PCT_T009_002 PCT_T009_003 PCT_T009_004 PCT_T009_005 
drop T014_001 T014_002 T014_003 T014_004 T014_005 T014_006 T014_007 T014_008 T014_009 T014_010 
drop T014_011 T014_012 T014_013 T014_014 T014_015 T014_016 T014_017 
drop PCT_T014_002 PCT_T014_003 PCT_T014_004 PCT_T014_005 PCT_T014_006 PCT_T014_007 PCT_T014_008 PCT_T014_009 PCT_T014_010 
drop PCT_T014_011 PCT_T014_012 PCT_T014_013 PCT_T014_014 PCT_T014_015 PCT_T014_016 PCT_T014_017

gen pctcollege = PCT_T025_005 + PCT_T025_006 + PCT_T025_007 + PCT_T025_008
drop T025_001 T025_002 T025_003 T025_004 T025_005 T025_006 T025_007 T025_008 PCT_T025_002 PCT_T025_003 PCT_T025_004 PCT_T025_005 PCT_T025_006 PCT_T025_007 PCT_T025_008
rename PCT_T049_009 pctind_finance
rename PCT_T049_010 pctind_professional
rename PCT_T049_008 pctind_info
drop T049_001 T049_002 T049_003 T049_004 T049_005 T049_006 T049_007 T049_008 T049_009 T049_010 
drop T049_011 T049_012 T049_013 T049_014 
drop PCT_T049_002 PCT_T049_003 PCT_T049_004 PCT_T049_005 PCT_T049_006 PCT_T049_007 
drop PCT_T049_011 PCT_T049_012 PCT_T049_013 PCT_T049_014
rename PCT_T094_002 pctown
rename PCT_T094_003 pctrent
rename PCT_T095_003 pctvacant
drop T094_001 T094_002 T094_003 T095_001 T095_002 T095_003 PCT_T095_002
rename T101_001 medianvalue
rename T104_001 medianrent
rename T105_001 pctincomerent
drop T113_001 T113_002 T113_003 T113_004 T113_005 T113_006 T113_007 T113_008 T113_009 T113_010 
drop T113_011 PCT_T113_002 PCT_T113_003 PCT_T113_004 PCT_T113_005 
drop PCT_T113_006 PCT_T113_007 PCT_T113_008 PCT_T113_009 PCT_T113_010 
drop PCT_T113_011 B07011001 B07011002 B07011003 B07011004 B07011005 B07011006 B07011001s B07011002s 
drop B07011003s B07011004s B07011005s B07011006s B25099001s B25099002s B25099003s 
drop B25099001 B25099002 B25099003

merge 1:1 tractid10 using "C:\Users\Jackie\Documents\GitHub\ungentry\ACS0812_Boston\ACS0812_Boston_addvars.dta", nogenerate

order households, after(totalpop)
order pcthhchild, after(households)
order pctocc_profmanage, after( pctind_professional)
order pctcollege, after( pctocc_profmanage)
order pctinc_0_10K pctinc_10K_15K pctinc_15K_20K pctinc_20K_25K pctinc_25K_30K pctinc_30K_35K pctinc_35K_40K pctinc_40K_45K pctinc_45K_50K pctinc_50K_60K pctinc_60K_75K pctinc_75K_100K pctinc_100K_125K pctinc_125K_150K pctinc_150K_200K pctinc_200K_more, after(pctcollege)
order medhhincome, after( pctinc_200K_more)
order pctpoverty, after( medhhincome)
order pctpublicassist, after(pctpoverty)
order units, after(pctpublicassist)
order pctrent_0_300 pctrent_300_600 pctrent_600_800 pctrent_800_1000 pctrent_1000_1250 pctrent_1250_1500 pctrent_1500_2000 pctrent_2000_more, after(medianvalue)
rename pctincomerent pctincomerent_30_more
order pctinc_mortgage_30_more pctinc_nomortgage_30_more, after( medianpctincomerent)

outsheet using "C:\Users\Jackie\Documents\GitHub\ungentry\ACS0812_Boston\ACS0812_Boston.csv", comma replace

