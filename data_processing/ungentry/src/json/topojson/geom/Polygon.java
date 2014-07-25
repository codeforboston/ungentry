package json.topojson.geom;

import java.util.List;
import java.util.Set;

import json.topojson.geom.sub.Entity;


public class Polygon extends Object {
	
	int[][] arcs;

	public Polygon(List<Entity> iEntities){
		type = "Polygon" ;
		
		Entity[] aArr = new Entity[iEntities.size()];
		aArr = iEntities.toArray(aArr);
		
		arcs = new int[aArr.length][];
		for (int i=0; i<aArr.length; i++){
			arcs[i] = aArr[i]._indexes;
		}
		
	}

}
