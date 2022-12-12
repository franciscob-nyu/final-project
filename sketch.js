let humans = [];

function naturalRandom() {
  var rand = 0;
  for (var i = 0; i < 32; i += 1) rand += Math.random();
  return rand / 32;
}

function randint(min, max) {
    return Math.floor( Math.random() * (min + 1 + max) ) + min;
}

function newHuman(humanX, humanY) {
  var newHuman = {
    armDistance: 30,
    armSize: 30,
    legsHeight: 60,
    legsDistance: 50,
    humanX: humanX,
    humanY: humanY,
    height: (naturalRandom() * 100) - 40,
    isRunning: true,
    armsRising: true,
    legsRising: true,
    stopRunning: false,
    runSpeed: (naturalRandom() * 5) - 1.2,
    leftLeg: 0,
    rightLeg: 0,
    leftArm: 0,
    rightArm: 0,
    scale: 1,
    hitbox: [],
    humanID: humans.length
  }
  
  newHuman.runSpeed += newHuman.height/100;
  newHuman.runSpeed *= difficulty;
  //if (newHuman.runSpeed > 1.3) newHuman.runSpeed=1.3;
  console.log(newHuman.runSpeed);
  humans.push(newHuman);
}

function setup() {
  createCanvas(700, 600);
  frameRate(60);
}

var gameover = false;
var lastSpawn = Date.now();
var gameStarted = false;
var difficulty = 0;

