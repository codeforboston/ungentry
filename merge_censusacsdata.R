########################################
#### Created by: Jackie Hwang 			####
#### Date: May 4, 2014 							####
#### Project: CFB-Ungentry 					####
#### Re: Merging ACS/Census Data 		####
########################################

# import datasets ####
setwd("C:/Users/Jackie/Documents/GitHub/ungentry/Census1990_Boston")
dat90 <- read.csv("Census1990_Boston.csv")

setwd("C:/Users/Jackie/Documents/GitHub/ungentry/Census2000_Boston")
dat00 <- read.csv("Census2000_Boston.csv")

setwd("C:/Users/Jackie/Documents/GitHub/ungentry/ACS0812_Boston")
dat0812 <- read.csv("ACS0812_Boston.csv")

# create year variable ####
dat90$year <- rep(1990, nrow(dat90))
dat00$year <- rep(2000, nrow(dat00))
dat0812$year <- rep(2008, nrow(dat0812))

# create common variables where possible and reorder ####
dat90$pctinc_0_10K <- dat90$pctinc_0_5K + dat90$pctinc_5K_10K
dat90$pctinc_50K_60K <- dat90$pctinc_50K_55K + dat90$pctinc_55K_60K
dat90 <- dat90[, c(1, 46, 2:8, 47, 11:18, 48, 21:45)]

dat00 <- dat00[, c(1, 47, 2:46)]

dat0812$pctinc_150K_more <- dat0812$pctinc_150K_200K + dat0812$pctinc_200K_more
dat0812 <- dat0812[, c(1, 50, 2:23, 51, 26:49)]

# rename tractid variable to match across datasets ####
colnames(dat90)[1] <- c("tractid")
colnames(dat00)[1] <- c("tractid")
colnames(dat0812)[1] <- c("tractid")

# merge data ####
alldat <- merge(dat90, dat00, 
								by.y = colnames(dat90)[
									which(colnames(dat90) %in% 
													colnames(dat00))], 
								all = TRUE)

alldat <- merge(alldat, dat0812, 
								by.y = colnames(alldat)[
									which(colnames(alldat) %in% 
													colnames(dat0812))], 
								all = TRUE)

# order data by year ####
alldat <- alldat[order(alldat$year, alldat$tractid), ]

setwd("C:/Users/Jackie/Documents/GitHub/ungentry")
write.csv(alldat, file = "allcensusacsdata.csv", row.names = FALSE, na = '')


