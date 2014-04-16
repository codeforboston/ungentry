/* 
* TODO: 1. Place the .txt data file and the dictionary file you downloaded in the work folder, or enter the full path to these files!
*       2. You may have to increase memory using the 'set mem' statement. It is commented out in the code bellow.
*
* If you have any questions or need assistance contact info@socialexplorer.com.
*/
cd "C:\Users\Jackie\Dropbox\Civic Tech\CFB_Gentrification\Census2000_Boston"
///set mem 512m
set more off
infile using "R10716314.dct", using("R10716314_SL140.txt")


