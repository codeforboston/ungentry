package json.geojson;


import java.util.HashMap;
import java.util.List;
import java.util.Set;

import json.geojson.objects.Bounding;
import json.geojson.objects.Object;
import json.geojson.objects.Shape;
import json.graphic.Display;
import json.topojson.geom.sub.Entity;



public class Feature extends Shape {

	int _recordId;
	Shape _shape;
	HashMap<String,String> _properties;
	
	public Feature(int iRecordId, Shape iShape){
		
		_recordId = iRecordId;
		_shape = iShape;
		_properties = null/*new HashMap<String,String>()*/;
		
	}
	
	public void addProperty(String iName, String iData){
		if (_properties==null) {
			_properties = new HashMap<String,String>();
		}
		_properties.put(iName, iData);
	}

	public String valid(String iData){
		
		
		try {
			Float afloat = Float.parseFloat(iData);
			return String.format("%f",afloat);
		} catch (NumberFormatException aEx ) {
			System.err.println("Unabme to parse float");
		}
		
		try {
			Integer aInt = Integer.parseInt(iData);
			return String.format("%d",aInt);
		} catch (NumberFormatException aEx ) {
			System.err.println("Unabme to parse int");
		}
		
		return "\""+iData.replaceAll("\"", "")+"\"";
		
	}
	
	@Override
	public String toJson() {
		
		StringBuffer aBuffer = new StringBuffer();
		
		aBuffer.append("{ \"type\": \"Feature\", \"id\" : \""+_recordId+"\", \"geometry\":");
		aBuffer.append(_shape.toJson());
		aBuffer.append(", \"properties\" : {");
		aBuffer.append(" \"bound\" :");
		aBuffer.append(_shape.getBounding().toJson());
		
		if (!_properties.isEmpty()) {
			
			aBuffer.append(", ");
			
			java.lang.Object[] aKeys = _properties.keySet().toArray();
			for (int i=0; i<aKeys.length; i++) {
				aBuffer.append("\"");
				aBuffer.append(((String) aKeys[i]).replace("\"", ""));
				aBuffer.append("\" :");
				aBuffer.append(valid(_properties.get((String) aKeys[i])));
				if (i!=aKeys.length-1) {
					aBuffer.append(",");
				}
				
			}
			
		}
		
		aBuffer.append("}");
		aBuffer.append("}");
		
		return aBuffer.toString();
	}

	@Override
	public boolean partlyIn(Bounding iBnd) {
		// TODO Auto-generated method stub
		return _shape.partlyIn(iBnd);
	}

	@Override
	public Bounding getBounding() {
		// TODO Auto-generated method stub
		return _shape.getBounding();
	}

	@Override
	public List<Entity> extract() {
		return _shape.extract();
	}

	@Override
	public void draw(Display iDisp) {
		// TODO Auto-generated method stub
		_shape.draw(iDisp);
	}

	@Override
	public int[] arcs() {
		// TODO Auto-generated method stub
		return _shape.arcs();
	}

	@Override
	public json.topojson.geom.Object toTopology() {
		json.topojson.geom.Object aObj = _shape.toTopology();
		aObj.setId(_recordId);
		aObj.setProperties(_properties);
		return aObj;
	}
	
	
	
}
