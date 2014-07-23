/*
Copyright 2006 Jerry Huxtable

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

package com.jhlabs.map;

/**
 * A geodetic datum. This isn't used (yet).
 */
public class Datum {
	// Just a placeholder for now

	String name;
	Ellipsoid ellipsoid;
	double deltaX, deltaY, deltaZ;
	
    public static Datum[] datums = {
	    new Datum("ADINDAN", Ellipsoid.CLARKE_1880, -162, -12, -206),
	    new Datum("ARC1950", Ellipsoid.CLARKE_1880, -143, -90, -294),
	    new Datum("ARC1960", Ellipsoid.CLARKE_1880, -160,  -8, -300),
	    new Datum("Australian Geodetic 1966", Ellipsoid.AUSTRALIAN, -133, -48, 148),
	    new Datum("Australian Geodetic 984", Ellipsoid.AUSTRALIAN, -134, -48, 149),
	    new Datum("CAMP_AREA_ASTRO", Ellipsoid.INTERNATIONAL_1967, -104, -129, 239),
	    new Datum("Cape", Ellipsoid.CLARKE_1880, -136, -108, -292),
	    new Datum("European Datum 1950", Ellipsoid.INTERNATIONAL_1967, -87, -98, -121),
	    new Datum("European Datum 1979", Ellipsoid.INTERNATIONAL_1967, -86, -98, -119),
	    new Datum("Geodetic Datum 1949", Ellipsoid.INTERNATIONAL_1967, 84, -22, 209),
	    new Datum("Hong Kong 1963", Ellipsoid.INTERNATIONAL_1967, -156, -271, -189),
	    new Datum("Hu Tzu Shan", Ellipsoid.INTERNATIONAL_1967, -634, -549, -201),
//	    new Datum("Indian", Ellipsoid.EVEREST, 289, 734, 257),
	    new Datum("NAD27", Ellipsoid.CLARKE_1866, -8, 160, 176),
	    new Datum("NAD83", Ellipsoid.GRS_1980, 0, 0, 0),
	    new Datum("Old Hawaiian mean", Ellipsoid.CLARKE_1866, 89, -279, -183),
	    new Datum("OMAN", Ellipsoid.CLARKE_1880, -346, -1, 224),
	    new Datum("Ordnance Survey 1936", Ellipsoid.AIRY, 375, -111, 431),
	    new Datum("Puerto Rico", Ellipsoid.CLARKE_1866, 11, 72, -101),
	    new Datum("Pulkovo 1942", Ellipsoid.KRASOVSKY, 27, -135, -89),
	    new Datum("PROVISIONAL_S_AMERICAN_1956", Ellipsoid.INTERNATIONAL_1967, -288, 175, -376),
	    new Datum("Tokyo", Ellipsoid.BESSEL, -128, 481, 664),
	    new Datum("WGS72", Ellipsoid.WGS_1972, 0, 0, -4.5),
	    new Datum("WGS84", Ellipsoid.WGS_1984, 0, 0, 0)
	};

	public Datum(String name, Ellipsoid ellipsoid, double deltaX, double deltaY, double deltaZ) {
		this.name = name;
		this.ellipsoid = ellipsoid;
		this.deltaX = deltaX;
		this.deltaY = deltaY;
		this.deltaZ = deltaZ;
	}
}
