let humans = [];


function naturalRandom() {
  var rand = 0;
  for (var i = 0; i < 32; i += 1) rand += Math.random();
  return rand / 32;
}

function newHuman() {
  var newHuman = {
    armDistance: 30,
    armSize: 30,
    legsHeight: 60,
    legsDistance: 50,
    humanX: 100,
    humanY: 10,
    height: (naturalRandom() * 100) - 40,
    isRunning: false,
    armsRising: true,
    legsRising: true,
    stopRunning: false,
    runSpeed: (naturalRandom() * 10) - 3.5,
    leftLeg: 0,
    rightLeg: 0,
    leftArm: 0,
    rightArm: 0,
    scale: 1,
    hitbox: [],
    humanID: humans.length
  }
  
  newHuman.runSpeed += newHuman.height/10;
  if (newHuman.runSpeed > 3) newHuman.runSpeed=3;
  
  humans.push(newHuman);
}

function setup() {
  createCanvas(700, 600);
  frameRate(60);
}

function draw() {
  background(230);
  
  
 
  
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
    
    human.humanY = mouseY;
    
    translate(human.humanX,human.humanY);
    fill(0,0,0,0);
    
    human.scale = 0.35 + (human.humanY / 600) * 2;
    
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


    if (Math.abs(mouseX-human.humanX) > 3) {
      if (Math.abs(mouseX-human.humanX) < 15) human.stopRunning = true; 
      // Stop moving animation 15px away for smoother transition
      else human.isRunning = true;

      //if (mouseX > human.humanX) human.humanX += human.runSpeed;
      //else human.humanX -= human.runSpeed;

    } else {
      human.stopRunning = true;
    } 
    
  }
}

newHuman();

function mouseClicked() {
  //newHuman();
}
