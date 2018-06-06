function Particle(x, y, vel, color, size, decay) {
	
	this.pos = createVector(x, y);
	this.acc = createVector(0, 0);
	this.vel = vel;
	this.color = color;
	this.lifespan = 255;
	this.size = size;
	this.decay = decay || 5;

	this.show = function() {
		strokeWeight(this.size);
		stroke(this.color.r, this.color.g, this.color.b, this.lifespan);
		point(this.pos.x, this.pos.y);
	}

	this.update = function() {
		this.vel.add(this.acc);
		this.pos.add(this.vel);
		this.acc.mult(0);
		this.lifespan -= this.decay;
	}

	this.done = function() {
		return this.lifespan <= 0;
	}

}