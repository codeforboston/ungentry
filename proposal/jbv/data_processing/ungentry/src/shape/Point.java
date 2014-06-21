package shape;

import java.awt.geom.Point2D;
import java.io.DataInputStream;
import java.io.IOException;

import com.jhlabs.map.proj.Projection;
import com.jhlabs.map.proj.ProjectionFactory;

import tools.Toolbox;

public class Point extends Shape {
	
	public double x;
	public double y;
	
	
	
	Point(double iX, double iY){
		x = iX;
		y = iY;
	}

	
	
	public static Point readPoint(DataInputStream iStream){
		
		double X,Y;
		
		try {
		
			byte[] aDBuffer = new byte[8];
			iStream.read(aDBuffer);
			X = Toolbox.getDoubleFromByte(aDBuffer);
			iStream.read(aDBuffer);
			Y = Toolbox.getDoubleFromByte(aDBuffer);
		
			Point2D.Double aRes = Toolbox.convertLatLong(X, Y);
			
			X = aRes.x;
			Y = aRes.y;
			
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return null;
		}
		
		return new Point(X,Y);
		
	}

	@Override
	public String toJson() {
		return  "{  \"type\": \"Point\", \"coordinates\": ["+x+", "+y+"] }";
	}



	@Override
	public boolean partlyIn(Bounding iBnd) {
		// TODO Auto-generated method stub
		return iBnd.in(x, y);
	}

	@Override
	public Bounding getBounding() {
		// TODO Auto-generated method stub
		return null;
	}
	
}
