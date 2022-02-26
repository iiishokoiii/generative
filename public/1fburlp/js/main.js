'use strict';

let sketch1 = function (p) {
  /* frame */
  const frameRate = 6;
  const frameLimit = 1000;
  /* general */
  const numChildren = 4;
  const maxLevel = 6;
  let width, height;
  let isActive = true;
  let obj;
  /* geomatry */
  const diameter = 130;
  /* color */
  const colBg = "#1b263b";
  const colSet = [
    "#e0e1dd",
    "#f7ede2",
    "#ffdccc",
    "#57759;0"
  ];
  const opacity = 1;
  const colArray = colSet.map((col) => {
    let c = p.color(col);
    let r = p.red(c);
    let g = p.green(c);
    let b = p.blue(c);
    let alpha = Math.floor(255 * opacity);;
    return p.color(r, g, b, alpha);
  });


  /* canvas setting */
  const initCanvas = () => {
    let cw = document.getElementById('canvas-wrapper').clientWidth;
    let ch = document.getElementById('canvas-wrapper').clientHeight;
    let canvas = p.createCanvas(cw * 1, ch * 1);
    canvas.parent('#canvas-wrapper');
    width = p.width;
    height = p.height;
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
    p.stroke(255, 100);
    obj = new Branch(1, 0, width * 0.5, height * 0.5);
    obj.display();
  }

  p.draw = () => {
    p.background(colBg);
    obj.update(obj.x, obj.y);
    obj.display();
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
    constructor(level, index, _x, _y) {
      this.level = level;
      this.index = index;
      this.children = [];
      this.x = _x;
      this.y = _y;
      this.x2 = this.x + (this.level * p.random(100) - 50);
      this.y2 = this.y + (this.level * p.random(50));
      // this.strokeW = (1/this.level) * 4;
      // this.alpha = 255/this.level;
      this.len = (1/p.sqrt(this.level)) * p.random(200);
      this.angle = p.random(360);
      this.lenChange = p.random(20) - 10;
      this.angleChange = p.random(10) - 5;
      this.col = p.random(colArray);

      if (level < maxLevel) {
        for (let i = 0; i < numChildren; i++) {
          this.children[i] = new Branch(this.level + 1, i, this.x2, this.y2);
        }
      }
    }

    update(_x, _y) {
      this.x = _x;
      this.y = _y;

      this.angle += this.angleChange;
      if (this.angle > 360) {
        this.angle = 0;
      } else if (this.angle < 0) {
        this.angle = 360;
      }

      this.len - + this.lenChange;
      if (this.len < 0 || this.len > 300) {
        this.lenChange *= -1;
      }

      let radAngle = p.radians(this.angle);
      this.x2 = this.x + (this.len * p.cos(radAngle));
      this.y2 = this.y + (this.len * p.sin(radAngle));

      for (let i = 0; i < this.children.length; i++) {
        this.children[i].update(this.x2, this.y2);
      }
    }

    display() {      
      // p.strokeWeight(this.strokeW);
      p.fill(this.col);
      p.line(this.x, this.y, this.x2, this.y2);
      p.ellipse(this.x, this.y, 5, 5);
      for (let i = 0; i < this.children.length; i++) {
        this.children[i].display();
      }
    }
  }
}

let sketch = new p5(sketch1);