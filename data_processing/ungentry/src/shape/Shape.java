package shape;

public abstract class Shape {

	public abstract String toJson();

	public abstract boolean partlyIn(Bounding iBnd);
	
	public abstract Bounding getBounding();
	
}
