package shp;

import java.awt.geom.Point2D;
import java.io.DataInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map.Entry;
import java.util.TreeMap;

import com.jhlabs.map.proj.Projection;
import com.jhlabs.map.proj.ProjectionFactory;

import record.GroupRecord;
import record.Record;
import shape.Bounding;
import shape.Polygon;
import shape.Shape;
import tools.Toolbox;


public class ShpFileReader {

	static final String[] _typeNames = {
		"Null Shape",
		"Point",
		"",
		"PolyLine",
		"",
		"Polygon",
		"",
		"",
		"MultiPoint"
	};

	String _filename;
	DataInputStream _stream;

	/*
	int _shapeType;

	double _Xmin,_Xmax;
	double _Ymin,_Ymax;
	double _Zmin,_Zmax;
	double _Mmin,_Mmax;
	
	TreeMap<Integer,Record> _shapes;
	*/
	GroupRecord _groupRecord;
	
	public ShpFileReader(String iFileName){

		_filename = iFileName;
		//_shapes = new TreeMap<Integer,Record>();

	}
	
	String giveShapeName(int iShapeType){
		return _typeNames[iShapeType];
	}


	public void readHeader(){

		try {

			_groupRecord = new GroupRecord();
			
			int aFileCode = _stream.readInt();

			System.out.println("File code :"+aFileCode);
			if (aFileCode!=0x0000270a) {
				System.out.println("File not a shp one.");
				return;
			}

			byte[] aUnused = new byte[5*4];
			_stream.read(aUnused);

			int aSize = _stream.readInt();
			System.out.println("File size :"+aSize*2);

			byte[] aIBuffer = new byte[4];
			_stream.read(aIBuffer);
			int aVersion = Toolbox.little2big(aIBuffer);
			System.out.println("Version "+aVersion);

			_stream.read(aIBuffer);
			_groupRecord._shapeType = Toolbox.little2big(aIBuffer);
			System.out.println("Shape Type : "+giveShapeName(_groupRecord._shapeType));

			
			_groupRecord._bnd = new Bounding(0,0,0,0);
			byte[] aDBuffer = new byte[8];
			// Bounding
			// XMin
			_stream.read(aDBuffer);
			_groupRecord._bnd._Xmin = Toolbox.getDoubleFromByte(aDBuffer);
			

			// YMin
			_stream.read(aDBuffer);
			_groupRecord._bnd._Ymin = Toolbox.getDoubleFromByte(aDBuffer);
			

			Point2D.Double aRes = Toolbox.convertLatLong(_groupRecord._bnd._Xmin, _groupRecord._bnd._Ymin);
			_groupRecord._bnd._Xmin = aRes.x;
			_groupRecord._bnd._Ymin = aRes.y;
			
			// XMax
			_stream.read(aDBuffer);
			_groupRecord._bnd._Xmax = Toolbox.getDoubleFromByte(aDBuffer);
			

			// YMax
			_stream.read(aDBuffer);
			_groupRecord._bnd._Ymax = Toolbox.getDoubleFromByte(aDBuffer);
			

			aRes = Toolbox.convertLatLong(_groupRecord._bnd._Xmax, _groupRecord._bnd._Ymax);
			_groupRecord._bnd._Xmax = aRes.x;
			_groupRecord._bnd._Ymax = aRes.y;
			
			/*
			double swap;
			if (_groupRecord._bnd._Xmin>_groupRecord._bnd._Xmax) {
				swap = _groupRecord._bnd._Xmin;
				_groupRecord._bnd._Xmin = _groupRecord._bnd._Xmax;
				_groupRecord._bnd._Xmax = swap;
			}*/
			
			System.out.println("xmin : "+_groupRecord._bnd._Xmin);
			System.out.println("ymin : "+_groupRecord._bnd._Ymin);
			System.out.println("xmax : "+_groupRecord._bnd._Xmax);
			System.out.println("ymax : "+_groupRecord._bnd._Ymax);
			
			// ZMin
			_stream.read(aDBuffer);
			_groupRecord._Zmin = Toolbox.getDoubleFromByte(aDBuffer);
			System.out.println("zmin : "+_groupRecord._Zmin);

			// ZMax
			_stream.read(aDBuffer);
			_groupRecord._Zmax = Toolbox.getDoubleFromByte(aDBuffer);
			System.out.println("zmax : "+_groupRecord._Zmax);

			// MMin
			_stream.read(aDBuffer);
			_groupRecord._Mmin = Toolbox.getDoubleFromByte(aDBuffer);
			System.out.println("mmin : "+_groupRecord._Mmin);

			// MMax
			_stream.read(aDBuffer);
			_groupRecord._Mmax = Toolbox.getDoubleFromByte(aDBuffer);
			System.out.println("mmax : "+_groupRecord._Mmax);

			// here reading records

			while (_stream.available()!=0) {
				readRecord();
			}


		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}

	public void readRecord(){

		try {

			// Here reading record header
			int aRecordNumber = _stream.readInt();
			System.out.println("Record # : "+aRecordNumber);

			int aRecordSize = _stream.readInt();
			System.out.println("Record Size : "+aRecordSize);

			byte[] aIBuffer = new byte[4];
			_stream.read(aIBuffer);
			int aShapeType = Toolbox.little2big(aIBuffer);
			System.out.println("Record Shape Type : "+giveShapeName(aShapeType));
			
			Shape aReadShape = null;
			switch (aShapeType) {
				case 5 : { //Polygons
					aReadShape = Polygon.readPolygon(_stream);
				}
			}
			
			_groupRecord._shapes.put(new Integer(aRecordNumber), new Record(aRecordNumber, aReadShape));
			
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}

	public void read(){

		try {

			_stream = new DataInputStream(new FileInputStream(new File(_filename)));

			readHeader();

		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}


	}
	
	public String toJson(){
		return _groupRecord.toJson();
	}
	
	public GroupRecord getGroupRecord(){
		return _groupRecord;
	}

}
