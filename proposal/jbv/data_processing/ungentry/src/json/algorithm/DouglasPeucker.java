package json.algorithm;


import java.awt.geom.Point2D;

import json.geojson.objects.Point;


public class DouglasPeucker {

	/* Stack-based Douglas Peucker line simplification routine 
	   returned is a reduced GLatLng array 
	   After code by  Dr. Gary J. Robinson,
	   Environmental Systems Science Centre,
	   University of Reading, Reading, UK
	*/

	public static Point[]  GDouglasPeucker(Point[] source, double kink)
	/* source[] Input coordinates in GLatLngs 	*/
	/* kink	in metres, kinks above this depth kept  */
	/* kink depth is the height of the triangle abc where a-b and b-c are two consecutive line segments */
	{
		
		
	    int	n_source, n_stack, n_dest, start, end, i, sig;    
	    double dev_sqr, max_dev_sqr, band_sqr;
	    double x12, y12, d12, x13, y13, d13, x23, y23, d23;
	    double F = ((Math.PI / 180.0) * 0.5 );
	    int[] index = new int[source.length]; /* aray of indexes of source points to include in the reduced line */
		int[] sig_start = new int[source.length]; /* indices of start & end of working section */
	    int[] sig_end = new int[source.length];	

	    /* check for simple cases */

	    if ( source.length < 3 ) 
	        return(source);    /* one or two points */

	    /* more complex case. initialize stack */
			
		n_source = source.length;
	    band_sqr = kink * 360.0 / (2.0 * Math.PI * 6378137.0);	/* Now in degrees */
	    band_sqr *= band_sqr;
	    n_dest = 0;
	    sig_start[0] = 0;
	    sig_end[0] = n_source-1;
	    n_stack = 1;

	    /* while the stack is not empty  ... */
	    while ( n_stack > 0 ){
	    
	        /* ... pop the top-most entries off the stacks */

	        start = sig_start[n_stack-1];
	        end = sig_end[n_stack-1];
	        n_stack--;

	        if ( (end - start) > 1 ){  /* any intermediate points ? */        
	                    
	                /* ... yes, so find most deviant intermediate point to
	                       either side of line joining start & end points */                                   
	            //System.out.println(end);
	            x12 = (source[end].x 
	            		- source[start].x);
	            y12 = (source[end].y - source[start].y);
	            if (Math.abs(x12) > 180.0) 
	                x12 = 360.0 - Math.abs(x12);
	            x12 *= Math.cos(F * (source[end].y + source[start].y));/* use avg lat to reduce lng */
	            d12 = (x12*x12) + (y12*y12);

	            for ( i = start + 1, sig = start, max_dev_sqr = -1.0; i < end; i++ ){                                    

	                x13 = (source[i].x - source[start].x);
	                y13 = (source[i].y - source[start].y);
	                if (Math.abs(x13) > 180.0) 
	                    x13 = 360.0 - Math.abs(x13);
	                x13 *= Math.cos (F * (source[i].y + source[start].y));
	                d13 = (x13*x13) + (y13*y13);

	                x23 = (source[i].x - source[end].x);
	                y23 = (source[i].y - source[end].y);
	                if (Math.abs(x23) > 180.0) 
	                    x23 = 360.0 - Math.abs(x23);
	                x23 *= Math.cos(F * (source[i].y + source[end].y));
	                d23 = (x23*x23) + (y23*y23);
	                                
	                if ( d13 >= ( d12 + d23 ) )
	                    dev_sqr = d23;
	                else if ( d23 >= ( d12 + d13 ) )
	                    dev_sqr = d13;
	                else
	                    dev_sqr = (x13 * y12 - y13 * x12) * (x13 * y12 - y13 * x12) / d12;// solve triangle

	                if ( dev_sqr > max_dev_sqr  ){
	                    sig = i;
	                    max_dev_sqr = dev_sqr;
	                }
	            }

	            if ( max_dev_sqr < band_sqr ){   /* is there a sig. intermediate point ? */
	                /* ... no, so transfer current start point */
	                index[n_dest] = start;
	                n_dest++;
	            }
	            else{
	                /* ... yes, so push two sub-sections on stack for further processing */
	                n_stack++;
	                sig_start[n_stack-1] = sig;
	                sig_end[n_stack-1] = end;
	                n_stack++;
	                sig_start[n_stack-1] = start;
	                sig_end[n_stack-1] = sig;
	            }
	        }
	        else{
	                /* ... no intermediate points, so transfer current start point */
	                index[n_dest] = start;
	                n_dest++;
	        }
	    }

	    /* transfer last point */
	    index[n_dest] = n_source-1;
	    n_dest++;

	    /* make return array */
	    Point[] r = new Point[n_dest];
	    for(int j=0; j < n_dest; j++)
	        r[j]=source[index[j]];
	    return r;
	    
	}

}
