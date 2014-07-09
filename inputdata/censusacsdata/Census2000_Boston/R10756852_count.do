/* 
* TODO: 1. Place the .txt data file and the dictionary file you downloaded in the work folder, or enter the full path to these files!
*       2. You may have to increase memory using the 'set mem' statement. It is commented out in the code bellow.
*
* If you have any questions or need assistance contact info@socialexplorer.com.
*/
clear
cd "C:\Users\Jackie\Documents\GitHub\ungentry\Census2000_Boston"

///set mem 512m
set more off
infile using "R10756852.dct", using("R10756852_SL140.txt")


rename FIPS tractid00
gen poverty = T183_002 + T183_005

drop NAME QName SUMLEV GEOCOMP STATECE STATE COUNTY COUNTYSC COUSUB TRACT 
drop T183_001 T183_002 T183_003 T183_004 T183_005 T183_006 
drop PCT_T183_002 PCT_T183_003 PCT_T183_005 PCT_T183_006

save "C:\Users\Jackie\Documents\GitHub\ungentry\Census2000_Boston\Census2000_Boston_addvars2.dta"

