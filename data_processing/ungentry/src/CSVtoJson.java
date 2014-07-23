import json.converter.csv.CSVReader;


public class CSVtoJson {

	
	/**
	 * @param args
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		
		CSVReader aReader = new CSVReader("./data/shp/CENSUS_DBF.csv");
		aReader.read();
		
		//System.out.println(aReader.toString());

		CSVReader aReader2 = new CSVReader("./data/shp/ACS0812_Boston.csv");
		aReader2.read();
		
		//System.out.println(aReader2.toString());
		
		aReader.merge("Geoid10", "\"%s\"", aReader2, "tractid10", "%s");
		
		System.out.println(aReader.toString());
		
	}

}
