package tools;

import java.util.Map;

public class EntryImp<K, V> implements Map.Entry<K, V> {
    private K key; // usually final
    private V value;

    public EntryImp(K key, V value) {
        this.key = key;
        this.value = value;
    }

    @Override
    public K getKey() {
        return key;
    }

    @Override
    public V getValue() {
        return value;
    }

    @Override
    public V setValue(V value) {
        V old = this.value;
        this.value = value;
        return old;
    }
    
    public K setKey(K key) {
        K old = this.key;
        this.key = key;
        return old;
    }
    
    public String toString(){
    	return "["+key+","+value+"]";
    }
}
