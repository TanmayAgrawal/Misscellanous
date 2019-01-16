var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var scoreLabel = document.getElementById('score');
var score = 0;
var width = canvas.width / 4 - 6;
var cells = [];
var fontSize;
var loss = false;

start();

function cell(row, coll) {
  this.value = 0;
  this.x = coll * width + 5 * (coll + 1);
  this.y = row * width + 5 * (row + 1);
}

function createCells() {
  var i, j;
  for(i = 0; i < 4; i++) {
    cells[i] = [];
    for(j = 0; j < 4; j++) {
      cells[i][j] = new cell(i, j);
    }
  }
}

function drawCell(cell) {
  ctx.beginPath();
  ctx.rect(cell.x, cell.y, width, width);
  switch (cell.value){
     case 0 : ctx.fillStyle = "grey"; break; 
    case 2 : ctx.fillStyle = "lightsalmon"; break;
    case 4 : ctx.fillStyle = "darksalmon"; break;
    case 8 : ctx.fillStyle = "salmon"; break;
    case 16 : ctx.fillStyle = "lightcoral"; break;
    case 32 : ctx.fillStyle = "indianred"; break;
    case 64 : ctx.fillStyle = "#FF5733"; break;
    case 128 : ctx.fillStyle = "lightpink"; break;
    case 256 : ctx.fillStyle = "hotpink"; break;
    case 512: ctx.fillStyle = "deeppink"; break;
    case 1024: ctx.fillStyle = "palevioletered"; break;
    case 2048 : ctx.fillStyle = "orangered"; break;
    default : ctx.fillStyle = "white";
  }
  ctx.fill();
  if (cell.value) {
    fontSize = width / 2;
    ctx.font = fontSize + 'px Arial';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.fillText(cell.value, cell.x + width / 2, cell.y + width / 2 + width/7);
  }
}

function canvasClean() {
  ctx.clearRect(0, 0, 500, 500);
}

document.onkeydown = function (event) {
  if (!loss) {
    if (event.keyCode === 38 || event.keyCode === 87) {
      moveUp(); 
    } else if (event.keyCode === 39 || event.keyCode === 68) {
      moveRight();
    } else if (event.keyCode === 40 || event.keyCode === 83) {
      moveDown(); 
    } else if (event.keyCode === 37 || event.keyCode === 65) {
      moveLeft(); 
    }
    scoreLabel.innerHTML = 'Score : ' + score;
  }
}

function start() {
  createCells();
  drawAllCells();
  pasteNewCell();
  pasteNewCell();
}

function finish() {
  canvas.style.opacity = '0.5';
  loss = true;
}

function drawAllCells() {
  var i, j;
  for(i = 0; i < 4; i++) {
    for(j = 0; j < 4; j++) {
      drawCell(cells[i][j]);
    }
  }
}

function pasteNewCell() {
  var countFree = 0;
  var i, j;
  for(i = 0; i < 4; i++) {
    for(j = 0; j < 4; j++) {
      if(!cells[i][j].value) {
        countFree++;
      }
    }
  }
  if(!countFree) {
    finish();
    return;
  }
  while(true) {
    var row = Math.floor(Math.random() * 4);
    var coll = Math.floor(Math.random() * 4);
    if(!cells[row][coll].value) {
      cells[row][coll].value = 2 * Math.ceil(Math.random() * 2);
      drawAllCells();
      return;
    }
  }
}

function moveRight () {
  var i, j;
  var coll;
  for(i = 0; i < 4; i++) {
    for(j = 2; j >= 0; j--) {
      if(cells[i][j].value) {
        coll = j;
        while (coll + 1 < 4) {
          if (!cells[i][coll + 1].value) {
            cells[i][coll + 1].value = cells[i][coll].value;
            cells[i][coll].value = 0;
            coll++;
          } else if (cells[i][coll].value == cells[i][coll + 1].value) {
            cells[i][coll + 1].value *= 2;
            score +=  cells[i][coll + 1].value;
            cells[i][coll].value = 0;
            break;
          } else {
            break;
          }
        }
      }
    }
  }
  pasteNewCell();
}

function moveLeft() {
  var i, j;
  var coll;
  for(i = 0; i < 4; i++) {
    for(j = 1; j < 4; j++) {
      if(cells[i][j].value) {
        coll = j;
        while (coll - 1 >= 0) {
          if (!cells[i][coll - 1].value) {
            cells[i][coll - 1].value = cells[i][coll].value;
            cells[i][coll].value = 0;
            coll--;
          } else if (cells[i][coll].value == cells[i][coll - 1].value) {
            cells[i][coll - 1].value *= 2;
            score +=   cells[i][coll - 1].value;
            cells[i][coll].value = 0;
            break;
          } else {
            break; 
          }
        }
      }
    }
  }
  pasteNewCell();
}

function moveUp() {
  var i, j, row;
  for(j = 0; j < 4; j++) {
    for(i = 1; i < 4; i++) {
      if(cells[i][j].value) {
        row = i;
        while (row > 0) {
          if(!cells[row - 1][j].value) {
            cells[row - 1][j].value = cells[row][j].value;
            cells[row][j].value = 0;
            row--;
          } else if (cells[row][j].value == cells[row - 1][j].value) {
            cells[row - 1][j].value *= 2;
            score +=  cells[row - 1][j].value;
            cells[row][j].value = 0;
            break;
          } else {
            break; 
          }
        }
      }
    }
  }
  pasteNewCell();
}

function moveDown() {
  var i, j, row;
  for(j = 0; j < 4; j++) {
    for(i = 2; i >= 0; i--) {
      if(cells[i][j].value) {
        row = i;
        while (row + 1 < 4) {
          if (!cells[row + 1][j].value) {
            cells[row + 1][j].value = cells[row][j].value;
            cells[row][j].value = 0;
            row++;
          } else if (cells[row][j].value == cells[row + 1][j].value) {
            cells[row + 1][j].value *= 2;
            score +=  cells[row + 1][j].value;
            cells[row][j].value = 0;
            break;
          } else {
            break; 
          }
        }
      }
    }
  }
  pasteNewCell();
}