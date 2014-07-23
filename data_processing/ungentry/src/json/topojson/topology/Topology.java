package json.topojson.topology;

import java.util.HashMap;

import json.topojson.geom.Object;

public class Topology {

	String type;
	Transform transform;
	HashMap<String,Object> objects;
	
	public Topology(){
		type = "Topology";
		transform = null;
	}

}
