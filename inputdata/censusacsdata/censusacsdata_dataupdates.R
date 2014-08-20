########################################
#### Created by: Jackie Hwang 			####
#### Date: Aug 12, 2014 						####
#### Project: CFB-Ungentry 					####
#### Re: Data Modifications					####
########################################

setwd("C:/Users/Jackie/Documents/GitHub/ungentry/inputdata/censusacsdata")
dat <- read.csv(file = "allcensusacsdata_2010boundaries.csv")

# collapse income levels ####
# 0-25K, 25-50K, 50-100K, 100K+

dat$pctinc_0k_25k_90 <- 
	dat$pctinc_0k_10k_90 + 
	dat$pctinc_10k_15k_90 + 
	dat$pctinc_15k_20k_90 + 
	dat$pctinc_20k_25k_90

dat$pctinc_0k_25k_00 <- 
	dat$pctinc_0_10k_00 + 
	dat$pctinc_10k_15k_00 + 
	dat$pctinc_15k_20k_00 + 
	dat$pctinc_20k_25k_00

dat$pctinc_0k_25k_10 <- 
	dat$pctinc_0_10k_10 + 
	dat$pctinc_10k_15k_10 + 
	dat$pctinc_15k_20k_10 + 
	dat$pctinc_20k_25k_10

dat$pctinc_25k_50k_90 <- 
	dat$pctinc_25k_30k_90 + 
	dat$pctinc_30k_35k_90 + 
	dat$pctinc_35k_40k_90 + 
	dat$pctinc_40k_45k_90 + 
	dat$pctinc_45k_50k_90

dat$pctinc_25k_50k_00 <- 
	dat$pctinc_25k_30k_00 + 
	dat$pctinc_30k_35k_00 + 
	dat$pctinc_35k_40k_00 + 
	dat$pctinc_40k_45k_00 + 
	dat$pctinc_45k_50k_00

dat$pctinc_25k_50k_10 <- 
	dat$pctinc_25k_30k_10 + 
	dat$pctinc_30k_35k_10 + 
	dat$pctinc_35k_40k_10 + 
	dat$pctinc_40k_45k_10 + 
	dat$pctinc_45k_50k_10

dat$pctinc_50k_100k_90 <- 
	dat$pctinc_50k_60k_90 +
	dat$pctinc_60k_75k_90 + 
	dat$pctinc_75k_100k_90

dat$pctinc_50k_100k_00 <- 
	dat$pctinc_50k_60k_00 + 
	dat$pctinc_60k_75k_00 + 
	dat$pctinc_75k_100k_00

dat$pctinc_50k_100k_10 <- 
	dat$pctinc_50k_60k_10 +
	dat$pctinc_60k_75k_10 +
	dat$pctinc_75k_100k_10

dat$pctinc_100k_more_90 <- 
	dat$pctinc_100k_125k_90 + 
	dat$pctinc_125k_150k_90 + 
	dat$pctinc_150k_more_90

dat$pctinc_100k_more_00 <- 
	dat$pctinc_100k_125k_00 +
	dat$pctinc_125k_150k_00 +
	dat$pctinc_150k_more_00

dat$pctinc_100k_more_10 <- 
	dat$pctinc_100k_125k_10 +
	dat$pctinc_125k_150k_10 +
	dat$pctinc_150k_more_10

setwd("C:/Users/Jackie/Documents/GitHub/ungentry/inputdata/censusacsdata")
write.csv(alldat, file = "allcensusacsdata_2010boundaries.csv", 
					row.names = FALSE, na = '')
