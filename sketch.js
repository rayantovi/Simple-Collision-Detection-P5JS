/* WARNING: THIS CODE MIGHT ENCOURAGE SUICIDAL THOUGHTS */
let dir = 0;
let width = window.innerWidth;
let height = window.innerHeight;
let centx = width / 2;
let centy = height / 2;
let bgc = 12;
let ls = centx / 2;
let rs = centx * 1.5;
let rect1, rect2, circ1, circ2;
let testX, testY, distance;
class Shape {
  constructor(x = centx, y = centy, w = 100, h = 100, c = color(255)) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.c = c;
  }
  rect() {
    noStroke();
    fill(this.c);
    rect(this.x, this.y, this.w, this.h);
  }
  ellipse() {
    noStroke();
    fill(this.c);
    ellipse(this.x, this.y, this.w, this.h);
  }
  shake() {
    this.x += random(1, -1);
    this.y += random(1, -1);
  }
  set pos(arr) {
    this.x = arr[0];
    this.y = arr[1];
  }
  static checkRectCollision(a, b) {
    if (
      a.x + a.w / 2 >= b.x - b.w / 2 &&
      a.x - a.w / 2 <= b.x + b.w / 2 &&
      a.y + a.h / 2 >= b.y - b.h / 2 &&
      a.y - a.h / 2 <= b.y + b.h / 2
    ) {
      a.c = primColor;
      b.c = primColor;
    } else {
      a.c = midColor;
      b.c = midColor;
    }
  }
  static checkEllipseCollision(c, d) {
    if (dist(c.x, c.y, d.x, d.y) ** 2 <= (c.w / 2 + d.w / 2) ** 2) {
      c.c = primColor;
      d.c = primColor;
    } else {
      c.c = midColor;
      d.c = midColor;
    }
  }
  static checkRectCircCollision(rect, circ) {
    let rectx = rect.x - rect.w / 2;
    let recty = rect.y - rect.h / 2;
    let rectw = rect.w;
    let recth = rect.h;
    let circlex = circ.x;
    let circley = circ.y;
    let diameter = circ.w;
    // THIS CODE IS STOLEN FROM P5.COLLIDE2D **BUT MODIFIED TO WORK WITH RECTMODE(CENTER)**
    testX = circlex;
    testY = circley;
    if (circlex < rectx) {
      testX = rectx;
    } else if (circlex > rectx + rectw) {
      testX = rectx + rectw;
    }
    if (circley < recty) {
      testY = recty;
    } else if (circley > recty + recth) {
      testY = recty + recth;
    }
    distance = dist(circlex, circley, testX, testY);
    if (distance <= diameter / 2) {
      if (testX > rectx + rectw / 2) {
        dir = -10;
      } else {
        dir = 10;
      }
      rect.c = primColor;
      circ.c = primColor;
      return true;
    }
  }

  static checkMouseOnRect(e, o) {
    if (
      e.clientX >= o.x - o.w / 2 &&
      e.clientX <= o.x + o.w / 2 &&
      e.clientY <= o.y + o.h / 2 &&
      e.clientY >= o.y - o.h / 2
    ) {
      return true;
    }
    return false;
  }
  static checkMouseOnCirc(e, o) {
    if ((e.clientX - o.x) ** 2 + (e.clientY - o.y) ** 2 <= o.w ** 2) {
      return true;
    }
    return false;
  }
  static checkTouchOnRect(e, o) {
    if (
      e.changedTouches[0].clientX >= o.x - o.w / 2 &&
      e.changedTouches[0].clientX <= o.x + o.w / 2 &&
      e.changedTouches[0].clientY <= o.y + o.h / 2 &&
      e.changedTouches[0].clientY >= o.y - o.h / 2
    ) {
      return true;
    }
    return false;
  }
  static checkTouchOnCirc(e, o) {
    if (
      (e.changedTouches[0].clientX - o.x) ** 2 +
        (e.changedTouches[0].clientY - o.y) ** 2 <=
      o.w ** 2
    ) {
      return true;
    }
    return false;
  }
}
function showText(){
  textSize(16)
  textAlign(CENTER);
  fill(255);
  text("Drag the shaking objects!", centx, centy);
}
/*----------------   SETUP   ---------------*/
function setup() {
  createCanvas(width, height);
  noStroke();
  rectMode(CENTER);
  ellipseMode(CENTER);
  if (window.innerWidth <= 750) {
    rect1 = new Shape(centx + 60, centy * 1.5 - 60, 80, 80, color(200, 160));
    rect2 = new Shape(centx, centy / 2, 80, 80, color(255, 100));
    circ1 = new Shape(centx + 65, centy / 2 - 60, 80, 80, color(200, 160));
    circ2 = new Shape(centx, centy * 1.5, 80, 80, color(200, 160));
  } else {
    rect1 = new Shape(rs + 60, centy - 65, 100, 100, color(200, 160));
    rect2 = new Shape(ls, centy, 100, 100, color(255, 100));
    circ1 = new Shape(ls + 65, centy - 65, 100, 100, color(200, 160));
    circ2 = new Shape(rs, centy, 101, 100, color(200, 160));
  }
  primColor = color(200, 35, 35, 150);
  midColor = color(200, 150);
  focused = true;
  done = false;
  setTimeout(()=>{
    done = true
  }, 3000)
}
/*******************  DRAW  *****************/
function draw() {
  if (focused) {
    background(bgc);
    rect1.rect();
    circ1.ellipse();
    rect2.rect();
    circ2.ellipse(); 
    Shape.checkRectCollision(rect1, rect2);
    Shape.checkEllipseCollision(circ1, circ2);
    Shape.checkRectCircCollision(rect1, circ1) ? (rect1.x += dir) : null;
    if (rect1.x - rect1.w / 2 <= 0) {
      rect1.x = rect1.w / 2;
    } else if (rect1.x + rect1.w / 2 >= window.innerWidth) {
      rect1.x = window.innerWidth - rect1.w / 2;
    }
    Shape.checkRectCircCollision(rect1, circ2);
    Shape.checkRectCircCollision(rect2, circ1);
    rect1.shake();
    circ1.shake();
    if(!done){
      showText();
    }
  }
}
/********************************************/

