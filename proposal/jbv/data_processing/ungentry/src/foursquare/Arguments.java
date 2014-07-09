package foursquare;

import java.util.TreeSet;

import org.apache.commons.lang3.tuple.ImmutablePair;
import org.apache.commons.lang3.tuple.Pair;

public class Arguments {

	TreeSet<Pair<String,String>> _args;
	
	public Arguments(){
		_args = new TreeSet<Pair<String,String>>();
	}

	public void addArg(String iKey, String iValue){
		_args.add(new ImmutablePair<String,String>(iKey,iValue));
	}
	
	public void addLL(String iLong, String iLat){
		addArg("ll",iLong+","+iLat);
	}
	
	public void addIntent(String iValue){
		addArg("intent",iValue);
	}
	
	public void addSouthWest(String iLong, String iLat){
		addArg("sw",iLong+","+iLat);
	}
	
	public void addNorthEast(String iLong, String iLat){
		addArg("ne",iLong+","+iLat);
	}
	
	public void addPrice(String iValue){
		addArg("price",iValue);
	}
	
	public String toString(){
		
		StringBuffer aBuffer = new StringBuffer();
		
		
		for (Pair<String,String> aPair:_args) {
			aBuffer.append("&");
			aBuffer.append(aPair.getKey());
			aBuffer.append("=");
			aBuffer.append(aPair.getValue());
		}
		
		return aBuffer.toString();
	}
	
}
