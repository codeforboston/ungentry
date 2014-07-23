package shape;

import geometry.DouglasPeucker;

import java.awt.geom.Point2D;
import java.io.DataInputStream;
import java.io.IOException;
import java.util.Vector;

import com.jhlabs.map.proj.Projection;
import com.jhlabs.map.proj.ProjectionFactory;

import tools.Toolbox;

public class Polygon extends Shape {

	//double _Xmin, _Ymin, _Xmax, _Ymax;
	Bounding _bnd;
	int[] _parts;
	Point[] _points;
	
	public static int sKink;
	public static int sMin;
	
	static {
		
		sKink = 100;
		sMin = 10;
		
	}
	
	public Polygon(double Xmin, double Ymin, double Xmax, double Ymax, int[] iParts, Point[] iPoints){
		
		_bnd = new Bounding(Xmin, Ymin,Xmax,Ymax);
		/*_Xmin = Xmin;
		_Ymin = Ymin;
		_Xmax = Xmax;
		_Ymax = Ymax;*/
		
		_parts = iParts;
		_points = iPoints;
	}
	
	public static Polygon readPolygon(DataInputStream iStream){
	
		double Xmin, Ymin, Xmax, Ymax;
		
		byte[] aIBuffer = new byte[4];
		byte[] aDBuffer = new byte[8];
		
		int[] parts = null;
		
		Point[] points = null;

		try {
			
			iStream.read(aDBuffer);
			Xmin = Toolbox.getDoubleFromByte(aDBuffer);
			
			iStream.read(aDBuffer);
			Ymin = Toolbox.getDoubleFromByte(aDBuffer);
			
			Point2D.Double aRes = Toolbox.convertLatLong(Xmin, Ymin);
			Xmin = aRes.x;
			Ymin = aRes.y;
			
			
			iStream.read(aDBuffer);
			Xmax = Toolbox.getDoubleFromByte(aDBuffer);
			
			iStream.read(aDBuffer);
			Ymax = Toolbox.getDoubleFromByte(aDBuffer);
		
			aRes = Toolbox.convertLatLong(Xmax, Ymax);
			Xmax = aRes.x;
			Ymax = aRes.y;
			
			/*
			double swap;
			if (Xmin>Xmax) {
				swap = Xmin;
				Xmin = Xmax;
				Xmax = swap;
			}*/
			
			System.out.println("Xmin:"+Xmin);
			System.out.println("Ymin:"+Ymin);
			System.out.println("Xmax:"+Xmax);
			System.out.println("Ymax:"+Ymax);
			
			iStream.read(aIBuffer);
			int aNumparts = Toolbox.little2big(aIBuffer);
			//System.out.println("num parts:"+aNumparts);
			parts = new int[aNumparts];
			
			iStream.read(aIBuffer);
			int aNumPoints = Toolbox.little2big(aIBuffer);
			//System.out.println("num points:"+aNumPoints);
			points = new Point[aNumPoints];
			
			for (int i=0; i<aNumparts; i++) {
				iStream.read(aIBuffer);
				parts[i] = Toolbox.little2big(aIBuffer);
			}
			
			for (int i=0; i<aNumPoints; i++) {
				points[i] = Point.readPoint(iStream);
			}
			
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return null;
		}
		
		return new Polygon(Xmin, Ymin, Xmax, Ymax, parts, points);
		
	}
	
	public Polygon reducePolygonIntern(int iKink){
		
		Vector<Point> aRecPoints = new Vector<Point>();
		Vector<Integer> aRecParts = new Vector<Integer>();
		
		int lastBegin = 0;
		for (int i=0; i<_parts.length; i++) {
			
			int min = _parts[i];
			int max = (i==_parts.length-1?_points.length:_parts[i+1]);
			
			Point[] aPoints = new Point[max-min];
			
			int count = 0;
			for (int j=min; j<max; j++) {
				aPoints[count] = _points[j];
				count++;
			}
			
			aPoints = DouglasPeucker.GDouglasPeucker(aPoints, iKink);
		
			if (aPoints.length!=0) {
				aRecParts.add(lastBegin);
				for (int j=0; j<aPoints.length; j++) {
					aRecPoints.add(aPoints[j]);
				}
				lastBegin += aPoints.length;
			}
			
		}
		
		Integer[] aTabObject = new Integer[aRecParts.size()];
		aTabObject = aRecParts.toArray(aTabObject);
		
		Point[] aPoints = new Point[aRecPoints.size()];
		aPoints =  aRecPoints.toArray(aPoints);
		
		int[] aResTab = new int[aTabObject.length];
		for (int i=0;i<aResTab.length; i++){
			aResTab[i] = aTabObject[i].intValue();
		}

		//System.out.println("Reduced "+aPoints.length+"/"+_points.length);
		return new Polygon(_bnd._Xmin, _bnd._Ymin, _bnd._Xmax, _bnd._Ymax, aResTab, aPoints );
	}
	
	public Polygon reducePolygon(int iKink, int iMin){
	
		int iStartKink = iKink;
		Polygon aRes = reducePolygonIntern(iStartKink);
		while (aRes._points.length<iMin) {
			aRes = reducePolygonIntern(iStartKink);
			iStartKink-=2;
		}
		return aRes;
	}	
		
	@Override
	public String toJson() {
		
		Polygon aPoly = this;
		if (sKink!=0) aPoly = reducePolygon(sKink, sMin);
		// TODO Auto-generated method stub
		StringBuffer aBuffer = new StringBuffer();
		
		aBuffer.append("{ \"type\": \"Polygon\", \"coordinates\": [ ");
		
		//     [ [100.0, 0.0], [101.0, 0.0], [101.0, 1.0], [100.0, 1.0], [100.0, 0.0] ]
		
		for (int i=0; i<aPoly._parts.length; i++) {
		
			int min = aPoly._parts[i];
			int max = (i==aPoly._parts.length-1?aPoly._points.length:aPoly._parts[i+1]);
			aBuffer.append("[");
			for (int j=min; j<max; j++) {
			
				aBuffer.append("[");
	
				aBuffer.append(String.format("%.4f", aPoly._points[j].x));
				aBuffer.append(",");
				aBuffer.append(String.format("%.4f", aPoly._points[j].y));
				aBuffer.append("]");
				if (j!=max-1) aBuffer.append(",");
				
			}
			aBuffer.append("]");
			if (i!=aPoly._parts.length-1) aBuffer.append(",");
			
		}
		
		aBuffer.append(" ] }");

		
		return aBuffer.toString();
	}
	
	public boolean partlyIn(Bounding iBnd){
		return _bnd.partlyIn(iBnd);
	}

	@Override
	public Bounding getBounding() {
		// TODO Auto-generated method stub
		return _bnd;
	}
	
	
	
}
