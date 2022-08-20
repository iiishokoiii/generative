let sketch1 = (p) => {
  //set canvas size parameter
  let cw = document.getElementById('canvas-wrapper').clientWidth;
  let ch = document.getElementById('canvas-wrapper').clientHeight;
  let npx = (cw >= ch) ? ch : cw;
  //set drawing parameter;
  const T = 100;
  const numPoints = 2000;
  let param = {};
  let btn = [];
  //set function for normalizing size
  const norm = (num) => {
    return num * npx;
  }
  //set basic functions for drawing
  const x1 = (t, xoff, diameter1) => {
    return xoff + diameter1 * Math.cos(p.TWO_PI * t);
  }
  const y1 = (t, yoff, diameter1) => {
    return yoff + diameter1 * Math.sin(p.TWO_PI * t);
  }
  const x2 = (t, xoff, diameter2) => {
    return xoff + diameter2 * Math.cos(4 * p.TWO_PI * t);
  }
  const y2 = (t, yoff, diameter2) => {
    return yoff + diameter2 * Math.sin(4 * p.TWO_PI * t);
  }
  //create button
  const renderEle = () => {
    let wrapper = p.createDiv('');
    wrapper.addClass('btn-wrapper');
    for (let i = 1; i <= 3; i++) {
      btn[i] = p.createButton('test' + i);
      btn[i].id = ('btn' + i);
      wrapper.child(btn[i]);
    }
    btn[1].class('isSelected');
  }
  const clearBtnClass = () => {
    for (let i = 1; i <= 3; i++) {
      btn[i].class('');
    }
  }
  //switch paramter-dataset
  const addEvent = () => {
    for (let i = 1; i <= 3; i++) {
      btn[i].mousePressed(() => {
        clearBtnClass();
        btn[i].class('isSelected');
        p.background(0);
        param = paramData[i];
      })
    }
  }
  //initialize
  p.setup = () => {
    p.createCanvas(cw, ch);
    p.background(0);
    p.strokeWeight(2);
    p.frameRate(40);
    renderEle();
    addEvent();
    param = paramData[1];
  }
  //draw & display
  p.draw = () => {
    p.translate(p.width / 2, p.height / 2);
    let t = 1.0 * (p.frameCount - 1) / T;
    if (p.frameCount % T === 0) {
      p.background(0);
    }
    //draw
    for (let i = 0; i < numPoints; i++) {
      let tt = 1.0 * i / numPoints;
      let x = p.lerp(x1(t - param.delay1 * tt, param.xoff1, param.diameter1), x2(t - param.delay1 * (1 - tt), param.xoff2, param.diameter2), tt);
      let y = p.lerp(y1(t - param.delay1 * tt, param.yoff1, param.diameter1), y2(t - param.delay1 * (1 - tt), param.yoff2, param.diameter2), tt);
      p.stroke(100 * Math.cos(1.5 * p.TWO_PI * tt) + 155, 240, 160, 40);
      p.point(x, y);
    }
    //pause drawing when window is hidden
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        p.noLoop();
      } else {
        p.loop();
      }
    })
  }
  //parameter-dataset
  const paramData = [
    null,
    {
      xoff1: 0,
      xoff2: 0,
      yoff1: 0,
      yoff2: 0,
      delay1: 1.0,
      diameter1: norm(0.4),
      diameter2: norm(0.4)
    },
    {
      xoff1: norm(0.7),
      xoff2: norm(-0.7),
      yoff1: 0,
      yoff2: 0,
      delay1: 3.0,
      diameter1: norm(0.4),
      diameter2: norm(0.4)
    },
    {
      xoff1: norm(0.7),
      xoff2: norm(-0.7),
      yoff1: norm(-0.2),
      yoff2: norm(0.2),
      delay1: 1.0,
      diameter1: norm(0.4),
      diameter2: norm(0.4)
    }
  ];
}

document.addEventListener('DOMContentLoaded', () => {
  let sketch = new p5(sketch1, 'canvas-wrapper');
})
