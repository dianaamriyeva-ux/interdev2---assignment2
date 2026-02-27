let grid = [];
let cols = 32;
let rows = 32;
let cellSize = 20;

let palette = [
  "#000000",
  "#63422d",
  "#ff595e",
  "#ffca3a",
  "#8ac926",
  "#1982c4",
  "#6a4c93",
  "#f598dc",
  "#ffffff"
];

let currentColor = "#000000";
let isEraser = false;

function setup() {
  createCanvas(cols * cellSize, rows * cellSize + 60);

  // создаём сетку
  for (let i = 0; i < cols; i++) {
    grid[i] = [];
    for (let j = 0; j < rows; j++) {
      grid[i][j] = "#ffffff";
    }
  }
}

function draw() {
  background(240);

  // рисуем сетку
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      fill(grid[i][j]);
      stroke(200);
      rect(i * cellSize, j * cellSize, cellSize, cellSize);
    }
  }

  drawPalette();
}

function drawPalette() {
  let yOffset = rows * cellSize + 10;

  for (let i = 0; i < palette.length; i++) {
    fill(palette[i]);
    stroke(0);
    rect(10 + i * 40, yOffset, 30, 30);

    // рамка выбранного цвета
    if (palette[i] === currentColor && !isEraser) {
      noFill();
      strokeWeight(3);
      stroke(0);
      rect(10 + i * 40 - 2, yOffset - 2, 34, 34);
      strokeWeight(1);
    }
  }

  // кнопка ластика
  fill(220);
  stroke(0);
  rect(10 + palette.length * 40, yOffset, 60, 30);
  fill(0);
  noStroke();
  textAlign(CENTER, CENTER);
  text("Eraser", 10 + palette.length * 40 + 30, yOffset + 15);

  // выделение ластика
  if (isEraser) {
    noFill();
    strokeWeight(3);
    stroke(0);
    rect(10 + palette.length * 40 - 2, yOffset - 2, 64, 34);
    strokeWeight(1);
  }
}

function mousePressed() {
  handlePaletteClick();
  paintCell();
}

function mouseDragged() {
  paintCell();
}

function paintCell() {
  if (mouseY < rows * cellSize) {
    let x = floor(mouseX / cellSize);
    let y = floor(mouseY / cellSize);

    if (x >= 0 && x < cols && y >= 0 && y < rows) {
      if (isEraser) {
        grid[x][y] = "#ffffff";
      } else {
        grid[x][y] = currentColor;
      }
    }
  }
}

function handlePaletteClick() {
  let yOffset = rows * cellSize + 10;

  // выбор цвета
  for (let i = 0; i < palette.length; i++) {
    let x = 10 + i * 40;
    if (
      mouseX > x &&
      mouseX < x + 30 &&
      mouseY > yOffset &&
      mouseY < yOffset + 30
    ) {
      currentColor = palette[i];
      isEraser = false;
    }
  }

  // выбор ластика
  let eraserX = 10 + palette.length * 40;
  if (
    mouseX > eraserX &&
    mouseX < eraserX + 60 &&
    mouseY > yOffset &&
    mouseY < yOffset + 30
  ) {
    isEraser = true;
  }
}

function keyPressed() {
  if (key === 's' || key === 'S') {
    saveCanvas('pixel-art', 'png');
  }
}