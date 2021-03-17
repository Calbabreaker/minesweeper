const cellSize = 25;

let cells;
let canvas;

let cellCount;
let gameEnded = false;

function setup() {
  cellCount = createVector(20, 20);
  cells = make2DArray(cellCount.x, cellCount.y);
  
  canvas = createCanvas(cellSize * cellCount.x, cellSize * cellCount.y);
  createCells();
  createListener();
}

function draw() {
  showCells();
}