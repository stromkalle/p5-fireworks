function Rocket() {
	this.pos = createVector(random(width), height);
	this.vel = createVector(0, random(-17, -7));
	this.acc = createVector(0, 0);

	this.hasExploded = false;
	this.explosionParticles = [];
	this.explosionParticleColors = [
		{r:219, g:10, b:91},
		{r:210, g:82, b:127},
		{r:207, g:0, b:15},
		{r:102, g:51, b:153},
		{r:154, g:18, b:179},
		{r:34, g:167, b:240},
		{r:0, g:230,b:64},
		{r:46, g:204, b:113},
		{r:38, g:194, b:129},
		{r:31, g:58, b:147},
		{r:242, g:38, b:19},
		{r:240, g:52, b:52},
		{r:217, g:30, b:24},
		{r:255, g:255, b:255},
		{r:240, g:230,b:140},
		{r:218, g:165, b:32}
	];


	this.engineParticles = [];
	this.engineParticleColors = [
		{r: 255, g: 215, b: 0},
		{r: 255, g: 165, b: 0},
		{r: 255, g: 140, b: 0}
	];

	this.headSize = 10;
	this.rectSize = { w: 5, h: 10 };
	this.tailSize = this.headSize;

	this.explosionColor = this.explosionParticleColors[Math.round(random(0, this.explosionParticleColors.length - 1))];
	this.alpha = 150;

	this.drawHead = function() {
		fill(this.explosionColor.r, this.explosionColor.g, this.explosionColor.b, this.alpha);
		triangle(
			this.pos.x - this.headSize / 2,
			this.pos.y,

			this.pos.x,
			this.pos.y - (this.headSize * 0.75),

			this.pos.x + this.headSize / 2,
			this.pos.y
		);
	}

	this.drawBody = function() {
		fill(this.explosionColor.r, this.explosionColor.g, this.explosionColor.b, this.alpha);
		rect(
			this.pos.x - this.rectSize.w / 2,
			this.pos.y,
			this.rectSize.w,
			this.rectSize.h
		)
	}

	this.drawTail = function() {
		fill(this.explosionColor.r, this.explosionColor.g, this.explosionColor.b, this.alpha);
		var offset = 1.35;
		triangle(
			this.pos.x - this.headSize / 2,
			this.pos.y + (this.rectSize.h * offset),

			this.pos.x,
			this.pos.y - (this.headSize * 0.75) + (this.rectSize.h * offset),

			this.pos.x + this.headSize / 2,
			this.pos.y + (this.rectSize.h * offset) 
		);
	}

	this.addEngineSplutter = function() {
		this.engineParticles.push(new Particle(
			this.pos.x,
			this.pos.y + this.rectSize.h + this.headSize / 2,
			createVector(random(-3,3), 10),
			this.engineParticleColors[Math.round(random(0,this.engineParticleColors.length - 1))],
			2,
			10
		))
	}

	this.drawEngineSplutter = function() {
		for(var i = this.engineParticles.length - 1; i >= 0; i--) {
			this.engineParticles[i].show();
			this.engineParticles[i].update();

			if(this.engineParticles[i].done()) {
				this.engineParticles.splice(i, 1);
			}
		}
	}

	this.explode = function() {
		var heartShape = random(1) > 0.8;

		for (var i = 0; i < 80; i++) {

			if(heartShape && i < 60) {
				var x = 16 * pow(sin(i), 3);
				var y = 13 * cos(i) - 5 * cos(2 * i) - 2 * cos(3 * i) - cos(4 * i);	
				var vel = createVector(x, -y).mult(0.07)
			} else {
				var vel = p5.Vector.random2D().mult(random(1,10));
			}

			this.explosionParticles.push(new Particle(
				this.pos.x,
				this.pos.y,
				vel,
				this.explosionColor,
				2
			))
		}

		this.hasExploded = true;
	}

	this.drawExplosion = function() {
		for(var i = this.explosionParticles.length - 1; i >= 0; i--) {
			this.explosionParticles[i].show();
			this.explosionParticles[i].update();

			if(this.explosionParticles[i].done()) {
				this.explosionParticles.splice(i, 1);
			}
		}
	}

	this.applyForce = function(force) {
		this.acc.add(force);
	}

	this.update = function() {
		this.vel.add(this.acc);
		this.pos.add(this.vel);
		this.acc.mult(0);
		this.applyForce(gravity);

		if(this.vel.y >= 0 && !this.hasExploded) {
			this.explode();
		}
	}

	this.done = function() {
		return 
			this.hasExploded &&
			this.explosionParticles.length === 0 &&
			this.engineParticles.length === 0;

	}

	this.show = function() {
		if(!this.hasExploded) {
			
			strokeWeight(0);
			
			this.drawHead();
			this.drawTail();	
			this.drawBody();

			if(this.vel.y < -5) {
				this.addEngineSplutter();	
			}
		}

		this.drawEngineSplutter();

		if(this.hasExploded) {
			this.drawExplosion();
		}
	}
}