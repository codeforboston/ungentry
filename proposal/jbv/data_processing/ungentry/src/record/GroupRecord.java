package record;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map.Entry;
import java.util.Set;
import java.util.TreeMap;

import csv.CSVReader;

import shape.Bounding;
import shape.Shape;
import tools.EntryImp;

public class GroupRecord extends Shape {

	public int _shapeType;
	
	public Bounding _bnd;
	
	/*
	public double _Xmin,_Xmax;
	public double _Ymin,_Ymax;
	*/
	public double _Zmin,_Zmax;
	public double _Mmin,_Mmax;
	
	
	public TreeMap<Integer,Record> _shapes;
	
	HashMap<String, EntryImp<Double,Double>> _minmax_properties;
	HashMap<String, HashMap<String,String>> _meta_properties;
	
	public GroupRecord(){
		_shapes = new TreeMap<Integer,Record>();
		_meta_properties = new HashMap<String, HashMap<String,String>>();
	}
	
	public String toJson(){
		
		StringBuffer aBuffer = new StringBuffer();
		
		aBuffer.append("{ \"type\": \"FeatureCollection\", \"features\": [");
		
		Record[] aValues = new Record[_shapes.values().size()];
		aValues = _shapes.values().toArray(aValues);
		int max = aValues.length;
		for (int i=0; i<max/*aValues.length*/; i++) {
			aBuffer.append(aValues[i].toJson());
			if (i!=max-1) aBuffer.append(",");
		}
		
		aBuffer.append("]}");
		
		return aBuffer.toString();
		
	}
	
	public String toJsonMinMaxProperties(){
		
		StringBuffer aBuf = new StringBuffer();
		
		aBuf.append("{");
		
		String[] aKeys = new String[_minmax_properties.size()];
		aKeys = _minmax_properties.keySet().toArray(aKeys);
		
		for (int i=0; i<aKeys.length; i++) {
			
			
			aBuf.append("\"");
			aBuf.append(aKeys[i]);
			aBuf.append("\" : {");
			
			aBuf.append("\"min\" : ");
			aBuf.append(_minmax_properties.get(aKeys[i]).getKey());
			aBuf.append(" , \"max\" : ");
			aBuf.append(_minmax_properties.get(aKeys[i]).getValue());
			
			HashMap<String,String> aMap = _meta_properties.get(aKeys[i]);
			if (aMap.size()>0) {
	
				for (Entry<String,String> aEnt:aMap.entrySet()) {
					aBuf.append(",");
					aBuf.append("\""+aEnt.getKey()+"\" : \"");
					aBuf.append(aEnt.getValue());
					aBuf.append("\"");
				}
				
			}
			
			aBuf.append("}");
			
			if (i!=aKeys.length-1) {
				aBuf.append(",");
			}
			
		}
		
		aBuf.append("}");
		
		return aBuf.toString();
		
	}
	
	public GroupRecord[][] groupGridDivide(int iN, int iM){
		
		GroupRecord[][] aDividedResult = new GroupRecord[iN][iM];
		//HashSet<Integer> aAlreadySelected = new HashSet<Integer>();
		
		double xStep = (_bnd._Xmax-_bnd._Xmin)/iN;
		double yStep = (_bnd._Ymax-_bnd._Ymin)/iM;
		
		for (int i=0; i<iN; i++) {
			
			double aXmin = _bnd._Xmin + i*xStep;
			double aXmax = _bnd._Xmin + (i+1)*xStep;
			
			for (int j=0; j<iM; j++) {
			
				GroupRecord aGroupRecord = new GroupRecord();
				
				double aYmin = _bnd._Ymin + j*yStep;
				double aYmax = _bnd._Ymin + (j+1)*yStep;
				
				Bounding aBnd = new Bounding(aXmin,aYmin,aXmax,aYmax);
				
				aGroupRecord._bnd = aBnd;
				
				for (Entry<Integer,Record> aERec:_shapes.entrySet()) {
					if (aERec.getValue().partlyIn(aBnd) /*&& (!aAlreadySelected.contains(aERec.getKey()))*/) {
						aGroupRecord._shapes.put(aERec.getKey(), aERec.getValue());
						//aAlreadySelected.add(aERec.getKey());
					}
				}
				
				aDividedResult[i][j] = aGroupRecord;
				
			}
			
		}
		
		return aDividedResult;
		
	}

	@Override
	public boolean partlyIn(Bounding iBnd) {
		for (Shape aShape:_shapes.values()){
			if (aShape.partlyIn(iBnd)) return true;
		}
		return false;
	}

	@Override
	public Bounding getBounding() {
		// TODO Auto-generated method stub
		return _bnd;
	}
	
	public void merge(CSVReader aReader, String iCol, String[] iAccepted, String[] iUnits, String[] iTitles){
		
		HashMap<String, EntryImp<Double,Double>> aMinMax = new HashMap<String, EntryImp<Double,Double>>();
		
		HashSet<String> aSet = new HashSet<String>();
		for (int i=0; i<iAccepted.length; i++){
			aSet.add(iAccepted[i]);
			
			HashMap<String, String > aMap = new HashMap<String,String>();
			aMap.put("unit", iUnits[i]);
			aMap.put("title", iTitles[i]);
			
			_meta_properties.put(iAccepted[i], aMap);
		}
		
		for (Entry<Integer,TreeMap<String,String>> aEntry : aReader._data.entrySet()){
			
			String aValue = aEntry.getValue().get(iCol);
			Integer aIntValue = new Integer(aValue);
			
			Record aRecord = _shapes.get(aIntValue);
			if (aRecord!=null) {
				
				for (Entry<String,String> aKV : aEntry.getValue().entrySet()){
					
					if ((!aKV.getKey().equals(iCol)) && (aSet.contains(aKV.getKey()))
						&& ( !aKV.getValue().equals(""))) {
						
						// Here we have selected values
						// We want to build max min values for these properties
						try {
							double aDValue = Double.valueOf(aKV.getValue());
							EntryImp<Double,Double> aMM = aMinMax.get(aKV.getKey());
							if (aMM!=null) {
								
								if (aMM.getKey()>aDValue) {
									aMM.setKey(aDValue);
								}
								
								if (aMM.getValue()<aDValue) {
									aMM.setValue(aDValue);
								}
								
							} else {
									
								aMinMax.put(aKV.getKey(), new EntryImp<Double,Double>(aDValue,aDValue));
								
							}
						} catch (java.lang.NumberFormatException e){
							// unable to convert this data
						}
						
						aRecord.addProperty(aKV.getKey(), aKV.getValue());
						
					}
					
				}
				
			}
			
		}
		
		_minmax_properties = aMinMax;
		
	}

}
