let board = [
  ['*', '*', '*'],
  ['*', '*', '*'],
  ['*', '*', '*']
];

let w;
let h;

let ai = 'X';
let human = 'O';
let human1 = 'X';
let currentPlayer = human;



let scores = {
  X: 10,
  O: -10,
  tie: 0
};


function bestMove() 
{
  let bestScore = -Infinity;
  let move;
  for (let i = 0; i < 3; i++) 
  {
    for (let j = 0; j < 3; j++) 
    {
      if (board[i][j] == '*') {
        board[i][j] = ai;
        let score = minimax(board, 0, false);
        board[i][j] = '*';
        if (score > bestScore)
        {
          bestScore = score;
          move = { i, j };
        }
      }
    }
  }
  //alert(typeof move.i);
  //alert(move.i+" "+move.j);
  board[move.i][move.j] = ai;
  //alert(board[0][0]+" "+board[1][0]+" "+board[2][0]+"\n"+board[0][1]+" "+board[1][1]+" "+board[2][1]+"\n"+board[0][2]+" "+board[1][2]+" "+board[2][2]+"\n")
  currentPlayer = human;
}


function minimax(board, depth, isMaximizing) 
{
  let result = checkWinner();
  if (result !== null) 
  {
    //alert(result);
    return scores[result];
  }

  if (isMaximizing)
  {
    let bestScore = -Infinity;
    for (let i = 0; i < 3; i++) 
    {
      for (let j = 0; j < 3; j++) 
      {
        if (board[i][j] == '*') {
          board[i][j] = ai;
          let score = minimax(board, depth + 1, false);
          board[i][j] = '*';
          bestScore = max(score, bestScore);
        }
      }
    }
    return bestScore;
  } 
  else 
  {
    let bestScore = Infinity;
    for (let i = 0; i < 3; i++) 
    {
      for (let j = 0; j < 3; j++) 
      {
        if (board[i][j] == '*') 
        {
          board[i][j] = human;
          let score = minimax(board, depth + 1, true);
          board[i][j] = '*';
          bestScore = min(score, bestScore);
        }
      }
    }
    return bestScore;
  }
}


let N=-1;
N = window.prompt("Enter 0 for human vs human \nOR\nEnter 1 for human vs Computer\nTIC-TAC-TOE")
let M=-1;
if(N==1)
M =  window.prompt("Enter 0 for Human chance or 1 for Computer chance in Tic Tac Toe game");
function setup() {
  createCanvas(400, 400);
  w = width / 3;
  h = height / 3;
  if(M==1)
  bestMove();
}

function equals3(a, b, c) {
  return a == b && b == c && a != '*';
}

function checkWinner() {
  let winner = null;

  // horizontal
  for (let i = 0; i < 3; i++) {
    if (equals3(board[i][0], board[i][1], board[i][2])) {
      winner = board[i][0];
    }
  }

  // Vertical
  for (let i = 0; i < 3; i++) {
    if (equals3(board[0][i], board[1][i], board[2][i])) {
      winner = board[0][i];
    }
  }

  // Diagonal
  if (equals3(board[0][0], board[1][1], board[2][2])) {
    winner = board[0][0];
  }
  if (equals3(board[2][0], board[1][1], board[0][2])) {
    winner = board[2][0];
  }

  let openSpots = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] == '*') {
        openSpots++;
      }
    }
  }

  if (winner == null && openSpots == 0) {
    return 'tie';
  } else {
    return winner;
  }
}

function mousePressed() {
  if (currentPlayer == human) 
  {
    // Human make turn
    let i = floor(mouseX / w);
    let j = floor(mouseY / h);
    // If valid turn
    if (board[i][j] == '*') 
    {
      board[i][j] = human;
      if(N==1)
      {
        currentPlayer = ai;
        bestMove();
      }
      else
      {
        currentPlayer = human1;
      }
    }
  }
  if(currentPlayer == human1 && N==0)
  {
    let i = floor(mouseX / w);
    let j = floor(mouseY / h);
    // If valid turn
    if (board[i][j] == '*') 
    {
      board[i][j] = human1;
      currentPlayer = human;
    }
  }
}

function draw() {
  background(255);
  strokeWeight(4);

  line(w, 0, w, height);
  line(w * 2, 0, w * 2, height);
  line(0, h, width, h);
  line(0, h * 2, width, h * 2);

  for (let j = 0; j < 3; j++) {
    for (let i = 0; i < 3; i++) {
      let x = w * i + w / 2;
      let y = h * j + h / 2;
      let spot = board[i][j];
      textSize(32);
      let r = w / 4;
      if (spot == human) {
        noFill();
        ellipse(x, y, r * 2);
      } else if (spot == ai) {
        line(x - r, y - r, x + r, y + r);
        line(x + r, y - r, x - r, y + r);
      }
    }
  }

  let result = checkWinner();
  if (result != null) {
    noLoop();
    let resultP = createP('');
    resultP.style('font-size', '32pt');
    if (result == 'tie') {
      resultP.html('Tie!');
    } else {
      resultP.html(`${result} wins!`);
    }
  }
}