setwd("C:/Users/Jackie/Dropbox/Civic Tech/CFB_Gentrification/ACS0812_Boston")
acs0812 <- read.csv("ACS0812_Boston.csv")
acs0812$GEOID10 <- 25025*1000000 + acs0812$TRACT
write.csv(acs0812, file = "ACS0812_Boston.csv")
