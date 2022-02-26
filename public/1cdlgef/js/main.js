'use strict';

let sketch1 = function (p) {
  /* variables */
  const frameRate = 20;
  const numObj = 200;
  let width, height;
  let isActive = true;
  let objArray = new Array(numObj);

  const colSet = [
    "#59656F",
    "#ede7e3",
    "#e5989b",
    "#ece2d0"
  ]
  const opacity = 0.7;
  const colBg = "#fff9ec";

  const colArray = colSet.map((col) => {
    let c = p.color(col);
    let r = p.red(c);
    let g = p.green(c);
    let b = p.blue(c);
    let alpha = Math.floor(255 * opacity);;
    return p.color(r, g, b, alpha);
  })

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
    p.background(colBg);
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

  p.mouseClicked = () => {
    setPause();
  }

  p.windowResized = () => {
    // p.resizeCanvas(p.windowWidth, p.windowHeight);
    // width = p.width;
    // height = p.height;
  }

  class Flake {
    constructor() {
      this.x = p.random(0, width);
      this.y = height * p.random(-0.2, 0.1);
      this.diameter = p.random(2, 20);
      this.vx = 5;
      this.vy = 10;
      this.col = p.random(colArray);
    }

    update() {
      this.diameter += this.diameter * p.random(-0.12, 0.1);
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