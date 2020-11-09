var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup(){
  createCanvas(600,600);
  //spookySound.loop();
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);

  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
  
  ghost = createSprite(200,200,50,50);
  ghost.scale = 0.3;
  ghost.addImage("ghost", ghostImg);
}

function draw(){
  background(0);
  
  if(gameState==="play"){
    
    
    tower.velocityY = 1;
   if(tower.y>400){
     tower.y = 300;
   }
  
  if(keyDown("space")){
    ghost.velocityY=-5;
  }
    ghost.velocityY= ghost.velocityY + 0.5;
    
  if(keyDown("left_arrow")){
    ghost.x= ghost.x-3;
  }
 if(keyDown("right_arrow")){
    ghost.x= ghost.x+3;
  }
    spawnDoor();
  
  if(ghost.y>600){
    gameState= "end";
  }
  
   
  }else if(gameState==="end"){
    gameOver();
}
  drawSprites();
}

function spawnDoor(){
  
  if(frameCount%200==0){
  var door = createSprite(200,-50,50,100);
  door.addImage(doorImg);
  var invisibleBlock = createSprite(290,100,50,100);
  invisibleBlock.visible= false;
  var climber= createSprite(200,10,50,100);
  climber.addImage(climberImg);
  
  r= Math.round(random(100,500));
  door.x=r;
  climber.x=r;
  invisibleBlock.x=r;
  door.velocityY=1;
  climber.velocityY=1;
  
  door.collide(invisibleBlock);

  doorsGroup.add(door);
  climbersGroup.add(climber);
  invisibleBlockGroup.add(invisibleBlock);
  
  doorsGroup.setLifetimeEach(300);
  climbersGroup.setLifetimeEach(300);
  invisibleBlockGroup.setLifetimeEach(300);
  }
  
}

function gameOver(){
  background(0);
  tower.destroy();
  ghost.destroy();
  climbersGroup.destroyEach(0);
  doorsGroup.destroyEach();
  invisibleBlockGroup.destroyEach();
  textSize(50);
  fill("pink");
  strokeWeight(12);
  stroke("blue");
  text("Game Over",170,300);
  
}
