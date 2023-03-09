let width = window.innerWidth;
let height = window.innerHeight;
let centx = width / 2;
let centy = height / 2;
let box1;
let box2;
class Box{
    constructor(){
        this.x = centx;
        this.y = centy;
        this.w = 150;
        this.h = 150;
        this.e = 0;
        this.r = 255
        this.g = 255
        this.b = 255
    } 
    show(){
        noStroke()
        rectMode(CENTER)
        fill(this.r, this.g, this.b, 180)
        rect(this.x, this.y, this.w, this.h, this.e)
      
    }
    set recolor(color){
        this.r = color[0]
        this.g = color[1]
        this.b = color[2]
    }
}
function mouseMoved(){
    box1.x = mouseX
    box1.y = mouseY
}
function mouseDragged(event){
    box1.x = event.x 
    box1.y = event.y   
}
function setup(){
    createCanvas(width, height)
    box1 = new Box();
    box2 = new Box();
}

function windowResized(){
    box2.x = window.innerWidth / 2
    box2.y = window.innerHeight / 2
    resizeCanvas(window.innerWidth,window.innerHeight)

}

function draw(){
    background(0)
    box1.show() 
    box2.show()

    if((box1.x + (box1.w / 2)) >= (box2.x - (box2.w/2)) &&
    (box1.x -(box1.w / 2)) <= (box2.x + (box2.w/2)) &&
    box1.y + (box1.h / 2) >= (box2.y - (box2.h/2)) &&
    box1.y - (box1.h / 2) <= (box2.y + (box2.h/2))){
        box1.recolor = [250,55,55]
        box2.recolor = [250,55,55]
    }else{
        box1.recolor = [255,255,255]
        box2.recolor = [255,255,255]
    }
    fill(255)
    textAlign(CENTER)
    text(`Box Collision Detection `, window.innerWidth/2, window.innerHeight/5)
}