import java.awt.geom.Point2D;

import com.jhlabs.map.proj.Projection;
import com.jhlabs.map.proj.ProjectionFactory;


public class Conversion {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub

		Projection aProj = ProjectionFactory.getNamedPROJ4CoordinateSystem("nad83:2001");
		
		
		Point2D.Double aSrc = new Point2D.Double(240678.76, 886748.07);
		Point2D.Double aDst = new Point2D.Double();
		
		aProj.inverseTransform(aSrc, aDst);
		
		System.out.println(aDst.x);
		System.out.println(aDst.y);
		
	}

}
