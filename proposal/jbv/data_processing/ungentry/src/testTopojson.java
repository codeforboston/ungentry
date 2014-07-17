import java.util.List;
import java.util.Set;

import com.google.gson.Gson;

import json.converter.shp.ShpFileReader;
import json.geojson.FeatureCollection;
import json.graphic.Display;
import json.topojson.algorithm.ArcMap;
import json.topojson.geom.sub.Entity;
import json.topojson.geom.sub.Position;


public class testTopojson {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		
		Display aDisplay = new Display(1024, 768);
		aDisplay.init();
		aDisplay.start();
		
		ShpFileReader aReader = new ShpFileReader("./data/shp/in/2010/CENSUS2010TRACTS_POLY.shp");
		aReader.read();
		
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
		
		Gson aGson = new Gson();
		String aJson = aGson.toJson(aCollection.toTopology());
		
		System.out.println(aJson);
		
	}

}
