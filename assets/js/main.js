/////////////////////////////////////////
///// variables globales éventuelles/////
////////////////////////////////////////

const map = {
	0:{x1:100,y1:100,x2:100,y2:200},
	1:{x1:100,y1:200,x2:200,y2:200},
	2:{x1:200,y1:100,x2:200,y2:200},
	3:{x1:100,y1:100,x2:200,y2:100},
	4:{x1:200,y1:100,x2:200,y2:200},
	5:{x1:100,y1:100,x2:200,y2:100},
/*
	6:{x1:100,y1:100,x2:100,y2:200},
	7:{x1:100,y1:200,x2:200,y2:200},
	8:{x1:200,y1:100,x2:200,y2:200},
	9:{x1:100,y1:100,x2:200,y2:100},
	10:{x1:200,y1:100,x2:200,y2:200},
	11:{x1:100,y1:100,x2:200,y2:100},
	12:{x1:100,y1:100,x2:100,y2:200},
	13:{x1:100,y1:200,x2:200,y2:200},
	14:{x1:200,y1:100,x2:200,y2:200},
	15:{x1:100,y1:100,x2:200,y2:100},
	16:{x1:200,y1:100,x2:200,y2:200},
	17:{x1:100,y1:100,x2:200,y2:100},
	18:{x1:100,y1:100,x2:100,y2:200},
	19:{x1:100,y1:200,x2:200,y2:200},
	20:{x1:200,y1:100,x2:200,y2:200},
	21:{x1:100,y1:100,x2:200,y2:100},
	22:{x1:200,y1:100,x2:200,y2:200},
	23:{x1:100,y1:100,x2:200,y2:100},

	24:{x1:100,y1:100,x2:100,y2:200},
	25:{x1:100,y1:200,x2:200,y2:200},
	26:{x1:200,y1:100,x2:200,y2:200},
	27:{x1:100,y1:100,x2:200,y2:100},
	28:{x1:200,y1:100,x2:200,y2:200},
	29:{x1:100,y1:100,x2:200,y2:100},
	30:{x1:100,y1:100,x2:100,y2:200},
	31:{x1:100,y1:200,x2:200,y2:200},
	32:{x1:200,y1:100,x2:200,y2:200},
	33:{x1:100,y1:100,x2:200,y2:100},
	34:{x1:200,y1:100,x2:200,y2:200},
	35:{x1:100,y1:100,x2:200,y2:100},
	36:{x1:100,y1:100,x2:100,y2:200},
	37:{x1:100,y1:200,x2:200,y2:200},
	38:{x1:200,y1:100,x2:200,y2:200},
	39:{x1:100,y1:100,x2:200,y2:100},
	40:{x1:200,y1:100,x2:200,y2:200},
	41:{x1:100,y1:100,x2:200,y2:100}
	*/
}

/////////////////////////////////////////
///// abonnements//SSSSS/////////////////////
////////////////////////////////////////

function demarrer () { 
	dessinerMap()
}

////////////////////////////////////////
//////////////fonctions/////////////////
////////////////////////////////////////
function dessinerMap() {
	//Compte le nombre d'élément dans map (.length ne fonctionn pas ici) 
	var mapLength = 0
	for(var element in map) {
		mapLength += 1
	}
	//Fin comptage
	var canvas = document.getElementById('canvas')
	var ctx = canvas.getContext('2d')
	canvas.width = 700;
	canvas.height = 700;
		ctx.strokeStyle = "#201d79"
		ctx.lineWidth = 1;
		ctx.beginPath();
		console.table(map)
		console.log(mapLength)
		for(var i=0;i<4;i++) {
			ctx.moveTo(map[i]['x1'],map[i]['y1']); 
			ctx.lineTo(map[i]['x2'],map[i]['y2']);
		}
		ctx.stroke();

}

////////////////////////////////////////
//////////////CORPS/////////////////////
////////////////////////////////////////
window.addEventListener("load", demarrer); // attends le chargement complet pour démarrer