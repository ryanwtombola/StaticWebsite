function onLoad() {
    loadTheme();
    changeText();
}

function loadTheme() {
    var theme = sessionStorage.getItem('theme');
    if (theme == null) {theme = 'lightgrey';}
    document.documentElement.style.setProperty('--theme-color', theme);
}

const rocketText = {};
rocketText['falcon1'] = "Falcon 1 was the first rocket developed by SpaceX and the first privately developed liquid fuel launch vehicle to reach orbit around Earth, it was powered by a Merlin engine in the first stage, a Kestrel engine in the second and both stages used LOX/RP-1. Falcon 1 had a total of 5 launches over its lifetime, the first 3 of which failed. After 3 consecutive failures SpaceX was close to bankrupcy however the fourth launch was a success allowing the company to continue to develop new technologies and reach where it is today.";
rocketText['falcon9'] = "Falcon 9 is the successor to the Falcon 1 being named for its use of nine Merlin rocket engines powered by LOX/RP-1. It is a two-stage rocket designed for the reliable and safe transport of satellites and the Dragon spacecraft into orbit. Falcon 9 is the first orbital class rocket capable of reflight. SpaceX believes rocket reusability is the key breakthrough needed to reduce the cost of access to space and enable people to live on other planets.";
rocketText['falconHeavy'] = "Falcon Heavy is the most powerful operational rocket in the world by a factor of two. With the ability to lift into orbit nearly 64 metric tons (a mass greater than a 737 jetliner loaded with passengers, crew, luggage and fuel) Falcon Heavy can lift more than twice the payload of the next closest operational vehicle, the Delta IV Heavy, at one-third the cost. Falcon Heavy draws upon the proven heritage and reliability of Falcon 9.";
rocketText['bfr'] = "The BFR (Big Falcon Rocket) represents a fully reusable transportation system designed to service all Earth orbit needs as well as the Moon and Mars. This two-stage vehicle composed of the Super Heavy rocket (booster) and Starship (ship) will eventually replace Falcon 9, Falcon Heavy and Dragon. By creating a single system that can service a variety of markets, SpaceX can redirect resources from Falcon 9, Falcon Heavy and Dragon to Starship which is fundamental in making the system affordable.";

const rocketStatus = {};
rocketStatus['falcon1'] = 'Retired';
rocketStatus['falcon9'] = 'Active';
rocketStatus['falconHeavy'] = 'Active';
rocketStatus['bfr'] = 'Proposed';

const rocketPrice = {};
rocketPrice['falcon1'] = '$7.9M';
rocketPrice['falcon9'] = '$62M';
rocketPrice['falconHeavy'] = '$90M';
rocketPrice['bfr'] = '-';

const rocketLEO = {};
rocketLEO['falcon1'] = '570kg';
rocketLEO['falcon9'] = '22,800kg';
rocketLEO['falconHeavy'] = '63,800kg';
rocketLEO['bfr'] = '100,000 kg - 150,000kg';

const rocketGTO = {};
rocketGTO['falcon1'] = '-';
rocketGTO['falcon9'] = '8,300kg';
rocketGTO['falconHeavy'] = '26,700kg';
rocketGTO['bfr'] = '-';

const rocketMars = {};
rocketMars['falcon1'] = '-';
rocketMars['falcon9'] = '4,020kg';
rocketMars['falconHeavy'] = '16,800kg';
rocketMars['bfr'] = '-'; 

const rocketImage = {};
rocketImage['falcon1'] = 'Images/Falcon1Launch.jpg';
rocketImage['falcon9'] = 'Images/Falcon9.jpg';
rocketImage['falconHeavy'] = 'Images/Falcon Heavy.jpg';
rocketImage['bfr'] = 'Images/BFR.png';

function changeText () {
    var rocketList = document.getElementById("rocket_select");
    var selected = rocketList[rocketList.selectedIndex].value;
    document.getElementById("rocket_text").innerHTML = rocketText[selected];
    document.getElementById("rocket_price").innerHTML = rocketPrice[selected];
    document.getElementById("rocket_status").innerHTML = rocketStatus[selected];
    document.getElementById("rocket_leo").innerHTML = rocketLEO[selected];
    document.getElementById("rocket_gto").innerHTML = rocketGTO[selected];
    document.getElementById("rocket_mars").innerHTML = rocketMars[selected];
    document.getElementById("rocket_image").src = rocketImage[selected];
}








// JavaSnake
var ticksPerSecond = 5;
var circle = ["_", "\\", "|", "/" ];
var statusPos = 0;

