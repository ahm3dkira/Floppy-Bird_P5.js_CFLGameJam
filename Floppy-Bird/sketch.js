var bird;
var pipes = [];
var points = 0;
var playerImage;

function preload(){
  playerImage = loadImage('flappy-bird-sprite.png');  
}
function setup() {
  createCanvas(400, 400);
  bird = new Bird();
  pipes.push(new Pipe());

} // main setup

function draw() {
  
  background(3, 219, 252);
  
  if(frameCount%120==0){
    pipes.push(new Pipe());
  }
  for(var i=pipes.length-1;i>=0;i--){
    pipes[i].update();
    pipes[i].show();

    if(pipes[i].hits(bird)){
        console.log("HIT");
    }

    if(pipes[i].offScreen()){
        points++;
        pipes.splice(i,1);
    }
  }
  bird.update();
  bird.show();
} // main draw

function Bird(){
  
  this.y = height/2;
  this.x =64;
  this.gravity=0.6;
  this.force = -15;
  this.velocity =0 ;
  
  this.show = ()=>{
    image(playerImage,this.x,this.y,40,40)
    // fill(255);
    // ellipse(this.x,this.y,32,32);
    
  }
  this.up = ()=>{
    this.velocity+=this.force;
  }
  this.update = ()=>{
    this.velocity+=this.gravity;
    this.velocity*=0.9;
    this.y+=this.velocity;
    
    if(this.y > height-25) {
      this.y = height-25;
      this.velocity=0;
    }
    if(this.y < 0) {
      this.y = 0;
      this.velocity=0;
    }
  
  }
} // Bird

function Pipe(){
  this.top=random(height/2);
  this.bottom=random(height/2);
  this.x=width;
  this.w = 20;
  this.speed = 1;
  this.highlight = false;

  this.show=()=>{
      fill(255);
      if(this.highlight){
          fill(255,0,0);
      }
      rect(this.x,0,this.w,this.top);
      rect(this.x,height-this.bottom,this.w,this.bottom);
      
  }
  this.update=()=>{
      this.x-=this.speed;
  }
  this.offScreen=()=>{
      if(this.x<-this.w){
          return true;
      }else{
          return false;
      }
  }
  this.hits=(bird)=>{
      if((bird.y<this.top) || (bird.y>height-this.bottom)){
          if((bird.x>this.x) && (bird.x<this.x+this.w)){
              this.highlight = true;
              
              return true;
          }
      }

      return false;

  }
} // Pipe

function keyPressed(){
  if (key== ' '){
    bird.up();
  }
} // keyPressed