function draw() {
  background(230);
  
  if (!gameStarted) {
    stroke(0);
    
    fill("green");
    circle(150,350,100);
    
    fill("yellow");
    circle(350,350,100);
    
    fill("red");
    circle(550,350,100);
    
    
    
    
    
    textSize(32);
    textAlign(CENTER, CENTER);
    noStroke();
    fill("black");
    text('Choose difficulty to start', 350, 200);
    
    if (true || (mouseX - 150)**2 + (mouseY - 300)**2 < (100**2)) {
      difficulty = 1;
      gameStarted = true;
      newHuman(350,600);
    } else if ((mouseX - 350)**2 + (mouseY - 300)**2 < (100**2)) {
      difficulty = 1.2;
      gameStarted = true;
      newHuman(350,600);
    } else if ((mouseX - 550)**2 + (mouseY - 300)**2 < (100**2)) {
      difficulty = 1.4;
      gameStarted = true;
      newHuman(350,600);
    }
  }
 
  
  for (var i=0; i<humans.length; i++) {
    human = humans[i];

    push();
    
    human.hitbox = [[
      human.humanX - ((human.legsHeight - 3) * human.scale * 0.3),
      human.humanY + (3 * human.scale),
    ]];
    
    human.hitbox = [
      human.hitbox[0],
      [
        human.hitbox[0][0] + ((human.legsHeight - 4) * human.scale * 0.6),
        human.hitbox[0][1] + (98 * human.scale)
      ]
    ];
    
    /*
    rect(
      human.hitbox[0][0],
      human.hitbox[0][1],
      human.hitbox[1][0] - human.hitbox[0][0],
      human.hitbox[1][1] - human.hitbox[0][1]
    ); //hitbox visualizer */
    
    //human.humanY = mouseY;
    
    translate(human.humanX,human.humanY);
    fill(0,0,0,0);
    
    human.scale = 0.6 + (human.humanY / 600) * 1.5;
    
    scale(human.scale);
    //Human
    fill(255);
    stroke(40);





    line(0, 25, 0, human.legsHeight + human.height);
    ellipse(0, 15, 20, 20);

    //Right arm
    push();
    translate(0, 30);
    rotate(radians(90 - human.armDistance));
    line(0, 0, human.armSize - human.rightArm, 0);
    pop();

    //Left arm
    push();
    translate(0, 30);
    rotate(radians(human.armDistance + 90));
    line(0, 0, human.armSize - human.leftArm, 0);
    pop();

    //Legs
    translate(0, human.legsHeight + human.height);
    rotate(radians(90 - (human.legsDistance / 2)));
    line(0, 0, human.legsHeight - (30 + human.leftLeg), 0);
    rotate(radians(human.legsDistance));
    line(0, 0, human.legsHeight - (30 + human.rightLeg), 0);
    
    scale(1);
    pop();
    if (human.isRunning) {
      if (human.stopRunning && (human.armDistance == 30 || human.armDistance == -30) && human.legsDistance == 50) { 

        // Stop running animation when arms and legs at rest position
        human.stopRunning = false;
        human.isRunning = false;
      }


      if (!(human.stopRunning && human.armDistance == 30)) {
        if (human.armsRising) {
          human.armDistance += 1.25;
          if (human.armDistance > 30) human.armsRising = false;
        } else {
          human.armDistance -= 1.25;
          if (human.armDistance < 20) human.armsRising = true;
        }
      }

      if (!(human.stopRunning && human.legsDistance == 50)) {
        if (human.legsRising) {
          human.leftLeg += 0.5;
          human.rightLeg -= 0.5;

          human.rightArm -= 0.5;
          human.leftArm += 0.5;

          human.legsDistance += 0.3;
          if (human.leftLeg > 4) human.legsRising = false;
        } else {
          human.leftLeg -= 0.5;
          human.rightLeg += 0.5;

          human.rightArm += 0.5;
          human.leftArm -= 0.5;

          human.legsDistance -= 0.3;
          if (human.rightLeg > 4) human.legsRising = true;
        }
      }


    }
    
    if (human.humanID == 0 && !gameover && gameStarted) {
      
      
      if (mouseX > human.humanX) human.humanX += Math.abs(mouseX - human.humanX) / (Math.abs(mouseX - human.humanX) + Math.abs(mouseY - human.humanY)) * 1.5;
      else human.humanX -= Math.abs(mouseX - human.humanX) / (Math.abs(mouseX - human.humanX) + Math.abs(mouseY - human.humanY)) * 1.5;

      if (mouseY > human.humanY) human.humanY += Math.abs(mouseY - human.humanY) / (Math.abs(mouseX - human.humanX) + Math.abs(mouseY - human.humanY)) * 1.5;
      else human.humanY -= Math.abs(mouseY - human.humanY) / (Math.abs(mouseX - human.humanX) + Math.abs(mouseY - human.humanY)) * 1.5;
      
    } else {
      if (humans[0].humanX > human.humanX) human.humanX += Math.abs(humans[0].humanX - human.humanX) / (Math.abs(humans[0].humanX - human.humanX) + Math.abs(humans[0].humanY - human.humanY)) * 0.5;
      else human.humanX -= Math.abs(humans[0].humanX - human.humanX) / (Math.abs(humans[0].humanX - human.humanX) + Math.abs(humans[0].humanY - human.humanY)) * 0.5;

      if (humans[0].humanY > human.humanY) human.humanY += Math.abs(humans[0].humanY - human.humanY) / (Math.abs(humans[0].humanX - human.humanX) + Math.abs(humans[0].humanY - human.humanY)) * 0.5;
      else human.humanY -= Math.abs(humans[0].humanY - human.humanY) / (Math.abs(humans[0].humanY - human.humanX) + Math.abs(humans[0].humanY - human.humanY)) * 9.5
    }
    
    if (Date.now() - lastSpawn > randint(3000 / difficulty,6000 / difficulty) && gameStarted) {
      lastSpawn = Date.now();
      
      if (humans.length < 3) newHuman(720,100);
      else newHuman((humans[0].humanX > 350 ? 720 : 0),(humans[0].humanY > 300 ? 600 : 100));
    }
  } // End of human movement loops
  
  
  //safespace
  
  translate(610,-10);
  scale(0.3);
  push();
  stroke(0);
  fill("#ffcc66");
  rect(75,150,250,250);
  
  fill("#ff9933");
  triangle(75, 150, 325, 152, 200, 40);
  
  fill(60);
  rect(150,250, 75,150);
  
  fill("#ff9933");
  noStroke();
  rect(200,0,130)
  
  pop();
  
}

function mouseClicked() {
  
}
