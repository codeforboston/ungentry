package json.topojson.geom.sub;

import java.util.Vector;

import json.geojson.objects.Bounding;
import json.topojson.algorithm.ArcMap;
import json.topojson.topology.Arc;

public class Ring extends Entity {

	public Ring(Position[] iPoints, Bounding iBound){
		super(iPoints, iBound);
	}

	/**
	 * Can return index > iData.length
	 * @param iData
	 * @param iStartIndex
	 * @return
	 */
	int findNext(int[] iData, int iStartIndex){
		int count = 0;
		while ((iData[(count+iStartIndex) % iData.length]!=1)) {
			if (count>iData.length) {
				return -1; // not found
			}
			count++;
		}
		return count+iStartIndex;
	}
	
	@Override
	public void cut(ArcMap iMap) {
		
		_ref = iMap;
		
		int aShift = findNext(_pattern, 0);
		int aCount = aShift;
		Vector<Integer> aArcIndexes = new Vector<Integer>();
		while (aCount<_pattern.length+aShift){
			int aLast = findNext(_pattern, aCount+1);
			if (aLast==-1) break;
			
			Position[] aPoints = new Position[aLast-aCount+1];
			for (int i=aCount; i<=aLast; i++){
				aPoints[i-aCount]=_points[i%_pattern.length];
			}
			Arc aArc = new Arc(aPoints);
			Integer aArcIndex = iMap.findArc(aArc);
			if (aArcIndex==null) {
				iMap.addArc(aArc);
				aArcIndexes.add(aArc.getId());
			} else {
				aArcIndexes.add(aArcIndex);
			}
			
			aCount = aLast;
		}
		
		if (aArcIndexes.size()==0) { // No intersection for this polygon
			Arc aArc = new Arc(_points);
			iMap.addArc(aArc);
			aArcIndexes.add(aArc.getId());
		}
		
		_indexes = vectorToInt(aArcIndexes);
		
	}

	
	
}
