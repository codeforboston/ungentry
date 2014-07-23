package shape;

public class Bounding {

	public double _Xmin, _Ymin, _Xmax, _Ymax;
	
	public Bounding(double Xmin, double Ymin, double Xmax, double Ymax){
	
		_Xmin = Xmin;
		_Ymin = Ymin;
		_Xmax = Xmax;
		_Ymax = Ymax;
		
	}

	public boolean in(double X, double Y){
		return (X>_Xmin) && (Y>_Ymin) && (X<_Xmax) && (Y<_Ymax);
	}
	
	public boolean partlyIn(Bounding iBnd){
		return iBnd.in(_Xmin, _Ymin) || iBnd.in(_Xmax, _Ymax)
			|| iBnd.in(_Xmax, _Ymin) || iBnd.in(_Xmin, _Ymax);	   
	}
	
	public String toJson(){
		return "{ \"minx\" : "+_Xmin+" , \"miny\" : "+_Ymin+" , \"maxx\" : "+_Xmax+ " , \"maxy\" : "+_Ymax+" }";
	}
	
}
