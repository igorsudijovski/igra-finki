paper.install(window);
window.onload = function(){
	jQuery("#accordion").accordion();
	jQuery("#dialog").dialog({
		autoOpen: true,
		height: 500,
		width: 900,
		modal: true,
		closeOnEscape: false,
		open: function(event, ui) {$(this).parent().children().children('.ui-dialog-titlebar-close').hide();},
		close: function() {
                allFields.val( "" ).removeClass( "ui-state-error" );
            },
	});
	jQuery("#dialog").dialog("open");
	paper.setup('myCanvas');
	
	var background = new Path.Rectangle(new Rectangle(new Point(0,0),new Size(1000,1000)));
	background.fillColor = "#EEEEEE";
	var map = new Map(200,1000,"#EEEEEE");
	var ply = new Player();
	ply.init(map);
	var basex = 0;
	
	var ball = new Ball();
	ball.init(400,400);
	var tool = new Tool();
	var base = new Base();
	base.init(500);
	
	
	//var path = new Path.Circle(new Point(50,50),30);
	//path.fillColor = "#FF0000";
	window.paper.view.draw();
	
	window.paper.view.onFrame = function(event){
		ball.moveBall();
		ball.checkTouchBase(base);
		ball.touchWalls(500,1000);
		map.touchElement(ball,base);
		base.move(basex);
	}
	/*function frame(event){
		ball.moveBall();
		ball.checkTouchBase(base);
		ball.touchWalls(500,1000);
		map.touchElement(ball);
		window.view.draw();	
	}*/
	
	tool.onMouseMove = function(event){
		basex = event.point.x;
	}
}
