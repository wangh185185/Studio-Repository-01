//Star shape reference, p5 examples
//galaxy flying stars reference, https://preview.p5js.org/AhmadMoussa/present/euZJvkj5i

//let planet;
let planetArray = [];
let planetArray2 = [];
let numPlanets = 6;


function setup() {
  createCanvas(windowWidth, windowHeight);

  for (i = 0; i < numPlanets; i++) {
    planetArray[i] = new Planets(
      random(20, 50),
      random(100, 250),
      random(0.005, 0.015)
    );
  }

  for (i = 0; i < numPlanets; i++) {
    planetArray2[i] = new Planets(
      random(20, 50),
      random(100, 250),
      random(0.005, 0.01)
    );
  }
  
  numDivs = 1000; //nebula density
  radius = 70;

  sizes = []
  speed = []
  radi = []
  for(a = 0; a<TWO_PI; a+=TWO_PI/numDivs){
    sizes.push(random(0.1,0))
    speed.push(random(2,30))
    radi.push(random())
  }
  
  FPS = 40;
  frameRate(FPS);
}

function draw() {
  clear();
  //background(255, 255, 255, 255);
  //background(0,0,20,100);
  strokeWeight(2);
  noStroke();
  
  push();
  translate(width/2, height/2);
  t = frameCount/FPS/3;
  for(n = 0; n<numDivs; n++){
    a = TWO_PI/numDivs * n + t/speed[n]

    
    r = radius + radi[n]*150
    x = (1.2*r)*sin(a);
    y = (0.5*r)*cos(a) + r*sin(a)/50;
    
    d = dist(0,0,x,y)

    
    strokeWeight(cos(d/20+t+a)*2+2+sizes[n]);
    stroke(100+100*sin(x/2+y/2),
          100+100*cos(x/2+y/2),
          150, 255)
    
    x = (2*r)*sin(d/10+a);
    y = (2*r)*cos(d/10+a) + r*sin(a)/500;
    
    point(x, y);
  }
  pop();
  
  //Myself-blurring feel
  push();
  translate(width/2, height/2);
  rotate(frameCount / 50.0);
  fill(255,255,255,100);
  star(0, 0, 30, 350, 200);
  pop();

  //Myself-Sun
  push();
  translate(width/2, height/2);
  rotate(frameCount / 50.0);
  fill(255);
  star(0, 0, 40, 65, 60);
  pop();
  
  //text ME
  push();
  fill(2);
  textAlign(CENTER);
  textSize(15);
  text('ME',width/2,height/2 + 5);
  pop();

  fill(200);
  //blinking stars
  var galaxy = { 
  locationX : random(width),
  locationY : random(height),
  size : random(2,7)
}
  ellipse(mouseX ,mouseY, galaxy.size, galaxy.size);
  ellipse(galaxy.locationX ,galaxy.locationY, galaxy.size, galaxy.size);

  for (i = 0; i < numPlanets; i++) {
    planetArray[i].planet();
    planetArray2[i].planet2();
    planetArray[i].moon();
  }
}

class Planets {
  constructor(radius, distance, orbitSpeed) {
    this.radius = radius;
    this.distance = distance;
    this.orbitSpeed = orbitSpeed;
    this.angle = 0;
    this.angle2 = 0;
  }

  //green
  planet() {
    resetMatrix();
    translate(width / 2, height / 2);
    rotate(this.angle);
    this.angle = this.angle + this.orbitSpeed;
    fill(88, 255, 177, 200);
    ellipse(this.distance, 0, this.radius / 1.5);
  }

  //red
  planet2() {
    resetMatrix();
    translate(width / 2, height / 2);
    rotate(this.angle);
    this.angle = this.angle + this.orbitSpeed;
    fill(255,50,200,200);
    ellipse(this.distance + 10, 0, this.radius / 1.5);
  }
  
  //yellow
  moon() {
    translate(this.distance, 0);
    rotate(this.angle2 * 2);
    this.angle2 = this.angle2 + this.orbitSpeed;
        fill(255, 255, 150, 170);
    ellipse(this.radius, 0, this.radius / 3);
  }
}

function star(x, y, radius1, radius2, npoints) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}
