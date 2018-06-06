let gravity;
let rockets = [];

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(0, 75);
	gravity = createVector(0, 0.2);
}

function draw() {
	
	const rand = random(1);
	background(0, 75);
	if(rand > 0.95) {
		rockets.push(new Rocket());
	}

	for (var i = rockets.length - 1; i >= 0; i--) {
		rockets[i].show();
		rockets[i].update();

		if(rockets[i].done()) {
			rockets.splice(i, 1);
		}		
	}
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
	background(0, 50);
}