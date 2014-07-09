package csv;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map.Entry;
import java.util.TreeMap;
import java.util.Vector;

import tools.EntryImp;


public class CSVReader {

	String _filename;
	BufferedReader _reader;
	String[] _header;
	
	public TreeMap<Integer, TreeMap<String,String>> _data;
	
	public CSVReader(String iFileName){
		_filename = iFileName;
		_data = new TreeMap<Integer,TreeMap<String,String>>();
	}
	
	public void readHeader(){
		
		try {
			
			String aHeader = _reader.readLine();
			
			_header = aHeader.split(",");
			
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}
	
	public void readData(){
		
		try {
			int count = 1;
			String line;
			while ((line = _reader.readLine()) != null) {
			
				String[] data = line.split(",");
				TreeMap<String,String> aTupple = new TreeMap<String,String>();
				
				aTupple.put("rowid", String.format("%d", count) );
				for (int i=0; i<_header.length;i++) {
					if (i<data.length) {
						aTupple.put(_header[i].trim(), data[i].trim());
					}
				}
				
				_data.put(count,aTupple);
				count++;
			}
			
			_reader.close();
			
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}
	
	public void read(){
		
		try {

			_reader = new BufferedReader(new InputStreamReader(new FileInputStream(new File(_filename))));

			readHeader();
			
			readData();

		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}
	
	public String toString(){
		StringBuffer aBuf = new StringBuffer();
		
		for (TreeMap<String,String> aTuple:_data.values()) {
			aBuf.append(aTuple);
			aBuf.append("\n");
		}
		return aBuf.toString();
	}
	
	public void merge(String iCol1, String iFormat1, CSVReader iReader, String iCol2, String iFormat2) {
		
		HashMap<String,Vector<EntryImp<String,Integer>>> aIndex2 = new HashMap<String,Vector<EntryImp<String,Integer>>>();
		for (Entry<Integer,TreeMap<String,String>> entrySet: iReader._data.entrySet()){
			String aHashedValue = String.format(iFormat2,entrySet.getValue().get(iCol2));
			
			if (!aIndex2.containsKey(aHashedValue)) {
				aIndex2.put(aHashedValue, new Vector<EntryImp<String,Integer>>());
			} 
			aIndex2.get(aHashedValue).add(new EntryImp<String,Integer>(aHashedValue,entrySet.getKey()));
			
			if (aIndex2.get(aHashedValue).size()>1) {
				System.err.println(aHashedValue+" ("+iCol2+") hash overlap:"+aIndex2.get(aHashedValue)+ " Value:"+ entrySet.getValue() );
				//System.exit(0);
			}
			//System.out.println("hash("+iCol2+"):"+aHashedValue);
		}
		
		for (Entry<Integer,TreeMap<String,String>> entrySet: _data.entrySet()){
		
			String aValueToFind = String.format(iFormat1, entrySet.getValue().get(iCol1));
			System.out.print("tofd("+iCol1+"):"+aValueToFind);
			Vector<EntryImp<String,Integer>> aIndex = aIndex2.get(aValueToFind);
			if (aIndex!=null) {
				
				//System.out.println(" ok\n");
				for (int i=0; i<aIndex.size(); i++){
					
					if (aValueToFind.equals(aIndex.get(i).getKey())) {
						TreeMap<String,String> toMerge = iReader._data.get(aIndex.get(i).getValue());
						
						for (Entry<String,String> aTuple:toMerge.entrySet()) {
							
							if (!aTuple.getKey().equals("rowid")) {
								entrySet.getValue().put(aTuple.getKey(), aTuple.getValue());
							}
						}
					}
					
				}
				
			} 
		
		}	
			
	}

}
