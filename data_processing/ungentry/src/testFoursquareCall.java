import foursquare.Arguments;
import foursquare.FSReply;
import foursquare.FSResponse;
import foursquare.FSVenue;
import foursquare.Foursquare;


public class testFoursquareCall {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		
		Arguments aFArgs = new Arguments();
		//	aFArgs.addLL("40.7", "-74");
		aFArgs.addPrice("1,2,3,4");
		aFArgs.addIntent("browse");
		aFArgs.addNorthEast("40.695","-74.005");
		aFArgs.addSouthWest("40.705","-73.995");
		
		FSReply aRes = Foursquare.getData(aFArgs);
		
		if (aRes!=null) {
			
			System.out.println("#venues:"+aRes.response.venues.length);
			
			for (FSVenue aVenue:aRes.response.venues){
				
				System.out.println("#venue name:"+aVenue.name);
				
			}
			
		}

	}

}
