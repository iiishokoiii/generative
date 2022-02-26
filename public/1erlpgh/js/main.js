'use strict';

let sketch1 = function (p) {
  /* frame */
  const frameRate = 55;
  const bpm = 110;
  const frameT = frameRate / (bpm / 15);
  const frameLimit = frameRate * 5;
  /* general */
  let width, height;
  let isActive = true;
  let objArray = new Array();
  /* geomatry */
  const diameter = 130;
  /* color */
  const colSet = [
    "#e0e1dd",
    "#f7ede2",
    "#ffdccc",
    "#577590"
  ]
  const opacity = 0.3;
  const colBg = "#b08968";
  /* color */
  // const colSet = [
  //   "#e0e1dd",
  //   "#f7ede2",
  //   "#ffdccc",
  //   "#577590"
  // ]
  // const opacity = 0.3;
  // const colBg = "#1b263b";
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
    p.background(colBg);
  }

  p.draw = () => {
    if (p.frameCount % frameT === 0) {
      for (let i = 0; i < p.random(3, 8); i++) {
        objArray.push(new Wave())
      }
    }
    objArray.forEach((obj, idx) => {
      obj.update();
      obj.display();
    });
    if (p.frameCount >= frameLimit) {
      console.log('end');
      p.noLoop();
    }
  }

  p.mouseClicked = () => {
    setPause();
  }

  p.windowResized = () => {}

  class Wave {
    constructor() {
      this.rn = p.random(0, 0.1);
      this.r = diameter * p.random(0.7, 1.4);
      this.angle = p.random(0, p.PI);
      this.vangle = 0.01;
      this.angn = 0.01;
      this.originX = width * p.random(0.25, 0.75);
      this.originY = height * p.random(0.25, 0.75);
      this.col = p.random(colArray)
    }

    update() {
      this.rn += 0.02;
      this.angn += 0.01;
      this.r += this.r * this.rn;
      // this.angle += this.vangle * this.angn;
      this.angle += this.vangle * p.randomGaussian(0, 2);
    }

    display() {
      p.stroke(this.col);
      let x1 = this.originX + this.r * p.cos(this.angle);
      let y1 = this.originY + this.r * p.sin(this.angle);
      let x2 = this.originX - this.r * p.cos(this.angle);
      let y2 = this.originY - this.r * p.sin(this.angle);
      // p.fill(this.col);
      p.line(x1, y1, x2, y2);
    }
  }
}

let sketch = new p5(sketch1);