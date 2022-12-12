let humans = [];
var gameover = false;
var lastSpawn = Date.now();
var gameStarted = false;
var difficulty = 0;
var showHitbox = false;

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
    runSpeed: (naturalRandom() * 2),
    leftLeg: 0,
    rightLeg: 0,
    leftArm: 0,
    rightArm: 0,
    scale: 1,
    hitbox: [],
    humanID: humans.length
  }
  
  newHuman.runSpeed += newHuman.height/100;
  newHuman.runSpeed *= [0.5,0.65,0.8][difficulty];
  //if (newHuman.runSpeed > 1.3) newHuman.runSpeed=1.3;
  //console.log(newHuman.runSpeed);
  humans.push(newHuman);
}

function setup() {
  createCanvas(700, 600);
  frameRate(60);
}

function draw() {
  background(230);
  
  if (!gameStarted) {
    stroke(0);
    strokeWeight(10);
    
    fill("green");
    circle(150,350,100);
    
    fill("yellow");
    circle(350,350,100);
    
    fill("red");
    circle(550,350,100);
    
    strokeWeight(1);
    
    
    
    
    
    textSize(32);
    textAlign(CENTER, CENTER);
    noStroke();
    fill("black");
    text('Choose difficulty to start', 350, 200);
  }
 
  
  for (var i=0; i<humans.length; i++) {
    human = humans[i];

    push();
    
    human.hitbox = [[
      human.humanX - ((human.legsHeight - 26) * human.scale * 0.3),
      human.humanY + (3 * human.scale),
    ]];
    
    human.hitbox = [
      human.hitbox[0],
      [
        human.hitbox[0][0] + ((human.legsHeight - 25) * human.scale * 0.6),
        human.hitbox[0][1] + (90 * human.scale)
      ]
    ];
    
    if (showHitbox) {
      fill(0,0,0,0);
      stroke("red");
      rect(
        human.hitbox[0][0],
        human.hitbox[0][1],
        human.hitbox[1][0] - human.hitbox[0][0],
        human.hitbox[1][1] - human.hitbox[0][1]
      ); //hitbox visualizer
    }
    
    //human.humanY = mouseY;
    
    translate(human.humanX,human.humanY);
    fill(0,0,0,0);
    
    human.scale = 0.6 + (human.humanY / 600) * 1.5;
    
    scale(human.scale);
    //Human
    fill(255);
    stroke(40);



    strokeWeight(3);

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
    
    var playerSpeed = [2.3,2.2,2.1][difficulty];
    
    if (!gameover && gameStarted) {
      if (human.humanID == 0) {
        
        //console.log([human.humanX,human.humanY]);
        if (human.humanX > 635 && human.humanY < 45) {
          gameover = 2;
          
          for(var b = 0; b < humans.length; b++) { 
            var h = humans[b];
            h.isRunning = false;
          }
        }

        if (mouseX > human.humanX) {
          if ((human.humanX >= 625 && human.humanY <= 110) || human.humanX > 700) {} else {
            human.humanX += Math.abs(mouseX - human.humanX) / (Math.abs(mouseX - human.humanX) + Math.abs(mouseY - human.humanY)) * playerSpeed;
          }
        }
        else {
          if (human.humanX > 0) human.humanX -= Math.abs(mouseX - human.humanX) / (Math.abs(mouseX - human.humanX) + Math.abs(mouseY - human.humanY)) * playerSpeed;
             }

        if (mouseY > human.humanY) {
          if (human.humanY < 500) human.humanY += Math.abs(mouseY - human.humanY) / (Math.abs(mouseX - human.humanX) + Math.abs(mouseY - human.humanY)) * playerSpeed; 
      } else {
        if (human.humanY > 0) human.humanY -= Math.abs(mouseY - human.humanY) / (Math.abs(mouseX - human.humanX) + Math.abs(mouseY - human.humanY)) * playerSpeed;
      }
        
      } else {
        
        //a  b
        //c  d
        
        //w  x
        //y  z
        
        /*
          
        bx > wx
        ax < xx
        cy > wy
        ay < yy
        
        */
        
        
        a = [human.hitbox[0][0],human.hitbox[0][1]];
        b = [human.hitbox[1][0],human.hitbox[0][1]];
        c = [human.hitbox[0][0],human.hitbox[1][1]];
        d = [human.hitbox[1][0],human.hitbox[1][1]];
        
        player = humans[0];
        
        w = [player.hitbox[0][0],player.hitbox[0][1]];
        x = [player.hitbox[1][0],player.hitbox[0][1]];
        y = [player.hitbox[0][0],player.hitbox[1][1]];
        z = [player.hitbox[1][0],player.hitbox[1][1]];
        
        if (b[0] > w[0] && a[0] < x[0] && c[1] > w[1] && a[1] < y[1]) {
          for(var i = 0; i < humans.length; i++) { 
            var h = humans[i];
            h.isRunning = false;
          }
          
          humans[0].armDistance = 30;
          human.armDistance = 100;
            
          
          gameover = 1;
        }
        
        //console.log([w,x,y,z])
        
        if (humans[0].humanX > human.humanX) {
          if (human.humanX >= 625 && human.humanY <= 110) {}
          else {
            human.humanX += Math.abs(humans[0].humanX - human.humanX) / (Math.abs(humans[0].humanX - human.humanX) + Math.abs(humans[0].humanY - human.humanY)) * human.runSpeed;
          }
        }
        
        else human.humanX -= Math.abs(humans[0].humanX - human.humanX) / (Math.abs(humans[0].humanX - human.humanX) + Math.abs(humans[0].humanY - human.humanY)) * human.runSpeed;

        if (humans[0].humanY > human.humanY) human.humanY += Math.abs(humans[0].humanY - human.humanY) / (Math.abs(humans[0].humanX - human.humanX) + Math.abs(humans[0].humanY - human.humanY)) * human.runSpeed;
        else {
          if (human.humanX >= 635 && human.humanY <= 110) {}
          else {
            human.humanY -= Math.abs(humans[0].humanY - human.humanY) / (Math.abs(humans[0].humanY - human.humanX) + Math.abs(humans[0].humanY - human.humanY)) * human.runSpeed;
          }
        }
      }
    }
    
    if (Date.now() - lastSpawn > randint(3000 / [1,2,3.2][difficulty],6000 / [1,2,3.5][difficulty]) && gameStarted && !gameover) {
      lastSpawn = Date.now();
      
      
      if (humans.length < 4) newHuman(720,100);
      else {
        if (difficulty == 3) newHuman((humans[0].humanX > 350 ? 720 : 0),(humans[0].humanY > 300 ? 600 : 100));
        else newHuman([720,0][randint(0,1)],[100,600][randint(0,1)]);
    }
  } // End of human movement loops
}
  
  
  
  
  if (showHitbox) {
    strokeWeight(2);
    // invisible wall
    stroke("red");
    line(625,0,625,110);
    
    // invisible wall npcs
    stroke("purple");
    line(635,110,700,110);
    strokeWeight(1);
    
    // winline
    stroke("green");
    line(635,70,700,70);
    strokeWeight(1);
  }
  
  if (gameover == 1) {
    textSize(32);
    textAlign(CENTER, CENTER);
    noStroke();
    fill("rgb(224,90,33)");
    text('You lose.', 350, 200);
    textSize(22);
    text('Click to try again.', 350, 240);
  } else if (gameover == 2) {
    textSize(32);
    textAlign(CENTER, CENTER);
    noStroke();
    fill("rgb(6,189,46)");
    text('You won on ' + ["easy","medium","hard"][difficulty] + " mode.", 350, 200);
    textSize(22);
    text('Click to try again.', 350, 240);
  }
  
  
  
  //safespace
  
  if (gameStarted) {
    stroke(0);
    push();
    translate(610,-10);
    scale(0.3);
    strokeWeight(5);
    
    fill("#ffcc66");
    rect(75,150,250,250);

    fill("#ff9933");
    triangle(75, 150, 325, 152, 200, 40);

    fill(60);
    rect(150,250, 75,150);

    fill("#ff9933");
    noStroke();
    rect(200,0,135);

    pop();  
    
    strokeWeight(1.5);
    stroke(0);
    line(670.5,1.5,700,1.5);
  }
}

function doubleClicked() {
  showHitbox = true;
}

function mouseClicked() {
  if (!gameStarted) {
    if ((mouseX - 150)**2 + (mouseY - 300)**2 < (100**2)) {
        difficulty = 0;
        gameStarted = true;
        newHuman(350,600);
      } else if ((mouseX - 350)**2 + (mouseY - 300)**2 < (100**2)) {
        difficulty = 1;
        gameStarted = true;
        newHuman(350,600);
      } else if ((mouseX - 550)**2 + (mouseY - 300)**2 < (100**2)) {
        difficulty = 2;
        gameStarted = true;
        newHuman(350,600);
      }
  }
  
  if (gameover > 0) {
    humans = [];
    gameover = false;
    lastSpawn = Date.now();
    gameStarted = false;
    difficulty = 0;
    showHitbox = false;
  }
}
