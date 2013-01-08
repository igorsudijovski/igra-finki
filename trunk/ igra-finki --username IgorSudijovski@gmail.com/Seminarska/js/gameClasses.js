function Player(){
	this.name = "";
	this.predmeti1i = [];
	this.predmeti2i = [];
	this.predmeti3i = [];
	this.predmeti1z = [];
	this.predmeti2z = [];
	this.predmeti3z = [];
	this.diplomska;
	this.base;
	this.ball;
	this.map;
	this.godina = 0;
	this.sesija;
	this.sesii = ["Januarska,Junska,Septemvrsika"];
	this.h;
	this.w;
	this.gameoverBack;
	this.gameoverText;
	this.reinit = function(){
		this.gameoverBack.remove();
		this.gameoverText.remove();
		this.setMap();
		this.base.init(this.h);
		this.ball.init(350,350);
	}
	this.init = function(predmeti1i,predmeti2i,predmeti3i,predmeti1z,predmeti2z,predmeti3z,diplomska,name,ball,base,h,w,background){
		this.h = h;
		this.w = w;
		this.map = new Map(h/3,w,background);
		this.predmeti1i = predmeti1i;
		this.predmeti2i = predmeti2i;
		this.predmeti3i = predmeti3i;
		this.predmeti1z = predmeti1z;
		this.predmeti2z = predmeti2z;
		this.predmeti3z = predmeti3z;
		this.diplomska = diplomska;
		this.name = name;
		this.base = base;
		this.ball = ball;
		this.setMap();
		this.ball.init(350,350);	
		/*var test = [];
		for(var i = 0; i <31; i++ ){
			var p = new Predmet("111","ime",5);
			p.otvoren = true;
			test.push(p);
		}
		//var map = new Map(200,1000,"#EEEEEE");
		map.init(test);*/
	}
	this.setMap = function(initial){
		var predmeti = [];
		if(this.predmeti1z[0].polozen && this.predmeti1z[1].polozen){
			this.predmeti2z[0].otvoren = true;
			this.predmeti2z[1].otvoren = true;
			this.predmeti2i[0].otvoren = true;
			this.predmeti2i[1].otvoren = true;
			this.predmeti2i[2].otvoren = true;
		}
		if(this.predmeti1z[2].polozen && this.predmeti1z[3].polozen){
			this.predmeti2z[2].otvoren = true;
			this.predmeti2z[3].otvoren = true;
			this.predmeti2i[3].otvoren = true;
			this.predmeti2i[4].otvoren = true;
			this.predmeti2i[5].otvoren = true;
		}
		if(this.predmeti2z[0].polozen && this.predmeti2z[1].polozen){
			this.predmeti3z[0].otvoren = true;
			this.predmeti3z[1].otvoren = true;
			this.predmeti3i[0].otvoren = true;
			this.predmeti3i[1].otvoren = true;
			this.predmeti3i[2].otvoren = true;
		}
		if(this.predmeti2z[2].polozen && this.predmeti2z[3].polozen){
			this.predmeti3z[2].otvoren = true;
			this.predmeti3z[3].otvoren = true;
			this.predmeti3i[3].otvoren = true;
			this.predmeti3i[4].otvoren = true;
			this.predmeti3i[5].otvoren = true;
		}
		var flag = true;
		predmeti.push(this.diplomska);
		for(var i = 0; i < this.predmeti3z.length; i++){
			predmeti.push(this.predmeti3z[i]);
		}
		for(var i = 0; i < this.predmeti3i.length; i++){
			predmeti.push(this.predmeti3i[i]);
		}
		for(var i = 0; i < this.predmeti2z.length; i++){
			predmeti.push(this.predmeti2z[i]);
		}
		for(var i = 0; i < this.predmeti2i.length; i++){
			predmeti.push(this.predmeti2i[i]);
		}
		for(var i = 0; i < this.predmeti1z.length; i++){
			predmeti.push(this.predmeti1z[i]);
		}
		for(var i = 0; i < this.predmeti1i.length; i++){
			predmeti.push(this.predmeti1i[i]);
		}
		for(var i = 1; i < predmeti.length; i++){
			if(predmeti[i].polozen == false){
				flag = false;
				break;
			}
		}
		this.diplomska.otvoren = flag;
		predmeti[0].otvoren = flag;
			this.map.init(predmeti);	
	}
	this.gameOver = function(){
		if(this.ball.ball.position.y + this.ball.dy >= this.base.base.bounds.y){
			this.gameoverBack = new Path.Rectangle(new Rectangle(new Point(0,0),new Size(1000,1000)));
			this.gameoverBack.fillColor = "#EEEEEE";
			this.gameoverText = new PointText(new Point(10,300));
			this.gameoverText.fillColor = 'black';
			this.gameoverText.paragraphStyle.justification = 'left';
			this.gameoverText.characterStyle.fontSize = 20;
			this.gameoverText.content = "Сесијата заврши!";
			this.ball.ball.remove();
			this.base.base.remove();
			for(var i = 0; i < this.map.ocena.length; i++){
				this.map.ocena[i].remove();
			}
			this.diplomska = this.map.predmeti[0];
			for(var i = 1; i <5; i++){
				this.predmeti3z[i-1] = this.map.predmeti[i];
				if(this.map.predmeti[i].krediti == 0 && !this.map.predmeti[i].otvoren && !this.map.predmeti[i].polozen){
					this.predmeti3z[i-1].krediti = this.predmeti3z[i-1].fiksnikrediti;
					this.predmeti3z[i-1].otvoren = true;
				}
			}
			for(var i = 5; i < 11; i++){
				this.predmeti3i[i-5] = this.map.predmeti[i];
				if(this.map.predmeti[i].krediti == 0 && !this.map.predmeti[i].otvoren && !this.map.predmeti[i].polozen){
					this.predmeti3i[i-5].krediti = this.predmeti3i[i-5].fiksnikrediti;
					this.predmeti3i[i-5].otvoren = true;
				}
			}
			for(var i = 11; i < 15; i++){
				this.predmeti2z[i-11] = this.map.predmeti[i];
				if(this.map.predmeti[i].krediti == 0 && !this.map.predmeti[i].otvoren && !this.map.predmeti[i].polozen){
					this.predmeti2z[i-11].krediti = this.predmeti2z[i-11].fiksnikrediti;
					this.predmeti2z[i-11].otvoren = true;
				}
			}
			for(var i = 15; i < 21; i++){
				this.predmeti2i[i-15] = this.map.predmeti[i];
				if(this.map.predmeti[i].krediti == 0 && !this.map.predmeti[i].otvoren && !this.map.predmeti[i].polozen){
					this.predmeti2i[i-15].krediti = this.predmeti2i[i-15].fiksnikrediti;
					this.predmeti2i[i-15].otvoren = true;
				}
			}
			for(var i = 21; i < 25; i++){
				this.predmeti1z[i-21] = this.map.predmeti[i];
				if(this.map.predmeti[i].krediti == 0 && !this.map.predmeti[i].otvoren && !this.map.predmeti[i].polozen){
					this.predmeti1z[i-21].krediti = this.predmeti1z[i-21].fiksnikrediti;
					this.predmeti1z[i-21].otvoren = true;
				}
			}
			for(var i = 25; i < 31; i++){
				this.predmeti1i[i-25] = this.map.predmeti[i];
				if(this.map.predmeti[i].krediti == 0 && !this.map.predmeti[i].otvoren && !this.map.predmeti[i].polozen){
					this.predmeti1i[i-25].krediti = this.predmeti1i[i-25].fiksnikrediti;
					this.predmeti1i[i-25].otvoren = true;
				}
			}
			this.map.removeAllelements();
			return true;
		}
		return false;
	}
}
function Map(h,w,b){
	this.map = [[0,0],[1,1],[1,3],[1,7],[1,9],[2,0],[2,2],[2,4],[2,6],[2,8],[2,10],[3,1],[3,3],[3,7],[3,9],[4,0],[4,2],[4,4],[4,6],[4,8],[4,10],[5,1],[5,3],[5,7],[5,9],[6,0],[6,2],[6,4],[6,6],[6,8],[6,10]];
	this.space = (h/8)/6;
	this.w = w/11;
	this.h = h/8;
	this.background = b;
	this.colorotvoreni = "#FF0000";
	this.colorzatvoreni = "#111111";
	this.groupitems = new Group();
	this.grouptext = new Group();
	this.predmeti = [];
	this.ocena = [];
	this.dx = 2;
	this.removeAllelements = function(){
		this.predmeti = null;
		this.predmeti = [];
		this.ocena = null;
		this.ocena = [];
		this.groupitems.removeChildren();
		this.grouptext.removeChildren();
	}
	this.poloziPredmet = function(i,ocena){
		this.groupitems.children[i].fillColor = this.background;
		this.grouptext.children[i].content = "";
		this.predmeti[i].polozen = true;
		this.predmeti[i].ocena = ocena;
	}
	this.padnaPredmet = function(i){
		this.groupitems.children[i].fillColor = this.colorzatvoreni;
		this.grouptext.children[i].content = "";
		this.predmeti[i].otvoren = false;	
	}
	this.init = function(predmeti){
		for(var i = 0; i < predmeti.length; i++){
			this.predmeti.push(predmeti[i]);
			var path = new Path.Rectangle(new Rectangle(new Point(this.map[i][1]*this.w,this.map[i][0] * (this.h + this.space)),new Size(this.w,this.h)));
			var text = new PointText(new Point(path.position.x,path.position.y + 5));
			text.fillColor = 'black';
			text.paragraphStyle.justification = 'center';
			text.characterStyle.fontSize = 12;
			if(predmeti[i].polozen){
				path.fillColor = this.background;
				this.groupitems.addChild(path);
				this.grouptext.addChild(text);
			}else if(predmeti[i].otvoren){
				path.fillColor = this.colorotvoreni;
				text.content = predmeti[i].ID + " - " + predmeti[i].krediti;
				this.groupitems.addChild(path);
				this.grouptext.addChild(text);
			}else{
				path.fillColor = this.colorzatvoreni;
				//text.content = predmeti[i].ID + " - " + predmeti[i].krediti;
				this.groupitems.addChild(path);
				this.grouptext.addChild(text);
			}
		}												
	}
	this.moveDiplomska = function(){
		if(this.groupitems.children[0].bounds.x + this.dx <= 0){
			this.dx *= -1;
		}
		if((this.groupitems.children[0].bounds.x + this.groupitems.children[0].bounds.width + this.dx) >= (this.w * 11)){
			this.dx *= -1;
		}
		this.groupitems.children[0].position.x += this.dx;
	}
	this.touchElement = function(ball,baseImg){
		var y = ball.ball.position.y;
		var x = ball.ball.position.x;
		var dx = ball.dx;
		var dy = ball.dy;
		var r = ball.ball.bounds.width/2;
		var by = baseImg.base.bounds.y;
		var bx = baseImg.base.bounds.x;
		var bw = baseImg.base.width;
		for(var i = 0; i < this.ocena.length; i++){
			if(this.ocena[i].move()){
				this.ocena.splice(i,1);
				i--;
			}else
			if(this.ocena[i].text.position.y >=by && this.ocena[i].text.position.x >= bx && this.ocena[i].text.position.x <= (bx + bw)){
				if(this.ocena[i].ocena != 5){
					this.poloziPredmet(this.ocena[i].index,this.ocena[i].ocena);
				}else{
					this.padnaPredmet(this.ocena[i].index);
				}
				this.ocena[i].remove();
				this.ocena.splice(i,1);
				i--;
			}	
		}
		for(var i = 0; i < this.groupitems.children.length; i++){
			var gx = this.groupitems.children[i].bounds.x;
			var gy = this.groupitems.children[i].bounds.y;
			var h = this.groupitems.children[i].bounds.height;
			var w = this.groupitems.children[i].bounds.width
			if(!this.predmeti[i].polozen){
				if((distance(x,y,gx,gy) <= r && dx > 0 && dy > 0) || (distance(x,y,gx + w,gy) <= r && dx < 0 && dy > 0) || (distance(x,y,gx,gy + h) <= r && dx > 0 && dy < 0) || (distance(x,y,gx + w,gy + h) <= r && dx < 0 && dy < 0)){
					if(this.predmeti[i].otvoren){
						var drop = this.grouptext.children[i].content.split(" - ");
						if(drop[1] == 0){
							this.predmeti[i].krediti = parseInt(drop[1]);
							var ocena = new Oceni();
							ocena.init(i,gx + w/2,gy + h, this.h * 8 * 0.98 * 3 + 4);
							this.ocena.push(ocena);																					
						}else{
							drop[1]--;
						}
							this.grouptext.children[i].content = drop[0] + " - " + drop[1];
							this.predmeti[i].krediti = parseInt(drop[1]);
						}
							ball.touchLeftOrRightWall();
							ball.touchBottomOrTopWall();
							break;	
					
				}else {
				if(((y + r + dy) >= gy) && ((y - r + dy) <= (gy + h))){
					if(x >= gx && x <= (gx + w)){
						if(this.predmeti[i].otvoren){
						var drop = this.grouptext.children[i].content.split(" - ");
						if(drop[1] == 0){
							this.predmeti[i].krediti = parseInt(drop[1]);
							var ocena = new Oceni();
							ocena.init(i,gx + w/2,gy + h, this.h * 8 * 0.98 * 3 + 4);
							this.ocena.push(ocena);							
						}else{
							drop[1]--;
						}
							this.grouptext.children[i].content = drop[0] + " - " + drop[1];
							this.predmeti[i].krediti = parseInt(drop[1]);
						}
							ball.touchBottomOrTopWall();							
							break;							
					}
				} 
				if (((x + r + dx) >= gx) && ((x - r + dx) <= (gx + w))){
					if(y >= gy && y <= (gy + h)){
						if(this.predmeti[i].otvoren){
						var drop = this.grouptext.children[i].content.split(" - ");
						if(drop[1] == 0){
							this.predmeti[i].krediti = parseInt(drop[1]);
							var ocena = new Oceni();
							ocena.init(i,gx + w/2,gy + h, this.h * 8 * 0.98 * 3 + 4);
							this.ocena.push(ocena);								
						}else{
							drop[1]--;
						}
							this.grouptext.children[i].content = drop[0] + " - " + drop[1];
							this.predmeti[i].krediti = parseInt(drop[1]);
						}
							ball.touchLeftOrRightWall();
							break;							
					}
				}
				}				
			}
		}				
	}
}
function Predmet(ID,name,krediti){
	this.ID = ID;
	this.name = name;
	this.polozen = false;
	this.ocena = 5;
	this.krediti = krediti;
	this.otvoren = false;
	this.fiksnikrediti = krediti;
}
function Ball(){
	this.ball;
	this.dx = 1;
	this.dy = 1;
	this.speed = 4;
	this.basicspeed = Math.sqrt(2);
	this.init = function(corX,corY){
		this.ball = new Path.Circle(new Point(corX,corY),15);
		this.ball.fillColor = "#0000DD";						
	}
	this.moveBall = function(){
		this.ball.position.x += this.dx;
		this.ball.position.y += this.dy;
	}
	this.checkTouchBase = function(baseImg){
		var base = baseImg.base;
		if((this.ball.position.y + this.ball.bounds.height/2 + this.dy) < base.bounds.y) return false;
		
		if((this.ball.position.x >= base.bounds.x) && (this.ball.position.x < (base.bounds.x + base.bounds.width))){
			if(this.ball.position.x >= (base.bounds.x + base.bounds.width/2) && (this.ball.position.x <= (base.bounds.x + base.bounds.width/2))){
				this.touchBase(1,true);
			}else if(this.ball.position.x < (base.bounds.x + base.bounds.width/2)){
				var cory = (2 * (this.ball.position.x - base.bounds.x))/(base.bounds.width);
				if(cory < 0.2) cory = 0.2;
				this.touchBase(cory,true);
			}else{
				var cory = (2 * ((base.bounds.width + base.bounds.x) - this.ball.position.x))/base.bounds.width;
				if(cory < 0.2) cory = 0.2;
				this.touchBase(cory,false);
			}
		}
		var r = this.ball.bounds.width / 2;
		if(distance(this.ball.position.x, this.ball.position.y,base.bounds.x,base.bounds.y) <= r && this.dy > 0 && this.dx > 0){
			this.dx*=-1;
			this.dy*=-1;
		}
		if(distance(this.ball.position.x, this.ball.position.y,(base.bounds.x + base.bounds.width),base.bounds.y) <= r && this.dy > 0 && this.dx < 0){
			this.dx*=-1;
			this.dy*=-1;
		}
	}
	this.touchBase = function(y,left){
		var newspeed = this.basicspeed * this.speed;
		this.dy = y * newspeed;
		this.dx = Math.sqrt((newspeed * newspeed) - (this.dy * this.dy));
		if(this.dy >= newspeed) this.dx = 0;
		this.dy *=-1;
		if(left){
			this.dx *=-1;
		}
	}
	this.touchWalls = function(h,w){
		var x = this.ball.position.x;
		var r = this.ball.bounds.width / 2;
		var y = this.ball.position.y;
		if((x + r + this.dx>= w) || (x - r + this.dx <= 0)){
			this.dx *= - 1;
		}
		if((y + r + this.dy >= h) || (y - r + this.dy <= 0)){
			this.dy*=-1;
		}
	}
	this.touchBottomOrTopWall = function(){
		this.dy *= -1;
	}
	this.touchLeftOrRightWall = function(){
		this.dx *=-1;
	}
}
function Base(){
	this.base;
	this.init = function(h){
		this.base = new Raster('logo');
		this.base.position.y = h * 0.95;
	}
	this.move = function(corx){
		this.base.position.x = corx;
	}
}
function distance(x1,y1,x2,y2){
	return Math.sqrt(((x1-x2)*(x1-x2)) + ((y1-y2)*(y1-y2)))
}
function randomOcena(){
	var randomnumber = Math.floor(Math.random()*11);
	if(randomnumber < 5) return 5;
	else if(randomnumber < 6) return 6;
	else if(randomnumber < 7) return 7;
	else if(randomnumber < 8) return 8;
	else if(randomnumber < 9) return 9;
	else return 10;
}
function Oceni(){
	this.index;
	this.ocena;
	this.text;
	this.limit
	this.init = function(index,x,y,l){
		this.limit = l;
		this.index = index;
		this.ocena = randomOcena();
		this.text = new PointText(new Point(x + 5,y+ 5));
		this.text.fillColor = 'black';
		this.text.paragraphStyle.justification = 'center';
		this.text.characterStyle.fontSize = 15;
		this.text.content = this.ocena;
	}
	this.move = function(){
		this.text.position.y = this.text.position.y + 2;
		if(this.text.position.y >= 408 && this.text.position.y <= 412){
			var a = this.text.position.x;
		}
		if(this.text.position.y >= this.limit){
			this.text.remove();
			return true;
		}
		return false;
	}
	this.remove = function(){
		this.text.remove();
	}
}