function mouseDragged(e) {
  if (Shape.checkMouseOnRect(e, rect1)) {
    rect1.x = e.clientX;
    rect1.y = e.clientY;
  }
  if (Shape.checkMouseOnCirc(e, circ1)) {
    circ1.x = e.clientX;
    circ1.y = e.clientY;
  }
}

function mouseMoved() {}
function mouseClicked() {}
function touchMoved(e) {
  if (Shape.checkTouchOnRect(e, rect1)) {
    rect1.x = e.changedTouches[0].clientX;
    rect1.y = e.changedTouches[0].clientY;
  }
  if (Shape.checkTouchOnCirc(e, circ1)) {
    circ1.x = e.changedTouches[0].clientX;
    circ1.y = e.changedTouches[0].clientY;
  }
}
function windowResized() {
  focused = true;
  resizeCanvas(window.innerWidth, window.innerHeight);
  centx = window.innerWidth / 2;
  centy = window.innerHeight / 2;
  ls = centx / 2;
  rs = centx * 1.5;
  if (window.innerWidth <= 750) {
    rect2.pos = [centx, centy / 2];
    circ2.pos = [centx, centy * 1.5];
    rect1.pos = [centx + 65, centy * 1.5 - 35];
    circ1.pos = [centx + 65, centy / 2 - 35];
  } else {
    rect2.pos = [ls, centy];
    circ2.pos = [rs, centy];
    rect1.pos = [rs + 60, centy - 65];
    circ1.pos = [ls + 60, centy - 65];
  }
}
