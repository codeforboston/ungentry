package json.graphic;

import java.awt.Canvas;
import java.awt.Color;
import java.awt.Graphics;
import java.awt.Image;
import java.awt.image.BufferedImage;

import javax.swing.JFrame;

import json.geojson.objects.Bounding;

public class Display extends Canvas implements Runnable {

	int _width;
	int _height;
	Image offscreen; 
	Graphics bufferGraphics;
	
	Bounding _bound;
	double sx,sy;
	
	public Display(int iWidth, int iHeight)
	{

		_width = iWidth;
		_height = iHeight;
		
		offscreen = new BufferedImage(_width,_height, BufferedImage.TYPE_4BYTE_ABGR);
		bufferGraphics = offscreen.getGraphics();
		clear();

	}

	public void setBound(Bounding iBound){
		_bound = iBound;
		sx = (double) (_width/(iBound._Xmax-iBound._Xmin));
		sy = (double) (_height/(iBound._Ymax-iBound._Ymin));
		
	}
	
	public void clear(){
		bufferGraphics.clearRect(0, 0, _width, _height);
	}
	
	public void drawLine(double x1, double y1, double x2, double y2, Color iCol) {
		bufferGraphics.setColor(iCol);
		bufferGraphics.drawLine((int)((x1-_bound._Xmin)*sx), 
								_height-(int)((y1-_bound._Ymin)*sy), 
								(int)((x2-_bound._Xmin)*sx), 
								_height-(int)((y2-_bound._Ymin)*sy));
	}
	
	public void drawPoint(double x1, double y1, int iSize, Color iCol) {
		bufferGraphics.setColor(iCol);
		bufferGraphics.fillRect((int)((x1-_bound._Xmin)*sx)-iSize, // factorize
								_height-(int)((y1-_bound._Ymin)*sy)-iSize, 
								2*iSize, 
								2*iSize);
	}
	
	public void init(){
		
		JFrame frame = new JFrame();
		//frame.setUndecorated(true);
		frame.setSize(_width, _height);
		frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		frame.getContentPane().add(this);                    
		frame.setVisible(true);
	}

	public void start(){
		new Thread(this).start();
	}
	
	public void paint(Graphics graphics)
	{

		graphics.drawImage(offscreen,0,0,this); 

	}
	
	public void update(Graphics g)
	{
		paint(g);
	} 


	@Override
	public void run() {

		while (true) {

			paint(this.getGraphics());

			try {
				Thread.sleep(1000);
			} catch (InterruptedException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}

		}

	}

}
