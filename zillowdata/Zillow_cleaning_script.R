###################################################################################################
### This file adjusts prices to a 2013 base line.
###################################################################################################

setwd("/Users/EricaAshley/Github/ungentry/Zillow_data")
medianRent <- read.csv("Neighborhood_MedianRentalPrice_AllHomes_BostonCambridge.csv")

medianRent$X2010.02 <- medianRent$X2010.02 * 1.07
medianRent$X2010.03 <- medianRent$X2010.03 * 1.07
medianRent$X2010.04 <- medianRent$X2010.04 * 1.07
medianRent$X2010.05 <- medianRent$X2010.05 * 1.07
medianRent$X2010.06 <- medianRent$X2010.06 * 1.07
medianRent$X2010.07 <- medianRent$X2010.07 * 1.07
medianRent$X2010.08 <- medianRent$X2010.08 * 1.07
medianRent$X2010.09 <- medianRent$X2010.09 * 1.07
medianRent$X2010.10 <- medianRent$X2010.10 * 1.07
medianRent$X2010.11 <- medianRent$X2010.11 * 1.07
medianRent$X2010.12 <- medianRent$X2010.12 * 1.07

medianRent$X2011.01 <- medianRent$X2011.01 * 1.04
medianRent$X2011.02 <- medianRent$X2011.02 * 1.04
medianRent$X2011.03 <- medianRent$X2011.03 * 1.04
medianRent$X2011.04 <- medianRent$X2011.04 * 1.04
medianRent$X2011.05 <- medianRent$X2011.05 * 1.04
medianRent$X2011.06 <- medianRent$X2011.06 * 1.04
medianRent$X2011.07 <- medianRent$X2011.07 * 1.04
medianRent$X2011.08 <- medianRent$X2011.08 * 1.04
medianRent$X2011.09 <- medianRent$X2011.09 * 1.04
medianRent$X2011.10 <- medianRent$X2011.10 * 1.04
medianRent$X2011.11 <- medianRent$X2011.11 * 1.04
medianRent$X2011.12 <- medianRent$X2011.12 * 1.04

medianRent$X2012.01 <- medianRent$X2012.01 * 1.01
medianRent$X2012.02 <- medianRent$X2012.02 * 1.01
medianRent$X2012.03 <- medianRent$X2012.03 * 1.01
medianRent$X2012.04 <- medianRent$X2012.04 * 1.01
medianRent$X2012.05 <- medianRent$X2012.05 * 1.01
medianRent$X2012.06 <- medianRent$X2012.06 * 1.01
medianRent$X2012.07 <- medianRent$X2012.07 * 1.01
medianRent$X2012.08 <- medianRent$X2012.08 * 1.01
medianRent$X2012.09 <- medianRent$X2012.09 * 1.01
medianRent$X2012.10 <- medianRent$X2012.10 * 1.01
medianRent$X2012.11 <- medianRent$X2012.11 * 1.01
medianRent$X2012.12 <- medianRent$X2012.12 * 1.01

medianRent$X2014.01 <- medianRent$X2014.01 * 0.99
medianRent$X2014.02 <- medianRent$X2014.02 * 0.99
medianRent$X2014.03 <- medianRent$X2014.03 * 0.99

write.csv(medianRent, file = "Neighborhood_MedianRentalPrice_AllHomes_BostonCambridge_clean.csv")
