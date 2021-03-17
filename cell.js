class Cell {
  constructor(x, y, isMine, cellPos) {
    this.x = x;
    this.y = y;
    this.isMine = isMine;
    this.red = false;
    this.cellPos = cellPos;
    this.discovered = false;
    this.flagged = false;
    this.number = 0;
  }

  show() {
    push();
    stroke(0);
    strokeWeight(2);
    translate(this.x, this.y);
    if ((this.discovered && !this.isMine) || gameEnded) {
      fill(200);
      rect(0, 0, cellSize, cellSize); 
      if (this.number > 0) {
        fill(0);
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(21);
        text(this.number, cellSize / 2, cellSize / 2);     
      }
    } else if (!this.discovered) {
      fill(255);
      rect(0, 0, cellSize, cellSize);
      if (this.flagged) {
        triangle(cellSize / 1.3, cellSize / 2, cellSize / 2, cellSize / 1.3, cellSize - cellSize / 1.3, cellSize - cellSize / 1.3)
      }
    }

    if (this.isMine && gameEnded) {
      fill(this.red ? 255 : 0, 0, 0)
      ellipse(cellSize / 2, cellSize / 2, cellSize / 1.5, cellSize / 1.5);
    }

    pop();
  }

  calculateSurroundingForNumber() {
    //calculate the cell number for surronding cells in a 8 area
    for (let i = -1; i <= 1; i++) {
      if (checkInArray(cells, this.cellPos.x + i)) {
        for (let j = -1; j <= 1; j++) {
          if (checkInArray(cells[this.cellPos.x + i], this.cellPos.y + j)) {
            cells[this.cellPos.x + i][this.cellPos.y + j].number++;
          }
        }  
      }    
    }
  }

  discoverSurrounding() {
    //discover the surronding cells in a 8 area if the cell is blank
    for (let i = -1; i <= 1; i++) {
      if (checkInArray(cells, this.cellPos.x + i)) {
        for (let j = -1; j <= 1; j++) {
          if (checkInArray(cells[this.cellPos.x + i], this.cellPos.y + j)) {
            let cell = cells[this.cellPos.x + i][this.cellPos.y + j]
            if (!cell.discovered && !cell.isMine) {
              if (cell.number == 0 || this.number == 0) {
                cell.discovered = true;
              } 
              
              if (cell.number == 0) {
                cell.discoverSurrounding();
              }
            }
          }
        }  
      }    
    }
  }
}