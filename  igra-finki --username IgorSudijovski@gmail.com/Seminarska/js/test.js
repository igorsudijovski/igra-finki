paper.install(window);
window.onload = function(){
	paper.setup('myCanvas');
	var accordion = 0;
	var canvas = document.getElementById('myCanvas');
	var draw = false;
	var background = new Path.Rectangle(new Rectangle(new Point(0,0),new Size(canvas.width,canvas.height)));
	background.fillColor = "#EEEEEE";
	var ply;
	var basex = 0;	
	var ball = new Ball();
	var tool = new Tool();
	var base = new Base();
	jQuery("#reinit").click(function(){
		ply.reinit();
		draw = true;
	});
	base.init(canvas.height);
	jQuery("#accordion").accordion({event:"mouseclick"});
	jQuery("#dialog").dialog({
		autoOpen: true,
		height: 500,
		width: 900,
		modal: true,
		closeOnEscape: false,
		buttons:[{
			text: "Потврди",
			click: function(e){
				if(accordion == 3){
					var predmeti1z = [];
				var zad = jQuery("#prva ul li");
				for(var i = 0; i < zad.length; i++){
					var ID = zad[i].firstChild.getAttribute("title");
					var name = zad[i].firstChild.innerHTML;
					var pre = new Predmet(ID.split(" ")[0], name, parseInt(ID.split(" ")[1]));
					pre.otvoren = true;
					predmeti1z.push(pre);
				}
				var izb = jQuery("#prva input[type=checkbox]");
				var predmeti1i = [];
				for(var i = 0; i < izb.length; i++){
					if(izb[i].checked){
						var ID = izb[i].getAttribute("title");
						var name = izb[i].nextSibling.nodeValue;
						var pre = new Predmet(ID.split(" ")[0], name, parseInt(ID.split(" ")[1]));
						pre.otvoren = true;
						predmeti1i.push(pre);
					}
				}
				var predmeti2z = [];
				var zad = jQuery("#vtora ul li");
				for(var i = 0; i < zad.length; i++){
					var ID = zad[i].firstChild.getAttribute("title");
					var name = zad[i].firstChild.innerHTML;
					var pre = new Predmet(ID.split(" ")[0], name, parseInt(ID.split(" ")[1]));
					pre.otvoren = false;
					predmeti2z.push(pre);
				}
				var izb = jQuery("#vtora input[type=checkbox]");
				var predmeti2i = [];
				for(var i = 0; i < izb.length; i++){
					if(izb[i].checked){
						var ID = izb[i].getAttribute("title");
						var name = izb[i].nextSibling.nodeValue;
						var pre = new Predmet(ID.split(" ")[0], name, parseInt(ID.split(" ")[1]));
						pre.otvoren = false;
						predmeti2i.push(pre);
					}
				}
				var predmeti3z = [];
				var zad = jQuery("#treta ul li");
				for(var i = 0; i < zad.length; i++){
					var ID = zad[i].firstChild.getAttribute("title");
					var name = zad[i].firstChild.innerHTML;
					var pre = new Predmet(ID.split(" ")[0], name, parseInt(ID.split(" ")[1]));
					pre.otvoren = false;
					predmeti3z.push(pre);
				}
				var izb = jQuery("#treta input[type=checkbox]");
				var predmeti3i = [];
				for(var i = 0; i < izb.length; i++){
					if(izb[i].checked){
						var ID = izb[i].getAttribute("title");
						var name = izb[i].nextSibling.nodeValue;
						var pre = new Predmet(ID.split(" ")[0], name, parseInt(ID.split(" ")[1]));
						pre.otvoren = false;
						predmeti3i.push(pre);
					}
				}
				var namePly = jQuery("#name").val();
				var ID = jQuery("#diplomskaKratenka").val();
				var name = jQuery("#diplomskateks").val()
				var diplomska = new Predmet(ID,name,8);
				ply = new Player();
				ply.init(predmeti1i, predmeti2i, predmeti3i, predmeti1z, predmeti2z, predmeti3z, diplomska, namePly, ball, base, canvas.height,canvas.width,"#EEEEEE");
				draw = true;
				jQuery(this).dialog("close");													
				}else{
					if(accordion == 0){
						var sum = 0;
						var pred = jQuery("#prva input[type=checkbox]");
						for(var i = 0; i < pred.length; i++){
							if(pred[i].checked){
								sum++;
							}
						}
						if(sum == 6){
							jQuery("#accordion").accordion("activate",++accordion);
						}
					}else if(accordion == 1){
						var sum = 0;
						var pred = jQuery("#vtora input[type=checkbox]");
						for(var i = 0; i < pred.length; i++){
							if(pred[i].checked){
								sum++;
							}
						}
						if(sum == 6){
							jQuery("#accordion").accordion("activate",++accordion);
						}
					}else{
						var sum = 0;
						var pred = jQuery("#treta input[type=checkbox]");
						for(var i = 0; i < pred.length; i++){
							if(pred[i].checked){
								sum++;
							}
						}
						if(sum == 6){
							jQuery("#accordion").accordion("activate",++accordion);
						}
					}
									
				}
			}
		}],
		open: function(event, ui) {$(this).parent().children().children('.ui-dialog-titlebar-close').hide();},
		close: function() {
            },
	});
	jQuery("#dialog").dialog("open");
	
	//var path = new Path.Circle(new Point(50,50),30);
	//path.fillColor = "#FF0000";
	//window.paper.view.draw();
	
	window.paper.view.onFrame = function(event){
		if(draw){
			ply.ball.moveBall();
			ply.ball.checkTouchBase(ply.base);
			ply.ball.touchWalls(canvas.height,canvas.width);
			ply.map.touchElement(ply.ball,ply.base);
			ply.base.move(basex);
			ply.map.moveDiplomska();
			if(ply.gameOver()){
				draw = false;
			}
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
		if(draw){
		if(event.point.x - ply.base.base.width/2 <= 0){
			basex = ply.base.base.width/2;
		}else if(event.point.x + ply.base.base.width/2 >= canvas.width){
			basex = canvas.width - ply.base.base.width/2;
		}else{
			basex = event.point.x;
		}
		}	
	}
}
