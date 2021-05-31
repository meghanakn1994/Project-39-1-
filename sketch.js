//creating objects
//gameStates
var PLAY = 1;
var END = 0;
var gameState = PLAY;

//background
var bkg, bkgImage;
var ground;

//charecters
var shinchan, shinchanI;
var shin, shinI;
var mixi, mixiI;

//obstacles and end state
var obstacleG, obstacle1, obstacle2, obstacle3;
var restart, restartI;

//text
var message = "PRESS SPACE TO SAVE SHINCHAN";
var over = "GAMEOVER";

//score
var score = 0;

function preload() {
  //loading images
  bkgImage = loadImage("shinchan house.png");

  shinchanI = loadAnimation("shinchan1.png","shinchan2.png","shinchan3.png","shinchan4.png","shinchan5.png");

  mixiI = loadImage("mixiy nohara (1).png");

  obstacle1 = loadImage("construction obstacle.png");

  obstacle2 = loadImage("obstacle (1).png");

  obstacle3 = loadImage("stone obstacle.png");

  shinI = loadImage("mixi shin.png");

  restartI = loadImage("restart image.png");
}

function setup() {
  createCanvas(600, 400);
  //background sprite
  bkg = createSprite(300, 200, 600, 400);
  bkg.addImage(bkgImage);
  bkg.scale = 1.6;
  bkg.x = bkg.width / 2
  bkg.velocityX = 3;

  //charecter sprites
  shinchan = createSprite(178, 300, 20, 20);
  shinchan.addAnimation("shin",shinchanI);
  shinchan.scale = 1.8
  shinchan.setCollider("rectangle", 0, 0, shinchan.width, shinchan.height);
  
  mixi = createSprite(375, 300, 20, 20);
  mixi.addImage(mixiI);
  mixi.scale = 0.3;

  shin = createSprite(178, 300, 20, 20);
  shin.addImage(shinI);
  shin.scale = 0.6;
  shin.visible = false;

  ground = createSprite(200, 350, 900, 10);
  ground.x = ground.width / 2;
  ground.velocityX = 3;
  ground.visible = false;

  restart = createSprite(300, 250, 20, 20);
  restart.addImage(restartI);
  restart.visible = false;

  obstacleG = new Group();

  score = 0;
}

function draw() {
  background(0);

  // GAMESTATE PLAY

  if (gameState === PLAY) {

    score = score + Math.round(getFrameRate() / 60);
    ground.velocityX = -(3 + 3 * score / 100);

    if (keyDown("space") && shinchan.y >= 159) {
      shinchan.velocityY = -12;
      message = "";
    }
    shinchan.velocityY = shinchan.velocityY + 0.8;

    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }

    if (bkg.x > width) {
      bkg.x = bkg.width / 2;
    }

    shinchan.collide(ground);
    mixi.collide(ground);

    spawnObstacles();

    if (obstacleG.collide(shinchan)) {
      gameState = END;
    }
  }
  //GAMESTATE END

  if (gameState === END) {
    ground.velocityX = 0;
    bkg.velocityX = 0;

    shinchan.velocityY = 0;

    obstacleG.setVelocityEach(0);
    obstacleG.setLifetimeEach(-1);

    mixi.visible = false;
    shinchan.visible = false;
    shin.visible = true;
    restart.visible = true;

    if (mousePressedOver(restart)) {
      reset();
    }
  }
  drawSprites();
  //SCORE
  stroke("black");
  textSize(20);
  text("Score::" + score, 500, 50);

  //PRESS SPACE
  fill("black");
  stroke("black");
  textSize(20);
  text(message, 100, 100);

  //GAMEOVER 
  if (gameState === END) {
    fill("black");
    stroke("black");
    textSize(20);
    text(over, 300, 200);
  }
}

function spawnObstacles() {

  if (frameCount % 200 === 0) {
    var obstacle = createSprite(0, 325, 10, 40);
    obstacle.velocityX = 3;

    //generate random obstacles
    var rand = Math.round(random(1, 3))
    switch (rand) {
      case 1:
        obstacle.addImage(obstacle1);
        obstacle.scale = 0.2;
        break;
      case 2:
        obstacle.addImage(obstacle2);
        obstacle.scale = 0.4;
        break;
      case 3:
        obstacle.addImage(obstacle3);
        obstacle.scale = 0.3;
        break;
      default:
        break;
    }
    obstacle.lifetime = 425;
    obstacleG.add(obstacle);
  }
}

function reset() {
  gameState = PLAY;
  restart.visible = false;
  bkg.velocityX = 3;
  mixi.visible = true;
  shinchan.visible = true;
  shin.visible = false;
  obstacleG.destroyEach();
  score = 0;
}