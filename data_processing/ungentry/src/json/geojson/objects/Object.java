package json.geojson.objects;

import java.util.Set;

import json.JsonInterface;
import json.graphic.Display;
import json.topojson.geom.sub.Entity;


public abstract class Object implements JsonInterface {

	public abstract boolean partlyIn(Bounding iBnd);
	
	public abstract void draw(Display iDisp);
	
}
