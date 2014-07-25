package json.geojson;


import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map.Entry;
import java.util.Set;
import java.util.TreeMap;
import java.util.TreeSet;
import java.util.Vector;

import org.apache.commons.lang3.ArrayUtils;

import json.converter.csv.CSVReader;
import json.geojson.objects.Bounding;
import json.geojson.objects.Shape;
import json.graphic.Display;
import json.tools.EntryImp;
import json.topojson.geom.GeometryCollection;
import json.topojson.geom.Object;
import json.topojson.geom.sub.Entity;



public class FeatureCollection extends Shape {

	public int _shapeType;
	
	public Bounding _bnd;
	
	/*
	public double _Xmin,_Xmax;
	public double _Ymin,_Ymax;
	*/
	public double _Zmin,_Zmax;
	public double _Mmin,_Mmax;
	
	
	public TreeMap<Integer,Feature> _shapes;
	
	HashMap<String, EntryImp<Double,Double>> _minmax_properties;
	HashMap<String, HashMap<String,String>> _meta_properties;
	
	public FeatureCollection(){
		_shapes = new TreeMap<Integer,Feature>();
		_meta_properties = new HashMap<String, HashMap<String,String>>();
	}
	
	public String toJson(){
		
		StringBuffer aBuffer = new StringBuffer();
		
		aBuffer.append("{ \"type\": \"FeatureCollection\", \"features\": [");
		
		Feature[] aValues = new Feature[_shapes.values().size()];
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
			aBuf.append(aKeys[i].replace("\"", ""));
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
	
	public FeatureCollection[][] groupGridDivide(int iN, int iM){
		
		FeatureCollection[][] aDividedResult = new FeatureCollection[iN][iM];
		//HashSet<Integer> aAlreadySelected = new HashSet<Integer>();
		
		double xStep = (_bnd._Xmax-_bnd._Xmin)/iN;
		double yStep = (_bnd._Ymax-_bnd._Ymin)/iM;
		
		for (int i=0; i<iN; i++) {
			
			double aXmin = _bnd._Xmin + i*xStep;
			double aXmax = _bnd._Xmin + (i+1)*xStep;
			
			for (int j=0; j<iM; j++) {
			
				FeatureCollection aGroupRecord = new FeatureCollection();
				
				double aYmin = _bnd._Ymin + j*yStep;
				double aYmax = _bnd._Ymin + (j+1)*yStep;
				
				Bounding aBnd = new Bounding(aXmin,aYmin,aXmax,aYmax);
				
				aGroupRecord._bnd = aBnd;
				
				for (Entry<Integer,Feature> aERec:_shapes.entrySet()) {
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
			
			Feature aRecord = _shapes.get(aIntValue);
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

	@Override
	public List<Entity> extract() {
		Vector<Entity> aEntities = new Vector<Entity>();
		for (Shape aShape:_shapes.values()) {
			aEntities.addAll(aShape.extract());
		}
		return aEntities;
	}
	
	public Bounding getMergedBound(){
		Bounding aSt = _shapes.firstEntry().getValue().getBounding();
		for (Shape aShape:_shapes.values()) {
			aSt.merge(aShape.getBounding());
		}
		return aSt;
	}
	

	@Override
	public void draw(Display iDisp) {
		for (Shape aShape:_shapes.values()) {
			aShape.draw(iDisp);
		}
	}

	@Override
	public int[] arcs() {
		int[] aAll= {};
		for (Shape aShape:_shapes.values()) {
			aAll = ArrayUtils.addAll(aAll, aShape.arcs());
		}
		return aAll;
	}

	@Override
	public Object toTopology() {
		GeometryCollection aGeoCol = new GeometryCollection();
		for (Shape aShape:_shapes.values()) {
			aGeoCol.addGeometry(aShape.toTopology());
		}
		return aGeoCol;
	}

}
