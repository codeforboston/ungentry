package json.tools;

import java.awt.geom.Point2D;
import java.nio.ByteBuffer;
import java.nio.ByteOrder;

import com.jhlabs.map.proj.Projection;
import com.jhlabs.map.proj.ProjectionFactory;

public class Toolbox {

	static Projection sProj;
	
	static {
		
		sProj = ProjectionFactory.getNamedPROJ4CoordinateSystem("nad83:2001");
	
	}
	
	public static Point2D.Double convertLatLong(double X, double Y){
		
		Point2D.Double aSrc = new Point2D.Double(X, Y);
		Point2D.Double aDst = new Point2D.Double();
		
		sProj.inverseTransform(aSrc, aDst);
		
		return aDst;
		
	}
	
	public static int little2big(byte[] iBytes) {
		return ByteBuffer.wrap(iBytes).order(ByteOrder.LITTLE_ENDIAN ).getInt();
	}

	public static double getDoubleFromByte(byte[] aDoubleBuffer){
		return ByteBuffer.wrap(aDoubleBuffer).order(ByteOrder.LITTLE_ENDIAN ).getDouble();
	}
	
}
