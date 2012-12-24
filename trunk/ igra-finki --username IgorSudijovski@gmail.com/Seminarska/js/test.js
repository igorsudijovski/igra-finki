paper.install(window);
window.onload = function(){
	paper.setup('myCanvas');
	
	var background = new Path.Rectangle(new Rectangle(new Point(0,0),new Size(1000,1000)));
	background.fillColor = "#EEEEEE";
	var map = new Map(200,1000,"#EEEEEE");
	var ply = new Player();
	ply.init(map);
	
	var ball = new Ball();
	ball.init(400,400);
	var tool = new Tool();
	var base = new Base();
	base.init();
	
	//var path = new Path.Circle(new Point(50,50),30);
	//path.fillColor = "#FF0000";
	window.view.draw();
	
	view.onFrame = function(event){
		ball.moveBall();
		ball.checkTouchBase(base);
		ball.touchWalls(500,1000);
		map.touchElement(ball);
	}
	/*function frame(event){
		ball.moveBall();
		ball.checkTouchBase(base);
		ball.touchWalls(500,1000);
		map.touchElement(ball);
		window.view.draw();	
	}*/
	
	tool.onMouseMove = function(event){
		base.move(event.point.x);
	}
}
