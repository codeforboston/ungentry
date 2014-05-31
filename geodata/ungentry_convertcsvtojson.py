#####################################
#### Code for Boston 			 ####
#### Project: Ungentry 			 ####
#####################################

# convert csv files of data into json ####

from csv import DictReader
import json

csvfile = DictReader(open('C:\Users\Jackie\Documents\GitHub\ungentry\ACS0509_Boston\ACS0509_Boston.csv'))
list = []
for row in csvfile:
	list.append(row)
	
json.dump(list, open("C:\\Users\\Jackie\\Documents\\GitHub\\ungentry\\ACS0509_Boston\\acs0509out.json", 'w')) # turns into string
