var mapEntiere = {}
var idMap = {}
var murs = []
var bloquageDirection = false
var pacmanDirection = "stop" //stop | haut | bas | gauche | droite
var nextPacmanDirection = "droite"
var imgPac = new Image();
imgPac.src = "assets/images/pacman.png";
var imgFan = new Image();
imgFan.src = "assets/images/fantome.png";
var pacmanCoords = {"x":200,"y":200}
var possibilite = {"gauche":false,"droite":false,"haut":false,"bas":false}
var animer
var tourBoucle = 0

function demarrer () { 
	creerButtonMap()
	document.getElementById('x200y200').classList.add('jaune')
	for(var i=0; i<441;i++) {
		document.getElementById(idMap[i]).addEventListener('mousedown', activerOver)
		document.getElementById(idMap[i]).addEventListener('mouseup', retirerOver)
		document.getElementById(idMap[i]).classList.add('noir')
	}
	document.getElementById('exporter').addEventListener('click', creationMap)
	window.addEventListener('keydown', pacmanMouvement)
	pacman()
}

function activerOver() {
	for(var i=0; i<441;i++) {
		document.getElementById(idMap[i]).addEventListener('mouseover', changerMap)
	}
	//on fait également la case cliqué
	if(this.value == 1) {
		this.value = 0
		this.classList.add("noir")
		var position = murs.indexOf(this.id)
		if(position != -1) {murs.splice(position, 1)}
	} else {
		this.value = 1
		this.classList.add("bleu")
		murs.push(`${this.id}`)
	}
	mapEntiere[this.id]["valeur"] = this.value
	apercu()
}

function retirerOver() {
	for(var i=0; i<441;i++) {
		document.getElementById(idMap[i]).removeEventListener('mouseover', changerMap)
	}
}

function creerButtonMap() {
	tourBoucle = 0
	for(var y=0;y<=20; y++){
		var y1  = y * 20
		for(var x=0;x<=20;x++) {
			var x1 = x * 20
			idMap[tourBoucle] = [`x${x1}y${y1}`]
			mapEntiere[`x${x1}y${y1}`] = ["valeur", "coords"]
			mapEntiere[`x${x1}y${y1}`]["valeur"] = 0
			mapEntiere[`x${x1}y${y1}`]["coords"] = {"x":x1,"y":y1}
			tourBoucle++
		}
	}
	console.log(idMap)
	for(var i=0; i<441;i++) {
		//Création de l'input
		var input = document.createElement('input')
		//Donne la valeur 0
		input.id = idMap[i];
		input.value = 0;
		input.className = 'buttonClass';
		input.type = 'button';
		//input.addEventListener('click', changerMap)
		//Récupération de la section ou l'on va mettre l'input
		var section = document.getElementById('buttonZone');
		//On place l'input dans la section
		section.appendChild(input);
	}
	//console.table(mapEntiere)
}


function changerMap() {
	if(this.value == 1) {
		this.value = 0
		this.classList.add("noir")
		var position = murs.indexOf(this.id)
		if(position != -1) {murs.splice(position, 1)}
	} else {
		this.value = 1
		murs.push(`${this.id}`)
		this.classList.add("bleu")
	}
	mapEntiere[this.id]["valeur"] = this.value
	console.log(murs)
	apercu()
}

function apercu() {
	//Dessin
	var canvas = document.getElementById('canvas')
	var ctx = canvas.getContext('2d')
	canvas.width = 420;
	canvas.height = 420;

	for(var y=0;y<=20; y++){
		var y1  = y * 20
		for(var x=0;x<=20;x++) {
			var x1 = x * 20
			if(mapEntiere[`x${x1}y${y1}`]["valeur"] == 1) {//Si c'est un murs
				with(ctx) {
				strokeStyle = "#201d79"
				fillStyle = "#201d79";
				lineWidth = 1;
				beginPath();
				rect(mapEntiere[`x${x1}y${y1}`]["coords"].x,mapEntiere[`x${x1}y${y1}`]["coords"].y,20,20);
				stroke();
				fill();
				}
			}
		}
	}
}

//Partie GamePlay

