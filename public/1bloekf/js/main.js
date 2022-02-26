'use strict';

let sketch1 = function (p) {
  /* variables */
  const T = 40;
  const frameRate = 20;
  const numObj = 200;
  let width, height;
  let isActive = true;
  let objArray = new Array(numObj);

  // const colArray = [
  //   "#f6bd60",
  //   "#f7ede2",
  //   "#ffdccc"
  // ]
  // const colBg = "16697a";

  const colArray = [
    "#82c0cc",
    "#ede7e3",
    "#ffa62b",
    "#ece2d0"
  ]
  const colBg = "#084c61";

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
    p.smooth();
    p.noStroke();
    p.background(50, 89, 100);
    for (let i = 0; i < numObj; i++) {
      objArray[i] = new Flake();
    }

  }

  p.draw = () => {
    objArray.forEach((obj, idx) => {
      obj.update();
      obj.display();
    });
    objArray.forEach((obj, idx) => {
      if (obj.diameter < 1) {
        objArray.splice(idx, 1);
      }
    });
    if (objArray.length === 0) {
      console.log('end')
      p.noLoop();
    }
  }

  p.mousePressed = () => {
    setPause();
  }

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
    width = p.width;
    height = p.height;
  }

  // Jitter class
  class Flake {
    constructor() {
      // this.x = p.sqrt(p.random(p.pow(width / 2, 2)));
      this.x = p.randomGaussian(width / 2, 4)
      this.y = height * p.random(-0.2, 0.3);
      this.diameter = p.random(2, 20);
      this.vx = width * 0.03;
      this.vy = height * 0.02;
      this.col = p.random(colArray);
    }

    update() {
      this.diameter += this.diameter * p.random(-0.15, 0.1);
      this.x += this.vx * p.random(-1, 1);
      this.y += this.vy * p.random(-0.2, 1);
    }

    display() {
      p.fill(this.col);
      p.ellipse(this.x, this.y, this.diameter, this.diameter);
    }
  }

}

let sketch = new p5(sketch1);