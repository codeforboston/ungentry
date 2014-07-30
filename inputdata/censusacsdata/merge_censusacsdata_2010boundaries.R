########################################
#### Created by: Jackie Hwang 			####
#### Date: July 1, 2014 						####
#### Project: CFB-Ungentry 					####
#### Re: Merging ACS/Census Data 		####
#### using 2010 boundaries					####
########################################


# import datasets ####
setwd("C:/Users/Jackie/Documents/GitHub/ungentry/inputdata/censusacsdata/Census1990_Boston")
dat90 <- read.csv("census90_alldata_pcts_2010.csv")

setwd("C:/Users/Jackie/Documents/GitHub/ungentry/inputdata/censusacsdata/Census2000_Boston")
dat00 <- read.csv("census00_alldata_pcts_2010.csv")

setwd("C:/Users/Jackie/Documents/GitHub/ungentry/inputdata/censusacsdata/ACS0812_Boston")
dat10 <- read.csv("acs0812_alldata_pcts_2010.csv")

# merge all data ####
alldat <- merge(dat90, dat00, 
								by = "tractid10", all = TRUE, 
								suffixes = c("_90", "_00"))

alldat <- merge(alldat, dat10, 
								by = "tractid10", all.y = TRUE, 
								suffixes = c("", "_10"))

# add column year labels ####
for (i in 2:(which(names(alldat) == "totalpop_00") - 1)) {
	if (substr(names(alldat)[i], 
						 nchar(names(alldat)[i]) - 2, 
						 nchar(names(alldat)[i])) != 
				"_90") {
			names(alldat)[i] <- 
				paste(names(alldat)[i],
							"90", 
							sep = "_") 
	} else {
		names(alldat)[i] <- names(alldat)[i]
	}
}

for (i in (which(names(alldat) == "totalpop_00")):
		 	(which(names(alldat) == "totalpop") - 1)) {
	if (substr(names(alldat)[i], 
						 nchar(names(alldat)[i]) - 2, 
						 nchar(names(alldat)[i])) != 
				"_00") {
			names(alldat)[i] <- 
				paste(names(alldat)[i],
							"00", 
							sep = "_") 
	} else {
		names(alldat)[i] <- names(alldat)[i]
	}
}

for (i in (which(names(alldat) == "totalpop")):ncol(alldat)) {
	if (substr(names(alldat)[i], 
						 nchar(names(alldat)[i]) - 2, 
						 nchar(names(alldat)[i])) != 
				"_10") {
			names(alldat)[i] <- 
				paste(names(alldat)[i],
							"10", 
							sep = "_") 
	} else {
		names(alldat)[i] <- names(alldat)[i]
	}
}

# drop tracts with no population
alldat <- alldat[alldat$totalpop_90 != 0 & 
								 	alldat$totalpop_00 != 0 & 
								 	alldat$totalpop_10 != 0 & 
								 	is.na(alldat$totalpop_90) == FALSE & 
								 	is.na(alldat$totalpop_00) == FALSE & 
								 	is.na(alldat$totalpop_10) == FALSE, ]
# drop tracts with no households
alldat <- alldat[alldat$households_90 != 0 & 
								 	alldat$households_00 != 0 & 
								 	alldat$households_10 != 0 & 
								 	is.na(alldat$households_90) == FALSE & 
								 	is.na(alldat$households_00) == FALSE & 
								 	is.na(alldat$households_10) == FALSE, ]


# create common variables where possible and reorder ####
alldat$pctinc_0_10k_90 <- 
	alldat$pctinc_0_5k_90 + 
	alldat$pctinc_5k_10k_90
alldat <- 
	alldat[, !(names(alldat) %in% 
						 	c("pctinc_0_5k_90", 
						 		"pctinc_5k_10k_90"))]
alldat$pctinc_50k_60k_90 <- 
	alldat$pctinc_50k_55k_90 + 
	alldat$pctinc_55k_60k_90
alldat <- 
	alldat[, !(names(alldat) %in% 
						 	c("pctinc_50k_55k_90", 
						 		"pctinc_55k_60k_90"))]
alldat$pctinc_150k_more_10 <- 
	alldat$pctinc_150K_200K_10 + 
	alldat$pctinc_200K_more_10
alldat <- 
	alldat[, !(names(alldat) %in% 
						 	c("pctinc_150K_200K_10", 
						 		"pctinc_200K_more_10"))]

# correct acs data to 2013 adjusted values ####
alldat$medhhincome_10 <- alldat$medhhincome_10 * 1.01
alldat$medianvalue_10 <- alldat$medianvalue_10 * 1.01
alldat$medianrent_10 <- alldat$medianrent_10 * 1.01

# reorder columns ####
alldat <- alldat[, c(1, 2:13, 132, 14:21, 133, 22:41, 
								 42:86, 
								 87:108, 134, 109:131)]

setwd("C:/Users/Jackie/Documents/GitHub/ungentry/inputdata/censusacsdata")
write.csv(alldat, file = "allcensusacsdata_2010boundaries.csv", 
					row.names = FALSE, na = '')

