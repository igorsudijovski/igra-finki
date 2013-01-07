paper.install(window);
window.onload = function(){
	
	paper.setup('myCanvas');
	var draw = false;
	
	var background = new Path.Rectangle(new Rectangle(new Point(0,0),new Size(1000,1000)));
	background.fillColor = "#EEEEEE";
	var ply;
	var basex = 0;
	
	var ball = new Ball();
	var tool = new Tool();
	var base = new Base();
	base.init(500);
	jQuery("#accordion").accordion();
	jQuery("#dialog").dialog({
		autoOpen: true,
		height: 500,
		width: 900,
		modal: true,
		closeOnEscape: false,
		buttons:[{
			text: "Потврди",
			click: function(e){
				var predmeti1z = [];
				var zad = jQuery("#prva ul li");
				for(var i = 0; i < zad.length; i++){
					var ID = zad[i].firstChild.attributes[0].nodeValue;
					var name = zad[i].firstChild.innerHTML;
					var pre = new Predmet(ID.split(" ")[0], name, ID.split(" ")[1]);
					pre.otvoren = true;
					predmeti1z.push(pre);
				}
				var izb = jQuery("#prva input[type=checkbox]");
				var predmeti1i = [];
				for(var i = 0; i < izb.length; i++){
					if(izb[i].checked){
						var ID = izb[i].attributes[1].nodeValue;
						var name = izb[i].nextSibling.nodeValue;
						var pre = new Predmet(ID.split(" ")[0], name, ID.split(" ")[1]);
						pre.otvoren = true;
						predmeti1i.push(pre);
					}
				}
				var predmeti2z = [];
				var zad = jQuery("#vtora ul li");
				for(var i = 0; i < zad.length; i++){
					var ID = zad[i].firstChild.attributes[0].nodeValue;
					var name = zad[i].firstChild.innerHTML;
					var pre = new Predmet(ID.split(" ")[0], name, ID.split(" ")[1]);
					pre.otvoren = false;
					predmeti2z.push(pre);
				}
				var izb = jQuery("#vtora input[type=checkbox]");
				var predmeti2i = [];
				for(var i = 0; i < izb.length; i++){
					if(izb[i].checked){
						var ID = izb[i].attributes[1].nodeValue;
						var name = izb[i].nextSibling.nodeValue;
						var pre = new Predmet(ID.split(" ")[0], name, ID.split(" ")[1]);
						pre.otvoren = false;
						predmeti2i.push(pre);
					}
				}
				var predmeti3z = [];
				var zad = jQuery("#treta ul li");
				for(var i = 0; i < zad.length; i++){
					var ID = zad[i].firstChild.attributes[0].nodeValue;
					var name = zad[i].firstChild.innerHTML;
					var pre = new Predmet(ID.split(" ")[0], name, ID.split(" ")[1]);
					pre.otvoren = false;
					predmeti3z.push(pre);
				}
				var izb = jQuery("#treta input[type=checkbox]");
				var predmeti3i = [];
				for(var i = 0; i < izb.length; i++){
					if(izb[i].checked){
						var ID = izb[i].attributes[1].nodeValue;
						var name = izb[i].nextSibling.nodeValue;
						var pre = new Predmet(ID.split(" ")[0], name, ID.split(" ")[1]);
						pre.otvoren = false;
						predmeti3i.push(pre);
					}
				}
				var namePly = jQuery("#name").val();
				var ID = jQuery("#diplomskaKratenka").val();
				var name = jQuery("#diplomskateks").val()
				var diplomska = new Predmet(ID,name,8);
				ply = new Player();
				ply.init(predmeti1i, predmeti2i, predmeti3i, predmeti1z, predmeti2z, predmeti3z, diplomska, namePly, ball, base, 200,1000,"#EEEEEE");
				draw = true;
				jQuery(this).dialog("close");									
			}
		}],
		open: function(event, ui) {$(this).parent().children().children('.ui-dialog-titlebar-close').hide();},
		close: function() {
                allFields.val( "" ).removeClass( "ui-state-error" );
            },
	});
	jQuery("#dialog").dialog("open");
	
	//var path = new Path.Circle(new Point(50,50),30);
	//path.fillColor = "#FF0000";
	//window.paper.view.draw();
	
	window.paper.view.onFrame = function(event){
		if(draw){
			ply.ball.moveBall();
			ply.ball.checkTouchBase(base);
			ply.ball.touchWalls(500,1000);
			ply.map.touchElement(ply.ball,ply.base);
			ply.base.move(basex);
		}		
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
