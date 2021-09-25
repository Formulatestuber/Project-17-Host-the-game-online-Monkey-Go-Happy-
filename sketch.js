 
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score, c = 0
var gameState = "play"

function preload(){
  
   monkey_running =  loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  monkey_stop = loadAnimation ("sprite_0.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  
  jungle_background = loadImage("seamless-cartoon-jungle-landscape-vector-unending-background-separated-layers-game-85955536.jpg")
 
}



function setup() {
  
  junglebackground = createSprite(200,180)
  junglebackground.addImage (jungle_background)
  
monkey = createSprite(135,315,20,20)
monkey.addAnimation ("moving",monkey_running)
monkey.scale = 0.1;
monkey.addAnimation ("stop",monkey_stop)
  
ground = createSprite(400,360,900,10);
ground.visible = false;

  bananaGroup = createGroup();
  obstacleGroup = createGroup();
  
  score = 0;
  
  monkey.setCollider ("rectangle", 0,0,300, monkey.height, monkey.width)
  monkey.debug = true;
}
function draw() {
  
  background (255)
  
  console.log ("gameState")
  
  junglebackground.velocityX = -4;
  if (junglebackground.x<0) {
    junglebackground.x = junglebackground.width / 2
  }
  
  monkey.velocityY = monkey.velocityY + 0.8
  
  monkey.scale = 0.1+0.015*score/2;
  
  monkey.collide (ground);
  
  if (gameState === "play"){
    
  junglebackground.velocityX = -4;
  if (junglebackground.x<0) {
    junglebackground.x = junglebackground.width / 2
  }
  
  if (keyDown("space")&& monkey.y > 240){
  monkey.velocityY = -15;
  }
  
  if (monkey.isTouching(bananaGroup)){
    score = score+1;
    banana.destroy();
  }
    
  if (junglebackground.x<0){
    junglebackground.x = junglebackground.width/2;
  }
       
  if (monkey.isTouching(bananaGroup)){
    banana.destroy();
  }
  
  monkey.velocityY = monkey.velocityY+0.8;
  
  monkey.collide (ground);
  
  spawnbananas();
  spawnObstacles();
  
  if (monkey.isTouching(obstacleGroup)){
    monkey.scale = 0.08
    c = c+1
    monkey.x = 135;
    console.log(c)

  }
        if (c>2){
      gameState = "end";
    }
  }
    
  else if (gameState === "end"){
    score = score;
        
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    
    obstacleGroup.setVelocityXEach(0)
    bananaGroup.setVelocityXEach(0)
    
    junglebackground.velocityX = 0;
    
    monkey.changeAnimation ("stop",monkey_stop)
    
  }
  
 drawSprites();
  
  text("Score: "+ score,   170,50);
}

function spawnbananas(){
  
  if (frameCount % 100 === 0){
    banana = createSprite(400, 200, 5, 10);
    banana.y = Math.round(random(150,200));
    banana.addImage(bananaImage)
    banana.scale = 0.1  ;
    banana.velocityX = -7.5;
    banana.lifetime = 200;
    
    bananaGroup.add(banana)
  }
}

function spawnObstacles(){

if (frameCount % 60 === 0){
  obstacle = createSprite(400,327.5, 20, 20);
  obstacle.velocityX = -6;
  obstacle.addImage (obstacleImage)
  obstacle.scale = 0.1;
  obstacle.lifetime = 300;
  
  obstacleGroup.add (obstacle);
}
}
