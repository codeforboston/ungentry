/* 
* TODO: 1. Place the .txt data file and the dictionary file you downloaded in the work folder, or enter the full path to these files!
*       2. You may have to increase memory using the 'set mem' statement. It is commented out in the code bellow.
*
* If you have any questions or need assistance contact info@socialexplorer.com.
*/
cd "C:\Users\Jackie\Documents\GitHub\ungentry\Census2000_Boston"
///set mem 512m
set more off
infile using "R10732419.dct", using("R10732419_SL140.txt")

rename FIPS tractid00
rename T179_002 poverty
rename PCT_T179_002 pctpoverty
rename T197_002 sameres
rename PCT_T197_002 pctsameres
gen units_newres = H038010 + H038011
gen pctunits_newres = PCT_H038010 + PCT_H038011

drop NAME QName SUMLEV GEOCOMP STATECE STATE COUNTY COUNTYSC COUSUB TRACT 
drop T179_001 T179_003 T179_004 T179_005 T179_006 T179_007 T179_008 T179_009 T179_010 
drop T179_011 PCT_T179_003 PCT_T179_004 PCT_T179_005 PCT_T179_006 PCT_T179_007 PCT_T179_008 PCT_T179_009 PCT_T179_010 
drop PCT_T179_011 T197_001 T197_003 T197_004 T197_005 T197_006 T197_007 T197_008 T197_009 T197_010 
drop T197_011 T197_012 T197_013 T197_014 T197_015 T197_016 T197_017 T197_018 
drop PCT_T197_003 PCT_T197_004 PCT_T197_005 PCT_T197_006 PCT_T197_007 PCT_T197_008 PCT_T197_009 PCT_T197_010 
drop PCT_T197_011 PCT_T197_012 PCT_T197_013 PCT_T197_014 PCT_T197_015 PCT_T197_016 PCT_T197_017 PCT_T197_018 
drop H038001 H038002 H038003 H038004 H038005 H038006 H038007 H038008 H038009 H038010 H038011 H038012 H038013 H038014 H038015 
drop PCT_H038002 PCT_H038003 PCT_H038004 PCT_H038005 PCT_H038006 PCT_H038007 PCT_H038008 PCT_H038009 PCT_H038010 
drop PCT_H038011 PCT_H038012 PCT_H038013 PCT_H038014 PCT_H038015

save "C:\Users\Jackie\Dropbox\Civic Tech\CFB_Gentrification\Census2000_Boston\Census2000_Boston_addvars.dta"
