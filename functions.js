
function make2DArray(sizeX, sizeY) {
  let array = new Array(sizeX);
  for (let i = 0; i < array.length; i++) {
    array[i] = new Array(sizeY);
  }

  return array;
}

function createCells() {
  for (let i = 0; i < cellCount.x; i++) {
    for (let j = 0; j < cellCount.y; j++) {
      let cellIsMine = !floor(random(0, 5));
      cells[i][j] = new Cell(i * cellSize, j * cellSize, cellIsMine, createVector(i, j));
    }
  }

  for (let i = 0; i < cellCount.x; i++) {
    for (let j = 0; j < cellCount.y; j++) {
      if (cells[i][j].isMine) {
        cells[i][j].calculateSurroundingForNumber();
      }
    }
  }
}

function showCells() {
  for (let i = 0; i < cellCount.x; i++) {
    for (let j = 0; j < cellCount.y; j++) {
      cells[i][j].show();
    }
  }
}

function createListener() {
  document.addEventListener('contextmenu', event => event.preventDefault()); // stop right click
  canvas.canvas.addEventListener('mouseup', event => {
    if (event.button == 0) {
      discoverCell();
    } else if (event.button == 2) {
      flagCell();
    }
  });
}

function discoverCell() {
  let clickedCell = cells[floor(mouseX / cellSize)][floor(mouseY / cellSize)];
  if (!clickedCell.isMine) {
    if (!clickedCell.discovered) {
      clickedCell.discovered = true;
      clickedCell.discoverSurrounding();
    }
  } else {
    clickedCell.red = true;
    gameEnded = true;
  }
}

function flagCell() {
  let clickedCell = cells[floor(mouseX / cellSize)][floor(mouseY / cellSize)];
  if (!clickedCell.discovered) {
    clickedCell.flagged = true;
  }
}

function checkInArray(array, i) {
  return i >= 0 && i < array.length;
}