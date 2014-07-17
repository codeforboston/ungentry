package json.geojson.objects;

import java.awt.Rectangle;
import java.nio.ByteBuffer;

public class Bounding {

	public double _Xmin, _Ymin, _Xmax, _Ymax;
	public int hash;
	public Rectangle _rect;
	
	public Bounding(double Xmin, double Ymin, double Xmax, double Ymax){
	
		_Xmin = Xmin;
		_Ymin = Ymin;
		_Xmax = Xmax;
		_Ymax = Ymax;
		
		hash = ByteBuffer.allocate(4*8).putDouble(_Xmin).putDouble(_Ymin)
									   .putDouble(_Xmax).putDouble(_Xmax).hashCode();

	}

	@Override
	public int hashCode(){
		return hash;
	}
	
	public boolean in(double X, double Y){
		return (X>_Xmin) && (Y>_Ymin) && (X<_Xmax) && (Y<_Ymax);
	}
	
	public static boolean intersectRect(Bounding b1, Bounding b2, double iScale) {
		
		double vx = (b1._Xmax-b1._Xmin)*(iScale-1.0);
		double vy = (b1._Ymax-b1._Ymin)*(iScale-1.0);
		
		double Xmax = b1._Xmax+vx;
		double Xmin = b1._Xmin-vx;
		double Ymax = b1._Ymax+vy;
		double Ymin = b1._Ymin-vy;
		
		return !((b2._Xmin > (Xmax)) || 
		           (b2._Xmax < (Xmin)) || 
		           (b2._Ymin > (Ymax)) ||
		           (b2._Ymax < (Ymin)));
	}
	
	public boolean partlyIn(Bounding iBnd){
		return /*iBnd.in(_Xmin, _Ymin) || iBnd.in(_Xmax, _Ymax)
			|| iBnd.in(_Xmax, _Ymin) || iBnd.in(_Xmin, _Ymax)*/ intersectRect(this, iBnd, 1.0);	   
	}
	
	public boolean partlyIn(Bounding iBnd, double iScale){
		return /*iBnd.in(_Xmin, _Ymin) || iBnd.in(_Xmax, _Ymax)
			|| iBnd.in(_Xmax, _Ymin) || iBnd.in(_Xmin, _Ymax)*/ intersectRect(this, iBnd, iScale);	   
	}
	
	public String toJson(){
		return "{ \"minx\" : "+_Xmin+" , \"miny\" : "+_Ymin+" , \"maxx\" : "+_Xmax+ " , \"maxy\" : "+_Ymax+" }";
	}
	
	public void merge(Bounding bnd){
		if (bnd._Xmax>_Xmax) _Xmax = bnd._Xmax;
		if (bnd._Ymax>_Ymax) _Ymax = bnd._Ymax;
		if (bnd._Xmin<_Xmin) _Xmin = bnd._Xmin;
		if (bnd._Ymin<_Ymin) _Ymin = bnd._Ymin;
	}
	
	@Override
	public Bounding clone(){
		return new Bounding(_Xmin,_Ymin,_Xmax,_Ymax);
	}
	
}
