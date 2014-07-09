# Convert allcensusdata.csv to nested JSON as year -> tract id -> property dictionary
allcensusacsdatafile <- read.csv("~/Dropbox/ungentry/allcensusacsdata.csv", colClasses=c(tractid='character'))

#fixme later. for duplicate rows average all the values
library(plyr)
allcensusacsdata <- ddply(allcensusacsdatafile,.(tractid,year),numcolwise(mean))

# Make a list by year
byYear = split(allcensusacsdata, allcensusacsdata$year)

# Split the years by tract. Each tract is a data frame
byYearAndTract = lapply(byYear, function(y) split(y, y$tractid))

# Convert the tract data frames to lists so they will write a single value per name
byYT2 = lapply(byYearAndTract, function(y) lapply(y, as.list))

install.packages("RJSONIO")
library(RJSONIO)

# Convert to JSON and write it out
json = toJSON(byYT2)

write(json, file='allcensusacsdata.json')
