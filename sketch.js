var PLAY = 1;
var END = 0;
var gameState = PLAY;
var canvas, backgroundImage;
var biker,shop,road
var score = 0,shopsGroup
var gameOver,restart
var gameOverImg,restartImg



function preload() {
road = loadImage("images/track.jpg");
biker = loadImage("images/BIKER.png");
shop1 = loadImage("images/shop1.png");
shop2 = loadImage("images/shop2.png");
restartImg = loadImage("images/restart.png")
gameOverImg = loadImage("images/gameOver.png")
}














function setup() {
  canvas = createCanvas(displayWidth , displayHeight);    
  track1 = createSprite(width/2,height/2)
  track1.scale = 1.1
  track1.velocityY = 7
  track1.addImage("road",road)
  bikerracer = createSprite(width/2,height - 200)
  bikerracer.addImage("biker",biker)
  bikerracer.scale = 0.2
  shopsGroup = new Group()
  bikerracer.debug = false
  bikerracer.setCollider("rectangle",0,0,250,500)
  gameOver = createSprite(width/2,height/2);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(width/2,height/2+200);
  restart.addImage(restartImg);
  
 
  gameOver.scale = 1;
  restart.scale = 0.07;
}





function draw() {
  background("black"); 
  if(gameState === PLAY){
        gameOver.visible = false;
        restart.visible = false;
        if(keyDown(37)){
      bikerracer.velocityX -= 0.2
      }
      if(keyDown(39)){
        bikerracer.velocityX += 0.2
        }
        spawnShops()
        score = score + Math.round(getFrameRate()/60);
        if(bikerracer.isTouching(shopsGroup)){
          gameState = END
       
      
        }


  }else if(gameState === END){
    track1.velocityY = 0
   shopsGroup.setVelocityYEach(0)
   bikerracer.velocityX = 0
   gameOver.visible = true;
   restart.visible = true;
   if(mousePressedOver(restart)) {
    reset();
  }
  
    


}
  
    text("Score: "+ score, 200,50);
 
  
 drawSprites();

  

}


function spawnShops(){
if(frameCount % 120  === 0){
  var shop = createSprite(200,0)
  shop.addImage("shop",shop1)
  shop.scale = 0.2
  shop.velocityY = 2
  shop.x = Math.round(random(600,1000))
  shopsGroup.add(shop)
  shop.depth = bikerracer.depth
  bikerracer.depth += 1
}



}