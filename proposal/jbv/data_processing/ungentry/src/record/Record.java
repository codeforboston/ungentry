package record;

import java.util.HashMap;
import java.util.Set;

import shape.Bounding;
import shape.Shape;


public class Record extends Shape{

	int _recordId;
	Shape _shape;
	HashMap<String,String> _properties;
	
	public Record(int iRecordId, Shape iShape){
		
		_recordId = iRecordId;
		_shape = iShape;
		_properties = new HashMap<String,String>();
		
	}
	
	public void addProperty(String iName, String iData){
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
			
			Object[] aKeys = _properties.keySet().toArray();
			for (int i=0; i<aKeys.length; i++) {
				aBuffer.append("\"");
				aBuffer.append((String) aKeys[i]);
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
	
	
	
}
