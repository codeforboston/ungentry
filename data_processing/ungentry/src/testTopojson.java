import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.List;
import java.util.Map.Entry;
import java.util.Set;
import java.util.Vector;

import org.omg.CORBA_2_3.portable.OutputStream;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.sun.org.apache.xalan.internal.utils.FeatureManager.Feature;

import json.converter.shp.ShpFileReader;
import json.geojson.FeatureCollection;
import json.graphic.Display;
import json.topojson.algorithm.ArcMap;
import json.topojson.geom.sub.Entity;
import json.topojson.geom.sub.Position;
import json.topojson.topology.Topology;


public class testTopojson {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		
		Display aDisplay = new Display(1024, 768);
		aDisplay.init();
		aDisplay.start();
		
		ShpFileReader aReader = new ShpFileReader("./data/shp/in/2010/CENSUS2010TRACTS_POLY.shp");
		try {
			aReader.read();
		} catch (FileNotFoundException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		
		FeatureCollection aCollection = aReader.getGroupRecord();

		aDisplay.setBound(aCollection.getMergedBound());
		aCollection.draw(aDisplay);	
		
		List<Entity> aEntities = aCollection.extract();
		System.out.println("Number of entities:"+aEntities.size());
		Set<Position> aJoinPoints = Entity.join(aEntities);
		System.out.println("Number of jointures:"+aJoinPoints.size());
		
		for (Position aP:aJoinPoints) {
			aP.draw(aDisplay);
		}
		
		
		ArcMap aMap = new ArcMap();
		for (Entity aEntity:aEntities){
			aEntity.cut(aMap);
		}
		
		System.out.println("ArcMap size:"+aMap.getSize());
		System.out.println("ArcMap shared:"+aMap.getShared());
		
		aMap.draw(aDisplay);
		
		Topology aTopology = new Topology();
		
		
		Vector<Entry<Integer, json.geojson.Feature>> aEnt = new Vector<Entry<Integer, json.geojson.Feature>>();
		int count = 2000;
		
		for (Entry<Integer, json.geojson.Feature> aEntry:aCollection._shapes.entrySet()) {
			aEnt.add(aEntry);
			count--;
			if (count==0) break;
		}
	
		aCollection._shapes.clear();
		
		for (Entry<Integer, json.geojson.Feature> aEntry:aEnt){
			aCollection._shapes.put(aEntry.getKey(), aEntry.getValue());
		}
		
		aTopology.addObject("F0", aCollection.toTopology());
		
		aTopology.setArcs(aMap);
		
		aTopology.simplify(100);
		aTopology.quantize(4);
		
		Gson aGson = new Gson();//new GsonBuilder().setPrettyPrinting().create();
		String aJson = aGson.toJson(aTopology);
		
		FileOutputStream aStream;
		try {
			aStream = new FileOutputStream(new File("./web/topojson.json"));
			aStream.write(aJson.getBytes());
			aStream.flush();
			aStream.close();
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		
	}

}
