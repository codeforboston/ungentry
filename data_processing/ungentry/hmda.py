import requests, json, pprint, csv

# request data from HMDA
# more info on type of data collected
r = requests.get('https://api.consumerfinance.gov/data/hmda/slice/hmda_lar.json?%24select=census_tract_number%2C+loan_purpose_name&%24where=state_code+%3D+25&%24group=&%24orderBy=&%24limit=10000&%24offset=0&%24format=json')

# error checking??

jsonData = json.loads(r.text)["results"]

factor1_to_factor2 = dict()
factor1_to_num_loans = dict()

# get frequency of factor2s for each factor1
for result in xrange(0,len(jsonData)):
  factor1 = jsonData[result]["census_tract_number"]
  factor2 = jsonData[result]["loan_purpose_name"]
  
  # if factor1 already exists
  if factor1 in factor1_to_factor2:
    factor1_to_num_loans[factor1] = factor1_to_num_loans[factor1] + 1
    # if factor2 already exists
    if factor2 in factor1_to_factor2[factor1]:
      factor1_to_factor2[factor1][factor2] = factor1_to_factor2[factor1][factor2] + 1
    # insert new factor2 pair
    else:
      factor1_to_factor2[factor1][factor2] = 1
  # insert new factor1/decision pair
  else:
    factor1_to_factor2[factor1] = {factor2: 1}
    factor1_to_num_loans[factor1] = 1

for factor1 in factor1_to_factor2.keys():
  for factor2 in factor1_to_factor2[factor1]:
    factor1_to_factor2[factor1][factor2] = (100*factor1_to_factor2[factor1][factor2]) /factor1_to_num_loans[factor1]

# print data

pp = pprint.PrettyPrinter(indent=1)
pp.pprint(factor1_to_factor2)


# put data in a new CSV file in /ungentry/inputdata/hmda/
# this will be used to create a new view that will be integrated into the map
