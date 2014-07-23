package foursquare;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.MalformedURLException;
import java.net.URL;

import com.google.gson.Gson;

public class Foursquare {

	public static String _base_url_search = "https://api.foursquare.com/v2/venues/search";
	public static String _base_url_explore = "https://api.foursquare.com/v2/venues/explore";
	
	public static String CLIENT_ID = "BV0L2QQ1LM3MSCHE202WKCOQGAXKZTEBQ2JT1NZIQXZDVLHW";
	public static String CLIENT_SECRET = "NZ1JVUJBTICYLYDYPDTEUEYDYUGVDZ3D2BY1CAWH3TD21EVK";
	
	public static FSReply getData(Arguments iArgs){
		
		FSReply aRes = null;
		
		// v is API version
		String args = "?client_id="+CLIENT_ID+"&client_secret="+CLIENT_SECRET+"&v=20130815";
		//&ll=40.7,-74&price=1,2,3,4";
		
		args += iArgs.toString();
		
		URL aUrl;
		try {
			aUrl = new URL(_base_url_search+args);
		
		    BufferedReader in = new BufferedReader(
		    new InputStreamReader(aUrl.openStream()));
		
		    String inputLine;
		    StringBuffer iBuffer = new StringBuffer();
		    while ((inputLine = in.readLine()) != null)
		    	iBuffer.append(inputLine);
		    in.close();
         
		    Gson aGson = new Gson();
		    aRes = aGson.fromJson(iBuffer.toString(), FSReply.class);
		    
		} catch (MalformedURLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return aRes;
		
		
	}
	
	
	
}
