'use strict';

let sketch1 = function (p) {
  /* variables */
  const T = 60;
  const frameRate = 20;
  let width, height;
  let isActive = true;

  let flakes = [];
  const colArray = [
    "#f6bd60",
    "#f7ede2",
    "#f5cac3",
    "#84a59d",
    "#f28482"
  ]
  const colBg = "#023047";

  /* canvas setting */
  const initCanvas = () => {
    let cw = document.getElementById('canvas-wrapper').clientWidth;
    let ch = document.getElementById('canvas-wrapper').clientHeight;
    let canvas = p.createCanvas(cw * 1, ch * 1);
    canvas.parent('#canvas-wrapper');
    width = p.width;
    height = p.height;
    p.background(colBg);
  }
  /* seting pause */
  const setPause = () => {
    if (isActive) {
      p.noLoop();
      isActive = false;
    } else {
      p.loop();
      isActive = true;
    }
  }

  p.setup = () => {
    initCanvas();
    p.frameRate(frameRate);
    p.noStroke();
  }

  p.draw = () => {
    p.background(colBg);
    const t = p.frameCount / T;
    for (let i = 0; i < p.random(30); i++) {
      flakes.push(new flake());
    }
    flakes.forEach((elm) => {
      elm.update(t);
      elm.display();
    })
  }

  p.mouseClicked = () => {
    setPause();
  }

  p.windowResized = () => {
    // p.resizeCanvas(p.windowWidth, p.windowHeight);
    // width = p.width;
    // height = p.height;
  }

  function flake() {
    // initialize coordinates
    this.posX = 0;
    this.posY = p.random(0, height);
    this.initAngle = p.random(0, 2 * p.PI);
    this.size = p.random(3, 6);
    //initialize flake
    this.lineR = p.random(1, 25);
    this.lineAngle = p.PI * p.random(-1, 1);
    // this.radius = p.sqrt(p.random(p.pow(width / 2, 2)));
    this.radius = p.sqrt(p.random(p.pow(width / 2, 2))) * (1 - (this.posY / height)) ** 2;
    this.color = p.random(colArray);

    this.update = (time) => {
      // x position follows a circle
      let w = 0.6; // angular speed
      let angle = w * time + this.initAngle;
      this.radius -= this.radius * p.random(0.01);
      this.posX = width / 2 + this.radius * p.sin(angle);
      this.lineAngle += p.PI * p.random(0.01)

      if (this.posY > height) {
        let index = flakes.indexOf(this);
        flakes.splice(index, 1);
      }
      this.posY += p.pow(this.size, 0.5);
    }

    this.display = () => {
      p.fill(this.color);
      p.ellipse(this.posX, this.posY, this.size);
      p.stroke(this.color);
      p.line(this.posX, this.posY, this.posX + this.lineR * p.cos(this.lineAngle), this.posY + this.lineR * p.sin(this.lineAngle))
    };
  };
}

let sketch = new p5(sketch1);