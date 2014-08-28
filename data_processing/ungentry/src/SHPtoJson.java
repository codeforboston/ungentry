
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.HashMap;
import java.util.Set;
import java.util.TreeMap;

import json.converter.csv.CSVReader;
import json.converter.shp.ShpFileReader;
import json.geojson.FeatureCollection;
import json.geojson.objects.Polygon;
import json.topojson.algorithm.ArcMap;
import json.topojson.api.TopojsonApi;
import json.topojson.topology.Topology;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;




public class SHPtoJson {

	public static String prettyJson(String iJsonData){
		
		
		Gson gson = new GsonBuilder().setPrettyPrinting().create();
		JsonParser jp = new JsonParser();
		JsonElement je = jp.parse(iJsonData);
		return gson.toJson(je);
	
	}
	
	public static void recordFile(String iFilename, String iJson){
		
		FileOutputStream out;
		try {
			
			out = new FileOutputStream(iFilename/*"./data/shp/out.json"*/);
			out.write(iJson.getBytes());
			out.close();
		
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}
	
    public static void mkdir(String iDirName) {
	  
      File theDir = new File(iDirName);
	  // if the directory does not exist, create it
	  if (!theDir.exists()) {
	    try{
	        theDir.mkdir();
	     } catch(SecurityException se){
	        System.out.println("Unable to create directory:"+iDirName);
	     }    
	  }
	  
   }
	
    public static void generateMapData(String iCensus, String iACS, String iSHP, String iFileProperties, String iFileLinked, String iMerge,  String iFolderDate) throws FileNotFoundException {
		
		CSVReader aReader1 = new CSVReader(iCensus);
		aReader1.read();
		
		//System.out.println(aReader1.toString());

		CSVReader aReader2 = new CSVReader(iACS);
		aReader2.read();
		
		//System.out.println(aReader2.toString());
		
		
		System.out.println("Merging CENSUS and ACS ref:"+iMerge);
		aReader1.merge("Geoid10", "%s", aReader2, iMerge, "%s");
		
		System.out.println(aReader1.toString());
		
		//System.exit(0);
		
		ShpFileReader aReader = new ShpFileReader(iSHP);
		try {
			aReader.read();
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		CSVReader aReader3 = new CSVReader(iFileProperties);
		aReader3.read();
		
		TreeMap<Integer,TreeMap<String,String>> aMap =  aReader3._data;
		
		Set<Integer> aKeys = aMap.keySet();
		String[] aAccepted = new String[aKeys.size()];
		String[] aUnits = new String[aKeys.size()];
		String[] aTitles = new String[aKeys.size()];
		
		
		for (Integer aKey:aKeys) {
			aAccepted[aKey-1] = aMap.get(aKey).get("accepted");
			aUnits[aKey-1] = aMap.get(aKey).get("unit");
			aTitles[aKey-1] = aMap.get(aKey).get("title");
		}
		
		//String[] aAccepted = { "\"medianrent_00\"", "\"medianrent_90\"", "\"medianrent_10\"", iMerge , "rowid", "Geoid10", "\"pctpoverty_00\"" , "\"pctpoverty_90\"", "\"pctpoverty_10\"" };
		//String[] aUnits = { "$", "$", "$", "" , "", "", "%" , "%", "%" };
		//String[] aTitles = { "Avg. Rent", "Avg. Rent", "Avg. Rent", "" , "", "", "% Poverty" , "% Poverty", "% Poverty" };
		
		aReader.getGroupRecord().merge(aReader1, "rowid", aAccepted, aUnits, aTitles);
		
		FeatureCollection aCollection = aReader.getGroupRecord();
		
		CSVReader aReader4 = new CSVReader(iFileLinked);
		aReader4.read();
		
		for (Integer aKey:aReader4._data.keySet()) {
			TreeMap<String,String> aTuple = aReader4._data.get(aKey);
			aCollection.mergeMinMaxProperties(new String[] {
					aTuple.get("item1"),
					aTuple.get("item2"),
					aTuple.get("item3")
			});
		}
		
		/*
		aCollection.mergeMinMaxProperties(new String[] {
				"\"medianrent_00\"",
				"\"medianrent_90\"",
				"\"medianrent_10\""
		});
		
		aCollection.mergeMinMaxProperties(new String[] {
				"\"pctpoverty_00\"",
				"\"pctpoverty_90\"",
				"\"pctpoverty_10\""
		});
		*/
		
		int[] grid = { 16, 8, 4, 2, 1 }; 
		int[] precision = { 5, 5, 10, 25, 100 };
		
		mkdir("./data/shp/"+iFolderDate+"/");
		mkdir("./data/shp/"+iFolderDate+"/dataset/");
		
		
		ArcMap aArcMap = TopojsonApi.joinCollection(aCollection);
		
		for (int u=0; u<precision.length; u++) {
		
			int aN = grid[u];
			int aM = grid[u];
			
			Topology[][] aGroupGrid = TopojsonApi.tileFeatureCollectionToTopojson(aCollection, aArcMap, aN, aM, "MA");
			
			String aDir = "./data/shp/"+iFolderDate+"/dataset/p"+u+"/";
			
			mkdir(aDir);
			
			StringBuffer aMapBound = new StringBuffer();
			
			aMapBound.append("[");
			for (int i=0; i<aN; i++) {
				
				for (int j=0; j<aM; j++) {
					
					String aFileName = "MA_"+i+"_"+j+".json";
					
					Topology aRec = aGroupGrid[i][j];
					aRec.simplify(precision[u]);
					aRec.quantize(6); // better precision
					recordFile(aDir+aFileName, TopojsonApi.getJson(aRec, false) ); // not compressed
					
					aMapBound.append("{ \"file\" : \"");
					aMapBound.append(aFileName);
					aMapBound.append("\" , ");
					aMapBound.append(" \"bound\" :");
					aMapBound.append(aRec._bnd.toJson());
					aMapBound.append("}");
					
					if (j!=aM-1) {
						aMapBound.append(",");
					}
					
				}
				
				if (i!=aN-1) {
					aMapBound.append(",");
				}
				
			}
			aMapBound.append("]");
		
			recordFile(aDir+"mapbounds.json", aMapBound.toString());
			recordFile(aDir+"properties.json", aReader
					.getGroupRecord()
					.toJsonMinMaxProperties(new String[]{"tractid10","Geoid10"}));
			
		}
		
		
	}
    	
    
	/**
	 * @param args
	 */
	public static void main(String[] args) {
		
		try {
			generateMapData(
			"./data/shp/in/2010/CENSUS_DBF.csv",
			"./data/shp/in/2010/allcensusacsdata_2010boundaries.csv",
			"./data/shp/in/2010/CENSUS2010TRACTS_POLY.shp",
			"./data/properties.csv",
			"./data/linked.csv",
			"\"tractid10\"",
			"common");
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}

}
