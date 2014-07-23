package json.topojson.geom.sub;

import json.geojson.objects.Bounding;
import json.topojson.algorithm.ArcMap;

public class Line extends Entity {

	public Line(Position[] iPoints, Bounding iBound) {
		super(iPoints,iBound);
	}

	@Override
	public void cut(ArcMap iMap) {
		
		// _pattern has been computed previously
		// by join algorithm;
		// first last points must be set by the algorithm
		_pattern[0]=1;
		_pattern[_pattern.length-1]=1;
		
		int count=0;
		
		while (count<_pattern.length){
			count++;
		}
		
	}

	
		

}