var gridSize = 20;
var grid;

var appleX = 3;
var appleY = 3;

var tickSpeed;
var playerX;
var playerY;
var playerLength;
var score;
var playerDir;
var lastPlayerDir;
var playerPreviousX;
var playerPreviousY;
var dead = true;
var cooldowned = true;

function setVars (){
tickSpeed = 1000 / ticksPerSecond;
playerX = 8;
playerY = 8;
playerLength = 3;
score = 0;
playerDir = 'right';
playerPreviousX = [];
playerPreviousY = [];
cooldowned = true;
}

console.clear();
cooldown();

function tick() {
  console.clear();
  console.log('JavaSnake V1.0');
  
  statusBar();
  update();
  displayGrid();
  
  if (!dead){
      setTimeout(tick, tickSpeed);
  }
}

document.onkeydown = function(e) {
  if (!dead){
      switch (e.which) {
    case 87:if (lastPlayerDir != 'down') playerDir = 'up'; break;
    case 68:if (lastPlayerDir != 'left') playerDir = 'right'; break;
    case 83:if (lastPlayerDir != 'up') playerDir = 'down'; break;
    case 65:if (lastPlayerDir != 'right') playerDir = 'left'; break;
      }
  } else if (cooldowned) {
    respawn();
  }
}

function update() {
  lastPlayerDir = playerDir;
  grid = new Array(gridSize);
  for (var y = 0; y < gridSize; y++) {
    grid[y] = new Array(gridSize);
    for (var x = 0; x < gridSize; x++){
      grid[y][x] = '_';
    }
  } 
  movePlayer(playerDir);
}

function movePlayer(direction){
  grid[playerY][playerX] = '0';
  
  for (var i = 0; i < playerLength - 1; i++) {
    if (playerPreviousX[i] == null){
      if (playerPreviousY[playerPreviousY.length - 1] == null){
        playerPreviousY[i] = playerY;
        playerPreviousX[i] = playerX;
      } else {
         playerPreviousY[i] = playerPreviousY[playerPreviousY.length - 1];
        playerPreviousX[i] = playerPreviousX[playerPreviousX.length - 1];
      }
    }
    grid[playerPreviousY[i]][playerPreviousX[i]] = '0';
  }
  playerPreviousX.unshift(playerX);
  playerPreviousY.unshift(playerY);
  if (playerPreviousX.length >= playerLength){
    playerPreviousX.pop();
    playerPreviousY.pop();
  }
  
  grid[appleY][appleX] = '@';
  
    switch (direction) {
    case 'up': playerY--; break;
    case 'right': playerX++; break;
    case 'down': playerY++; break;
    case 'left': playerX--; break;
  }
  
  if (difficulty = 0) {
    playerX = teleport(playerX, 0, gridSize - 1);
    playerY = teleport(playerY, 0, gridSize - 1);
  } else {
    playerX = clamp(playerX, 0, gridSize - 1);
    playerY = clamp(playerY, 0, gridSize - 1);
  }
  
  

  if (grid[playerY][playerX] == '@'){
    generateApple(); 
    playerLength += 2;
    score = playerLength - 3;
    tickSpeed -= 3;
  } else if (grid[playerY][playerX] === '0'){
    gameOver();
  }
}

function generateApple () {
  do {
  appleX = Math.floor(Math.random() * gridSize);
  appleY = Math.floor(Math.random() * gridSize);
  } while (grid[appleY][appleX] != '_')
}

function statusBar(){
  console.log("Running... " + circle[statusPos]);
  if (statusPos > circle.length - 2) {
    statusPos = 0;
  } else {
      statusPos++;
  }
}


function displayGrid () {
  var gridText = '\n';
  for (var y = 0; y < gridSize; y++) {
    for (var x = 0; x < gridSize; x++){
      gridText += '|';
      gridText += grid[y][x];
      if (x === gridSize - 1) {
        gridText += '|';
      }
    }
    gridText += '\n';  
  }
  console.log(gridText);
}

function clamp(num, min, max) {
  return num <= min ? min : num >= max ? max : num;
}

function teleport(num, min, max) {
  return num < min ? max : num > max ? min : num;
}
  
function gameOver(){
  dead = true;
  cooldowned = false;
  setTimeout(cooldown, 1000);
  console.log('You Died! \n Score: ' + score + '\n')
}

function respawn(){
  dead = false;
  tick();
  generateApple();
}
  
function cooldown(){
  setVars();
  console.log('Press any key to continue.');
}