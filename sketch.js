var sanitizerImage,sanitizer;
var omicronImage,omicron, backgroundImage,Background;
var bulletImage,tempbullet,bullet,omicron1Group,omicron2Group,omicron3Group,bulletGroup;
var score=0;
var heartImage,heart1,heart2,heart3;
var count=4;
var gameoverImage,gameover;
var restartImage,restart;
var gameState="play"
var coinImage,coin,coin1Group,coin2Group,coin3Group;
var coinsound;
var counthen=1;
var countcoin=1;

function preload(){

  sanitizerImage = loadImage("sanitizer.png");
  omicronImage = loadImage("omicron.png");
  backgroundImage  = loadImage("background.png");
  bulletImage = loadImage("bond-removebg-preview.png");
  restartImage = loadImage("red_reset-removebg-preview.png");
  gameoverImage = loadImage("gameover_mgh-1-removebg-preview.png");
  heartImage = loadImage("heart.png");
  coinImage = loadImage("life_heart_symbol-removebg-preview.png");
  coinsound = loadSound("341695__projectsu012__coins-1.wav")
 
}

function setup() {
  createCanvas(500,400);

  Background = createSprite(200,200,10,10);
  Background.addImage(backgroundImage);
  Background.scale=0.3;
 
 
  sanitizer = createSprite(50,200,20,50);
  sanitizer.addImage(sanitizerImage);
  sanitizer.scale=0.6;
 
  heart1 = createSprite(20,20,20,50);
  heart1.addImage(heartImage);
  heart1.scale=0.03;
  heart1.depth=sanitizer.depth-1;
 
  heart2 = createSprite(55,20,20,50);
  heart2.addImage(heartImage);
  heart2.scale=0.03;
  heart2.depth=sanitizer.depth-1;
 
  heart3 = createSprite(90,20,20,50);
  heart3.addImage(heartImage);
  heart3.scale=0.03;
  heart3.depth=sanitizer.depth-1;

  gameover = createSprite(250,200,10,10);
  gameover.addImage(gameoverImage);
  gameover.scale=0.3;
 
  restart = createSprite(250,265,10,10);
  restart.addImage(restartImage);
  restart.scale=0.2;

  omicron1Group=createGroup();
  omicron2Group=createGroup();
  omicron3Group=createGroup();
 
  bulletGroup=createGroup();
  coin1Group=createGroup();
  coin2Group=createGroup();
  coin3Group=createGroup();
}

function draw() {
  background(180);
  Background.velocityX=0;
  if(gameState==="play")
  {
    gameover.visible=false;
    restart.visible=false;
    spawnomicrons();
    spawncoins();
    sanitizer.setCollider("rectangle", 0,10,145,130);
    if(keyDown("up")&&sanitizer.y>30){
      sanitizer.y = sanitizer.y - 8;
    }
    if(keyDown("down")&&sanitizer.y<370){
      sanitizer.y = sanitizer.y + 8;
    }
    if(keyWentDown("space")){
       temp=Bullet();
    }
    if(bulletGroup.isTouching(omicron1Group)){
      bulletGroup.destroyEach();
      omicron1Group.destroyEach();
      score=score+1;  
    }
    if(bulletGroup.isTouching(omicron2Group)){
      bulletGroup.destroyEach();
      omicron2Group.destroyEach();
      score=score+1;  
    }
    if(bulletGroup.isTouching(omicron3Group)){
      bulletGroup.destroyEach();
      omicron3Group.destroyEach();
      score=score+1;  
    }
    if(sanitizer.isTouching(coin1Group)){
      coinsound.play();
      coin1Group.destroyEach();
      score=score+1;  
    }
    if(sanitizer.isTouching(coin2Group)){
      coinsound.play();
      coin2Group.destroyEach();
      score=score+1;  
    }
    if(sanitizer.isTouching(coin3Group)){
      coinsound.play();
      coin3Group.destroyEach();
      score=score+1;  
    }
    if(sanitizer.isTouching(omicron1Group)){
      omicron1Group.destroyEach();
      count=count-1;
      if(count===3)
      {
          heart3.visible=false;
      }
      if(count===2)
      {
          heart2.visible=false;
      }
      if(count===1)
      {
          heart1.visible=false;
          gameState="End"
      }
    }
    if(sanitizer.isTouching(omicron2Group)){
      omicron2Group.destroyEach();
      count=count-1;
      if(count===3)
      {
          heart3.visible=false;
      }
      if(count===2)
      {
          heart2.visible=false;
      }
      if(count===1)
      {
          heart1.visible=false;
          gameState="End"
      }
    }  
    if(sanitizer.isTouching(omicron3Group)){  
      omicron3Group.destroyEach();
      count=count-1;
      if(count===3)
      {
          heart3.visible=false;
      }
      if(count===2)
      {
          heart2.visible=false;
      }
      if(count===1)
      {
          heart1.visible=false;
          gameState="End"
        }
      }
    }  
    if(Background.x<0){
      Background.x=Background.width/2;
    }
    drawSprites();
    fill("purple");
    textSize(18);
    text("Score: "+score,380,50)
   
    if(gameState==="End"){
      omicron.velocityX=0;
      sanitizer.visible=false;
      Background.velocityX=0;
      gameover.visible=true;
      restart.visible=true;
      coin1Group.destroyEach();
      coin2Group.destroyEach();
      coin3Group.destroyEach();
      bulletGroup.destroyEach();
      omicron1Group.destroyEach();
      omicron2Group.destroyEach();
      omicron3Group.destroyEach();
    }
    if(mousePressedOver(restart)&&gameState==="End"){
      reset();
    }
  }

  function Bullet()
  {
    bullet=createSprite(90,200,10,10);
    bullet.addImage(bulletImage);
    bullet.scale=0.07;
    bullet.y=sanitizer.y+5;
    bullet.velocityX=10;
    bullet.lifetime=50;
   // return bullet;
    bulletGroup.add(bullet);
  }
  
  function spawnomicrons(){
    if(frameCount%60===0){
       omicron = createSprite(470,Math.round(random(40,380)))
       omicron.addImage(omicronImage);
       omicron.scale=0.2;
       omicron.velocityX=-(3+(score/4))
       omicron.lifetime=166.66;
       if(counthen===1)
       {
         counthen=counthen+1;
         omicron1Group.add(omicron);
       }
       else if(counthen===2)
       {
         counthen=counthen+1;
         omicron2Group.add(omicron);
       }
       else
       {
        omicron3Group.add(omicron);
          counthen=1;
       }
      
      }
  }
  function spawncoins(){
    if(frameCount%60===0){
      coin=createSprite(470,Math.round(random(30,370)))
      coin.addImage(coinImage);
      coin.scale=0.1;
      coin.velocityX=-4;
      coin.lifetime=250;
     
      if(countcoin===1)
       {
         countcoin=countcoin+1;
         coin1Group.add(coin);
       }
       else if(countcoin===2)
       {
         countcoin=countcoin+1;
         coin2Group.add(coin);
       }
       else
       {
          coin3Group.add(coin);
          countcoin=1;
       }
    }
  }
  
  function reset(){
    gameState="play"
    score=0;
    gameover.visible=false;
    restart.visible=false;
    sanitizer.visible=true;
    sanitizer.y=200;
    heart1.visible=true;
    heart2.visible=true;
    heart3.visible=true;
    count=4;
 }