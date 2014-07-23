package json.geojson.objects;

import java.util.List;
import java.util.Set;

import json.graphic.Display;
import json.topojson.geom.sub.Entity;

public abstract class Shape extends Object {

	public abstract Bounding getBounding();
	
	public abstract List<Entity> extract();
	
	public abstract int[] arcs();
	
	public abstract json.topojson.geom.Object toTopology();
	
}