function pacmanMouvement(event) {
	toucheDown = event.keyCode
	var xValid = pacmanCoords.x%20
	var yValid = pacmanCoords.y%20
	//Evite d'être en x:136 et y:342
	if(xValid == 0 && yValid == 0) {
		bloquageDirection = false
		switch(toucheDown) {
			case 37:
	   			pacmanDirection = 'gauche'
	  		break;
	  		case 39:
	   			pacmanDirection = 'droite'
	  		break;
	  		case 38:
	   			pacmanDirection = 'haut'
	  		break;
	  		case 40:
	   			pacmanDirection = 'bas'
	  		break;
		} 
	} else {
		bloquageDirection = true
		switch(toucheDown) {
			case 37:
	   			nextPacmanDirection = 'gauche'
	  		break;
	  		case 39:
	   			nextPacmanDirection = 'droite'
	  		break;
	  		case 38:
	   			nextPacmanDirection = 'haut'
	  		break;
	  		case 40:
	   			nextPacmanDirection = 'bas'
	  		break;
		} 

		}
}

function collision(x,y) {

	if(murs.indexOf(`x${x1=x-20}y${y}`) != -1) {
		possibilite.gauche = true
		//console.log('mur à gauche')
		//if(pacmanDirection == 'gauche') {pacmanDirection = 'stop'}
	} else {possibilite.gauche = false}

	if(murs.indexOf(`x${x2=x+20}y${y}`) != -1) {
		possibilite.droite = true
		//console.log('mur à droite')
		//if(pacmanDirection == 'droite') {pacmanDirection = 'stop'}
	} else {possibilite.droite = false}

	if(murs.indexOf(`x${x}y${y1=y-20}`) != -1) {
		possibilite.haut = true
		//console.log('mur en haut')
		//if(pacmanDirection == 'haut') {pacmanDirection = 'stop'}
	} else {possibilite.haut = false}

	if(murs.indexOf(`x${x}y${y2=y+20}`) != -1) {
		possibilite.bas = true
		//console.log('mur en bas')
		//if(pacmanDirection == 'bas') {pacmanDirection = 'stop'}
	} else {possibilite.bas = false}
}

function pacman() {
	var canvas = document.getElementById('canvas')
	var ctx = canvas.getContext('2d')
	//Remise en blanc derrière le PacMan
	ctx.clearRect(pacmanCoords.x,pacmanCoords.y,20,20);
	//Verifcation des colisions
	collision(pacmanCoords.x,pacmanCoords.y)
	//Prend le chemin suivant
	var deplacement = nextPacmanDirection
	if(bloquageDirection == true/* && possibilite.deplacement == false*/) {
		var xValid = pacmanCoords.x%20
		var yValid = pacmanCoords.y%20
		if(xValid == 0 && yValid == 0) {
			if(possibilite.gauche == false && nextPacmanDirection == "gauche") {pacmanDirection = nextPacmanDirection}
			if(possibilite.droite == false && nextPacmanDirection == "droite") {pacmanDirection = nextPacmanDirection}
			if(possibilite.haut == false && nextPacmanDirection == "haut") {pacmanDirection = nextPacmanDirection}
			if(possibilite.bas == false && nextPacmanDirection == "bas") {pacmanDirection = nextPacmanDirection}
		
		}
	}
	switch(pacmanDirection) {
		case 'gauche':
			if(pacmanCoords.x > 0 && possibilite.gauche == false) {pacmanCoords.x--}
  		break;
  		case 'droite':
  			if(pacmanCoords.x+20 < canvas.width && possibilite.droite == false) {
  				pacmanCoords.x++
  			}
  		break;
  		case 'haut':
  			if(pacmanCoords.y > 0 && possibilite.haut == false) {
	  				pacmanCoords.y--
	  		}
  		break;
  		case 'bas':
  			if(pacmanCoords.y+20 < canvas.height && possibilite.bas == false) {
	  			pacmanCoords.y++
  			}
  		break;
	}
	//console.log(`x:${pacmanCoords.x} | y:${pacmanCoords.y}`)
	ctx.drawImage(imgPac,pacmanCoords.x,pacmanCoords.y,20,20);//x,y,width,height
animer = window.requestAnimationFrame(pacman);	


}



function creationMap() {

	exporterDansJson(mapEntiere)
}

function exporterDansJson(mapEntiere) {
	localStorage.setItem("maps/map1.json", JSON.stringify(mapEntiere));
}


window.addEventListener("load", demarrer); // attends le chargement complet pour démarrer
