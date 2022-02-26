'use strict';

let sketch1 = function (p) {
  /* frame */
  const frameRate = 10;
  const frameLimit = 100;
  /* general */
  const numChildren = 6;
  const maxLevel = 3;
  let width, height;
  let isActive = true;
  let obj;
  /* geomatry */
  const diameter = 130;
  /* color */
  const colBg = "#1b263b";


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
    p.stroke("fff");
    obj = new Branch(1, 0, width * 0.5, width * 0.5);
    obj.display();
  }

  p.draw = () => {
    p.background(colBg);
    // objArray.forEach((obj, idx) => {
      obj.update(obj.x, obj.y);
      obj.display();
    // });
    if (p.frameCount >= frameLimit) {
      console.log('end');
      p.noLoop();
    }
  }

  p.mouseClicked = () => {
    setPause();
  }

  p.windowResized = () => {}

  class Branch {
    constructor(level, index, x, y) {
      this.level = level;
      this.index = index;
      this.children = [];
      this.x = x;
      this.y = y;
      this.r = p.random(60, 100);
      this.ang = p.PI * p.random(-1, 1);

      let x2 = this.x + this.r * p.cos(this.ang);
      let y2 = this.y + this.r * p.sin(this.ang);
      
      if (level < maxLevel) {
        for (let i = 0; i < numChildren; i++) {
          this.children[i] = new Branch(this.level + 1, i, x2, y2);
        }
      }
    }

    update(_x, _y) {
      this.x = _x;
      this.y = _y;
      this.r += p.random(-5, 10);
      this.ang += p.PI *  p.random(-0.1, 0.1);
      let x2 = this.x + this.r * p.cos(this.ang);
      let y2 = this.y + this.r * p.sin(this.ang);
      for (let i = 0; i < this.children.length; i++) {
        this.children[i].update(x2, y2);
      }
    }

    display() {
      let x2 = this.x + this.r * p.cos(this.ang);
      let y2 = this.y + this.r * p.sin(this.ang);
      p.line(this.x, this.y, x2, y2);
      p.ellipse(this.x, this.y, 5, 5);
      for (let i = 0; i < this.children.length; i++) {
        this.children[i].display();
      }
    }
  }
}

let sketch = new p5(sketch1);